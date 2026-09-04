# Design QA — Hakkımızda → Footer yenilemesi

## Comparison target

- Source visual truth: https://www.hamour.com.tr/tr/ (Codex in-app browser source capture).
- Implementation: http://localhost:3001/ (Codex in-app browser local capture).
- Matching review states: source menu/atmosphere/footer sequence and the implementation's signature-menu/venue/footer sequence.
- Desktop viewport: 1440 × 960 CSS px at device scale factor 1; both browser captures were taken at this size, so no density normalization was needed.
- Mobile viewport: 390 × 844 CSS px at device scale factor 1. The local page was measured section-by-section at 390 px with no horizontal overflow.

## Evidence

- Full-view source and implementation captures were submitted together in the in-app browser comparison at 1440 × 960.
- Focused comparison: source's full-bleed dark venue CTA against the local `VenueAtmosphere` section. Both use a full-width venue image, left-led display composition, supporting copy at right, and two clearly differentiated actions.
- Focused comparison: source's menu category area against the local `SignatureShowcase`. The local version preserves the useful six-category tab interaction while replacing source artwork and copy with original site photos, menu content, and branding.
- Footer capture: local footer was checked at 1440 × 960 after the component rebuild. It retains a single dark, image-led closing field with brand lockup, compact contacts, navigation, legal links, and back-to-top control.

## Required fidelity surfaces

- Fonts and typography: passed. The existing Bodoni Moda / Literata / Commissioner stack creates the display, narrative, and utility hierarchy; headings remain balanced and do not overflow at 390 px.
- Spacing and layout rhythm: passed. The mobile journey is a succession of single-purpose sections rather than compressed desktop cards; the desktop signature panel has a stable image/copy split.
- Colors and visual tokens: passed. Dark wine `#402021` / `#35191a`, clay `#ad6248`, and light neutral fields are consistently used for contrast, CTA states, and section transitions.
- Image quality and asset fidelity: passed. Only project-owned local restaurant images and the existing brand icon are used. No Hamour image, logo, icon, or artwork is hotlinked or copied.
- Copy and content: passed. Restaurant-specific copy, routes, booking behavior, FAQs, reviews, gallery labels, legal links, and contact details remain intact.

## Interaction and responsive checks

- Category tab changed from “Serpme Van Sofrası” to “Bakır Sahan & Sıcaklar”; `aria-selected` updated correctly.
- First FAQ item opened successfully.
- Gallery lightbox opened and closed successfully.
- “Masa Ayırt” successfully reached `/rezervasyon`.
- Desktop and mobile browser captures were inspected; no console errors were observed. Existing image-quality configuration was updated to include the app's 78 and 84 quality values.

## Findings

No actionable P0, P1, or P2 mismatches remain. The deliberate difference from the reference is brand ownership: local imagery, copy, navigation, and conversion paths replace Hamour-specific assets and content.

## Implementation checklist

- [x] Rebuilt Hakkımızda, atmosphere, signature menu, venue CTA, gallery treatment, guest reviews, FAQ, and footer.
- [x] Retained keyboard-accessible tabs, details/summary FAQs, gallery dialog, routes, and reservation action.
- [x] Checked mobile layout and reduced-motion fallbacks.
- [x] Ran `npm run lint` and `npm run build`.

## Follow-up polish

- [P3] If desired after launch, replace the legacy header/hero in a separate pass so its visual system receives the same simplification as the Hakkımızda-to-footer journey.

final result: passed
