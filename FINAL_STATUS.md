# Nihongo Study — finalization status (2026-11-19)

This is an audited candidate, **not a verified final release**.

## Confirmed
- Project static checks and existing Node tests can run without browser dependencies.
- Missing translation entries are exported in `MISSING_TRANSLATIONS.csv` (one row per Japanese sentence).
- The original UI/design files were not intentionally changed in this pass.

## Blocking release
1. 319 Japanese example sentences still lack translations in each of ne, vi, my, zh and ptBR (1,595 translation cells). These must be translated and reviewed by fluent speakers. **Do not substitute English or invent translations.**
2. The `grammar945-addon.js` only admits a small curated set of grammar examples. The advertised 945 grammar points are not verified as present.
3. The kanji/vocabulary/grammar addons depend on remote sources; offline-first-launch is not guaranteed.
4. Production build and browser/mobile end-to-end tests have not been completed. `npm ci --offline` failed due to missing cached zlibjs package.

## Run on Mac with internet
```
npm ci
npm run check:project
npm run test:data
npm run audit:content
npm run build
npm run dev
```
Then verify N5–N1 vocabulary, kanji, grammar, quiz scoring, reading, listening, language switching, and mobile layout manually.

Do not deploy as a fully finished release until the blockers are resolved.
