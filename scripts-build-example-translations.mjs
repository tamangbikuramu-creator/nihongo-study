import fs from "fs";

const BASE =
  "https://raw.githubusercontent.com/evanclan/OpenJLPT/main/data/json/vocab";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

const LANGS = {
  ne: "ne",
  vi: "vi",
  my: "my",
  zh: "zh-CN",
  ptBR: "pt",
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function translate(text, target) {
  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&sl=ja" +
    "&tl=" + encodeURIComponent(target) +
    "&dt=t" +
    "&q=" + encodeURIComponent(text);

  while (true) {
    try {
      const res = await fetch(url);

      if (res.status === 429 || res.status === 403) {
        console.log("⏳ 翻訳制限中。60秒待って再試行します...");
        await sleep(60000);
        continue;
      }

      if (!res.ok) {
        console.log(`⏳ HTTP ${res.status}。20秒待って再試行します...`);
        await sleep(20000);
        continue;
      }

      const data = await res.json();

      const result = Array.isArray(data?.[0])
        ? data[0].map(x => x?.[0] || "").join("").trim()
        : "";

      if (result) return result;

      await sleep(10000);

    } catch (e) {
      console.log("⏳ 接続エラー。20秒待って再試行します...");
      await sleep(20000);
    }
  }
}

let existing = {};

try {
  const old = fs.readFileSync(
    "src/vocab-example-translations.generated.json",
    "utf8"
  );
  existing = JSON.parse(old);
} catch {}

const sentences = new Map();

for (const level of LEVELS) {
  console.log("📘 読み込み:", level);

  const res = await fetch(
    `${BASE}/${level.toLowerCase()}.json`
  );

  if (!res.ok) {
    throw new Error(`${level} download failed: ${res.status}`);
  }

  const rows = await res.json();

  for (const row of rows) {
    if (!Array.isArray(row.examples)) continue;

    for (const ex of row.examples.slice(0, 2)) {
      const ja = String(ex?.ja || "").trim();
      if (!ja) continue;

      if (!sentences.has(ja)) {
        sentences.set(ja, {
          en: String(ex?.en || "").trim(),
        });
      }
    }
  }
}

console.log("✅ 例文総数:", sentences.size);

let done = 0;

for (const [ja, base] of sentences) {
  if (!existing[ja]) {
    existing[ja] = {};
  }

  if (base.en && !existing[ja].en) {
    existing[ja].en = base.en;
  }

  for (const [key, target] of Object.entries(LANGS)) {
    if (existing[ja][key]) continue;

    const result = await translate(ja, target);

    if (result) {
      existing[ja][key] = result;

      fs.writeFileSync(
        "src/vocab-example-translations.generated.json",
        JSON.stringify(existing, null, 2)
      );
    }

    await sleep(1200);
  }

  done++;

  if (done % 25 === 0) {
    fs.writeFileSync(
      "src/vocab-example-translations.generated.json",
      JSON.stringify(existing, null, 2)
    );

    console.log(`✅ ${done}/${sentences.size}`);
  }
}

fs.writeFileSync(
  "src/vocab-example-translations.generated.json",
  JSON.stringify(existing, null, 2)
);

const js =
`export const EXAMPLE_TRANSLATIONS = ${JSON.stringify(existing, null, 2)};\n`;

fs.writeFileSync(
  "src/vocab-example-translations.js",
  js
);

console.log("");
console.log("🎉 全例文の翻訳データ作成完了");
console.log("✅ English");
console.log("✅ नेपाली");
console.log("✅ Tiếng Việt");
console.log("✅ မြန်မာ");
console.log("✅ 中文");
console.log("✅ Português");
