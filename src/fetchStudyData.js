/** Fetch supplementary study data with timeout and best-effort offline reuse. */
const CACHE_NAME = 'nihongo-study-data-v1';
const pending = new Map();

async function openDataCache() {
  if (typeof caches === 'undefined') return null;
  try { return await caches.open(CACHE_NAME); } catch { return null; }
}

async function load(url, label, timeoutMs) {
  const cache = await openDataCache();
  // Do not wait for a doomed network request when the browser is known offline.
  if (typeof navigator !== 'undefined' && navigator.onLine === false && cache) {
    const saved = await cache.match(url);
    if (saved) return saved;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    if (cache) {
      try {
        const saved = await cache.match(url);
        if (saved) {
          console.info(`${label}: using previously downloaded data`);
          return saved;
        }
      } catch (cacheError) { console.warn(`${label}: cache unavailable`, cacheError); }
    }
    const reason = error?.name === 'AbortError' ? `timed out after ${timeoutMs}ms` : error?.message || String(error);
    throw new Error(`${label} could not load (${reason}). Bundled study items remain available.`, { cause: error });
  } finally {
    clearTimeout(timer);
  }
  // Cache failures must never prevent successfully fetched study data from loading.
  if (cache) {
    try { await cache.put(url, response.clone()); }
    catch (error) { console.warn(`${label}: cache save failed`, error); }
  }
  return response;
}

export async function fetchStudyData(url, label, timeoutMs = 12000) {
  // A Response body can only be consumed once: clone for concurrent callers.
  if (!pending.has(url)) {
    const job = load(url, label, timeoutMs);
    pending.set(url, job);
    job.finally(() => { if (pending.get(url) === job) pending.delete(url); }).catch(() => {});
  }
  return (await pending.get(url)).clone();
}
