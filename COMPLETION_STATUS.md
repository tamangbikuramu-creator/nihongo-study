# Nihongo Study — verified handoff status

## Changes in this package
- Added a 12-second timeout and actionable error messages to the three remote supplemental study-data loaders. The bundled data can still render when these external requests fail.
- Added `npm run check:project` for required file and loader wiring checks.
- Removed historical `App*` backups and old translation/vocabulary backups from the delivery package (not from the original uploaded ZIP).

## Verified
- Required source files exist and the three supplemental loaders are invoked from App.jsx.
- Modified JS modules pass `node --check`.
- Static project check passes.

## Not yet verified or completed
- Production build, browser interactions, deployment and mobile behavior.
- Accurate 2,136-kanji and 8,334-vocabulary counts after runtime fetching.
- Six-language translation coverage and grammatical correctness of examples.
- JLPT question correctness and listening audio availability.

## Next steps on Mac
1. Unzip and open a terminal inside `nihongo-study`.
2. Run `npm install` then `npm run check:project` then `npm run build`.
3. Run `npm run dev` and check every level, language, exercise, and browser console.
4. Replace remote runtime study loaders with verified bundled local datasets before calling the app complete.

Do not put API keys in client-side Vite code or commit `.env` secrets.
