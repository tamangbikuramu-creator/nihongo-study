import { fetchStudyData } from "./fetchStudyData.js";
// kanji2136-addon.js
// Adds the full 2,136 Jōyō kanji list at runtime and merges it into the existing KANJI object.

const JOYO_API =
  "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_j%C5%8Dy%C5%8D_kanji&prop=text&format=json&origin=*";

function cleanReadingToken(s) {
  return s
    .replace(/[（）()［］\[\]]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function isKatakanaReading(s) {
  const x = s.replace(/[ー・,\-]/g, "");
  return x && [...x].every(ch => /[\u30A0-\u30FF]/.test(ch));
}

function isHiraganaReading(s) {
  return /[\u3040-\u309F]/.test(s);
}

function gradeToJlpt(grade, secondaryIndex) {
  if (grade === "1" || grade === "2") return "N5";
  if (grade === "3" || grade === "4") return "N4";
  if (grade === "5" || grade === "6") return "N3";
  return secondaryIndex < 550 ? "N2" : "N1";
}

function normalizeRow(cells, secondaryIndex) {
  const jp = cells[1]?.textContent?.trim();
  const grade = cells[5]?.textContent?.trim();
  const en = cells[7]?.textContent?.trim() || "common-use kanji";
  const readingsRaw = cells[8]?.textContent?.trim() || "";

  if (!jp || !grade) return null;

  const readings = readingsRaw
    .split(/[、,]/)
    .map(cleanReadingToken)
    .filter(Boolean);

  const on = readings.filter(isKatakanaReading);
  const kun = readings.filter(isHiraganaReading);

  return {
    level: gradeToJlpt(grade, secondaryIndex),
    item: {
      jp,
      reading: readings.join("・") || "—",
      onyomi: on.join("、") || "（なし）",
      kunyomi: kun.join("、") || "（なし）",
      meaning: {
        en,
        ne: en,
        vi: en,
        my: en,
      },
      joyoGrade: grade,
      source: "Jōyō Kanji 2136",
    },
  };
}

export async function extendKanjiTo2136(KANJI) {
  const response = await fetchStudyData(JOYO_API, "Joyo kanji");

  if (!response.ok) {
    throw new Error(`Jōyō kanji download failed: ${response.status}`);
  }

  const json = await response.json();
  const html = json?.parse?.text?.["*"];

  if (!html) {
    throw new Error("Jōyō kanji data was not found.");
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const rows = [...doc.querySelectorAll("table.wikitable tbody tr")];

  const existing = new Set(
    Object.values(KANJI)
      .flat()
      .map(x => x.jp)
  );

  let secondaryIndex = 0;
  let added = 0;

  for (const row of rows) {
    const cells = [...row.querySelectorAll("td")];

    if (cells.length < 9) continue;

    const grade = cells[5]?.textContent?.trim();
    const data = normalizeRow(cells, secondaryIndex);

    if (!data) continue;

    if (grade === "S") {
      secondaryIndex += 1;
    }

    const { level, item } = data;

    if (existing.has(item.jp)) continue;

    KANJI[level].push(item);
    existing.add(item.jp);
    added += 1;
  }

  const total = new Set(
    Object.values(KANJI)
      .flat()
      .map(x => x.jp)
  ).size;

  console.log(`✅ Jōyō kanji added: ${added}`);
  console.log(`✅ Total unique kanji: ${total}`);

  return { added, total, KANJI };
}
