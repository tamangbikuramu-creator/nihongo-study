import test from 'node:test';
import assert from 'node:assert/strict';
import { EXAMPLE_TRANSLATIONS } from '../src/vocab-example-translations.js';

const examples = ['あさって来てください。', 'あさってはトムの誕生日だ。'];
const futureWords = {
  ne: /पर्सि/,
  vi: /ngày kia/i,
  my: /သန်ဘက်ခါ/,
  zh: /后天/,
  ptBR: /depois de amanhã/i,
};
for (const sentence of examples) {
  test(`day-after-tomorrow translation: ${sentence}`, () => {
    const translations = EXAMPLE_TRANSLATIONS[sentence];
    assert.ok(translations, 'example exists');
    for (const [lang, pattern] of Object.entries(futureWords)) {
      assert.match(translations[lang], pattern, `${lang} must mean day after tomorrow`);
    }
  });
}
