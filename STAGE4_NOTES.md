# Stage 4 — offline resilience (partial)

- The three supplementary downloaders now use a shared Cache Storage layer. After a successful online download, later visits can reuse the cached response if offline or the remote service fails.
- This is **not** a bundled offline dataset: a fresh installation still needs network access for the three supplementary sources. Clearing site data also clears the cache.
- No changes were made to the app's visual design.
- Grammar taxonomy additions still use generic placeholder teaching examples; they are not verified learning material.
- Translation coverage remains incomplete. No machine-generated translations were inserted without verification.
- A full `vite build`, end-to-end browser test, and JLPT item quality review remain outstanding.
