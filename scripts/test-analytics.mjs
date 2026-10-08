import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
function loadModule(file, context, imports = {}) {
  const code = ts.transpileModule(readFileSync(new URL(file, root), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { ...context, exports, require: (name) => {
    if (!(name in imports)) throw Error(`Unexpected import ${name}`);
    return imports[name];
  } }, { filename: file });
  return exports;
}
const window = { location: { href: 'https://www.tarihivankahvaltievi.com/rezervasyon?name=PRIVATE&phone=PRIVATE#PRIVATE' } };
const context = { window, document: { title: 'Reservation', referrer: 'https://example.com/private?secret=PRIVATE' },
  URL, TextEncoder, crypto: webcrypto, setTimeout, clearTimeout, process: { env: {} } };
const policy = loadModule('src/app/analytics-policy.ts', context);
assert.equal(policy.safePageLocation(window.location.href), 'https://www.tarihivankahvaltievi.com/rezervasyon');
for (const suffix of ['/admin', '/admin?name=PRIVATE', '/rezervasyon/takvim/SECRET', '/en/rezervasyon/takvim/SECRET', '/api/reservations', '/unknown']) {
  assert.equal(policy.safePageLocation(`https://www.tarihivankahvaltievi.com${suffix}`), null);
}
assert.equal(policy.safePageLocation('http://www.tarihivankahvaltievi.com/'), null);
assert.equal(policy.safePageLocation('https://preview.example.com/'), null);
assert.equal(policy.safePageLocation('http://127.0.0.1:3100/'), null);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/en?gclid=Test_click-123&gbraid=Test_braid&wbraid=Test_web&name=PRIVATE#PRIVATE`), `${policy.analyticsOrigin}/en?gclid=Test_click-123&gbraid=Test_braid&wbraid=Test_web`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/?gclid=invalid%20value&email=PRIVATE`), `${policy.analyticsOrigin}/`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/admin?gclid=Test_click`), null);
const campaignUrl = `${policy.analyticsOrigin}/menu?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=menu&utm_term=PRIVATE&phone=PRIVATE#PRIVATE`;
assert.equal(policy.measurementPageLocation(campaignUrl), `${policy.analyticsOrigin}/menu?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=menu`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/?utm_source=PRIVATE&utm_medium=organic&utm_campaign=PRIVATE`), `${policy.analyticsOrigin}/`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/?utm_source=google&utm_medium=organic&utm_campaign=PRIVATE&utm_content=PRIVATE`), `${policy.analyticsOrigin}/?utm_source=google&utm_medium=organic`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/?utm_source=google`), `${policy.analyticsOrigin}/`);
assert.equal(policy.measurementPageLocation(`${policy.analyticsOrigin}/admin?utm_source=google&utm_medium=organic&utm_campaign=gbp`), null);
assert.equal(policy.safeReferrer(context.document.referrer), 'https://example.com');
assert.equal(policy.safeReferrer('https://www.tarihivankahvaltievi.com/rezervasyon/takvim/SECRET'), policy.analyticsOrigin);
const analytics = loadModule('src/app/analytics.ts', context, { react: { useEffect() {} }, './analytics-policy': policy });
const events = () => Array.from(window.dataLayer ?? [], (args) => Array.from(args));
const reservationId = 'van-20261201-04fb871a8100155358f4ac9e';
assert.equal(policy.isBookingId('a5a33b8e-7124-4d46-af28-85e326660d94'), true);
await analytics.trackBookingLead({ reservation_id: reservationId, locale: 'en', service_type: 'breakfast', name: 'PRIVATE', phone: 'PRIVATE', notes: 'PRIVATE' });
assert.equal(events().filter(e => e[1] === 'generate_lead').length, 1);
const primary = events().find(e => e[1] === 'conversion')[2];
assert.match(primary.transaction_id, /^[a-f0-9]{64}$/);
assert.equal(primary.transaction_id, await policy.bookingTransactionId(reservationId));
assert.ok(!JSON.stringify(events()).includes(reservationId));
assert.ok(!JSON.stringify(events()).includes('PRIVATE'));

// A successful callback releases handoff immediately; without a callback the
// bounded timeout still releases it. Neither a queue nor callback proves receipt.
window.location.href = `${policy.analyticsOrigin}/rezervasyon?gclid=Test_click-123&phone=PRIVATE`;
const originalGtag = window.gtag;
let callbackRan = false;
window.gtag = (...args) => {
  originalGtag(...args);
  if (args[1] === 'conversion') { callbackRan = true; args[2].event_callback(); }
};
await analytics.trackBookingLead({ reservation_id: reservationId });
assert.equal(callbackRan, true);
assert.equal(events().filter(e => e[1] === 'conversion').at(-1)[2].page_location, `${policy.analyticsOrigin}/rezervasyon?gclid=Test_click-123`);
window.gtag = originalGtag;
const blockedStarted = Date.now();
await analytics.trackBookingLead({ reservation_id: reservationId });
assert.ok(Date.now() - blockedStarted >= 1900);
window.location.href = `${policy.analyticsOrigin}/rezervasyon`;
assert.equal(events()[0][2].send_to, 'G-5F3FS1NCZR');
const beforeInvalid = events().length;
await analytics.trackBookingLead({ reservation_id: 'invalid' });
analytics.trackEvent('unrecognized', { name: 'PRIVATE' });
assert.equal(events().length, beforeInvalid);
analytics.trackEvent('booking_whatsapp_handoff', { locale: 'en', reservation_saved: false, link_url: 'https://wa.me/?text=PRIVATE' });
assert.equal(events().filter(e => e[1] === 'generate_lead').length, 3);
assert.ok(!JSON.stringify(events()).includes('PRIVATE'));
analytics.trackEvent('contact_click', { contact_method: 'phone', surface: 'home_hero' });
assert.ok(events().filter(e => e[1] === 'conversion').at(-1)[2].send_to !== primary.send_to);
window.location.href = 'https://www.tarihivankahvaltievi.com/admin';
const beforePrivate = events().length;
analytics.trackEvent('contact_click', { contact_method: 'whatsapp' });
await analytics.trackBookingLead({ reservation_id: reservationId });
assert.equal(events().length, beforePrivate);

// Execute the actual route tracking component: initial view, deduplication,
// public navigation and private navigation all use the same gtag queue.
let pathname = '/'; let refIndex = 0; const refs = []; let effects = [];
const react = { useEffect(fn) { effects.push(fn); }, useRef(value) { refs[refIndex] ??= { current: value }; return refs[refIndex++]; }, useState(value) { return [value, () => {}]; } };
const tags = loadModule('src/app/components/google-tags.tsx', context, {
  react, 'react/jsx-runtime': { jsx() {} }, 'next/script': {}, 'next/navigation': { usePathname: () => pathname },
  '../analytics-policy': policy, '../analytics': analytics,
});
function renderRoute(path) {
  pathname = path; refIndex = 0; effects = [];
  window.location.href = `${policy.analyticsOrigin}${path}?name=PRIVATE`;
  tags.GoogleTags(); for (const effect of effects) effect();
}
window.dataLayer = []; delete window.vanTagsInitialized;
renderRoute('/'); renderRoute('/'); renderRoute('/menu'); renderRoute('/admin');
assert.equal(events().filter(e => e[1] === 'page_view').length, 2);
const gaConfig = events().find(e => e[0] === 'config' && e[1] === policy.analyticsId)[2];
assert.equal(gaConfig.send_page_view, false);
assert.equal(gaConfig.allow_google_signals, false);
assert.equal(gaConfig.allow_ad_personalization_signals, false);
assert.equal(window[`ga-disable-${policy.analyticsId}`], true);
assert.ok(!JSON.stringify(events()).includes('PRIVATE'));
renderRoute('/en/menu');
assert.equal(window[`ga-disable-${policy.analyticsId}`], false);
assert.equal(events().filter(e => e[1] === 'page_view').length, 3);

// Start a fresh public session with approved UTM tags. Both initial config
// and the one page_view use the same sanitized attribution URL.
window.dataLayer = []; delete window.vanTagsInitialized;
refs.length = 0; refIndex = 0; effects = [];
window.location.href = campaignUrl; pathname = '/menu';
tags.GoogleTags(); for (const effect of effects) effect();
assert.equal(events().find(e => e[0] === 'config' && e[1] === policy.analyticsId)[2].page_location, policy.measurementPageLocation(campaignUrl));
assert.equal(events().filter(e => e[1] === 'page_view').length, 1);
assert.equal(events().find(e => e[1] === 'page_view')[2].page_location, policy.measurementPageLocation(campaignUrl));
assert.ok(!JSON.stringify(events()).includes('PRIVATE'));

// Exercise the real delegated link handler without loading external tags.
let clickHandler;
const clickDocument = { documentElement: { lang: 'tr' },
  addEventListener(name, fn) { if (name === 'click') clickHandler = fn; }, removeEventListener() {} };
const navigationAnalytics = loadModule('src/app/analytics.ts', { ...context, document: clickDocument }, {
  react: { useEffect(fn) { fn(); } }, './analytics-policy': policy,
});
navigationAnalytics.AnalyticsAutoTracker();
function clickLink(href, dataset = {}) {
  const link = { dataset, getAttribute() { return href; }, closest() { return { getAttribute() { return 'ja'; } }; } };
  clickHandler({ target: { closest() { return link; } } });
}
// Provide the browser origin used by the actual click handler.
window.location = new URL(`${policy.analyticsOrigin}/ja/blog/istanbul-bal-kaymak`);
window.dataLayer = [];
clickLink('/en/menu', { analyticsSurface: 'international_guide_hero' });
clickLink('/en/menu#serpme-fix-menu', { analyticsPurpose: 'menu_compare', analyticsItem: 'serpme-fix-menu', analyticsSurface: 'breakfast_guide' });
clickLink('/en/rezervasyon', { analyticsSurface: 'international_guide_visit' });
clickLink('https://example.com/menu');
assert.deepEqual(events().map(e => e[1]), ['menu_click', 'menu_compare_click', 'booking_start']);
assert.equal(events()[0][2].locale, 'ja');
assert.equal(events()[1][2].item_id, 'serpme-fix-menu');
assert.equal(events().filter(e => ['generate_lead', 'conversion'].includes(e[1])).length, 0);
navigationAnalytics.trackEvent('menu_item_view', { item_id: 'bal-kaymak', surface: 'menu_details', name: 'PRIVATE', phone: 'PRIVATE' });
assert.ok(!JSON.stringify(events()).includes('PRIVATE'));

// Deployment settings can intentionally disable either destination. A queued
// event must never fall back to another property or a malformed Ads label.
for (const settings of [
  { NEXT_PUBLIC_GA4_MEASUREMENT_ID: '', NEXT_PUBLIC_GOOGLE_ADS_ID: '' },
  { NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'invalid', NEXT_PUBLIC_GOOGLE_ADS_ID: 'invalid' },
]) {
  const disabledWindow = { location: { href: `${policy.analyticsOrigin}/rezervasyon` } };
  const disabledContext = { ...context, window: disabledWindow, process: { env: settings } };
  const disabledPolicy = loadModule('src/app/analytics-policy.ts', disabledContext);
  const disabledAnalytics = loadModule('src/app/analytics.ts', disabledContext, { react: { useEffect() {} }, './analytics-policy': disabledPolicy });
  disabledAnalytics.trackEvent('contact_click', { contact_method: 'phone' });
  await disabledAnalytics.trackBookingLead({ reservation_id: reservationId });
  assert.equal(disabledWindow.dataLayer, undefined);
}
console.log('Analytics checks passed: approved UTM attribution, fresh-session config, public/private routes, SPA deduplication, menu-to-booking funnel, PII scrubbing and separate booking/contact conversions.');
