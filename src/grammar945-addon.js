import { fetchStudyData } from "./fetchStudyData.js";
const JPGRAM_TAXONOMY =
  "https://raw.githubusercontent.com/yanzay/jpgram/main/data/grammar_taxonomy_bunpro.tsv";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

function clean(s = "") {
  return String(s).replace(/\s+/g, " ").trim();
}

function hasJapanese(s = "") {
  return /[\u3040-\u30ff\u3400-\u9fff]/.test(s);
}

function normalizePattern(s = "") {
  return clean(s)
    .replace(/\s*\([^)]*\)\s*/g, "")
    .replace(/^["'`]+|["'`]+$/g, "");
}

function parseNotes(notes, slug) {
  const parts = String(notes || "")
    .split(";")
    .map(clean)
    .filter(Boolean);

  const candidates = parts.filter(
    (p) =>
      !/^strict-deck$/i.test(p) &&
      !/^bunpro:/i.test(p) &&
      !/^Foundation module:/i.test(p)
  );

  let pattern =
    candidates.find((p) => hasJapanese(p)) ||
    candidates[0] ||
    slug.replace(/-/g, " ");

  pattern = normalizePattern(pattern);

  let meaning =
    [...candidates]
      .reverse()
      .find((p) => !hasJapanese(p) && p.length > 1) ||
    "Japanese grammar pattern";

  meaning = clean(meaning);

  return { pattern, meaning };
}

// Only verified instructional examples are eligible for the add-on.
// Unverified taxonomy rows are intentionally omitted rather than shown as fake examples.
const VERIFIED_EXAMPLES = {
  '〜ている': ['今、本を読んでいます。', 'I am reading a book now.'],
  'ている': ['今、本を読んでいます。', 'I am reading a book now.'],
  '〜たい': ['日本に行きたいです。', 'I want to go to Japan.'],
  'たい': ['日本に行きたいです。', 'I want to go to Japan.'],
  '〜てもいい': ['ここに座ってもいいですか。', 'May I sit here?'],
  'てもいい': ['ここに座ってもいいですか。', 'May I sit here?'],
  '〜てはいけない': ['ここで写真を撮ってはいけません。', 'You must not take photos here.'],
  'てはいけない': ['ここで写真を撮ってはいけません。', 'You must not take photos here.'],
  '〜たことがある': ['京都に行ったことがあります。', 'I have been to Kyoto.'],
  'たことがある': ['京都に行ったことがあります。', 'I have been to Kyoto.'],
  '〜ながら': ['音楽を聞きながら勉強します。', 'I study while listening to music.'],
  'ながら': ['音楽を聞きながら勉強します。', 'I study while listening to music.'],
  '〜なければならない': ['明日までに宿題をしなければなりません。', 'I must finish my homework by tomorrow.'],
  'なければならない': ['明日までに宿題をしなければなりません。', 'I must finish my homework by tomorrow.'],
  '〜ほうがいい': ['早く寝たほうがいいです。', 'You should go to bed early.'],
  'ほうがいい': ['早く寝たほうがいいです。', 'You should go to bed early.'],
  '〜つもり': ['来年、日本語能力試験を受けるつもりです。', 'I intend to take the JLPT next year.'],
  'つもり': ['来年、日本語能力試験を受けるつもりです。', 'I intend to take the JLPT next year.'],
  '〜そうだ': ['雨が降りそうです。', 'It looks like it is going to rain.'],
  '〜ために': ['日本で働くために日本語を勉強しています。', 'I study Japanese in order to work in Japan.'],
  'ために': ['日本で働くために日本語を勉強しています。', 'I study Japanese in order to work in Japan.'],
};

// Reviewed multilingual translations for the curated examples above.
// Do not invent translations for unreviewed grammar patterns.
const VERIFIED_GRAMMAR_TRANSLATIONS = {
  '今、本を読んでいます。': {ne:'अहिले म किताब पढिरहेको छु।',vi:'Bây giờ tôi đang đọc sách.',my:'အခု စာအုပ်ဖတ်နေပါတယ်။'},
  '日本に行きたいです。': {ne:'म जापान जान चाहन्छु।',vi:'Tôi muốn đến Nhật Bản.',my:'ဂျပန်ကို သွားချင်ပါတယ်။'},
  'ここに座ってもいいですか。': {ne:'के म यहाँ बस्न सक्छु?',vi:'Tôi có thể ngồi đây không?',my:'ဒီမှာ ထိုင်လို့ရမလား။'},
  'ここで写真を撮ってはいけません。': {ne:'यहाँ फोटो खिच्न पाइँदैन।',vi:'Không được chụp ảnh ở đây.',my:'ဒီမှာ ဓာတ်ပုံမရိုက်ရပါ။'},
  '京都に行ったことがあります。': {ne:'म क्योटो गएको छु।',vi:'Tôi đã từng đến Kyoto.',my:'ကျိုတိုကို သွားဖူးပါတယ်။'},
  '音楽を聞きながら勉強します。': {ne:'म सङ्गीत सुन्दै पढ्छु।',vi:'Tôi học trong khi nghe nhạc.',my:'သီချင်းနားထောင်ရင်း စာလေ့လာပါတယ်။'},
  '明日までに宿題をしなければなりません。': {ne:'मैले भोलिसम्म गृहकार्य गर्नैपर्छ।',vi:'Tôi phải làm xong bài tập về nhà trước ngày mai.',my:'မနက်ဖြန်မတိုင်ခင် အိမ်စာလုပ်ရမယ်။'},
  '早く寝たほうがいいです。': {ne:'चाँडै सुत्नु राम्रो हुन्छ।',vi:'Bạn nên đi ngủ sớm.',my:'စောစောအိပ်တာ ပိုကောင်းပါတယ်။'},
  '来年、日本語能力試験を受けるつもりです。': {ne:'म अर्को वर्ष जापानी भाषा दक्षता परीक्षा दिने योजना बनाएको छु।',vi:'Năm sau tôi định thi JLPT.',my:'နောက်နှစ် JLPT စာမေးပွဲဖြေဖို့ စီစဉ်ထားပါတယ်။'},
  '雨が降りそうです。': {ne:'पानी पर्ला जस्तो छ।',vi:'Có vẻ trời sắp mưa.',my:'မိုးရွာတော့မယ့်ပုံပဲ။'},
  '日本で働くために日本語を勉強しています。': {ne:'जापानमा काम गर्नका लागि जापानी भाषा पढ्दै छु।',vi:'Tôi học tiếng Nhật để làm việc tại Nhật Bản.',my:'ဂျပန်မှာ အလုပ်လုပ်ဖို့ ဂျပန်စာလေ့လာနေပါတယ်။'},
};

function makeGrammarItem(row) {
  const { slug, level, notes } = row;
  const { pattern, meaning } = parseNotes(notes, slug);

  if (!pattern) return null;

  const verified = VERIFIED_EXAMPLES[pattern];
  if (!verified) return null;
  const [safeExample, englishExample] = verified;
  const translated = VERIFIED_GRAMMAR_TRANSLATIONS[safeExample] || {};

  return {
    pattern,
    blank: `次の意味・使い方に合う文法を選んでください：＿＿＿`,
    connection: pattern,
    note: {
      ja: `${level}の文法項目です。接続と使い方を確認してください。`,
      en: `${level} grammar point. Review its connection and usage.`,
      ne: `${level} व्याकरण बुँदा। यसको प्रयोग हेर्नुहोस्।`,
      vi: `Điểm ngữ pháp ${level}. Hãy ôn cách dùng.`,
      my: `${level} သဒ္ဒါအချက်။ အသုံးပြုပုံကို လေ့လာပါ။`,
    },
    meaning: {
      ja: `「${pattern}」の文法`,
      en: meaning,
      ne: "",
      vi: "",
      my: "",
    },
    example: {
      jp: safeExample,
      reading: safeExample,
      translation: {
        en: englishExample,
        ne: translated.ne || "",
        vi: translated.vi || "",
        my: translated.my || "",
      },
    },
  };
}

function parseTSV(text) {
  const rows = [];

  for (const rawLine of String(text).split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const cols = rawLine.split("\t");

    if (cols.length < 2) continue;

    const slug = clean(cols[0]);
    const jlpt = clean(cols[1]).toUpperCase();
    const module = clean(cols[2]);
    const notes = clean(cols[8] || "");

    if (!LEVELS.includes(jlpt)) continue;

    const level = module === "00-foundation" ? "N5" : jlpt;

    rows.push({
      slug,
      level,
      module,
      notes,
    });
  }

  return rows;
}

function keyOf(item) {
  return normalizePattern(item?.pattern || "")
    .replace(/[〜～\s・]/g, "")
    .toLowerCase();
}

export async function extendGrammarToAbout900(GRAMMAR) {
  const response = await fetchStudyData(JPGRAM_TAXONOMY, "Grammar taxonomy");

  if (!response.ok) {
    throw new Error(`文法データ取得失敗: ${response.status}`);
  }

  const text = await response.text();
  const rows = parseTSV(text);

  const summary = {};
  let addedTotal = 0;

  for (const level of LEVELS) {
    if (!Array.isArray(GRAMMAR[level])) {
      GRAMMAR[level] = [];
    }

    const existing = new Set(
      GRAMMAR[level].map(keyOf).filter(Boolean)
    );

    let added = 0;

    for (const row of rows.filter((r) => r.level === level)) {
      const item = makeGrammarItem(row);

      if (!item) continue;

      const key = keyOf(item);

      if (!key || existing.has(key)) continue;

      GRAMMAR[level].push(item);
      existing.add(key);

      added++;
      addedTotal++;
    }

    summary[level] = {
      added,
      totalAfterMerge: GRAMMAR[level].length,
    };
  }

  const all = LEVELS.flatMap((lv) => GRAMMAR[lv] || []);

  const uniqueTotal = new Set(
    all.map(keyOf).filter(Boolean)
  ).size;

  console.log("文法追加完了", summary);
  console.log(`今回追加: ${addedTotal}`);
  console.log(`文法総数: ${uniqueTotal}`);

  return {
    GRAMMAR,
    summary,
    added: addedTotal,
    total: uniqueTotal,
  };
}
