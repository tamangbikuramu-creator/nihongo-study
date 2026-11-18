import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root = new URL('../', import.meta.url);
const generated = JSON.parse(readFileSync(new URL('src/vocab-example-translations.generated.json',root),'utf8'));
const grammar = readFileSync(new URL('src/grammar945-addon.js',root),'utf8');
test('generated translations use day after tomorrow in all five languages',()=>{
  for(const jp of ['あさって来てください。','あさってはトムの誕生日だ。']){
    for(const [lang,re] of Object.entries({ne:/पर्सि/,vi:/ngày kia/i,my:/သန်ဘက်ခါ/,zh:/后天/,ptBR:/depois de amanhã/i})){
      assert.match(generated[jp][lang],re,`${jp}: ${lang}`);
    }
  }
});
test('curated grammar multilingual translation lookup is connected',()=>{
  assert.match(grammar,/const translated = VERIFIED_GRAMMAR_TRANSLATIONS\[safeExample\]/);
  for(const lang of ['ne','vi','my']) assert.match(grammar,new RegExp(`${lang}: translated\\.${lang}`));
});
