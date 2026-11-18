import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { pathToFileURL } from "url";

const require = createRequire(import.meta.url);
const kuromoji = require("kuromoji");
const ROOT = process.cwd();
const DICT = path.join(ROOT, "node_modules", "kuromoji", "dict");
const OUT = path.join(ROOT, "src", "vocab-example-furigana.generated.js");

const hira = (s="") => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const esc = (s="") => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

function buildTokenizer() {
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: DICT }).build((err, tokenizer) => err ? reject(err) : resolve(tokenizer));
  });
}

function rubyFor(tokenizer, sentence) {
  if (!sentence || !/[一-龯々]/.test(sentence)) return esc(sentence || "");
  return tokenizer.tokenize(sentence).map(token => {
    const surface = token.surface_form || "";
    if (!/[一-龯々]/.test(surface) || !token.reading) return esc(surface);
    return `<ruby><rb>${esc(surface)}</rb><rt>${esc(hira(token.reading))}</rt></ruby>`;
  }).join("");
}

function collectExamples(node, set, seen = new WeakSet()) {
  if (!node || typeof node !== "object") return;
  if (seen.has(node)) return;
  seen.add(node);
  if (Array.isArray(node)) {
    for (const x of node) collectExamples(x, set, seen);
    return;
  }
  if (Array.isArray(node.examples)) {
    for (const ex of node.examples) {
      const s = ex?.ja || ex?.jp || ex?.japanese || ex?.sentence;
      if (typeof s === "string" && s.trim()) set.add(s.trim());
    }
  }
  for (const v of Object.values(node)) {
    if (v && typeof v === "object") collectExamples(v, set, seen);
  }
}

async function addTranslationKeys(set) {
  const candidates = [
    "src/vocab-example-translations.js",
    "src/vocab-example-translations-latest.js",
    "src/vocab-example-translations-final.js",
    "src/vocab-example-translations-app-ready.js"
  ];
  for (const rel of candidates) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    try {
      const mod = await import(pathToFileURL(full).href + `?t=${Date.now()}`);
      const obj = mod.EXAMPLE_TRANSLATIONS || mod.default;
      if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj)) {
          if (key && /[ぁ-んァ-ヶ一-龯]/.test(key)) set.add(key.trim());
        }
      }
    } catch {}
  }
}

async function addOpenJLPT(set) {
  for (const level of ["n5","n4","n3","n2","n1"]) {
    const url = `https://raw.githubusercontent.com/evanclan/OpenJLPT/main/data/json/vocab/${level}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${level}: HTTP ${res.status}`);
    const data = await res.json();
    const before = set.size;

    // OpenJLPTに元からある例文
    collectExamples(data, set);

    // アプリが不足時に作る例文も事前生成する
    const addFallbacks = (node) => {
      if (!node) return;

      if (Array.isArray(node)) {
        for (const item of node) addFallbacks(item);
        return;
      }

      if (typeof node !== "object") return;

      const word =
        node.word ||
        node.jp ||
        node.japanese ||
        node.term ||
        node.vocabulary;

      if (typeof word === "string" && word.trim()) {
        const w = word.trim();

        set.add(`「${w}」という言葉を勉強しています。`);
        set.add(`「${w}」の意味と使い方を確認しましょう。`);
      }

      for (const value of Object.values(node)) {
        if (value && typeof value === "object") {
          addFallbacks(value);
        }
      }
    };

    addFallbacks(data);

    console.log(`${level.toUpperCase()}: +${set.size - before}`);
  }
}

const sentences = new Set();
await addTranslationKeys(sentences);
try { await addOpenJLPT(sentences); } catch (e) { console.error("OpenJLPT取得エラー:", e.message); }

const tokenizer = await buildTokenizer();
const result = {};
let i = 0;
for (const sentence of sentences) {
  result[sentence] = rubyFor(tokenizer, sentence);
  i++;
  if (i % 1000 === 0) console.log(`${i}/${sentences.size}`);
}

fs.writeFileSync(
  OUT,
  `// AUTO-GENERATED\nexport const EXAMPLE_FURIGANA = ${JSON.stringify(result, null, 2)};\n`,
  "utf8"
);

console.log(`✅ ふりがな生成完了: ${Object.keys(result).length}例文`);
