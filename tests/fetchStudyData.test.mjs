import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchStudyData } from '../src/fetchStudyData.js';

test('successful fetch returns response', async () => {
  globalThis.fetch = async () => new Response('study data', { status: 200 });
  assert.equal(await (await fetchStudyData('https://test.local/success', 'test')).text(), 'study data');
});
test('failed HTTP response reports an error', async () => {
  globalThis.fetch = async () => new Response('no', { status: 503 });
  await assert.rejects(fetchStudyData('https://test.local/fail', 'test'), /HTTP 503/);
});
test('concurrent callers receive independently consumable responses', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response('same'); };
  const [a,b] = await Promise.all([
    fetchStudyData('https://test.local/concurrent','test'),
    fetchStudyData('https://test.local/concurrent','test'),
  ]);
  assert.equal(await a.text(), 'same');
  assert.equal(await b.text(), 'same');
  assert.equal(calls, 1);
});
test('cached data is used when network fails', async () => {
  globalThis.caches = { open: async () => ({ match: async () => new Response('cached'), put: async () => {} }) };
  globalThis.fetch = async () => { throw Error('offline'); };
  assert.equal(await (await fetchStudyData('https://test.local/offline','test')).text(), 'cached');
  delete globalThis.caches;
});
