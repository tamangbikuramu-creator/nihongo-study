# Stage 6 — translation correctness patch

- Fixed a concrete high-impact vocabulary translation error: あさって means **the day after tomorrow**, not tomorrow/the next day. Corrected two example sentences in Nepali, Vietnamese, Myanmar, Chinese and Brazilian Portuguese.
- Added regression tests covering these two examples in all five languages.
- Preserved UI/design and the existing dataset structure.

## Limitations
This patch **does not complete** the remaining 377 missing translations per non-English language, review all existing translations, verify 2,136 kanji / 8,334 vocabulary at runtime, or validate production build. Grammar extension still contains generic placeholder examples. Do not publish as a fully verified learning app.
