import { existsSync, readFileSync } from 'node:fs';
const required = ['src/App.jsx','src/index.css','src/kanji2136-addon.js','src/vocab8334-addon.js','src/grammar945-addon.js','src/vocab-example-translations.js','src/vocab-real-examples.js','index.html'];
let failures = 0;
for (const file of required) {
  const ok = existsSync(file);
  console.log(`${ok ? 'OK' : 'MISSING'} ${file}`);
  if (!ok) failures++;
}
const app = readFileSync('src/App.jsx','utf8');
for (const name of ['extendKanjiTo2136','extendVocabWithOpenJLPT','extendGrammarToAbout900']) {
  const ok = app.includes(`${name}(`);
  console.log(`${ok ? 'OK' : 'MISSING'} runtime loader: ${name}`);
  if (!ok) failures++;
}
console.log('\nNOTE: This is a static integrity check, not proof that all study items or translations are complete.');
process.exitCode = failures ? 1 : 0;
