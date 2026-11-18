import { fetchStudyData } from "./fetchStudyData.js";
const OPENJLPT_BASE =
  "https://raw.githubusercontent.com/evanclan/OpenJLPT/main/data/json/vocab";

const LEVEL_FILES = {
  N5: `${OPENJLPT_BASE}/n5.json`,
  N4: `${OPENJLPT_BASE}/n4.json`,
  N3: `${OPENJLPT_BASE}/n3.json`,
  N2: `${OPENJLPT_BASE}/n2.json`,
  N1: `${OPENJLPT_BASE}/n1.json`,
};


const WORD_TRANSLATIONS = {
  "影響": { ne: "प्रभाव" },
  "響き": { ne: "गुञ्जन / ध्वनि" },
  "響く": { ne: "गुञ्जिनु / प्रतिध्वनित हुनु" },
  "反響": { ne: "प्रतिध्वनि / प्रतिक्रिया" },

  "予測する": { ne: "पूर्वानुमान गर्नु" },
  "予測": { ne: "पूर्वानुमान" },
  "観測": { ne: "अवलोकन" },
  "測る": { ne: "नाप्नु" },
  "測定": { ne: "मापन" },
  "測量": { ne: "सर्वेक्षण / नापजाँच" },
  "推測": { ne: "अनुमान" },

  "比較する": { ne: "तुलना गर्नु" },
  "比較": { ne: "तुलना" },
  "比較的": { ne: "तुलनात्मक रूपमा / अपेक्षाकृत" },

  "環境": { ne: "वातावरण" },
  "国境": { ne: "राष्ट्रिय सीमा" },
  "境界": { ne: "सीमा" },
  "境遇": { ne: "परिस्थिति / अवस्था" }
};

function normalizeWord(row) {
  const jp = String(row?.word || "").trim();
  if (!jp) return null;

  const reading = String(row?.reading || "").trim() || jp;

  const meanings = Array.isArray(row?.meanings)
    ? row.meanings.filter(Boolean).map(String)
    : [];

  const en = meanings.join(" / ") || "Japanese vocabulary";

  const examples = Array.isArray(row?.examples)
    ? row.examples
        .filter(ex => ex && ex.ja)
        .slice(0, 2)
        .map(ex => ({
          ja: String(ex.ja || "").trim(),
          en: String(ex.en || "").trim(),
        }))
    : [];

  return {
    jp,
    reading,
    meaning: {
      en,
      ne: WORD_TRANSLATIONS[jp]?.ne || "",
      vi: WORD_TRANSLATIONS[jp]?.vi || "",
      my: WORD_TRANSLATIONS[jp]?.my || "",
      zh: WORD_TRANSLATIONS[jp]?.zh || "",
      ptBR: WORD_TRANSLATIONS[jp]?.ptBR || "",
    },
    examples,
  };
}


const VERIFIED_EXAMPLES = {
  "水": [
    { ja: "水を一杯ください。", en: "Please give me a glass of water." },
    { ja: "毎日たくさん水を飲みます。", en: "I drink plenty of water every day." },
  ],

  "食べる": [
    { ja: "毎朝パンを食べます。", en: "I eat bread every morning." },
    { ja: "家族と一緒に晩ご飯を食べました。", en: "I ate dinner with my family." },
  ],

  "飲む": [
    { ja: "朝、コーヒーを飲みます。", en: "I drink coffee in the morning." },
    { ja: "薬を飲んで、早く寝ました。", en: "I took some medicine and went to bed early." },
  ],

  "行く": [
    { ja: "明日、学校へ行きます。", en: "I will go to school tomorrow." },
    { ja: "日曜日に友達と映画を見に行きます。", en: "I will go to see a movie with my friend on Sunday." },
  ],

  "仕事": [
    { ja: "父は毎日、電車で仕事に行きます。", en: "My father goes to work by train every day." },
    { ja: "今日は仕事がたくさんあります。", en: "I have a lot of work today." },
  ],

  "忙しい": [
    { ja: "今日は仕事が多くて忙しいです。", en: "I am busy today because I have a lot of work." },
    { ja: "母は朝からとても忙しそうです。", en: "My mother looks very busy this morning." },
  ],

  "暇": [
    { ja: "日曜日は暇なので、友達と映画を見ます。", en: "I am free on Sunday, so I will watch a movie with my friend." },
    { ja: "暇なとき、本を読んでいます。", en: "I read books when I have free time." },
  ],

  "約束": [
    { ja: "友達と駅で会う約束をしました。", en: "I made plans to meet my friend at the station." },
    { ja: "約束の時間に遅れないでください。", en: "Please do not be late for the agreed time." },
  ],

  "説明する": [
    { ja: "先生が文法を分かりやすく説明しました。", en: "The teacher explained the grammar clearly." },
    { ja: "分からないところをもう一度説明してください。", en: "Please explain the part I do not understand again." },
  ],
};

function mergeExamples(target, incoming = []) {
  const current = Array.isArray(target?.examples)
    ? target.examples
    : [];

  const verified = VERIFIED_EXAMPLES[target?.jp] || [];

  const all = [
    ...verified,
    ...current,
    ...incoming,
  ];

  const seen = new Set();

  target.examples = all
    .filter((ex) => {
      const ja = String(ex?.ja || "").trim();

      if (!ja || seen.has(ja)) {
        return false;
      }

      seen.add(ja);
      return true;
    })
    .slice(0, 2);

  return target;
}


function wordKey(item) {
  return String(item?.jp || "").trim();
}

export async function extendVocabWithOpenJLPT(VOCAB) {
  const summary = {};
  let totalAdded = 0;

  for (const level of ["N5", "N4", "N3", "N2", "N1"]) {
    const response = await fetchStudyData(LEVEL_FILES[level], "OpenJLPT vocabulary");

    if (!response.ok) {
      throw new Error(
        `OpenJLPT ${level} vocabulary download failed: ${response.status}`
      );
    }

    const rows = await response.json();

    if (!Array.isArray(rows)) {
      throw new Error(`OpenJLPT ${level} data is not an array.`);
    }

    if (!Array.isArray(VOCAB[level])) {
      VOCAB[level] = [];
    }

    const existing = new Set(VOCAB[level].map(wordKey));

    let added = 0;

    for (const row of rows) {
      const item = normalizeWord(row);

      if (!item) continue;

      const key = wordKey(item);

      if (!key) continue;

      // すでにある単語なら、OpenJLPTの例文を追加
      if (existing.has(key)) {
        const target = VOCAB[level].find(
          (existingItem) => wordKey(existingItem) === key
        );

        if (target) {
          mergeExamples(target, item.examples);
        }

        continue;
      }

      VOCAB[level].push(mergeExamples(item, item.examples));
      existing.add(key);

      added++;
      totalAdded++;
    }

    // OpenJLPTに存在しない既存語にも確認済み例文を反映
    VOCAB[level].forEach((vocabItem) => {
      if (VERIFIED_EXAMPLES[vocabItem.jp]) {
        mergeExamples(vocabItem, []);
      }
    });

    summary[level] = {
      added,
      totalAfterMerge: VOCAB[level].length,
    };
  }

  const uniqueTotal = new Set(
    Object.values(VOCAB)
      .flat()
      .map(wordKey)
      .filter(Boolean)
  ).size;

  console.log("単語追加完了", summary);
  console.log(`追加単語: ${totalAdded}`);
  console.log(`単語総数: ${uniqueTotal}`);

  return {
    VOCAB,
    summary,
    added: totalAdded,
    total: uniqueTotal,
  };
}
