import fs from "fs";

const BASE =
  "https://raw.githubusercontent.com/evanclan/OpenJLPT/main/data/json/vocab";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

let translations = {};

try {
  translations = JSON.parse(
    fs.readFileSync(
      "src/vocab-example-translations.generated.json",
      "utf8"
    )
  );
} catch {}

let words = 0;
let zero = 0;
let one = 0;
let two = 0;
let requiredExamples = new Set();

const byLevel = {};

for (const level of LEVELS) {
  const res = await fetch(
    `${BASE}/${level.toLowerCase()}.json`
  );

  if (!res.ok)
    throw new Error(`${level}: HTTP ${res.status}`);

  const rows = await res.json();

  let l0 = 0;
  let l1 = 0;
  let l2 = 0;

  for (const row of rows) {
    words++;

    const examples = Array.isArray(row.examples)
      ? row.examples
          .filter(x => String(x?.ja || "").trim())
          .slice(0, 2)
      : [];

    if (examples.length === 0) {
      zero++;
      l0++;
    } else if (examples.length === 1) {
      one++;
      l1++;
    } else {
      two++;
      l2++;
    }

    for (const ex of examples) {
      requiredExamples.add(ex.ja.trim());
    }
  }

  byLevel[level] = {
    words: rows.length,
    zero: l0,
    one: l1,
    two: l2
  };
}

console.log("\n========== 単語・例文 ==========");

for (const [level, x] of Object.entries(byLevel)) {
  console.log(
    `${level}: ${x.words}語 | 0例=${x.zero} | 1例=${x.one} | 2例=${x.two}`
  );
}

console.log("\n単語総数:", words);
console.log("例文0個:", zero);
console.log("例文1個:", one);
console.log("例文2個:", two);

console.log(
  "2例文にするため新しく必要な例文:",
  zero * 2 + one
);

console.log(
  "OpenJLPTから利用できる固有例文:",
  requiredExamples.size
);

console.log("\n========== 翻訳 ==========");

const langs = [
  ["en", "English"],
  ["ne", "नेपाली"],
  ["vi", "Tiếng Việt"],
  ["my", "မြန်မာ"],
  ["zh", "中文"],
  ["ptBR", "Português"]
];

for (const [key, name] of langs) {
  let done = 0;
  let missing = 0;

  for (const ja of requiredExamples) {
    if (
      String(translations?.[ja]?.[key] || "").trim()
    ) {
      done++;
    } else {
      missing++;
    }
  }

  console.log(
    `${name}: 完了 ${done} / ${requiredExamples.size} | 残り ${missing}`
  );
}

console.log("\n========== 最終目標 ==========");
console.log("必要単語: 8,334");
console.log("必要例文: 16,668");
console.log("必要言語: en/ne/vi/my/zh/ptBR");
console.log("================================");
