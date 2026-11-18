import { readFileSync, writeFileSync } from 'node:fs';
const root = 'src/';
const translations = JSON.parse(readFileSync(root + 'vocab-example-translations.generated.json', 'utf8'));
const langs = ['en','ne','vi','my','zh','ptBR'];
const counts = Object.fromEntries(langs.map(lang => [lang, 0]));
const missing = Object.fromEntries(langs.map(lang => [lang, []]));
for (const [japanese, row] of Object.entries(translations)) {
  for (const lang of langs) {
    if (typeof row?.[lang] === 'string' && row[lang].trim()) counts[lang]++;
    else missing[lang].push(japanese);
  }
}
const addons = ['kanji2136-addon.js','vocab8334-addon.js','grammar945-addon.js'];
const external = Object.fromEntries(addons.map(file => [file, [...readFileSync(root + file, 'utf8').matchAll(/https:\/\/[^"'`\s]+/g)].map(m => m[0])]));
const grammar = readFileSync(root + 'grammar945-addon.js', 'utf8');
const report = {
  generatedAt: new Date().toISOString(),
  note: 'Static audit only. Counts do not establish translation accuracy or live app behavior.',
  translatedExampleSentences: { total: Object.keys(translations).length, filledByLanguage: counts, missingByLanguage: Object.fromEntries(langs.map(l => [l, missing[l].length])) },
  externalDataDependencies: external,
  grammarUsesGenericPlaceholderExamples: grammar.includes('の使い方を確認しましょう'),
  grammarUsesEnglishFallbackForOtherLanguages: /ne: meaning[\s\S]*vi: meaning[\s\S]*my: meaning/.test(grammar)
};
writeFileSync('CONTENT_AUDIT.json', JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
