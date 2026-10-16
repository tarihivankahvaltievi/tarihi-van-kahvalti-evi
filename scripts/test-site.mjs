import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { mkdtemp, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { faqItems } from "../src/app/seo.ts";

// Always test a loopback production server with isolated storage. Never use
// deployment credentials, real reservations, or search-engine notifications.
const directory = await mkdtemp(path.join(tmpdir(), "van-site-test-"));
const menuFile = path.join(directory, "menu.json");
await copyFile("src/app/menu/menu-data.json", menuFile);
const probe = createServer();
await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  env: { ...process.env, SUPABASE_URL: "", SUPABASE_SERVICE_ROLE_KEY: "", INDEXNOW_DRY_RUN: "1", MENU_DATA_FILE: menuFile, RESERVATION_DATA_FILE: path.join(directory, "reservations.json"), ADMIN_PASSWORD: "", ADMIN_SESSION_SECRET: "" },
  stdio: ["ignore", "pipe", "pipe"],
});
let log = "";
server.stdout.on("data", (chunk) => { log += chunk; });
server.stderr.on("data", (chunk) => { log += chunk; });
const closed = new Promise((resolve) => server.once("close", resolve));
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(log);
    try { ready = (await fetch(`${base}/robots.txt`)).ok; } catch { /* starting */ }
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, `Production server did not start: ${log}`);
  for (const route of ["/", "/en", "/menu", "/konum", "/llms.txt"]) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, route);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff", route);
    assert.ok(response.headers.get("content-security-policy")?.includes("object-src 'none'"), route);
    assert.ok(!response.headers.get("content-security-policy")?.includes("'unsafe-eval'"), route);
  }
  for (const route of ["/api/admin/menu", "/api/reservations"]) {
    const response = await fetch(`${base}${route}`, {
      method: "POST", headers: { Origin: "https://untrusted.example", "Content-Type": "application/json" }, body: "{}",
    });
    assert.equal(response.status, 403, `${route}: cross-origin writes must fail`);
  }
  const llms = await (await fetch(`${base}/llms.txt`)).text();
  assert.ok(llms.includes("Frequently asked questions"));
  assert.ok(llms.includes("Van kahvaltısı"));
  for (const { question, answer } of faqItems) {
    const plain = (value) => value.replace(/[\r\n\t]+/g, " ").replace(/[\[\]<>`]/g, "").trim();
    assert.ok(llms.includes(plain(question)), `GEO FAQ question missing: ${question}`);
    assert.ok(llms.includes(plain(answer)), `GEO FAQ answer missing: ${question}`);
  }
  const child = spawn(process.execPath, ["scripts/validate-seo.mjs"], {
    env: { ...process.env, SEO_TEST_BASE_URL: base }, stdio: "inherit",
  });
  const result = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", resolve);
  });
  assert.equal(result, 0, "SEO/GEO regression checks failed");
  console.log("Production site checks passed: SEO/GEO, security headers and cross-origin protection.");
} finally {
  server.kill("SIGTERM");
  await closed;
  await rm(directory, { recursive: true, force: true });
}
