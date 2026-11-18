import fs from "fs";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY が設定されていません");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE =
  "https://raw.githubusercontent.com/evanclan/OpenJLPT/main/data/json/vocab";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

const OUT =
  "src/vocab-example-translations.generated.json";

const JS_OUT =
  "src/vocab-example-translations.js";

let existing = {};

try {
  existing = JSON.parse(
    fs.readFileSync(OUT, "utf8")
  );
  console.log(
    "✅ 保存済み翻訳を読み込み:",
    Object.keys(existing).length,
    "例文"
  );
} catch {
  console.log("ℹ️ 新しい翻訳ファイルを作成します");
}

function save() {
  fs.writeFileSync(
    OUT,
    JSON.stringify(existing, null, 2)
  );

  fs.writeFileSync(
    JS_OUT,
    `export const EXAMPLE_TRANSLATIONS = ${JSON.stringify(
      existing,
      null,
      2
    )};\n`
  );
}

const sentenceMap = new Map();

for (const level of LEVELS) {
  console.log("📘 読み込み:", level);

  const res = await fetch(
    `${BASE}/${level.toLowerCase()}.json`
  );

  if (!res.ok) {
    throw new Error(
      `${level} download failed: ${res.status}`
    );
  }

  const rows = await res.json();

  for (const row of rows) {
    if (!Array.isArray(row.examples)) continue;

    for (const ex of row.examples.slice(0, 2)) {
      const ja = String(ex?.ja || "").trim();
      if (!ja) continue;

      if (!sentenceMap.has(ja)) {
        sentenceMap.set(ja, {
          en: String(ex?.en || "").trim(),
        });
      }
    }
  }
}

const all = [...sentenceMap.entries()];

console.log("✅ 全例文:", all.length);

const missing = all.filter(([ja]) => {
  const x = existing[ja] || {};

  return !(
    x.en &&
    x.ne &&
    x.vi &&
    x.my &&
    x.zh &&
    x.ptBR
  );
});

console.log(
  "🔎 翻訳が足りない例文:",
  missing.length
);

const BATCH_SIZE = 20;

async function translateBatch(batch) {
  const input = batch.map(([ja, base], index) => ({
    id: index,
    ja,
    en: existing[ja]?.en || base.en || "",
    need: {
      en: !(existing[ja]?.en),
      ne: !(existing[ja]?.ne),
      vi: !(existing[ja]?.vi),
      my: !(existing[ja]?.my),
      zh: !(existing[ja]?.zh),
      ptBR: !(existing[ja]?.ptBR),
    },
  }));

  const prompt = `
You are creating translation data for a Japanese JLPT learning application.

Translate ONLY the fields marked true in "need".

Languages:
en = English
ne = Nepali
vi = Vietnamese
my = Burmese/Myanmar
zh = Simplified Chinese
ptBR = Brazilian Portuguese

Requirements:
- Preserve the exact Japanese sentence.
- Translate naturally and accurately.
- Keep tone, politeness, tense, and nuance.
- Do not explain.
- Do not add notes.
- Do not omit any requested language.
- Output ONLY valid JSON.
- Return one object for every input item.

Required JSON shape:
[
  {
    "id": 0,
    "en": "...",
    "ne": "...",
    "vi": "...",
    "my": "...",
    "zh": "...",
    "ptBR": "..."
  }
]

Input:
${JSON.stringify(input)}
`;

  const response =
    await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

  let text = response.output_text.trim();

  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(text);
}

let completed = 0;

for (
  let i = 0;
  i < missing.length;
  i += BATCH_SIZE
) {
  const batch = missing.slice(
    i,
    i + BATCH_SIZE
  );

  let success = false;

  while (!success) {
    try {
      const translations =
        await translateBatch(batch);

      for (const result of translations) {
        const pair = batch[result.id];

        if (!pair) continue;

        const [ja, base] = pair;

        existing[ja] ||= {};

        if (
          !existing[ja].en &&
          (result.en || base.en)
        ) {
          existing[ja].en =
            result.en || base.en;
        }

        for (const lang of [
          "ne",
          "vi",
          "my",
          "zh",
          "ptBR",
        ]) {
          if (
            !existing[ja][lang] &&
            result[lang]
          ) {
            existing[ja][lang] =
              result[lang];
          }
        }
      }

      save();

      completed += batch.length;

      console.log(
        `✅ ${completed}/${missing.length} 残り翻訳完了`
      );

      success = true;

    } catch (err) {
      console.log(
        "⚠️ APIエラー:",
        err?.message || err
      );

      console.log(
        "⏳ 15秒後に同じ20件を再試行"
      );

      await new Promise(
        r => setTimeout(r, 15000)
      );
    }
  }
}

save();

console.log("");
console.log("🎉 残り翻訳完了");
console.log("✅ English");
console.log("✅ नेपाली");
console.log("✅ Tiếng Việt");
console.log("✅ မြန်မာ");
console.log("✅ 中文");
console.log("✅ Português");
