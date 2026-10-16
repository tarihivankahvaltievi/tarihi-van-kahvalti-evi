import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile("src/app/components/web-vitals.tsx", "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

async function observe({ beacon, endpoint = "/metrics", publicPage = true, fetchFails = false }) {
  let report;
  const requests = [];
  const beacons = [];
  const context = {
    exports: {},
    process: { env: { NODE_ENV: "production" } },
    window: { location: { href: "https://www.tarihivankahvaltievi.com/" } },
    navigator: beacon === undefined ? {} : { sendBeacon: (...args) => { beacons.push(args); return beacon; } },
    fetch: async (...args) => { requests.push(args); if (fetchFails) throw new Error("offline"); return {}; },
    require(name) {
      if (name === "next/web-vitals") return { useReportWebVitals: (callback) => { report = callback; } };
      if (name === "react") return { useCallback: (callback) => callback, useRef: (value) => ({ current: value }) };
      if (name === "../analytics-policy") return { analyticsId: "", safePageLocation: () => publicPage ? context.window.location.href : null };
      if (name === "../analytics") return { getGtag: () => () => {} };
      throw new Error(`Unexpected import: ${name}`);
    },
  };
  vm.runInNewContext(outputText, context);
  context.exports.WebVitals({ endpoint });
  report({ id: "test-lcp", name: "LCP", value: 123, rating: "good", navigationType: "navigate" });
  await new Promise((resolve) => setImmediate(resolve));
  return { requests, beacons };
}
assert.equal((await observe({ beacon: true })).requests.length, 0);
for (const beacon of [false, undefined]) {
  const { requests } = await observe({ beacon });
  assert.equal(requests.length, 1);
  assert.equal(requests[0][0], "/metrics");
  assert.equal(requests[0][1].keepalive, true);
  assert.equal(JSON.parse(requests[0][1].body).name, "LCP");
}
assert.equal((await observe({ beacon: false, fetchFails: true })).requests.length, 1);
assert.deepEqual((await observe({ beacon: false, publicPage: false })).requests, []);
assert.deepEqual((await observe({ beacon: false, endpoint: "" })).beacons, []);
assert.deepEqual((await observe({ beacon: false, endpoint: "" })).requests, []);
console.log("Web Vitals: beacon acceptance/rejection, fetch fallback, offline handling and private-page exclusion passed.");
