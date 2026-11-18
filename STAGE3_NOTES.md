# Stage 3 — content audit

Run `npm run audit:content` (or `node scripts/audit-content.mjs`) to regenerate `CONTENT_AUDIT.json`.

## Verified from bundled files
- 2,625 example sentence entries exist in the generated translations JSON.
- English text exists in all 2,625; each of the other five languages has 2,248 nonempty entries and 377 missing entries **within this file**.
- This is not a count of all vocabulary words or of every sentence in the app.
- Kanji, vocabulary, and grammar add-ons still depend on remote data at runtime.
- The grammar add-on generates placeholder study examples and copies English meanings into several other language fields.

## Not verified
- Successful Vite production build or browser functionality.
- Whether 2,136 kanji / 8,334 vocabulary items actually load at runtime.
- Translation correctness, full JLPT content coverage, or listening quality.

Next: replace remote dependencies with reviewed bundled datasets; review grammar examples and translation accuracy; install dependencies and run build + UI tests.
