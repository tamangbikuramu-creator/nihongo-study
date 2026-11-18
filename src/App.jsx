import { REAL_VOCAB_EXAMPLES } from "./vocab-real-examples.js";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { EXAMPLE_TRANSLATIONS } from "./vocab-example-translations.js";
import { Volume2, ChevronLeft, ChevronRight, RotateCw, Check, X, Languages, BookOpen, Link2, Sparkles, PartyPopper, Heart, Flame, Lock, Coins, Swords, Trophy, Pause, Play } from "lucide-react";
import { extendKanjiTo2136 } from "./kanji2136-addon.js";
import { extendVocabWithOpenJLPT } from "./vocab8334-addon.js";
import { extendGrammarToAbout900 } from "./grammar945-addon.js";
import FuriganaText from "./FuriganaText.jsx";

/* ============================= UI STRINGS ============================= */
const UI = {
  ja: { appTitle: "にほんご学習", sub: "在日外国人のための日本語アプリ", level: "レベル", category: "カテゴリー", mode: "モード",
    list: "リスト", flashcard: "カード", quiz: "クイズ", conversation: "会話練習",
    play: "再生", next: "次へ", prev: "前へ", flip: "めくる", meaning: "意味", reading: "読み方",
    correct: "正解！", incorrect: "残念…", score: "スコア", moji: "文字", vocab: "単語", kanji: "漢字", grammar: "文法",
    chooseAnswer: "正しい意味を選んでください", tapToFlip: "タップしてめくる", of: "／", speaker: "話者", example: "例文", connection: "接続", note: "ニュアンス",
    reading2: "読解", listening: "聴解", passage: "本文", showText: "本文を表示", hideText: "本文を隠す",
    questionLabel: "問題", checkAnswers: "答え合わせ", allDone: "全問終了！", scoreOutOf: "正解数", chooseGrammar: "（　）に入る正しい文法を選んでください", chooseReading: "正しい読み方を選んでください",
    onyomi: "音読み", kunyomi: "訓読み",
    game: "ゲーム", gameTitle: "カード合わせ", movesLabel: "手数", timeLabel: "タイム", playAgain: "もう一度", matchedAll: "全部そろいました！",
    wordLink: "ワードリンク", wordLinkDesc: "しりとりで単語をつなげよう！", livesLabel: "ライフ", streakLabel: "連続正解",
    nextPrefix: "次は", nextSuffix: "から始まる言葉は？", winMsg: "全部つながりました！おめでとう", gameOverMsg: "残念、でもよく頑張りました！",
    correctAnswerWas: "正解は", trivia: "豆知識：「ん」で終わる言葉を言うと、本当のしりとりでは負けです！", wordsLinked: "つながった言葉",
    hp: "HP", lvLabel: "Lv", coinsLabel: "コイン", victory: "勝利！", defeat: "やられた…", locked: "ロック中",
    backToMap: "マップに戻る", rewardsLabel: "報酬", stageClear: "ステージクリア！", questTitle: "KANJI QUEST", tapToStart: "タップして挑戦",
    write: "書き取り", writeInstruction: "見本を見ながら書いてみましょう", checkBtn: "チェック", clearBtn: "消す", nextKanji: "次の漢字",
    correctDraw: "よくできました！", incorrectDraw: "もう一度書いてみましょう", checking: "判定中…", apiError: "判定できませんでした。もう一度お試しください。" },
  en: { appTitle: "Nihongo Study", sub: "A Japanese app for everyone living in Japan", level: "Level", category: "Category", mode: "Mode",
    list: "List", flashcard: "Flashcard", quiz: "Quiz", conversation: "Conversation",
    play: "Play", next: "Next", prev: "Previous", flip: "Flip", meaning: "Meaning", reading: "Reading",
    correct: "Correct!", incorrect: "Not quite", score: "Score", moji: "Characters", vocab: "Vocabulary", kanji: "Kanji", grammar: "Grammar",
    chooseAnswer: "Choose the correct meaning", tapToFlip: "Tap to flip", of: "of", speaker: "Speaker", example: "Example", connection: "Connection form", note: "Nuance",
    reading2: "Reading", listening: "Listening", passage: "Passage", showText: "Show text", hideText: "Hide text",
    questionLabel: "Question", checkAnswers: "Check answers", allDone: "All done!", scoreOutOf: "Correct", chooseGrammar: "Choose the grammar that fits the blank", chooseReading: "Choose the correct reading",
    onyomi: "On-reading", kunyomi: "Kun-reading",
    game: "Game", gameTitle: "Card Match", movesLabel: "Moves", timeLabel: "Time", playAgain: "Play Again", matchedAll: "You matched them all!",
    wordLink: "Word Link", wordLinkDesc: "Chain the words together, shiritori-style!", livesLabel: "Lives", streakLabel: "Streak",
    nextPrefix: "Which word starts with", nextSuffix: "?", winMsg: "You linked them all! Congratulations", gameOverMsg: "Nice try — great effort!",
    correctAnswerWas: "The correct answer was", trivia: "Fun fact: in real shiritori, saying a word ending in ん makes you lose!", wordsLinked: "Words linked",
    hp: "HP", lvLabel: "Lv", coinsLabel: "Coins", victory: "Victory!", defeat: "Defeated...", locked: "Locked",
    backToMap: "Back to map", rewardsLabel: "Rewards", stageClear: "Stage Clear!", questTitle: "KANJI QUEST", tapToStart: "Tap to challenge",
    write: "Writing", writeInstruction: "Look at the model and try writing it", checkBtn: "Check", clearBtn: "Clear", nextKanji: "Next kanji",
    correctDraw: "Well done!", incorrectDraw: "Try writing it again", checking: "Checking…", apiError: "Couldn't check the drawing. Please try again." },
  ne: { appTitle: "जापानी भाषा अध्ययन", sub: "जापानमा बस्ने सबैका लागि जापानी भाषा एप", level: "तह", category: "श्रेणी", mode: "मोड",
    list: "सूची", flashcard: "फ्ल्यासकार्ड", quiz: "क्विज", conversation: "कुराकानी अभ्यास",
    play: "बजाउनुहोस्", next: "अर्को", prev: "अघिल्लो", flip: "पल्टाउनुहोस्", meaning: "अर्थ", reading: "उच्चारण",
    correct: "सही!", incorrect: "फेरि प्रयास गर्नुहोस्", score: "अंक", moji: "अक्षरहरू", vocab: "शब्दहरू", kanji: "कान्जी", grammar: "व्याकरण",
    chooseAnswer: "सही अर्थ छान्नुहोस्", tapToFlip: "पल्टाउन ट्याप गर्नुहोस्", of: "मध्ये", speaker: "वक्ता", example: "उदाहरण वाक्य", connection: "जोड्ने रूप", note: "सूक्ष्म भिन्नता",
    reading2: "पठन बुझाइ", listening: "सुनाइ बुझाइ", passage: "अनुच्छेद", showText: "पाठ देखाउनुहोस्", hideText: "पाठ लुकाउनुहोस्",
    questionLabel: "प्रश्न", checkAnswers: "उत्तर जाँच", allDone: "सबै सकियो!", scoreOutOf: "सही", chooseGrammar: "रिक्त स्थानमा मिल्ने सही व्याकरण छान्नुहोस्", chooseReading: "सही उच्चारण छान्नुहोस्",
    onyomi: "अन पठन (音読み)", kunyomi: "कुन पठन (訓読み)",
    game: "खेल", gameTitle: "कार्ड मिलान", movesLabel: "चालहरू", timeLabel: "समय", playAgain: "फेरि खेल्नुहोस्", matchedAll: "सबै मिलाउनुभयो!",
    wordLink: "वर्ड लिंक", wordLinkDesc: "शिरितोरी शैलीमा शब्दहरू जोड्नुहोस्!", livesLabel: "जीवन", streakLabel: "लगातार सही",
    nextPrefix: "", nextSuffix: " बाट सुरु हुने शब्द कुन हो?", winMsg: "सबै जोडियो! बधाई छ", gameOverMsg: "राम्रो प्रयास — धेरै मेहनत गर्नुभयो!",
    correctAnswerWas: "सही उत्तर थियो", trivia: "रोचक तथ्य: वास्तविक शिरितोरीमा「ん」मा सकिने शब्द भन्दा हार्नुहुन्छ!", wordsLinked: "जोडिएका शब्दहरू",
    hp: "HP", lvLabel: "Lv", coinsLabel: "सिक्का", victory: "विजय!", defeat: "हार भयो...", locked: "लक गरिएको",
    backToMap: "नक्सामा फर्कनुहोस्", rewardsLabel: "पुरस्कार", stageClear: "चरण पूरा!", questTitle: "KANJI QUEST", tapToStart: "चुनौतीका लागि ट्याप गर्नुहोस्",
    write: "लेखन", writeInstruction: "नमूना हेर्दै लेख्ने प्रयास गर्नुहोस्", checkBtn: "जाँच गर्नुहोस्", clearBtn: "मेटाउनुहोस्", nextKanji: "अर्को कान्जी",
    correctDraw: "राम्रो भयो!", incorrectDraw: "फेरि लेख्ने प्रयास गर्नुहोस्", checking: "जाँच हुँदैछ…", apiError: "जाँच गर्न सकिएन। फेरि प्रयास गर्नुहोस्।" },
  vi: { appTitle: "Học Tiếng Nhật", sub: "Ứng dụng tiếng Nhật cho mọi người sống ở Nhật Bản", level: "Trình độ", category: "Danh mục", mode: "Chế độ",
    list: "Danh sách", flashcard: "Thẻ ghi nhớ", quiz: "Trắc nghiệm", conversation: "Luyện hội thoại",
    play: "Phát âm", next: "Tiếp theo", prev: "Trước", flip: "Lật thẻ", meaning: "Nghĩa", reading: "Cách đọc",
    correct: "Chính xác!", incorrect: "Chưa đúng", score: "Điểm", moji: "Chữ cái", vocab: "Từ vựng", kanji: "Chữ Hán", grammar: "Ngữ pháp",
    chooseAnswer: "Chọn nghĩa đúng", tapToFlip: "Chạm để lật", of: "trên", speaker: "Người nói", example: "Câu ví dụ", connection: "Cách nối", note: "Sắc thái",
    reading2: "Đọc hiểu", listening: "Nghe hiểu", passage: "Đoạn văn", showText: "Hiện văn bản", hideText: "Ẩn văn bản",
    questionLabel: "Câu hỏi", checkAnswers: "Kiểm tra đáp án", allDone: "Hoàn thành!", scoreOutOf: "Đúng", chooseGrammar: "Chọn ngữ pháp đúng để điền vào chỗ trống", chooseReading: "Chọn cách đọc đúng",
    onyomi: "Âm On (音読み)", kunyomi: "Âm Kun (訓読み)",
    game: "Trò chơi", gameTitle: "Ghép thẻ", movesLabel: "Lượt", timeLabel: "Thời gian", playAgain: "Chơi lại", matchedAll: "Bạn đã ghép hết!",
    wordLink: "Nối Từ", wordLinkDesc: "Nối các từ theo kiểu shiritori!", livesLabel: "Mạng", streakLabel: "Chuỗi đúng",
    nextPrefix: "Từ nào bắt đầu bằng", nextSuffix: "?", winMsg: "Bạn đã nối hết! Chúc mừng", gameOverMsg: "Cố gắng tốt lắm!",
    correctAnswerWas: "Đáp án đúng là", trivia: "Sự thật thú vị: trong shiritori thật, nói từ kết thúc bằng ん sẽ thua!", wordsLinked: "Số từ đã nối",
    hp: "HP", lvLabel: "Lv", coinsLabel: "Xu", victory: "Chiến thắng!", defeat: "Đã thua...", locked: "Đã khóa",
    backToMap: "Về bản đồ", rewardsLabel: "Phần thưởng", stageClear: "Hoàn thành màn chơi!", questTitle: "KANJI QUEST", tapToStart: "Chạm để thử thách",
    write: "Luyện viết", writeInstruction: "Nhìn mẫu và thử viết", checkBtn: "Kiểm tra", clearBtn: "Xóa", nextKanji: "Chữ Hán tiếp theo",
    correctDraw: "Viết tốt lắm!", incorrectDraw: "Hãy thử viết lại", checking: "Đang kiểm tra…", apiError: "Không thể kiểm tra. Vui lòng thử lại." },
  my: { appTitle: "ဂျပန်စာ သင်ယူခြင်း", sub: "ဂျပန်နိုင်ငံတွင်နေထိုင်သူ အားလုံးအတွက် app", level: "အဆင့်", category: "အမျိုးအစား", mode: "မုဒ်",
    list: "စာရင်း", flashcard: "ကတ်", quiz: "ပဟေဠိ", conversation: "စကားပြော လေ့ကျင့်ခန်း",
    play: "ဖွင့်ရန်", next: "နောက်တစ်ခု", prev: "ယခင်", flip: "လှန်ရန်", meaning: "အဓိပ္ပာယ်", reading: "အသံထွက်",
    correct: "မှန်ပါသည်!", incorrect: "မမှန်သေးပါ", score: "ရမှတ်", moji: "စာလုံးများ", vocab: "စကားလုံးများ", kanji: "ခန်းဂျီး", grammar: "သဒ္ဒါ",
    chooseAnswer: "မှန်ကန်သော အဓိပ္ပာယ်ကို ရွေးပါ", tapToFlip: "လှန်ရန် နှိပ်ပါ", of: "／", speaker: "ပြောသူ", example: "ဥပမာဝါကျ", connection: "ချိတ်ဆက်ပုံ", note: "အဓိပ္ပာယ်အသေးစိတ်",
    reading2: "ဖတ်ရှုနားလည်ခြင်း", listening: "နားထောင်နားလည်ခြင်း", passage: "စာပိုဒ်", showText: "စာသားပြရန်", hideText: "စာသားဖျောက်ရန်",
    questionLabel: "မေးခွန်း", checkAnswers: "အဖြေစစ်ရန်", allDone: "ပြီးပါပြီ!", scoreOutOf: "မှန်", chooseGrammar: "အလွတ်နေရာတွင် ကိုက်ညီသော သဒ္ဒါကို ရွေးပါ", chooseReading: "မှန်ကန်သော အသံထွက်ကို ရွေးပါ",
    onyomi: "အွန်အသံ (音読み)", kunyomi: "ကွန်းအသံ (訓読み)",
    game: "ဂိမ်း", gameTitle: "ကတ်တွဲစိတ်", movesLabel: "အကြိမ်ရေ", timeLabel: "အချိန်", playAgain: "ထပ်ကစားရန်", matchedAll: "အားလုံးတွဲပြီးပါပြီ!",
    wordLink: "ဝေါဟာရဆက်စပ်", wordLinkDesc: "ရှိရိတိုရိစတိုင်ဖြင့် စကားလုံးများကို ဆက်စပ်ပါ!", livesLabel: "အသက်", streakLabel: "ဆက်တိုက်မှန်",
    nextPrefix: "", nextSuffix: " ဖြင့်စသော စကားလုံးက ဘယ်ဟာလဲ။", winMsg: "အားလုံးဆက်စပ်ပြီးပါပြီ! ဂုဏ်ယူပါတယ်", gameOverMsg: "ကြိုးစားမှုကောင်းပါတယ်!",
    correctAnswerWas: "မှန်ကန်သောအဖြေက", trivia: "စိတ်ဝင်စားစရာ: တကယ့်ရှိရိတိုရိတွင် ん ဖြင့်ဆုံးသောစကားလုံးပြောလျှင် ရှုံးပါသည်!", wordsLinked: "ဆက်စပ်ထားသောစကားလုံး",
    hp: "HP", lvLabel: "Lv", coinsLabel: "ဒင်္ဂါး", victory: "အနိုင်ရပြီ!", defeat: "ရှုံးသွားပြီ...", locked: "လော့ခ်ချထားသည်",
    backToMap: "မြေပုံသို့ပြန်ရန်", rewardsLabel: "ဆုလာဘ်", stageClear: "အဆင့်ပြီးပါပြီ!", questTitle: "KANJI QUEST", tapToStart: "စိန်ခေါ်ရန် နှိပ်ပါ",
    write: "ရေးသားခြင်း", writeInstruction: "နမူနာကိုကြည့်ပြီး ရေးကြည့်ပါ", checkBtn: "စစ်ဆေးရန်", clearBtn: "ရှင်းရန်", nextKanji: "နောက်ခန်းဂျီး",
    correctDraw: "ကောင်းလိုက်တာ!", incorrectDraw: "ထပ်ရေးကြည့်ပါ", checking: "စစ်ဆေးနေသည်…", apiError: "စစ်ဆေးမရပါ။ ထပ်ကြိုးစားပါ။" },
};

/* ===== CHINESE PORTUGUESE UI START ===== */

UI.zh = {
  ...UI.en,
  appTitle: "日语学习",
  sub: "面向在日本生活的所有人的日语学习应用",
  level: "级别",
  category: "类别",
  mode: "模式",

  list: "列表",
  flashcard: "单词卡",
  quiz: "测验",
  conversation: "会话练习",

  play: "播放",
  next: "下一步",
  prev: "上一步",
  flip: "翻面",
  meaning: "意思",
  reading: "读法",

  correct: "正确！",
  incorrect: "再试一次",
  score: "得分",

  moji: "文字",
  vocab: "词汇",
  kanji: "汉字",
  grammar: "语法",

  chooseAnswer: "请选择正确的意思",
  tapToFlip: "点击翻面",
  of: "／",
  speaker: "说话者",
  example: "例句",
  connection: "接续",
  note: "语感",

  reading2: "阅读理解",
  listening: "听力理解",
  passage: "文章",
  showText: "显示文章",
  hideText: "隐藏文章",

  questionLabel: "问题",
  checkAnswers: "检查答案",
  allDone: "全部完成！",
  scoreOutOf: "正确数",

  chooseGrammar: "请选择适合填入空格的语法",
  chooseReading: "请选择正确的读法",

  onyomi: "音读",
  kunyomi: "训读",

  game: "游戏",
  gameTitle: "卡片配对",
  movesLabel: "步数",
  timeLabel: "时间",
  playAgain: "再玩一次",
  matchedAll: "全部配对成功！",

  wordLink: "词语接龙",
  wordLinkDesc: "像日语接龙一样连接词语！",
  livesLabel: "生命",
  streakLabel: "连续正确",

  nextPrefix: "下一个是",
  nextSuffix: "开头的词语？",
  winMsg: "全部连接成功！恭喜！",
  gameOverMsg: "很可惜，再试一次！",

  correctAnswerWas: "正确答案是",
  wordsLinked: "已连接的词语",

  backToMap: "返回地图",
  rewardsLabel: "奖励",
  stageClear: "关卡完成！",
  tapToStart: "点击开始挑战",

  write: "书写练习",
  writeInstruction: "请看着范例练习书写",
  checkBtn: "检查",
  clearBtn: "清除",
  nextKanji: "下一个汉字",
  correctDraw: "写得很好！",
  incorrectDraw: "请再写一次",
  checking: "检查中…",
  apiError: "无法检查，请再试一次。"
};

UI.ptBR = {
  ...UI.en,
  appTitle: "Estudo de Japonês",
  sub: "Aplicativo de japonês para quem vive no Japão",
  level: "Nível",
  category: "Categoria",
  mode: "Modo",

  list: "Lista",
  flashcard: "Flashcards",
  quiz: "Quiz",
  conversation: "Conversação",

  play: "Ouvir",
  next: "Próximo",
  prev: "Anterior",
  flip: "Virar",
  meaning: "Significado",
  reading: "Leitura",

  correct: "Correto!",
  incorrect: "Tente novamente",
  score: "Pontuação",

  moji: "Caracteres",
  vocab: "Vocabulário",
  kanji: "Kanji",
  grammar: "Gramática",

  chooseAnswer: "Escolha o significado correto",
  tapToFlip: "Toque para virar",
  of: "de",
  speaker: "Falante",
  example: "Exemplo",
  connection: "Forma de conexão",
  note: "Nuance",

  reading2: "Leitura",
  listening: "Compreensão auditiva",
  passage: "Texto",
  showText: "Mostrar texto",
  hideText: "Ocultar texto",

  questionLabel: "Pergunta",
  checkAnswers: "Verificar respostas",
  allDone: "Concluído!",
  scoreOutOf: "Acertos",

  chooseGrammar: "Escolha a gramática correta para o espaço",
  chooseReading: "Escolha a leitura correta",

  onyomi: "Leitura On",
  kunyomi: "Leitura Kun",

  game: "Jogo",
  gameTitle: "Combinar cartas",
  movesLabel: "Jogadas",
  timeLabel: "Tempo",
  playAgain: "Jogar novamente",
  matchedAll: "Você combinou todas!",

  wordLink: "Ligação de palavras",
  wordLinkDesc: "Conecte palavras no estilo shiritori!",
  livesLabel: "Vidas",
  streakLabel: "Sequência",

  nextPrefix: "Qual palavra começa com",
  nextSuffix: "?",
  winMsg: "Você conectou todas! Parabéns!",
  gameOverMsg: "Boa tentativa! Tente novamente.",

  correctAnswerWas: "A resposta correta era",
  wordsLinked: "Palavras conectadas",

  backToMap: "Voltar ao mapa",
  rewardsLabel: "Recompensas",
  stageClear: "Fase concluída!",
  tapToStart: "Toque para começar",

  write: "Prática de escrita",
  writeInstruction: "Observe o modelo e tente escrever",
  checkBtn: "Verificar",
  clearBtn: "Limpar",
  nextKanji: "Próximo kanji",
  correctDraw: "Muito bem!",
  incorrectDraw: "Tente escrever novamente",
  checking: "Verificando…",
  apiError: "Não foi possível verificar. Tente novamente."
};

/* ===== CHINESE PORTUGUESE UI END ===== */


const LANG_NAMES = { ja: "日本語", en: "English", ne: "नेपाली", vi: "Tiếng Việt", my: "မြန်မာ", zh: "中文", ptBR: "Português (Brasil)" };
const LANGS = ["ja", "en", "ne", "vi", "my", "zh", "ptBR"];
const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

/* ============================= CONTENT DATA ============================= */
const HIRAGANA = [
  ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
  ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
  ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
  ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
  ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
  ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
  ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
  ["や","ya"],["ゆ","yu"],["よ","yo"],
  ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
  ["わ","wa"],["を","wo"],["ん","n"],
];
const KATAKANA = [
  ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
  ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
  ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
  ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
  ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
  ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
  ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
  ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
  ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
  ["ワ","wa"],["ヲ","wo"],["ン","n"],
];

// meaning: {en, ne, vi, my}
const VOCAB = {
  N5: [
    { jp: "水", reading: "みず", meaning: { en: "water", ne: "पानी", vi: "nước", my: "ရေ" } },
    { jp: "食べる", reading: "たべる", meaning: { en: "to eat", ne: "खानु", vi: "ăn", my: "စားသည်" } },
    { jp: "飲む", reading: "のむ", meaning: { en: "to drink", ne: "पिउनु", vi: "uống", my: "သောက်သည်" } },
    { jp: "行く", reading: "いく", meaning: { en: "to go", ne: "जानु", vi: "đi", my: "သွားသည်" } },
    { jp: "本", reading: "ほん", meaning: { en: "book", ne: "किताब", vi: "sách", my: "စာအုပ်" } },
    { jp: "学校", reading: "がっこう", meaning: { en: "school", ne: "विद्यालय", vi: "trường học", my: "ကျောင်း" } },
    { jp: "友達", reading: "ともだち", meaning: { en: "friend", ne: "साथी", vi: "bạn bè", my: "သူငယ်ချင်း" } },
    { jp: "今日", reading: "きょう", meaning: { en: "today", ne: "आज", vi: "hôm nay", my: "ဒီနေ့" } },
    { jp: "大きい", reading: "おおきい", meaning: { en: "big", ne: "ठूलो", vi: "to lớn", my: "ကြီးသော" } },
    { jp: "小さい", reading: "ちいさい", meaning: { en: "small", ne: "सानो", vi: "nhỏ", my: "သေးငယ်သော" } },
    { jp: "見る", reading: "みる", meaning: { en: "to see / watch", ne: "हेर्नु", vi: "xem / nhìn", my: "ကြည့်သည်" } },
    { jp: "聞く", reading: "きく", meaning: { en: "to listen / ask", ne: "सुन्नु / सोध्नु", vi: "nghe / hỏi", my: "နားထောင်သည် / မေးသည်" } },
    { jp: "話す", reading: "はなす", meaning: { en: "to speak", ne: "बोल्नु", vi: "nói chuyện", my: "ပြောသည်" } },
    { jp: "読む", reading: "よむ", meaning: { en: "to read", ne: "पढ्नु", vi: "đọc", my: "ဖတ်သည်" } },
    { jp: "書く", reading: "かく", meaning: { en: "to write", ne: "लेख्नु", vi: "viết", my: "ရေးသည်" } },
    { jp: "買う", reading: "かう", meaning: { en: "to buy", ne: "किन्नु", vi: "mua", my: "ဝယ်သည်" } },
    { jp: "待つ", reading: "まつ", meaning: { en: "to wait", ne: "पर्खनु", vi: "chờ đợi", my: "စောင့်သည်" } },
    { jp: "休む", reading: "やすむ", meaning: { en: "to rest", ne: "आराम गर्नु", vi: "nghỉ ngơi", my: "နားသည်" } },
    { jp: "立つ", reading: "たつ", meaning: { en: "to stand", ne: "उभिनु", vi: "đứng", my: "ရပ်သည်" } },
    { jp: "座る", reading: "すわる", meaning: { en: "to sit", ne: "बस्नु", vi: "ngồi", my: "ထိုင်သည်" } },
    { jp: "起きる", reading: "おきる", meaning: { en: "to wake up", ne: "उठ्नु", vi: "thức dậy", my: "နိုးသည်" } },
    { jp: "寝る", reading: "ねる", meaning: { en: "to sleep", ne: "सुत्नु", vi: "ngủ", my: "အိပ်သည်" } },
    { jp: "分かる", reading: "わかる", meaning: { en: "to understand", ne: "बुझ्नु", vi: "hiểu", my: "နားလည်သည်" } },
    { jp: "好き", reading: "すき", meaning: { en: "to like", ne: "मन पराउनु", vi: "thích", my: "ကြိုက်သည်" } },
    { jp: "嫌い", reading: "きらい", meaning: { en: "to dislike", ne: "मन नपराउनु", vi: "ghét", my: "မကြိုက်ခြင်း" } },
    { jp: "忙しい", reading: "いそがしい", meaning: { en: "busy", ne: "व्यस्त", vi: "bận rộn", my: "အလုပ်များသော" } },
    { jp: "楽しい", reading: "たのしい", meaning: { en: "fun / enjoyable", ne: "रमाइलो", vi: "vui vẻ", my: "ပျော်စရာကောင်းသော" } },
    { jp: "難しい", reading: "むずかしい", meaning: { en: "difficult", ne: "गाह्रो", vi: "khó", my: "ခက်ခဲသော" } },
    { jp: "易しい", reading: "やさしい", meaning: { en: "easy", ne: "सजिलो", vi: "dễ", my: "လွယ်ကူသော" } },
    { jp: "暑い", reading: "あつい", meaning: { en: "hot (weather)", ne: "गर्मी", vi: "nóng (thời tiết)", my: "ပူသော" } },
    { jp: "寒い", reading: "さむい", meaning: { en: "cold (weather)", ne: "जाडो", vi: "lạnh (thời tiết)", my: "အေးသော" } },
    { jp: "忘れる", reading: "わすれる", meaning: { en: "to forget", ne: "बिर्सनु", vi: "quên", my: "မေ့သည်" } },
    { jp: "覚える", reading: "おぼえる", meaning: { en: "to memorize", ne: "सम्झनु", vi: "ghi nhớ", my: "မှတ်မိသည်" } },
    { jp: "家", reading: "いえ", meaning: { en: "house", ne: "घर", vi: "nhà", my: "အိမ်" } },
    { jp: "部屋", reading: "へや", meaning: { en: "room", ne: "कोठा", vi: "phòng", my: "အခန်း" } },
    { jp: "会社", reading: "かいしゃ", meaning: { en: "company", ne: "कम्पनी", vi: "công ty", my: "ကုမ္ပဏီ" } },
    { jp: "電車", reading: "でんしゃ", meaning: { en: "train", ne: "रेल", vi: "tàu điện", my: "ရထား" } },
    { jp: "病院", reading: "びょういん", meaning: { en: "hospital", ne: "अस्पताल", vi: "bệnh viện", my: "ဆေးရုံ" } },
    { jp: "銀行", reading: "ぎんこう", meaning: { en: "bank", ne: "बैंक", vi: "ngân hàng", my: "ဘဏ်" } },
    { jp: "郵便局", reading: "ゆうびんきょく", meaning: { en: "post office", ne: "हुलाक कार्यालय", vi: "bưu điện", my: "စာတိုက်" } },
    { jp: "月曜日", reading: "げつようび", meaning: { en: "Monday", ne: "सोमबार", vi: "thứ Hai", my: "တနင်္လာနေ့" } },
    { jp: "火曜日", reading: "かようび", meaning: { en: "Tuesday", ne: "मंगलबार", vi: "thứ Ba", my: "အင်္ဂါနေ့" } },
    { jp: "水曜日", reading: "すいようび", meaning: { en: "Wednesday", ne: "बुधबार", vi: "thứ Tư", my: "ဗုဒ္ဓဟူးနေ့" } },
    { jp: "木曜日", reading: "もくようび", meaning: { en: "Thursday", ne: "बिहीबार", vi: "thứ Năm", my: "ကြာသပတေးနေ့" } },
    { jp: "金曜日", reading: "きんようび", meaning: { en: "Friday", ne: "शुक्रबार", vi: "thứ Sáu", my: "သောကြာနေ့" } },
    { jp: "土曜日", reading: "どようび", meaning: { en: "Saturday", ne: "शनिबार", vi: "thứ Bảy", my: "စနေနေ့" } },
    { jp: "日曜日", reading: "にちようび", meaning: { en: "Sunday", ne: "आइतबार", vi: "Chủ nhật", my: "တနင်္ဂနွေနေ့" } },
    { jp: "天気", reading: "てんき", meaning: { en: "weather", ne: "मौसम", vi: "thời tiết", my: "ရာသီဥတု" } },
    { jp: "誕生日", reading: "たんじょうび", meaning: { en: "birthday", ne: "जन्मदिन", vi: "sinh nhật", my: "မွေးနေ့" } },
    { jp: "買い物", reading: "かいもの", meaning: { en: "shopping", ne: "किनमेल", vi: "mua sắm", my: "ဈေးဝယ်ခြင်း" } },
    { jp: "電話", reading: "でんわ", meaning: { en: "telephone", ne: "फोन", vi: "điện thoại", my: "ဖုန်း" } },
    { jp: "新聞", reading: "しんぶん", meaning: { en: "newspaper", ne: "समाचारपत्र", vi: "báo", my: "သတင်းစာ" } },
    { jp: "映画", reading: "えいが", meaning: { en: "movie", ne: "चलचित्र", vi: "phim", my: "ရုပ်ရှင်" } },
    { jp: "音楽", reading: "おんがく", meaning: { en: "music", ne: "संगीत", vi: "âm nhạc", my: "တေးဂီတ" } },
    { jp: "写真", reading: "しゃしん", meaning: { en: "photo", ne: "फोटो", vi: "ảnh", my: "ဓာတ်ပုံ" } },
    { jp: "動物", reading: "どうぶつ", meaning: { en: "animal", ne: "जनावर", vi: "động vật", my: "တိရစ္ဆာန်" } },
    { jp: "果物", reading: "くだもの", meaning: { en: "fruit", ne: "फलफूल", vi: "trái cây", my: "သစ်သီး" } },
    { jp: "野菜", reading: "やさい", meaning: { en: "vegetable", ne: "तरकारी", vi: "rau củ", my: "ဟင်းသီးဟင်းရွက်" } },
  ],
  N4: [
    { jp: "仕事", reading: "しごと", meaning: { en: "work / job", ne: "काम", vi: "công việc", my: "အလုပ်" } },
    { jp: "忙しい", reading: "いそがしい", meaning: { en: "busy", ne: "व्यस्त", vi: "bận rộn", my: "အလုပ်များသော" } },
    { jp: "暇", reading: "ひま", meaning: { en: "free time", ne: "फुर्सद", vi: "thời gian rảnh", my: "အားလပ်ချိန်" } },
    { jp: "約束", reading: "やくそく", meaning: { en: "promise", ne: "वाचा", vi: "lời hứa", my: "ကတိ" } },
    { jp: "説明する", reading: "せつめいする", meaning: { en: "to explain", ne: "व्याख्या गर्नु", vi: "giải thích", my: "ရှင်းပြသည်" } },
    { jp: "経験", reading: "けいけん", meaning: { en: "experience", ne: "अनुभव", vi: "kinh nghiệm", my: "အတွေ့အကြုံ" } },
    { jp: "意見", reading: "いけん", meaning: { en: "opinion", ne: "विचार", vi: "ý kiến", my: "ထင်မြင်ချက်" } },
    { jp: "決める", reading: "きめる", meaning: { en: "to decide", ne: "निर्णय गर्नु", vi: "quyết định", my: "ဆုံးဖြတ်သည်" } },
    { jp: "続ける", reading: "つづける", meaning: { en: "to continue", ne: "जारी राख्नु", vi: "tiếp tục", my: "ဆက်လက်လုပ်ဆောင်သည်" } },
    { jp: "必要", reading: "ひつよう", meaning: { en: "necessary", ne: "आवश्यक", vi: "cần thiết", my: "လိုအပ်သော" } },
    { jp: "走る", reading: "はしる", meaning: { en: "to run", ne: "दौड्नु", vi: "chạy", my: "ပြေးသည်" } },
    { jp: "泳ぐ", reading: "およぐ", meaning: { en: "to swim", ne: "पौडिनु", vi: "bơi", my: "ရေကူးသည်" } },
    { jp: "教える", reading: "おしえる", meaning: { en: "to teach", ne: "सिकाउनु", vi: "dạy", my: "သင်ကြားသည်" } },
    { jp: "習う", reading: "ならう", meaning: { en: "to learn", ne: "सिक्नु", vi: "học", my: "သင်ယူသည်" } },
    { jp: "使う", reading: "つかう", meaning: { en: "to use", ne: "प्रयोग गर्नु", vi: "sử dụng", my: "အသုံးပြုသည်" } },
    { jp: "持つ", reading: "もつ", meaning: { en: "to hold / carry", ne: "समाउनु / बोक्नु", vi: "cầm / mang", my: "ကိုင်သည်" } },
    { jp: "始める", reading: "はじめる", meaning: { en: "to start (something)", ne: "सुरु गर्नु", vi: "bắt đầu", my: "စတင်သည်" } },
    { jp: "終わる", reading: "おわる", meaning: { en: "to end / finish", ne: "समाप्त हुनु", vi: "kết thúc", my: "ပြီးဆုံးသည်" } },
    { jp: "乗る", reading: "のる", meaning: { en: "to ride", ne: "चढ्नु", vi: "lên (xe)", my: "စီးသည်" } },
    { jp: "降りる", reading: "おりる", meaning: { en: "to get off", ne: "ओर्लनु", vi: "xuống (xe)", my: "ဆင်းသည်" } },
    { jp: "送る", reading: "おくる", meaning: { en: "to send", ne: "पठाउनु", vi: "gửi", my: "ပို့သည်" } },
    { jp: "着る", reading: "きる", meaning: { en: "to wear", ne: "लगाउनु", vi: "mặc", my: "ဝတ်သည်" } },
    { jp: "洗う", reading: "あらう", meaning: { en: "to wash", ne: "धुनु", vi: "rửa / giặt", my: "ဆေးသည်" } },
    { jp: "運ぶ", reading: "はこぶ", meaning: { en: "to carry", ne: "बोक्नु", vi: "vận chuyển", my: "သယ်ဆောင်သည်" } },
    { jp: "働く", reading: "はたらく", meaning: { en: "to work", ne: "काम गर्नु", vi: "làm việc", my: "အလုပ်လုပ်သည်" } },
    { jp: "通う", reading: "かよう", meaning: { en: "to commute", ne: "ओहोरदोहोर गर्नु", vi: "đi lại thường xuyên", my: "ပုံမှန်သွားလာသည်" } },
    { jp: "病気", reading: "びょうき", meaning: { en: "illness", ne: "रोग", vi: "bệnh", my: "ဖျားနာမှု" } },
    { jp: "元気", reading: "げんき", meaning: { en: "healthy / energetic", ne: "स्वस्थ / फुर्तिलो", vi: "khỏe mạnh", my: "ကျန်းမာသော" } },
    { jp: "具合", reading: "ぐあい", meaning: { en: "condition (health)", ne: "स्वास्थ्य अवस्था", vi: "tình trạng (sức khỏe)", my: "ကျန်းမာရေးအခြေအနေ" } },
    { jp: "台風", reading: "たいふう", meaning: { en: "typhoon", ne: "आँधी", vi: "bão", my: "ဆိုင်ကလုန်း" } },
    { jp: "天気予報", reading: "てんきよほう", meaning: { en: "weather forecast", ne: "मौसम पूर्वानुमान", vi: "dự báo thời tiết", my: "ရာသီဥတုခန့်မှန်းချက်" } },
    { jp: "季節", reading: "きせつ", meaning: { en: "season", ne: "ऋतु", vi: "mùa", my: "ရာသီ" } },
    { jp: "交通", reading: "こうつう", meaning: { en: "traffic", ne: "यातायात", vi: "giao thông", my: "သွားလာရေး" } },
    { jp: "事故", reading: "じこ", meaning: { en: "accident", ne: "दुर्घटना", vi: "tai nạn", my: "မတော်တဆမှု" } },
    { jp: "危険", reading: "きけん", meaning: { en: "danger", ne: "खतरा", vi: "nguy hiểm", my: "အန္တရာယ်" } },
    { jp: "安全", reading: "あんぜん", meaning: { en: "safety", ne: "सुरक्षा", vi: "an toàn", my: "ဘေးကင်းမှု" } },
    { jp: "予定", reading: "よてい", meaning: { en: "plan / schedule", ne: "योजना", vi: "kế hoạch", my: "အစီအစဉ်" } },
    { jp: "準備", reading: "じゅんび", meaning: { en: "preparation", ne: "तयारी", vi: "chuẩn bị", my: "ပြင်ဆင်မှု" } },
    { jp: "都合", reading: "つごう", meaning: { en: "convenience / circumstances", ne: "सुविधा / परिस्थिति", vi: "sự thuận tiện", my: "အခြေအနေအဆင်ပြေမှု" } },
    { jp: "質問", reading: "しつもん", meaning: { en: "question", ne: "प्रश्न", vi: "câu hỏi", my: "မေးခွန်း" } },
    { jp: "答え", reading: "こたえ", meaning: { en: "answer", ne: "जवाफ", vi: "câu trả lời", my: "အဖြေ" } },
    { jp: "研究", reading: "けんきゅう", meaning: { en: "research", ne: "अनुसन्धान", vi: "nghiên cứu", my: "သုတေသန" } },
    { jp: "連絡", reading: "れんらく", meaning: { en: "contact / communication", ne: "सम्पर्क", vi: "liên lạc", my: "ဆက်သွယ်ရေး" } },
    { jp: "建物", reading: "たてもの", meaning: { en: "building", ne: "भवन", vi: "tòa nhà", my: "အဆောက်အအုံ" } },
    { jp: "特別", reading: "とくべつ", meaning: { en: "special", ne: "विशेष", vi: "đặc biệt", my: "အထူး" } },
    { jp: "必ず", reading: "かならず", meaning: { en: "certainly", ne: "अवश्य", vi: "chắc chắn", my: "မလွဲမသွေ" } },
    { jp: "違う", reading: "ちがう", meaning: { en: "to differ", ne: "फरक हुनु", vi: "khác nhau", my: "ကွဲပြားသည်" } },
    { jp: "急ぐ", reading: "いそぐ", meaning: { en: "to hurry", ne: "हतार गर्नु", vi: "vội vàng", my: "အလျင်လိုသည်" } },
    { jp: "集まる", reading: "あつまる", meaning: { en: "to gather", ne: "जम्मा हुनु", vi: "tụ họp", my: "စုစည်းသည်" } },
    { jp: "場所", reading: "ばしょ", meaning: { en: "place", ne: "स्थान", vi: "địa điểm", my: "နေရာ" } },
    { jp: "若い", reading: "わかい", meaning: { en: "young", ne: "जवान", vi: "trẻ", my: "ငယ်ရွယ်သော" } },
    { jp: "共に", reading: "ともに", meaning: { en: "together", ne: "सँगै", vi: "cùng nhau", my: "အတူတကွ" } },
    { jp: "歩く", reading: "あるく", meaning: { en: "to walk", ne: "हिँड्नु", vi: "đi bộ", my: "လမ်းလျှောက်သည်" } },
  ],
  N3: [
    { jp: "環境", reading: "かんきょう", meaning: { en: "environment", ne: "वातावरण", vi: "môi trường", my: "သဘာဝပတ်ဝန်းကျင်" } },
    { jp: "責任", reading: "せきにん", meaning: { en: "responsibility", ne: "जिम्मेवारी", vi: "trách nhiệm", my: "တာဝန်" } },
    { jp: "発表する", reading: "はっぴょうする", meaning: { en: "to present / announce", ne: "प्रस्तुत गर्नु", vi: "phát biểu", my: "တင်ပြသည်" } },
    { jp: "比較する", reading: "ひかくする", meaning: { en: "to compare", ne: "तुलना गर्नु", vi: "so sánh", my: "နှိုင်းယှဉ်သည်" } },
    { jp: "技術", reading: "ぎじゅつ", meaning: { en: "technology / skill", ne: "प्रविधि", vi: "kỹ thuật", my: "နည်းပညာ" } },
    { jp: "関係", reading: "かんけい", meaning: { en: "relationship", ne: "सम्बन्ध", vi: "quan hệ", my: "ဆက်နွယ်မှု" } },
    { jp: "影響", reading: "えいきょう", meaning: { en: "influence", ne: "प्रभाव", vi: "ảnh hưởng", my: "သက်ရောက်မှု" } },
    { jp: "解決する", reading: "かいけつする", meaning: { en: "to solve", ne: "समाधान गर्नु", vi: "giải quyết", my: "ဖြေရှင်းသည်" } },
    { jp: "予測する", reading: "よそくする", meaning: { en: "to predict", ne: "पूर्वानुमान गर्नु", vi: "dự đoán", my: "ခန့်မှန်းသည်" } },
    { jp: "様々", reading: "さまざま", meaning: { en: "various", ne: "विभिन्न", vi: "đa dạng", my: "အမျိုးမျိုး" } },
    { jp: "情報", reading: "じょうほう", meaning: { en: "information", ne: "जानकारी", vi: "thông tin", my: "သတင်းအချက်အလက်" } },
    { jp: "経済", reading: "けいざい", meaning: { en: "economy", ne: "अर्थतन्त्र", vi: "kinh tế", my: "စီးပွားရေး" } },
    { jp: "政治", reading: "せいじ", meaning: { en: "politics", ne: "राजनीति", vi: "chính trị", my: "နိုင်ငံရေး" } },
    { jp: "社会", reading: "しゃかい", meaning: { en: "society", ne: "समाज", vi: "xã hội", my: "လူ့အဖွဲ့အစည်း" } },
    { jp: "産業", reading: "さんぎょう", meaning: { en: "industry", ne: "उद्योग", vi: "ngành công nghiệp", my: "စက်မှုလုပ်ငန်း" } },
    { jp: "制度", reading: "せいど", meaning: { en: "system", ne: "प्रणाली", vi: "hệ thống / chế độ", my: "စနစ်" } },
    { jp: "規則", reading: "きそく", meaning: { en: "rule", ne: "नियम", vi: "quy tắc", my: "စည်းကမ်းချက်" } },
    { jp: "選挙", reading: "せんきょ", meaning: { en: "election", ne: "चुनाव", vi: "bầu cử", my: "ရွေးကောက်ပွဲ" } },
    { jp: "増加", reading: "ぞうか", meaning: { en: "increase", ne: "वृद्धि", vi: "sự gia tăng", my: "တိုးပွားမှု" } },
    { jp: "減少", reading: "げんしょう", meaning: { en: "decrease", ne: "ह्रास", vi: "sự giảm sút", my: "လျော့ကျမှု" } },
    { jp: "変化", reading: "へんか", meaning: { en: "change", ne: "परिवर्तन", vi: "sự thay đổi", my: "ပြောင်းလဲမှု" } },
    { jp: "効果", reading: "こうか", meaning: { en: "effect", ne: "प्रभाव", vi: "hiệu quả", my: "အကျိုးသက်ရောက်မှု" } },
    { jp: "割合", reading: "わりあい", meaning: { en: "proportion", ne: "अनुपात", vi: "tỷ lệ", my: "အချိုးအစား" } },
    { jp: "原因", reading: "げんいん", meaning: { en: "cause", ne: "कारण", vi: "nguyên nhân", my: "အကြောင်းရင်း" } },
    { jp: "結果", reading: "けっか", meaning: { en: "result", ne: "परिणाम", vi: "kết quả", my: "ရလဒ်" } },
    { jp: "状態", reading: "じょうたい", meaning: { en: "condition", ne: "अवस्था", vi: "tình trạng", my: "အခြေအနေ" } },
    { jp: "歴史", reading: "れきし", meaning: { en: "history", ne: "इतिहास", vi: "lịch sử", my: "သမိုင်း" } },
    { jp: "福祉", reading: "ふくし", meaning: { en: "welfare", ne: "कल्याण", vi: "phúc lợi", my: "လူမှုဖူလုံရေး" } },
    { jp: "争い", reading: "あらそい", meaning: { en: "conflict / dispute", ne: "विवाद", vi: "xung đột", my: "ပဋိပက္ခ" } },
    { jp: "戦争", reading: "せんそう", meaning: { en: "war", ne: "युद्ध", vi: "chiến tranh", my: "စစ်ပွဲ" } },
    { jp: "判断", reading: "はんだん", meaning: { en: "judgment", ne: "निर्णय", vi: "phán đoán", my: "ဆုံးဖြတ်ချက်" } },
    { jp: "認める", reading: "みとめる", meaning: { en: "to acknowledge", ne: "स्वीकार गर्नु", vi: "công nhận", my: "အသိအမှတ်ပြုသည်" } },
    { jp: "断る", reading: "ことわる", meaning: { en: "to refuse", ne: "अस्वीकार गर्नु", vi: "từ chối", my: "ငြင်းဆိုသည်" } },
    { jp: "選ぶ", reading: "えらぶ", meaning: { en: "to choose", ne: "छान्नु", vi: "chọn", my: "ရွေးချယ်သည်" } },
    { jp: "比べる", reading: "くらべる", meaning: { en: "to compare", ne: "तुलना गर्नु", vi: "so sánh", my: "နှိုင်းယှဉ်သည်" } },
    { jp: "評価", reading: "ひょうか", meaning: { en: "evaluation", ne: "मूल्यांकन", vi: "sự đánh giá", my: "အကဲဖြတ်ခြင်း" } },
    { jp: "価値", reading: "かち", meaning: { en: "value", ne: "मूल्य", vi: "giá trị", my: "တန်ဖိုး" } },
    { jp: "資源", reading: "しげん", meaning: { en: "resources", ne: "स्रोत", vi: "tài nguyên", my: "အရင်းအမြစ်" } },
    { jp: "費用", reading: "ひよう", meaning: { en: "cost", ne: "खर्च", vi: "chi phí", my: "ကုန်ကျစရိတ်" } },
    { jp: "負担", reading: "ふたん", meaning: { en: "burden", ne: "बोझ", vi: "gánh nặng", my: "ဝန်ထုပ်ဝန်ပိုး" } },
    { jp: "税金", reading: "ぜいきん", meaning: { en: "tax", ne: "कर", vi: "tiền thuế", my: "အခွန်ငွေ" } },
    { jp: "防止", reading: "ぼうし", meaning: { en: "prevention", ne: "रोकथाम", vi: "phòng ngừa", my: "ကာကွယ်တားဆီးမှု" } },
    { jp: "災害", reading: "さいがい", meaning: { en: "disaster", ne: "विपत्ति", vi: "thiên tai", my: "ဘေးအန္တရာယ်" } },
    { jp: "被害", reading: "ひがい", meaning: { en: "damage", ne: "क्षति", vi: "thiệt hại", my: "ထိခိုက်မှု" } },
    { jp: "故障", reading: "こしょう", meaning: { en: "breakdown / malfunction", ne: "बिग्रनु", vi: "hỏng hóc", my: "ပျက်စီးမှု" } },
    { jp: "組織", reading: "そしき", meaning: { en: "organization", ne: "संगठन", vi: "tổ chức", my: "အဖွဲ့အစည်း" } },
    { jp: "建築", reading: "けんちく", meaning: { en: "architecture", ne: "वास्तुकला", vi: "kiến trúc", my: "ဗိသုကာ" } },
    { jp: "専門", reading: "せんもん", meaning: { en: "specialty", ne: "विशेषज्ञता", vi: "chuyên môn", my: "အထူးကျွမ်းကျင်မှု" } },
    { jp: "導く", reading: "みちびく", meaning: { en: "to guide", ne: "मार्गदर्शन गर्नु", vi: "hướng dẫn", my: "လမ်းညွှန်သည်" } },
    { jp: "旅程", reading: "りょてい", meaning: { en: "itinerary", ne: "यात्रा तालिका", vi: "lịch trình du lịch", my: "ခရီးစဉ်အစီအစဉ်" } },
    { jp: "記録", reading: "きろく", meaning: { en: "record", ne: "रेकर्ड", vi: "kỷ lục / ghi chép", my: "မှတ်တမ်း" } },
    { jp: "記憶", reading: "きおく", meaning: { en: "memory", ne: "सम्झना", vi: "trí nhớ", my: "မှတ်ဉာဏ်" } },
    { jp: "成績", reading: "せいせき", meaning: { en: "grades / results", ne: "नतिजा", vi: "thành tích học tập", my: "အမှတ်/ရလဒ်" } },
    { jp: "成功", reading: "せいこう", meaning: { en: "success", ne: "सफलता", vi: "thành công", my: "အောင်မြင်မှု" } },
    { jp: "競争", reading: "きょうそう", meaning: { en: "competition", ne: "प्रतिस्पर्धा", vi: "cạnh tranh", my: "ယှဉ်ပြိုင်မှု" } },
    { jp: "技能", reading: "ぎのう", meaning: { en: "skill / ability", ne: "सीप", vi: "kỹ năng", my: "ကျွမ်းကျင်မှု" } },
    { jp: "賞品", reading: "しょうひん", meaning: { en: "prize (item)", ne: "पुरस्कार (वस्तु)", vi: "phần thưởng", my: "ဆုလာဘ်" } },
    { jp: "賛成", reading: "さんせい", meaning: { en: "agreement / approval", ne: "सहमति", vi: "sự tán thành", my: "သဘောတူညီမှု" } },
    { jp: "延期", reading: "えんき", meaning: { en: "postponement", ne: "स्थगन", vi: "sự hoãn lại", my: "ရွှေ့ဆိုင်းမှု" } },
    { jp: "期間", reading: "きかん", meaning: { en: "period", ne: "अवधि", vi: "khoảng thời gian", my: "ကာလ" } },
    { jp: "簡単", reading: "かんたん", meaning: { en: "simple / easy", ne: "सरल", vi: "đơn giản", my: "ရိုးရှင်းသော" } },
    { jp: "複雑", reading: "ふくざつ", meaning: { en: "complicated", ne: "जटिल", vi: "phức tạp", my: "ရှုပ်ထွေးသော" } },
    { jp: "数量", reading: "すうりょう", meaning: { en: "quantity", ne: "मात्रा", vi: "số lượng", my: "အရေအတွက်" } },
    { jp: "機械", reading: "きかい", meaning: { en: "machine", ne: "मेसिन", vi: "máy móc", my: "စက်ကိရိယာ" } },
  ],
  N2: [
    { jp: "矛盾", reading: "むじゅん", meaning: { en: "contradiction", ne: "विरोधाभास", vi: "mâu thuẫn", my: "ကွဲလွဲချက်" } },
    { jp: "現象", reading: "げんしょう", meaning: { en: "phenomenon", ne: "घटना", vi: "hiện tượng", my: "ဖြစ်ရပ်" } },
    { jp: "態度", reading: "たいど", meaning: { en: "attitude", ne: "व्यवहार", vi: "thái độ", my: "သဘောထား" } },
    { jp: "克服する", reading: "こくふくする", meaning: { en: "to overcome", ne: "पार गर्नु", vi: "vượt qua", my: "ကျော်လွှားသည်" } },
    { jp: "維持する", reading: "いじする", meaning: { en: "to maintain", ne: "कायम राख्नु", vi: "duy trì", my: "ထိန်းသိမ်းသည်" } },
    { jp: "傾向", reading: "けいこう", meaning: { en: "tendency", ne: "झुकाव", vi: "xu hướng", my: "ခေတ်ရေစီးကြောင်း" } },
    { jp: "前提", reading: "ぜんてい", meaning: { en: "assumption / premise", ne: "पूर्वधारणा", vi: "tiền đề", my: "ကြိုတင်ယူဆချက်" } },
    { jp: "深刻", reading: "しんこく", meaning: { en: "serious / severe", ne: "गम्भीर", vi: "nghiêm trọng", my: "အလေးအနက်ရှိသော" } },
    { jp: "客観的", reading: "きゃっかんてき", meaning: { en: "objective", ne: "वस्तुनिष्ठ", vi: "khách quan", my: "ဓမ္မဓိဋ္ဌာန်ကျသော" } },
    { jp: "主観的", reading: "しゅかんてき", meaning: { en: "subjective", ne: "व्यक्तिनिष्ठ", vi: "chủ quan", my: "ကိုယ်ကျိုးဆန်သော" } },
    { jp: "権利", reading: "けんり", meaning: { en: "rights", ne: "अधिकार", vi: "quyền lợi", my: "အခွင့်အရေး" } },
    { jp: "提案", reading: "ていあん", meaning: { en: "proposal", ne: "प्रस्ताव", vi: "đề xuất", my: "အကြံပြုချက်" } },
    { jp: "検査", reading: "けんさ", meaning: { en: "inspection", ne: "जाँच", vi: "kiểm tra", my: "စစ်ဆေးမှု" } },
    { jp: "証明", reading: "しょうめい", meaning: { en: "proof / certification", ne: "प्रमाण", vi: "chứng minh", my: "သက်သေခံမှု" } },
    { jp: "基準", reading: "きじゅん", meaning: { en: "standard / criterion", ne: "मापदण्ड", vi: "tiêu chuẩn", my: "စံနှုန်း" } },
    { jp: "範囲", reading: "はんい", meaning: { en: "range / scope", ne: "दायरा", vi: "phạm vi", my: "နယ်ပယ်" } },
    { jp: "制限", reading: "せいげん", meaning: { en: "restriction", ne: "प्रतिबन्ध", vi: "hạn chế", my: "ကန့်သတ်ချက်" } },
    { jp: "拡大", reading: "かくだい", meaning: { en: "expansion", ne: "विस्तार", vi: "mở rộng", my: "ချဲ့ထွင်မှု" } },
    { jp: "縮小", reading: "しゅくしょう", meaning: { en: "reduction", ne: "संकुचन", vi: "thu nhỏ", my: "လျှော့ချမှု" } },
    { jp: "強化", reading: "きょうか", meaning: { en: "strengthening", ne: "सुदृढीकरण", vi: "tăng cường", my: "အားကောင်းအောင်ပြုလုပ်ခြင်း" } },
    { jp: "弱点", reading: "じゃくてん", meaning: { en: "weak point", ne: "कमजोर पक्ष", vi: "điểm yếu", my: "အားနည်းချက်" } },
    { jp: "姿勢", reading: "しせい", meaning: { en: "posture / attitude", ne: "मुद्रा / धारणा", vi: "tư thế / thái độ", my: "ကိုယ်ဟန်/သဘောထား" } },
    { jp: "継続", reading: "けいぞく", meaning: { en: "continuation", ne: "निरन्तरता", vi: "sự tiếp tục", my: "ဆက်လက်ခြင်း" } },
    { jp: "承知", reading: "しょうち", meaning: { en: "acknowledgment / consent", ne: "स्वीकृति", vi: "sự đồng ý", my: "သဘောတူညီမှု" } },
    { jp: "需要", reading: "じゅよう", meaning: { en: "demand", ne: "माग", vi: "nhu cầu", my: "လိုအပ်ချက်" } },
    { jp: "供給", reading: "きょうきゅう", meaning: { en: "supply", ne: "आपूर्ति", vi: "cung cấp", my: "ထောက်ပံ့မှု" } },
    { jp: "均等", reading: "きんとう", meaning: { en: "equality", ne: "समानता", vi: "sự bình đẳng", my: "တန်းတူမှု" } },
    { jp: "責める", reading: "せめる", meaning: { en: "to blame", ne: "दोष लगाउनु", vi: "trách móc", my: "အပြစ်တင်သည်" } },
    { jp: "求める", reading: "もとめる", meaning: { en: "to request / seek", ne: "अनुरोध गर्नु", vi: "yêu cầu / tìm kiếm", my: "တောင်းဆိုသည်" } },
    { jp: "配る", reading: "くばる", meaning: { en: "to distribute", ne: "वितरण गर्नु", vi: "phân phát", my: "ဖြန့်ဝေသည်" } },
    { jp: "限る", reading: "かぎる", meaning: { en: "to limit", ne: "सीमित गर्नु", vi: "giới hạn", my: "ကန့်သတ်သည်" } },
    { jp: "超える", reading: "こえる", meaning: { en: "to exceed", ne: "नाघ्नु", vi: "vượt qua", my: "ကျော်လွန်သည်" } },
    { jp: "厳しい", reading: "きびしい", meaning: { en: "strict", ne: "कडा", vi: "nghiêm khắc", my: "တင်းကျပ်သော" } },
    { jp: "柔らかい", reading: "やわらかい", meaning: { en: "soft", ne: "नरम", vi: "mềm mại", my: "ပျော့ပျောင်းသော" } },
    { jp: "確認", reading: "かくにん", meaning: { en: "confirmation", ne: "पुष्टि", vi: "sự xác nhận", my: "အတည်ပြုချက်" } },
    { jp: "実際", reading: "じっさい", meaning: { en: "actual / reality", ne: "वास्तविक", vi: "thực tế", my: "အမှန်တကယ်" } },
    { jp: "批判", reading: "ひはん", meaning: { en: "criticism", ne: "आलोचना", vi: "sự phê bình", my: "ဝေဖန်ချက်" } },
    { jp: "就職", reading: "しゅうしょく", meaning: { en: "job hunting / employment", ne: "जागिर पाउनु", vi: "tìm việc làm", my: "အလုပ်ရှာဖွေခြင်း" } },
    { jp: "職業", reading: "しょくぎょう", meaning: { en: "occupation", ne: "पेशा", vi: "nghề nghiệp", my: "အလုပ်အကိုင်" } },
    { jp: "雇用", reading: "こよう", meaning: { en: "employment", ne: "रोजगार", vi: "việc làm", my: "အလုပ်ခန့်ထားမှု" } },
    { jp: "契約", reading: "けいやく", meaning: { en: "contract", ne: "सम्झौता", vi: "hợp đồng", my: "စာချုပ်" } },
    { jp: "訪問", reading: "ほうもん", meaning: { en: "visit", ne: "भ्रमण", vi: "chuyến thăm", my: "လည်ပတ်ခြင်း" } },
    { jp: "招待", reading: "しょうたい", meaning: { en: "invitation", ne: "निमन्त्रणा", vi: "lời mời", my: "ဖိတ်ကြားခြင်း" } },
    { jp: "創造", reading: "そうぞう", meaning: { en: "creation", ne: "सिर्जना", vi: "sự sáng tạo", my: "ဖန်တီးမှု" } },
    { jp: "製造", reading: "せいぞう", meaning: { en: "manufacturing", ne: "उत्पादन", vi: "sản xuất", my: "ကုန်ထုတ်လုပ်မှု" } },
    { jp: "偶然", reading: "ぐうぜん", meaning: { en: "coincidence", ne: "संयोग", vi: "sự trùng hợp", my: "အမှတ်တမဲ့ဖြစ်ရပ်" } },
    { jp: "地域", reading: "ちいき", meaning: { en: "region", ne: "क्षेत्र", vi: "khu vực", my: "ဒေသ" } },
    { jp: "確かめる", reading: "たしかめる", meaning: { en: "to confirm / check", ne: "पुष्टि गर्नु", vi: "xác nhận", my: "အတည်ပြုသည်" } },
    { jp: "訴訟", reading: "そしょう", meaning: { en: "lawsuit", ne: "मुद्दा", vi: "vụ kiện", my: "တရားစွဲဆိုမှု" } },
    { jp: "保護", reading: "ほご", meaning: { en: "protection", ne: "सुरक्षा", vi: "sự bảo vệ", my: "ကာကွယ်စောင့်ရှောက်မှု" } },
    { jp: "保険", reading: "ほけん", meaning: { en: "insurance", ne: "बीमा", vi: "bảo hiểm", my: "အာမခံ" } },
    { jp: "危機", reading: "きき", meaning: { en: "crisis", ne: "संकट", vi: "khủng hoảng", my: "အကျပ်အတည်း" } },
    { jp: "治療", reading: "ちりょう", meaning: { en: "medical treatment", ne: "उपचार", vi: "điều trị", my: "ကုသမှု" } },
    { jp: "診断", reading: "しんだん", meaning: { en: "diagnosis", ne: "निदान", vi: "chẩn đoán", my: "ရောဂါအမည်တပ်ခြင်း" } },
    { jp: "悩み", reading: "なやみ", meaning: { en: "worry / trouble", ne: "चिन्ता", vi: "sự lo lắng", my: "စိုးရိမ်ပူပန်မှု" } },
    { jp: "苦労", reading: "くろう", meaning: { en: "hardship", ne: "कष्ट", vi: "sự vất vả", my: "ခက်ခဲမှု" } },
    { jp: "励ます", reading: "はげます", meaning: { en: "to encourage", ne: "प्रोत्साहन दिनु", vi: "khuyến khích", my: "အားပေးသည်" } },
    { jp: "悲しい", reading: "かなしい", meaning: { en: "sad", ne: "दुःखी", vi: "buồn", my: "ဝမ်းနည်းသော" } },
    { jp: "喜ぶ", reading: "よろこぶ", meaning: { en: "to be happy", ne: "खुशी हुनु", vi: "vui mừng", my: "ပျော်ရွှင်သည်" } },
    { jp: "怒る", reading: "おこる", meaning: { en: "to get angry", ne: "रिसाउनु", vi: "tức giận", my: "ဒေါသထွက်သည်" } },
    { jp: "出版", reading: "しゅっぱん", meaning: { en: "publishing", ne: "प्रकाशन", vi: "xuất bản", my: "စာအုပ်ထုတ်ဝေခြင်း" } },
    { jp: "編集", reading: "へんしゅう", meaning: { en: "editing", ne: "सम्पादन", vi: "biên tập", my: "တည်းဖြတ်ခြင်း" } },
    { jp: "雑誌", reading: "ざっし", meaning: { en: "magazine", ne: "पत्रिका", vi: "tạp chí", my: "မဂ္ဂဇင်း" } },
  ],
  N1: [
    { jp: "義務", reading: "ぎむ", meaning: { en: "obligation / duty", ne: "कर्तव्य", vi: "nghĩa vụ", my: "တာဝန်ဝတ္တရား" }, examples: [{ ja: "国民には法律を守る義務があります。", en: "Citizens have a duty to obey the law." }, { ja: "親には子どもを育てる義務があります。", en: "Parents have a duty to raise their children." }] },
    { jp: "曖昧", reading: "あいまい", meaning: { en: "ambiguous / vague", ne: "अस्पष्ट", vi: "mơ hồ", my: "မရေရာသော" }, examples: [{ ja: "彼の返事は曖昧でした。", en: "His answer was vague." }, { ja: "曖昧な説明では内容が分かりません。", en: "I cannot understand the content from a vague explanation." }] },
    { jp: "共存する", reading: "きょうぞんする", meaning: { en: "to coexist", ne: "सहअस्तित्व राख्नु", vi: "cùng tồn tại", my: "အတူယှဉ်တွဲရှင်သန်သည်" }, examples: [{ ja: "人間と自然が共存する社会を目指します。", en: "We aim for a society where humans and nature coexist." }, { ja: "異なる文化が共存することは大切です。", en: "It is important for different cultures to coexist." }] },
    { jp: "必然的", reading: "ひつぜんてき", meaning: { en: "inevitable", ne: "अवश्यंभावी", vi: "tất yếu", my: "ရှောင်လွဲမရသော" } },
    { jp: "逆説", reading: "ぎゃくせつ", meaning: { en: "paradox", ne: "विरोधाभासी तर्क", vi: "nghịch lý", my: "ဆန့်ကျင်ဘက်သဘောတရား" } },
    { jp: "裁量", reading: "さいりょう", meaning: { en: "discretion", ne: "स्वविवेक", vi: "quyền quyết định", my: "ဆုံးဖြတ်ပိုင်ခွင့်" } },
    { jp: "含意", reading: "がんい", meaning: { en: "implication", ne: "अर्थसंकेत", vi: "hàm ý", my: "အဓိပ္ပာယ်ရေးရာ" } },
    { jp: "厳密", reading: "げんみつ", meaning: { en: "rigorous / strict", ne: "कठोर", vi: "nghiêm ngặt", my: "တိကျစွာ" } },
    { jp: "超越する", reading: "ちょうえつする", meaning: { en: "to transcend", ne: "पार गर्नु (सीमा नाघ्नु)", vi: "vượt lên trên", my: "ကျော်လွန်သည်" } },
    { jp: "本質的", reading: "ほんしつてき", meaning: { en: "essential / intrinsic", ne: "आधारभूत", vi: "cốt yếu", my: "အနှစ်သာရဆိုင်ရာ" } },
    { jp: "概念", reading: "がいねん", meaning: { en: "concept", ne: "अवधारणा", vi: "khái niệm", my: "အယူအဆ" } },
    { jp: "普遍的", reading: "ふへんてき", meaning: { en: "universal", ne: "विश्वव्यापी", vi: "mang tính phổ quát", my: "အနှံ့အပြားကျယ်ပြန့်သော" } },
    { jp: "議論", reading: "ぎろん", meaning: { en: "discussion / debate", ne: "छलफल", vi: "tranh luận", my: "ဆွေးနွေးငြင်းခုံမှု" } },
    { jp: "仮定", reading: "かてい", meaning: { en: "hypothesis / assumption", ne: "परिकल्पना", vi: "giả định", my: "ယူဆချက်" } },
    { jp: "疑問", reading: "ぎもん", meaning: { en: "question / doubt", ne: "प्रश्न / शंका", vi: "nghi vấn", my: "မေးခွန်း/သံသယ" } },
    { jp: "洞察", reading: "どうさつ", meaning: { en: "insight", ne: "अन्तर्दृष्टि", vi: "sự thấu hiểu", my: "ထိုးထွင်းသိမြင်မှု" } },
    { jp: "純粋", reading: "じゅんすい", meaning: { en: "pure", ne: "शुद्ध", vi: "thuần khiết", my: "စင်ကြယ်သော" } },
    { jp: "微妙", reading: "びみょう", meaning: { en: "subtle", ne: "सूक्ष्म", vi: "tinh tế", my: "သိမ်မွေ့သော" } },
    { jp: "奇妙", reading: "きみょう", meaning: { en: "strange", ne: "अनौठो", vi: "kỳ lạ", my: "ထူးဆန်းသော" } },
    { jp: "異なる", reading: "ことなる", meaning: { en: "to differ", ne: "फरक हुनु", vi: "khác nhau", my: "ကွဲပြားသည်" } },
    { jp: "統一", reading: "とういつ", meaning: { en: "unification", ne: "एकीकरण", vi: "sự thống nhất", my: "စည်းလုံးညီညွတ်မှု" } },
    { jp: "含む", reading: "ふくむ", meaning: { en: "to include", ne: "समावेश गर्नु", vi: "bao gồm", my: "ပါဝင်သည်" } },
    { jp: "包む", reading: "つつむ", meaning: { en: "to wrap", ne: "बेर्नु", vi: "gói lại", my: "ထုပ်ပိုးသည်" } },
    { jp: "網羅", reading: "もうら", meaning: { en: "comprehensive coverage", ne: "व्यापक समावेश", vi: "bao quát toàn diện", my: "ခြုံငုံအကျုံးဝင်မှု" } },
    { jp: "陥る", reading: "おちいる", meaning: { en: "to fall into", ne: "जालमा पर्नु", vi: "rơi vào", my: "ကျရောက်သည်" } },
    { jp: "一致", reading: "いっち", meaning: { en: "agreement / match", ne: "मिलान", vi: "sự phù hợp", my: "ကိုက်ညီမှု" } },
    { jp: "遂行", reading: "すいこう", meaning: { en: "execution / carrying out", ne: "कार्यान्वयन", vi: "sự thực hiện", my: "အကောင်အထည်ဖော်ဆောင်ရွက်မှု" } },
    { jp: "基盤", reading: "きばん", meaning: { en: "foundation / base", ne: "जग / आधार", vi: "nền tảng", my: "အခြေခံအုတ်မြစ်" } },
    { jp: "素朴", reading: "そぼく", meaning: { en: "simple / naive", ne: "सरल / निश्छल", vi: "mộc mạc", my: "ရိုးရှင်းသော" } },
    { jp: "繊細", reading: "せんさい", meaning: { en: "delicate", ne: "नाजुक", vi: "tinh tế / mỏng manh", my: "သိမ်မွေ့သော" } },
    { jp: "設ける", reading: "もうける", meaning: { en: "to establish", ne: "स्थापना गर्नु", vi: "thiết lập", my: "တည်ထောင်သည်" } },
    { jp: "疑う", reading: "うたがう", meaning: { en: "to doubt", ne: "शंका गर्नु", vi: "nghi ngờ", my: "သံသယဖြစ်သည်" } },
    { jp: "併せる", reading: "あわせる", meaning: { en: "to combine", ne: "मिलाउनु", vi: "kết hợp", my: "ပေါင်းစပ်သည်" } },
    { jp: "考慮", reading: "こうりょ", meaning: { en: "consideration", ne: "विचार", vi: "sự cân nhắc", my: "ထည့်သွင်းစဉ်းစားမှု" } },
    { jp: "存在", reading: "そんざい", meaning: { en: "existence", ne: "अस्तित्व", vi: "sự tồn tại", my: "တည်ရှိမှု" } },
    { jp: "潜在的", reading: "せんざいてき", meaning: { en: "potential", ne: "सम्भावित", vi: "tiềm tàng", my: "ပုန်းအောင်းနေသော" } },
    { jp: "携帯", reading: "けいたい", meaning: { en: "mobile / portable", ne: "मोबाइल", vi: "di động", my: "လက်ကိုင်ဖုန်း" } },
    { jp: "伴う", reading: "ともなう", meaning: { en: "to accompany", ne: "साथसाथै हुनु", vi: "đi kèm theo", my: "လိုက်ပါသည်" } },
    { jp: "妥当", reading: "だとう", meaning: { en: "appropriate / valid", ne: "उपयुक्त", vi: "thỏa đáng", my: "သင့်လျော်သော" } },
    { jp: "巧み", reading: "たくみ", meaning: { en: "skillful", ne: "दक्ष", vi: "khéo léo", my: "ကျွမ်းကျင်သော" } },
    { jp: "熟練", reading: "じゅくれん", meaning: { en: "proficiency", ne: "दक्षता", vi: "sự thành thạo", my: "ကျွမ်းကျင်မှု" } },
    { jp: "鍛える", reading: "きたえる", meaning: { en: "to train / forge", ne: "अभ्यास गराउनु", vi: "rèn luyện", my: "လေ့ကျင့်ပေးသည်" } },
    { jp: "養う", reading: "やしなう", meaning: { en: "to nurture", ne: "पालनपोषण गर्नु", vi: "nuôi dưỡng", my: "ပြုစုပျိုးထောင်သည်" } },
    { jp: "栄養", reading: "えいよう", meaning: { en: "nutrition", ne: "पोषण", vi: "dinh dưỡng", my: "အာဟာရ" } },
    { jp: "濃厚", reading: "のうこう", meaning: { en: "rich / thick", ne: "गाढा", vi: "đậm đà", my: "ပြင်းထန်သော" } },
    { jp: "美しい", reading: "うつくしい", meaning: { en: "beautiful", ne: "सुन्दर", vi: "đẹp", my: "လှပသော" } },
    { jp: "華やか", reading: "はなやか", meaning: { en: "gorgeous / showy", ne: "चमकदार", vi: "lộng lẫy", my: "တောက်ပသော" } },
    { jp: "精神", reading: "せいしん", meaning: { en: "spirit / mind", ne: "आत्मा / मन", vi: "tinh thần", my: "စိတ်ဝိညာဉ်" } },
    { jp: "宗教", reading: "しゅうきょう", meaning: { en: "religion", ne: "धर्म", vi: "tôn giáo", my: "ဘာသာရေး" } },
    { jp: "哲学", reading: "てつがく", meaning: { en: "philosophy", ne: "दर्शनशास्त्र", vi: "triết học", my: "အတွေးအခေါ်ပညာ" } },
    { jp: "倫理", reading: "りんり", meaning: { en: "ethics", ne: "नैतिकता", vi: "đạo đức", my: "ကျင့်ဝတ်" } },
    { jp: "真実", reading: "しんじつ", meaning: { en: "truth", ne: "सत्य", vi: "sự thật", my: "အမှန်တရား" } },
    { jp: "善悪", reading: "ぜんあく", meaning: { en: "good and evil", ne: "असल र खराब", vi: "thiện ác", my: "ကောင်းမှုဆိုးမှု" } },
    { jp: "道徳", reading: "どうとく", meaning: { en: "morality", ne: "नैतिकता", vi: "đạo đức", my: "ကိုယ်ကျင့်တရား" } },
    { jp: "後悔", reading: "こうかい", meaning: { en: "regret", ne: "पछुतो", vi: "sự hối hận", my: "နောင်တ" } },
    { jp: "宇宙", reading: "うちゅう", meaning: { en: "universe", ne: "ब्रह्माण्ड", vi: "vũ trụ", my: "စကြာဝဠာ" } },
    { jp: "核心", reading: "かくしん", meaning: { en: "core / heart of matter", ne: "मूल कुरा", vi: "cốt lõi", my: "အဓိကအချက်" } },
    { jp: "細菌", reading: "さいきん", meaning: { en: "bacteria", ne: "जीवाणु", vi: "vi khuẩn", my: "ဘက်တီးရီးယား" } },
    { jp: "中毒", reading: "ちゅうどく", meaning: { en: "addiction / poisoning", ne: "लत / विषाक्तता", vi: "nghiện / trúng độc", my: "စွဲလမ်းမှု" } },
    { jp: "清潔", reading: "せいけつ", meaning: { en: "cleanliness", ne: "सफाई", vi: "sự sạch sẽ", my: "သန့်ရှင်းမှု" } },
    { jp: "偽物", reading: "にせもの", meaning: { en: "fake item", ne: "नक्कली सामान", vi: "hàng giả", my: "အတု" } },
    { jp: "悟る", reading: "さとる", meaning: { en: "to realize", ne: "बुझ्नु", vi: "nhận ra", my: "သိမြင်သည်" } },
  ],
};

const KANJI = {
  N5: [
    // Numbers
    { jp: "一", reading: "いち・ひとつ", onyomi: "イチ", kunyomi: "ひと(つ)", meaning: { en: "one", ne: "एक", vi: "một", my: "တစ်" } },
    { jp: "二", reading: "に・ふたつ", onyomi: "ニ", kunyomi: "ふた(つ)", meaning: { en: "two", ne: "दुई", vi: "hai", my: "နှစ်" } },
    { jp: "三", reading: "さん・みっつ", onyomi: "サン", kunyomi: "みっ(つ)", meaning: { en: "three", ne: "तीन", vi: "ba", my: "သုံး" } },
    { jp: "四", reading: "し・よっつ", onyomi: "シ", kunyomi: "よ(つ)、よん", meaning: { en: "four", ne: "चार", vi: "bốn", my: "လေး" } },
    { jp: "五", reading: "ご・いつつ", onyomi: "ゴ", kunyomi: "いつ(つ)", meaning: { en: "five", ne: "पाँच", vi: "năm", my: "ငါး" } },
    { jp: "六", reading: "ろく・むっつ", onyomi: "ロク", kunyomi: "むっ(つ)", meaning: { en: "six", ne: "छ", vi: "sáu", my: "ခြောက်" } },
    { jp: "七", reading: "しち・ななつ", onyomi: "シチ", kunyomi: "なな(つ)", meaning: { en: "seven", ne: "सात", vi: "bảy", my: "ခုနစ်" } },
    { jp: "八", reading: "はち・やっつ", onyomi: "ハチ", kunyomi: "やっ(つ)", meaning: { en: "eight", ne: "आठ", vi: "tám", my: "ရှစ်" } },
    { jp: "九", reading: "きゅう・ここのつ", onyomi: "キュウ、ク", kunyomi: "ここの(つ)", meaning: { en: "nine", ne: "नौ", vi: "chín", my: "ကိုး" } },
    { jp: "十", reading: "じゅう・とお", onyomi: "ジュウ", kunyomi: "とお", meaning: { en: "ten", ne: "दश", vi: "mười", my: "ဆယ်" } },
    { jp: "百", reading: "ひゃく", onyomi: "ヒャク", kunyomi: "（なし）", meaning: { en: "hundred", ne: "सय", vi: "trăm", my: "ရာ" } },
    { jp: "千", reading: "せん", onyomi: "セン", kunyomi: "（なし）", meaning: { en: "thousand", ne: "हजार", vi: "nghìn", my: "ထောင်" } },
    { jp: "万", reading: "まん", onyomi: "マン、バン", kunyomi: "（なし）", meaning: { en: "ten thousand", ne: "दश हजार", vi: "vạn (10.000)", my: "သောင်း" } },
    { jp: "円", reading: "えん", onyomi: "エン", kunyomi: "まる（い）", meaning: { en: "yen / circle", ne: "येन / गोलो", vi: "yên / hình tròn", my: "ယန်း / စက်ဝိုင်း" } },
    // Calendar & time
    { jp: "日", reading: "ひ・ニチ", onyomi: "ニチ、ジツ", kunyomi: "ひ、か", meaning: { en: "day / sun", ne: "दिन / सूर्य", vi: "ngày / mặt trời", my: "နေ့ / နေ" } },
    { jp: "月", reading: "つき・ゲツ", onyomi: "ゲツ、ガツ", kunyomi: "つき", meaning: { en: "month / moon", ne: "महिना / चन्द्रमा", vi: "tháng / mặt trăng", my: "လ / လကြယ်" } },
    { jp: "火", reading: "ひ・カ", onyomi: "カ", kunyomi: "ひ", meaning: { en: "fire", ne: "आगो", vi: "lửa", my: "မီး" } },
    { jp: "水", reading: "みず・スイ", onyomi: "スイ", kunyomi: "みず", meaning: { en: "water", ne: "पानी", vi: "nước", my: "ရေ" } },
    { jp: "木", reading: "き・モク", onyomi: "モク、ボク", kunyomi: "き、こ", meaning: { en: "tree / wood", ne: "रुख", vi: "cây", my: "သစ်ပင်" } },
    { jp: "金", reading: "かね・キン", onyomi: "キン、コン", kunyomi: "かね", meaning: { en: "gold / money", ne: "सुन / पैसा", vi: "vàng / tiền", my: "ရွှေ / ငွေ" } },
    { jp: "土", reading: "つち・ド", onyomi: "ド、ト", kunyomi: "つち", meaning: { en: "earth / soil", ne: "माटो", vi: "đất", my: "မြေ" } },
    { jp: "年", reading: "とし・ネン", onyomi: "ネン", kunyomi: "とし", meaning: { en: "year", ne: "वर्ष", vi: "năm", my: "နှစ်" } },
    { jp: "時", reading: "とき・ジ", onyomi: "ジ", kunyomi: "とき", meaning: { en: "time / hour", ne: "समय / घण्टा", vi: "giờ / thời gian", my: "အချိန် / နာရီ" } },
    { jp: "分", reading: "ふん・ブン", onyomi: "フン、ブン", kunyomi: "わ（ける）", meaning: { en: "minute / part", ne: "मिनेट / भाग", vi: "phút / phần", my: "မိနစ် / အပိုင်း" } },
    { jp: "半", reading: "ハン", onyomi: "ハン", kunyomi: "なか（ば）", meaning: { en: "half", ne: "आधा", vi: "nửa", my: "တစ်ဝက်" } },
    { jp: "今", reading: "いま・コン", onyomi: "コン", kunyomi: "いま", meaning: { en: "now", ne: "अहिले", vi: "bây giờ", my: "အခု" } },
    { jp: "週", reading: "シュウ", onyomi: "シュウ", kunyomi: "（なし）", meaning: { en: "week", ne: "साप्ताह", vi: "tuần", my: "အပတ်" } },
    { jp: "曜", reading: "ヨウ", onyomi: "ヨウ", kunyomi: "（なし）", meaning: { en: "day of the week", ne: "हप्ताको दिन", vi: "thứ (trong tuần)", my: "နေ့ရက်" } },
    // Nature
    { jp: "山", reading: "やま・サン", onyomi: "サン", kunyomi: "やま", meaning: { en: "mountain", ne: "पहाड", vi: "núi", my: "တောင်" } },
    { jp: "川", reading: "かわ・セン", onyomi: "セン", kunyomi: "かわ", meaning: { en: "river", ne: "नदी", vi: "sông", my: "မြစ်" } },
    // Position & direction
    { jp: "上", reading: "うえ・ジョウ", onyomi: "ジョウ", kunyomi: "うえ、あ（げる）", meaning: { en: "up / above", ne: "माथि", vi: "trên", my: "အပေါ်" } },
    { jp: "下", reading: "した・カ", onyomi: "カ、ゲ", kunyomi: "した、さ（げる）", meaning: { en: "down / below", ne: "तल", vi: "dưới", my: "အောက်" } },
    { jp: "左", reading: "ひだり・サ", onyomi: "サ", kunyomi: "ひだり", meaning: { en: "left", ne: "बायाँ", vi: "trái", my: "ဘယ်ဘက်" } },
    { jp: "右", reading: "みぎ・ユウ", onyomi: "ユウ、ウ", kunyomi: "みぎ", meaning: { en: "right", ne: "दायाँ", vi: "phải", my: "ညာဘက်" } },
    { jp: "中", reading: "なか・チュウ", onyomi: "チュウ", kunyomi: "なか", meaning: { en: "middle / inside", ne: "बीच / भित्र", vi: "giữa / trong", my: "အလယ် / အတွင်း" } },
    { jp: "外", reading: "そと・ガイ", onyomi: "ガイ", kunyomi: "そと", meaning: { en: "outside", ne: "बाहिर", vi: "bên ngoài", my: "အပြင်" } },
    { jp: "前", reading: "まえ・ゼン", onyomi: "ゼン", kunyomi: "まえ", meaning: { en: "before / front", ne: "अगाडि", vi: "trước", my: "ရှေ့" } },
    { jp: "後", reading: "あと・コウ", onyomi: "ゴ、コウ", kunyomi: "あと、うしろ", meaning: { en: "after / behind", ne: "पछाडि", vi: "sau", my: "နောက်" } },
    { jp: "内", reading: "うち・ナイ", onyomi: "ナイ", kunyomi: "うち", meaning: { en: "inside", ne: "भित्र", vi: "bên trong", my: "အတွင်း" } },
    { jp: "間", reading: "あいだ・カン", onyomi: "カン", kunyomi: "あいだ", meaning: { en: "between / space", ne: "बीचमा", vi: "khoảng giữa", my: "ကြား" } },
    // People & family
    { jp: "人", reading: "ひと・ジン", onyomi: "ジン、ニン", kunyomi: "ひと", meaning: { en: "person", ne: "मानिस", vi: "người", my: "လူ" } },
    { jp: "男", reading: "おとこ・ダン", onyomi: "ダン、ナン", kunyomi: "おとこ", meaning: { en: "man", ne: "पुरुष", vi: "đàn ông", my: "ယောကျ်ား" } },
    { jp: "女", reading: "おんな・ジョ", onyomi: "ジョ、ニョ", kunyomi: "おんな", meaning: { en: "woman", ne: "महिला", vi: "phụ nữ", my: "မိန်းမ" } },
    { jp: "子", reading: "こ・シ", onyomi: "シ", kunyomi: "こ", meaning: { en: "child", ne: "बच्चा", vi: "trẻ em", my: "ကလေး" } },
    { jp: "私", reading: "わたし・シ", onyomi: "シ", kunyomi: "わたし", meaning: { en: "I / me", ne: "म", vi: "tôi", my: "ကျွန်တော်/ကျွန်မ" } },
    { jp: "友", reading: "とも・ユウ", onyomi: "ユウ", kunyomi: "とも", meaning: { en: "friend", ne: "साथी", vi: "bạn bè", my: "သူငယ်ချင်း" } },
    { jp: "父", reading: "ちち・フ", onyomi: "フ", kunyomi: "ちち", meaning: { en: "father", ne: "बुबा", vi: "cha", my: "အဖေ" } },
    { jp: "母", reading: "はは・ボ", onyomi: "ボ", kunyomi: "はは", meaning: { en: "mother", ne: "आमा", vi: "mẹ", my: "အမေ" } },
    { jp: "兄", reading: "あに・ケイ", onyomi: "ケイ、キョウ", kunyomi: "あに", meaning: { en: "older brother", ne: "दाजु", vi: "anh trai", my: "အစ်ကို" } },
    { jp: "姉", reading: "あね・シ", onyomi: "シ", kunyomi: "あね", meaning: { en: "older sister", ne: "दिदी", vi: "chị gái", my: "အစ်မ" } },
    { jp: "弟", reading: "おとうと・テイ", onyomi: "テイ", kunyomi: "おとうと", meaning: { en: "younger brother", ne: "भाइ", vi: "em trai", my: "ညီ" } },
    { jp: "妹", reading: "いもうと・マイ", onyomi: "マイ", kunyomi: "いもうと", meaning: { en: "younger sister", ne: "बहिनी", vi: "em gái", my: "ညီမ" } },
    // Basic adjectives
    { jp: "大", reading: "おおきい・ダイ", onyomi: "ダイ、タイ", kunyomi: "おお（きい）", meaning: { en: "big", ne: "ठूलो", vi: "to lớn", my: "ကြီး" } },
    { jp: "小", reading: "ちいさい・ショウ", onyomi: "ショウ", kunyomi: "ちい（さい）", meaning: { en: "small", ne: "सानो", vi: "nhỏ", my: "သေး" } },
    { jp: "高", reading: "たかい・コウ", onyomi: "コウ", kunyomi: "たか（い）", meaning: { en: "high / expensive", ne: "अग्लो / महँगो", vi: "cao / đắt", my: "မြင့် / စျေးကြီး" } },
    { jp: "安", reading: "やすい・アン", onyomi: "アン", kunyomi: "やす（い）", meaning: { en: "cheap / safe", ne: "सस्तो / सुरक्षित", vi: "rẻ / an toàn", my: "စျေးသက်သာ / ဘေးကင်း" } },
    { jp: "新", reading: "あたらしい・シン", onyomi: "シン", kunyomi: "あたら（しい）", meaning: { en: "new", ne: "नयाँ", vi: "mới", my: "အသစ်" } },
    { jp: "古", reading: "ふるい・コ", onyomi: "コ", kunyomi: "ふる（い）", meaning: { en: "old", ne: "पुरानो", vi: "cũ", my: "ဟောင်း" } },
    { jp: "長", reading: "ながい・チョウ", onyomi: "チョウ", kunyomi: "なが（い）", meaning: { en: "long", ne: "लामो", vi: "dài", my: "ရှည်" } },
    { jp: "多", reading: "おおい・タ", onyomi: "タ", kunyomi: "おお（い）", meaning: { en: "many", ne: "धेरै", vi: "nhiều", my: "များ" } },
    { jp: "少", reading: "すこし・ショウ", onyomi: "ショウ", kunyomi: "すこ（し）、すく（ない）", meaning: { en: "few / a little", ne: "थोरै", vi: "ít", my: "နည်း" } },
    { jp: "早", reading: "はやい・ソウ", onyomi: "ソウ", kunyomi: "はや（い）", meaning: { en: "early / fast", ne: "चाँडो", vi: "sớm / nhanh", my: "စော" } },
    // School & language
    { jp: "学", reading: "まなぶ・ガク", onyomi: "ガク", kunyomi: "まな（ぶ）", meaning: { en: "study / learning", ne: "अध्ययन", vi: "học tập", my: "ပညာသင်ကြားခြင်း" } },
    { jp: "校", reading: "コウ", onyomi: "コウ", kunyomi: "（なし）", meaning: { en: "school", ne: "विद्यालय", vi: "trường học", my: "ကျောင်း" } },
    { jp: "先", reading: "さき・セン", onyomi: "セン", kunyomi: "さき", meaning: { en: "previous / ahead", ne: "अगाडि / पहिले", vi: "trước / phía trước", my: "ရှေ့/အရင်" } },
    { jp: "生", reading: "いきる・セイ", onyomi: "セイ、ショウ", kunyomi: "い（きる）、う（まれる）", meaning: { en: "life / birth / raw", ne: "जीवन / जन्म", vi: "sự sống / sinh ra", my: "အသက်/မွေးဖွား" } },
    { jp: "本", reading: "ほん・ホン", onyomi: "ホン", kunyomi: "もと", meaning: { en: "book / origin", ne: "किताब / मूल", vi: "sách / gốc", my: "စာအုပ်/မူလ" } },
    { jp: "字", reading: "ジ", onyomi: "ジ", kunyomi: "（なし）", meaning: { en: "character / letter", ne: "अक्षर", vi: "chữ viết", my: "အက္ခရာ" } },
    { jp: "語", reading: "かたる・ゴ", onyomi: "ゴ", kunyomi: "かた（る）", meaning: { en: "language / word", ne: "भाषा / शब्द", vi: "ngôn ngữ / từ", my: "ဘာသာစကား" } },
    { jp: "話", reading: "はなす・ワ", onyomi: "ワ", kunyomi: "はな（す）", meaning: { en: "talk / story", ne: "कुरा / कथा", vi: "câu chuyện / nói chuyện", my: "ပြောစကား" } },
    { jp: "読", reading: "よむ・ドク", onyomi: "ドク", kunyomi: "よ（む）", meaning: { en: "to read", ne: "पढ्नु", vi: "đọc", my: "ဖတ်ခြင်း" } },
    { jp: "書", reading: "かく・ショ", onyomi: "ショ", kunyomi: "か（く）", meaning: { en: "to write", ne: "लेख्नु", vi: "viết", my: "ရေးသားခြင်း" } },
    { jp: "言", reading: "いう・ゲン", onyomi: "ゲン、ゴン", kunyomi: "い（う）", meaning: { en: "to say / word", ne: "भन्नु / शब्द", vi: "nói / lời nói", my: "ပြောဆိုခြင်း" } },
    // Everyday verbs
    { jp: "見", reading: "みる・ケン", onyomi: "ケン", kunyomi: "み（る）", meaning: { en: "to see", ne: "हेर्नु", vi: "nhìn / xem", my: "ကြည့်ခြင်း" } },
    { jp: "聞", reading: "きく・ブン", onyomi: "ブン、モン", kunyomi: "き（く）", meaning: { en: "to listen / hear", ne: "सुन्नु", vi: "nghe", my: "နားထောင်ခြင်း" } },
    { jp: "食", reading: "たべる・ショク", onyomi: "ショク", kunyomi: "た（べる）", meaning: { en: "to eat", ne: "खानु", vi: "ăn", my: "စားခြင်း" } },
    { jp: "飲", reading: "のむ・イン", onyomi: "イン", kunyomi: "の（む）", meaning: { en: "to drink", ne: "पिउनु", vi: "uống", my: "သောက်ခြင်း" } },
    { jp: "買", reading: "かう・バイ", onyomi: "バイ", kunyomi: "か（う）", meaning: { en: "to buy", ne: "किन्नु", vi: "mua", my: "ဝယ်ခြင်း" } },
    { jp: "行", reading: "いく・コウ", onyomi: "コウ、ギョウ", kunyomi: "い（く）", meaning: { en: "to go", ne: "जानु", vi: "đi", my: "သွားခြင်း" } },
    { jp: "来", reading: "くる・ライ", onyomi: "ライ", kunyomi: "く（る）", meaning: { en: "to come", ne: "आउनु", vi: "đến", my: "လာခြင်း" } },
    { jp: "出", reading: "でる・シュツ", onyomi: "シュツ", kunyomi: "で（る）、だ（す）", meaning: { en: "to exit / go out", ne: "बाहिर निस्कनु", vi: "ra ngoài", my: "ထွက်ခြင်း" } },
    { jp: "入", reading: "はいる・ニュウ", onyomi: "ニュウ", kunyomi: "はい（る）、い（れる）", meaning: { en: "to enter", ne: "भित्र पस्नु", vi: "vào", my: "ဝင်ခြင်း" } },
    { jp: "立", reading: "たつ・リツ", onyomi: "リツ", kunyomi: "た（つ）", meaning: { en: "to stand", ne: "उभिनु", vi: "đứng", my: "ရပ်ခြင်း" } },
    { jp: "休", reading: "やすむ・キュウ", onyomi: "キュウ", kunyomi: "やす（む）", meaning: { en: "to rest", ne: "आराम गर्नु", vi: "nghỉ ngơi", my: "နားခြင်း" } },
    // Nature & world
    { jp: "雨", reading: "あめ・ウ", onyomi: "ウ", kunyomi: "あめ", meaning: { en: "rain", ne: "पानी (वर्षा)", vi: "mưa", my: "မိုး" } },
    { jp: "空", reading: "そら・クウ", onyomi: "クウ", kunyomi: "そら、あ（く）", meaning: { en: "sky / empty", ne: "आकाश / खाली", vi: "bầu trời / trống rỗng", my: "ကောင်းကင်/ဗလာ" } },
    { jp: "田", reading: "た・デン", onyomi: "デン", kunyomi: "た", meaning: { en: "rice field", ne: "धान खेत", vi: "ruộng lúa", my: "လယ်ကွင်း" } },
    { jp: "花", reading: "はな・カ", onyomi: "カ", kunyomi: "はな", meaning: { en: "flower", ne: "फूल", vi: "hoa", my: "ပန်း" } },
    { jp: "国", reading: "くに・コク", onyomi: "コク", kunyomi: "くに", meaning: { en: "country", ne: "देश", vi: "quốc gia", my: "နိုင်ငံ" } },
    // Colors & basics
    { jp: "白", reading: "しろい・ハク", onyomi: "ハク", kunyomi: "しろ（い）", meaning: { en: "white", ne: "सेतो", vi: "trắng", my: "အဖြူရောင်" } },
    { jp: "黒", reading: "くろい・コク", onyomi: "コク", kunyomi: "くろ（い）", meaning: { en: "black", ne: "कालो", vi: "đen", my: "အနက်ရောင်" } },
    { jp: "赤", reading: "あかい・セキ", onyomi: "セキ", kunyomi: "あか（い）", meaning: { en: "red", ne: "रातो", vi: "đỏ", my: "အနီရောင်" } },
    { jp: "青", reading: "あおい・セイ", onyomi: "セイ", kunyomi: "あお（い）", meaning: { en: "blue", ne: "निलो", vi: "xanh dương", my: "အပြာရောင်" } },
    { jp: "何", reading: "なに・カ", onyomi: "カ", kunyomi: "なに、なん", meaning: { en: "what", ne: "के", vi: "gì / cái gì", my: "ဘာ" } },
    { jp: "会", reading: "あう・カイ", onyomi: "カイ", kunyomi: "あ（う）", meaning: { en: "to meet / association", ne: "भेट्नु / संघ", vi: "gặp gỡ / hiệp hội", my: "တွေ့ဆုံခြင်း/အသင်း" } },
    { jp: "社", reading: "シャ", onyomi: "シャ", kunyomi: "（なし）", meaning: { en: "company / shrine", ne: "कम्पनी / मन्दिर", vi: "công ty / đền thờ", my: "ကုမ္ပဏီ/ဗိမာန်" } },
    { jp: "電", reading: "デン", onyomi: "デン", kunyomi: "（なし）", meaning: { en: "electricity", ne: "बिजुली", vi: "điện", my: "လျှပ်စစ်" } },
    { jp: "車", reading: "くるま・シャ", onyomi: "シャ", kunyomi: "くるま", meaning: { en: "car / vehicle", ne: "गाडी", vi: "xe cộ", my: "ကား" } },
    { jp: "好", reading: "すき・コウ", onyomi: "コウ", kunyomi: "す（き）", meaning: { en: "to like", ne: "मन पराउनु", vi: "thích", my: "ကြိုက်ခြင်း" } },
    { jp: "悪", reading: "わるい・アク", onyomi: "アク", kunyomi: "わる（い）", meaning: { en: "bad", ne: "नराम्रो", vi: "xấu / tệ", my: "ဆိုးသော" } },
    { jp: "同", reading: "おなじ・ドウ", onyomi: "ドウ", kunyomi: "おな（じ）", meaning: { en: "same", ne: "उस्तै", vi: "giống nhau", my: "တူညီသော" } },
  ],
  N4: [
    { jp: "世", reading: "セ・よ", onyomi: "セイ、セ", kunyomi: "よ", meaning: { en: "world / generation", ne: "संसार", vi: "thế hệ", my: "ကမ္ဘာ" } },
    { jp: "界", reading: "カイ", onyomi: "カイ", kunyomi: "（なし）", meaning: { en: "boundary / world", ne: "क्षेत्र", vi: "giới", my: "နယ်ပယ်" } },
    { jp: "経", reading: "ケイ", onyomi: "ケイ、キョウ", kunyomi: "へる", meaning: { en: "to pass through", ne: "बित्नु", vi: "trải qua", my: "ဖြတ်သန်းသည်" } },
    { jp: "験", reading: "ケン", onyomi: "ケン、ゲン", kunyomi: "（なし）", meaning: { en: "test / experience", ne: "परीक्षा", vi: "kiểm nghiệm", my: "စမ်းသပ်ချက်" } },
    { jp: "決", reading: "きめる・ケツ", onyomi: "ケツ", kunyomi: "きめる、きまる", meaning: { en: "to decide", ne: "निर्णय", vi: "quyết", my: "ဆုံးဖြတ်ချက်" } },
    { jp: "続", reading: "つづく・ゾク", onyomi: "ゾク", kunyomi: "つづく、つづける", meaning: { en: "to continue", ne: "जारी", vi: "tiếp tục", my: "ဆက်လက်" } },
    // Common action verbs
    { jp: "働", reading: "はたらく・ドウ", onyomi: "ドウ", kunyomi: "はたら（く）", meaning: { en: "to work", ne: "काम गर्नु", vi: "làm việc", my: "အလုပ်လုပ်ခြင်း" } },
    { jp: "使", reading: "つかう・シ", onyomi: "シ", kunyomi: "つか（う）", meaning: { en: "to use", ne: "प्रयोग गर्नु", vi: "sử dụng", my: "အသုံးပြုခြင်း" } },
    { jp: "持", reading: "もつ・ジ", onyomi: "ジ", kunyomi: "も（つ）", meaning: { en: "to hold / carry", ne: "समाउनु", vi: "cầm / mang", my: "ကိုင်ခြင်း" } },
    { jp: "作", reading: "つくる・サク", onyomi: "サク、サ", kunyomi: "つく（る）", meaning: { en: "to make", ne: "बनाउनु", vi: "làm / chế tạo", my: "ပြုလုပ်ခြင်း" } },
    { jp: "始", reading: "はじめる・シ", onyomi: "シ", kunyomi: "はじ（める・まる）", meaning: { en: "to begin", ne: "सुरु गर्नु", vi: "bắt đầu", my: "စတင်ခြင်း" } },
    { jp: "終", reading: "おわる・シュウ", onyomi: "シュウ", kunyomi: "お（わる・える）", meaning: { en: "to end", ne: "समाप्त हुनु", vi: "kết thúc", my: "ပြီးဆုံးခြင်း" } },
    { jp: "乗", reading: "のる・ジョウ", onyomi: "ジョウ", kunyomi: "の（る）", meaning: { en: "to ride", ne: "चढ्नु", vi: "lên (xe)", my: "စီးခြင်း" } },
    { jp: "降", reading: "おりる・コウ", onyomi: "コウ", kunyomi: "お（りる）、ふ（る）", meaning: { en: "to get off / to fall (rain)", ne: "ओर्लनु / पानी पर्नु", vi: "xuống (xe) / rơi (mưa)", my: "ဆင်းခြင်း / မိုးရွာခြင်း" } },
    { jp: "通", reading: "かよう・ツウ", onyomi: "ツウ", kunyomi: "とお（る）、かよ（う）", meaning: { en: "to pass / commute", ne: "ओहोरदोहोर गर्नु", vi: "đi qua / đi lại", my: "အသွားအလာ" } },
    { jp: "走", reading: "はしる・ソウ", onyomi: "ソウ", kunyomi: "はし（る）", meaning: { en: "to run", ne: "दौड्नु", vi: "chạy", my: "ပြေးခြင်း" } },
    { jp: "泳", reading: "およぐ・エイ", onyomi: "エイ", kunyomi: "およ（ぐ）", meaning: { en: "to swim", ne: "पौडिनु", vi: "bơi", my: "ရေကူးခြင်း" } },
    { jp: "遊", reading: "あそぶ・ユウ", onyomi: "ユウ", kunyomi: "あそ（ぶ）", meaning: { en: "to play", ne: "खेल्नु", vi: "chơi", my: "ကစားခြင်း" } },
    { jp: "習", reading: "ならう・シュウ", onyomi: "シュウ", kunyomi: "なら（う）", meaning: { en: "to learn / practice", ne: "सिक्नु", vi: "học / luyện tập", my: "သင်ယူခြင်း" } },
    { jp: "教", reading: "おしえる・キョウ", onyomi: "キョウ", kunyomi: "おし（える）", meaning: { en: "to teach", ne: "सिकाउनु", vi: "dạy", my: "သင်ကြားခြင်း" } },
    { jp: "洗", reading: "あらう・セン", onyomi: "セン", kunyomi: "あら（う）", meaning: { en: "to wash", ne: "धुनु", vi: "rửa / giặt", my: "ဆေးခြင်း" } },
    { jp: "運", reading: "はこぶ・ウン", onyomi: "ウン", kunyomi: "はこ（ぶ）", meaning: { en: "to carry / luck", ne: "बोक्नु / भाग्य", vi: "vận chuyển / vận may", my: "သယ်ဆောင်ခြင်း" } },
    { jp: "着", reading: "きる・チャク", onyomi: "チャク", kunyomi: "き（る）、つ（く）", meaning: { en: "to wear / to arrive", ne: "लगाउनु / पुग्नु", vi: "mặc / đến nơi", my: "ဝတ်ခြင်း" } },
    { jp: "送", reading: "おくる・ソウ", onyomi: "ソウ", kunyomi: "おく（る）", meaning: { en: "to send", ne: "पठाउनु", vi: "gửi", my: "ပို့ခြင်း" } },
    // Body parts
    { jp: "体", reading: "からだ・タイ", onyomi: "タイ", kunyomi: "からだ", meaning: { en: "body", ne: "शरीर", vi: "cơ thể", my: "ခန္ဓာကိုယ်" } },
    { jp: "顔", reading: "かお・ガン", onyomi: "ガン", kunyomi: "かお", meaning: { en: "face", ne: "अनुहार", vi: "khuôn mặt", my: "မျက်နှာ" } },
    { jp: "手", reading: "て・シュ", onyomi: "シュ", kunyomi: "て", meaning: { en: "hand", ne: "हात", vi: "bàn tay", my: "လက်" } },
    { jp: "足", reading: "あし・ソク", onyomi: "ソク", kunyomi: "あし", meaning: { en: "foot / leg", ne: "खुट्टा", vi: "chân", my: "ခြေ" } },
    { jp: "頭", reading: "あたま・トウ", onyomi: "トウ", kunyomi: "あたま", meaning: { en: "head", ne: "टाउको", vi: "đầu", my: "ခေါင်း" } },
    { jp: "目", reading: "め・モク", onyomi: "モク", kunyomi: "め", meaning: { en: "eye", ne: "आँखा", vi: "mắt", my: "မျက်စိ" } },
    { jp: "耳", reading: "みみ・ジ", onyomi: "ジ", kunyomi: "みみ", meaning: { en: "ear", ne: "कान", vi: "tai", my: "နား" } },
    { jp: "口", reading: "くち・コウ", onyomi: "コウ", kunyomi: "くち", meaning: { en: "mouth", ne: "मुख", vi: "miệng", my: "ပါးစပ်" } },
    // Health
    { jp: "病", reading: "やまい・ビョウ", onyomi: "ビョウ", kunyomi: "やまい", meaning: { en: "illness", ne: "रोग", vi: "bệnh", my: "ဖျားနာမှု" } },
    { jp: "院", reading: "イン", onyomi: "イン", kunyomi: "（なし）", meaning: { en: "institution", ne: "संस्था", vi: "viện", my: "အဖွဲ့အစည်း" } },
    { jp: "医", reading: "イ", onyomi: "イ", kunyomi: "（なし）", meaning: { en: "doctor / medicine", ne: "चिकित्सक", vi: "y (bác sĩ)", my: "ဆေးပညာ" } },
    { jp: "薬", reading: "くすり・ヤク", onyomi: "ヤク", kunyomi: "くすり", meaning: { en: "medicine", ne: "औषधि", vi: "thuốc", my: "ဆေးဝါး" } },
    // Places & things
    { jp: "駅", reading: "エキ", onyomi: "エキ", kunyomi: "（なし）", meaning: { en: "station", ne: "स्टेशन", vi: "nhà ga", my: "ဘူတာ" } },
    { jp: "道", reading: "みち・ドウ", onyomi: "ドウ", kunyomi: "みち", meaning: { en: "road / way", ne: "बाटो", vi: "con đường", my: "လမ်း" } },
    { jp: "店", reading: "みせ・テン", onyomi: "テン", kunyomi: "みせ", meaning: { en: "shop", ne: "पसल", vi: "cửa hàng", my: "ဆိုင်" } },
    { jp: "品", reading: "しな・ヒン", onyomi: "ヒン", kunyomi: "しな", meaning: { en: "goods / item", ne: "सामान", vi: "hàng hóa", my: "ပစ္စည်း" } },
    { jp: "味", reading: "あじ・ミ", onyomi: "ミ", kunyomi: "あじ", meaning: { en: "taste", ne: "स्वाद", vi: "hương vị", my: "အရသာ" } },
    { jp: "色", reading: "いろ・ショク", onyomi: "ショク、シキ", kunyomi: "いろ", meaning: { en: "color", ne: "रंग", vi: "màu sắc", my: "အရောင်" } },
    { jp: "音", reading: "おと・オン", onyomi: "オン", kunyomi: "おと", meaning: { en: "sound", ne: "आवाज", vi: "âm thanh", my: "အသံ" } },
    { jp: "声", reading: "こえ・セイ", onyomi: "セイ", kunyomi: "こえ", meaning: { en: "voice", ne: "आवाज (मानिसको)", vi: "giọng nói", my: "အသံ (လူ့)" } },
    // Abstract & people
    { jp: "力", reading: "ちから・リョク", onyomi: "リョク、リキ", kunyomi: "ちから", meaning: { en: "power / strength", ne: "शक्ति", vi: "sức mạnh", my: "အားအင်" } },
    { jp: "心", reading: "こころ・シン", onyomi: "シン", kunyomi: "こころ", meaning: { en: "heart / mind", ne: "मन", vi: "tâm / lòng", my: "စိတ်နှလုံး" } },
    { jp: "者", reading: "もの・シャ", onyomi: "シャ", kunyomi: "もの", meaning: { en: "person (suffix)", ne: "व्यक्ति (प्रत्यय)", vi: "người (hậu tố)", my: "လူ (နောက်ဆက်တွဲ)" } },
    { jp: "員", reading: "イン", onyomi: "イン", kunyomi: "（なし）", meaning: { en: "member", ne: "सदस्य", vi: "thành viên / nhân viên", my: "အဖွဲ့ဝင်" } },
    { jp: "仕", reading: "シ", onyomi: "シ", kunyomi: "つか（える）", meaning: { en: "to serve (work)", ne: "सेवा गर्नु", vi: "phục vụ (công việc)", my: "အမှုထမ်းခြင်း" } },
    { jp: "事", reading: "こと・ジ", onyomi: "ジ", kunyomi: "こと", meaning: { en: "thing / matter", ne: "कुरा / विषय", vi: "sự việc", my: "ကိစ္စ" } },
    { jp: "気", reading: "キ", onyomi: "キ、ケ", kunyomi: "（なし）", meaning: { en: "spirit / feeling", ne: "भावना", vi: "khí / cảm giác", my: "စိတ်ခံစားမှု" } },
    { jp: "元", reading: "もと・ゲン", onyomi: "ゲン、ガン", kunyomi: "もと", meaning: { en: "origin / former", ne: "मूल", vi: "nguyên / gốc", my: "မူလ" } },
    { jp: "毎", reading: "マイ", onyomi: "マイ", kunyomi: "（なし）", meaning: { en: "every", ne: "हरेक", vi: "mỗi", my: "တိုင်း" } },
    { jp: "夜", reading: "よる・ヤ", onyomi: "ヤ", kunyomi: "よる", meaning: { en: "night", ne: "रात", vi: "đêm", my: "ညဉ့်" } },
    // Education & communication
    { jp: "質", reading: "シツ", onyomi: "シツ", kunyomi: "（なし）", meaning: { en: "quality", ne: "गुणस्तर", vi: "chất lượng", my: "အရည်အသွေး" } },
    { jp: "問", reading: "とう・モン", onyomi: "モン", kunyomi: "と（う）", meaning: { en: "question", ne: "प्रश्न", vi: "câu hỏi", my: "မေးခွန်း" } },
    { jp: "答", reading: "こたえる・トウ", onyomi: "トウ", kunyomi: "こた（える）", meaning: { en: "to answer", ne: "जवाफ दिनु", vi: "trả lời", my: "ဖြေကြားခြင်း" } },
    { jp: "題", reading: "ダイ", onyomi: "ダイ", kunyomi: "（なし）", meaning: { en: "topic / title", ne: "विषय / शीर्षक", vi: "chủ đề / tiêu đề", my: "ခေါင်းစဉ်" } },
    { jp: "試", reading: "ためす・シ", onyomi: "シ", kunyomi: "ため（す）、こころ（みる）", meaning: { en: "to try / test", ne: "प्रयास गर्नु / परीक्षा", vi: "thử / kiểm tra", my: "စမ်းသပ်ခြင်း" } },
    { jp: "授", reading: "さずける・ジュ", onyomi: "ジュ", kunyomi: "さず（ける）", meaning: { en: "to instruct / grant", ne: "प्रदान गर्नु", vi: "truyền đạt / trao", my: "ပေးအပ်ခြင်း" } },
    { jp: "研", reading: "とぐ・ケン", onyomi: "ケン", kunyomi: "と（ぐ）", meaning: { en: "to research / polish", ne: "अनुसन्धान गर्नु", vi: "nghiên cứu / mài giũa", my: "သုတေသနပြုခြင်း" } },
    { jp: "究", reading: "キュウ", onyomi: "キュウ", kunyomi: "きわ（める）", meaning: { en: "to investigate thoroughly", ne: "गहिरो अध्ययन गर्नु", vi: "nghiên cứu sâu", my: "နက်နဲစွာသုတေသနပြုခြင်း" } },
    { jp: "辞", reading: "やめる・ジ", onyomi: "ジ", kunyomi: "や（める）", meaning: { en: "word / to resign", ne: "शब्द / राजीनामा दिनु", vi: "từ ngữ / từ chức", my: "စကားလုံး/နှုတ်ထွက်ခြင်း" } },
    { jp: "典", reading: "テン", onyomi: "テン", kunyomi: "（なし）", meaning: { en: "code / ceremony / dictionary", ne: "संहिता / समारोह", vi: "điển lễ / từ điển", my: "ကျမ်းစာ" } },
    { jp: "連", reading: "つらなる・レン", onyomi: "レン", kunyomi: "つら（なる）", meaning: { en: "to connect / link", ne: "जोड्नु", vi: "liên kết", my: "ဆက်စပ်ခြင်း" } },
    { jp: "絡", reading: "からむ・ラク", onyomi: "ラク", kunyomi: "から（む）", meaning: { en: "to contact / entangle", ne: "सम्पर्क गर्नु", vi: "liên lạc", my: "ဆက်သွယ်ခြင်း" } },
    // Places & structures
    { jp: "集", reading: "あつまる・シュウ", onyomi: "シュウ", kunyomi: "あつ（まる）", meaning: { en: "to gather", ne: "जम्मा हुनु", vi: "tụ họp", my: "စုစည်းခြင်း" } },
    { jp: "合", reading: "あう・ゴウ", onyomi: "ゴウ", kunyomi: "あ（う）", meaning: { en: "to fit / combine", ne: "मिल्नु", vi: "phù hợp / kết hợp", my: "ကိုက်ညီခြင်း" } },
    { jp: "台", reading: "ダイ", onyomi: "ダイ", kunyomi: "（なし）", meaning: { en: "platform / counter (for machines)", ne: "मञ्च / गन्ती इकाई", vi: "bệ / đơn vị đếm", my: "ပလက်ဖောင်း" } },
    { jp: "所", reading: "ところ・ショ", onyomi: "ショ", kunyomi: "ところ", meaning: { en: "place", ne: "ठाउँ", vi: "nơi chốn", my: "နေရာ" } },
    { jp: "場", reading: "ば・ジョウ", onyomi: "ジョウ", kunyomi: "ば", meaning: { en: "place / location", ne: "स्थान", vi: "địa điểm", my: "နေရာ" } },
    { jp: "建", reading: "たてる・ケン", onyomi: "ケン", kunyomi: "た（てる）", meaning: { en: "to construct", ne: "निर्माण गर्नु", vi: "xây dựng", my: "ဆောက်လုပ်ခြင်း" } },
    { jp: "物", reading: "もの・ブツ", onyomi: "ブツ、モツ", kunyomi: "もの", meaning: { en: "thing", ne: "वस्तु", vi: "đồ vật", my: "အရာဝတ္ထု" } },
    { jp: "家", reading: "いえ・カ", onyomi: "カ、ケ", kunyomi: "いえ、や", meaning: { en: "house / family", ne: "घर / परिवार", vi: "nhà / gia đình", my: "အိမ်/မိသားစု" } },
    // Speed & manner
    { jp: "歩", reading: "あるく・ホ", onyomi: "ホ", kunyomi: "ある（く）", meaning: { en: "to walk", ne: "हिँड्नु", vi: "đi bộ", my: "လမ်းလျှောက်ခြင်း" } },
    { jp: "急", reading: "いそぐ・キュウ", onyomi: "キュウ", kunyomi: "いそ（ぐ）", meaning: { en: "to hurry / sudden", ne: "हतार गर्नु / अचानक", vi: "vội vàng / đột ngột", my: "အလျင်စလို" } },
    { jp: "速", reading: "はやい・ソク", onyomi: "ソク", kunyomi: "はや（い）", meaning: { en: "fast", ne: "छिटो", vi: "nhanh", my: "မြန်သော" } },
    { jp: "遅", reading: "おそい・チ", onyomi: "チ", kunyomi: "おそ（い）", meaning: { en: "late / slow", ne: "ढिलो", vi: "muộn / chậm", my: "နှေးသော" } },
    { jp: "特", reading: "トク", onyomi: "トク", kunyomi: "（なし）", meaning: { en: "special", ne: "विशेष", vi: "đặc biệt", my: "အထူး" } },
    { jp: "別", reading: "わかれる・ベツ", onyomi: "ベツ", kunyomi: "わか（れる）", meaning: { en: "separate / different", ne: "अलग", vi: "khác / riêng biệt", my: "သီးခြား" } },
    { jp: "必", reading: "かならず・ヒツ", onyomi: "ヒツ", kunyomi: "かなら（ず）", meaning: { en: "certainly / must", ne: "अवश्य", vi: "chắc chắn / phải", my: "မလွဲမသွေ" } },
    { jp: "若", reading: "わかい・ジャク", onyomi: "ジャク", kunyomi: "わか（い）", meaning: { en: "young", ne: "जवान", vi: "trẻ", my: "ငယ်ရွယ်သော" } },
    { jp: "共", reading: "とも・キョウ", onyomi: "キョウ", kunyomi: "とも", meaning: { en: "together", ne: "सँगै", vi: "cùng nhau", my: "အတူတကွ" } },
    { jp: "違", reading: "ちがう・イ", onyomi: "イ", kunyomi: "ちが（う）", meaning: { en: "to differ / be wrong", ne: "फरक हुनु / गलत हुनु", vi: "khác nhau / sai", my: "ကွဲပြားခြင်း" } },
  ],
  N3: [
    { jp: "環", reading: "カン", onyomi: "カン", kunyomi: "（なし）", meaning: { en: "ring / cycle", ne: "चक्र", vi: "vòng", my: "စက်ဝန်း" } },
    { jp: "境", reading: "キョウ", onyomi: "キョウ、ケイ", kunyomi: "さかい", meaning: { en: "border / boundary", ne: "सिमाना", vi: "biên giới", my: "နယ်နိမိတ်" } },
    { jp: "較", reading: "カク", onyomi: "カク", kunyomi: "（なし）", meaning: { en: "to compare", ne: "तुलना", vi: "so sánh", my: "နှိုင်းယှဉ်" } },
    { jp: "響", reading: "キョウ", onyomi: "キョウ", kunyomi: "ひびく", meaning: { en: "to echo / affect", ne: "गुञ्जन", vi: "vang vọng", my: "ထပ်တလောလောလိုက်ခြင်း" } },
    { jp: "傾", reading: "ケイ", onyomi: "ケイ", kunyomi: "かたむく、かたむける", meaning: { en: "to lean / incline", ne: "झुक्नु", vi: "nghiêng", my: "စောင်းသည်" } },
    { jp: "測", reading: "ソク", onyomi: "ソク", kunyomi: "はかる", meaning: { en: "to measure", ne: "नाप्नु", vi: "đo lường", my: "တိုင်းတာသည်" } },
    // Abstract concepts
    { jp: "情", reading: "ジョウ", onyomi: "ジョウ", kunyomi: "（なし）", meaning: { en: "emotion / feeling", ne: "भावना", vi: "cảm xúc", my: "စိတ်ခံစားမှု" } },
    { jp: "報", reading: "ホウ", onyomi: "ホウ", kunyomi: "（なし）", meaning: { en: "news / report", ne: "समाचार / प्रतिवेदन", vi: "tin tức / báo cáo", my: "သတင်း" } },
    { jp: "識", reading: "シキ", onyomi: "シキ", kunyomi: "（なし）", meaning: { en: "knowledge / consciousness", ne: "ज्ञान / चेतना", vi: "kiến thức / ý thức", my: "အသိပညာ" } },
    { jp: "認", reading: "みとめる・ニン", onyomi: "ニン", kunyomi: "みと（める）", meaning: { en: "to recognize / acknowledge", ne: "स्वीकार गर्नु", vi: "công nhận", my: "အသိအမှတ်ပြုခြင်း" } },
    { jp: "断", reading: "ことわる・ダン", onyomi: "ダン", kunyomi: "ことわ（る）、た（つ）", meaning: { en: "to cut / decide", ne: "काट्नु / निर्णय गर्नु", vi: "cắt / quyết định", my: "ဖြတ်တောက်ခြင်း" } },
    { jp: "判", reading: "ハン", onyomi: "ハン", kunyomi: "（なし）", meaning: { en: "to judge", ne: "न्याय गर्नु", vi: "phán xét", my: "စီရင်ဆုံးဖြတ်ခြင်း" } },
    { jp: "理", reading: "リ", onyomi: "リ", kunyomi: "（なし）", meaning: { en: "reason / logic", ne: "तर्क", vi: "lý lẽ / logic", my: "ကျိုးကြောင်း" } },
    { jp: "由", reading: "ユウ・ユ", onyomi: "ユウ、ユ", kunyomi: "（なし）", meaning: { en: "reason / cause", ne: "कारण", vi: "lý do", my: "အကြောင်းရင်း" } },
    { jp: "原", reading: "はら・ゲン", onyomi: "ゲン", kunyomi: "はら", meaning: { en: "origin / field", ne: "मूल / फाँट", vi: "nguyên nhân / cánh đồng", my: "မူလ" } },
    { jp: "因", reading: "イン", onyomi: "イン", kunyomi: "（なし）", meaning: { en: "cause", ne: "कारण", vi: "nguyên nhân", my: "အကြောင်းအရင်း" } },
    { jp: "結", reading: "むすぶ・ケツ", onyomi: "ケツ", kunyomi: "むす（ぶ）", meaning: { en: "to tie / bind", ne: "बाँध्नु", vi: "buộc / kết", my: "ချည်နှောင်ခြင်း" } },
    { jp: "果", reading: "はたす・カ", onyomi: "カ", kunyomi: "は（たす）", meaning: { en: "result / fruit", ne: "फल / परिणाम", vi: "kết quả / trái cây", my: "အသီး" } },
    { jp: "状", reading: "ジョウ", onyomi: "ジョウ", kunyomi: "（なし）", meaning: { en: "state / form", ne: "अवस्था", vi: "trạng thái", my: "အခြေအနေ" } },
    { jp: "態", reading: "タイ", onyomi: "タイ", kunyomi: "（なし）", meaning: { en: "condition", ne: "स्थिति", vi: "tình trạng", my: "အခြေအနေ" } },
    { jp: "況", reading: "キョウ", onyomi: "キョウ", kunyomi: "（なし）", meaning: { en: "situation", ne: "परिस्थिति", vi: "tình huống", my: "အခြေအနေ" } },
    // Society & governance
    { jp: "政", reading: "セイ", onyomi: "セイ", kunyomi: "（なし）", meaning: { en: "politics / government", ne: "राजनीति", vi: "chính trị", my: "နိုင်ငံရေး" } },
    { jp: "治", reading: "おさめる・ジ", onyomi: "ジ、チ", kunyomi: "おさ（める）、なお（る）", meaning: { en: "to govern / rule", ne: "शासन गर्नु", vi: "cai trị", my: "အုပ်ချုပ်ခြင်း" } },
    { jp: "済", reading: "すむ・サイ", onyomi: "サイ", kunyomi: "す（む）", meaning: { en: "economy / to finish", ne: "अर्थतन्त्र / सकिनु", vi: "kinh tế / xong", my: "စီးပွားရေး" } },
    { jp: "産", reading: "うむ・サン", onyomi: "サン", kunyomi: "う（む）", meaning: { en: "production / to give birth", ne: "उत्पादन / जन्म दिनु", vi: "sản xuất / sinh ra", my: "ထုတ်လုပ်မှု" } },
    { jp: "業", reading: "ギョウ", onyomi: "ギョウ、ゴウ", kunyomi: "わざ", meaning: { en: "business / industry", ne: "व्यवसाय / उद्योग", vi: "kinh doanh / ngành nghề", my: "စက်မှုလုပ်ငန်း" } },
    { jp: "商", reading: "ショウ", onyomi: "ショウ", kunyomi: "あきな（う）", meaning: { en: "commerce / trade", ne: "व्यापार", vi: "thương mại", my: "ကုန်သွယ်ရေး" } },
    { jp: "制", reading: "セイ", onyomi: "セイ", kunyomi: "（なし）", meaning: { en: "system / control", ne: "प्रणाली / नियन्त्रण", vi: "hệ thống / kiểm soát", my: "စနစ်" } },
    { jp: "度", reading: "ド", onyomi: "ド、ト", kunyomi: "たび", meaning: { en: "degree / extent", ne: "डिग्री / हद", vi: "mức độ", my: "ဒီဂရီ" } },
    { jp: "律", reading: "リツ", onyomi: "リツ、リチ", kunyomi: "（なし）", meaning: { en: "law / rhythm", ne: "कानून / ताल", vi: "luật / nhịp điệu", my: "ဥပဒေ" } },
    { jp: "規", reading: "キ", onyomi: "キ", kunyomi: "（なし）", meaning: { en: "rule / standard", ne: "नियम / मापदण्ड", vi: "quy tắc / tiêu chuẩn", my: "စည်းမျဉ်း" } },
    { jp: "則", reading: "ソク", onyomi: "ソク", kunyomi: "（なし）", meaning: { en: "rule / regulation", ne: "नियम", vi: "quy định", my: "စည်းကမ်း" } },
    { jp: "福", reading: "フク", onyomi: "フク", kunyomi: "（なし）", meaning: { en: "good fortune / blessing", ne: "सौभाग्य / आशिष्", vi: "phúc lành", my: "ကောင်းကျိုးမင်္ဂလာ" } },
    { jp: "祉", reading: "シ", onyomi: "シ", kunyomi: "（なし）", meaning: { en: "welfare", ne: "कल्याण", vi: "phúc lợi", my: "လူမှုဖူလုံရေး" } },
    { jp: "歴", reading: "レキ", onyomi: "レキ", kunyomi: "（なし）", meaning: { en: "passage of time / history", ne: "इतिहास (समयको)", vi: "quá trình / lịch sử", my: "အတိတ်ကာလ" } },
    { jp: "史", reading: "シ", onyomi: "シ", kunyomi: "（なし）", meaning: { en: "history", ne: "इतिहास", vi: "lịch sử", my: "သမိုင်း" } },
    { jp: "選", reading: "えらぶ・セン", onyomi: "セン", kunyomi: "えら（ぶ）", meaning: { en: "to choose / select", ne: "छान्नु", vi: "chọn / lựa chọn", my: "ရွေးချယ်ခြင်း" } },
    { jp: "挙", reading: "あげる・キョ", onyomi: "キョ", kunyomi: "あ（げる）", meaning: { en: "to raise / conduct (an event)", ne: "उठाउनु / सञ्चालन गर्नु", vi: "nâng lên / tổ chức", my: "ကျင်းပခြင်း" } },
    { jp: "争", reading: "あらそう・ソウ", onyomi: "ソウ", kunyomi: "あらそ（う）", meaning: { en: "to dispute / compete", ne: "विवाद गर्नु", vi: "tranh chấp / cạnh tranh", my: "ငြင်းခုံခြင်း" } },
    { jp: "戦", reading: "たたかう・セン", onyomi: "セン", kunyomi: "たたか（う）", meaning: { en: "war / battle", ne: "युद्ध", vi: "chiến tranh", my: "စစ်ပွဲ" } },
    // Comparison & change
    { jp: "効", reading: "きく・コウ", onyomi: "コウ", kunyomi: "き（く）", meaning: { en: "effect", ne: "प्रभावकारिता", vi: "hiệu quả", my: "အကျိုးသက်ရောက်မှု" } },
    { jp: "率", reading: "ひきいる・リツ", onyomi: "リツ、ソツ", kunyomi: "ひき（いる）", meaning: { en: "rate / to lead", ne: "दर / नेतृत्व गर्नु", vi: "tỷ lệ / dẫn dắt", my: "နှုန်း" } },
    { jp: "比", reading: "くらべる・ヒ", onyomi: "ヒ", kunyomi: "くら（べる）", meaning: { en: "to compare / ratio", ne: "तुलना गर्नु / अनुपात", vi: "so sánh / tỷ lệ", my: "နှိုင်းယှဉ်ခြင်း" } },
    { jp: "増", reading: "ふえる・ゾウ", onyomi: "ゾウ", kunyomi: "ふ（える・やす）", meaning: { en: "to increase", ne: "बढ्नु", vi: "tăng", my: "တိုးလာခြင်း" } },
    { jp: "加", reading: "くわえる・カ", onyomi: "カ", kunyomi: "くわ（える・わる）", meaning: { en: "to add", ne: "थप्नु", vi: "thêm vào", my: "ထည့်ခြင်း" } },
    { jp: "減", reading: "へる・ゲン", onyomi: "ゲン", kunyomi: "へ（る・らす）", meaning: { en: "to decrease", ne: "घट्नु", vi: "giảm", my: "လျော့ကျခြင်း" } },
    { jp: "変", reading: "かわる・ヘン", onyomi: "ヘン", kunyomi: "か（わる・える）", meaning: { en: "to change", ne: "परिवर्तन हुनु", vi: "thay đổi", my: "ပြောင်းလဲခြင်း" } },
    { jp: "化", reading: "ばける・カ", onyomi: "カ、ケ", kunyomi: "ば（ける）", meaning: { en: "to change / -ify", ne: "रूपान्तरण हुनु", vi: "biến đổi / hóa", my: "ပြောင်းလဲမှု" } },
    // Economics & evaluation
    { jp: "述", reading: "のべる・ジュツ", onyomi: "ジュツ", kunyomi: "の（べる）", meaning: { en: "to state", ne: "भन्नु", vi: "trình bày", my: "ဖော်ပြခြင်း" } },
    { jp: "評", reading: "ヒョウ", onyomi: "ヒョウ", kunyomi: "（なし）", meaning: { en: "to evaluate", ne: "मूल्यांकन गर्नु", vi: "đánh giá", my: "အကဲဖြတ်ခြင်း" } },
    { jp: "価", reading: "カ", onyomi: "カ", kunyomi: "（なし）", meaning: { en: "value / price", ne: "मूल्य", vi: "giá trị", my: "တန်ဖိုး" } },
    { jp: "値", reading: "ね・チ", onyomi: "チ", kunyomi: "ね、あたい", meaning: { en: "value / price", ne: "मूल्य", vi: "giá trị", my: "တန်ဖိုး" } },
    { jp: "資", reading: "シ", onyomi: "シ", kunyomi: "（なし）", meaning: { en: "resources / capital", ne: "स्रोत / पूँजी", vi: "tài nguyên / vốn", my: "အရင်းအမြစ်" } },
    { jp: "源", reading: "みなもと・ゲン", onyomi: "ゲン", kunyomi: "みなもと", meaning: { en: "source", ne: "स्रोत", vi: "nguồn gốc", my: "အရင်းအမြစ်" } },
    { jp: "費", reading: "ついやす・ヒ", onyomi: "ヒ", kunyomi: "つい（やす）", meaning: { en: "expense", ne: "खर्च", vi: "chi phí", my: "အသုံးစရိတ်" } },
    { jp: "負", reading: "まける・フ", onyomi: "フ", kunyomi: "ま（ける）、お（う）", meaning: { en: "negative / to lose / bear", ne: "हार्नु / बोक्नु", vi: "thua / gánh chịu", my: "ရှုံးနိမ့်ခြင်း" } },
    { jp: "担", reading: "かつぐ・タン", onyomi: "タン", kunyomi: "かつ（ぐ）", meaning: { en: "to bear / carry", ne: "बोक्नु", vi: "gánh vác", my: "ထမ်းရွက်ခြင်း" } },
    { jp: "益", reading: "エキ", onyomi: "エキ、ヤク", kunyomi: "（なし）", meaning: { en: "benefit", ne: "फाइदा", vi: "lợi ích", my: "အကျိုးအမြတ်" } },
    { jp: "損", reading: "そこなう・ソン", onyomi: "ソン", kunyomi: "そこ（なう）", meaning: { en: "loss / damage", ne: "नोक्सान", vi: "thiệt hại", my: "ဆုံးရှုံးမှု" } },
    { jp: "税", reading: "ゼイ", onyomi: "ゼイ", kunyomi: "（なし）", meaning: { en: "tax", ne: "कर", vi: "thuế", my: "အခွန်" } },
    { jp: "込", reading: "こむ", onyomi: "（なし）", kunyomi: "こ（む）", meaning: { en: "to be crowded / include", ne: "भरिनु / समावेश हुनु", vi: "đông đúc / bao gồm", my: "ပါဝင်ခြင်း" } },
    // Disaster & safety
    { jp: "防", reading: "ふせぐ・ボウ", onyomi: "ボウ", kunyomi: "ふせ（ぐ）", meaning: { en: "to prevent", ne: "रोक्नु", vi: "phòng ngừa", my: "ကာကွယ်ခြင်း" } },
    { jp: "災", reading: "わざわい・サイ", onyomi: "サイ", kunyomi: "わざわ（い）", meaning: { en: "disaster", ne: "विपत्ति", vi: "thiên tai", my: "ဘေးအန္တရာယ်" } },
    { jp: "被", reading: "こうむる・ヒ", onyomi: "ヒ", kunyomi: "こうむ（る）", meaning: { en: "to receive (damage)", ne: "क्षति भोग्नु", vi: "chịu (thiệt hại)", my: "ခံရခြင်း" } },
    { jp: "害", reading: "ガイ", onyomi: "ガイ", kunyomi: "（なし）", meaning: { en: "harm", ne: "हानि", vi: "tác hại", my: "ဘေးအန္တရာယ်" } },
    { jp: "故", reading: "ゆえ・コ", onyomi: "コ", kunyomi: "ゆえ", meaning: { en: "reason / the late", ne: "कारण / स्वर्गीय", vi: "lý do / cố (người đã mất)", my: "အကြောင်းရင်း" } },
    { jp: "障", reading: "ショウ", onyomi: "ショウ", kunyomi: "（なし）", meaning: { en: "obstacle", ne: "बाधा", vi: "trở ngại", my: "အတားအဆီး" } },
    // Organization & construction
    { jp: "組", reading: "くむ・ソ", onyomi: "ソ", kunyomi: "く（む）", meaning: { en: "to assemble / group", ne: "जम्मा गर्नु / समूह", vi: "lắp ráp / nhóm", my: "စုစည်းခြင်း" } },
    { jp: "築", reading: "きずく・チク", onyomi: "チク", kunyomi: "きず（く）", meaning: { en: "to construct", ne: "निर्माण गर्नु", vi: "xây dựng", my: "တည်ဆောက်ခြင်း" } },
    { jp: "専", reading: "セン", onyomi: "セン", kunyomi: "（なし）", meaning: { en: "to specialize", ne: "विशेषज्ञता", vi: "chuyên môn", my: "အထူးပြုခြင်း" } },
    { jp: "門", reading: "もん・モン", onyomi: "モン", kunyomi: "かど", meaning: { en: "gate", ne: "ढोका", vi: "cổng", my: "တံခါးပေါက်" } },
    { jp: "織", reading: "おる・シキ", onyomi: "シキ、ショク", kunyomi: "お（る）", meaning: { en: "to weave / organize", ne: "बुन्नु / व्यवस्थित गर्नु", vi: "dệt / tổ chức", my: "ရက်ခြင်း" } },
    { jp: "導", reading: "みちびく・ドウ", onyomi: "ドウ", kunyomi: "みちび（く）", meaning: { en: "to guide", ne: "मार्गदर्शन गर्नु", vi: "hướng dẫn", my: "လမ်းညွှန်ခြင်း" } },
    // Travel, records & achievement
    { jp: "旅", reading: "たび・リョ", onyomi: "リョ", kunyomi: "たび", meaning: { en: "travel", ne: "यात्रा", vi: "du lịch", my: "ခရီးသွားခြင်း" } },
    { jp: "程", reading: "ほど・テイ", onyomi: "テイ", kunyomi: "ほど", meaning: { en: "extent / degree", ne: "हद / मात्रा", vi: "mức độ", my: "အတိုင်းအတာ" } },
    { jp: "録", reading: "ロク", onyomi: "ロク", kunyomi: "（なし）", meaning: { en: "to record", ne: "रेकर्ड गर्नु", vi: "ghi lại", my: "မှတ်တမ်းတင်ခြင်း" } },
    { jp: "記", reading: "しるす・キ", onyomi: "キ", kunyomi: "しる（す）", meaning: { en: "to note / record", ne: "टिप्पणी गर्नु", vi: "ghi chép", my: "မှတ်သားခြင်း" } },
    { jp: "憶", reading: "オク", onyomi: "オク", kunyomi: "（なし）", meaning: { en: "memory", ne: "सम्झना", vi: "trí nhớ", my: "မှတ်ဉာဏ်" } },
    { jp: "績", reading: "セキ", onyomi: "セキ", kunyomi: "（なし）", meaning: { en: "achievement", ne: "उपलब्धि", vi: "thành tích", my: "အောင်မြင်မှု" } },
    { jp: "成", reading: "なる・セイ", onyomi: "セイ", kunyomi: "な（る）", meaning: { en: "to become / achieve", ne: "बन्नु / हासिल गर्नु", vi: "trở thành / đạt được", my: "ဖြစ်လာခြင်း" } },
    { jp: "功", reading: "コウ", onyomi: "コウ、ク", kunyomi: "（なし）", meaning: { en: "merit / success", ne: "सफलता", vi: "công lao / thành công", my: "ကျေးဇူး" } },
    { jp: "競", reading: "きそう・キョウ", onyomi: "キョウ", kunyomi: "きそ（う）", meaning: { en: "to compete", ne: "प्रतिस्पर्धा गर्नु", vi: "cạnh tranh", my: "ယှဉ်ပြိုင်ခြင်း" } },
    { jp: "技", reading: "わざ・ギ", onyomi: "ギ", kunyomi: "わざ", meaning: { en: "skill", ne: "सीप", vi: "kỹ năng", my: "ကျွမ်းကျင်မှု" } },
    { jp: "術", reading: "ジュツ", onyomi: "ジュツ", kunyomi: "（なし）", meaning: { en: "technique / art", ne: "प्रविधि / कला", vi: "kỹ thuật / nghệ thuật", my: "အနုပညာ" } },
    { jp: "賞", reading: "ショウ", onyomi: "ショウ", kunyomi: "（なし）", meaning: { en: "prize", ne: "पुरस्कार", vi: "giải thưởng", my: "ဆု" } },
    { jp: "賛", reading: "サン", onyomi: "サン", kunyomi: "（なし）", meaning: { en: "to praise / agree", ne: "प्रशंसा गर्नु / सहमत हुनु", vi: "khen ngợi / tán thành", my: "ချီးမွမ်းခြင်း" } },
    // Time, complexity & structure
    { jp: "延", reading: "のびる・エン", onyomi: "エン", kunyomi: "の（びる）", meaning: { en: "to extend", ne: "लम्ब्याउनु", vi: "kéo dài", my: "တိုးချဲ့ခြင်း" } },
    { jp: "期", reading: "キ", onyomi: "キ", kunyomi: "（なし）", meaning: { en: "period", ne: "अवधि", vi: "kỳ hạn", my: "ကာလ" } },
    { jp: "簡", reading: "カン", onyomi: "カン", kunyomi: "（なし）", meaning: { en: "simple", ne: "सरल", vi: "đơn giản", my: "ရိုးရှင်းသော" } },
    { jp: "単", reading: "タン", onyomi: "タン", kunyomi: "（なし）", meaning: { en: "single", ne: "एकल", vi: "đơn", my: "တစ်ခုတည်း" } },
    { jp: "複", reading: "フク", onyomi: "フク", kunyomi: "（なし）", meaning: { en: "duplicate / multiple", ne: "बहु", vi: "phức / nhiều", my: "ရှုပ်ထွေးသော" } },
    { jp: "雑", reading: "ザツ", onyomi: "ザツ、ゾウ", kunyomi: "（なし）", meaning: { en: "miscellaneous", ne: "विविध", vi: "hỗn tạp", my: "အထွေထွေ" } },
    { jp: "接", reading: "つぐ・セツ", onyomi: "セツ", kunyomi: "つ（ぐ）", meaning: { en: "to contact / join", ne: "जोड्नु / सम्पर्क गर्नु", vi: "tiếp xúc / nối", my: "ဆက်စပ်ခြင်း" } },
    // Numbers & tools
    { jp: "億", reading: "オク", onyomi: "オク", kunyomi: "（なし）", meaning: { en: "hundred million", ne: "करोड", vi: "trăm triệu", my: "ကုဋေ" } },
    { jp: "兆", reading: "チョウ", onyomi: "チョウ", kunyomi: "（なし）", meaning: { en: "trillion / sign", ne: "खरब / संकेत", vi: "nghìn tỷ / điềm báo", my: "ထရီလီယံ" } },
    { jp: "数", reading: "かず・スウ", onyomi: "スウ", kunyomi: "かず", meaning: { en: "number", ne: "संख्या", vi: "số lượng", my: "ဂဏန်း" } },
    { jp: "量", reading: "リョウ", onyomi: "リョウ", kunyomi: "（なし）", meaning: { en: "quantity", ne: "मात्रा", vi: "số lượng", my: "ပမာဏ" } },
    { jp: "容", reading: "ヨウ", onyomi: "ヨウ", kunyomi: "（なし）", meaning: { en: "to contain / form", ne: "समावेश गर्नु", vi: "chứa đựng / hình thức", my: "ပါဝင်ခြင်း" } },
    { jp: "器", reading: "うつわ・キ", onyomi: "キ", kunyomi: "うつわ", meaning: { en: "vessel / instrument", ne: "भाँडो / यन्त्र", vi: "vật chứa / dụng cụ", my: "ခွက်ယောက်" } },
    { jp: "械", reading: "カイ", onyomi: "カイ", kunyomi: "（なし）", meaning: { en: "machine", ne: "मेसिन", vi: "máy móc", my: "စက်ကိရိယာ" } },
    { jp: "機", reading: "キ", onyomi: "キ", kunyomi: "（なし）", meaning: { en: "machine / opportunity", ne: "मेसिन / अवसर", vi: "máy / cơ hội", my: "စက်/အခွင့်အရေး" } },
    { jp: "段", reading: "ダン", onyomi: "ダン", kunyomi: "（なし）", meaning: { en: "step / level", ne: "चरण / तह", vi: "bậc / cấp độ", my: "အဆင့်" } },
    { jp: "階", reading: "カイ", onyomi: "カイ", kunyomi: "（なし）", meaning: { en: "floor / level", ne: "तला / तह", vi: "tầng / cấp độ", my: "အထပ်" } },
  ],
  N2: [
    { jp: "矛", reading: "ム", onyomi: "ム、ボウ", kunyomi: "ほこ", meaning: { en: "spear", ne: "भाला", vi: "cây giáo", my: "လှံ" } },
    { jp: "盾", reading: "ジュン", onyomi: "ジュン", kunyomi: "たて", meaning: { en: "shield", ne: "ढाल", vi: "cái khiên", my: "ဒိုင်း" } },
    { jp: "維", reading: "イ", onyomi: "イ", kunyomi: "（なし）", meaning: { en: "to maintain / fiber", ne: "कायम राख्नु", vi: "duy trì", my: "ထိန်းသိမ်း" } },
    { jp: "克", reading: "コク", onyomi: "コク", kunyomi: "（なし）", meaning: { en: "to overcome", ne: "पार गर्नु", vi: "khắc phục", my: "ကျော်လွှား" } },
    { jp: "客", reading: "キャク", onyomi: "キャク、カク", kunyomi: "（なし）", meaning: { en: "guest", ne: "पाहुना", vi: "khách", my: "ဧည့်သည်" } },
    { jp: "観", reading: "カン", onyomi: "カン", kunyomi: "（なし）", meaning: { en: "view / outlook", ne: "दृष्टिकोण", vi: "quan điểm", my: "အမြင်" } },
    // Authority & responsibility
    { jp: "権", reading: "ケン", onyomi: "ケン", kunyomi: "（なし）", meaning: { en: "authority / rights", ne: "अधिकार", vi: "quyền lực / quyền lợi", my: "အာဏာ/အခွင့်အရေး" } },
    { jp: "利", reading: "リ", onyomi: "リ", kunyomi: "（なし）", meaning: { en: "profit / advantage", ne: "फाइदा", vi: "lợi ích", my: "အကျိုးအမြတ်" } },
    { jp: "務", reading: "つとめる・ム", onyomi: "ム", kunyomi: "つと（める）", meaning: { en: "duty / task", ne: "कर्तव्य", vi: "nhiệm vụ", my: "တာဝန်" } },
    { jp: "任", reading: "まかせる・ニン", onyomi: "ニン", kunyomi: "まか（せる）", meaning: { en: "responsibility / to entrust", ne: "जिम्मेवारी", vi: "trách nhiệm / giao phó", my: "တာဝန်/ပေးအပ်ခြင်း" } },
    { jp: "責", reading: "せめる・セキ", onyomi: "セキ", kunyomi: "せ（める）", meaning: { en: "blame / responsibility", ne: "दोष / जिम्मेवारी", vi: "trách nhiệm / khiển trách", my: "အပြစ်တင်ခြင်း/တာဝန်" } },
    { jp: "現", reading: "あらわれる・ゲン", onyomi: "ゲン", kunyomi: "あらわ（れる）", meaning: { en: "present / to appear", ne: "वर्तमान / देखा पर्नु", vi: "hiện tại / xuất hiện", my: "လက်ရှိ/ပေါ်လာခြင်း" } },
    { jp: "象", reading: "ショウ", onyomi: "ショウ、ゾウ", kunyomi: "（なし）", meaning: { en: "phenomenon / elephant", ne: "घटना / हात्ती", vi: "hiện tượng / con voi", my: "ဖြစ်ရပ်/ဆင်" } },
    // Supply, demand & procedure
    { jp: "配", reading: "くばる・ハイ", onyomi: "ハイ", kunyomi: "くば（る）", meaning: { en: "to distribute", ne: "वितरण गर्नु", vi: "phân phối", my: "ဖြန့်ဝေခြင်း" } },
    { jp: "供", reading: "そなえる・キョウ", onyomi: "キョウ、ク", kunyomi: "そな（える）、とも", meaning: { en: "to provide / offer", ne: "उपलब्ध गराउनु", vi: "cung cấp", my: "ပံ့ပိုးခြင်း" } },
    { jp: "給", reading: "キュウ", onyomi: "キュウ", kunyomi: "（なし）", meaning: { en: "to supply", ne: "आपूर्ति गर्नु", vi: "cung cấp", my: "ထောက်ပံ့ခြင်း" } },
    { jp: "需", reading: "ジュ", onyomi: "ジュ", kunyomi: "（なし）", meaning: { en: "demand", ne: "माग", vi: "nhu cầu", my: "လိုအပ်ချက်" } },
    { jp: "要", reading: "いる・ヨウ", onyomi: "ヨウ", kunyomi: "い（る）", meaning: { en: "need / important", ne: "आवश्यक / महत्त्वपूर्ण", vi: "cần thiết / quan trọng", my: "လိုအပ်သော" } },
    { jp: "求", reading: "もとめる・キュウ", onyomi: "キュウ", kunyomi: "もと（める）", meaning: { en: "to request / seek", ne: "अनुरोध गर्नु", vi: "yêu cầu / tìm kiếm", my: "တောင်းဆိုခြင်း" } },
    { jp: "提", reading: "テイ", onyomi: "テイ", kunyomi: "（なし）", meaning: { en: "to present", ne: "प्रस्तुत गर्नु", vi: "đưa ra / trình bày", my: "တင်ပြခြင်း" } },
    { jp: "案", reading: "アン", onyomi: "アン", kunyomi: "（なし）", meaning: { en: "proposal / idea", ne: "प्रस्ताव / विचार", vi: "đề án / ý tưởng", my: "အကြံပြုချက်" } },
    { jp: "検", reading: "ケン", onyomi: "ケン", kunyomi: "（なし）", meaning: { en: "to inspect", ne: "जाँच गर्नु", vi: "kiểm tra", my: "စစ်ဆေးခြင်း" } },
    { jp: "査", reading: "サ", onyomi: "サ", kunyomi: "（なし）", meaning: { en: "to examine", ne: "जाँच गर्नु", vi: "điều tra", my: "စိစစ်ခြင်း" } },
    { jp: "証", reading: "ショウ", onyomi: "ショウ", kunyomi: "（なし）", meaning: { en: "proof / certificate", ne: "प्रमाण / प्रमाणपत्र", vi: "bằng chứng / chứng chỉ", my: "သက်သေ/လက်မှတ်" } },
    { jp: "拠", reading: "キョ", onyomi: "キョ、コ", kunyomi: "（なし）", meaning: { en: "basis / evidence", ne: "आधार / प्रमाण", vi: "căn cứ", my: "အခြေခံ/သက်သေ" } },
    { jp: "基", reading: "もとづく・キ", onyomi: "キ", kunyomi: "もと、もとづ（く）", meaning: { en: "basis / foundation", ne: "आधार", vi: "cơ sở / nền tảng", my: "အခြေခံ" } },
    { jp: "準", reading: "ジュン", onyomi: "ジュン", kunyomi: "（なし）", meaning: { en: "standard / semi-", ne: "मापदण्ड", vi: "tiêu chuẩn", my: "စံနှုန်း" } },
    { jp: "均", reading: "キン", onyomi: "キン", kunyomi: "（なし）", meaning: { en: "equal / average", ne: "समान / औसत", vi: "đều / trung bình", my: "ညီမျှသော" } },
    // Boundaries & scale
    { jp: "枠", reading: "わく", onyomi: "（なし）", kunyomi: "わく", meaning: { en: "frame", ne: "फ्रेम / सीमा", vi: "khung", my: "ဘောင်" } },
    { jp: "範", reading: "ハン", onyomi: "ハン", kunyomi: "（なし）", meaning: { en: "model / example", ne: "नमूना", vi: "khuôn mẫu", my: "စံနမူနာ" } },
    { jp: "囲", reading: "かこむ・イ", onyomi: "イ", kunyomi: "かこ（む）", meaning: { en: "enclosure / surrounding", ne: "घेरा", vi: "vây quanh / phạm vi", my: "ဝန်းရံမှု" } },
    { jp: "限", reading: "かぎる・ゲン", onyomi: "ゲン", kunyomi: "かぎ（る）", meaning: { en: "limit", ne: "सीमा", vi: "giới hạn", my: "အကန့်အသတ်" } },
    { jp: "超", reading: "こえる・チョウ", onyomi: "チョウ", kunyomi: "こ（える）", meaning: { en: "to exceed", ne: "नाघ्नु", vi: "vượt quá", my: "ကျော်လွန်ခြင်း" } },
    { jp: "姿", reading: "すがた・シ", onyomi: "シ", kunyomi: "すがた", meaning: { en: "figure / appearance", ne: "आकृति", vi: "dáng vẻ", my: "ပုံသဏ္ဌာန်" } },
    { jp: "勢", reading: "いきおい・セイ", onyomi: "セイ", kunyomi: "いきお（い）", meaning: { en: "force / momentum", ne: "बल / गति", vi: "thế lực / đà", my: "အင်အား/ရှိန်" } },
    { jp: "継", reading: "つぐ・ケイ", onyomi: "ケイ", kunyomi: "つ（ぐ）", meaning: { en: "to inherit / succeed", ne: "उत्तराधिकार पाउनु", vi: "kế thừa", my: "အမွေဆက်ခံခြင်း" } },
    { jp: "承", reading: "うけたまわる・ショウ", onyomi: "ショウ", kunyomi: "うけたまわ（る）", meaning: { en: "to agree / inherit", ne: "स्वीकार गर्नु", vi: "chấp thuận / kế thừa", my: "လက်ခံခြင်း" } },
    // Intensity & texture
    { jp: "拡", reading: "カク", onyomi: "カク", kunyomi: "（なし）", meaning: { en: "to expand", ne: "विस्तार गर्नु", vi: "mở rộng", my: "ချဲ့ထွင်ခြင်း" } },
    { jp: "縮", reading: "ちぢむ・シュク", onyomi: "シュク", kunyomi: "ちぢ（む・める）", meaning: { en: "to shrink", ne: "खुम्चिनु", vi: "co lại", my: "ကျုံ့ခြင်း" } },
    { jp: "弱", reading: "よわい・ジャク", onyomi: "ジャク", kunyomi: "よわ（い）", meaning: { en: "weak", ne: "कमजोर", vi: "yếu", my: "အားနည်းသော" } },
    { jp: "強", reading: "つよい・キョウ", onyomi: "キョウ、ゴウ", kunyomi: "つよ（い）", meaning: { en: "strong", ne: "बलियो", vi: "mạnh", my: "အားကောင်းသော" } },
    { jp: "柔", reading: "やわらかい・ジュウ", onyomi: "ジュウ、ニュウ", kunyomi: "やわ（らかい）", meaning: { en: "soft / flexible", ne: "नरम / लचिलो", vi: "mềm dẻo", my: "ပျော့ပျောင်းသော" } },
    { jp: "軟", reading: "やわらかい・ナン", onyomi: "ナン", kunyomi: "やわ（らかい）", meaning: { en: "soft", ne: "नरम", vi: "mềm", my: "နူးညံ့သော" } },
    { jp: "硬", reading: "かたい・コウ", onyomi: "コウ", kunyomi: "かた（い）", meaning: { en: "hard", ne: "कडा", vi: "cứng", my: "မာကျောသော" } },
    { jp: "厳", reading: "きびしい・ゲン", onyomi: "ゲン", kunyomi: "きび（しい）", meaning: { en: "strict / severe", ne: "कडा / गम्भीर", vi: "nghiêm khắc", my: "တင်းကျပ်သော" } },
    { jp: "密", reading: "ミツ", onyomi: "ミツ", kunyomi: "（なし）", meaning: { en: "dense / secret", ne: "घना / गोप्य", vi: "dày đặc / bí mật", my: "သိပ်သည်းသော" } },
    // Physical actions
    { jp: "抱", reading: "だく・ホウ", onyomi: "ホウ", kunyomi: "だ（く）、いだ（く）", meaning: { en: "to embrace / hold", ne: "अँगालो हाल्नु", vi: "ôm", my: "ဖက်ခြင်း" } },
    { jp: "握", reading: "にぎる・アク", onyomi: "アク", kunyomi: "にぎ（る）", meaning: { en: "to grip", ne: "समाउनु", vi: "nắm chặt", my: "ဆုပ်ကိုင်ခြင်း" } },
    { jp: "触", reading: "さわる・ショク", onyomi: "ショク", kunyomi: "さわ（る）、ふ（れる）", meaning: { en: "to touch", ne: "छुनु", vi: "chạm vào", my: "ထိတွေ့ခြင်း" } },
    { jp: "振", reading: "ふる・シン", onyomi: "シン", kunyomi: "ふ（る）", meaning: { en: "to shake / wave", ne: "हल्लाउनु", vi: "vẫy / lắc", my: "လှုပ်ရှားခြင်း" } },
    { jp: "揺", reading: "ゆれる・ヨウ", onyomi: "ヨウ", kunyomi: "ゆ（れる）、ゆ（らす）", meaning: { en: "to sway", ne: "हल्लिनु", vi: "lung lay", my: "တုန်လှုပ်ခြင်း" } },
    { jp: "確", reading: "たしか・カク", onyomi: "カク", kunyomi: "たし（か）", meaning: { en: "certain / sure", ne: "पक्का", vi: "chắc chắn", my: "သေချာသော" } },
    { jp: "実", reading: "み・ジツ", onyomi: "ジツ", kunyomi: "み、じつ", meaning: { en: "truth / fruit", ne: "सत्य / फल", vi: "sự thật / quả thực", my: "အမှန်တရား" } },
    { jp: "批", reading: "ヒ", onyomi: "ヒ", kunyomi: "（なし）", meaning: { en: "to criticize", ne: "आलोचना गर्नु", vi: "phê bình", my: "ဝေဖန်ခြင်း" } },
    // Employment & agreements
    { jp: "就", reading: "つく・シュウ", onyomi: "シュウ", kunyomi: "つ（く）", meaning: { en: "to take a position", ne: "पद ग्रहण गर्नु", vi: "nhậm chức", my: "ရာထူးထမ်းဆောင်ခြင်း" } },
    { jp: "職", reading: "ショク", onyomi: "ショク", kunyomi: "（なし）", meaning: { en: "occupation", ne: "पेशा", vi: "nghề nghiệp", my: "အလုပ်အကိုင်" } },
    { jp: "雇", reading: "やとう・コ", onyomi: "コ", kunyomi: "やと（う）", meaning: { en: "to employ", ne: "रोजगारी दिनु", vi: "thuê (nhân viên)", my: "ငှားရမ်းခြင်း" } },
    { jp: "契", reading: "ちぎる・ケイ", onyomi: "ケイ", kunyomi: "ちぎ（る）", meaning: { en: "to pledge", ne: "प्रतिज्ञा गर्नु", vi: "cam kết", my: "ကတိပြုခြင်း" } },
    { jp: "約", reading: "ヤク", onyomi: "ヤク", kunyomi: "（なし）", meaning: { en: "promise / approximately", ne: "वाचा / लगभग", vi: "lời hứa / khoảng", my: "ကတိ/ခန့်မှန်း" } },
    { jp: "訪", reading: "おとずれる・ホウ", onyomi: "ホウ", kunyomi: "おとず（れる）、たず（ねる）", meaning: { en: "to visit", ne: "भ्रमण गर्नु", vi: "thăm viếng", my: "လည်ပတ်ခြင်း" } },
    { jp: "招", reading: "まねく・ショウ", onyomi: "ショウ", kunyomi: "まね（く）", meaning: { en: "to invite", ne: "निमन्त्रणा गर्नु", vi: "mời", my: "ဖိတ်ကြားခြင်း" } },
    // Creation & production
    { jp: "把", reading: "ハ", onyomi: "ハ", kunyomi: "（なし）", meaning: { en: "to grasp", ne: "बुझ्नु", vi: "nắm bắt", my: "နားလည်သဘောပေါက်ခြင်း" } },
    { jp: "執", reading: "とる・シツ", onyomi: "シツ、シュウ", kunyomi: "と（る）", meaning: { en: "to execute / hold", ne: "सञ्चालन गर्नु", vi: "thực thi", my: "လက်ကိုင်ထားခြင်း" } },
    { jp: "筆", reading: "ふで・ヒツ", onyomi: "ヒツ", kunyomi: "ふで", meaning: { en: "writing brush", ne: "कलम (ब्रश)", vi: "bút lông", my: "ခဲတံ" } },
    { jp: "描", reading: "えがく・ビョウ", onyomi: "ビョウ", kunyomi: "えが（く）", meaning: { en: "to draw / depict", ne: "चित्र कोर्नु", vi: "vẽ / miêu tả", my: "ပုံဖော်ခြင်း" } },
    { jp: "創", reading: "ソウ", onyomi: "ソウ", kunyomi: "（なし）", meaning: { en: "to create", ne: "सिर्जना गर्नु", vi: "sáng tạo", my: "ဖန်တီးခြင်း" } },
    { jp: "造", reading: "つくる・ゾウ", onyomi: "ゾウ", kunyomi: "つく（る）", meaning: { en: "to make / create", ne: "बनाउनु", vi: "chế tạo", my: "ထုတ်လုပ်ခြင်း" } },
    { jp: "偶", reading: "グウ", onyomi: "グウ", kunyomi: "（なし）", meaning: { en: "accidentally / even (number)", ne: "संयोगवश", vi: "ngẫu nhiên", my: "အမှတ်တမဲ့" } },
    { jp: "然", reading: "ゼン", onyomi: "ゼン、ネン", kunyomi: "（なし）", meaning: { en: "so / thus", ne: "त्यसैले", vi: "như vậy", my: "ထိုကဲ့သို့" } },
    { jp: "域", reading: "イキ", onyomi: "イキ", kunyomi: "（なし）", meaning: { en: "area / region", ne: "क्षेत्र", vi: "khu vực", my: "နယ်မြေ" } },
    { jp: "圏", reading: "ケン", onyomi: "ケン", kunyomi: "（なし）", meaning: { en: "sphere / zone", ne: "क्षेत्र (वृत्त)", vi: "vùng / khu vực", my: "ဇုန်" } },
    // Law & justice
    { jp: "訴", reading: "うったえる・ソ", onyomi: "ソ", kunyomi: "うった（える）", meaning: { en: "to sue / appeal", ne: "मुद्दा हाल्नु", vi: "kiện / kháng cáo", my: "တရားစွဲဆိုခြင်း" } },
    { jp: "訟", reading: "ショウ", onyomi: "ショウ", kunyomi: "（なし）", meaning: { en: "litigation", ne: "मुद्दा", vi: "kiện tụng", my: "တရားရင်ဆိုင်မှု" } },
    { jp: "罰", reading: "バツ", onyomi: "バツ、バチ", kunyomi: "ばっ（する）", meaning: { en: "punishment", ne: "सजाय", vi: "hình phạt", my: "ပြစ်ဒဏ်" } },
    { jp: "刑", reading: "ケイ", onyomi: "ケイ", kunyomi: "（なし）", meaning: { en: "punishment / sentence", ne: "सजाय", vi: "án phạt", my: "ပြစ်ဒဏ်စီရင်ချက်" } },
    { jp: "審", reading: "シン", onyomi: "シン", kunyomi: "（なし）", meaning: { en: "to judge / deliberate", ne: "न्याय गर्नु", vi: "xét xử / thẩm định", my: "စစ်ဆေးဆုံးဖြတ်ခြင်း" } },
    { jp: "護", reading: "ゴ", onyomi: "ゴ", kunyomi: "（なし）", meaning: { en: "to protect / defend", ne: "रक्षा गर्नु", vi: "bảo vệ", my: "ကာကွယ်ခြင်း" } },
    // Health & safety
    { jp: "保", reading: "たもつ・ホ", onyomi: "ホ", kunyomi: "たも（つ）", meaning: { en: "to protect / keep", ne: "जोगाउनु", vi: "bảo vệ / giữ", my: "ထိန်းသိမ်းခြင်း" } },
    { jp: "危", reading: "あぶない・キ", onyomi: "キ", kunyomi: "あぶ（ない）", meaning: { en: "dangerous", ne: "खतरनाक", vi: "nguy hiểm", my: "အန္တရာယ်ရှိသော" } },
    { jp: "険", reading: "けわしい・ケン", onyomi: "ケン", kunyomi: "けわ（しい）", meaning: { en: "risk / steep", ne: "जोखिम / होचो", vi: "rủi ro / hiểm trở", my: "အန္တရာယ်" } },
    { jp: "療", reading: "リョウ", onyomi: "リョウ", kunyomi: "（なし）", meaning: { en: "medical treatment", ne: "उपचार", vi: "điều trị", my: "ကုသမှု" } },
    { jp: "診", reading: "みる・シン", onyomi: "シン", kunyomi: "み（る）", meaning: { en: "to diagnose", ne: "निदान गर्नु", vi: "chẩn đoán", my: "ရောဂါလက္ခဏာစစ်ဆေးခြင်း" } },
    // Emotions
    { jp: "悩", reading: "なやむ・ノウ", onyomi: "ノウ", kunyomi: "なや（む）", meaning: { en: "to worry", ne: "चिन्ता गर्नु", vi: "lo lắng / phiền muộn", my: "စိတ်ပူခြင်း" } },
    { jp: "苦", reading: "くるしい・ク", onyomi: "ク", kunyomi: "くる（しい）、にが（い）", meaning: { en: "suffering / bitter", ne: "पीडा / तितो", vi: "đau khổ / đắng", my: "ဆင်းရဲခြင်း" } },
    { jp: "労", reading: "ロウ", onyomi: "ロウ", kunyomi: "（なし）", meaning: { en: "labor", ne: "श्रम", vi: "lao động", my: "လုပ်အား" } },
    { jp: "励", reading: "はげます・レイ", onyomi: "レイ", kunyomi: "はげ（ます）", meaning: { en: "to encourage", ne: "प्रोत्साहन गर्नु", vi: "khuyến khích", my: "အားပေးခြင်း" } },
    { jp: "奨", reading: "ショウ", onyomi: "ショウ", kunyomi: "（なし）", meaning: { en: "to encourage / praise", ne: "प्रोत्साहन गर्नु", vi: "khuyến khích / khen thưởng", my: "အားပေးအားမြှင့်ခြင်း" } },
    { jp: "悲", reading: "かなしい・ヒ", onyomi: "ヒ", kunyomi: "かな（しい）", meaning: { en: "sad", ne: "दुःखी", vi: "buồn", my: "ဝမ်းနည်းသော" } },
    { jp: "喜", reading: "よろこぶ・キ", onyomi: "キ", kunyomi: "よろこ（ぶ）", meaning: { en: "happy / joy", ne: "खुशी", vi: "vui mừng", my: "ပျော်ရွှင်ခြင်း" } },
    { jp: "怒", reading: "おこる・ド", onyomi: "ド", kunyomi: "おこ（る）、いか（る）", meaning: { en: "angry", ne: "रिसाउनु", vi: "tức giận", my: "ဒေါသထွက်ခြင်း" } },
    { jp: "恐", reading: "おそれる・キョウ", onyomi: "キョウ", kunyomi: "おそ（れる）", meaning: { en: "fear", ne: "डर", vi: "sợ hãi", my: "ကြောက်ရွံ့ခြင်း" } },
    { jp: "怖", reading: "こわい・フ", onyomi: "フ", kunyomi: "こわ（い）", meaning: { en: "scary", ne: "डरलाग्दो", vi: "đáng sợ", my: "ကြောက်စရာကောင်းသော" } },
    // Publishing & physics
    { jp: "版", reading: "ハン", onyomi: "ハン", kunyomi: "（なし）", meaning: { en: "edition / printing", ne: "संस्करण", vi: "phiên bản / bản in", my: "ပုံနှိပ်ခြင်း" } },
    { jp: "編", reading: "あむ・ヘン", onyomi: "ヘン", kunyomi: "あ（む）", meaning: { en: "to compile / edit", ne: "सम्पादन गर्नु", vi: "biên tập", my: "စုစည်းတည်းဖြတ်ခြင်း" } },
    { jp: "刊", reading: "カン", onyomi: "カン", kunyomi: "（なし）", meaning: { en: "publication", ne: "प्रकाशन", vi: "sự xuất bản", my: "ထုတ်ဝေခြင်း" } },
    { jp: "誌", reading: "シ", onyomi: "シ", kunyomi: "（なし）", meaning: { en: "magazine", ne: "पत्रिका", vi: "tạp chí", my: "မဂ္ဂဇင်း" } },
    { jp: "波", reading: "なみ・ハ", onyomi: "ハ", kunyomi: "なみ", meaning: { en: "wave", ne: "छाल", vi: "sóng", my: "လှိုင်း" } },
    { jp: "圧", reading: "アツ", onyomi: "アツ", kunyomi: "（なし）", meaning: { en: "pressure", ne: "दबाब", vi: "áp lực", my: "ဖိအား" } },
    { jp: "抗", reading: "コウ", onyomi: "コウ", kunyomi: "（なし）", meaning: { en: "to resist", ne: "प्रतिरोध गर्नु", vi: "kháng cự", my: "တွန်းလှန်ခြင်း" } },
    { jp: "抵", reading: "テイ", onyomi: "テイ", kunyomi: "（なし）", meaning: { en: "to resist", ne: "प्रतिरोध गर्नु", vi: "chống lại", my: "ခုခံခြင်း" } },
    { jp: "磁", reading: "ジ", onyomi: "ジ", kunyomi: "（なし）", meaning: { en: "magnetism", ne: "चुम्बकत्व", vi: "từ tính", my: "သံလိုက်" } },
  ],
  N1: [
    { jp: "義", reading: "ギ", onyomi: "ギ", kunyomi: "（なし）", meaning: { en: "justice / duty", ne: "न्याय", vi: "nghĩa", my: "တရားမျှတမှု" } },
    { jp: "曖", reading: "アイ", onyomi: "アイ", kunyomi: "（なし）", meaning: { en: "vague", ne: "अस्पष्ट", vi: "mơ hồ", my: "မရေရာသော" } },
    { jp: "昧", reading: "マイ", onyomi: "マイ", kunyomi: "（なし）", meaning: { en: "dim / obscure", ne: "धमिलो", vi: "tối tăm", my: "မှုန်ဝါးသော" } },
    { jp: "逆", reading: "ギャク", onyomi: "ギャク", kunyomi: "さか、さからう", meaning: { en: "reverse", ne: "उल्टो", vi: "ngược", my: "ပြောင်းပြန်" } },
    { jp: "越", reading: "エツ", onyomi: "エツ", kunyomi: "こえる、こす", meaning: { en: "to exceed", ne: "नाघ्नु", vi: "vượt", my: "ကျော်လွန်" } },
    { jp: "裁", reading: "サイ", onyomi: "サイ", kunyomi: "さばく、たつ", meaning: { en: "to judge", ne: "फैसला गर्नु", vi: "phán xét", my: "စီရင်ဆုံးဖြတ်" } },
    // Abstract thought
    { jp: "普", reading: "フ", onyomi: "フ", kunyomi: "（なし）", meaning: { en: "universal / general", ne: "विश्वव्यापी", vi: "phổ biến", my: "အနှံ့အပြားကျယ်ပြန့်သော" } },
    { jp: "遍", reading: "ヘン", onyomi: "ヘン", kunyomi: "（なし）", meaning: { en: "to pervade / everywhere", ne: "सर्वव्यापी", vi: "khắp nơi", my: "ဟုန်ဟုန်ကျယ်ပြန့်သော" } },
    { jp: "概", reading: "ガイ", onyomi: "ガイ", kunyomi: "（なし）", meaning: { en: "general outline", ne: "सामान्य रूपरेखा", vi: "khái quát", my: "အကျဉ်းချုပ်" } },
    { jp: "念", reading: "ネン", onyomi: "ネン", kunyomi: "（なし）", meaning: { en: "thought / sense", ne: "विचार", vi: "khái niệm / cảm giác", my: "အယူအဆ" } },
    { jp: "抽", reading: "チュウ", onyomi: "チュウ", kunyomi: "（なし）", meaning: { en: "to extract", ne: "निकाल्नु", vi: "trích xuất", my: "ထုတ်ယူခြင်း" } },
    { jp: "弁", reading: "ベン", onyomi: "ベン", kunyomi: "（なし）", meaning: { en: "speech / to discern", ne: "बोली / छुट्याउनु", vi: "biện luận / phân biệt", my: "ခွဲခြားနိုင်မှု" } },
    { jp: "論", reading: "ロン", onyomi: "ロン", kunyomi: "（なし）", meaning: { en: "theory / argument", ne: "सिद्धान्त / तर्क", vi: "lý luận", my: "သီအိုရီ" } },
    { jp: "議", reading: "ギ", onyomi: "ギ", kunyomi: "（なし）", meaning: { en: "discussion / deliberation", ne: "छलफल", vi: "thảo luận", my: "ဆွေးနွေးမှု" } },
    { jp: "仮", reading: "かり・カ", onyomi: "カ、ケ", kunyomi: "かり", meaning: { en: "temporary / assumption", ne: "अस्थायी / परिकल्पना", vi: "tạm thời / giả định", my: "ယာယီ" } },
    { jp: "設", reading: "もうける・セツ", onyomi: "セツ", kunyomi: "もう（ける）", meaning: { en: "to establish", ne: "स्थापना गर्नु", vi: "thiết lập", my: "တည်ထောင်ခြင်း" } },
    { jp: "疑", reading: "うたがう・ギ", onyomi: "ギ", kunyomi: "うたが（う）", meaning: { en: "to doubt", ne: "शंका गर्नु", vi: "nghi ngờ", my: "သံသယဖြစ်ခြင်း" } },
    { jp: "惑", reading: "まどう・ワク", onyomi: "ワク", kunyomi: "まど（う）", meaning: { en: "to perplex / bewilder", ne: "अलमल्याउनु", vi: "làm bối rối", my: "သောင်းနင်းဖြစ်စေခြင်း" } },
    { jp: "慮", reading: "リョ", onyomi: "リョ", kunyomi: "（なし）", meaning: { en: "to consider", ne: "विचार गर्नु", vi: "cân nhắc", my: "ထည့်သွင်းစဉ်းစားခြင်း" } },
    { jp: "察", reading: "サツ", onyomi: "サツ", kunyomi: "（なし）", meaning: { en: "to guess / observe", ne: "अनुमान गर्नु", vi: "suy đoán / quan sát", my: "ခန့်မှန်းခြင်း" } },
    { jp: "洞", reading: "ドウ", onyomi: "ドウ", kunyomi: "ほら", meaning: { en: "cave / insight", ne: "गुफा / अन्तर्दृष्टि", vi: "hang động / sự thấu hiểu", my: "ဂူ/ထိုးထွင်းသိမြင်မှု" } },
    // Texture & nuance
    { jp: "朴", reading: "ボク", onyomi: "ボク", kunyomi: "（なし）", meaning: { en: "simple / plain", ne: "सरल", vi: "mộc mạc", my: "ရိုးရှင်းသော" } },
    { jp: "素", reading: "ソ", onyomi: "ソ、ス", kunyomi: "（なし）", meaning: { en: "element / plain", ne: "तत्व / सादा", vi: "yếu tố / mộc mạc", my: "ဒြပ်စင်" } },
    { jp: "純", reading: "ジュン", onyomi: "ジュン", kunyomi: "（なし）", meaning: { en: "pure", ne: "शुद्ध", vi: "thuần khiết", my: "စင်ကြယ်သော" } },
    { jp: "粋", reading: "スイ", onyomi: "スイ", kunyomi: "いき", meaning: { en: "essence / stylish", ne: "सार / स्टाइलिश", vi: "tinh túy / phong cách", my: "အနှစ်သာရ" } },
    { jp: "繊", reading: "セン", onyomi: "セン", kunyomi: "（なし）", meaning: { en: "fiber / delicate", ne: "रेशा / नाजुक", vi: "sợi / tinh tế", my: "အမျှင်" } },
    { jp: "細", reading: "こまかい・サイ", onyomi: "サイ", kunyomi: "こま（かい）、ほそ（い）", meaning: { en: "detailed / thin", ne: "विस्तृत / पातलो", vi: "chi tiết / mỏng", my: "အသေးစိတ်" } },
    { jp: "微", reading: "ビ", onyomi: "ビ", kunyomi: "（なし）", meaning: { en: "minute / subtle", ne: "सूक्ष्म", vi: "vi tế / tinh vi", my: "သိမ်မွေ့သော" } },
    { jp: "妙", reading: "ミョウ", onyomi: "ミョウ", kunyomi: "（なし）", meaning: { en: "strange / exquisite", ne: "अनौठो / उत्कृष्ट", vi: "kỳ diệu / tinh xảo", my: "ထူးဆန်းသော" } },
    { jp: "奇", reading: "キ", onyomi: "キ", kunyomi: "（なし）", meaning: { en: "strange / odd", ne: "अनौठो", vi: "kỳ lạ", my: "ထူးဆန်းသော" } },
    { jp: "異", reading: "ことなる・イ", onyomi: "イ", kunyomi: "こと（なる）", meaning: { en: "different / strange", ne: "फरक / अनौठो", vi: "khác biệt / kỳ lạ", my: "ကွဲပြားသော" } },
    // Structure & synthesis
    { jp: "併", reading: "あわせる・ヘイ", onyomi: "ヘイ", kunyomi: "あわ（せる）", meaning: { en: "to combine", ne: "मिलाउनु", vi: "kết hợp", my: "ပေါင်းစပ်ခြင်း" } },
    { jp: "統", reading: "トウ", onyomi: "トウ", kunyomi: "（なし）", meaning: { en: "to unify / govern", ne: "एकीकृत गर्नु", vi: "thống nhất", my: "စည်းလုံးအောင်ပြုလုပ်ခြင်း" } },
    { jp: "系", reading: "ケイ", onyomi: "ケイ", kunyomi: "（なし）", meaning: { en: "system / lineage", ne: "प्रणाली / वंश", vi: "hệ thống / dòng dõi", my: "စနစ်" } },
    { jp: "含", reading: "ふくむ・ガン", onyomi: "ガン", kunyomi: "ふく（む）", meaning: { en: "to include", ne: "समावेश गर्नु", vi: "bao gồm", my: "ပါဝင်ခြင်း" } },
    { jp: "包", reading: "つつむ・ホウ", onyomi: "ホウ", kunyomi: "つつ（む）", meaning: { en: "to wrap / include", ne: "बेर्नु", vi: "gói / bao gồm", my: "ထုပ်ပိုးခြင်း" } },
    { jp: "網", reading: "あみ・モウ", onyomi: "モウ", kunyomi: "あみ", meaning: { en: "net", ne: "जाल", vi: "lưới", my: "ကွန်ရက်" } },
    { jp: "羅", reading: "ラ", onyomi: "ラ", kunyomi: "（なし）", meaning: { en: "to arrange / net (comprehensive)", ne: "व्यवस्थित गर्नु", vi: "sắp xếp / bao quát", my: "ခြုံငုံသည်" } },
    { jp: "陥", reading: "おちいる・カン", onyomi: "カン", kunyomi: "おちい（る）", meaning: { en: "to fall into", ne: "पर्नु (जालमा)", vi: "rơi vào", my: "ကျရောက်ခြင်း" } },
    { jp: "致", reading: "いたす・チ", onyomi: "チ", kunyomi: "いた（す）", meaning: { en: "to cause / send", ne: "निम्त्याउनु", vi: "gây ra / gửi đến", my: "ဖြစ်ပေါ်စေခြင်း" } },
    { jp: "遂", reading: "とげる・スイ", onyomi: "スイ", kunyomi: "と（げる）", meaning: { en: "to carry out / accomplish", ne: "पूरा गर्नु", vi: "hoàn thành", my: "အောင်မြင်စွာဆောင်ရွက်ခြင်း" } },
    { jp: "盤", reading: "バン", onyomi: "バン", kunyomi: "（なし）", meaning: { en: "board / plate", ne: "बोर्ड / थाल", vi: "bàn / đĩa", my: "ပြားပြား" } },
    { jp: "礎", reading: "いしずえ・ソ", onyomi: "ソ", kunyomi: "いしずえ", meaning: { en: "foundation stone", ne: "जग", vi: "nền móng", my: "အုတ်မြစ်" } },
    { jp: "軸", reading: "ジク", onyomi: "ジク", kunyomi: "（なし）", meaning: { en: "axis", ne: "धुरी", vi: "trục", my: "ဝင်ရိုး" } },
    // Aesthetics
    { jp: "彩", reading: "いろどる・サイ", onyomi: "サイ", kunyomi: "いろど（る）", meaning: { en: "color / tint", ne: "रंग", vi: "màu sắc / sắc thái", my: "အရောင်တင်ခြင်း" } },
    { jp: "華", reading: "はな・カ", onyomi: "カ", kunyomi: "はな", meaning: { en: "flower / splendor", ne: "वैभव", vi: "sự lộng lẫy", my: "တောက်ပမှု" } },
    { jp: "美", reading: "うつくしい・ビ", onyomi: "ビ", kunyomi: "うつく（しい）", meaning: { en: "beautiful", ne: "सुन्दर", vi: "đẹp", my: "လှပသော" } },
    { jp: "醜", reading: "みにくい・シュウ", onyomi: "シュウ", kunyomi: "みにく（い）", meaning: { en: "ugly", ne: "कुरूप", vi: "xấu xí", my: "ရုပ်ဆိုးသော" } },
    { jp: "濃", reading: "こい・ノウ", onyomi: "ノウ", kunyomi: "こ（い）", meaning: { en: "thick / dark (color)", ne: "गाढा", vi: "đậm đặc", my: "ပြင်းထန်သော" } },
    { jp: "淡", reading: "あわい・タン", onyomi: "タン", kunyomi: "あわ（い）", meaning: { en: "light / faint", ne: "फिका", vi: "nhạt", my: "ဖျော့သော" } },
    { jp: "薄", reading: "うすい・ハク", onyomi: "ハク", kunyomi: "うす（い）", meaning: { en: "thin", ne: "पातलो", vi: "mỏng", my: "ပါးလွှာသော" } },
    // Skill & cultivation
    { jp: "巧", reading: "たくみ・コウ", onyomi: "コウ", kunyomi: "たく（み）", meaning: { en: "skillful", ne: "दक्ष", vi: "khéo léo", my: "ကျွမ်းကျင်သော" } },
    { jp: "拙", reading: "つたない・セツ", onyomi: "セツ", kunyomi: "つたな（い）", meaning: { en: "clumsy", ne: "अल्छी / अकुशल", vi: "vụng về", my: "ကျွမ်းကျင်မှုမရှိသော" } },
    { jp: "熟", reading: "うれる・ジュク", onyomi: "ジュク", kunyomi: "う（れる）", meaning: { en: "to ripen / mature", ne: "पाक्नु", vi: "chín muồi", my: "ရင့်ကျက်ခြင်း" } },
    { jp: "練", reading: "ねる・レン", onyomi: "レン", kunyomi: "ね（る）", meaning: { en: "to knead / train", ne: "अभ्यास गर्नु", vi: "luyện tập", my: "လေ့ကျင့်ခြင်း" } },
    { jp: "磨", reading: "みがく・マ", onyomi: "マ", kunyomi: "みが（く）", meaning: { en: "to polish", ne: "टल्काउनु", vi: "đánh bóng", my: "ချောမွေ့အောင်ပြုလုပ်ခြင်း" } },
    { jp: "鍛", reading: "きたえる・タン", onyomi: "タン", kunyomi: "きた（える）", meaning: { en: "to forge / train", ne: "प्रशिक्षण दिनु", vi: "rèn luyện", my: "သံမီးဖုတ်ခြင်း" } },
    { jp: "培", reading: "つちかう・バイ", onyomi: "バイ", kunyomi: "つちか（う）", meaning: { en: "to cultivate", ne: "विकास गर्नु", vi: "vun trồng", my: "ပျိုးထောင်ခြင်း" } },
    { jp: "養", reading: "やしなう・ヨウ", onyomi: "ヨウ", kunyomi: "やしな（う）", meaning: { en: "to nurture", ne: "पोषण गर्नु", vi: "nuôi dưỡng", my: "ပြုစုပျိုးထောင်ခြင်း" } },
    { jp: "栄", reading: "さかえる・エイ", onyomi: "エイ", kunyomi: "さか（える）", meaning: { en: "to prosper", ne: "फस्टाउनु", vi: "thịnh vượng", my: "ကြီးပွားခြင်း" } },
    { jp: "枯", reading: "かれる・コ", onyomi: "コ", kunyomi: "か（れる）", meaning: { en: "to wither", ne: "ओइलाउनु", vi: "héo úa", my: "ညှိုးနွမ်းခြင်း" } },
    // Existence & involvement
    { jp: "悠", reading: "ユウ", onyomi: "ユウ", kunyomi: "（なし）", meaning: { en: "leisurely / distant", ne: "फुर्सदिलो", vi: "thong thả / xa xăm", my: "အေးဆေးသော" } },
    { jp: "潜", reading: "ひそむ・セン", onyomi: "セン", kunyomi: "ひそ（む）、もぐ（る）", meaning: { en: "to hide / lurk / dive", ne: "लुक्नु / डुब्नु", vi: "ẩn nấp / lặn", my: "ပုန်းအောင်းခြင်း" } },
    { jp: "在", reading: "ある・ザイ", onyomi: "ザイ", kunyomi: "あ（る）", meaning: { en: "to exist", ne: "अवस्थित हुनु", vi: "tồn tại (ở đâu)", my: "တည်ရှိခြင်း" } },
    { jp: "存", reading: "ソン", onyomi: "ソン、ゾン", kunyomi: "（なし）", meaning: { en: "to exist", ne: "अस्तित्वमा हुनु", vi: "tồn tại", my: "တည်ရှိခြင်း" } },
    { jp: "伴", reading: "ともなう・ハン", onyomi: "ハン", kunyomi: "ともな（う）", meaning: { en: "to accompany", ne: "साथ दिनु", vi: "đi kèm", my: "လိုက်ပါခြင်း" } },
    { jp: "携", reading: "たずさわる・ケイ", onyomi: "ケイ", kunyomi: "たずさ（わる）", meaning: { en: "to engage in / carry", ne: "बोक्नु / संलग्न हुनु", vi: "mang theo / tham gia", my: "ပါဝင်ဆောင်ရွက်ခြင်း" } },
    { jp: "帯", reading: "おび・タイ", onyomi: "タイ", kunyomi: "おび", meaning: { en: "belt / zone", ne: "पेटी / क्षेत्र", vi: "vành đai / khu vực", my: "ခါးပတ်/ဇုန်" } },
    { jp: "妥", reading: "ダ", onyomi: "ダ", kunyomi: "（なし）", meaning: { en: "valid / proper", ne: "उपयुक्त", vi: "thỏa đáng", my: "သင့်လျော်သော" } },
    // Philosophy & spirit
    { jp: "発", reading: "ハツ", onyomi: "ハツ、ホツ", kunyomi: "（なし）", meaning: { en: "to emit / departure", ne: "उत्सर्जन गर्नु / प्रस्थान", vi: "phát ra / khởi hành", my: "ထုတ်လွှတ်ခြင်း" } },
    { jp: "悟", reading: "さとる・ゴ", onyomi: "ゴ", kunyomi: "さと（る）", meaning: { en: "to realize / enlighten", ne: "बुझ्नु / ज्ञान प्राप्त गर्नु", vi: "nhận ra / giác ngộ", my: "သိမြင်ခြင်း" } },
    { jp: "啓", reading: "ケイ", onyomi: "ケイ", kunyomi: "（なし）", meaning: { en: "to enlighten", ne: "ज्ञान दिनु", vi: "khai sáng", my: "အသိပညာဖွင့်ပေးခြင်း" } },
    { jp: "魂", reading: "たましい・コン", onyomi: "コン", kunyomi: "たましい", meaning: { en: "soul", ne: "आत्मा", vi: "linh hồn", my: "ဝိညာဉ်" } },
    { jp: "霊", reading: "レイ", onyomi: "レイ", kunyomi: "（なし）", meaning: { en: "spirit", ne: "आत्मा (भूत)", vi: "linh hồn / thần linh", my: "နတ်ဝိညာဉ်" } },
    { jp: "神", reading: "かみ・シン", onyomi: "シン", kunyomi: "かみ", meaning: { en: "god / spirit", ne: "देवता", vi: "thần / thượng đế", my: "ဘုရားသခင်" } },
    { jp: "仏", reading: "ほとけ・ブツ", onyomi: "ブツ", kunyomi: "ほとけ", meaning: { en: "Buddha", ne: "बुद्ध", vi: "Phật", my: "ဗုဒ္ဓ" } },
    { jp: "宗", reading: "シュウ", onyomi: "シュウ、ソウ", kunyomi: "（なし）", meaning: { en: "religion", ne: "धर्म", vi: "tôn giáo", my: "ဘာသာရေး" } },
    { jp: "哲", reading: "テツ", onyomi: "テツ", kunyomi: "（なし）", meaning: { en: "philosophy", ne: "दर्शनशास्त्र", vi: "triết học", my: "အတွေးအခေါ်ပညာ" } },
    { jp: "倫", reading: "リン", onyomi: "リン", kunyomi: "（なし）", meaning: { en: "ethics", ne: "नैतिकता", vi: "đạo đức", my: "ကျင့်ဝတ်" } },
    // Truth & virtue
    { jp: "虚", reading: "むなしい・キョ", onyomi: "キョ", kunyomi: "むな（しい）", meaning: { en: "empty / false", ne: "खाली / झूटो", vi: "trống rỗng / giả dối", my: "အနှစ်သာရမဲ့သော" } },
    { jp: "偽", reading: "いつわる・ギ", onyomi: "ギ", kunyomi: "いつわ（る）", meaning: { en: "false", ne: "नक्कली", vi: "giả", my: "အတု" } },
    { jp: "真", reading: "ま・シン", onyomi: "シン", kunyomi: "ま", meaning: { en: "truth", ne: "सत्य", vi: "sự thật", my: "အမှန်တရား" } },
    { jp: "善", reading: "よい・ゼン", onyomi: "ゼン", kunyomi: "よ（い）", meaning: { en: "good", ne: "असल", vi: "tốt lành", my: "ကောင်းမြတ်သော" } },
    { jp: "徳", reading: "トク", onyomi: "トク", kunyomi: "（なし）", meaning: { en: "virtue", ne: "सद्गुण", vi: "đức hạnh", my: "ဂုဏ်သိက္ခာ" } },
    { jp: "戒", reading: "いましめる・カイ", onyomi: "カイ", kunyomi: "いまし（める）", meaning: { en: "to warn / commandment", ne: "चेतावनी दिनु", vi: "răn dạy / giới luật", my: "သတိပေးခြင်း" } },
    { jp: "悔", reading: "くいる・カイ", onyomi: "カイ", kunyomi: "く（いる）", meaning: { en: "to regret", ne: "पछुताउनु", vi: "hối hận", my: "နောင်တရခြင်း" } },
    { jp: "恨", reading: "うらむ・コン", onyomi: "コン", kunyomi: "うら（む）", meaning: { en: "to resent", ne: "मनमा राख्नु (रिस)", vi: "oán hận", my: "မုန်းတီးခြင်း" } },
    { jp: "憎", reading: "にくむ・ゾウ", onyomi: "ゾウ", kunyomi: "にく（む）", meaning: { en: "to hate", ne: "घृणा गर्नु", vi: "căm ghét", my: "မုန်းတီးခြင်း" } },
    // Cosmology & science
    { jp: "宇", reading: "ウ", onyomi: "ウ", kunyomi: "（なし）", meaning: { en: "universe", ne: "ब्रह्माण्ड", vi: "vũ trụ", my: "စကြာဝဠာ" } },
    { jp: "宙", reading: "チュウ", onyomi: "チュウ", kunyomi: "（なし）", meaning: { en: "space", ne: "अन्तरिक्ष", vi: "không gian", my: "အာကာသ" } },
    { jp: "星", reading: "ほし・セイ", onyomi: "セイ", kunyomi: "ほし", meaning: { en: "star", ne: "तारा", vi: "ngôi sao", my: "ကြယ်" } },
    { jp: "粒", reading: "つぶ・リュウ", onyomi: "リュウ", kunyomi: "つぶ", meaning: { en: "grain / particle", ne: "दाना / कण", vi: "hạt", my: "အမှုန်" } },
    { jp: "核", reading: "カク", onyomi: "カク", kunyomi: "（なし）", meaning: { en: "nucleus", ne: "केन्द्रक", vi: "hạt nhân", my: "အနှစ်သာရ" } },
    { jp: "胞", reading: "ホウ", onyomi: "ホウ", kunyomi: "（なし）", meaning: { en: "cell membrane", ne: "कोशिका झिल्ली", vi: "màng tế bào", my: "ဆဲလ်အခွံ" } },
    { jp: "菌", reading: "キン", onyomi: "キン", kunyomi: "（なし）", meaning: { en: "bacteria", ne: "जीवाणु", vi: "vi khuẩn", my: "ဘက်တီးရီးယား" } },
    { jp: "毒", reading: "ドク", onyomi: "ドク", kunyomi: "（なし）", meaning: { en: "poison", ne: "विष", vi: "chất độc", my: "အဆိပ်" } },
    // Purity
    { jp: "潔", reading: "いさぎよい・ケツ", onyomi: "ケツ", kunyomi: "いさぎよ（い）", meaning: { en: "pure / clean", ne: "शुद्ध", vi: "trong sạch", my: "စင်ကြယ်သော" } },
    { jp: "清", reading: "きよい・セイ", onyomi: "セイ", kunyomi: "きよ（い）", meaning: { en: "clean / pure", ne: "सफा", vi: "trong sạch", my: "သန့်ရှင်းသော" } },
    { jp: "濁", reading: "にごる・ダク", onyomi: "ダク", kunyomi: "にご（る）", meaning: { en: "muddy", ne: "धमिलो", vi: "đục", my: "ရေဒုန်းသော" } },
  ],
};

// Conversation dialogues per level. Each line: speaker, jp, reading, meaning{en,ne,vi,my}
const CONVERSATIONS = {
  N5: [
    { title: { en: "At a shop", ne: "पसलमा", vi: "Ở cửa hàng", my: "ဆိုင်တွင်" },
    lines: [
      { speaker: "A", jp: "すみません、これはいくらですか。", reading: "すみません、これはいくらですか。",
        meaning: { en: "Excuse me, how much is this?", ne: "माफ गर्नुहोस्, यो कति हो?", vi: "Xin lỗi, cái này bao nhiêu tiền?", my: "ဆောရီးနော်၊ ဒါဘယ်လောက်လဲ။" } },
      { speaker: "B", jp: "それは五百円です。", reading: "それはごひゃくえんです。",
        meaning: { en: "That is 500 yen.", ne: "त्यो पाँच सय येन हो।", vi: "Cái đó 500 yên.", my: "အဲဒါ ယန်း ၅၀၀ ဖြစ်ပါတယ်။" } },
      { speaker: "A", jp: "じゃ、これをください。", reading: "じゃ、これをください。",
        meaning: { en: "Then, this one please.", ne: "त्यसो भए, यो नै दिनुहोस्।", vi: "Vậy cho tôi cái này.", my: "ဒါဆို ဒါကိုပေးပါ။" } },
      { speaker: "B", jp: "ありがとうございます。", reading: "ありがとうございます。",
        meaning: { en: "Thank you very much.", ne: "धेरै धन्यवाद।", vi: "Cảm ơn nhiều.", my: "ကျေးဇူးအများကြီးတင်ပါတယ်။" } },
    ] },
    { title: { en: "At a restaurant", ne: "रेस्टुरेन्टमा", vi: "Tại nhà hàng", my: "စားသောက်ဆိုင်တွင်" },
    lines: [
      { speaker: "A", jp: "いらっしゃいませ。何名様ですか。", reading: "いらっしゃいませ。なんめいさまですか。",
        meaning: { en: "Welcome. How many people?", ne: "स्वागत छ। कति जना हुनुहुन्छ?", vi: "Xin chào. Quý khách có mấy người ạ?", my: "ကြိုဆိုပါတယ်။ ဘယ်နှစ်ယောက်ရှိပါသလဲ။" } },
      { speaker: "B", jp: "二人です。", reading: "ふたりです。",
        meaning: { en: "Two people.", ne: "दुई जना।", vi: "Hai người.", my: "နှစ်ယောက်ပါ။" } },
      { speaker: "A", jp: "こちらへどうぞ。ご注文はお決まりですか。", reading: "こちらへどうぞ。ごちゅうもんはおきまりですか。",
        meaning: { en: "This way please. Have you decided on your order?", ne: "यता आउनुहोस्। अर्डर तय भयो?", vi: "Mời quý khách lối này. Quý khách đã chọn món chưa ạ?", my: "ဒီဘက်ကနေ ကြွပါ။ မှာယူမယ့်ပစ္စည်း ဆုံးဖြတ်ပြီးပါပြီလား။" } },
      { speaker: "B", jp: "すみません、まだです。少し待ってください。", reading: "すみません、まだです。すこしまってください。",
        meaning: { en: "Sorry, not yet. Please wait a moment.", ne: "माफ गर्नुहोस्, अझै भएको छैन। अलि पर्खनुहोस्।", vi: "Xin lỗi, chưa ạ. Xin chờ một chút.", my: "ဆောရီးနော်၊ မဆုံးဖြတ်ရသေးပါ။ ခဏစောင့်ပေးပါ။" } },
    ] },
  ],
  N4: [
    { title: { en: "Weekend plans", ne: "सप्ताहन्तको योजना", vi: "Kế hoạch cuối tuần", my: "စနေတနင်္ဂနွေ အစီအစဉ်" },
    lines: [
      { speaker: "A", jp: "週末は何をしますか。", reading: "しゅうまつはなにをしますか。",
        meaning: { en: "What will you do this weekend?", ne: "सप्ताहन्तमा के गर्नुहुन्छ?", vi: "Cuối tuần bạn sẽ làm gì?", my: "စနေတနင်္ဂနွေမှာ ဘာလုပ်မလဲ။" } },
      { speaker: "B", jp: "友達と映画を見に行きます。", reading: "ともだちとえいがをみにいきます。",
        meaning: { en: "I'll go watch a movie with a friend.", ne: "साथीसँग चलचित्र हेर्न जान्छु।", vi: "Tôi sẽ đi xem phim với bạn.", my: "သူငယ်ချင်းနဲ့ ရုပ်ရှင်ကြည့်သွားမယ်။" } },
      { speaker: "A", jp: "いいですね。何の映画ですか。", reading: "いいですね。なんのえいがですか。",
        meaning: { en: "Nice! What movie is it?", ne: "राम्रो! कस्तो चलचित्र हो?", vi: "Hay đấy! Phim gì vậy?", my: "ကောင်းတယ်နော်။ ဘယ်ရုပ်ရှင်လဲ။" } },
      { speaker: "B", jp: "新しいアニメ映画です。", reading: "あたらしいアニメえいがです。",
        meaning: { en: "It's a new animated movie.", ne: "यो नयाँ एनिमे चलचित्र हो।", vi: "Đó là phim hoạt hình mới.", my: "ဒါက ကာတွန်းရုပ်ရှင်အသစ်ပါ။" } },
    ] },
    { title: { en: "Making plans by phone", ne: "फोनमा योजना बनाउँदा", vi: "Lên kế hoạch qua điện thoại", my: "ဖုန်းဖြင့်အစီအစဉ်ချမှတ်ခြင်း" },
    lines: [
      { speaker: "A", jp: "もしもし、今度の日曜日、暇ですか。", reading: "もしもし、こんどのにちようび、ひまですか。",
        meaning: { en: "Hello, are you free this coming Sunday?", ne: "हेलो, यो आइतबार फुर्सद छ?", vi: "A lô, Chủ nhật tới bạn có rảnh không?", my: "ဟလို၊ လာမည့်တနင်္ဂနွေနေ့ အားလား။" } },
      { speaker: "B", jp: "はい、暇です。何かありますか。", reading: "はい、ひまです。なにかありますか。",
        meaning: { en: "Yes, I'm free. Is something up?", ne: "हो, फुर्सद छ। केही छ?", vi: "Vâng, tôi rảnh. Có chuyện gì vậy?", my: "ဟုတ်ကဲ့၊ အားပါတယ်။ ဘာရှိလို့လဲ။" } },
      { speaker: "A", jp: "一緒に買い物に行きませんか。", reading: "いっしょにかいものにいきませんか。",
        meaning: { en: "Won't you go shopping together?", ne: "सँगै किनमेल गर्न जाने?", vi: "Bạn có muốn cùng đi mua sắm không?", my: "အတူတကွ ဈေးဝယ်ထွက်ကြမလား။" } },
      { speaker: "B", jp: "いいですね。何時に会いましょうか。", reading: "いいですね。なんじにあいましょうか。",
        meaning: { en: "Sounds good. What time shall we meet?", ne: "राम्रो। कति बजे भेट्ने?", vi: "Hay đấy. Mấy giờ mình gặp nhau nhé?", my: "ကောင်းတယ်နော်။ ဘယ်နှစ်နာရီတွေ့ကြမလဲ။" } },
    ] },
  ],
  N3: [
    { title: { en: "Talking about work", ne: "कामको बारेमा कुरा", vi: "Nói về công việc", my: "အလုပ်အကြောင်းစကားပြော" },
    lines: [
      { speaker: "A", jp: "最近仕事はどうですか。", reading: "さいきんしごとはどうですか。",
        meaning: { en: "How's work been lately?", ne: "आजकल काम कस्तो छ?", vi: "Dạo này công việc thế nào?", my: "မကြာသေးမီက အလုပ်ကဘယ်လိုလဲ။" } },
      { speaker: "B", jp: "ちょっと忙しいですが、頑張っています。", reading: "ちょっといそがしいですが、がんばっています。",
        meaning: { en: "A bit busy, but I'm doing my best.", ne: "अलि व्यस्त छु, तर मेहनत गरिरहेको छु।", vi: "Hơi bận nhưng tôi đang cố gắng.", my: "နည်းနည်းအလုပ်များပေမယ့် ကြိုးစားနေပါတယ်။" } },
      { speaker: "A", jp: "無理しないでくださいね。", reading: "むりしないでくださいね。",
        meaning: { en: "Please don't overdo it.", ne: "आफूलाई अति नथकाउनुहोस्।", vi: "Đừng cố quá sức nhé.", my: "အလုပ်ကို အလွန်အကျွံ မလုပ်ပါနဲ့နော်။" } },
      { speaker: "B", jp: "ありがとうございます。", reading: "ありがとうございます。",
        meaning: { en: "Thank you.", ne: "धन्यवाद।", vi: "Cảm ơn bạn.", my: "ကျေးဇူးတင်ပါတယ်။" } },
    ] },
    { title: { en: "Talking about exercise", ne: "व्यायामको बारेमा कुरा", vi: "Nói về việc tập thể dục", my: "လေ့ကျင့်ခန်းအကြောင်းစကားပြော" },
    lines: [
      { speaker: "A", jp: "最近、運動していますか。", reading: "さいきん、うんどうしていますか。",
        meaning: { en: "Have you been exercising lately?", ne: "आजकल व्यायाम गर्दै हुनुहुन्छ?", vi: "Dạo này bạn có tập thể dục không?", my: "မကြာသေးမီက လေ့ကျင့်ခန်းလုပ်နေလား။" } },
      { speaker: "B", jp: "いいえ、忙しくてなかなか時間が取れません。", reading: "いいえ、いそがしくてなかなかじかんがとれません。",
        meaning: { en: "No, I'm busy and can't find the time.", ne: "छैन, व्यस्त भएर समय निकाल्न सकिरहेको छैन।", vi: "Không, tôi bận nên không có thời gian.", my: "မလုပ်ဘူး၊ အလုပ်များလို့ အချိန်ရှာမရဘူး။" } },
      { speaker: "A", jp: "少しずつでも続けたほうがいいですよ。", reading: "すこしずつでもつづけたほうがいいですよ。",
        meaning: { en: "It's better to keep it up little by little.", ne: "थोरै थोरै भए पनि जारी राख्नु राम्रो हो।", vi: "Dù ít cũng nên duy trì đều đặn thì tốt hơn.", my: "နည်းနည်းချင်းဆိုတောင် ဆက်လုပ်တာ ကောင်းပါတယ်။" } },
      { speaker: "B", jp: "そうですね、今度から気をつけます。", reading: "そうですね、こんどからきをつけます。",
        meaning: { en: "You're right, I'll be careful from now on.", ne: "ठीक हो, अब सावधान हुनेछु।", vi: "Đúng vậy, từ giờ tôi sẽ chú ý hơn.", my: "ဟုတ်တယ်နော်၊ နောက်တစ်ခါကနေ သတိထားပါ့မယ်။" } },
    ] },
  ],
  N2: [
    { title: { en: "Discussing the environment", ne: "वातावरणको बारेमा", vi: "Bàn về môi trường", my: "သဘာဝပတ်ဝန်းကျင်အကြောင်း" },
    lines: [
      { speaker: "A", jp: "最近、環境問題についてどう思いますか。", reading: "さいきん、かんきょうもんだいについてどうおもいますか。",
        meaning: { en: "What do you think about environmental issues lately?", ne: "आजकल वातावरणीय समस्याबारे तपाईंलाई के लाग्छ?", vi: "Dạo này bạn nghĩ gì về vấn đề môi trường?", my: "မကြာသေးမီက သဘာဝပတ်ဝန်းကျင်ပြဿနာအကြောင်း ဘယ်လိုထင်ပါသလဲ။" } },
      { speaker: "B", jp: "とても深刻だと思います。もっと対策が必要です。", reading: "とてもしんこくだとおもいます。もっとたいさくがひつようです。",
        meaning: { en: "I think it's very serious. More measures are needed.", ne: "यो धेरै गम्भीर छ जस्तो लाग्छ। थप उपायहरू आवश्यक छन्।", vi: "Tôi nghĩ nó rất nghiêm trọng. Cần thêm biện pháp.", my: "အလွန်အလေးအနက်ရှိတယ်လို့ ထင်ပါတယ်။ နည်းလမ်းတွေ ပိုလိုအပ်ပါတယ်။" } },
      { speaker: "A", jp: "そうですね。私たちにも何かできることがあるはずです。", reading: "そうですね。わたしたちにもなにかできることがあるはずです。",
        meaning: { en: "That's true. There must be something we can do too.", ne: "साँचो हो। हामीले पनि केही गर्न सक्छौं होला।", vi: "Đúng vậy. Chắc chắn chúng ta cũng có thể làm gì đó.", my: "ဟုတ်တယ်နော်။ ကျွန်တော်တို့လည်း တစ်ခုခုလုပ်နိုင်မှာပါ။" } },
      { speaker: "B", jp: "一緒に考えましょう。", reading: "いっしょにかんがえましょう。",
        meaning: { en: "Let's think about it together.", ne: "सँगै सोचौं।", vi: "Hãy cùng nhau suy nghĩ.", my: "အတူတကွ စဉ်းစားကြပါစို့။" } },
    ] },
    { title: { en: "Discussing new technology", ne: "नयाँ प्रविधिको बारेमा", vi: "Bàn về công nghệ mới", my: "နည်းပညာအသစ်အကြောင်း" },
    lines: [
      { speaker: "A", jp: "最近のニュース、見ましたか。新しいAI技術についてです。", reading: "さいきんのニュース、みましたか。あたらしいエーアイぎじゅつについてです。",
        meaning: { en: "Did you see the recent news? It's about new AI technology.", ne: "भर्खरको समाचार हेर्नुभयो? नयाँ एआई प्रविधिको बारेमा हो।", vi: "Bạn có xem tin tức gần đây không? Về công nghệ AI mới đấy.", my: "မကြာသေးမီက သတင်းကြည့်ခဲ့လား။ AI နည်းပညာအသစ်အကြောင်းပါ။" } },
      { speaker: "B", jp: "ええ、見ました。便利になる反面、少し不安もありますね。", reading: "ええ、みました。べんりになるはんめん、すこしふあんもありますね。",
        meaning: { en: "Yes, I saw it. While it becomes convenient, there's also some anxiety, isn't there?", ne: "हो, हेरें। सुविधाजनक भएतापनि, अलि चिन्ता पनि छ।", vi: "Có, tôi đã xem. Tuy tiện lợi nhưng cũng hơi lo lắng nhỉ.", my: "ဟုတ်ကဲ့၊ ကြည့်ခဲ့ပါတယ်။ အဆင်ပြေလာတဲ့တစ်ဖက်မှာ နည်းနည်းစိုးရိမ်မှုလည်းရှိတယ်နော်။" } },
      { speaker: "A", jp: "確かに。使い方次第だと思います。", reading: "たしかに。つかいかたしだいだとおもいます。",
        meaning: { en: "Indeed. I think it depends on how it's used.", ne: "साँच्चै। प्रयोग गर्ने तरिकामा भर पर्छ जस्तो लाग्छ।", vi: "Đúng vậy. Tôi nghĩ nó tùy thuộc vào cách sử dụng.", my: "အမှန်ပဲ။ အသုံးပြုပုံပေါ်မူတည်တယ်လို့ထင်ပါတယ်။" } },
      { speaker: "B", jp: "そうですね、うまく付き合っていきたいです。", reading: "そうですね、うまくつきあっていきたいです。",
        meaning: { en: "That's right, I want to get along with it well.", ne: "ठीक हो, राम्ररी सामना गर्दै जान चाहन्छु।", vi: "Đúng vậy, tôi muốn hòa hợp tốt với nó.", my: "ဟုတ်တယ်နော်၊ ကောင်းကောင်းရင်းနှီးအောင် ပြုလုပ်ချင်ပါတယ်။" } },
    ] },
  ],
  N1: [
    { title: { en: "An abstract debate", ne: "एउटा दार्शनिक बहस", vi: "Một cuộc tranh luận trừu tượng", my: "စိတ္တဇဆွေးနွေးမှု" },
    lines: [
      { speaker: "A", jp: "彼の意見には矛盾があると思いませんか。", reading: "かれのいけんにはむじゅんがあるとおもいませんか。",
        meaning: { en: "Don't you think there's a contradiction in his opinion?", ne: "उनको विचारमा विरोधाभास छ जस्तो लाग्दैन?", vi: "Bạn không thấy ý kiến của anh ấy có mâu thuẫn sao?", my: "သူ့ရဲ့ ထင်မြင်ချက်ထဲမှာ ကွဲလွဲချက်ရှိတယ်လို့ မထင်ဘူးလား။" } },
      { speaker: "B", jp: "そうですね、曖昧な部分も多いです。", reading: "そうですね、あいまいなぶぶんもおおいです。",
        meaning: { en: "True, there are also many vague parts.", ne: "साँचो, अस्पष्ट भागहरू पनि धेरै छन्।", vi: "Đúng vậy, cũng có nhiều phần mơ hồ.", my: "ဟုတ်ပါတယ်၊ မရေရာတဲ့ အပိုင်းတွေလည်း အများကြီးရှိပါတယ်။" } },
      { speaker: "A", jp: "もっと厳密に議論するべきですね。", reading: "もっとげんみつにぎろんするべきですね。",
        meaning: { en: "We should discuss it more rigorously.", ne: "अझ कठोरतापूर्वक छलफल गर्नुपर्छ।", vi: "Chúng ta nên thảo luận nghiêm ngặt hơn.", my: "ပိုပြီးတိကျစွာ ဆွေးနွေးသင့်ပါတယ်။" } },
      { speaker: "B", jp: "賛成です。", reading: "さんせいです。",
        meaning: { en: "I agree.", ne: "म सहमत छु।", vi: "Tôi đồng ý.", my: "သဘောတူပါတယ်။" } },
    ] },
    { title: { en: "Work-life balance", ne: "काम र जीवनको सन्तुलन", vi: "Cân bằng công việc và cuộc sống", my: "အလုပ်နှင့်ဘဝမျှခြေညီညီထားခြင်း" },
    lines: [
      { speaker: "A", jp: "最近、仕事と生活のバランスについて考えることが多いんです。", reading: "さいきん、しごととせいかつのバランスについてかんがえることがおおいんです。",
        meaning: { en: "Lately, I often think about the balance between work and life.", ne: "आजकल, काम र जीवनको सन्तुलनबारे धेरै सोच्छु।", vi: "Dạo này, tôi thường suy nghĩ về sự cân bằng giữa công việc và cuộc sống.", my: "မကြာသေးမီက အလုပ်နှင့်ဘဝမျှခြေညီညီအကြောင်း စဉ်းစားလေ့ရှိပါတယ်။" } },
      { speaker: "B", jp: "それは重要なテーマですね。効率を重視するあまり、本質を見失うこともあります。", reading: "それはじゅうようなテーマですね。こうりつをじゅうしするあまり、ほんしつをみうしなうこともあります。",
        meaning: { en: "That's an important theme. Due to excessive focus on efficiency, one can sometimes lose sight of what's essential.", ne: "त्यो महत्त्वपूर्ण विषय हो। कार्यक्षमतालाई अत्यधिक जोड दिँदा, सारभूत कुरा बिर्सिने पनि हुन्छ।", vi: "Đó là một chủ đề quan trọng. Vì quá chú trọng hiệu quả, đôi khi ta có thể đánh mất bản chất vấn đề.", my: "ဒါက အရေးကြီးတဲ့ ခေါင်းစဉ်ပါပဲ။ ထိရောက်မှုကို အလွန်အလေးထားလွန်းလို့ အနှစ်သာရကို မမြင်တော့တာလည်း ရှိပါတယ်။" } },
      { speaker: "A", jp: "おっしゃる通りです。何を優先すべきか、常に問い直す必要がありますね。", reading: "おっしゃるとおりです。なにをゆうせんすべきか、つねにといなおすひつようがありますね。",
        meaning: { en: "You're absolutely right. We always need to reconsider what should be prioritized.", ne: "तपाईं भन्नुभएको सही हो। के प्राथमिकता दिनुपर्छ भनेर सधैं पुनर्विचार गर्नुपर्छ।", vi: "Đúng như bạn nói. Chúng ta luôn cần xem xét lại điều gì nên được ưu tiên.", my: "ဟုတ်ပါတယ်။ ဘာကို ဦးစားပေးသင့်သလဲဆိုတာ အမြဲပြန်လည်စဉ်းစားဖို့ လိုအပ်ပါတယ်။" } },
      { speaker: "B", jp: "ええ、まさにそれが現代人に求められている姿勢だと思います。", reading: "ええ、まさにそれがげんだいじんにもとめられているしせいだとおもいます。",
        meaning: { en: "Yes, I think that's exactly the attitude required of modern people.", ne: "हो, त्यही नै आधुनिक मानिसहरूमा आवश्यक धारणा हो जस्तो लाग्छ।", vi: "Vâng, tôi nghĩ đó chính là thái độ mà con người hiện đại cần có.", my: "ဟုတ်ကဲ့၊ ဒါက ခေတ်သစ်လူသားတွေမှာ လိုအပ်တဲ့ သဘောထားပါပဲလို့ ထင်ပါတယ်။" } },
    ] },
  ],
};

// Grammar points per level. meaning = short label in each language. example = {jp, reading, translation{en,ne,vi,my}}
const GRAMMAR = {
  N5: [
    { pattern: "〜は〜です", blank: "これ＿＿＿本です。", connection: "名詞１ + は + 名詞２ + です", note: { ja: "「AはBです」の形でAを主題として説明する、日本語の最も基本的な文型。", en: "は marks the topic being talked about.", ne: "は कुरा भइरहेको विषय देखाउँछ।", vi: "は đánh dấu chủ đề đang được nói đến.", my: "は သည် ပြောနေသော အကြောင်းအရာကို ညွှန်သည်။" }, meaning: { en: "X is Y", ne: "X, Y हो", vi: "X là Y", my: "X သည် Y ဖြစ်သည်" },
      example: { jp: "これは本です。", reading: "これはほんです。", translation: { en: "This is a book.", ne: "यो किताब हो।", vi: "Đây là quyển sách.", my: "ဒါက စာအုပ်ပါ။" } } },
    { pattern: "〜を食べます", blank: "パン＿＿＿食べます。", connection: "名詞 + を + 動詞ます形", note: { ja: "「を」は動作の対象を表す助詞。「ご飯を食べる」のように具体的な目的語をとる。", en: "を marks the direct object of the verb.", ne: "を क्रियाको कर्म (object) चिन्ह हो।", vi: "を đánh dấu tân ngữ trực tiếp của động từ.", my: "を သည် ကြိယာ၏ တိုက်ရိုက်အကြောင်းအရာကို ညွှန်သည်။" }, meaning: { en: "to eat ~ (object + verb)", ne: "~ खान्छु (कर्म + क्रिया)", vi: "ăn ~ (tân ngữ + động từ)", my: "~ ကို စားသည်" },
      example: { jp: "パンを食べます。", reading: "パンをたべます。", translation: { en: "I eat bread.", ne: "म रोटी खान्छु।", vi: "Tôi ăn bánh mì.", my: "ပေါင်မုန့် စားသည်။" } } },
    { pattern: "〜に行きます", blank: "学校＿＿＿行きます。", connection: "場所（名詞） + に + 行きます", note: { ja: "「に」は移動の到着点（目的地）を示す。「へ」に置き換えられることも多い。", en: "に marks the destination, not just direction.", ne: "に गन्तव्य देखाउँछ, दिशा मात्र होइन।", vi: "に đánh dấu điểm đến, không chỉ hướng.", my: "に သည် သွားမည့်ဦးတည်ရာကို ညွှန်သည်။" }, meaning: { en: "to go to ~", ne: "~ मा जान्छु", vi: "đi đến ~", my: "~ သို့ သွားသည်" },
      example: { jp: "学校に行きます。", reading: "がっこうにいきます。", translation: { en: "I go to school.", ne: "म विद्यालय जान्छु।", vi: "Tôi đi đến trường.", my: "ကျောင်းသို့ သွားသည်။" } } },
    { pattern: "〜てください", blank: "ここに座＿＿＿。", connection: "動詞て形 + ください", note: { ja: "相手に丁寧に依頼・指示する表現。目上の人にも使えるが命令に近いので、ビジネスでは「〜ていただけますか」がより丁寧。", en: "A polite request, softer than a direct command.", ne: "नम्र अनुरोध, प्रत्यक्ष आदेशभन्दा नरम।", vi: "Yêu cầu lịch sự, nhẹ nhàng hơn mệnh lệnh trực tiếp.", my: "တိုက်ရိုက် အမိန့်ထက် ပိုပျော့ပြေသော ယဉ်ကျေးသည့် တောင်းဆိုမှု။" }, meaning: { en: "please do ~", ne: "कृपया ~ गर्नुहोस्", vi: "hãy làm ~", my: "~ ပေးပါ" },
      example: { jp: "ここに座ってください。", reading: "ここにすわってください。", translation: { en: "Please sit here.", ne: "कृपया यहाँ बस्नुहोस्।", vi: "Xin hãy ngồi đây.", my: "ဒီမှာ ထိုင်ပေးပါ။" } } },
    { pattern: "〜たいです", blank: "日本語を勉強し＿＿＿。", connection: "動詞ます形（ますを取る） + たいです", note: { ja: "話し手自身の願望を表す。第三者の願望を言うときは「〜たがっている」を使う。", en: "Expresses the speaker's own desire; not used to describe someone else's wish.", ne: "बोल्नेको आफ्नै इच्छा जनाउँछ, अरूको इच्छाको लागि प्रयोग हुँदैन।", vi: "Diễn tả mong muốn của chính người nói, không dùng để nói về mong muốn của người khác.", my: "ပြောသူကိုယ်တိုင်၏ ဆန္ဒကိုသာ ဖော်ပြသည်၊ အခြားသူအတွက် မသုံး။" }, meaning: { en: "want to ~", ne: "~ गर्न चाहन्छु", vi: "muốn ~", my: "~ ချင်သည်" },
      example: { jp: "日本語を勉強したいです。", reading: "にほんごをべんきょうしたいです。", translation: { en: "I want to study Japanese.", ne: "म जापानी भाषा पढ्न चाहन्छु।", vi: "Tôi muốn học tiếng Nhật.", my: "ဂျပန်စာ လေ့လာချင်ပါတယ်။" } } },
    { pattern: "〜ないでください", blank: "ここに車を止め＿＿＿。", connection: "動詞ない形 + でください", note: { ja: "相手にある行為をしないよう丁寧に頼む表現。禁止に近いニュアンスを持つ。", en: "A polite request asking someone not to do something.", ne: "कसैलाई केही नगर्न भन्ने नम्र अनुरोध।", vi: "Yêu cầu lịch sự đề nghị ai đó không làm gì.", my: "တစုံတစ်ယောက်အား တစ်ခုခုမလုပ်ရန် ယဉ်ကျေးစွာ တောင်းဆိုချက်။" }, meaning: { en: "please don't ~", ne: "कृपया ~ नगर्नुहोस्", vi: "xin đừng ~", my: "~ မလုပ်ပါနဲ့" },
      example: { jp: "ここに車を止めないでください。", reading: "ここにくるまをとめないでください。", translation: { en: "Please don't park your car here.", ne: "कृपया यहाँ गाडी नरोक्नुहोस्।", vi: "Xin đừng đỗ xe ở đây.", my: "ဒီမှာ ကားမရပ်ပါနဲ့။" } } },
    { pattern: "〜ませんか", blank: "一緒に映画を＿＿＿。", connection: "動詞ます形（ませんの前） + か", note: { ja: "相手を誘うときに使う丁寧な表現。「〜ましょう」より控えめで丁寧。", en: "A polite expression used to invite someone. More modest and polite than 'ましょう'.", ne: "कसैलाई निमन्त्रणा गर्दा प्रयोग हुने विनम्र अभिव्यक्ति।", vi: "Cách nói lịch sự dùng để mời ai đó, khiêm tốn hơn 'ましょう'.", my: "တစ်စုံတစ်ယောက်ကို ဖိတ်ခေါ်ရာတွင်သုံးသောယဉ်ကျေးသည့်အသုံးအနှုန်း။" }, meaning: { en: "won't you ~? (invitation)", ne: "~ गर्नुहुन्न?", vi: "bạn không muốn ~ sao?", my: "~ မလုပ်ချင်ဘူးလား" },
      example: { jp: "一緒に映画を見ませんか。", reading: "いっしょにえいがをみませんか。", translation: { en: "Won't you watch a movie together?", ne: "के सँगै चलचित्र हेर्ने?", vi: "Bạn có muốn cùng xem phim không?", my: "အတူတကွ ရုပ်ရှင်ကြည့်မလား။" } } },
    { pattern: "〜ましょう", blank: "一緒に＿＿＿。", connection: "動詞ます形 + ましょう", note: { ja: "相手を誘う、または提案するときに使う表現。", en: "Used to invite or suggest doing something together.", ne: "कसैलाई निमन्त्रणा वा सुझाव दिन प्रयोग हुन्छ।", vi: "Dùng để mời hoặc đề nghị cùng làm gì đó.", my: "တစ်စုံတစ်ခုကို အတူလုပ်ဖို့ဖိတ်ခေါ်ခြင်း သို့မဟုတ် အကြံပြုခြင်းအတွက်သုံးသည်။" }, meaning: { en: "let's ~", ne: "~ गरौं", vi: "hãy cùng ~", my: "~ လုပ်ကြစို့" },
      example: { jp: "一緒に行きましょう。", reading: "いっしょにいきましょう。", translation: { en: "Let's go together.", ne: "सँगै जाऔं।", vi: "Hãy cùng đi nhé.", my: "အတူတကွ သွားကြစို့။" } } },
    { pattern: "〜から", blank: "疲れた＿＿＿、休みます。", connection: "普通形／丁寧形 + から", note: { ja: "主観的な理由を表す、話し言葉でよく使うカジュアルな表現。「ので」より直接的。", en: "A casual, subjective way to state a reason, more direct than 'ので'. Common in spoken language.", ne: "बोलीचालीमा प्रयोग हुने प्रत्यक्ष कारण जनाउने अभिव्यक्ति।", vi: "Cách nói lý do mang tính chủ quan, trực tiếp hơn 'ので', thường dùng trong văn nói.", my: "စကားပြောတွင် အသုံးများသော တိုက်ရိုက်အကြောင်းပြချက်ဖော်ပြပုံ။" }, meaning: { en: "because ~", ne: "~ भएकोले", vi: "vì ~", my: "~ ကြောင့်" },
      example: { jp: "疲れたから、休みます。", reading: "つかれたから、やすみます。", translation: { en: "Because I'm tired, I'll rest.", ne: "थाकेको हुनाले, आराम गर्छु।", vi: "Vì mệt nên tôi sẽ nghỉ ngơi.", my: "ပင်ပန်းလို့ အနားယူမယ်။" } } },
    { pattern: "〜とき", blank: "日本に行く＿＿＿、パスポートが必要です。", connection: "動詞辞書形／た形 + とき", note: { ja: "ある出来事が起こる時点を表す表現。", en: "Expresses the point in time when something happens.", ne: "कुनै घटना हुने समयबिन्दु जनाउँछ।", vi: "Diễn tả thời điểm một sự việc xảy ra.", my: "တစ်စုံတစ်ခုဖြစ်ပျက်သည့်အချိန်ကို ဖော်ပြသည်။" }, meaning: { en: "when ~", ne: "~ जब", vi: "khi ~", my: "~ အချိန်တွင်" },
      example: { jp: "日本に行くとき、パスポートが必要です。", reading: "にほんにいくとき、パスポートがひつようです。", translation: { en: "When going to Japan, a passport is necessary.", ne: "जापान जाँदा राहदानी आवश्यक हुन्छ।", vi: "Khi đi Nhật Bản cần có hộ chiếu.", my: "ဂျပန်သွားတဲ့အခါ နိုင်ငံကူးလက်မှတ် လိုအပ်ပါတယ်။" } } },
    { pattern: "〜前に", blank: "寝る＿＿＿、歯を磨きます。", connection: "動詞辞書形 + 前に", note: { ja: "ある動作の前に別の動作をすることを表す。", en: "Expresses doing one action before another.", ne: "अर्को कार्य गर्नुअघि गरिने कार्य जनाउँछ।", vi: "Diễn tả việc làm một hành động trước một hành động khác.", my: "တစ်ခုမလုပ်မီ တခြားလုပ်ဆောင်ချက်ကို ဖော်ပြသည်။" }, meaning: { en: "before ~", ne: "~ अगाडि", vi: "trước khi ~", my: "~ မတိုင်မီ" },
      example: { jp: "寝る前に、歯を磨きます。", reading: "ねるまえに、はをみがきます。", translation: { en: "Before sleeping, I brush my teeth.", ne: "सुत्नुअघि दाँत माझ्छु।", vi: "Trước khi ngủ, tôi đánh răng.", my: "အိပ်ခင်း သွားတိုက်ပါတယ်။" } } },
    { pattern: "〜後で", blank: "食べた＿＿＿、薬を飲みます。", connection: "動詞た形 + 後で", note: { ja: "ある動作の後に別の動作をすることを表す。", en: "Expresses doing one action after another.", ne: "अर्को कार्य पछि गरिने कार्य जनाउँछ।", vi: "Diễn tả việc làm một hành động sau một hành động khác.", my: "တစ်ခုပြီးနောက် တခြားလုပ်ဆောင်ချက်ကို ဖော်ပြသည်။" }, meaning: { en: "after ~", ne: "~ पछि", vi: "sau khi ~", my: "~ ပြီးနောက်" },
      example: { jp: "食べた後で、薬を飲みます。", reading: "たべたあとで、くすりをのみます。", translation: { en: "After eating, I take medicine.", ne: "खाएपछि औषधि खान्छु।", vi: "Sau khi ăn, tôi uống thuốc.", my: "စားပြီးရင် ဆေးသောက်ပါတယ်။" } } },
  ],
  N4: [
    { pattern: "〜ことができる", blank: "漢字を読む＿＿＿。", connection: "動詞辞書形 + ことができる", note: { ja: "能力や可能性を表すやや硬い言い方。話し言葉では「〜(ら)れる」の可能形がよく使われる。", en: "A formal way to express ability, often used in writing.", ne: "क्षमता व्यक्त गर्ने औपचारिक तरिका, प्रायः लेखनमा प्रयोग हुन्छ।", vi: "Cách trang trọng diễn đạt khả năng, thường dùng trong văn viết.", my: "စွမ်းရည်ကို ဖော်ပြသည့် တရားဝင်နည်းလမ်း၊ ရေးသားမှုတွင် အများဆုံးသုံး။" }, meaning: { en: "can do ~", ne: "~ गर्न सक्नु", vi: "có thể ~", my: "~ နိုင်သည်" },
      example: { jp: "漢字を読むことができます。", reading: "かんじをよむことができます。", translation: { en: "I can read kanji.", ne: "म कान्जी पढ्न सक्छु।", vi: "Tôi có thể đọc chữ Hán.", my: "ခန်းဂျီး ဖတ်နိုင်ပါတယ်။" } } },
    { pattern: "〜たことがある", blank: "沖縄に行っ＿＿＿。", connection: "動詞た形 + ことがある", note: { ja: "過去の経験の有無を述べる。「何回くらい」など頻度を尋ねる表現と一緒によく使われる。", en: "Talks about a past experience overall, not one specific occasion.", ne: "समग्र विगतको अनुभव जनाउँछ, कुनै एक विशेष घटना होइन।", vi: "Nói về kinh nghiệm trong quá khứ nói chung, không phải một lần cụ thể.", my: "အတိတ်ကအတွေ့အကြုံကို ယေဘုယျအားဖြင့် ပြောသည်၊ တိကျသောအချိန်တစ်ခုမဟုတ်ပါ။" }, meaning: { en: "have done ~ before", ne: "~ गरेको छु (अनुभव)", vi: "đã từng ~", my: "~ ဖူးသည်" },
      example: { jp: "沖縄に行ったことがあります。", reading: "おきなわにいったことがあります。", translation: { en: "I have been to Okinawa before.", ne: "म ओकिनावा गएको छु।", vi: "Tôi đã từng đi Okinawa.", my: "အိုကီနာဝါ သွားဖူးပါတယ်။" } } },
    { pattern: "〜ながら", blank: "音楽を聞き＿＿＿勉強します。", connection: "動詞ます形（ますを取る） + ながら", note: { ja: "二つの動作を同時に行うことを表す。話し手が伝えたい主な動作は後ろの節に来る。", en: "Both actions are done by the same person at the same time.", ne: "दुबै काम एउटै व्यक्तिले एकैसाथ गर्छ।", vi: "Cả hai hành động do cùng một người thực hiện đồng thời.", my: "လုပ်ဆောင်ချက်နှစ်ခုစလုံးကို လူတစ်ဦးတည်းက တစ်ချိန်တည်းလုပ်ဆောင်ခြင်း။" }, meaning: { en: "while doing ~", ne: "~ गर्दागर्दै", vi: "vừa ~ vừa", my: "~ ရင်း" },
      example: { jp: "音楽を聞きながら勉強します。", reading: "おんがくをききながらべんきょうします。", translation: { en: "I study while listening to music.", ne: "म संगीत सुन्दै पढ्छु।", vi: "Tôi vừa nghe nhạc vừa học.", my: "တေးဂီတ နားထောင်ရင်း စာလေ့လာသည်။" } } },
    { pattern: "〜ので", blank: "雨が降っている＿＿＿、傘を持って行きます。", connection: "普通形 + ので（な形容詞・名詞は「な」+ ので）", note: { ja: "客観的で丁寧な理由・原因を述べる表現。「〜から」より柔らかく、依頼やお詫びの前によく使う。", en: "Sounds softer and more objective than から.", ne: "からभन्दा नरम र वस्तुनिष्ठ सुनिन्छ।", vi: "Nghe nhẹ nhàng và khách quan hơn から.", my: "から ထက် ပိုပျော့ပြေပြီး ဓမ္မဓိဋ္ဌာန်ကျသည်ဟု ကြားရသည်။" }, meaning: { en: "because ~", ne: "~ भएकोले", vi: "vì ~", my: "~ ဖြစ်၍" },
      example: { jp: "雨が降っているので、傘を持って行きます。", reading: "あめがふっているので、かさをもっていきます。", translation: { en: "Because it's raining, I'll bring an umbrella.", ne: "पानी परिरहेकोले, म छाता लैजान्छु।", vi: "Vì trời đang mưa nên tôi sẽ mang theo ô.", my: "မိုးရွာနေလို့ ထီးယူသွားမယ်။" } } },
    { pattern: "〜そうです", blank: "このケーキはおいし＿＿＿。", connection: "動詞ます形／い形容詞（いを取る） + そうです（様態）", note: { ja: "見た目から判断した推測（様態）を表す。伝聞の「〜そうです」（普通形＋そうです）とは接続が違うので注意。", en: "Based on how something looks, not a confirmed fact.", ne: "देखिने आधारमा भनिन्छ, पुष्टि भएको तथ्य होइन।", vi: "Dựa trên vẻ ngoài quan sát được, chưa phải sự thật xác nhận.", my: "မြင်ရသည့်အသွင်အပြင်ပေါ်မူတည်၍ ပြောခြင်း၊ အတည်ပြုပြီးသားအချက်အလက် မဟုတ်ပါ။" }, meaning: { en: "looks like ~ / I heard ~", ne: "~ जस्तो देखिन्छ / सुनेको छु", vi: "có vẻ ~ / nghe nói ~", my: "~ ပုံရသည် / ~ ဆိုပါတယ်" },
      example: { jp: "このケーキはおいしそうです。", reading: "このケーキはおいしそうです。", translation: { en: "This cake looks delicious.", ne: "यो केक स्वादिष्ट देखिन्छ।", vi: "Chiếc bánh này trông có vẻ ngon.", my: "ဒီကိတ်မုန့် စားချင်စဖွယ် ရှိပါတယ်။" } } },
    { pattern: "〜てもいい", blank: "ここで写真を撮っ＿＿＿か。", connection: "動詞て形 + もいい", note: { ja: "許可を求めたり与えたりする表現。「〜なくてもいい」にすると「不要」という意味になる。", en: "Used to ask for or give permission.", ne: "अनुमति माग्न वा दिन प्रयोग हुन्छ।", vi: "Dùng để xin phép hoặc cho phép.", my: "ခွင့်ပြုချက် တောင်းရန် သို့မဟုတ် ပေးရန် သုံးသည်။" }, meaning: { en: "may do ~ / it's okay to ~", ne: "~ गर्न मिल्छ", vi: "được phép ~", my: "~ လုပ်လို့ရသည်" },
      example: { jp: "ここで写真を撮ってもいいですか。", reading: "ここでしゃしんをとってもいいですか。", translation: { en: "May I take a photo here?", ne: "के म यहाँ फोटो खिच्न मिल्छ?", vi: "Tôi có thể chụp ảnh ở đây không?", my: "ဒီမှာ ဓာတ်ပုံရိုက်လို့ရလား။" } } },
    { pattern: "〜そうだ（伝聞）", blank: "天気予報によると、明日は雨だ＿＿＿。", connection: "普通形 + そうだ", note: { ja: "人から聞いた情報を伝える表現。様態の「そうだ」（〜そうです）とは接続と意味が違う。", en: "Conveys information heard from someone else. Different in both connection and meaning from the appearance-based 'そうだ' (looks like ~).", ne: "अरूबाट सुनेको जानकारी सुनाउने अभिव्यक्ति।", vi: "Truyền đạt thông tin nghe được từ người khác.", my: "အခြားသူများထံမှ ကြားသိရသောသတင်းအချက်အလက်ကို ဖော်ပြသည်။" }, meaning: { en: "I heard that ~", ne: "~ रे (सुनेको)", vi: "nghe nói ~", my: "~ လို့ ကြားရသည်" },
      example: { jp: "天気予報によると、明日は雨だそうです。", reading: "てんきよほうによると、あしたはあめだそうです。", translation: { en: "According to the weather forecast, it will rain tomorrow (I heard).", ne: "मौसम पूर्वानुमान अनुसार भोलि पानी पर्ने रे।", vi: "Theo dự báo thời tiết, nghe nói ngày mai trời sẽ mưa.", my: "ရာသီဥတုခန့်မှန်းချက်အရ မနက်ဖြန် မိုးရွာမယ်လို့ ကြားရပါတယ်။" } } },
    { pattern: "〜らしい", blank: "彼はもうすぐ結婚する＿＿＿です。", connection: "普通形 + らしい", note: { ja: "客観的な情報や噂に基づく推測を表す。「いかにも〜らしい」で「〜にふさわしい」という意味にもなる。", en: "Expresses a guess based on objective information or rumor. Can also mean 'typical of ~'.", ne: "वस्तुगत जानकारी वा हल्लामा आधारित अनुमान जनाउँछ।", vi: "Diễn tả suy đoán dựa trên thông tin khách quan hoặc tin đồn.", my: "ဓမ္မဓိဋ္ဌာန်ကျသော အချက်အလက် သို့မဟုတ် ကောလာဟလအပေါ်အခြေခံ၍ ခန့်မှန်းချက်ကိုဖော်ပြသည်။" }, meaning: { en: "it seems / typical of", ne: "~ जस्तो देखिन्छ", vi: "có vẻ như ~", my: "~ ပုံရသည်" },
      example: { jp: "彼はもうすぐ結婚するらしいです。", reading: "かれはもうすぐけっこんするらしいです。", translation: { en: "It seems he's getting married soon.", ne: "उनी चाँडै विवाह गर्ने रहेछन्।", vi: "Nghe nói anh ấy sắp kết hôn.", my: "သူ မကြာမီ လက်ထပ်တော့မယ်ပုံပဲ။" } } },
    { pattern: "〜まま", blank: "靴を履いた＿＿＿、部屋に入らないでください。", connection: "動詞た形／ない形 + まま", note: { ja: "ある状態が変わらずに続いていることを表す。", en: "Expresses that a state continues unchanged.", ne: "कुनै अवस्था नबदलिइकन जारी रहेको जनाउँछ।", vi: "Diễn tả một trạng thái tiếp tục không thay đổi.", my: "အခြေအနေတစ်ခု မပြောင်းလဲဘဲ ဆက်လက်တည်ရှိနေခြင်းကို ဖော်ပြသည်။" }, meaning: { en: "as is / while remaining", ne: "जस्ताको तस्तै", vi: "cứ để nguyên như vậy", my: "ထိုအတိုင်း" },
      example: { jp: "靴を履いたまま、部屋に入らないでください。", reading: "くつをはいたまま、へやにはいらないでください。", translation: { en: "Please don't enter the room with your shoes on.", ne: "जुत्ता लगाएको अवस्थामा कोठामा नपस्नुहोस्।", vi: "Xin đừng vào phòng khi vẫn đang đi giày.", my: "ဖိနပ်စီးထားတဲ့အတိုင်း အခန်းထဲမဝင်ပါနဲ့။" } } },
    { pattern: "〜出す", blank: "子供が急に泣き＿＿＿。", connection: "動詞ます形（ますを取る） + 出す", note: { ja: "ある動作や状態が急に始まることを表す。", en: "Expresses that an action or state suddenly begins.", ne: "कुनै कार्य वा अवस्था अचानक सुरु हुने जनाउँछ।", vi: "Diễn tả một hành động hoặc trạng thái đột nhiên bắt đầu.", my: "လုပ်ဆောင်ချက် သို့မဟုတ် အခြေအနေတစ်ခု ရုတ်တရက်စတင်ခြင်းကို ဖော်ပြသည်။" }, meaning: { en: "to suddenly start ~ing", ne: "अचानक ~ थाल्नु", vi: "đột nhiên bắt đầu ~", my: "ရုတ်တရက် ~ စတင်သည်" },
      example: { jp: "子供が急に泣き出しました。", reading: "こどもがきゅうになきだしました。", translation: { en: "The child suddenly started crying.", ne: "बच्चा अचानक रुन थाल्यो।", vi: "Đứa trẻ đột nhiên khóc.", my: "ကလေးက ရုတ်တရက် ငိုစပြုလိုက်တယ်။" } } },
    { pattern: "〜方", blank: "この漢字の読み＿＿＿が分かりません。", connection: "動詞ます形（ますを取る） + 方", note: { ja: "動作のやり方・方法を表す名詞を作る。", en: "Forms a noun expressing the method or way of doing an action.", ne: "कुनै कार्य गर्ने तरिका जनाउने संज्ञा बनाउँछ।", vi: "Tạo thành danh từ diễn tả phương pháp hoặc cách làm một hành động.", my: "လုပ်ဆောင်ချက်တစ်ခု၏ ပြုလုပ်ပုံနည်းလမ်းကို ဖော်ပြသည့် နာမ်ပုံစံပြုလုပ်သည်။" }, meaning: { en: "how to ~ / way of ~ing", ne: "~ गर्ने तरिका", vi: "cách ~", my: "~ ပုံစံ/နည်းလမ်း" },
      example: { jp: "この漢字の読み方が分かりません。", reading: "このかんじのよみかたがわかりません。", translation: { en: "I don't understand how to read this kanji.", ne: "यो कान्जी पढ्ने तरिका थाहा छैन।", vi: "Tôi không biết cách đọc chữ Hán này.", my: "ဒီခန်းဂျီးကို ဘယ်လိုဖတ်ရမှန်း မသိပါဘူး။" } } },
    { pattern: "〜すぎる", blank: "昨日は食べ＿＿＿ました。", connection: "動詞ます形／い形容詞（いを取る）／な形容詞 + すぎる", note: { ja: "程度が普通を超えていることを表す。", en: "Expresses that a degree exceeds the normal amount.", ne: "कुनै मात्रा सामान्यभन्दा बढी भएको जनाउँछ।", vi: "Diễn tả mức độ vượt quá bình thường.", my: "ပုံမှန်ထက် ကျော်လွန်နေသော ဒီဂရီကို ဖော်ပြသည်။" }, meaning: { en: "too much ~", ne: "अति धेरै ~", vi: "quá ~", my: "~ လွန်းသည်" },
      example: { jp: "昨日は食べすぎました。", reading: "きのうはたべすぎました。", translation: { en: "Yesterday I ate too much.", ne: "हिजो अति धेरै खाएँ।", vi: "Hôm qua tôi đã ăn quá nhiều.", my: "မနေ့က အရမ်းစားလိုက်မိတယ်။" } } },
  ],
  N3: [
    { pattern: "〜ば", blank: "時間があ＿＿＿、手伝ってください。", connection: "動詞ば形（仮定形） + ば", note: { ja: "一般的・仮定的な条件を表す。「もし〜なら」に近いが、後件に意志・命令が来にくい場合がある。", en: "A general conditional, often for hypothetical or natural results.", ne: "सामान्य सर्त, प्रायः काल्पनिक वा स्वाभाविक परिणामको लागि।", vi: "Điều kiện chung, thường dùng cho giả định hoặc kết quả tự nhiên.", my: "ယေဘုယျ အခြေအနေဆိုင်ရာဖော်ပြချက်၊ ယူဆချက် သို့မဟုတ် သဘာဝကျသောရလဒ်များအတွက်။" }, meaning: { en: "if ~", ne: "यदि ~ भए", vi: "nếu ~", my: "~ လျှင်" },
      example: { jp: "時間があれば、手伝ってください。", reading: "じかんがあれば、てつだってください。", translation: { en: "If you have time, please help me.", ne: "यदि समय भए, मद्दत गर्नुहोस्।", vi: "Nếu có thời gian, xin hãy giúp tôi.", my: "အချိန်ရှိရင် ကူညီပေးပါ။" } } },
    { pattern: "〜ように", blank: "忘れない＿＿＿メモします。", connection: "動詞辞書形／ない形 + ように", note: { ja: "目的や願いの対象を表す。「〜ために」と似るが、こちらは自然に起こる変化にも使える。", en: "Expresses a goal to aim for, gentler than ため (for the sake of).", ne: "पुग्नुपर्ने लक्ष्य जनाउँछ, ためभन्दा नरम।", vi: "Diễn tả một mục tiêu hướng tới, nhẹ nhàng hơn ため.", my: "ရည်မှန်းသည့်ပန်းတိုင်ကိုဖော်ပြသည်၊ ため ထက်ပျော့ပြေသည်။" }, meaning: { en: "so that ~", ne: "~ होस् भनेर", vi: "để mà ~", my: "~ ဖြစ်စေရန်" },
      example: { jp: "忘れないようにメモします。", reading: "わすれないようにメモします。", translation: { en: "I'll take notes so I don't forget.", ne: "नबिर्सिने गरी नोट गर्छु।", vi: "Tôi sẽ ghi chú để không quên.", my: "မမေ့စေရန် မှတ်စုတင်ပါမယ်။" } } },
    { pattern: "〜てしまう", blank: "電車の中で寝＿＿＿。", connection: "動詞て形 + しまう", note: { ja: "動作の完了、または「困ったことに〜してしまった」という後悔・残念な気持ちを表す。", en: "Often implies regret or completeness; casual speech shortens it to ちゃう.", ne: "प्रायः पछुतो वा पूर्णता जनाउँछ; बोलीचालीमा ちゃう मा छोटिन्छ।", vi: "Thường ngụ ý hối tiếc hoặc sự hoàn tất; văn nói rút gọn thành ちゃう.", my: "များသောအားဖြင့် နောင်တ သို့မဟုတ် ပြီးပြည့်စုံမှုကို ရည်ညွှန်း၊ စကားပြောတွင် ちゃう ဟု တိုတောင်းသွားသည်။" }, meaning: { en: "end up doing ~ / regret", ne: "~ भइहाल्छ (पछुतो)", vi: "lỡ ~ / trót ~", my: "~ ဖြစ်သွားသည် (နောင်တ)" },
      example: { jp: "電車の中で寝てしまいました。", reading: "でんしゃのなかでねてしまいました。", translation: { en: "I ended up falling asleep on the train.", ne: "म रेलमा सुतिहालेँ।", vi: "Tôi lỡ ngủ quên trên tàu.", my: "ရထားပေါ်မှာ အိပ်ပျော်သွားခဲ့တယ်။" } } },
    { pattern: "〜わけではない", blank: "嫌いな＿＿＿。", connection: "普通形 + わけではない", note: { ja: "全体を否定するのではなく、部分的・婉曲な否定を表す。誤解を避けたいときによく使う。", en: "Softly denies a conclusion someone might have assumed.", ne: "कसैले सोचेको निष्कर्षलाई नरम रूपमा अस्वीकार गर्छ।", vi: "Phủ nhận nhẹ nhàng một kết luận mà ai đó có thể đã nghĩ.", my: "တစ်စုံတစ်ယောက်က ထင်ကောင်းထင်နိုင်သည့် နိဂုံးကို ပျော့ပျောင်းစွာ ငြင်းဆိုသည်။" }, meaning: { en: "doesn't necessarily mean ~", ne: "~ भन्ने होइन", vi: "không hẳn là ~", my: "~ ဟု မဆိုလိုပါ" },
      example: { jp: "嫌いなわけではありません。", reading: "きらいなわけではありません。", translation: { en: "It's not that I dislike it.", ne: "मलाई मन नपर्ने भन्ने होइन।", vi: "Không hẳn là tôi ghét nó.", my: "မကြိုက်လို့ မဟုတ်ပါဘူး။" } } },
    { pattern: "〜たびに", blank: "彼に会う＿＿＿元気をもらいます。", connection: "動詞辞書形／名詞の + たびに", note: { ja: "「〜するといつも」という意味。同じ状況が繰り返し起こることを強調する。", en: "Emphasizes that something happens every single time, without exception.", ne: "अपवाद बिना हरेक पटक हुने कुरामा जोड दिन्छ।", vi: "Nhấn mạnh điều gì đó xảy ra mỗi lần, không ngoại lệ.", my: "ခြွင်းချက်မရှိဘဲ အကြိမ်တိုင်းဖြစ်ပျက်ကြောင်း အလေးပေးသည်။" }, meaning: { en: "every time ~", ne: "~ जहिले पनि", vi: "mỗi khi ~", my: "~ တိုင်း" },
      example: { jp: "彼に会うたびに元気をもらいます。", reading: "かれにあうたびにげんきをもらいます。", translation: { en: "Every time I meet him, I feel energized.", ne: "उनलाई भेट्दा जहिले पनि उर्जा पाउँछु।", vi: "Mỗi khi gặp anh ấy, tôi lại thấy tràn đầy năng lượng.", my: "သူ့ကို တွေ့တိုင်း အားရသွားတယ်။" } } },
    { pattern: "〜としても", blank: "頑張った＿＿＿、無理かもしれません。", connection: "普通形 + としても", note: { ja: "仮に〜という状況を認めたうえで、それでも結果が変わらないことを述べる譲歩表現。", en: "Even under that hypothetical condition, the outcome stays the same.", ne: "काल्पनिक अवस्थामा पनि परिणाम उही रहन्छ।", vi: "Ngay cả trong điều kiện giả định đó, kết quả vẫn không đổi.", my: "ထိုယူဆချက်အောက်တွင်ပင် ရလဒ်မှာ မပြောင်းလဲပါ။" }, meaning: { en: "even if ~", ne: "~ भए तापनि", vi: "dù cho ~", my: "~ ဖြစ်ရင်တောင်" },
      example: { jp: "頑張ったとしても、無理かもしれません。", reading: "がんばったとしても、むりかもしれません。", translation: { en: "Even if I try hard, it might be impossible.", ne: "मेहनत गरे तापनि, असम्भव हुन सक्छ।", vi: "Dù có cố gắng thế nào, có lẽ vẫn không thể.", my: "ကြိုးစားရင်တောင် မဖြစ်နိုင်ပါဘူး။" } } },
    { pattern: "〜際", connection: "動詞辞書形／動詞た形／名詞の + 際", note: { en: "A more formal, written version of 時（とき）; often used for official notices, ceremonial moments, or business contexts.", ne: "時（とき）को अझ औपचारिक, लिखित रूप; प्रायः आधिकारिक सूचना वा व्यावसायिक सन्दर्भमा प्रयोग हुन्छ।", vi: "Là dạng trang trọng, mang tính văn viết của 時（とき）; thường dùng cho thông báo chính thức hoặc trong kinh doanh.", my: "時（とき）၏ ပိုတရားဝင်ပြီး စာဖြင့်ရေးသားသည့် ပုံစံဖြစ်ပြီး၊ တရားဝင်အကြောင်းကြားစာများ သို့မဟုတ် စီးပွားရေးအခြေအနေများတွင် အများဆုံးသုံး။" },
      meaning: { en: "at the time of ~ / on the occasion of ~", ne: "~ को अवसरमा / ~ हुँदा", vi: "vào lúc ~ / nhân dịp ~", my: "~ ဖြစ်ချိန်တွင်" },
      example: { jp: "ご利用の際は、こちらにお問い合わせください。", reading: "ごりようのさいは、こちらにおといあわせください。", translation: { en: "Please contact us here when you use this service.", ne: "प्रयोग गर्दा, कृपया यहाँ सम्पर्क गर्नुहोस्।", vi: "Khi sử dụng, xin vui lòng liên hệ tại đây.", my: "အသုံးပြုချိန်တွင် ဤနေရာသို့ ဆက်သွယ်ပါ။" } } },
    { pattern: "〜おかげで", blank: "先生の＿＿＿、試験に合格しました。", connection: "普通形／名詞の + おかげで", note: { ja: "良い結果の原因・理由を感謝の気持ちを込めて表す。", en: "Expresses the cause of a good result, with a feeling of gratitude.", ne: "राम्रो परिणामको कारण कृतज्ञताका साथ व्यक्त गर्छ।", vi: "Diễn tả nguyên nhân của một kết quả tốt, kèm theo lòng biết ơn.", my: "ကောင်းသောရလဒ်၏ အကြောင်းရင်းကို ကျေးဇူးတင်စိတ်ဖြင့် ဖော်ပြသည်။" }, meaning: { en: "thanks to ~", ne: "~ को कारण (राम्रो)", vi: "nhờ có ~", my: "~ ကြောင့် (ကျေးဇူး)" },
      example: { jp: "先生のおかげで、試験に合格しました。", reading: "せんせいのおかげで、しけんにごうかくしました。", translation: { en: "Thanks to the teacher, I passed the exam.", ne: "शिक्षकको कारण, म परीक्षामा उत्तीर्ण भएँ।", vi: "Nhờ có thầy giáo mà tôi đã đỗ kỳ thi.", my: "ဆရာ့ကျေးဇူးကြောင့် စာမေးပွဲအောင်ခဲ့ပါတယ်။" } } },
    { pattern: "〜せいで", blank: "雨の＿＿＿、試合が中止になりました。", connection: "普通形／名詞の + せいで", note: { ja: "悪い結果の原因・理由を非難するように表す。「おかげで」の反対の意味合い。", en: "Expresses the cause of a bad result, in a blaming tone. The opposite feeling of 'おかげで'.", ne: "नराम्रो परिणामको कारण दोषारोपण गर्ने शैलीमा व्यक्त गर्छ।", vi: "Diễn tả nguyên nhân của một kết quả xấu, mang giọng điệu đổ lỗi.", my: "မကောင်းသောရလဒ်၏ အကြောင်းရင်းကို အပြစ်တင်သည့်သဘောဖြင့် ဖော်ပြသည်။" }, meaning: { en: "because of ~ (negative result)", ne: "~ को कारण (नराम्रो)", vi: "vì ~ (kết quả xấu)", my: "~ ကြောင့် (မကောင်းသောရလဒ်)" },
      example: { jp: "雨のせいで、試合が中止になりました。", reading: "あめのせいで、しあいがちゅうしになりました。", translation: { en: "Because of the rain, the match was cancelled.", ne: "पानीको कारण, खेल रद्द भयो।", vi: "Vì mưa nên trận đấu đã bị hủy.", my: "မိုးကြောင့် ပြိုင်ပွဲကို ပယ်ဖျက်ခဲ့ရတယ်။" } } },
    { pattern: "〜一方で", blank: "便利になった＿＿＿、問題も増えました。", connection: "普通形 + 一方で", note: { ja: "一つの物事の二つの側面を対比して述べる表現。", en: "Contrasts two aspects of a single matter.", ne: "एउटै विषयका दुई पक्षलाई तुलना गर्छ।", vi: "Đối chiếu hai khía cạnh của cùng một sự việc.", my: "တစ်ခုတည်းသောကိစ္စ၏ ဘက်နှစ်ဘက်ကို နှိုင်းယှဉ်ဖော်ပြသည်။" }, meaning: { en: "while ~, on the other hand", ne: "~ को साथसाथै, अर्कोतर्फ", vi: "trong khi ~, mặt khác", my: "~ ဖြစ်စဉ် တစ်ဖက်တွင်" },
      example: { jp: "便利になった一方で、問題も増えました。", reading: "べんりになったいっぽうで、もんだいもふえました。", translation: { en: "While it became convenient, problems also increased.", ne: "सुविधाजनक भएको साथसाथै, समस्या पनि बढ्यो।", vi: "Trong khi trở nên tiện lợi thì vấn đề cũng tăng lên.", my: "အဆင်ပြေလာသော်လည်း ပြဿနာလည်းများလာတယ်။" } } },
    { pattern: "〜ばかりでなく", blank: "彼は英語＿＿＿、中国語も話せます。", connection: "普通形／名詞 + ばかりでなく", note: { ja: "「〜だけでなく」とほぼ同じ意味。範囲を広げて追加する表現。", en: "Almost the same meaning as 'だけでなく'. Expands the scope by adding something.", ne: "「だけでなく」सँग उस्तै अर्थ। दायरा विस्तार गर्छ।", vi: "Gần giống nghĩa với 'だけでなく'. Mở rộng phạm vi bằng cách thêm vào.", my: "「だけでなく」နှင့် နီးစပ်သောအဓိပ္ပာယ်ရှိသည်။ နယ်ပယ်ကို ချဲ့ထွင်ဖော်ပြသည်။" }, meaning: { en: "not only ~ but also", ne: "~ मात्र होइन, त्यसबाहेक पनि", vi: "không chỉ ~ mà còn", my: "~ သာမက" },
      example: { jp: "彼は英語ばかりでなく、中国語も話せます。", reading: "かれはえいごばかりでなく、ちゅうごくごもはなせます。", translation: { en: "He can speak not only English but also Chinese.", ne: "उनी अंग्रेजी मात्र होइन, चिनियाँ भाषा पनि बोल्न सक्छन्।", vi: "Anh ấy không chỉ nói được tiếng Anh mà còn nói được tiếng Trung.", my: "သူဟာ အင်္ဂလိပ်လိုသာမက တရုတ်လိုပါ ပြောနိုင်တယ်။" } } },
    { pattern: "〜において", blank: "この分野＿＿＿、彼は専門家です。", connection: "名詞 + において", note: { ja: "「〜で」の硬い書き言葉的表現。場所・場面・分野を示す。", en: "A formal, written-style expression of '〜で', indicating place, occasion, or field.", ne: "स्थान, अवसर वा क्षेत्र जनाउने औपचारिक अभिव्यक्ति।", vi: "Cách diễn đạt trang trọng của '〜で', chỉ địa điểm, dịp, hoặc lĩnh vực.", my: "နေရာ၊ အခါအခွင့်၊ သို့မဟုတ် နယ်ပယ်ကို ညွှန်ပြသော တရားဝင်အသုံးအနှုန်း။" }, meaning: { en: "in / at (formal)", ne: "~ मा (औपचारिक)", vi: "tại / trong ~ (trang trọng)", my: "~ တွင် (တရားဝင်)" },
      example: { jp: "この分野において、彼は専門家です。", reading: "このぶんやにおいて、かれはせんもんかです。", translation: { en: "In this field, he is an expert.", ne: "यस क्षेत्रमा, उनी विशेषज्ञ हुन्।", vi: "Trong lĩnh vực này, anh ấy là chuyên gia.", my: "ဒီနယ်ပယ်မှာ သူက ကျွမ်းကျင်သူတစ်ဦးပါ။" } } },
    { pattern: "〜に対して", blank: "子供＿＿＿、優しく話しました。", connection: "名詞 + に対して", note: { ja: "動作や感情の対象・方向を示す表現。対比の意味を持つこともある。", en: "Indicates the target or direction of an action or feeling. Can also carry a contrastive nuance.", ne: "कुनै कार्य वा भावनाको लक्ष्य वा दिशा जनाउँछ।", vi: "Chỉ đối tượng hoặc hướng của một hành động hay cảm xúc.", my: "လုပ်ဆောင်ချက် သို့မဟုတ် ခံစားချက်၏ ပစ်မှတ် သို့မဟုတ် ဦးတည်ရာကို ညွှန်ပြသည်။" }, meaning: { en: "towards / in contrast to", ne: "~ को प्रति", vi: "đối với ~", my: "~ အပေါ်" },
      example: { jp: "子供に対して、優しく話しました。", reading: "こどもにたいして、やさしくはなしました。", translation: { en: "I spoke kindly towards the child.", ne: "बच्चाप्रति दयापूर्वक बोलें।", vi: "Tôi đã nói chuyện nhẹ nhàng với đứa trẻ.", my: "ကလေးကို ကြင်နာစွာ ပြောခဲ့တယ်။" } } },
  ],
  N2: [
    { pattern: "〜にもかかわらず", blank: "雨＿＿＿、試合は行われました。", connection: "普通形／名詞（＋である） + にもかかわらず", note: { ja: "予想に反する結果を強調する、やや硬い書き言葉的表現。「〜のに」より客観的で丁寧な響き。", en: "Stronger and more formal than のに.", ne: "のにभन्दा बलियो र औपचारिक।", vi: "Mạnh và trang trọng hơn のに.", my: "のに ထက် ပိုပြင်းထန်ပြီး တရားဝင်သည်။" }, meaning: { en: "despite ~", ne: "~ भए पनि (बाबजुद)", vi: "mặc dù ~", my: "~ ဖြစ်သော်လည်း" },
      example: { jp: "雨にもかかわらず、試合は行われました。", reading: "あめにもかかわらず、しあいはおこなわれました。", translation: { en: "Despite the rain, the match was held.", ne: "पानी परे तापनि, खेल भयो।", vi: "Mặc dù trời mưa, trận đấu vẫn diễn ra.", my: "မိုးရွာနေပါလျက် ပြိုင်ပွဲကို ကျင်းပခဲ့တယ်။" } } },
    { pattern: "〜に応じて", blank: "収入＿＿＿税金が変わります。", connection: "名詞 + に応じて", note: { ja: "何かの変化・状況に合わせて対応が変わることを表す。契約書や案内文でよく使われる。", en: "Something changes proportionally as a condition changes.", ne: "अवस्था बदलिँदा त्यसअनुरूप समानुपातिक रूपमा फेरिन्छ।", vi: "Điều gì đó thay đổi tương ứng khi điều kiện thay đổi.", my: "အခြေအနေပြောင်းလဲသည်နှင့်အမျှ အချိုးကျပြောင်းလဲသည်။" }, meaning: { en: "according to ~", ne: "~ अनुसार", vi: "tùy theo ~", my: "~ နှင့်အညီ" },
      example: { jp: "収入に応じて税金が変わります。", reading: "しゅうにゅうにおうじてぜいきんがかわります。", translation: { en: "Taxes vary according to income.", ne: "आयअनुसार कर फरक हुन्छ।", vi: "Thuế thay đổi tùy theo thu nhập.", my: "ဝင်ငွေနှင့်အညီ အခွန်ပြောင်းလဲသည်။" } } },
    { pattern: "〜を通じて", blank: "友人＿＿＿仕事を紹介してもらいました。", connection: "名詞 + を通じて", note: { ja: "ある手段・媒介・期間を通して物事が行われることを表す。「〜を通して」とほぼ同じ意味。", en: "Indicates a means, channel, or span of time something happens through.", ne: "माध्यम, च्यानल वा समयावधि जनाउँछ।", vi: "Chỉ phương tiện, kênh, hoặc khoảng thời gian mà điều gì đó diễn ra qua.", my: "အရာတစ်ခု ဖြစ်ပေါ်ရာ နည်းလမ်း၊ လမ်းကြောင်း သို့မဟုတ် ကာလကို ညွှန်ပြသည်။" }, meaning: { en: "through ~", ne: "~ मार्फत", vi: "thông qua ~", my: "~ မှတစ်ဆင့်" },
      example: { jp: "友人を通じて仕事を紹介してもらいました。", reading: "ゆうじんをつうじてしごとをしょうかいしてもらいました。", translation: { en: "I got a job introduced through a friend.", ne: "साथीमार्फत काम चिनाइदिए।", vi: "Tôi được giới thiệu công việc thông qua bạn bè.", my: "သူငယ်ချင်းမှတစ်ဆင့် အလုပ်မိတ်ဆက်ပေးခဲ့တယ်။" } } },
    { pattern: "〜あげく", blank: "長い間悩んだ＿＿＿、会社を辞めました。", connection: "動詞た形／名詞の + あげく", note: { ja: "長い時間や努力の末に、望ましくない結果に至ったことを表す。否定的な結末によく使われる。", en: "The final, often unfortunate, result after a long process.", ne: "लामो प्रक्रियापछिको अन्तिम, प्रायः दुर्भाग्यपूर्ण परिणाम।", vi: "Kết quả cuối cùng, thường không may, sau một quá trình dài.", my: "ကြာရှည်သောလုပ်ငန်းစဉ်တစ်ခုပြီးနောက် ရရှိသည့် နောက်ဆုံးရလဒ် (များသောအားဖြင့် ကံမကောင်းသော)။" }, meaning: { en: "after all that, ends up ~", ne: "अन्तमा ~ भयो", vi: "sau cùng lại ~", my: "နောက်ဆုံးတွင် ~" },
      example: { jp: "長い間悩んだあげく、会社を辞めました。", reading: "ながいあいだなやんだあげく、かいしゃをやめました。", translation: { en: "After much agonizing, I ended up quitting the company.", ne: "लामो समय दुविधामा परेपछि, कम्पनी छोडेँ।", vi: "Sau khi lo lắng rất lâu, cuối cùng tôi đã nghỉ việc.", my: "ကြာရှည်စိတ်ပူပြီးနောက် ကုမ္ပဏီကို နှုတ်ထွက်ခဲ့တယ်။" } } },
    { pattern: "〜つつある", blank: "状況は改善し＿＿＿。", connection: "動詞ます形（ますを取る） + つつある", note: { ja: "変化が進行中であることを表す硬い書き言葉。「〜ている」よりフォーマルな響きを持つ。", en: "A formal way of saying a change is gradually happening right now.", ne: "अहिले बिस्तारै भइरहेको परिवर्तन जनाउने औपचारिक तरिका।", vi: "Cách trang trọng để nói một sự thay đổi đang dần diễn ra ngay bây giờ.", my: "ယခုတဖြည်းဖြည်း ပြောင်းလဲနေကြောင်း ဖော်ပြသည့် တရားဝင်နည်းလမ်း။" }, meaning: { en: "in the process of ~", ne: "~ हुँदै छ", vi: "đang dần ~", my: "~ ဖြစ်လျက်ရှိသည်" },
      example: { jp: "状況は改善しつつあります。", reading: "じょうきょうはかいぜんしつつあります。", translation: { en: "The situation is gradually improving.", ne: "अवस्था सुध्रिँदै छ।", vi: "Tình hình đang dần được cải thiện.", my: "အခြေအနေက တဖြည်းဖြည်း ပိုကောင်းလာနေပါတယ်။" } } },
    { pattern: "〜ものの", blank: "約束した＿＿＿、行けませんでした。", connection: "普通形 + ものの", note: { ja: "前件を認めつつ、期待された結果にならなかったことを表す。「〜けれども」よりやや硬い言い方。", en: "Similar to のに or けど, but more literary and used in writing.", ne: "のに वा けど जस्तै तर साहित्यिक र लेखनमा प्रयोग हुन्छ।", vi: "Tương tự のに hoặc けど nhưng mang tính văn chương và dùng trong văn viết.", my: "のに သို့မဟုတ် けど နှင့်ဆင်တူသော်လည်း စာပေဆန်ပြီး ရေးသားမှုတွင်သုံး။" }, meaning: { en: "although ~", ne: "~ भए पनि", vi: "tuy ~ nhưng", my: "~ သော်လည်း" },
      example: { jp: "約束したものの、行けませんでした。", reading: "やくそくしたものの、いけませんでした。", translation: { en: "Although I promised, I couldn't go.", ne: "वाचा गरे पनि, जान सकिनँ।", vi: "Tuy đã hứa nhưng tôi không thể đi được.", my: "ကတိပေးခဲ့သော်လည်း သွားလို့မရခဲ့ပါ။" } } },
    { pattern: "〜あまり", blank: "心配の＿＿＿、眠れませんでした。", connection: "名詞の／動詞辞書形 + あまり", note: { ja: "程度が甚だしいために、望ましくない結果が起こることを表す。", en: "Expresses that an undesirable result occurs because a degree is extreme.", ne: "अत्यधिक हुनुको कारण अवांछित परिणाम हुने जनाउँछ।", vi: "Diễn tả một kết quả không mong muốn xảy ra vì mức độ quá lớn.", my: "ဒီဂရီအလွန်အကျွံဖြစ်ခြင်းကြောင့် မလိုလားအပ်သောရလဒ်ဖြစ်ပေါ်ခြင်းကို ဖော်ပြသည်။" }, meaning: { en: "due to excessive ~", ne: "अत्यधिक ~ को कारण", vi: "do quá ~", my: "~ လွန်းသောကြောင့်" },
      example: { jp: "心配のあまり、眠れませんでした。", reading: "しんぱいのあまり、ねむれませんでした。", translation: { en: "Due to excessive worry, I couldn't sleep.", ne: "अत्यधिक चिन्ताको कारण, सुत्न सकिनँ।", vi: "Vì quá lo lắng nên tôi không ngủ được.", my: "စိတ်ပူလွန်းလို့ အိပ်မပျော်ခဲ့ဘူး။" } } },
    { pattern: "〜反面", blank: "この仕事は給料がいい＿＿＿、忙しいです。", connection: "普通形 + 反面", note: { ja: "一つの物事の相反する二つの側面を述べる表現。「一方で」と似ている。", en: "States two opposing aspects of a single matter, similar to '一方で'.", ne: "「一方で」जस्तै एउटै विषयका दुई विपरीत पक्ष व्यक्त गर्छ।", vi: "Nêu ra hai khía cạnh trái ngược nhau của cùng một sự việc, tương tự '一方で'.", my: "「一方で」ကဲ့သို့ တစ်ခုတည်းသောကိစ္စ၏ ဆန့်ကျင်ဘက်နှစ်ဘက်ကို ဖော်ပြသည်။" }, meaning: { en: "while ~ / conversely", ne: "~ भएतापनि, अर्कोतर्फ", vi: "trong khi ~, ngược lại", my: "~ သော်လည်း တစ်ဖက်တွင်" },
      example: { jp: "この仕事は給料がいい反面、忙しいです。", reading: "このしごとはきゅうりょうがいいはんめん、いそがしいです。", translation: { en: "While this job pays well, it's busy.", ne: "यो कामले तलब राम्रो दिने भएतापनि, व्यस्त छ।", vi: "Công việc này lương cao nhưng lại bận rộn.", my: "ဒီအလုပ်က လစာကောင်းသော်လည်း အလုပ်များပါတယ်။" } } },
    { pattern: "〜ないことには", blank: "やってみ＿＿＿、分かりません。", connection: "動詞ない形 + ことには", note: { ja: "前提となる条件が満たされないと、後の事態も成立しないことを表す。", en: "Expresses that a following situation cannot be realized unless a precondition is met.", ne: "पूर्वशर्त पूरा नभएसम्म पछिको अवस्था पनि सम्भव नहुने जनाउँछ।", vi: "Diễn tả rằng tình huống sau không thể xảy ra nếu điều kiện tiên quyết không được đáp ứng.", my: "ရှေ့ပြေးအခြေအနေမပြည့်မီပါက နောက်ဖြစ်ရပ်လည်း မဖြစ်နိုင်ကြောင်း ဖော်ပြသည်။" }, meaning: { en: "unless ~", ne: "~ नगरी", vi: "nếu không ~ thì", my: "~ မလုပ်လျှင်" },
      example: { jp: "やってみないことには、分かりません。", reading: "やってみないことには、わかりません。", translation: { en: "Unless you try, you won't know.", ne: "नगरी थाहा हुँदैन।", vi: "Nếu không thử thì sẽ không biết được.", my: "မစမ်းကြည့်ရင် မသိနိုင်ဘူး။" } } },
    { pattern: "〜からといって", blank: "お金がある＿＿＿、幸せとは限りません。", connection: "普通形 + からといって", note: { ja: "前件を理由として当然の結論を導くことを否定する表現。", en: "Negates a natural conclusion that would follow from the preceding reason.", ne: "अघिल्लो कारणबाट स्वाभाविक निष्कर्ष निकाल्नुलाई अस्वीकार गर्छ।", vi: "Phủ định một kết luận đương nhiên rút ra từ lý do phía trước.", my: "ရှေ့ကအကြောင်းပြချက်မှ ရလာမည့်သဘာဝကျသောနိဂုံးကို ငြင်းဆန်သည်။" }, meaning: { en: "just because ~ doesn't mean", ne: "~ भन्दैमा भन्ने होइन", vi: "không phải vì ~ mà", my: "~ လို့တော့ မဟုတ်ဘူး" },
      example: { jp: "お金があるからといって、幸せとは限りません。", reading: "おかねがあるからといって、しあわせとはかぎりません。", translation: { en: "Just because you have money doesn't mean you're happy.", ne: "पैसा भएकै भरमा खुसी हुन्छ भन्न सकिँदैन।", vi: "Không phải vì có tiền mà chắc chắn hạnh phúc.", my: "ငွေရှိလို့ ပျော်ရွှင်တယ်လို့တော့ မဆိုနိုင်ဘူး။" } } },
    { pattern: "〜に違いない", blank: "あの様子だと、彼は疲れている＿＿＿。", connection: "普通形 + に違いない", note: { ja: "話し手の強い確信に基づく推測を表す。", en: "Expresses a strong conviction based on the speaker's judgment.", ne: "वक्ताको दृढ विश्वासमा आधारित अनुमान जनाउँछ।", vi: "Diễn tả sự tin chắc mạnh mẽ dựa trên phán đoán của người nói.", my: "ပြောသူ၏ ခိုင်မာသောယုံကြည်ချက်အပေါ်အခြေခံသည့် ခန့်မှန်းချက်ကို ဖော်ပြသည်။" }, meaning: { en: "must be / surely", ne: "अवश्य नै ~ हुनुपर्छ", vi: "chắc chắn là ~", my: "~ မုချဖြစ်ရမည်" },
      example: { jp: "あの様子だと、彼は疲れているに違いない。", reading: "あのようすだと、かれはつかれているにちがいない。", translation: { en: "Given that appearance, he must be tired.", ne: "त्यो हावभावले गर्दा, उनी थाकेको हुनुपर्छ।", vi: "Nhìn vẻ đó thì chắc là anh ấy đang mệt.", my: "အဲဒီပုံစံအရ သူပင်ပန်းနေမှာ သေချာတယ်။" } } },
    { pattern: "〜わりに", blank: "この店は安い＿＿＿、おいしいです。", connection: "普通形／名詞の + わりに", note: { ja: "前件から予想される程度と、実際の結果が違うことを表す。", en: "Expresses that the actual result differs from what would be expected based on the preceding condition.", ne: "अघिल्लो अवस्थाबाट अपेक्षा गरिएको भन्दा वास्तविक नतिजा फरक भएको जनाउँछ।", vi: "Diễn tả rằng kết quả thực tế khác với những gì được dự đoán từ điều kiện phía trước.", my: "ရှေ့ကအခြေအနေမှခန့်မှန်းရသောအရာနှင့် အမှန်တကယ်ရလဒ်ကွာခြားခြင်းကို ဖော်ပြသည်။" }, meaning: { en: "considering ~ / relatively", ne: "~ को तुलनामा", vi: "so với ~ thì", my: "~ နှင့်နှိုင်းယှဉ်လျှင်" },
      example: { jp: "この店は安いわりに、おいしいです。", reading: "このみせはやすいわりに、おいしいです。", translation: { en: "Considering it's cheap, this restaurant is delicious.", ne: "सस्तो भएको तुलनामा, यो रेस्टुरेन्ट स्वादिष्ट छ।", vi: "So với giá rẻ thì quán này khá ngon.", my: "စျေးသက်သာတဲ့နှိုင်းရင် ဒီဆိုင်က အရသာရှိတယ်။" } } },
  ],
  N1: [
    { pattern: "〜にたえない", blank: "見る＿＿＿光景でした。", connection: "動詞辞書形（見る・聞くなど） + にたえない", note: { ja: "感情が強すぎて抑えられない、または見る・聞くに値しないという意味を表す硬い表現。", en: "Literary; used for very strong emotional reactions, like something too sad to watch.", ne: "साहित्यिक; कडा भावनात्मक प्रतिक्रियाको लागि, जस्तै हेर्नै नसकिने दुःखद कुरा।", vi: "Mang tính văn chương, dùng cho phản ứng cảm xúc rất mạnh, như điều gì đó quá buồn để xem.", my: "စာပေဆန်သည်၊ ကြည့်ရှုရန် အလွန်ဝမ်းနည်းစရာကောင်းသကဲ့သို့ ပြင်းထန်သောခံစားချက်များအတွက် သုံး။" }, meaning: { en: "cannot bear to ~", ne: "~ सहन नसक्नु", vi: "không chịu nổi ~", my: "~ ကို မခံရပ်နိုင်" },
      example: { jp: "見るにたえない光景でした。", reading: "みるにたえないこうけいでした。", translation: { en: "It was a sight too painful to watch.", ne: "हेर्नै नसकिने दृश्य थियो।", vi: "Đó là một cảnh tượng không thể chịu nổi khi nhìn.", my: "ကြည့်ရလို့ မခံရပ်နိုင်တဲ့ မြင်ကွင်းပါ။" } } },
    { pattern: "〜をもって", blank: "本日＿＿＿閉店いたします。", connection: "名詞 + をもって", note: { ja: "「〜で」の改まった言い方。手段・期限・基準を示し、式辞や案内文でよく使われる。", en: "Formal; often seen in official announcements about timing or means.", ne: "औपचारिक; समय वा माध्यमको आधिकारिक घोषणामा प्रायः देखिन्छ।", vi: "Trang trọng, thường thấy trong thông báo chính thức về thời gian hoặc phương tiện.", my: "တရားဝင်သည်၊ အချိန် သို့မဟုတ် နည်းလမ်းဆိုင်ရာ တရားဝင်ကြေညာချက်များတွင် အများဆုံးတွေ့ရ။" }, meaning: { en: "by means of ~ / with ~", ne: "~ द्वारा", vi: "bằng ~", my: "~ ဖြင့်" },
      example: { jp: "本日をもって閉店いたします。", reading: "ほんじつをもってへいてんいたします。", translation: { en: "As of today, we are closing the store.", ne: "आजैदेखि पसल बन्द हुनेछ।", vi: "Kể từ hôm nay, cửa hàng sẽ đóng cửa.", my: "ယနေ့နေ့ရက်မှစ၍ ဆိုင်ကို ပိတ်ပါမည်။" } } },
    { pattern: "〜べからず", blank: "初心忘る＿＿＿。", connection: "動詞辞書形 + べからず", note: { ja: "「〜してはいけない」の文語的・格言的な表現。掲示物や古い言い回しに残る。", en: "An archaic, formal prohibition, often seen on signs or in proverbs today.", ne: "पुरानो, औपचारिक निषेध, आजकल प्रायः साइन वा उखानमा देखिन्छ।", vi: "Cấm đoán cổ, trang trọng, ngày nay thường thấy trên biển báo hoặc tục ngữ.", my: "ရှေးဟောင်း၊ တရားဝင် တားမြစ်ချက်ဖြစ်ပြီး ယနေ့ခေတ်တွင် ဆိုင်းဘုတ်များ သို့မဟုတ် ဆိုရိုးများတွင် တွေ့ရသည်။" }, meaning: { en: "must not ~ (formal)", ne: "~ गर्नु हुँदैन (औपचारिक)", vi: "không được phép ~ (trang trọng)", my: "~ မလုပ်ရ (တရားဝင်)" },
      example: { jp: "初心忘るべからず。", reading: "しょしんわするべからず。", translation: { en: "One must not forget one's original resolve.", ne: "पहिलो संकल्प बिर्सनु हुँदैन।", vi: "Không được quên tâm nguyện ban đầu.", my: "ကနဦးရည်ရွယ်ချက်ကို မမေ့ရ။" } } },
    { pattern: "〜ならでは", blank: "これは京都＿＿＿の味です。", connection: "名詞 + ならでは", note: { ja: "そのものだけが持つ、他では味わえない価値や特徴を強調する表現。褒め言葉としてよく使う。", en: "Highlights something special that only this particular subject can offer.", ne: "यो विशेष विषयले मात्र दिन सक्ने कुरालाई हाइलाइट गर्छ।", vi: "Nhấn mạnh điều đặc biệt chỉ riêng chủ thể này mới có thể mang lại.", my: "ဤအထူးဘာသာရပ်တစ်ခုတည်းသာ ပေးနိုင်သည့် အထူးအချက်ကို မီးမောင်းထိုးပြသည်။" }, meaning: { en: "uniquely ~ / only ~ can", ne: "~ बाहेक अरू कसैले सक्दैन", vi: "chỉ có ~ mới", my: "~ ၏သာ (ထူးခြားချက်)" },
      example: { jp: "これは京都ならではの味です。", reading: "これはきょうとならではのあじです。", translation: { en: "This is a flavor unique to Kyoto.", ne: "यो क्योतोमा मात्र पाइने स्वाद हो।", vi: "Đây là hương vị chỉ có ở Kyoto.", my: "ဒါက ကျိုတိုမှာသာ ရှိတဲ့ အရသာပါ။" } } },
    { pattern: "〜きらいがある", blank: "彼は物事を悲観的に考える＿＿＿。", connection: "動詞辞書形 + きらいがある", note: { ja: "好ましくない傾向がときどき見られることを、遠回しに指摘する表現。", en: "Describes a mild but persistent negative tendency in someone.", ne: "हल्का तर निरन्तर रहने नकारात्मक झुकाव वर्णन गर्छ।", vi: "Mô tả một xu hướng tiêu cực nhẹ nhưng dai dẳng ở ai đó.", my: "လူတစ်ဦး၌ ပေါ့ပါးသော်လည်း စွဲမြဲသော အနှုတ်လက္ခဏာဆောင် ခေတ်ရေစီးကြောင်းကို ဖော်ပြသည်။" }, meaning: { en: "tend to ~ (negative tendency)", ne: "~ गर्ने प्रवृत्ति हुनु", vi: "có xu hướng ~ (không tốt)", my: "~ လုပ်လေ့ရှိသည် (မကောင်းသော ဆိုးရွား)" },
      example: { jp: "彼は物事を悲観的に考えるきらいがある。", reading: "かれはものごとをひかんてきにかんがえるきらいがある。", translation: { en: "He tends to think about things pessimistically.", ne: "उसमा कुरालाई निराशावादी ढंगले सोच्ने प्रवृत्ति छ।", vi: "Anh ấy có xu hướng suy nghĩ bi quan về mọi thứ.", my: "သူက အရာအားလုံးကို စိတ်ပျက်ဖွယ်ရာ တွေးလေ့ရှိတယ်။" } } },
    { pattern: "〜んがため", blank: "夢を叶え＿＿＿努力しています。", connection: "動詞ない形（ない→ん） + がため", note: { ja: "「〜するために」の文語的な言い方。現代の会話ではあまり使われず、文章語や演説に残る表現。", en: "Very literary and old-fashioned; rarely heard in everyday conversation.", ne: "धेरै साहित्यिक र पुरानो शैली; दैनिक कुराकानीमा विरलै सुनिन्छ।", vi: "Rất văn chương và cổ điển, hiếm khi được nghe trong hội thoại hàng ngày.", my: "အလွန်စာပေဆန်ပြီး ဟောင်းနွမ်းသည်၊ နေ့စဉ်စကားပြောတွင် ရှားရှားပါးပါးသာ ကြားရသည်။" }, meaning: { en: "in order to ~ (literary)", ne: "~ को लागि (साहित्यिक)", vi: "vì để ~ (văn viết cổ)", my: "~ ဖြစ်စေရန် (စာပေဆန်)" },
      example: { jp: "夢を叶えんがために努力しています。", reading: "ゆめをかなえんがためにどりょくしています。", translation: { en: "I am making efforts in order to fulfill my dream.", ne: "सपना पूरा गर्नकै लागि मेहनत गरिरहेको छु।", vi: "Tôi đang nỗ lực để thực hiện ước mơ của mình.", my: "အိပ်မက်ကို ဖြစ်စေရန် ကြိုးစားနေပါတယ်။" } } },
    { pattern: "〜べく", blank: "目標を達成する＿＿＿、努力を続けています。", connection: "動詞辞書形 + べく", note: { ja: "「〜するために」の硬い書き言葉的表現。目的を表す。", en: "A formal, written-style expression of '〜するために'. Expresses purpose.", ne: "「〜するために」को औपचारिक लिखित रूप। उद्देश्य व्यक्त गर्छ।", vi: "Cách diễn đạt trang trọng của '〜するために'. Diễn tả mục đích.", my: "「〜するために」၏ တရားဝင်စာပေဆန်သောအသုံးအနှုန်း။ ရည်ရွယ်ချက်ကို ဖော်ပြသည်။" }, meaning: { en: "in order to ~ (formal)", ne: "~ को लागि (औपचारिक)", vi: "để mà ~ (trang trọng)", my: "~ ဖြစ်ရန် (တရားဝင်)" },
      example: { jp: "目標を達成すべく、努力を続けています。", reading: "もくひょうをたっせいすべく、どりょくをつづけています。", translation: { en: "In order to achieve the goal, I continue to make efforts.", ne: "लक्ष्य हासिल गर्नका लागि, प्रयास जारी राखेको छु।", vi: "Để đạt được mục tiêu, tôi tiếp tục nỗ lực.", my: "ရည်မှန်းချက်ကို အောင်မြင်ရန် ကြိုးစားနေဆဲပါ။" } } },
    { pattern: "〜てやまない", blank: "ご成功を願っ＿＿＿。", connection: "動詞て形 + やまない", note: { ja: "強い感情がずっと続いていることを表す、硬い書き言葉。", en: "Expresses that a strong feeling continues without stopping. A formal, written expression.", ne: "गहिरो भावना निरन्तर रहेको जनाउने औपचारिक अभिव्यक्ति।", vi: "Diễn tả một cảm xúc mạnh mẽ tiếp tục không dừng lại. Cách diễn đạt trang trọng.", my: "ပြင်းထန်သောခံစားချက်တစ်ခု မရပ်တန့်ဘဲဆက်လက်တည်ရှိနေခြင်းကို ဖော်ပြသော တရားဝင်အသုံးအနှုန်း။" }, meaning: { en: "never stop ~ing (strong feeling)", ne: "~ रोकिँदैन (गहिरो भावना)", vi: "không ngừng ~ (cảm xúc mạnh mẽ)", my: "~ ရပ်တန့်မသွားပါ (ပြင်းထန်သောခံစားချက်)" },
      example: { jp: "ご成功を願ってやみません。", reading: "ごせいこうをねがってやみません。", translation: { en: "I sincerely wish for your success.", ne: "तपाईंको सफलताको लागि हार्दिक कामना गर्दछु।", vi: "Tôi thành tâm cầu chúc cho sự thành công của bạn.", my: "သင့်အောင်မြင်မှုကို စိတ်ရင်းမှန်နှင့် ဆုတောင်းပါတယ်။" } } },
    { pattern: "〜極まりない", blank: "彼の態度は失礼＿＿＿。", connection: "な形容詞語幹 + 極まりない", note: { ja: "程度が非常に甚だしいことを強調する硬い表現。", en: "A formal expression emphasizing that a degree is extremely severe.", ne: "मात्रा अत्यन्तै धेरै भएको जोड दिने औपचारिक अभिव्यक्ति।", vi: "Cách diễn đạt trang trọng nhấn mạnh mức độ cực kỳ nghiêm trọng.", my: "ဒီဂရီအလွန်ပြင်းထန်ကြောင်း အလေးထားဖော်ပြသော တရားဝင်အသုံးအနှုန်း။" }, meaning: { en: "extremely ~", ne: "अत्यन्तै ~", vi: "cực kỳ ~", my: "~ လွန်းသော (အလွန်ဆုံး)" },
      example: { jp: "彼の態度は失礼極まりない。", reading: "かれのたいどはしつれいきわまりない。", translation: { en: "His attitude is extremely rude.", ne: "उनको व्यवहार अत्यन्तै अशिष्ट छ।", vi: "Thái độ của anh ta cực kỳ thô lỗ.", my: "သူ့သဘောထားက အလွန်ရိုင်းစိုင်းတယ်။" } } },
    { pattern: "〜なくして", blank: "努力＿＿＿、成功はありません。", connection: "名詞 + なくして", note: { ja: "「〜がなければ」の硬い書き言葉的表現。", en: "A formal, written-style expression of '〜がなければ'.", ne: "「〜がなければ」को औपचारिक लिखित रूप।", vi: "Cách diễn đạt trang trọng của '〜がなければ'.", my: "「〜がなければ」၏ တရားဝင်စာပေဆန်သောအသုံးအနှုန်း။" }, meaning: { en: "without ~", ne: "~ बिना", vi: "nếu không có ~", my: "~ မရှိဘဲ" },
      example: { jp: "努力なくして、成功はありません。", reading: "どりょくなくして、せいこうはありません。", translation: { en: "Without effort, there is no success.", ne: "प्रयास बिना, सफलता हुँदैन।", vi: "Không có nỗ lực thì không có thành công.", my: "ကြိုးစားမှုမရှိဘဲ အောင်မြင်မှုမရှိနိုင်ပါ။" } } },
    { pattern: "〜もさることながら", blank: "味＿＿＿、見た目も美しい料理です。", connection: "名詞 + もさることながら", note: { ja: "前のことも重要だが、後のこともそれ以上に重要だと述べる表現。", en: "States that the preceding matter is important, but the following matter is even more so.", ne: "अघिल्लो कुरा पनि महत्त्वपूर्ण छ तर पछिल्लो कुरा त्योभन्दा बढी महत्त्वपूर्ण छ भनी व्यक्त गर्छ।", vi: "Nêu rằng điều trước cũng quan trọng, nhưng điều sau còn quan trọng hơn.", my: "ရှေ့ကအရာလည်း အရေးကြီးသော်လည်း နောက်ကအရာက ပိုမိုအရေးကြီးကြောင်း ဖော်ပြသည်။" }, meaning: { en: "not to mention ~, also", ne: "~ त छँदैछ, त्यसबाहेक पनि", vi: "~ đã đành, mà còn", my: "~ ကိုမပြောနှင့်၊ ~ လည်း" },
      example: { jp: "味もさることながら、見た目も美しい料理です。", reading: "あじもさることながら、みためもうつくしいりょうりです。", translation: { en: "Not to mention the taste, the dish is also beautiful to look at.", ne: "स्वाद त छँदैछ, यो परिकार देख्दा पनि सुन्दर छ।", vi: "Hương vị đã đành, món ăn còn đẹp mắt nữa.", my: "အရသာကိုတော့မပြောနှင့် အသွင်အပြင်ကလည်း လှပါတယ်။" } } },
    { pattern: "〜を余儀なくされる", blank: "台風のため、旅行の中止＿＿＿。", connection: "名詞 + を余儀なくされる", note: { ja: "本人の意志に反して、そうせざるを得ない状況になることを表す硬い表現。", en: "A formal expression indicating being forced into a situation against one's will.", ne: "आफ्नो इच्छाविपरीत त्यस्तो अवस्थामा पर्न बाध्य हुने जनाउने औपचारिक अभिव्यक्ति।", vi: "Cách diễn đạt trang trọng chỉ việc bị buộc vào một tình huống trái với ý muốn.", my: "မိမိဆန္ဒနှင့်ဆန့်ကျင်၍ အခြေအနေတစ်ခုထဲသို့ တွန်းအားဖြင့်ဝင်ရောက်ရသည့် တရားဝင်အသုံးအနှုန်း။" }, meaning: { en: "to be forced to ~", ne: "~ गर्न बाध्य हुनु", vi: "buộc phải ~", my: "~ ဖြစ်ရန် တွန်းအားပေးခံရသည်" },
      example: { jp: "台風のため、旅行の中止を余儀なくされた。", reading: "たいふうのため、りょこうのちゅうしをよぎなくされた。", translation: { en: "Due to the typhoon, we were forced to cancel the trip.", ne: "आँधीको कारण, हामी यात्रा रद्द गर्न बाध्य भयौं।", vi: "Do bão nên chúng tôi buộc phải hủy chuyến đi.", my: "မုန်တိုင်းကြောင့် ခရီးစဉ်ကို ပယ်ဖျက်ရန် တွန်းအားခံခဲ့ရပါတယ်။" } } },
  ],
};

// Reading comprehension passages per level: passage {jp, reading, translation}, questions[]: {question:{jp,translation}, choices:[{jp,translation}], answer:index}
const READING = {
  N5: {
    title: { en: "My Day", ne: "मेरो दिन", vi: "Một ngày của tôi", my: "ကျွန်တော့်တစ်နေ့" },
    qtype: "内容理解（短文）",
    passage: {
      jp: "わたしは朝六時に起きます。それから朝ご飯を食べます。九時に会社へ行きます。仕事の後、友達と晩ご飯を食べます。夜十一時に寝ます。",
      reading: "わたしはあさろくじにおきます。それからあさごはんをたべます。くじにかいしゃへいきます。しごとのあと、ともだちとばんごはんをたべます。よるじゅういちじにねます。",
      translation: { en: "I wake up at six in the morning. After that, I eat breakfast. At nine, I go to the office. After work, I eat dinner with a friend. I go to sleep at eleven at night.",
        ne: "म बिहान छ बजे उठ्छु। त्यसपछि नाश्ता खान्छु। नौ बजे कार्यालय जान्छु। काम पछि साथीसँग बेलुका खाना खान्छु। राति एघार बजे सुत्छु।",
        vi: "Tôi thức dậy lúc sáu giờ sáng. Sau đó tôi ăn sáng. Chín giờ tôi đi làm. Sau khi làm việc, tôi ăn tối với bạn. Tôi đi ngủ lúc mười một giờ đêm.",
        my: "ကျွန်တော် မနက် ၆ နာရီမှာ နိုးပါတယ်။ ပြီးရင် မနက်စာစားပါတယ်။ ၉ နာရီမှာ ရုံးသွားပါတယ်။ အလုပ်ပြီးရင် သူငယ်ချင်းနဲ့ ညစာစားပါတယ်။ ည ၁၁ နာရီမှာ အိပ်ပါတယ်။" } },
    questions: [
      { question: { jp: "何時に起きますか。", translation: { en: "What time does the person wake up?", ne: "व्यक्ति कति बजे उठ्छ?", vi: "Người này thức dậy lúc mấy giờ?", my: "ဘယ်နှစ်နာရီမှာ နိုးလဲ။" } },
        choices: [ { jp: "六時", translation: { en: "6 o'clock", ne: "छ बजे", vi: "6 giờ", my: "၆ နာရီ" } },
          { jp: "九時", translation: { en: "9 o'clock", ne: "नौ बजे", vi: "9 giờ", my: "၉ နာရီ" } },
          { jp: "十一時", translation: { en: "11 o'clock", ne: "एघार बजे", vi: "11 giờ", my: "၁၁ နာရီ" } } , { jp: "三時", translation: { en: "3 o'clock", ne: "तीन बजे", vi: "3 giờ", my: "၃ နာရီ" } } ], answer: 0 },
      { question: { jp: "晩ご飯は誰と食べますか。", translation: { en: "Who does the person eat dinner with?", ne: "व्यक्तिले साँझको खाना कोसँग खान्छ?", vi: "Người này ăn tối với ai?", my: "ညစာကို ဘယ်သူနဲ့ စားလဲ။" } },
        choices: [ { jp: "家族", translation: { en: "family", ne: "परिवार", vi: "gia đình", my: "မိသားစု" } },
          { jp: "友達", translation: { en: "a friend", ne: "साथी", vi: "bạn bè", my: "သူငယ်ချင်း" } },
          { jp: "一人で", translation: { en: "alone", ne: "एक्लै", vi: "một mình", my: "တစ်ယောက်တည်း" } } , { jp: "同僚", translation: { en: "a colleague", ne: "सहकर्मी", vi: "đồng nghiệp", my: "လုပ်ဖော်ကိုင်ဖက်" } } ], answer: 1 },
    ],
  },
  N4: {
    title: { en: "Climbing a Mountain", ne: "पहाड चढ्दा", vi: "Leo núi", my: "တောင်တက်ခြင်း" },
    qtype: "内容理解（短文）",
    passage: {
      jp: "先週の日曜日、私は久しぶりに山に登りました。天気が良かったので、遠くの景色もよく見えました。少し疲れましたが、とても楽しかったです。また来月、別の山に登ってみたいと思っています。",
      reading: "せんしゅうのにちようび、わたしはひさしぶりにやまにのぼりました。てんきがよかったので、とおくのけしきもよくみえました。すこしつかれましたが、とてもたのしかったです。またらいげつ、べつのやまにのぼってみたいとおもっています。",
      translation: { en: "Last Sunday, I climbed a mountain for the first time in a while. Because the weather was good, I could see the distant scenery well. I got a bit tired, but it was a lot of fun. I want to try climbing a different mountain again next month.",
        ne: "गएको आइतबार, म धेरै समयपछि पहाड चढेँ। मौसम राम्रो भएकोले, टाढाको दृश्य पनि राम्ररी देखियो। अलि थकित भएँ, तर धेरै रमाइलो थियो। अर्को महिना फेरि अर्को पहाड चढ्ने सोचिरहेको छु।",
        vi: "Chủ nhật tuần trước, sau một thời gian dài tôi đã đi leo núi. Vì thời tiết đẹp nên tôi cũng nhìn thấy rõ cảnh vật ở xa. Tôi hơi mệt nhưng rất vui. Tháng sau tôi muốn thử leo một ngọn núi khác.",
        my: "ပြီးခဲ့တဲ့တနင်္ဂနွေနေ့မှာ ကြာကြာနေပြီးမှ တောင်တက်ခဲ့ပါတယ်။ ရာသီဥတုကောင်းလို့ ဝေးဝေးက မြင်ကွင်းလည်း ကောင်းကောင်းမြင်ရပါတယ်။ နည်းနည်းပင်ပန်းပေမယ့် အရမ်းပျော်ရွှင်ခဲ့ပါတယ်။ လာမည့်လမှာ တခြားတောင်တစ်လုံးတက်ကြည့်ချင်ပါတယ်။" } },
    questions: [
      { question: { jp: "先週の日曜日、何をしましたか。", translation: { en: "What did the person do last Sunday?", ne: "गएको आइतबार व्यक्तिले के गर्‍यो?", vi: "Người này đã làm gì vào Chủ nhật tuần trước?", my: "ပြီးခဲ့တဲ့တနင်္ဂနွေနေ့ ဘာလုပ်ခဲ့လဲ။" } },
        choices: [ { jp: "山に登った", translation: { en: "climbed a mountain", ne: "पहाड चढ्यो", vi: "leo núi", my: "တောင်တက်ခဲ့သည်" } },
          { jp: "映画を見た", translation: { en: "watched a movie", ne: "चलचित्र हेर्यो", vi: "xem phim", my: "ရုပ်ရှင်ကြည့်ခဲ့သည်" } },
          { jp: "家で休んだ", translation: { en: "rested at home", ne: "घरमा आराम गर्यो", vi: "nghỉ ở nhà", my: "အိမ်မှာနားခဲ့သည်" } } , { jp: "買い物に行った", translation: { en: "went shopping", ne: "किनमेल गयो", vi: "đi mua sắm", my: "ဈေးဝယ်သွားခဲ့သည်" } } ], answer: 0 },
      { question: { jp: "天気はどうでしたか。", translation: { en: "How was the weather?", ne: "मौसम कस्तो थियो?", vi: "Thời tiết như thế nào?", my: "ရာသီဥတု ဘယ်လိုရှိလဲ။" } },
        choices: [ { jp: "良かった", translation: { en: "good", ne: "राम्रो थियो", vi: "đẹp", my: "ကောင်းခဲ့သည်" } },
          { jp: "悪かった", translation: { en: "bad", ne: "नराम्रो थियो", vi: "xấu", my: "မကောင်းခဲ့" } },
          { jp: "寒かった", translation: { en: "cold", ne: "जाडो थियो", vi: "lạnh", my: "အေးခဲ့သည်" } } , { jp: "暑かった", translation: { en: "hot", ne: "गर्मी थियो", vi: "nóng", my: "ပူပြင်းခဲ့သည်" } } ], answer: 0 },
    ],
  },
  N3: {
    title: { en: "The Plastic Waste Problem", ne: "प्लास्टिक फोहोरको समस्या", vi: "Vấn đề rác thải nhựa", my: "ပလတ်စတစ်အမှိုက်ပြဿနာ" },
    qtype: "内容理解（短文）",
    passage: {
      jp: "最近、プラスチックごみの問題が深刻になっています。環境を守るためには、一人一人が行動を変える必要があります。例えば、買い物のときに袋を持って行けば、レジ袋を減らすことができます。小さなことでも、みんなで続ければ大きな変化につながるはずです。",
      reading: "さいきん、プラスチックごみのもんだいがしんこくになっています。かんきょうをまもるためには、ひとりひとりがこうどうをかえるひつようがあります。たとえば、かいもののときにふくろをもっていけば、レジぶくろをへらすことができます。ちいさなことでも、みんなでつづければおおきなへんかにつながるはずです。",
      translation: { en: "Recently, the problem of plastic waste has become serious. To protect the environment, each individual needs to change their behavior. For example, if you bring a bag when shopping, you can reduce plastic bags. Even small things, if everyone keeps doing them, should lead to a big change.",
        ne: "आजकल, प्लास्टिक फोहोरको समस्या गम्भीर बन्दै गएको छ। वातावरण जोगाउनका लागि, प्रत्येक व्यक्तिले आफ्नो व्यवहार बदल्नु आवश्यक छ। उदाहरणका लागि, किनमेल गर्दा झोला लगे भने, प्लास्टिक झोला घटाउन सकिन्छ। सानो कुरा भए पनि, सबैले जारी राखे ठूलो परिवर्तनमा पुग्छ।",
        vi: "Gần đây, vấn đề rác thải nhựa đã trở nên nghiêm trọng. Để bảo vệ môi trường, mỗi người cần thay đổi hành động của mình. Ví dụ, nếu mang túi khi đi mua sắm, có thể giảm túi ni lông. Dù là việc nhỏ, nếu mọi người cùng duy trì thì chắc chắn sẽ dẫn đến thay đổi lớn.",
        my: "မကြာသေးမီက ပလတ်စတစ်အမှိုက်ပြဿနာက အလေးအနက်ရှိလာပါတယ်။ သဘာဝပတ်ဝန်းကျင်ကို ကာကွယ်ဖို့ လူတစ်ဦးချင်းစီ အပြုအမူပြောင်းဖို့ လိုအပ်ပါတယ်။ ဥပမာ ဈေးဝယ်တဲ့အခါ အိတ်ယူသွားရင် ပလတ်စတစ်အိတ်ကို လျှော့ချနိုင်ပါတယ်။ သေးငယ်တဲ့ကိစ္စဖြစ်ပေမယ့် အားလုံးဆက်လုပ်ရင် ပြောင်းလဲမှုကြီးကို ဖြစ်ပေါ်စေမှာပါ။" } },
    questions: [
      { question: { jp: "何の問題について話していますか。", translation: { en: "What problem is being discussed?", ne: "कुन समस्याको बारेमा कुरा भइरहेको छ?", vi: "Vấn đề gì đang được nói đến?", my: "ဘာပြဿနာအကြောင်း ပြောနေတာလဲ။" } },
        choices: [ { jp: "プラスチックごみ", translation: { en: "plastic waste", ne: "प्लास्टिक फोहोर", vi: "rác thải nhựa", my: "ပလတ်စတစ်အမှိုက်" } },
          { jp: "食べ物", translation: { en: "food", ne: "खाना", vi: "thức ăn", my: "အစားအစာ" } },
          { jp: "交通", translation: { en: "traffic", ne: "यातायात", vi: "giao thông", my: "သွားလာရေး" } } , { jp: "水不足", translation: { en: "water shortage", ne: "पानीको अभाव", vi: "thiếu nước", my: "ရေရှားပါးမှု" } } ], answer: 0 },
      { question: { jp: "買い物のとき何をすれば、レジ袋を減らせますか。", translation: { en: "What can you do while shopping to reduce plastic bags?", ne: "किनमेल गर्दा के गर्दा प्लास्टिक झोला घटाउन सकिन्छ?", vi: "Làm gì khi mua sắm để giảm túi ni lông?", my: "ဈေးဝယ်တဲ့အခါ ဘာလုပ်ရင် ပလတ်စတစ်အိတ်လျှော့ချနိုင်လဲ။" } },
        choices: [ { jp: "袋を持って行く", translation: { en: "bring your own bag", ne: "झोला बोकेर जाने", vi: "mang túi theo", my: "အိတ်ယူသွားခြင်း" } },
          { jp: "お金を払う", translation: { en: "pay money", ne: "पैसा तिर्ने", vi: "trả tiền", my: "ငွေပေးချေခြင်း" } },
          { jp: "車で行く", translation: { en: "go by car", ne: "गाडीमा जाने", vi: "đi bằng ô tô", my: "ကားနှင့်သွားခြင်း" } } , { jp: "早く行く", translation: { en: "go early", ne: "चाँडो जाने", vi: "đi sớm", my: "စောစောသွားခြင်း" } } ], answer: 0 },
    ],
  },
  N2: {
    title: { en: "Changing Ways of Working", ne: "कामको तरिकामा परिवर्तन", vi: "Sự thay đổi trong cách làm việc", my: "အလုပ်လုပ်ပုံပြောင်းလဲမှု" },
    qtype: "内容理解（短文）",
    passage: {
      jp: "働き方は近年大きく変わりつつある。在宅勤務を導入する企業が増えているにもかかわらず、まだ多くの職場では出社が当たり前とされている。しかし、通勤時間が減ることで、社員の満足度が上がったという調査結果もある。今後、企業は柔軟な働き方をさらに検討する必要があるだろう。",
      reading: "はたらきかたはきんねんおおきくかわりつつある。ざいたくきんむをどうにゅうするきぎょうがふえているにもかかわらず、まだおおくのしょくばではしゅっしゃがあたりまえとされている。しかし、つうきんじかんがへることで、しゃいんのまんぞくどがあがったというちょうさけっかもある。こんご、きぎょうはじゅうなんなはたらきかたをさらにけんとうするひつようがあるだろう。",
      translation: { en: "Ways of working have been changing greatly in recent years. Even though more companies are introducing remote work, coming into the office is still considered normal at many workplaces. However, there is also survey data showing that employee satisfaction rose as commuting time decreased. Companies will likely need to consider more flexible ways of working going forward.",
        ne: "पछिल्ला वर्षहरूमा कामको तरिका ठूलो रूपमा परिवर्तन हुँदैछ। घरबाट काम गर्ने कम्पनीहरू बढिरहेको भए तापनि, धेरै कार्यस्थलमा अझै पनि कार्यालय आउनुलाई सामान्य मानिन्छ। तर, ओहोरदोहोरको समय घट्दा कर्मचारीको सन्तुष्टि बढेको सर्वेक्षण पनि छ। भविष्यमा कम्पनीहरूले लचिलो काम गर्ने तरिकाबारे थप विचार गर्नुपर्ने देखिन्छ।",
        vi: "Cách làm việc đã thay đổi nhiều trong những năm gần đây. Mặc dù ngày càng nhiều công ty áp dụng làm việc từ xa, nhưng ở nhiều nơi làm việc, đi làm tại văn phòng vẫn được coi là điều bình thường. Tuy nhiên, cũng có kết quả khảo sát cho thấy sự hài lòng của nhân viên tăng lên khi thời gian đi lại giảm. Trong tương lai, các công ty có lẽ cần xem xét thêm về cách làm việc linh hoạt hơn.",
        my: "အလုပ်လုပ်ပုံက ခုနှစ်အနည်းငယ်အတွင်း များစွာပြောင်းလဲလျက်ရှိသည်။ အိမ်မှအလုပ်လုပ်ခြင်းကို စတင်အသုံးပြုသော ကုမ္ပဏီများ တိုးလာနေသော်လည်း အလုပ်ခွင်အများစုတွင် ရုံးသို့လာရောက်ခြင်းကို ပုံမှန်အဖြစ် သတ်မှတ်ဆဲဖြစ်သည်။ သို့သော် သွားလာချိန်လျော့ကျခြင်းကြောင့် ဝန်ထမ်းများ၏ စိတ်ကျေနပ်မှု တိုးလာသည့် စစ်တမ်းရလဒ်လည်းရှိသည်။ ယခုနောက်ပိုင်း ကုမ္ပဏီများအနေဖြင့် ပြောင်းလွယ်ပြင်လွယ် အလုပ်လုပ်ပုံများကို ထပ်မံစဉ်းစားရန် လိုအပ်လာမည်ဖြစ်သည်။" } },
    questions: [
      { question: { jp: "何について書かれた文章ですか。", translation: { en: "What is this passage about?", ne: "यो अनुच्छेद केको बारेमा हो?", vi: "Đoạn văn này nói về điều gì?", my: "ဒီစာပိုဒ်က ဘာအကြောင်းရေးထားလဲ။" } },
        choices: [ { jp: "働き方の変化", translation: { en: "changes in ways of working", ne: "काम गर्ने तरिकामा परिवर्तन", vi: "sự thay đổi trong cách làm việc", my: "အလုပ်လုပ်ပုံပြောင်းလဲမှု" } },
          { jp: "旅行の計画", translation: { en: "travel plans", ne: "यात्रा योजना", vi: "kế hoạch du lịch", my: "ခရီးစဉ်အစီအစဉ်" } },
          { jp: "食生活", translation: { en: "eating habits", ne: "खानपानको बानी", vi: "thói quen ăn uống", my: "အစားအသောက်ဓလေ့" } } , { jp: "教育制度", translation: { en: "the education system", ne: "शिक्षा प्रणाली", vi: "hệ thống giáo dục", my: "ပညာရေးစနစ်" } } ], answer: 0 },
      { question: { jp: "在宅勤務についてどんな調査結果がありますか。", translation: { en: "What survey result is there about remote work?", ne: "घरबाट कामको बारेमा कस्तो सर्वेक्षण नतिजा छ?", vi: "Có kết quả khảo sát nào về làm việc từ xa?", my: "အိမ်မှအလုပ်လုပ်ခြင်းအကြောင်း ဘယ်လိုစစ်တမ်းရလဒ်ရှိလဲ။" } },
        choices: [ { jp: "満足度が上がった", translation: { en: "satisfaction increased", ne: "सन्तुष्टि बढ्यो", vi: "sự hài lòng tăng lên", my: "စိတ်ကျေနပ်မှုတိုးလာခဲ့" } },
          { jp: "売上が下がった", translation: { en: "sales decreased", ne: "बिक्री घट्यो", vi: "doanh thu giảm", my: "ရောင်းအားကျဆင်းခဲ့" } },
          { jp: "社員が減った", translation: { en: "number of employees decreased", ne: "कर्मचारी घटे", vi: "số nhân viên giảm", my: "ဝန်ထမ်းအရေအတွက်လျော့ကျခဲ့" } } , { jp: "利益が増えた", translation: { en: "profit increased", ne: "नाफा बढ्यो", vi: "lợi nhuận tăng", my: "အမြတ်ငွေတိုးလာသည်" } } ], answer: 0 },
    ],
  },
  N1: {
    title: { en: "Technology and Ethical Challenges", ne: "प्रविधि र नैतिक चुनौती", vi: "Công nghệ và thách thức đạo đức", my: "နည်းပညာနှင့် ကျင့်ဝတ်စိန်ခေါ်မှုများ" },
    qtype: "内容理解（短文）",
    passage: {
      jp: "科学技術の発展はめざましいものの、それに伴う倫理的な課題も増加している。特に人工知能の分野では、判断の透明性が確保されていないまま実用化が進むケースも見受けられ、専門家からは懸念の声が上がっている。技術の恩恵を享受しつつ、その責任をどう分担するかが、今後の重要な論点となるだろう。",
      reading: "かがくぎじゅつのはってんはめざましいものの、それにともなうりんりてきなかだいもぞうかしている。とくにじんこうちのうのぶんやでは、はんだんのとうめいせいがかくほされていないままじつようかがすすむケースもみうけられ、せんもんかからはけねんのこえがあがっている。ぎじゅつのおんけいをきょうじゅしつつ、そのせきにんをどうぶんたんするかが、こんごのじゅうようなろんてんとなるだろう。",
      translation: { en: "Although the development of science and technology is remarkable, the ethical challenges that come with it are also increasing. Especially in the field of artificial intelligence, there are cases where practical use is proceeding without ensuring transparency of decision-making, and experts have raised concerns. How to share responsibility while enjoying the benefits of technology will likely become an important point of discussion going forward.",
        ne: "विज्ञान र प्रविधिको विकास उल्लेखनीय भए तापनि, यसका साथसाथै नैतिक चुनौतीहरू पनि बढिरहेका छन्। विशेष गरी कृत्रिम बुद्धिमत्ताको क्षेत्रमा, निर्णयको पारदर्शिता सुनिश्चित नगरी व्यावहारिक प्रयोग अगाडि बढेका उदाहरणहरू पनि देखिन्छन्, र विज्ञहरूले चिन्ता व्यक्त गरिरहेका छन्। प्रविधिको फाइदा उठाउँदै, त्यसको जिम्मेवारी कसरी बाँड्ने भन्ने कुरा भविष्यको महत्त्वपूर्ण बहसको विषय बन्नेछ।",
        vi: "Mặc dù sự phát triển của khoa học công nghệ rất đáng chú ý, nhưng những thách thức đạo đức đi kèm cũng đang gia tăng. Đặc biệt trong lĩnh vực trí tuệ nhân tạo, có những trường hợp việc ứng dụng thực tế được tiến hành mà chưa đảm bảo tính minh bạch trong việc ra quyết định, khiến các chuyên gia lên tiếng lo ngại. Việc làm sao để chia sẻ trách nhiệm trong khi vẫn hưởng lợi từ công nghệ sẽ là một điểm tranh luận quan trọng trong tương lai.",
        my: "သိပ္ပံနှင့်နည်းပညာဖွံ့ဖြိုးတိုးတက်မှုက ထူးခြားပေမယ့် ၎င်းနှင့်အတူ ကျင့်ဝတ်ဆိုင်ရာစိန်ခေါ်မှုများလည်း တိုးများလာနေပါသည်။ အထူးသဖြင့် ဉာဏ်ရည်တု နယ်ပယ်တွင် ဆုံးဖြတ်ချက်၏ ပွင့်လင်းမြင်သာမှုကို မသေချာစေဘဲ လက်တွေ့အသုံးချမှု ရှေ့ဆက်နေသောကိစ္စများလည်း တွေ့ရပြီး ကျွမ်းကျင်သူများထံမှ စိုးရိမ်သံများ ထွက်ပေါ်လျက်ရှိသည်။ နည်းပညာ၏ အကျိုးကျေးဇူးကို ခံစားရင်း တာဝန်ကို မည်သို့ခွဲဝေမည်ဆိုသည်မှာ ယခုနောက်ပိုင်း အရေးကြီးသော ဆွေးနွေးမှုအချက်ဖြစ်လာမည်။" } },
    questions: [
      { question: { jp: "何が増加していると述べていますか。", translation: { en: "What is said to be increasing?", ne: "के बढिरहेको भनिएको छ?", vi: "Điều gì được cho là đang gia tăng?", my: "ဘာတိုးများလာတယ်လို့ ဆိုထားလဲ။" } },
        choices: [ { jp: "倫理的な課題", translation: { en: "ethical challenges", ne: "नैतिक चुनौती", vi: "thách thức đạo đức", my: "ကျင့်ဝတ်ဆိုင်ရာစိန်ခေါ်မှု" } },
          { jp: "技術者の数", translation: { en: "the number of engineers", ne: "इन्जिनियरहरूको संख्या", vi: "số lượng kỹ sư", my: "အင်ဂျင်နီယာအရေအတွက်" } },
          { jp: "利用者の満足度", translation: { en: "user satisfaction", ne: "प्रयोगकर्ताको सन्तुष्टि", vi: "sự hài lòng của người dùng", my: "အသုံးပြုသူ၏ ကျေနပ်မှု" } } , { jp: "法律の数", translation: { en: "the number of laws", ne: "कानूनको संख्या", vi: "số lượng luật", my: "ဥပဒေအရေအတွက်" } } ], answer: 0 },
      { question: { jp: "専門家はどんな声を上げていますか。", translation: { en: "What kind of voice are experts raising?", ne: "विज्ञहरूले कस्तो आवाज उठाइरहेका छन्?", vi: "Các chuyên gia đang lên tiếng như thế nào?", my: "ကျွမ်းကျင်သူများက ဘယ်လိုအသံမျိုးထွက်နေလဲ။" } },
        choices: [ { jp: "懸念", translation: { en: "concern", ne: "चिन्ता", vi: "lo ngại", my: "စိုးရိမ်မှု" } },
          { jp: "称賛", translation: { en: "praise", ne: "प्रशंसा", vi: "khen ngợi", my: "ချီးမွမ်းမှု" } },
          { jp: "無関心", translation: { en: "indifference", ne: "बेवास्ता", vi: "thờ ơ", my: "ဂရုမစိုက်မှု" } } , { jp: "驚き", translation: { en: "surprise", ne: "आश्चर्य", vi: "ngạc nhiên", my: "အံ့သြမှု" } } ], answer: 0 },
    ],
  },
};

// Listening comprehension: script hidden until played/revealed. Same shape as READING entries.
const LISTENING = {
  N5: {
    title: { en: "At a Restaurant", ne: "रेस्टुरेन्टमा", vi: "Tại nhà hàng", my: "စားသောက်ဆိုင်တွင်" },
    qtype: "課題理解",
    passage: {
      jp: "きょう、レストランで晩ご飯を食べます。わたしはラーメンを食べます。友達はすしを食べます。二人ともお茶を飲みます。",
      reading: "きょう、レストランでばんごはんをたべます。わたしはラーメンをたべます。ともだちはすしをたべます。ふたりともおちゃをのみます。",
      translation: { en: "Today we're eating dinner at a restaurant. I eat ramen. My friend eats sushi. Both of us drink tea.",
        ne: "आज हामी रेस्टुरेन्टमा साँझको खाना खान्छौं। म रामेन खान्छु। साथीले सुशी खान्छ। हामी दुबैले चिया पिउँछौं।",
        vi: "Hôm nay chúng tôi ăn tối ở nhà hàng. Tôi ăn mì ramen. Bạn tôi ăn sushi. Cả hai chúng tôi đều uống trà.",
        my: "ဒီနေ့ ဆိုင်မှာ ညစာစားကြမယ်။ ကျွန်တော် ရာမင်းစားမယ်။ သူငယ်ချင်း ဆူရှီစားမယ်။ နှစ်ယောက်လုံး လက်ဖက်ရည်သောက်ကြမယ်။" } },
    questions: [
      { question: { jp: "わたしは何を食べますか。", translation: { en: "What does the speaker eat?", ne: "बोल्नेले के खान्छ?", vi: "Người nói ăn gì?", my: "ပြောသူ ဘာစားမလဲ။" } },
        choices: [ { jp: "ラーメン", translation: { en: "ramen", ne: "रामेन", vi: "mì ramen", my: "ရာမင်း" } },
          { jp: "すし", translation: { en: "sushi", ne: "सुशी", vi: "sushi", my: "ဆူရှီ" } },
          { jp: "パン", translation: { en: "bread", ne: "रोटी", vi: "bánh mì", my: "ပေါင်မုန့်" } } , { jp: "うどん", translation: { en: "udon", ne: "उदोन", vi: "udon", my: "ဥဒွန်" } } ], answer: 0 },
      { question: { jp: "二人は何を飲みますか。", translation: { en: "What do the two of them drink?", ne: "दुई जनाले के पिउँछन्?", vi: "Hai người uống gì?", my: "နှစ်ယောက်စလုံး ဘာသောက်ကြလဲ။" } },
        choices: [ { jp: "お茶", translation: { en: "tea", ne: "चिया", vi: "trà", my: "လက်ဖက်ရည်" } },
          { jp: "コーヒー", translation: { en: "coffee", ne: "कफी", vi: "cà phê", my: "ကော်ဖီ" } },
          { jp: "ジュース", translation: { en: "juice", ne: "जुस", vi: "nước ép", my: "ဖျော်ရည်" } } , { jp: "水", translation: { en: "water", ne: "पानी", vi: "nước", my: "ရေ" } } ], answer: 0 },
    ],
  },
  N4: {
    title: { en: "A Trip to Osaka", ne: "ओसाकाको यात्रा", vi: "Chuyến đi Osaka", my: "အိုဆာကာခရီးစဉ်" },
    qtype: "課題理解",
    passage: {
      jp: "来週、大阪へ旅行に行きます。新幹線で行くつもりです。二泊三日の予定で、たこ焼きを食べたり、お城を見たりする予定です。楽しみにしています。",
      reading: "らいしゅう、おおさかへりょこうにいきます。しんかんせんでいくつもりです。にはくみっかのよていで、たこやきをたべたり、おしろをみたりするよていです。たのしみにしています。",
      translation: { en: "Next week, I'm going on a trip to Osaka. I plan to go by shinkansen. It's a three-day, two-night trip, and I plan to eat takoyaki and see the castle. I'm looking forward to it.",
        ne: "अर्को हप्ता, म ओसाका यात्रामा जान्छु। म शिन्कान्सेनबाट जाने योजना छ। दुई रात तीन दिनको योजनामा, ताकोयाकी खाने र किल्ला हेर्ने योजना छ। म पर्खिरहेको छु।",
        vi: "Tuần sau, tôi sẽ đi du lịch Osaka. Tôi định đi bằng tàu shinkansen. Chuyến đi kéo dài ba ngày hai đêm, tôi dự định ăn takoyaki và tham quan lâu đài. Tôi rất mong chờ.",
        my: "လာမည့်အပတ် အိုဆာကာသို့ ခရီးထွက်မယ်။ ရှင်ကန်းဆန်းရထားနဲ့ သွားမယ်လို့ စိတ်ကူးထားတယ်။ ညနှစ်ညနေ့သုံးရက် အစီအစဉ်ဖြင့် တာကိုယာကီ စားမယ်၊ ရဲတိုက်ကြည့်မယ်။ စောင့်မျှော်နေပါတယ်။" } },
    questions: [
      { question: { jp: "どこへ行きますか。", translation: { en: "Where are they going?", ne: "उनी कहाँ जान्छन्?", vi: "Họ đi đâu?", my: "ဘယ်ကိုသွားမလဲ။" } },
        choices: [ { jp: "大阪", translation: { en: "Osaka", ne: "ओसाका", vi: "Osaka", my: "အိုဆာကာ" } },
          { jp: "東京", translation: { en: "Tokyo", ne: "टोकियो", vi: "Tokyo", my: "တိုကျို" } },
          { jp: "北海道", translation: { en: "Hokkaido", ne: "होक्काइदो", vi: "Hokkaido", my: "ဟိုကိုက်ဒို" } } , { jp: "京都", translation: { en: "Kyoto", ne: "क्योतो", vi: "Kyoto", my: "ကျိုတို" } } ], answer: 0 },
      { question: { jp: "何で行きますか。", translation: { en: "How are they going?", ne: "कसरी जान्छन्?", vi: "Họ đi bằng gì?", my: "ဘာနဲ့သွားမလဲ။" } },
        choices: [ { jp: "新幹線", translation: { en: "shinkansen (bullet train)", ne: "शिन्कान्सेन", vi: "shinkansen", my: "ရှင်ကန်းဆန်း" } },
          { jp: "飛行機", translation: { en: "airplane", ne: "हवाइजहाज", vi: "máy bay", my: "လေယာဉ်" } },
          { jp: "バス", translation: { en: "bus", ne: "बस", vi: "xe buýt", my: "ဘတ်စ်ကား" } } , { jp: "車", translation: { en: "car", ne: "गाडी", vi: "ô tô", my: "ကား" } } ], answer: 0 },
    ],
  },
  N3: {
    title: { en: "A Change in Work Hours", ne: "कामको समयमा परिवर्तन", vi: "Thay đổi giờ làm việc", my: "အလုပ်ချိန်ပြောင်းလဲမှု" },
    qtype: "課題理解",
    passage: {
      jp: "来月から、会社の勤務時間が変わることになりました。今までより三十分早く始まって、三十分早く終わります。通勤ラッシュを避けられるので、社員の多くはこの変更を歓迎しています。",
      reading: "らいげつから、かいしゃのきんむじかんがかわることになりました。いままでよりさんじゅっぷんはやくはじまって、さんじゅっぷんはやくおわります。つうきんラッシュをさけられるので、しゃいんのおおくはこのへんこうをかんげいしています。",
      translation: { en: "Starting next month, the company's work hours are going to change. It will start thirty minutes earlier and end thirty minutes earlier than before. Since employees can avoid the commuter rush, many of them welcome this change.",
        ne: "अर्को महिनादेखि, कम्पनीको काम गर्ने समय परिवर्तन हुनेछ। पहिलेभन्दा तीस मिनेट चाँडो सुरु भएर तीस मिनेट चाँडो सकिन्छ। ओहोरदोहोरको भीडभाड बच्न सकिने भएकोले, धेरै कर्मचारीले यो परिवर्तनलाई स्वागत गरेका छन्।",
        vi: "Từ tháng sau, giờ làm việc của công ty sẽ thay đổi. Sẽ bắt đầu sớm hơn ba mươi phút và kết thúc sớm hơn ba mươi phút so với trước đây. Vì có thể tránh được giờ cao điểm đi làm, nhiều nhân viên hoan nghênh sự thay đổi này.",
        my: "လာမည့်လမှစပြီး ကုမ္ပဏီရဲ့ အလုပ်ချိန်ပြောင်းလဲတော့မယ်။ ယခင်ထက် မိနစ်၃၀စောပြီး စတင်ပြီး မိနစ်၃၀စောပြီးပြီးဆုံးမယ်။ သွားလာချိန်ကျပ်တည်းမှုကို ရှောင်ရှားနိုင်တဲ့အတွက် ဝန်ထမ်းအများစုက ဒီပြောင်းလဲမှုကို ကြိုဆိုကြပါတယ်။" } },
    questions: [
      { question: { jp: "勤務時間はどう変わりますか。", translation: { en: "How will the work hours change?", ne: "काम गर्ने समय कसरी परिवर्तन हुन्छ?", vi: "Giờ làm việc sẽ thay đổi như thế nào?", my: "အလုပ်ချိန် ဘယ်လိုပြောင်းလဲမလဲ။" } },
        choices: [ { jp: "三十分早くなる", translation: { en: "it will be thirty minutes earlier", ne: "तीस मिनेट चाँडो हुन्छ", vi: "sớm hơn ba mươi phút", my: "မိနစ်၃၀စောလာမယ်" } },
          { jp: "三十分遅くなる", translation: { en: "it will be thirty minutes later", ne: "तीस मिनेट ढिलो हुन्छ", vi: "muộn hơn ba mươi phút", my: "မိနစ်၃၀နောက်ကျသွားမယ်" } },
          { jp: "変わらない", translation: { en: "it won't change", ne: "परिवर्तन हुँदैन", vi: "không thay đổi", my: "မပြောင်းလဲပါ" } } , { jp: "一時間早くなる", translation: { en: "it will be an hour earlier", ne: "एक घण्टा चाँडो हुन्छ", vi: "sớm hơn một giờ", my: "တစ်နာရီစောလာမည်" } } ], answer: 0 },
      { question: { jp: "社員はこの変更をどう思っていますか。", translation: { en: "What do employees think of this change?", ne: "कर्मचारीहरूले यो परिवर्तनलाई कसरी लिन्छन्?", vi: "Nhân viên nghĩ gì về sự thay đổi này?", my: "ဝန်ထမ်းတွေ ဒီပြောင်းလဲမှုကို ဘယ်လိုထင်ကြသလဲ။" } },
        choices: [ { jp: "歓迎している", translation: { en: "they welcome it", ne: "स्वागत गर्छन्", vi: "hoan nghênh", my: "ကြိုဆိုကြသည်" } },
          { jp: "反対している", translation: { en: "they oppose it", ne: "विरोध गर्छन्", vi: "phản đối", my: "ကန့်ကွက်ကြသည်" } },
          { jp: "興味がない", translation: { en: "they're not interested", ne: "चासो छैन", vi: "không quan tâm", my: "စိတ်မဝင်စားကြပါ" } } , { jp: "驚いている", translation: { en: "they are surprised", ne: "आश्चर्यचकित छन्", vi: "họ ngạc nhiên", my: "အံ့သြနေကြသည်" } } ], answer: 0 },
    ],
  },
  N2: {
    title: { en: "Population Decline", ne: "जनसंख्या ह्रास", vi: "Suy giảm dân số", my: "လူဦးရေကျဆင်းမှု" },
    qtype: "課題理解",
    passage: {
      jp: "先日発表された調査によると、この地域の人口はここ十年で約二割減少したことがわかった。特に若い世代の減少が目立ち、地元自治体は移住者を増やすための対策を進めている。",
      reading: "せんじつはっぴょうされたちょうさによると、このちいきのじんこうはここじゅうねんでやくにわりげんしょうしたことがわかった。とくにわかいせだいのげんしょうがめだち、じもとじちたいはいじゅうしゃをふやすためのたいさくをすすめている。",
      translation: { en: "According to a survey published recently, it has become clear that the population of this region has decreased by about twenty percent over the past ten years. The decrease in the younger generation stands out especially, and the local government is pushing forward measures to increase the number of new residents.",
        ne: "हालै प्रकाशित सर्वेक्षण अनुसार, यस क्षेत्रको जनसंख्या पछिल्लो दस वर्षमा लगभग बीस प्रतिशतले घटेको देखिन्छ। विशेष गरी युवा पुस्ताको कमी उल्लेखनीय छ, र स्थानीय प्रशासनले बसाइँसराइ बढाउने उपायहरू अगाडि बढाइरहेको छ।",
        vi: "Theo một khảo sát được công bố gần đây, dân số của khu vực này đã giảm khoảng hai mươi phần trăm trong mười năm qua. Đặc biệt là sự sụt giảm ở thế hệ trẻ rất rõ rệt, và chính quyền địa phương đang thúc đẩy các biện pháp để tăng số người di cư đến.",
        my: "မကြာသေးမီက ထုတ်ပြန်ခဲ့သော စစ်တမ်းအရ ဒီဒေသရဲ့ လူဦးရေဟာ လွန်ခဲ့တဲ့ဆယ်နှစ်အတွင်း ၂၀ ရာခိုင်နှုန်းခန့် လျော့ကျသွားကြောင်း သိရပါတယ်။ အထူးသဖြင့် လူငယ်မျိုးဆက် လျော့ကျမှုက ထင်ရှားပြီး ဒေသန္တရအစိုးရအဖွဲ့က ရွှေ့ပြောင်းလာသူများ တိုးများစေရန် အစီအမံများ တိုးမြှင့်ဆောင်ရွက်နေသည်။" } },
    questions: [
      { question: { jp: "人口はどのくらい減少しましたか。", translation: { en: "By how much has the population decreased?", ne: "जनसंख्या कति घटेको छ?", vi: "Dân số đã giảm bao nhiêu?", my: "လူဦးရေ ဘယ်လောက်လျော့ကျခဲ့လဲ။" } },
        choices: [ { jp: "約二割", translation: { en: "about 20%", ne: "लगभग बीस प्रतिशत", vi: "khoảng 20%", my: "၂၀ရာခိုင်နှုန်းခန့်" } },
          { jp: "約五割", translation: { en: "about 50%", ne: "लगभग पचास प्रतिशत", vi: "khoảng 50%", my: "၅၀ရာခိုင်နှုန်းခန့်" } },
          { jp: "約一割", translation: { en: "about 10%", ne: "लगभग दस प्रतिशत", vi: "khoảng 10%", my: "၁၀ရာခိုင်နှုန်းခန့်" } } , { jp: "約三割", translation: { en: "about 30%", ne: "लगभग तीस प्रतिशत", vi: "khoảng 30%", my: "၃၀ရာခိုင်နှုန်းခန့်" } } ], answer: 0 },
      { question: { jp: "自治体は何をしていますか。", translation: { en: "What is the local government doing?", ne: "स्थानीय प्रशासनले के गरिरहेको छ?", vi: "Chính quyền địa phương đang làm gì?", my: "ဒေသန္တရအစိုးရအဖွဲ့က ဘာလုပ်နေလဲ။" } },
        choices: [ { jp: "移住者を増やす対策", translation: { en: "measures to increase new residents", ne: "बसाइँसराइ बढाउने उपाय", vi: "biện pháp tăng người di cư đến", my: "ရွှေ့ပြောင်းလာသူတိုးများရေးအစီအမံ" } },
          { jp: "税金を上げる", translation: { en: "raising taxes", ne: "कर बढाउने", vi: "tăng thuế", my: "အခွန်တိုးမြှင့်ခြင်း" } },
          { jp: "学校を建てる", translation: { en: "building schools", ne: "विद्यालय निर्माण गर्ने", vi: "xây trường học", my: "ကျောင်းများဆောက်လုပ်ခြင်း" } } , { jp: "道路を作る", translation: { en: "building roads", ne: "सडक निर्माण गर्ने", vi: "xây đường", my: "လမ်းများဆောက်လုပ်ခြင်း" } } ], answer: 0 },
    ],
  },
  N1: {
    title: { en: "AI and Employment", ne: "एआई र रोजगारी", vi: "AI và việc làm", my: "AI နှင့် အလုပ်အကိုင်" },
    qtype: "課題理解",
    passage: {
      jp: "人工知能の普及にともない、雇用への影響を懸念する声が高まっている。一方で、新しい職種が生まれる可能性を指摘する専門家もおり、議論は一様ではない。今後は、教育制度の見直しを含めた包括的な対応が求められるだろう。",
      reading: "じんこうちのうのふきゅうにともない、こようへのえいきょうをけねんするこえがたかまっている。いっぽうで、あたらしいしょくしゅがうまれるかのうせいをしてきするせんもんかもおり、ぎろんはいちようではない。こんごは、きょういくせいどのみなおしをふくめたほうかつてきなたいおうがもとめられるだろう。",
      translation: { en: "With the spread of artificial intelligence, voices of concern about its impact on employment are growing. On the other hand, some experts point out the possibility that new types of jobs will be created, and the discussion is not uniform. Going forward, a comprehensive response, including a review of the education system, will likely be needed.",
        ne: "कृत्रिम बुद्धिमत्ताको विस्तारसँगै रोजगारीमा पर्ने असरको चिन्ता बढिरहेको छ। अर्कोतर्फ, नयाँ पेशाहरू सिर्जना हुने सम्भावना औंल्याउने विज्ञहरू पनि छन्, र बहस एकनासको छैन। भविष्यमा शिक्षा प्रणालीको पुनरावलोकन सहितको समग्र प्रतिक्रिया आवश्यक हुनेछ।",
        vi: "Cùng với sự phổ biến của trí tuệ nhân tạo, những tiếng nói lo ngại về ảnh hưởng đến việc làm đang gia tăng. Mặt khác, cũng có chuyên gia chỉ ra khả năng các loại công việc mới sẽ ra đời, và cuộc tranh luận không hề thống nhất. Trong tương lai, có lẽ cần có phản ứng toàn diện, bao gồm cả việc xem xét lại hệ thống giáo dục.",
        my: "ဉာဏ်ရည်တု ပျံ့နှံ့လာခြင်းနှင့်အတူ အလုပ်အကိုင်အပေါ် သက်ရောက်မှုကို စိုးရိမ်သောအသံများ မြင့်တက်လာနေသည်။ တစ်ဖက်တွင်မူ အလုပ်အကိုင်အမျိုးအစားအသစ်များ ပေါ်ပေါက်နိုင်ခြေကို ထောက်ပြသော ကျွမ်းကျင်သူများလည်းရှိပြီး ဆွေးနွေးမှုသည် တစ်ညီတည်းမဟုတ်ပါ။ ယခုနောက်ပိုင်း ပညာရေးစနစ်ပြန်လည်သုံးသပ်မှုအပါအဝင် ပြည့်စုံသောတုံ့ပြန်မှု လိုအပ်လာမည်ဖြစ်သည်။" } },
    questions: [
      { question: { jp: "何への影響が懸念されていますか。", translation: { en: "The impact on what is a concern?", ne: "केमा पर्ने असरको चिन्ता छ?", vi: "Ảnh hưởng đến điều gì đang được lo ngại?", my: "ဘာအပေါ် သက်ရောက်မှုကို စိုးရိမ်နေကြလဲ။" } },
        choices: [ { jp: "雇用", translation: { en: "employment", ne: "रोजगारी", vi: "việc làm", my: "အလုပ်အကိုင်" } },
          { jp: "環境", translation: { en: "the environment", ne: "वातावरण", vi: "môi trường", my: "သဘာဝပတ်ဝန်းကျင်" } },
          { jp: "健康", translation: { en: "health", ne: "स्वास्थ्य", vi: "sức khỏe", my: "ကျန်းမာရေး" } } , { jp: "経済成長", translation: { en: "economic growth", ne: "आर्थिक वृद्धि", vi: "tăng trưởng kinh tế", my: "စီးပွားရေးတိုးတက်မှု" } } ], answer: 0 },
      { question: { jp: "専門家の意見はどうですか。", translation: { en: "What are the experts' opinions like?", ne: "विज्ञहरूको विचार कस्तो छ?", vi: "Ý kiến của các chuyên gia như thế nào?", my: "ကျွမ်းကျင်သူများ၏ အမြင်က ဘယ်လိုရှိလဲ။" } },
        choices: [ { jp: "一様ではない", translation: { en: "not uniform", ne: "एकनासको छैन", vi: "không thống nhất", my: "တစ်ညီတည်းမဟုတ်" } },
          { jp: "全員反対", translation: { en: "everyone opposes", ne: "सबैले विरोध गर्छन्", vi: "tất cả đều phản đối", my: "အားလုံးကန့်ကွက်ကြသည်" } },
          { jp: "全員賛成", translation: { en: "everyone agrees", ne: "सबैले सहमति जनाउँछन्", vi: "tất cả đều đồng ý", my: "အားလုံးသဘောတူကြသည်" } } , { jp: "無関心", translation: { en: "indifference", ne: "बेवास्ता", vi: "thờ ơ", my: "ဂရုမစိုက်မှု" } } ], answer: 0 },
    ],
  },
};

// Second question type per level: READING_B = 情報検索 (notice/ad style), LISTENING_B = ポイント理解 (point comprehension)
const READING_B = {
  N5: {
    title: { en: "Library Notice", ne: "पुस्तकालयको सूचना", vi: "Thông báo thư viện", my: "စာကြည့်တိုက်အသိပေးချက်" },
    qtype: "情報検索",
    passage: {
      jp: "としょかんからのおしらせです。来週の月曜日から水曜日まで、図書館はお休みです。本を返す人は、木曜日に来てください。木曜日から新しい本もたくさん見られます。",
      reading: "としょかんからのおしらせです。らいしゅうのげつようびからすいようびまで、としょかんはおやすみです。ほんをかえすひとは、もくようびにきてください。もくようびからあたらしいほんもたくさんみられます。",
      translation: { en: "This is a notice from the library. From next Monday to Wednesday, the library is closed. Those returning books, please come on Thursday. From Thursday, you can also see many new books.",
        ne: "यो पुस्तकालयको सूचना हो। अर्को सोमबारदेखि बुधबारसम्म पुस्तकालय बन्द रहनेछ। किताब फिर्ता गर्नेहरू बिहीबार आउनुहोस्। बिहीबारदेखि धेरै नयाँ किताबहरू पनि हेर्न सकिन्छ।",
        vi: "Đây là thông báo từ thư viện. Từ thứ Hai đến thứ Tư tuần sau, thư viện đóng cửa. Những ai trả sách xin hãy đến vào thứ Năm. Từ thứ Năm cũng có thể xem nhiều sách mới.",
        my: "စာကြည့်တိုက်မှ အသိပေးချက်ဖြစ်ပါသည်။ လာမည့်တနင်္လာနေ့မှ ဗုဒ္ဓဟူးနေ့အထိ စာကြည့်တိုက်ပိတ်ပါမည်။ စာအုပ်ပြန်လိုသူများကြာသပတေးနေ့တွင် လာရောက်ပါ။ ကြာသပတေးနေ့မှစပြီး စာအုပ်အသစ်များစွာလည်း ကြည့်ရှုနိုင်ပါသည်။" } },
    questions: [
      { question: { jp: "図書館はいつ休みですか。", translation: { en: "When is the library closed?", ne: "पुस्तकालय कहिले बन्द हुन्छ?", vi: "Thư viện đóng cửa khi nào?", my: "စာကြည့်တိုက် ဘယ်တော့ပိတ်လဲ။" } },
        choices: [ { jp: "月曜日から水曜日", translation: { en: "Monday to Wednesday", ne: "सोमबारदेखि बुधबार", vi: "thứ Hai đến thứ Tư", my: "တနင်္လာနေ့မှ ဗုဒ္ဓဟူးနေ့" } },
          { jp: "木曜日だけ", translation: { en: "only Thursday", ne: "बिहीबार मात्र", vi: "chỉ thứ Năm", my: "ကြာသပတေးနေ့သာ" } },
          { jp: "毎日", translation: { en: "every day", ne: "हरेक दिन", vi: "mỗi ngày", my: "နေ့စဉ်" } } , { jp: "土曜日と日曜日", translation: { en: "Saturday and Sunday", ne: "शनिबार र आइतबार", vi: "thứ Bảy và Chủ nhật", my: "စနေနှင့်တနင်္ဂနွေ" } } ], answer: 0 },
      { question: { jp: "本を返したい人はいつ行きますか。", translation: { en: "When should someone returning a book go?", ne: "किताब फिर्ता गर्न चाहनेले कहिले जाने?", vi: "Người muốn trả sách nên đến khi nào?", my: "စာအုပ်ပြန်လိုသူများ ဘယ်တော့သွားရမလဲ။" } },
        choices: [ { jp: "木曜日", translation: { en: "Thursday", ne: "बिहीबार", vi: "thứ Năm", my: "ကြာသပတေးနေ့" } },
          { jp: "月曜日", translation: { en: "Monday", ne: "सोमबार", vi: "thứ Hai", my: "တနင်္လာနေ့" } },
          { jp: "水曜日", translation: { en: "Wednesday", ne: "बुधबार", vi: "thứ Tư", my: "ဗုဒ္ဓဟူးနေ့" } } , { jp: "金曜日", translation: { en: "Friday", ne: "शुक्रबार", vi: "thứ Sáu", my: "သောကြာနေ့" } } ], answer: 0 },
    ],
  },
  N4: {
    title: { en: "Part-time Job Ad", ne: "पार्ट-टाइम कामको विज्ञापन", vi: "Quảng cáo việc làm bán thời gian", my: "အချိန်ပိုင်းအလုပ်ကြော်ငြာ" },
    qtype: "情報検索",
    passage: {
      jp: "アルバイト募集：カフェで働きませんか。時間は午前九時から午後三時までです。土曜日と日曜日も働ける人を探しています。経験がなくても大丈夫です。興味がある人は、店に電話してください。",
      reading: "アルバイトぼしゅう：カフェではたらきませんか。じかんはごぜんくじからごごさんじまでです。どようびとにちようびもはたらけるひとをさがしています。けいけんがなくてもだいじょうぶです。きょうみがあるひとは、みせにでんわしてください。",
      translation: { en: "Part-time job wanted: Would you like to work at a café? The hours are from 9am to 3pm. We're looking for someone who can also work Saturdays and Sundays. No experience necessary. If interested, please call the shop.",
        ne: "पार्ट-टाइम काम चाहिएको: क्याफेमा काम गर्नुहुन्छ? समय बिहान नौ बजेदेखि दिउँसो तीन बजेसम्म हो। शनिबार र आइतबार पनि काम गर्न सक्ने मानिस खोजिँदै छ। अनुभव नभए पनि ठीक छ। रुचि भएकाले पसलमा फोन गर्नुहोस्।",
        vi: "Tuyển nhân viên bán thời gian: Bạn có muốn làm việc ở quán cà phê không? Giờ làm từ 9 giờ sáng đến 3 giờ chiều. Chúng tôi đang tìm người có thể làm cả thứ Bảy và Chủ nhật. Không cần kinh nghiệm. Ai quan tâm xin hãy gọi điện đến cửa hàng.",
        my: "အချိန်ပိုင်းအလုပ်ခေါ်ယူခြင်း：ကော်ဖီဆိုင်မှာ အလုပ်လုပ်ချင်ပါသလား။ အလုပ်ချိန်က မနက် ၉ နာရီမှ ညနေ ၃ နာရီအထိပါ။ စနေ၊ တနင်္ဂနွေလည်း အလုပ်လုပ်နိုင်သူ ရှာနေပါသည်။ အတွေ့အကြုံမရှိလည်း ရပါသည်။ စိတ်ဝင်စားသူများ ဆိုင်ကိုဖုန်းခေါ်ပါ။" } },
    questions: [
      { question: { jp: "アルバイトの時間は何時からですか。", translation: { en: "What time does the job start?", ne: "काम कति बजेदेखि सुरु हुन्छ?", vi: "Công việc bắt đầu lúc mấy giờ?", my: "အလုပ်က ဘယ်နာရီကစတင်လဲ။" } },
        choices: [ { jp: "午前九時", translation: { en: "9am", ne: "बिहान नौ बजे", vi: "9 giờ sáng", my: "မနက် ၉ နာရီ" } },
          { jp: "午後三時", translation: { en: "3pm", ne: "दिउँसो तीन बजे", vi: "3 giờ chiều", my: "ညနေ ၃ နာရီ" } },
          { jp: "午前七時", translation: { en: "7am", ne: "बिहान सात बजे", vi: "7 giờ sáng", my: "မနက် ၇ နာရီ" } } , { jp: "午後六時", translation: { en: "6pm", ne: "साँझ छ बजे", vi: "6 giờ chiều", my: "ညနေ ၆ နာရီ" } } ], answer: 0 },
      { question: { jp: "経験が必要ですか。", translation: { en: "Is experience necessary?", ne: "अनुभव आवश्यक छ?", vi: "Có cần kinh nghiệm không?", my: "အတွေ့အကြုံလိုအပ်ပါသလား။" } },
        choices: [ { jp: "経験がなくてもいい", translation: { en: "no experience necessary", ne: "अनुभव नभए पनि हुन्छ", vi: "không cần kinh nghiệm", my: "အတွေ့အကြုံမရှိလည်းရပါသည်" } },
          { jp: "経験が必要", translation: { en: "experience is required", ne: "अनुभव आवश्यक छ", vi: "cần kinh nghiệm", my: "အတွေ့အကြုံလိုအပ်သည်" } },
          { jp: "経験は関係ない", translation: { en: "experience is irrelevant", ne: "अनुभवसँग सम्बन्ध छैन", vi: "kinh nghiệm không liên quan", my: "အတွေ့အကြုံနှင့် မသက်ဆိုင်ပါ" } } , { jp: "資格が必要", translation: { en: "a qualification is required", ne: "योग्यता आवश्यक", vi: "cần có bằng cấp", my: "အရည်အချင်းလိုအပ်သည်" } } ], answer: 0 },
    ],
  },
  N3: {
    title: { en: "Festival Postponed", ne: "उत्सव स्थगित", vi: "Lễ hội bị hoãn", my: "ပွဲတော်ရွှေ့ဆိုင်းခြင်း" },
    qtype: "情報検索",
    passage: {
      jp: "毎年八月に行われていた花火大会が、今年は天候の心配から九月に延期されることになった。主催者は、安全を第一に考えた結果だと説明している。参加を予定していた人は、新しい日程を確認してほしいと呼びかけている。",
      reading: "まいとしはちがつにおこなわれていたはなびたいかいが、ことしはてんこうのしんぱいからくがつにえんきされることになった。しゅさいしゃは、あんぜんをだいいちにかんがえたけっかだとせつめいしている。さんかをよていしていたひとは、あたらしいにっていをかくにんしてほしいとよびかけている。",
      translation: { en: "The fireworks festival, usually held every August, has been postponed to September this year due to weather concerns. The organizers explain that this is the result of prioritizing safety. Those who had planned to attend are asked to check the new schedule.",
        ne: "हरेक वर्ष अगस्टमा हुने आतिशबाजी उत्सव, यस वर्ष मौसमको चिन्ताका कारण सेप्टेम्बरमा सारिएको छ। आयोजकहरूले सुरक्षा पहिलो प्राथमिकता राखेर यो निर्णय गरेको बताएका छन्। सहभागी हुने योजना बनाएकाहरूलाई नयाँ तालिका जाँच गर्न आग्रह गरिएको छ।",
        vi: "Lễ hội pháo hoa thường được tổ chức vào tháng Tám hàng năm, năm nay đã bị hoãn sang tháng Chín do lo ngại về thời tiết. Ban tổ chức giải thích rằng đây là kết quả của việc ưu tiên an toàn lên hàng đầu. Những người dự định tham gia được kêu gọi kiểm tra lịch trình mới.",
        my: "နှစ်စဉ်သြဂုတ်လတွင်ကျင်းပလေ့ရှိသော ဂျာတီပွဲကို ဒီနှစ်တွင် ရာသီဥတုစိုးရိမ်မှုကြောင့် စက်တင်ဘာလသို့ ရွှေ့ဆိုင်းလိုက်ပါသည်။ ကျင်းပရေးအဖွဲ့က ဘေးအန္တရာယ်ကင်းစေရေးကို ဦးစားပေးထားသည့်ရလဒ်ဖြစ်ကြောင်း ရှင်းပြထားသည်။ တက်ရောက်ရန် စီစဉ်ထားသူများအား အချိန်ဇယားအသစ်ကို စစ်ဆေးကြည့်ရန် တောင်းဆိုထားသည်။" } },
    questions: [
      { question: { jp: "花火大会はいつからいつに変更されましたか。", translation: { en: "When was the fireworks festival changed from and to?", ne: "आतिशबाजी उत्सव कहिलेदेखि कहिलेमा परिवर्तन भयो?", vi: "Lễ hội pháo hoa đã được thay đổi từ khi nào sang khi nào?", my: "ဂျာတီပွဲကို ဘယ်အချိန်မှဘယ်အချိန်သို့ ပြောင်းလဲခဲ့လဲ။" } },
        choices: [ { jp: "八月から九月", translation: { en: "from August to September", ne: "अगस्टदेखि सेप्टेम्बरमा", vi: "từ tháng Tám sang tháng Chín", my: "သြဂုတ်လမှ စက်တင်ဘာလသို့" } },
          { jp: "九月から八月", translation: { en: "from September to August", ne: "सेप्टेम्बरदेखि अगस्टमा", vi: "từ tháng Chín sang tháng Tám", my: "စက်တင်ဘာလမှ သြဂုတ်လသို့" } },
          { jp: "変更なし", translation: { en: "no change", ne: "परिवर्तन छैन", vi: "không thay đổi", my: "ပြောင်းလဲမှုမရှိ" } } , { jp: "七月から八月", translation: { en: "from July to August", ne: "जुलाईदेखि अगस्टमा", vi: "từ tháng Bảy sang tháng Tám", my: "ဇူလိုင်လမှ သြဂုတ်လသို့" } } ], answer: 0 },
      { question: { jp: "なぜ延期されましたか。", translation: { en: "Why was it postponed?", ne: "किन स्थगित गरियो?", vi: "Tại sao bị hoãn?", my: "ဘာကြောင့်ရွှေ့ဆိုင်းခဲ့လဲ။" } },
        choices: [ { jp: "天候の心配のため", translation: { en: "due to weather concerns", ne: "मौसमको चिन्ताका कारण", vi: "vì lo ngại thời tiết", my: "ရာသီဥတုစိုးရိမ်မှုကြောင့်" } },
          { jp: "参加者が少ないため", translation: { en: "due to few participants", ne: "सहभागी थोरै भएकाले", vi: "vì ít người tham gia", my: "ပါဝင်သူနည်းသောကြောင့်" } },
          { jp: "お金が足りないため", translation: { en: "due to lack of money", ne: "पैसा नपुगेकाले", vi: "vì thiếu tiền", my: "ငွေမလုံလောက်သောကြောင့်" } } , { jp: "会場が使えないため", translation: { en: "because the venue is unavailable", ne: "स्थल प्रयोग गर्न नमिल्ने भएकाले", vi: "vì địa điểm không sử dụng được", my: "နေရာအသုံးမပြုနိုင်သောကြောင့်" } } ], answer: 0 },
    ],
  },
  N2: {
    title: { en: "Online Classes", ne: "अनलाइन कक्षा", vi: "Lớp học trực tuyến", my: "အွန်လိုင်းသင်တန်း" },
    qtype: "情報検索",
    passage: {
      jp: "オンライン授業が普及したことで、学生は場所を選ばずに学べるようになった。その一方で、対面授業に比べて集中力が続きにくいという指摘もある。教育機関には、それぞれの利点を生かした授業方法の工夫が求められている。",
      reading: "オンラインじゅぎょうがふきゅうしたことで、がくせいはばしょをえらばずにまなべるようになった。そのいっぽうで、たいめんじゅぎょうにくらべてしゅうちゅうりょくがつづきにくいというしてきもある。きょういくきかんには、それぞれのりてんをいかしたじゅぎょうほうほうのくふうがもとめられている。",
      translation: { en: "With the spread of online classes, students have become able to study regardless of location. On the other hand, there is also the criticism that it's harder to maintain concentration compared to in-person classes. Educational institutions are being asked to devise teaching methods that make use of the advantages of each.",
        ne: "अनलाइन कक्षा फैलिएकाले, विद्यार्थीहरूले स्थान नछानी सिक्न सक्षम भएका छन्। अर्कोतर्फ, आमने-सामने कक्षाको तुलनामा एकाग्रता कायम राख्न गाह्रो हुने आलोचना पनि छ। शैक्षिक संस्थाहरूले प्रत्येकको फाइदा उपयोग गर्ने शिक्षण तरिकाको सुधार गर्नुपर्ने देखिन्छ।",
        vi: "Với sự phổ biến của lớp học trực tuyến, học sinh đã có thể học mà không cần chọn địa điểm. Mặt khác, cũng có ý kiến chỉ ra rằng khó duy trì sự tập trung hơn so với lớp học trực tiếp. Các cơ sở giáo dục được yêu cầu nghĩ ra phương pháp giảng dạy tận dụng ưu điểm của từng hình thức.",
        my: "အွန်လိုင်းသင်တန်းများ ပျံ့နှံ့လာသဖြင့် ကျောင်းသားများသည် နေရာမရွေး သင်ယူနိုင်လာကြသည်။ တစ်ဖက်တွင်မူ မျက်နှာချင်းဆိုင်သင်ကြားမှုနှင့်နှိုင်းယှဉ်ပါက အာရုံစူးစိုက်မှု ဆက်ရန်ခက်ခဲသည့် ထောက်ပြချက်လည်းရှိသည်။ ပညာရေးအဖွဲ့အစည်းများသည် တစ်ခုစီ၏ အားသာချက်ကို အသုံးချသည့် သင်ကြားရေးနည်းလမ်းကို တီထွင်ရန် လိုအပ်ပါသည်။" } },
    questions: [
      { question: { jp: "オンライン授業の利点は何ですか。", translation: { en: "What is an advantage of online classes?", ne: "अनलाइन कक्षाको फाइदा के हो?", vi: "Ưu điểm của lớp học trực tuyến là gì?", my: "အွန်လိုင်းသင်တန်း၏ အားသာချက်ကဘာလဲ။" } },
        choices: [ { jp: "場所を選ばずに学べること", translation: { en: "being able to study regardless of location", ne: "स्थान नछानी सिक्न सकिने", vi: "có thể học mà không cần chọn địa điểm", my: "နေရာမရွေး သင်ယူနိုင်ခြင်း" } },
          { jp: "コストが安いこと", translation: { en: "low cost", ne: "सस्तो लागत", vi: "chi phí thấp", my: "စရိတ်သက်သာခြင်း" } },
          { jp: "先生が増えたこと", translation: { en: "more teachers", ne: "शिक्षक बढेको", vi: "nhiều giáo viên hơn", my: "ဆရာများလာခြင်း" } } , { jp: "テストがないこと", translation: { en: "there are no tests", ne: "परीक्षा नहुने", vi: "không có bài kiểm tra", my: "စာမေးပွဲမရှိခြင်း" } } ], answer: 0 },
      { question: { jp: "オンライン授業の問題点として何が指摘されていますか。", translation: { en: "What problem is pointed out about online classes?", ne: "अनलाइन कक्षाको समस्याको रूपमा के औंल्याइएको छ?", vi: "Vấn đề gì được chỉ ra về lớp học trực tuyến?", my: "အွန်လိုင်းသင်တန်း၏ ပြဿနာအဖြစ် ဘာထောက်ပြထားလဲ။" } },
        choices: [ { jp: "集中力が続きにくいこと", translation: { en: "it's harder to maintain concentration", ne: "एकाग्रता कायम राख्न गाह्रो हुने", vi: "khó duy trì sự tập trung", my: "အာရုံစူးစိုက်မှု ဆက်ရန်ခက်ခဲခြင်း" } },
          { jp: "内容が簡単すぎること", translation: { en: "the content is too easy", ne: "सामग्री धेरै सजिलो हुने", vi: "nội dung quá dễ", my: "အကြောင်းအရာ လွယ်လွန်းခြင်း" } },
          { jp: "人気がないこと", translation: { en: "it's not popular", ne: "लोकप्रिय नभएको", vi: "không được ưa chuộng", my: "ခေတ်စားမှုမရှိခြင်း" } } , { jp: "値段が高いこと", translation: { en: "it's expensive", ne: "महँगो हुने", vi: "đắt tiền", my: "စျေးနှုန်းကြီးခြင်း" } } ], answer: 0 },
    ],
  },
  N1: {
    title: { en: "Language Policy", ne: "भाषा नीति", vi: "Chính sách ngôn ngữ", my: "ဘာသာစကားမူဝါဒ" },
    qtype: "情報検索",
    passage: {
      jp: "多言語社会において、言語政策のあり方は常に議論の的となってきた。単一の公用語を定めることには効率性の利点がある一方、少数言語の話者にとっては、自らの文化的アイデンティティが軽視されているように感じられる場合がある。したがって、政策立案者には、効率と多様性という相反する価値をいかに調和させるかという困難な課題が突きつけられている。",
      reading: "たげんごしゃかいにおいて、げんごせいさくのありかたはつねにぎろんのまととなってきた。たんいつのこうようごをさだめることにはこうりつせいのりてんがあるいっぽう、しょうすうげんごのわしゃにとっては、みずからのぶんかてきアイデンティティがけいしされているようにかんじられるばあいがある。したがって、せいさくりつあんしゃには、こうりつとたようせいというあいはんするかちをいかにちょうわさせるかというこんなんなかだいがつきつけられている。",
      translation: { en: "In multilingual societies, the question of language policy has always been a subject of debate. While designating a single official language has the advantage of efficiency, speakers of minority languages may sometimes feel that their cultural identity is being disregarded. Therefore, policymakers face the difficult challenge of how to reconcile the conflicting values of efficiency and diversity.",
        ne: "बहुभाषिक समाजमा, भाषा नीतिको स्वरूप सधैं बहसको विषय बनेको छ। एकल आधिकारिक भाषा तोक्नुको दक्षता फाइदा भए तापनि, अल्पसंख्यक भाषा बोल्नेहरूलाई आफ्नो सांस्कृतिक पहिचान बेवास्ता गरिएको जस्तो महसुस हुन सक्छ। त्यसैले, नीति निर्माताहरूले दक्षता र विविधता जस्ता विरोधाभासी मूल्यहरूलाई कसरी मिलाउने भन्ने कठिन चुनौतीको सामना गर्नुपर्छ।",
        vi: "Trong xã hội đa ngôn ngữ, cách thức chính sách ngôn ngữ luôn là chủ đề tranh luận. Việc quy định một ngôn ngữ chính thức duy nhất có lợi thế về hiệu quả, nhưng người nói ngôn ngữ thiểu số đôi khi có thể cảm thấy bản sắc văn hóa của mình bị xem nhẹ. Do đó, các nhà hoạch định chính sách phải đối mặt với thách thức khó khăn là làm sao dung hòa các giá trị mâu thuẫn giữa hiệu quả và đa dạng.",
        my: "ဘာသာစကားများစွာသုံးသည့် လူ့အဖွဲ့အစည်းတွင် ဘာသာစကားမူဝါဒ၏ ပုံစံသည် အမြဲတမ်း ဆွေးနွေးမှုအကြောင်းအရာ ဖြစ်ခဲ့သည်။ တစ်မျိုးတည်းသော တရားဝင်ဘာသာစကား သတ်မှတ်ခြင်းသည် ထိရောက်မှုဆိုင်ရာ အားသာချက်ရှိသော်လည်း လူနည်းစုဘာသာစကားပြောသူများအနေဖြင့် မိမိတို့၏ ယဉ်ကျေးမှုဆိုင်ရာ အထောက်အထားကို လျစ်လျူရှုခံနေရသည်ဟု ခံစားရနိုင်သည်။ ထို့ကြောင့် မူဝါဒချမှတ်သူများသည် ထိရောက်မှုနှင့် ကွဲပြားမှုဟူသော ဆန့်ကျင်ဘက်တန်ဖိုးများကို မည်သို့ညှိနှိုင်းမည်ဆိုသည့် ခက်ခဲသောစိန်ခေါ်မှုကို ရင်ဆိုင်နေရသည်။" } },
    questions: [
      { question: { jp: "単一の公用語を定めることの利点は何だと述べられていますか。", translation: { en: "What advantage is stated for designating a single official language?", ne: "एकल आधिकारिक भाषा तोक्नुको फाइदा के भनिएको छ?", vi: "Lợi thế nào được nêu ra khi quy định một ngôn ngữ chính thức duy nhất?", my: "တစ်မျိုးတည်းသော တရားဝင်ဘာသာစကားသတ်မှတ်ခြင်း၏ အားသာချက်ကို ဘာလို့ဆိုထားလဲ။" } },
        choices: [ { jp: "効率性", translation: { en: "efficiency", ne: "दक्षता", vi: "hiệu quả", my: "ထိရောက်မှု" } },
          { jp: "多様性", translation: { en: "diversity", ne: "विविधता", vi: "sự đa dạng", my: "ကွဲပြားမှု" } },
          { jp: "経済性", translation: { en: "economy", ne: "मितव्ययिता", vi: "tính kinh tế", my: "စီးပွားရေးဆိုင်ရာ" } } , { jp: "公平性", translation: { en: "fairness", ne: "निष्पक्षता", vi: "tính công bằng", my: "တရားမျှတမှု" } } ], answer: 0 },
      { question: { jp: "少数言語の話者はどう感じることがありますか。", translation: { en: "How might minority language speakers feel?", ne: "अल्पसंख्यक भाषा बोल्नेहरूलाई कस्तो महसुस हुन सक्छ?", vi: "Người nói ngôn ngữ thiểu số có thể cảm thấy như thế nào?", my: "လူနည်းစုဘာသာစကားပြောသူများ ဘယ်လိုခံစားရနိုင်လဲ။" } },
        choices: [ { jp: "文化的アイデンティティが軽視されている", translation: { en: "their cultural identity is being disregarded", ne: "सांस्कृतिक पहिचान बेवास्ता गरिएको", vi: "bản sắc văn hóa bị xem nhẹ", my: "ယဉ်ကျေးမှုဆိုင်ရာ အထောက်အထားကို လျစ်လျူရှုခံရ" } },
          { jp: "十分尊重されている", translation: { en: "fully respected", ne: "पूर्ण रूपमा सम्मान गरिएको", vi: "được tôn trọng đầy đủ", my: "အပြည့်အဝ လေးစားခံရသည်" } },
          { jp: "関心がない", translation: { en: "indifferent", ne: "बेवास्ता", vi: "thờ ơ", my: "စိတ်မဝင်စား" } } , { jp: "経済的に優遇されている", translation: { en: "economically favored", ne: "आर्थिक रूपमा सुविधा पाएको", vi: "được ưu đãi về kinh tế", my: "စီးပွားရေးအရ ဦးစားပေးခံရသည်" } } ], answer: 0 },
    ],
  },
};

const LISTENING_B = {
  N5: { title: { en: "Shopping", ne: "किनमेल", vi: "Mua sắm", my: "ဈေးဝယ်ခြင်း" }, qtype: "ポイント理解",
    passage: { jp: "すみません、この赤いシャツはありますか。はい、こちらにございます。Mサイズと L サイズがあります。では、Mサイズをください。",
      reading: "すみません、このあかいシャツはありますか。はい、こちらにございます。エムサイズとエルサイズがあります。では、エムサイズをください。",
      translation: { en: "Excuse me, do you have this red shirt? Yes, right here. We have size M and size L. Then, please give me size M.",
        ne: "माफ गर्नुहोस्, यो रातो शर्ट छ? हो, यहाँ छ। M साइज र L साइज छ। त्यसो भए, M साइज दिनुहोस्।",
        vi: "Xin lỗi, có áo sơ mi đỏ này không? Vâng, đây ạ. Có size M và size L. Vậy cho tôi size M.",
        my: "ဆောရီးနော်၊ ဒီအနီရောင်ရှပ်အင်္ကျီ ရှိလား။ ရှိပါတယ်၊ ဒီမှာပါ။ M ဆိုက်ဇ်နဲ့ L ဆိုက်ဇ်ရှိပါတယ်။ ဒါဆို M ဆိုက်ဇ်ပေးပါ။" } },
    questions: [
      { question: { jp: "何色のシャツですか。", translation: { en: "What color is the shirt?", ne: "कुन रंगको शर्ट हो?", vi: "Áo màu gì?", my: "ဘယ်အရောင်ရှပ်အင်္ကျီလဲ။" } },
        choices: [ { jp: "赤", translation: { en: "red", ne: "रातो", vi: "đỏ", my: "အနီ" } }, { jp: "青", translation: { en: "blue", ne: "निलो", vi: "xanh", my: "အပြာ" } }, { jp: "白", translation: { en: "white", ne: "सेतो", vi: "trắng", my: "အဖြူ" } } , { jp: "黒", translation: { en: "black", ne: "कालो", vi: "đen", my: "အနက်ရောင်" } } ], answer: 0 },
      { question: { jp: "どのサイズを買いますか。", translation: { en: "Which size are they buying?", ne: "कुन साइज किन्दैछन्?", vi: "Họ mua size nào?", my: "ဘယ်ဆိုက်ဇ်ဝယ်မလဲ။" } },
        choices: [ { jp: "Mサイズ", translation: { en: "size M", ne: "M साइज", vi: "size M", my: "M ဆိုက်ဇ်" } }, { jp: "Lサイズ", translation: { en: "size L", ne: "L साइज", vi: "size L", my: "L ဆိုက်ဇ်" } }, { jp: "Sサイズ", translation: { en: "size S", ne: "S साइज", vi: "size S", my: "S ဆိုက်ဇ်" } } , { jp: "LLサイズ", translation: { en: "size XL", ne: "XL साइज", vi: "size XL", my: "XL ဆိုက်ဇ်" } } ], answer: 0 },
    ] },
  N4: { title: { en: "Making an Appointment", ne: "अपोइन्टमेन्ट लिँदा", vi: "Đặt hẹn", my: "ချိန်းဆိုမှုပြုလုပ်ခြင်း" }, qtype: "ポイント理解",
    passage: { jp: "もしもし、来週の火曜日に予約したいのですが。申し訳ありませんが、火曜日はいっぱいです。水曜日はいかがですか。じゃ、水曜日でお願いします。",
      reading: "もしもし、らいしゅうのかようびによやくしたいのですが。もうしわけありませんが、かようびはいっぱいです。すいようびはいかがですか。じゃ、すいようびでおねがいします。",
      translation: { en: "Hello, I'd like to make a reservation for next Tuesday. I'm sorry, but Tuesday is fully booked. How about Wednesday? Then, Wednesday please.",
        ne: "हेलो, अर्को मंगलबार बुकिङ गर्न चाहन्थेँ। माफ गर्नुहोस्, मंगलबार भरिएको छ। बुधबार कस्तो छ? त्यसो भए, बुधबार गरिदिनुहोस्।",
        vi: "A lô, tôi muốn đặt hẹn vào thứ Ba tuần sau. Xin lỗi, thứ Ba đã kín chỗ rồi. Thứ Tư thì sao ạ? Vậy thì thứ Tư nhé.",
        my: "ဟလို၊ လာမည့်အင်္ဂါနေ့ ချိန်းဆိုချင်ပါတယ်။ ဝမ်းနည်းပါတယ်၊ အင်္ဂါနေ့ကပြည့်နေပါတယ်။ ဗုဒ္ဓဟူးနေ့ ကရော။ ဒါဆို ဗုဒ္ဓဟူးနေ့ပဲ ပေးပါ။" } },
    questions: [
      { question: { jp: "最初は何曜日に予約したかったですか。", translation: { en: "Which day did they first want to book?", ne: "पहिले कुन दिन बुक गर्न चाहेको थियो?", vi: "Ban đầu họ muốn đặt hẹn vào thứ mấy?", my: "ပထမတော့ ဘယ်နေ့ချိန်းဆိုချင်ခဲ့လဲ။" } },
        choices: [ { jp: "火曜日", translation: { en: "Tuesday", ne: "मंगलबार", vi: "thứ Ba", my: "အင်္ဂါနေ့" } }, { jp: "水曜日", translation: { en: "Wednesday", ne: "बुधबार", vi: "thứ Tư", my: "ဗုဒ္ဓဟူးနေ့" } }, { jp: "木曜日", translation: { en: "Thursday", ne: "बिहीबार", vi: "thứ Năm", my: "ကြာသပတေးနေ့" } } , { jp: "月曜日", translation: { en: "Monday", ne: "सोमबार", vi: "thứ Hai", my: "တနင်္လာနေ့" } } ], answer: 0 },
      { question: { jp: "結局何曜日に予約しましたか。", translation: { en: "Which day did they end up booking?", ne: "अन्ततः कुन दिन बुक गरे?", vi: "Cuối cùng họ đặt hẹn vào thứ mấy?", my: "နောက်ဆုံးတော့ ဘယ်နေ့ချိန်းဆိုခဲ့လဲ။" } },
        choices: [ { jp: "水曜日", translation: { en: "Wednesday", ne: "बुधबार", vi: "thứ Tư", my: "ဗုဒ္ဓဟူးနေ့" } }, { jp: "火曜日", translation: { en: "Tuesday", ne: "मंगलबार", vi: "thứ Ba", my: "အင်္ဂါနေ့" } }, { jp: "木曜日", translation: { en: "Thursday", ne: "बिहीबार", vi: "thứ Năm", my: "ကြာသပတေးနေ့" } } , { jp: "金曜日", translation: { en: "Friday", ne: "शुक्रबार", vi: "thứ Sáu", my: "သောကြာနေ့" } } ], answer: 0 },
    ] },
  N3: { title: { en: "Meeting Rescheduled", ne: "बैठक सारियो", vi: "Cuộc họp bị đổi lịch", my: "အစည်းအဝေးအချိန်ပြောင်းခြင်း" }, qtype: "ポイント理解",
    passage: { jp: "来週の会議ですが、参加者の都合により、火曜日から木曜日に変更になりました。場所は同じ会議室です。資料は前日までに送りますので、確認しておいてください。",
      reading: "らいしゅうのかいぎですが、さんかしゃのつごうにより、かようびからもくようびにへんこうになりました。ばしょはおなじかいぎしつです。しりょうはぜんじつまでにおくりますので、かくにんしておいてください。",
      translation: { en: "About next week's meeting, due to participants' schedules, it has been changed from Tuesday to Thursday. The location is the same meeting room. I will send the materials by the day before, so please check them.",
        ne: "अर्को हप्ताको बैठकको बारेमा, सहभागीहरूको सुविधाअनुसार, मंगलबारबाट बिहीबारमा परिवर्तन गरिएको छ। स्थान उही सभाकक्ष हो। सामग्री अघिल्लो दिनसम्म पठाइनेछ, कृपया जाँच गर्नुहोस्।",
        vi: "Về cuộc họp tuần sau, do lịch trình của người tham gia, đã đổi từ thứ Ba sang thứ Năm. Địa điểm vẫn là phòng họp cũ. Tài liệu sẽ được gửi trước một ngày, xin hãy kiểm tra.",
        my: "လာမည့်အပတ် အစည်းအဝေးနှင့်ပတ်သက်ပြီး ပါဝင်သူများ၏ အချိန်ဇယားကြောင့် အင်္ဂါနေ့မှ ကြာသပတေးနေ့သို့ ပြောင်းလိုက်ပါသည်။ နေရာက အတူတူ အစည်းအဝေးခန်းမပါ။ စာရွက်စာတမ်းများကို တစ်နေ့စောစီး ပို့ပေးမည်ဖြစ်၍ စစ်ဆေးထားပါ။" } },
    questions: [
      { question: { jp: "会議は何曜日に変更されましたか。", translation: { en: "Which day was the meeting changed to?", ne: "बैठक कुन दिनमा परिवर्तन गरियो?", vi: "Cuộc họp đã đổi sang thứ mấy?", my: "အစည်းအဝေးကို ဘယ်နေ့ပြောင်းလဲလိုက်လဲ။" } },
        choices: [ { jp: "木曜日", translation: { en: "Thursday", ne: "बिहीबार", vi: "thứ Năm", my: "ကြာသပတေးနေ့" } }, { jp: "火曜日", translation: { en: "Tuesday", ne: "मंगलबार", vi: "thứ Ba", my: "အင်္ဂါနေ့" } }, { jp: "金曜日", translation: { en: "Friday", ne: "शुक्रबार", vi: "thứ Sáu", my: "သောကြာနေ့" } } , { jp: "水曜日", translation: { en: "Wednesday", ne: "बुधबार", vi: "thứ Tư", my: "ဗုဒ္ဓဟူးနေ့" } } ], answer: 0 },
      { question: { jp: "資料はいつ送られますか。", translation: { en: "When will the materials be sent?", ne: "सामग्री कहिले पठाइनेछ?", vi: "Tài liệu sẽ được gửi khi nào?", my: "စာရွက်စာတမ်းများကို ဘယ်တော့ပို့မလဲ။" } },
        choices: [ { jp: "前日まで", translation: { en: "by the day before", ne: "अघिल्लो दिनसम्म", vi: "trước một ngày", my: "တစ်နေ့စောစီး" } }, { jp: "当日", translation: { en: "on the day", ne: "सोही दिन", vi: "trong ngày", my: "ထိုနေ့တွင်" } }, { jp: "一週間前", translation: { en: "a week before", ne: "एक हप्ता अघि", vi: "một tuần trước", my: "တစ်ပတ်စောစီး" } } , { jp: "三日前", translation: { en: "three days before", ne: "तीन दिन अघि", vi: "ba ngày trước", my: "သုံးရက်စောစီး" } } ], answer: 0 },
    ] },
  N2: { title: { en: "Tourism Increase", ne: "पर्यटन वृद्धि", vi: "Tăng trưởng du lịch", my: "ခရီးသွားလုပ်ငန်းတိုးတက်မှု" }, qtype: "ポイント理解",
    passage: { jp: "今日発表された経済報告によると、今年の観光客数は去年より三割増加したという。特に海外からの観光客が大きく増えたことが要因とされ、政府はこの傾向が地域経済の回復につながることを期待している。",
      reading: "きょうはっぴょうされたけいざいほうこくによると、ことしのかんこうきゃくすうはきょねんよりさんわりぞうかしたという。とくにかいがいからのかんこうきゃくがおおきくふえたことがよういんとされ、せいふはこのけいこうがちいきけいざいのかいふくにつながることをきたいしている。",
      translation: { en: "According to an economic report released today, this year's number of tourists has increased by 30% compared to last year. This is attributed largely to a big increase in tourists from overseas, and the government hopes this trend will lead to a recovery of the regional economy.",
        ne: "आज प्रकाशित आर्थिक प्रतिवेदन अनुसार, यस वर्ष पर्यटक संख्या गत वर्षभन्दा तीस प्रतिशत बढेको छ। विशेष गरी विदेशबाट आउने पर्यटक धेरै बढेकोलाई कारण मानिएको छ, र सरकारले यो प्रवृत्तिले क्षेत्रीय अर्थतन्त्रको पुनरुत्थानमा योगदान गर्ने आशा गरेको छ।",
        vi: "Theo báo cáo kinh tế công bố hôm nay, số lượng khách du lịch năm nay đã tăng 30% so với năm ngoái. Nguyên nhân chủ yếu là do khách du lịch nước ngoài tăng mạnh, và chính phủ hy vọng xu hướng này sẽ dẫn đến sự phục hồi của nền kinh tế địa phương.",
        my: "ဒီနေ့ ထုတ်ပြန်ခဲ့သော စီးပွားရေးအစီရင်ခံစာအရ ဒီနှစ် ခရီးသွားအရေအတွက်သည် မနှစ်ကထက် ၃၀ ရာခိုင်နှုန်း တိုးလာခဲ့သည်ဟု ဆိုသည်။ အထူးသဖြင့် နိုင်ငံခြားမှ ခရီးသွားများ များစွာတိုးလာခြင်းက အကြောင်းရင်းဖြစ်ပြီး အစိုးရသည် ဒီလားရာက ဒေသစီးပွားရေးပြန်လည်ရှင်သန်စေရန် အထောက်အကူပြုမည်ဟု မျှော်လင့်ထားသည်။" } },
    questions: [
      { question: { jp: "観光客数はどのくらい増加しましたか。", translation: { en: "By how much did tourist numbers increase?", ne: "पर्यटक संख्या कति बढ्यो?", vi: "Số lượng khách du lịch tăng bao nhiêu?", my: "ခရီးသွားအရေအတွက် ဘယ်လောက်တိုးလာခဲ့လဲ။" } },
        choices: [ { jp: "三割", translation: { en: "30%", ne: "तीस प्रतिशत", vi: "30%", my: "၃၀ ရာခိုင်နှုန်း" } }, { jp: "五割", translation: { en: "50%", ne: "पचास प्रतिशत", vi: "50%", my: "၅၀ ရာခိုင်နှုန်း" } }, { jp: "一割", translation: { en: "10%", ne: "दस प्रतिशत", vi: "10%", my: "၁၀ ရာခိုင်နှုန်း" } } , { jp: "四割", translation: { en: "40%", ne: "चालीस प्रतिशत", vi: "40%", my: "၄၀ရာခိုင်နှုန်း" } } ], answer: 0 },
      { question: { jp: "政府は何を期待していますか。", translation: { en: "What does the government hope for?", ne: "सरकारले केको आशा गरेको छ?", vi: "Chính phủ hy vọng điều gì?", my: "အစိုးရက ဘာကို မျှော်လင့်ထားလဲ။" } },
        choices: [ { jp: "地域経済の回復", translation: { en: "recovery of the regional economy", ne: "क्षेत्रीय अर्थतन्त्रको पुनरुत्थान", vi: "phục hồi kinh tế địa phương", my: "ဒေသစီးပွားရေးပြန်လည်ရှင်သန်ခြင်း" } }, { jp: "税収の減少", translation: { en: "decrease in tax revenue", ne: "करको आम्दानी घट्ने", vi: "giảm thu thuế", my: "အခွန်ဝင်ငွေလျော့ကျခြင်း" } }, { jp: "人口の増加", translation: { en: "population increase", ne: "जनसंख्या वृद्धि", vi: "tăng dân số", my: "လူဦးရေတိုးလာခြင်း" } } , { jp: "物価の上昇", translation: { en: "rising prices", ne: "मूल्यवृद्धि", vi: "giá cả tăng", my: "ကုန်ဈေးနှုန်းမြင့်တက်ခြင်း" } } ], answer: 0 },
    ] },
  N1: { title: { en: "Confirmation Bias", ne: "पुष्टिकरण पूर्वाग्रह", vi: "Thiên kiến xác nhận", my: "အတည်ပြုသံသယယုံမှုမှား" }, qtype: "ポイント理解",
    passage: { jp: "人間の意思決定には、しばしば認知的な偏りが影響を及ぼすことが知られている。とりわけ、自分の信念を支持する情報ばかりを集めてしまう傾向は、確証バイアスと呼ばれ、誤った判断を招く一因とされている。この傾向を自覚することが、より合理的な意思決定への第一歩となるだろう。",
      reading: "にんげんのいしけっていには、しばしばにんちてきなかたよりがえいきょうをおよぼすことがしられている。とりわけ、じぶんのしんねんをしじするじょうほうばかりをあつめてしまうけいこうは、かくしょうバイアスとよばれ、あやまったはんだんをまねくいちいんとされている。このけいこうをじかくすることが、よりごうりてきないしけっていへのだいいっぽとなるだろう。",
      translation: { en: "It is known that human decision-making is often affected by cognitive biases. In particular, the tendency to gather only information that supports one's own beliefs is called confirmation bias, and is considered one cause of mistaken judgment. Becoming aware of this tendency will likely be the first step toward more rational decision-making.",
        ne: "मानिसको निर्णयमा प्रायः संज्ञानात्मक पूर्वाग्रहले प्रभाव पार्ने कुरा थाहा छ। विशेष गरी, आफ्नो विश्वासलाई समर्थन गर्ने जानकारी मात्र सङ्कलन गर्ने प्रवृत्तिलाई पुष्टिकरण पूर्वाग्रह भनिन्छ, र यो गलत निर्णयको एउटा कारण मानिन्छ। यो प्रवृत्तिबारे सचेत हुनु बढी तर्कसंगत निर्णयतर्फको पहिलो कदम हुनेछ।",
        vi: "Người ta biết rằng việc ra quyết định của con người thường bị ảnh hưởng bởi thiên kiến nhận thức. Đặc biệt, xu hướng chỉ thu thập thông tin ủng hộ niềm tin của bản thân được gọi là thiên kiến xác nhận, và được coi là một nguyên nhân dẫn đến phán đoán sai lầm. Nhận thức được xu hướng này sẽ là bước đầu tiên hướng tới việc ra quyết định hợp lý hơn.",
        my: "လူသား၏ ဆုံးဖြတ်ချက်ချမှတ်ခြင်းတွင် သိမြင်မှုဆိုင်ရာ ဘက်လိုက်မှုများ သက်ရောက်လေ့ရှိကြောင်း သိရှိထားသည်။ အထူးသဖြင့် မိမိ၏ ယုံကြည်ချက်ကို ထောက်ခံသည့် အချက်အလက်များကိုသာ စုဆောင်းတတ်သည့် သဘောသည် confirmation bias ဟုခေါ်ပြီး မှားယွင်းသောဆုံးဖြတ်ချက်ကို ဖြစ်ပေါ်စေသည့် အကြောင်းရင်းတစ်ခုအဖြစ် သတ်မှတ်ခံရသည်။ ဒီသဘောကို သတိပြုမိခြင်းသည် ပိုမိုကျိုးကြောင်းညီညွတ်သော ဆုံးဖြတ်ချက်ချမှတ်မှုသို့ ပထမခြေလှမ်းဖြစ်လာမည်။" } },
    questions: [
      { question: { jp: "確証バイアスとは何ですか。", translation: { en: "What is confirmation bias?", ne: "पुष्टिकरण पूर्वाग्रह भनेको के हो?", vi: "Thiên kiến xác nhận là gì?", my: "confirmation bias ဆိုတာ ဘာလဲ။" } },
        choices: [ { jp: "自分の信念を支持する情報ばかり集める傾向", translation: { en: "the tendency to gather only information supporting one's beliefs", ne: "आफ्नो विश्वासलाई समर्थन गर्ने जानकारी मात्र सङ्कलन गर्ने प्रवृत्ति", vi: "xu hướng chỉ thu thập thông tin ủng hộ niềm tin của bản thân", my: "မိမိယုံကြည်ချက်ကို ထောက်ခံသည့်အချက်အလက်များကိုသာ စုဆောင်းတတ်သည့်သဘော" } },
          { jp: "全ての情報を公平に扱う傾向", translation: { en: "the tendency to treat all information fairly", ne: "सबै जानकारीलाई निष्पक्ष व्यवहार गर्ने प्रवृत्ति", vi: "xu hướng đối xử công bằng với mọi thông tin", my: "အချက်အလက်အားလုံးကို မျှတစွာဆက်ဆံသည့်သဘော" } },
          { jp: "情報を全く集めない傾向", translation: { en: "the tendency to not gather information at all", ne: "जानकारी बिल्कुल नसङ्कलन गर्ने प्रवृत्ति", vi: "xu hướng không thu thập thông tin nào cả", my: "အချက်အလက်လုံးဝ မစုဆောင်းသည့်သဘော" } } , { jp: "情報を客観的に分析する傾向", translation: { en: "the tendency to analyze information objectively", ne: "जानकारीलाई वस्तुनिष्ठ रूपमा विश्लेषण गर्ने प्रवृत्ति", vi: "xu hướng phân tích thông tin một cách khách quan", my: "အချက်အလက်ကို ဓမ္မဓိဋ္ဌာန်ကျစွာ ခွဲခြမ်းစိတ်ဖြာသည့်သဘော" } } ], answer: 0 },
      { question: { jp: "この傾向を自覚することは何につながりますか。", translation: { en: "What does being aware of this tendency lead to?", ne: "यो प्रवृत्तिबारे सचेत हुनुले केमा पुर्‍याउँछ?", vi: "Nhận thức được xu hướng này dẫn đến điều gì?", my: "ဒီသဘောကို သတိပြုမိခြင်းက ဘာကိုဖြစ်ပေါ်စေလဲ။" } },
        choices: [ { jp: "より合理的な意思決定", translation: { en: "more rational decision-making", ne: "बढी तर्कसंगत निर्णय", vi: "việc ra quyết định hợp lý hơn", my: "ပိုမိုကျိုးကြောင်းညီညွတ်သော ဆုံးဖြတ်ချက်" } },
          { jp: "情報量の増加", translation: { en: "an increase in the amount of information", ne: "जानकारीको मात्रा वृद्धि", vi: "sự gia tăng lượng thông tin", my: "အချက်အလက်ပမာဏတိုးလာခြင်း" } },
          { jp: "感情の安定", translation: { en: "emotional stability", ne: "भावनात्मक स्थिरता", vi: "sự ổn định cảm xúc", my: "စိတ်ခံစားချက်တည်ငြိမ်မှု" } } , { jp: "他人への依存", translation: { en: "dependence on others", ne: "अरूमाथि निर्भरता", vi: "sự phụ thuộc vào người khác", my: "အခြားသူများအပေါ် မှီခိုမှု" } } ], answer: 0 },
    ] },
};

// KANJI QUEST world map stages, in unlock order
const STAGES = [
  { id: "village", name: "ひらがな村", emoji: "🏘️", enemy: "🐭", enemyHp: 4, coin: 10, exp: 20, level: null },
  { id: "n5", name: "N5の森", emoji: "🌲", enemy: "🐺", enemyHp: 5, coin: 20, exp: 35, level: "N5" },
  { id: "n4", name: "N4の街", emoji: "🏙️", enemy: "🐗", enemyHp: 6, coin: 30, exp: 50, level: "N4" },
  { id: "n3", name: "N3の城", emoji: "🏯", enemy: "👹", enemyHp: 7, coin: 40, exp: 65, level: "N3" },
  { id: "n2", name: "N2の山", emoji: "⛰️", enemy: "🐉", enemyHp: 8, coin: 50, exp: 80, level: "N2" },
  { id: "n1", name: "N1の神殿", emoji: "⛩️", enemy: "👺", enemyHp: 10, coin: 70, exp: 100, level: "N1" },
];

// Curated shiritori (word-chain) sequence: each word's reading starts with the previous word's last kana.
const WORD_CHAIN = [
  { jp: "桜", reading: "さくら", meaning: { en: "cherry blossom", ne: "चेरी फूल", vi: "hoa anh đào", my: "ချယ်ရီပန်း" } },
  { jp: "ラッパ", reading: "らっぱ", meaning: { en: "trumpet", ne: "तुरही", vi: "kèn trumpet", my: "တံပိုးခရာ" } },
  { jp: "パンダ", reading: "ぱんだ", meaning: { en: "panda", ne: "पान्डा", vi: "gấu trúc", my: "ပန်ဒါ" } },
  { jp: "団子", reading: "だんご", meaning: { en: "dango (rice dumpling)", ne: "दान्गो (चामलको मिठाई)", vi: "bánh dango", my: "ဒန်ဂို့ (ဆန်ကွမ်း)" } },
  { jp: "ゴリラ", reading: "ごりら", meaning: { en: "gorilla", ne: "गोरिल्ला", vi: "khỉ đột", my: "ဂိုရီလာ" } },
  { jp: "ラクダ", reading: "らくだ", meaning: { en: "camel", ne: "ऊँट", vi: "lạc đà", my: "ကုလားအုတ်" } },
  { jp: "ダチョウ", reading: "だちょう", meaning: { en: "ostrich", ne: "उष्ट्रपंक्षी", vi: "đà điểu", my: "ကုလားအုတ်ငှက်" } },
  { jp: "兎", reading: "うさぎ", meaning: { en: "rabbit", ne: "खरायो", vi: "thỏ", my: "ယုန်" } },
  { jp: "牛乳", reading: "ぎゅうにゅう", meaning: { en: "milk", ne: "दूध", vi: "sữa", my: "နွားနို့" } },
  { jp: "海", reading: "うみ", meaning: { en: "sea", ne: "समुद्र", vi: "biển", my: "ပင်လယ်" } },
  { jp: "みかん", reading: "みかん", meaning: { en: "mandarin orange", ne: "सुन्तला", vi: "quýt", my: "လိမ္မော်သီး" } },
];

// Third question type per level: READING_C = 内容理解（長文）, LISTENING_C = 概要理解 (overview comprehension)
const READING_C = {
  N5: {
    title: { en: "My Weekend", ne: "मेरो सप्ताहन्त", vi: "Cuối tuần của tôi", my: "ကျွန်တော့်ရဲ့စနေတနင်္ဂနွေ" },
    qtype: "内容理解（長文）",
    passage: {
      jp: "わたしは毎週土曜日に公園へ行きます。公園で犬と散歩をしたり、友達とテニスをしたりします。日曜日は家でゆっくり休みます。朝ご飯の後、本を読んだり、テレビを見たりします。夜は家族と一緒に晩ご飯を食べます。とても楽しい週末です。",
      reading: "わたしはまいしゅうどようびにこうえんへいきます。こうえんでいぬとさんぽをしたり、ともだちとテニスをしたりします。にちようびはいえでゆっくりやすみます。あさごはんのあと、ほんをよんだり、テレビをみたりします。よるはかぞくといっしょにばんごはんをたべます。とてもたのしいしゅうまつです。",
      translation: { en: "Every Saturday I go to the park. At the park, I walk my dog and play tennis with friends. On Sunday, I rest quietly at home. After breakfast, I read books and watch TV. At night, I eat dinner together with my family. It's a very fun weekend.",
        ne: "म हरेक शनिबार पार्कमा जान्छु। पार्कमा कुकुरसँग हिँड्डुल गर्छु र साथीसँग टेनिस खेल्छु। आइतबार घरमा आराम गर्छु। बिहानको खानापछि, किताब पढ्छु र टिभी हेर्छु। राति परिवारसँगै बेलुकाको खाना खान्छु। धेरै रमाइलो सप्ताहन्त हो।",
        vi: "Mỗi thứ Bảy tôi đều đi công viên. Ở công viên, tôi dắt chó đi dạo và chơi tennis với bạn bè. Chủ nhật tôi nghỉ ngơi thư thái ở nhà. Sau bữa sáng, tôi đọc sách và xem TV. Buổi tối tôi ăn tối cùng gia đình. Đó là một cuối tuần rất vui vẻ.",
        my: "ကျွန်တော် စနေနေ့တိုင်း ပန်းခြံသွားပါတယ်။ ပန်းခြံမှာ ခွေးနဲ့လမ်းလျှောက်ပြီး သူငယ်ချင်းနဲ့ တင်းနစ်ကစားပါတယ်။ တနင်္ဂနွေနေ့မှာ အိမ်မှာ အနားယူပါတယ်။ မနက်စာစားပြီးရင် စာအုပ်ဖတ်ပြီး တီဗွီကြည့်ပါတယ်။ ညမှာ မိသားစုနဲ့အတူ ညစာစားပါတယ်။ အရမ်းပျော်ရွှင်တဲ့ စနေတနင်္ဂနွေပါ။" } },
    questions: [
      { question: { jp: "土曜日、どこへ行きますか。", translation: { en: "Where does the person go on Saturday?", ne: "शनिबार व्यक्ति कहाँ जान्छ?", vi: "Thứ Bảy người này đi đâu?", my: "စနေနေ့ ဘယ်ကိုသွားလဲ။" } },
        choices: [ { jp: "公園", translation: { en: "the park", ne: "पार्क", vi: "công viên", my: "ပန်းခြံ" } },
          { jp: "学校", translation: { en: "school", ne: "विद्यालय", vi: "trường học", my: "ကျောင်း" } },
          { jp: "病院", translation: { en: "hospital", ne: "अस्पताल", vi: "bệnh viện", my: "ဆေးရုံ" } },
          { jp: "図書館", translation: { en: "library", ne: "पुस्तकालय", vi: "thư viện", my: "စာကြည့်တိုက်" } } ], answer: 0 },
      { question: { jp: "日曜日の朝ご飯の後、何をしますか。", translation: { en: "What does the person do after breakfast on Sunday?", ne: "आइतबार बिहानको खानापछि के गर्छ?", vi: "Sau bữa sáng Chủ nhật, người này làm gì?", my: "တနင်္ဂနွေနေ့ မနက်စာစားပြီးရင် ဘာလုပ်လဲ။" } },
        choices: [ { jp: "本を読む", translation: { en: "read books", ne: "किताब पढ्छ", vi: "đọc sách", my: "စာအုပ်ဖတ်သည်" } },
          { jp: "仕事をする", translation: { en: "work", ne: "काम गर्छ", vi: "làm việc", my: "အလုပ်လုပ်သည်" } },
          { jp: "買い物に行く", translation: { en: "go shopping", ne: "किनमेल गर्न जान्छ", vi: "đi mua sắm", my: "ဈေးဝယ်သွားသည်" } },
          { jp: "料理をする", translation: { en: "cook", ne: "खाना पकाउँछ", vi: "nấu ăn", my: "ချက်ပြုတ်သည်" } } ], answer: 0 },
    ],
  },
  N4: {
    title: { en: "My First Trip Abroad", ne: "मेरो पहिलो विदेश यात्रा", vi: "Chuyến du lịch nước ngoài đầu tiên", my: "ပထမဆုံးနိုင်ငံခြားခရီးစဉ်" },
    qtype: "内容理解（長文）",
    passage: {
      jp: "先月、初めて海外旅行に行きました。行き先はタイでした。タイでは、有名な寺院を見たり、市場で買い物をしたりしました。食べ物もとてもおいしくて、特にタイ料理のスープが忘れられません。言葉が通じないこともありましたが、身振り手振りで何とかコミュニケーションが取れました。また機会があれば、他の国にも旅行してみたいです。",
      reading: "せんげつ、はじめてかいがいりょこうにいきました。いきさきはタイでした。タイでは、ゆうめいなじいんをみたり、いちばでかいものをしたりしました。たべものもとてもおいしくて、とくにタイりょうりのスープがわすれられません。ことばがつうじないこともありましたが、みぶりてぶりでなんとかコミュニケーションがとれました。またきかいがあれば、ほかのくににもりょこうしてみたいです。",
      translation: { en: "Last month, I went overseas for the first time. My destination was Thailand. In Thailand, I saw famous temples and went shopping at markets. The food was also very delicious, and I especially can't forget the Thai soup. There were times when language didn't work, but I managed to communicate somehow with gestures. If I get the chance again, I'd like to travel to other countries too.",
        ne: "गएको महिना, पहिलो पटक विदेश यात्रामा गएँ। गन्तव्य थाइल्यान्ड थियो। थाइल्यान्डमा, प्रसिद्ध मन्दिरहरू हेरें र बजारमा किनमेल गरें। खाना पनि धेरै स्वादिष्ट थियो, विशेष गरी थाई परिकारको सुप बिर्सन सक्दिनँ। भाषा नबुझिने बेला पनि थियो, तर इशाराले जसोतसो संवाद गर्न सकें। फेरि मौका मिले, अरू देशहरूमा पनि यात्रा गर्न चाहन्छु।",
        vi: "Tháng trước, lần đầu tiên tôi đi du lịch nước ngoài. Điểm đến là Thái Lan. Ở Thái Lan, tôi đã xem những ngôi đền nổi tiếng và mua sắm ở chợ. Đồ ăn cũng rất ngon, đặc biệt tôi không thể quên món súp Thái. Có lúc bất đồng ngôn ngữ, nhưng tôi đã cố gắng giao tiếp bằng cử chỉ. Nếu có cơ hội, tôi muốn đi du lịch các nước khác nữa.",
        my: "ပြီးခဲ့တဲ့လက ပထမဆုံးအကြိမ် နိုင်ငံခြားခရီးထွက်ခဲ့ပါတယ်။ ခရီးဆုံးက ထိုင်းနိုင်ငံပါ။ ထိုင်းမှာ နာမည်ကြီးဘုရားကျောင်းတွေကြည့်ပြီး ဈေးထဲမှာ ဈေးဝယ်ခဲ့ပါတယ်။ အစားအစာလည်း အရမ်းအရသာရှိပြီး၊ အထူးသဖြင့် ထိုင်းဟင်းချိုကို မမေ့နိုင်ပါဘူး။ ဘာသာစကားမတူတဲ့အချိန်တွေရှိခဲ့ပေမယ့် ခန္ဓာကိုယ်အမူအရာနဲ့ တစ်နည်းနည်းနဲ့ ဆက်သွယ်နိုင်ခဲ့ပါတယ်။ နောက်တစ်ခါအခွင့်ရရင် တခြားနိုင်ငံတွေကိုလည်း ခရီးထွက်ကြည့်ချင်ပါတယ်။" } },
    questions: [
      { question: { jp: "どこの国へ旅行しましたか。", translation: { en: "Which country did the person travel to?", ne: "व्यक्ति कुन देश यात्रा गयो?", vi: "Người này đã đi du lịch nước nào?", my: "ဘယ်နိုင်ငံကို ခရီးထွက်ခဲ့လဲ။" } },
        choices: [ { jp: "タイ", translation: { en: "Thailand", ne: "थाइल्यान्ड", vi: "Thái Lan", my: "ထိုင်းနိုင်ငံ" } },
          { jp: "中国", translation: { en: "China", ne: "चीन", vi: "Trung Quốc", my: "တရုတ်နိုင်ငံ" } },
          { jp: "韓国", translation: { en: "Korea", ne: "कोरिया", vi: "Hàn Quốc", my: "ကိုရီးယားနိုင်ငံ" } },
          { jp: "ベトナム", translation: { en: "Vietnam", ne: "भियतनाम", vi: "Việt Nam", my: "ဗီယက်နမ်နိုင်ငံ" } } ], answer: 0 },
      { question: { jp: "言葉が通じないとき、どうやってコミュニケーションを取りましたか。", translation: { en: "How did the person communicate when language didn't work?", ne: "भाषा नबुझिँदा कसरी संवाद गर्यो?", vi: "Khi bất đồng ngôn ngữ, người này đã giao tiếp bằng cách nào?", my: "ဘာသာစကားမတူတဲ့အခါ ဘယ်လိုဆက်သွယ်ခဲ့လဲ။" } },
        choices: [ { jp: "身振り手振りで", translation: { en: "with gestures", ne: "इशाराद्वारा", vi: "bằng cử chỉ", my: "ခန္ဓာကိုယ်အမူအရာဖြင့်" } },
          { jp: "スマホの翻訳アプリで", translation: { en: "with a phone translation app", ne: "फोनको अनुवाद एपले", vi: "bằng ứng dụng dịch trên điện thoại", my: "ဖုန်းဘာသာပြန်အက်ပ်ဖြင့်" } },
          { jp: "通訳を雇って", translation: { en: "by hiring an interpreter", ne: "अनुवादक भाडामा लिएर", vi: "bằng cách thuê phiên dịch", my: "စကားပြန်ငှားရမ်းပြီး" } },
          { jp: "英語で", translation: { en: "in English", ne: "अंग्रेजीमा", vi: "bằng tiếng Anh", my: "အင်္ဂလိပ်လိုဖြင့်" } } ], answer: 0 },
    ],
  },
  N3: {
    title: { en: "Work Style Reform", ne: "काम गर्ने शैली सुधार", vi: "Cải cách phong cách làm việc", my: "အလုပ်လုပ်ပုံ ပြုပြင်ပြောင်းလဲမှု" },
    qtype: "内容理解（長文）",
    passage: {
      jp: "最近、日本では「働き方改革」という言葉がよく聞かれるようになった。長時間労働を減らし、社員の心身の健康を守ることが目的である。具体的には、残業時間の制限や、有給休暇の取得促進などが進められている。しかし、業種によっては人手不足が深刻で、改革が思うように進んでいない現状もある。今後は、企業ごとの事情に合わせた柔軟な対応が求められるだろう。",
      reading: "さいきん、にほんでは「はたらきかたかいかく」ということばがよくきかれるようになった。ちょうじかんろうどうをへらし、しゃいんのしんしんのけんこうをまもることがもくてきである。ぐたいてきには、ざんぎょうじかんのせいげんや、ゆうきゅうきゅうかのしゅとくそくしんなどがすすめられている。しかし、ぎょうしゅによってはひとでぶそくがしんこくで、かいかくがおもうようにすすんでいないげんじょうもある。こんごは、きぎょうごとのじじょうにあわせたじゅうなんなたいおうがもとめられるだろう。",
      translation: { en: "Recently in Japan, the term 'work style reform' has come to be heard often. Its purpose is to reduce long working hours and protect employees' physical and mental health. Specifically, measures such as limiting overtime hours and promoting the use of paid leave are being advanced. However, in some industries, labor shortages are severe, and there is a current situation where reform is not progressing as intended. Going forward, flexible responses tailored to each company's circumstances will likely be required.",
        ne: "आजकल, जापानमा «काम गर्ने शैली सुधार» भन्ने शब्द प्रायः सुनिन थालेको छ। लामो समयको काम घटाउनु र कर्मचारीको शारीरिक तथा मानसिक स्वास्थ्य जोगाउनु यसको उद्देश्य हो। विशेष गरी, ओभरटाइम समयको सीमा र भुक्तानी विदा लिने प्रवर्द्धन जस्ता उपायहरू अगाडि बढाइँदैछन्। तर, केही क्षेत्रमा जनशक्तिको अभाव गम्भीर छ, र सुधार अपेक्षित रूपमा अगाडि नबढेको अवस्था पनि छ। भविष्यमा, प्रत्येक कम्पनीको अवस्थाअनुसार लचिलो प्रतिक्रिया आवश्यक हुनेछ।",
        vi: "Gần đây, ở Nhật Bản, cụm từ 'cải cách phong cách làm việc' đã trở nên thường được nghe thấy. Mục đích là giảm thời gian làm việc dài và bảo vệ sức khỏe thể chất, tinh thần của nhân viên. Cụ thể, các biện pháp như hạn chế giờ làm thêm và thúc đẩy việc sử dụng ngày nghỉ có lương đang được thúc đẩy. Tuy nhiên, ở một số ngành, tình trạng thiếu nhân lực nghiêm trọng, và cũng có tình trạng cải cách không tiến triển như mong đợi. Trong tương lai, có lẽ cần có phản ứng linh hoạt phù hợp với hoàn cảnh của từng công ty.",
        my: "မကြာသေးမီက ဂျပန်နိုင်ငံတွင် 「အလုပ်လုပ်ပုံပြုပြင်ပြောင်းလဲရေး」 ဟူသောစကားလုံးကို မကြာခဏကြားရလာသည်။ ရည်ရွယ်ချက်မှာ အချိန်ကြာမြင့်စွာအလုပ်လုပ်ခြင်းကို လျှော့ချပြီး ဝန်ထမ်းများ၏ ကိုယ်စိတ်နှစ်ပါးကျန်းမာရေးကို ကာကွယ်ရန်ဖြစ်သည်။ တိကျစွာဆိုရလျှင် အချိန်ပိုအလုပ်ချိန်ကန့်သတ်ခြင်းနှင့် လစာရှိခွင့်ယူခြင်းကို မြှင့်တင်ခြင်းစသည့် အစီအမံများကို တိုးမြှင့်ဆောင်ရွက်လျက်ရှိသည်။ သို့သော် လုပ်ငန်းအမျိုးအစားအလိုက် လူအင်အားလိုအပ်ချက်ပြင်းထန်ပြီး ပြုပြင်ပြောင်းလဲမှုသည် မျှော်မှန်းထားသလို မတိုးတက်သေးသည့် လက်ရှိအခြေအနေလည်းရှိသည်။ ယခုနောက်ပိုင်း ကုမ္ပဏီတစ်ခုစီ၏ အခြေအနေနှင့်ကိုက်ညီသော ပြောင်းလွယ်ပြင်လွယ်တုံ့ပြန်မှု လိုအပ်လာမည်ဖြစ်သည်။" } },
    questions: [
      { question: { jp: "「働き方改革」の目的は何ですか。", translation: { en: "What is the purpose of 'work style reform'?", ne: "«काम गर्ने शैली सुधार»को उद्देश्य के हो?", vi: "Mục đích của 'cải cách phong cách làm việc' là gì?", my: "「အလုပ်လုပ်ပုံပြုပြင်ပြောင်းလဲရေး」၏ ရည်ရွယ်ချက်ကဘာလဲ။" } },
        choices: [ { jp: "社員の健康を守ること", translation: { en: "protecting employees' health", ne: "कर्मचारीको स्वास्थ्य जोगाउनु", vi: "bảo vệ sức khỏe nhân viên", my: "ဝန်ထမ်းများ၏ကျန်းမာရေးကို ကာကွယ်ခြင်း" } },
          { jp: "会社の利益を増やすこと", translation: { en: "increasing company profit", ne: "कम्पनीको नाफा बढाउनु", vi: "tăng lợi nhuận công ty", my: "ကုမ္ပဏီအမြတ်ငွေတိုးလာစေခြင်း" } },
          { jp: "社員数を減らすこと", translation: { en: "reducing the number of employees", ne: "कर्मचारी संख्या घटाउनु", vi: "giảm số lượng nhân viên", my: "ဝန်ထမ်းအရေအတွက်လျှော့ချခြင်း" } },
          { jp: "税金を減らすこと", translation: { en: "reducing taxes", ne: "कर घटाउनु", vi: "giảm thuế", my: "အခွန်လျှော့ချခြင်း" } } ], answer: 0 },
      { question: { jp: "改革が進まない業種にはどんな問題がありますか。", translation: { en: "What problem exists in industries where reform isn't progressing?", ne: "सुधार अगाडि नबढेको क्षेत्रमा कस्तो समस्या छ?", vi: "Ngành nào mà cải cách không tiến triển có vấn đề gì?", my: "ပြုပြင်ပြောင်းလဲမှု မတိုးတက်သောလုပ်ငန်းများတွင် ဘာပြဿနာရှိလဲ။" } },
        choices: [ { jp: "人手不足", translation: { en: "labor shortage", ne: "जनशक्तिको अभाव", vi: "thiếu nhân lực", my: "လူအင်အားလိုအပ်ချက်" } },
          { jp: "資金不足", translation: { en: "funding shortage", ne: "पुँजीको अभाव", vi: "thiếu vốn", my: "ရန်ပုံငွေလိုအပ်ချက်" } },
          { jp: "技術不足", translation: { en: "technology shortage", ne: "प्रविधिको अभाव", vi: "thiếu công nghệ", my: "နည်းပညာလိုအပ်ချက်" } },
          { jp: "情報不足", translation: { en: "information shortage", ne: "जानकारीको अभाव", vi: "thiếu thông tin", my: "အချက်အလက်လိုအပ်ချက်" } } ], answer: 0 },
    ],
  },
  N2: {
    title: { en: "AI and Employment", ne: "एआई र रोजगारी", vi: "AI và việc làm", my: "AI နှင့် အလုပ်အကိုင်" },
    qtype: "内容理解（長文）",
    passage: {
      jp: "人工知能（AI）の発展により、これまで人間が行ってきた仕事の一部が自動化されつつある。単純作業だけでなく、データ分析や翻訳といった専門的な業務もAIが担うようになってきた。この変化に対して、雇用が失われることへの不安の声がある一方、新しい職種が生まれる可能性を指摘する意見も少なくない。重要なのは、変化に対応できるよう、教育や職業訓練の制度を整えることだろう。",
      reading: "じんこうちのう（エーアイ）のはってんにより、これまでにんげんがおこなってきたしごとのいちぶがじどうかされつつある。たんじゅんさぎょうだけでなく、データぶんせきやほんやくといったせんもんてきなぎょうむもエーアイがになうようになってきた。このへんかにたいして、こようがうしなわれることへのふあんのこえがあるいっぽう、あたらしいしょくしゅがうまれるかのうせいをしてきするいけんもすくなくない。じゅうようなのは、へんかにたいおうできるよう、きょういくやしょくぎょうくんれんのせいどをととのえることだろう。",
      translation: { en: "With the development of artificial intelligence (AI), some of the work that humans have done until now is becoming automated. Not only simple tasks but also specialized work such as data analysis and translation is coming to be handled by AI. In response to this change, while there are voices of anxiety about jobs being lost, there are also quite a few opinions pointing out the possibility that new occupations will be born. What is important is probably to set up education and vocational training systems so that people can respond to the change.",
        ne: "कृत्रिम बुद्धिमत्ता (एआई) को विकाससँगै, अहिलेसम्म मानिसले गर्दै आएको काम केही स्वचालित हुँदैछ। साधारण काम मात्र होइन, डेटा विश्लेषण र अनुवाद जस्ता विशेषज्ञ काम पनि एआईले गर्न थालेको छ। यो परिवर्तनप्रति, रोजगारी गुम्ने डरको आवाज एकातिर छ भने, नयाँ पेशाहरू सिर्जना हुने सम्भावना औंल्याउने विचार पनि कम छैनन्। महत्त्वपूर्ण कुरा भनेको परिवर्तनसँग तालमेल मिलाउन शिक्षा र व्यावसायिक तालिम प्रणाली मिलाउनु होला।",
        vi: "Với sự phát triển của trí tuệ nhân tạo (AI), một phần công việc mà con người đã làm cho đến nay đang dần được tự động hóa. Không chỉ công việc đơn giản mà cả công việc chuyên môn như phân tích dữ liệu và dịch thuật cũng đang được AI đảm nhận. Đối với sự thay đổi này, một mặt có những tiếng nói lo lắng về việc mất việc làm, mặt khác cũng không ít ý kiến chỉ ra khả năng các ngành nghề mới sẽ ra đời. Điều quan trọng có lẽ là xây dựng hệ thống giáo dục và đào tạo nghề để có thể ứng phó với sự thay đổi.",
        my: "ဉာဏ်ရည်တု (AI) ဖွံ့ဖြိုးတိုးတက်မှုကြောင့် ယခင်လူသားများလုပ်ဆောင်ခဲ့သည့် အလုပ်အချို့ အလိုအလျောက်ဖြစ်လာလျက်ရှိသည်။ ရိုးရှင်းသောလုပ်ငန်းများသာမက ဒေတာခွဲခြမ်းစိတ်ဖြာခြင်းနှင့် ဘာသာပြန်ခြင်းကဲ့သို့ ကျွမ်းကျင်မှုလိုအပ်သောလုပ်ငန်းများကိုပါ AI က တာဝန်ယူလာသည်။ ဤပြောင်းလဲမှုနှင့်ပတ်သက်၍ အလုပ်အကိုင်ဆုံးရှုံးမည်ကို စိုးရိမ်သောအသံများရှိသကဲ့သို့ အလုပ်အကိုင်အမျိုးအစားအသစ်များ ပေါ်ပေါက်လာနိုင်ခြေကိုထောက်ပြသောထင်မြင်ချက်များလည်း နည်းနည်းမဟုတ်ပါ။ အရေးကြီးသည်မှာ ပြောင်းလဲမှုကိုတုံ့ပြန်နိုင်ရန် ပညာရေးနှင့်အသက်မွေးဝမ်းကြောင်းလေ့ကျင့်ရေးစနစ်ကို ပြင်ဆင်ထားရန်ဖြစ်လိမ့်မည်။" } },
    questions: [
      { question: { jp: "AIが担うようになった仕事にはどんなものがありますか。", translation: { en: "What kind of work has AI come to handle?", ne: "एआईले गर्न थालेको काम कस्तो छ?", vi: "AI đã bắt đầu đảm nhận công việc gì?", my: "AI က ဘယ်လိုအလုပ်မျိုးတွေကို တာဝန်ယူလာလဲ။" } },
        choices: [ { jp: "データ分析や翻訳", translation: { en: "data analysis and translation", ne: "डेटा विश्लेषण र अनुवाद", vi: "phân tích dữ liệu và dịch thuật", my: "ဒေတာခွဲခြမ်းစိတ်ဖြာခြင်းနှင့်ဘာသာပြန်ခြင်း" } },
          { jp: "農業", translation: { en: "agriculture", ne: "कृषि", vi: "nông nghiệp", my: "စိုက်ပျိုးရေး" } },
          { jp: "建築", translation: { en: "architecture", ne: "वास्तुकला", vi: "kiến trúc", my: "ဗိသုကာ" } },
          { jp: "料理", translation: { en: "cooking", ne: "खाना पकाउने काम", vi: "nấu ăn", my: "ချက်ပြုတ်ခြင်း" } } ], answer: 0 },
      { question: { jp: "重要なことは何だと述べていますか。", translation: { en: "What does the passage say is important?", ne: "महत्त्वपूर्ण कुरा के हो भनिएको छ?", vi: "Đoạn văn nói điều gì là quan trọng?", my: "အရေးကြီးတာက ဘာလို့ ဆိုထားလဲ။" } },
        choices: [ { jp: "教育や職業訓練の制度を整えること", translation: { en: "setting up education and vocational training systems", ne: "शिक्षा र व्यावसायिक तालिम प्रणाली मिलाउनु", vi: "xây dựng hệ thống giáo dục và đào tạo nghề", my: "ပညာရေးနှင့်အသက်မွေးဝမ်းကြောင်းလေ့ကျင့်ရေးစနစ်ပြင်ဆင်ခြင်း" } },
          { jp: "AIの開発を止めること", translation: { en: "stopping AI development", ne: "एआईको विकास रोक्नु", vi: "dừng phát triển AI", my: "AI ဖွံ့ဖြိုးတိုးတက်မှုရပ်တန့်ခြင်း" } },
          { jp: "税金を上げること", translation: { en: "raising taxes", ne: "कर बढाउनु", vi: "tăng thuế", my: "အခွန်တိုးမြှင့်ခြင်း" } },
          { jp: "会社を増やすこと", translation: { en: "increasing the number of companies", ne: "कम्पनीहरू बढाउनु", vi: "tăng số lượng công ty", my: "ကုမ္ပဏီအရေအတွက်တိုးမြှင့်ခြင်း" } } ], answer: 0 },
    ],
  },
  N1: {
    title: { en: "Identity in the Digital Age", ne: "डिजिटल युगमा पहिचान", vi: "Bản sắc trong thời đại số", my: "ဒစ်ဂျစ်တယ်ခေတ်ရှိ ကိုယ်ပိုင်ဂုဏ်သတ္တိ" },
    qtype: "内容理解（長文）",
    passage: {
      jp: "インターネットとSNSの普及により、人々は複数のデジタル上の自己を持つようになった。現実の自分とオンライン上の自分は必ずしも一致せず、後者はしばしば理想化された姿として構築される。このような状況は、自己認識のあり方に新たな課題を突きつけている。すなわち、多層化した自己をいかに統合し、一貫したアイデンティティを保つかという問題である。この問いに対する答えは、今後の心理学や社会学における重要な研究テーマとなるだろう。",
      reading: "インターネットとエスエヌエスのふきゅうにより、ひとびとはふくすうのデジタルじょうのじこをもつようになった。げんじつのじぶんとオンラインじょうのじぶんはかならずしもいっちせず、こうしゃはしばしばりそうかされたすがたとしてこうちくされる。このようなじょうきょうは、じこにんしきのありかたにあらたなかだいをつきつけている。すなわち、たそうかしたじこをいかにとうごうし、いっかんしたアイデンティティをたもつかというもんだいである。このといにたいするこたえは、こんごのしんりがくやしゃかいがくにおけるじゅうようなけんきゅうテーマとなるだろう。",
      translation: { en: "With the spread of the internet and social media, people have come to have multiple digital selves. The real self and the online self do not necessarily match, and the latter is often constructed as an idealized figure. This kind of situation poses a new challenge to the way self-recognition works. That is, the problem of how to integrate a multilayered self and maintain a consistent identity. The answer to this question will likely become an important research theme in future psychology and sociology.",
        ne: "इन्टरनेट र सामाजिक सञ्जालको विस्तारसँगै, मानिसहरूले धेरै डिजिटल आत्महरू राख्न थालेका छन्। वास्तविक आफू र अनलाइन आफू सधैं मिल्दैनन्, र पछिल्लो प्रायः आदर्शीकृत रूपमा निर्माण गरिन्छ। यस्तो अवस्थाले आत्म-चिनारीको स्वरूपमा नयाँ चुनौती खडा गरेको छ। अर्थात्, बहुस्तरीय आत्मलाई कसरी एकीकृत गर्ने र एकरूप पहिचान कायम राख्ने भन्ने समस्या हो। यस प्रश्नको उत्तर भविष्यको मनोविज्ञान र समाजशास्त्रमा महत्त्वपूर्ण अनुसन्धान विषय बन्नेछ।",
        vi: "Với sự phổ biến của internet và mạng xã hội, con người đã có nhiều bản ngã kỹ thuật số. Bản thân thực tế và bản thân trên mạng không nhất thiết trùng khớp, và cái sau thường được xây dựng như một hình tượng lý tưởng hóa. Tình huống này đặt ra thách thức mới đối với cách nhận thức bản thân. Đó là vấn đề làm thế nào để tích hợp bản ngã đa tầng và duy trì một bản sắc nhất quán. Câu trả lời cho câu hỏi này có lẽ sẽ trở thành một chủ đề nghiên cứu quan trọng trong tâm lý học và xã hội học tương lai.",
        my: "အင်တာနက်နှင့် ဆိုရှယ်မီဒီယာပျံ့နှံ့လာမှုကြောင့် လူများသည် ဒစ်ဂျစ်တယ်မိမိကိုယ်ကို ရေတွက်ရခက်အောင် ပိုင်ဆိုင်လာကြသည်။ လက်တွေ့မိမိနှင့် အွန်လိုင်းမိမိသည် မလွှဲမရှောင်သာ ကိုက်ညီချင်မှသာကိုက်ညီပြီး နောက်ဖော်ပြပါအရာသည် စံနမူနာယူထားသော ပုံစံအဖြစ် တည်ဆောက်လေ့ရှိသည်။ ဤသို့သောအခြေအနေသည် မိမိကိုယ်ကို အသိအမှတ်ပြုပုံစံအပေါ် စိန်ခေါ်မှုအသစ်ကို ဖန်တီးလိုက်သည်။ ဆိုလိုသည်မှာ အလွှာမြောက်များစွာရှိသော မိမိကိုယ်ကို မည်သို့ပေါင်းစည်း၍ တသမတ်တည်းသော ကိုယ်ပိုင်ဂုဏ်သတ္တိကို ထိန်းသိမ်းမည်နည်းဟူသည့် ပြဿနာဖြစ်သည်။ ဤမေးခွန်း၏အဖြေသည် နောင်လာမည့် စိတ်ပညာနှင့်လူမှုပညာတွင် အရေးကြီးသော သုတေသနအကြောင်းအရာဖြစ်လာမည်။" } },
    questions: [
      { question: { jp: "オンライン上の自分はどのように構築されることが多いですか。", translation: { en: "How is the online self often constructed?", ne: "अनलाइन आफूलाई प्रायः कसरी निर्माण गरिन्छ?", vi: "Bản thân trên mạng thường được xây dựng như thế nào?", my: "အွန်လိုင်းမိမိကိုယ်ကို ဘယ်လိုပုံစံမျိုးဖြင့် အများအားဖြင့် တည်ဆောက်လေ့ရှိလဲ။" } },
        choices: [ { jp: "理想化された姿として", translation: { en: "as an idealized figure", ne: "आदर्शीकृत रूपमा", vi: "như một hình tượng lý tưởng hóa", my: "စံနမူနာယူထားသောပုံစံအဖြစ်" } },
          { jp: "現実そのままとして", translation: { en: "as reality itself", ne: "वास्तविकता जस्तै", vi: "như chính hiện thực", my: "လက်တွေ့အတိုင်းအဖြစ်" } },
          { jp: "否定的な姿として", translation: { en: "as a negative figure", ne: "नकारात्मक रूपमा", vi: "như một hình tượng tiêu cực", my: "ငြင်းပယ်သောပုံစံအဖြစ်" } },
          { jp: "ランダムに", translation: { en: "randomly", ne: "अनियमित रूपमा", vi: "một cách ngẫu nhiên", my: "ကျပန်းအားဖြင့်" } } ], answer: 0 },
      { question: { jp: "筆者は何が今後の重要な研究テーマになると述べていますか。", translation: { en: "What does the author say will become an important future research theme?", ne: "लेखकले भविष्यको महत्त्वपूर्ण अनुसन्धान विषय के हुनेछ भनेका छन्?", vi: "Tác giả nói điều gì sẽ trở thành chủ đề nghiên cứu quan trọng trong tương lai?", my: "စာရေးသူက နောင်လာမည့်အရေးကြီးသော သုတေသနအကြောင်းအရာက ဘာဖြစ်လာမလဲလို့ ဆိုထားလဲ။" } },
        choices: [ { jp: "一貫したアイデンティティの保ち方", translation: { en: "how to maintain a consistent identity", ne: "एकरूप पहिचान कायम राख्ने तरिका", vi: "cách duy trì bản sắc nhất quán", my: "တသမတ်တည်းသောကိုယ်ပိုင်ဂုဏ်သတ္တိထိန်းသိမ်းပုံ" } },
          { jp: "インターネットの技術発展", translation: { en: "internet technology development", ne: "इन्टरनेट प्रविधिको विकास", vi: "sự phát triển công nghệ internet", my: "အင်တာနက်နည်းပညာဖွံ့ဖြိုးတိုးတက်မှု" } },
          { jp: "SNSの利用者数", translation: { en: "the number of social media users", ne: "सामाजिक सञ्जाल प्रयोगकर्ता संख्या", vi: "số lượng người dùng mạng xã hội", my: "ဆိုရှယ်မီဒီယာအသုံးပြုသူအရေအတွက်" } },
          { jp: "デジタル機器の性能", translation: { en: "digital device performance", ne: "डिजिटल उपकरणको क्षमता", vi: "hiệu suất thiết bị kỹ thuật số", my: "ဒစ်ဂျစ်တယ်ကိရိယာစွမ်းဆောင်ရည်" } } ], answer: 0 },
    ],
  },
};

const LISTENING_C = {
  N5: { title: { en: "School Festival", ne: "स्कूल उत्सव", vi: "Lễ hội trường học", my: "ကျောင်းပွဲတော်" }, qtype: "概要理解",
    passage: { jp: "今日は学校でお祭りがあります。午前十時に始まります。体育館でダンスを見たり、教室で買い物をしたりできます。お祭りは午後三時に終わります。みなさん、ぜひ来てください。",
      reading: "きょうはがっこうでおまつりがあります。ごぜんじゅうじにはじまります。たいいくかんでダンスをみたり、きょうしつでかいものをしたりできます。おまつりはごごさんじにおわります。みなさん、ぜひきてください。",
      translation: { en: "Today there is a festival at school. It starts at 10am. You can watch dance in the gym and shop in the classrooms. The festival ends at 3pm. Everyone, please come.",
        ne: "आज विद्यालयमा उत्सव छ। बिहान दश बजे सुरु हुन्छ। व्यायामशालामा नाच हेर्न र कक्षाकोठामा किनमेल गर्न सकिन्छ। उत्सव दिउँसो तीन बजे सकिन्छ। सबैजना, कृपया आउनुहोस्।",
        vi: "Hôm nay có lễ hội ở trường. Bắt đầu lúc 10 giờ sáng. Có thể xem múa ở nhà thể thao và mua sắm ở các lớp học. Lễ hội kết thúc lúc 3 giờ chiều. Mọi người, xin hãy đến.",
        my: "ဒီနေ့ ကျောင်းမှာ ပွဲတော်ရှိပါတယ်။ မနက် ၁၀ နာရီမှာ စမယ်။ အားကစားခန်းမမှာ ကလိုက်ကြည့်ပြီး အခန်းတွေမှာ ဈေးဝယ်နိုင်ပါတယ်။ ပွဲတော်က ညနေ ၃ နာရီမှာ ပြီးပါမယ်။ လူတိုင်း လာပါနော်။" } },
    questions: [
      { question: { jp: "お祭りは何時に始まりますか。", translation: { en: "What time does the festival start?", ne: "उत्सव कति बजे सुरु हुन्छ?", vi: "Lễ hội bắt đầu lúc mấy giờ?", my: "ပွဲတော်က ဘယ်နာရီမှာ စမလဲ။" } },
        choices: [ { jp: "午前十時", translation: { en: "10am", ne: "बिहान दश बजे", vi: "10 giờ sáng", my: "မနက် ၁၀ နာရီ" } }, { jp: "午後三時", translation: { en: "3pm", ne: "दिउँसो तीन बजे", vi: "3 giờ chiều", my: "ညနေ ၃ နာရီ" } }, { jp: "午前九時", translation: { en: "9am", ne: "बिहान नौ बजे", vi: "9 giờ sáng", my: "မနက် ၉ နာရီ" } }, { jp: "午後一時", translation: { en: "1pm", ne: "दिउँसो एक बजे", vi: "1 giờ chiều", my: "ညနေ ၁ နာရီ" } } ], answer: 0 },
      { question: { jp: "教室で何ができますか。", translation: { en: "What can you do in the classrooms?", ne: "कक्षाकोठामा के गर्न सकिन्छ?", vi: "Có thể làm gì trong lớp học?", my: "အခန်းထဲမှာ ဘာလုပ်နိုင်လဲ။" } },
        choices: [ { jp: "買い物", translation: { en: "shopping", ne: "किनमेल", vi: "mua sắm", my: "ဈေးဝယ်ခြင်း" } }, { jp: "ダンス", translation: { en: "dance", ne: "नाच", vi: "múa", my: "က" } }, { jp: "スポーツ", translation: { en: "sports", ne: "खेलकुद", vi: "thể thao", my: "အားကစား" } }, { jp: "料理", translation: { en: "cooking", ne: "खाना पकाउने", vi: "nấu ăn", my: "ချက်ပြုတ်ခြင်း" } } ], answer: 0 },
    ] },
  N4: { title: { en: "Train Delay", ne: "रेल ढिलाइ", vi: "Tàu bị trễ", my: "ရထားနောက်ကျခြင်း" }, qtype: "概要理解",
    passage: { jp: "本日、大雨のため、電車が遅れています。次の電車は十五分後に到着する予定です。ご迷惑をおかけして、申し訳ございません。傘をお持ちでない方は、駅の売店でも販売しております。",
      reading: "ほんじつ、おおあめのため、でんしゃがおくれています。つぎのでんしゃはじゅうごふんごにとうちゃくするよていです。ごめいわくをおかけして、もうしわけございません。かさをおもちでないかたは、えきのばいてんでもはんばいしております。",
      translation: { en: "Today, due to heavy rain, trains are delayed. The next train is scheduled to arrive in 15 minutes. We apologize for the inconvenience. For those without umbrellas, they are also sold at the station kiosk.",
        ne: "आज, भारी वर्षाका कारण, रेल ढिलो भइरहेको छ। अर्को रेल पन्ध्र मिनेटपछि आउने अपेक्षा गरिएको छ। असुविधाको लागि माफी चाहन्छौं। छाता नभएकाहरूका लागि, स्टेशनको पसलमा पनि बिक्री गरिन्छ।",
        vi: "Hôm nay, do mưa lớn, tàu bị trễ. Chuyến tàu tiếp theo dự kiến đến sau 15 phút. Chúng tôi xin lỗi vì sự bất tiện này. Những ai không có ô, cũng có bán tại quầy ở ga.",
        my: "ဒီနေ့ မိုးသည်းထန်စွာရွာသွန်းလို့ ရထားနောက်ကျနေပါတယ်။ နောက်ရထားက မိနစ် ၁၅ အကြာမှာ ရောက်ရှိမှာဖြစ်ပါတယ်။ အနှောင့်အယှက်ဖြစ်စေမှုအတွက် တောင်းပန်ပါတယ်။ ထီးမပါသူများအတွက် ဘူတာဆိုင်ခန်းမှာလည်း ရောင်းချထားပါတယ်။" } },
    questions: [
      { question: { jp: "なぜ電車が遅れていますか。", translation: { en: "Why are the trains delayed?", ne: "किन रेल ढिलो भइरहेको छ?", vi: "Tại sao tàu bị trễ?", my: "ဘာကြောင့် ရထားနောက်ကျနေလဲ။" } },
        choices: [ { jp: "大雨のため", translation: { en: "due to heavy rain", ne: "भारी वर्षाका कारण", vi: "vì mưa lớn", my: "မိုးသည်းထန်လို့" } }, { jp: "事故のため", translation: { en: "due to an accident", ne: "दुर्घटनाका कारण", vi: "vì tai nạn", my: "မတော်တဆမှုကြောင့်" } }, { jp: "工事のため", translation: { en: "due to construction", ne: "निर्माणकार्यका कारण", vi: "vì thi công", my: "ဆောက်လုပ်ရေးကြောင့်" } }, { jp: "停電のため", translation: { en: "due to a power outage", ne: "बिजुली अवरोधका कारण", vi: "vì mất điện", my: "လျှပ်စစ်မီးပျက်လို့" } } ], answer: 0 },
      { question: { jp: "傘はどこで買えますか。", translation: { en: "Where can you buy an umbrella?", ne: "छाता कहाँ किन्न सकिन्छ?", vi: "Có thể mua ô ở đâu?", my: "ထီးကို ဘယ်မှာဝယ်လို့ရလဲ။" } },
        choices: [ { jp: "駅の売店", translation: { en: "the station kiosk", ne: "स्टेशनको पसल", vi: "quầy ở ga", my: "ဘူတာဆိုင်ခန်း" } }, { jp: "コンビニ", translation: { en: "convenience store", ne: "कन्भिनियन्स स्टोर", vi: "cửa hàng tiện lợi", my: "အဆင်သင့်ဆိုင်" } }, { jp: "デパート", translation: { en: "department store", ne: "डिपार्टमेन्ट स्टोर", vi: "trung tâm thương mại", my: "ကုန်တိုက်ကြီး" } }, { jp: "スーパー", translation: { en: "supermarket", ne: "सुपरमार्केट", vi: "siêu thị", my: "စူပါမားကတ်" } } ], answer: 0 },
    ] },
  N3: { title: { en: "Health Seminar Announcement", ne: "स्वास्थ्य सेमिनार सूचना", vi: "Thông báo hội thảo sức khỏe", my: "ကျန်းမာရေးဆွေးနွေးပွဲအသိပေးချက်" }, qtype: "概要理解",
    passage: { jp: "来週の土曜日、市民センターで健康セミナーが開かれます。テーマは「毎日の食事と健康」です。参加は無料で、事前の申し込みが必要です。定員は五十名で、先着順となっております。興味のある方は、市のホームページから申し込んでください。",
      reading: "らいしゅうのどようび、しみんセンターでけんこうセミナーがひらかれます。テーマは「まいにちのしょくじとけんこう」です。さんかはむりょうで、じぜんのもうしこみがひつようです。ていいんはごじゅうめいで、せんちゃくじゅんとなっております。きょうみのあるかたは、しのホームページからもうしこんでください。",
      translation: { en: "Next Saturday, a health seminar will be held at the citizens' center. The theme is 'Daily meals and health.' Participation is free, and advance registration is required. Capacity is 50 people, on a first-come, first-served basis. Those interested, please apply from the city's website.",
        ne: "अर्को शनिबार, नगरिक केन्द्रमा स्वास्थ्य सेमिनार आयोजना हुनेछ। विषय «दैनिक खाना र स्वास्थ्य» हो। सहभागिता निःशुल्क छ, र अग्रिम दर्ता आवश्यक छ। क्षमता पचास जना हो, पहिले आउने पहिले पाउने आधारमा। रुचि भएकाहरू, कृपया नगर वेबसाइटबाट आवेदन दिनुहोस्।",
        vi: "Thứ Bảy tuần sau, một hội thảo sức khỏe sẽ được tổ chức tại trung tâm công dân. Chủ đề là 'Bữa ăn hàng ngày và sức khỏe.' Tham gia miễn phí, và cần đăng ký trước. Sức chứa là 50 người, theo thứ tự đến trước. Những ai quan tâm, xin hãy đăng ký từ trang web của thành phố.",
        my: "လာမည့်စနေနေ့တွင် ပြည်သူ့ဌာနတွင် ကျန်းမာရေးဆွေးနွေးပွဲကျင်းပမည်ဖြစ်သည်။ ခေါင်းစဉ်မှာ 「နေ့စဉ်အစားအစာနှင့်ကျန်းမာရေး」 ဖြစ်သည်။ ပါဝင်ခြင်းအခမဲ့ဖြစ်ပြီး ကြိုတင်စာရင်းပေးရန်လိုအပ်သည်။ နေရာအရေအတွက် ၅၀ ဖြစ်ပြီး အရင်ဆိုက်ရောက်သူအရင်ရမည့်စနစ်ဖြစ်သည်။ စိတ်ဝင်စားသူများ မြို့ဝက်ဘ်ဆိုက်မှတဆင့် လျှောက်ထားပါ။" } },
    questions: [
      { question: { jp: "セミナーのテーマは何ですか。", translation: { en: "What is the theme of the seminar?", ne: "सेमिनारको विषय के हो?", vi: "Chủ đề của hội thảo là gì?", my: "ဆွေးနွေးပွဲရဲ့ ခေါင်းစဉ်ကဘာလဲ။" } },
        choices: [ { jp: "毎日の食事と健康", translation: { en: "daily meals and health", ne: "दैनिक खाना र स्वास्थ्य", vi: "bữa ăn hàng ngày và sức khỏe", my: "နေ့စဉ်အစားအစာနှင့်ကျန်းမာရေး" } }, { jp: "子供の教育", translation: { en: "children's education", ne: "बालबालिकाको शिक्षा", vi: "giáo dục trẻ em", my: "ကလေးပညာရေး" } }, { jp: "環境問題", translation: { en: "environmental issues", ne: "वातावरणीय समस्या", vi: "vấn đề môi trường", my: "သဘာဝပတ်ဝန်းကျင်ပြဿနာ" } }, { jp: "交通安全", translation: { en: "traffic safety", ne: "यातायात सुरक्षा", vi: "an toàn giao thông", my: "သွားလာရေးဘေးကင်းမှု" } } ], answer: 0 },
      { question: { jp: "参加するにはどうすればいいですか。", translation: { en: "What should you do to participate?", ne: "सहभागी हुन के गर्नुपर्छ?", vi: "Cần làm gì để tham gia?", my: "ပါဝင်ဖို့ ဘာလုပ်ရမလဲ။" } },
        choices: [ { jp: "ホームページから申し込む", translation: { en: "apply from the website", ne: "वेबसाइटबाट आवेदन दिने", vi: "đăng ký từ trang web", my: "ဝက်ဘ်ဆိုက်မှတဆင့် လျှောက်ထားရန်" } }, { jp: "電話をかける", translation: { en: "make a phone call", ne: "फोन गर्ने", vi: "gọi điện thoại", my: "ဖုန်းခေါ်ရန်" } }, { jp: "直接会場に行く", translation: { en: "go directly to the venue", ne: "सिधै स्थलमा जाने", vi: "đến trực tiếp địa điểm", my: "တိုက်ရိုက်ရောက်ရှိရန်" } }, { jp: "手紙を送る", translation: { en: "send a letter", ne: "चिठी पठाउने", vi: "gửi thư", my: "စာပို့ရန်" } } ], answer: 0 },
    ] },
  N2: { title: { en: "Product Recall Notice", ne: "उत्पादन फिर्ता सूचना", vi: "Thông báo thu hồi sản phẩm", my: "ကုန်ပစ္စည်းပြန်လည်ရုတ်သိမ်းမှုအသိပေးချက်" }, qtype: "概要理解",
    passage: { jp: "弊社の製品の一部において、部品の不具合が確認されました。対象の製品をお持ちのお客様は、無料で交換いたしますので、お手数ですが、下記の窓口までご連絡ください。なお、健康や安全に影響を及ぼす可能性は低いとのことですが、念のため使用を中止していただくようお願いいたします。",
      reading: "へいしゃのせいひんのいちぶにおいて、ぶひんのふぐあいがかくにんされました。たいしょうのせいひんをおもちのおきゃくさまは、むりょうでこうかんいたしますので、おてすうですが、かきのまどぐちまでごれんらくください。なお、けんこうやあんぜんにえいきょうをおよぼすかのうせいはひくいとのことですが、ねんのためしようをちゅうしていただくようおねがいいたします。",
      translation: { en: "A malfunction in parts has been confirmed in some of our company's products. For customers who have the affected product, we will exchange it free of charge, so please contact the following contact point. Additionally, while the possibility of affecting health or safety is said to be low, we ask that you please stop using it as a precaution.",
        ne: "हाम्रो कम्पनीको केही उत्पादनहरूमा पार्ट्सको खराबी पुष्टि भएको छ। प्रभावित उत्पादन भएका ग्राहकहरूलाई, हामी निःशुल्क साट्नेछौं, त्यसैले तलको सम्पर्क बिन्दुमा सम्पर्क गर्नुहोस्। साथै, स्वास्थ्य वा सुरक्षामा असर पार्ने सम्भावना कम भए तापनि, सावधानीको लागि प्रयोग बन्द गर्न अनुरोध छ।",
        vi: "Đã xác nhận lỗi linh kiện trong một số sản phẩm của công ty chúng tôi. Đối với khách hàng có sản phẩm bị ảnh hưởng, chúng tôi sẽ đổi miễn phí, vậy xin liên hệ điểm liên lạc dưới đây. Ngoài ra, mặc dù khả năng ảnh hưởng đến sức khỏe hoặc an toàn được cho là thấp, chúng tôi xin quý khách ngừng sử dụng để đề phòng.",
        my: "ကျွန်ုပ်တို့ကုမ္ပဏီ၏ ကုန်ပစ္စည်းအချို့တွင် အစိတ်အပိုင်းချို့ယွင်းမှုကို အတည်ပြုရရှိခဲ့ပါသည်။ သက်ဆိုင်ရာကုန်ပစ္စည်းရှိသော ဖောက်သည်များအား အခမဲ့လဲလှယ်ပေးမည်ဖြစ်၍ အောက်ဖော်ပြပါဆက်သွယ်ရန်နေရာသို့ ဆက်သွယ်ပါရန်။ ထို့အပြင် ကျန်းမာရေးနှင့်ဘေးကင်းရေးအပေါ် သက်ရောက်နိုင်ခြေနည်းပါးသော်လည်း သတိထားသည့်အနေဖြင့် အသုံးပြုမှုရပ်တန့်ပေးရန် တောင်းဆိုအပ်ပါသည်။" } },
    questions: [
      { question: { jp: "この製品はどうなりましたか。", translation: { en: "What happened with this product?", ne: "यो उत्पादनलाई के भयो?", vi: "Sản phẩm này đã xảy ra chuyện gì?", my: "ဒီကုန်ပစ္စည်းက ဘာဖြစ်သွားလဲ။" } },
        choices: [ { jp: "部品の不具合が見つかった", translation: { en: "a parts malfunction was found", ne: "पार्ट्सको खराबी फेला पर्यो", vi: "phát hiện lỗi linh kiện", my: "အစိတ်အပိုင်းချို့ယွင်းချက်တွေ့ရှိခဲ့သည်" } }, { jp: "価格が上がった", translation: { en: "the price went up", ne: "मूल्य बढ्यो", vi: "giá tăng", my: "စျေးနှုန်းမြင့်တက်သည်" } }, { jp: "販売が終了した", translation: { en: "sales ended", ne: "बिक्री बन्द भयो", vi: "ngừng bán", my: "ရောင်းချမှုရပ်ဆိုင်းသည်" } }, { jp: "デザインが変わった", translation: { en: "the design changed", ne: "डिजाइन परिवर्तन भयो", vi: "thiết kế thay đổi", my: "ဒီဇိုင်းပြောင်းလဲသည်" } } ], answer: 0 },
      { question: { jp: "お客様は何をするよう頼まれていますか。", translation: { en: "What are customers being asked to do?", ne: "ग्राहकहरूलाई के गर्न भनिएको छ?", vi: "Khách hàng được yêu cầu làm gì?", my: "ဖောက်သည်များ ဘာလုပ်ဖို့တောင်းဆိုခံရလဲ။" } },
        choices: [ { jp: "使用を中止する", translation: { en: "stop using it", ne: "प्रयोग बन्द गर्ने", vi: "ngừng sử dụng", my: "အသုံးပြုမှုရပ်တန့်ရန်" } }, { jp: "すぐに捨てる", translation: { en: "throw it away immediately", ne: "तुरुन्त फाल्ने", vi: "vứt bỏ ngay lập tức", my: "ချက်ချင်းစွန့်ပစ်ရန်" } }, { jp: "もっと使う", translation: { en: "use it more", ne: "अझ बढी प्रयोग गर्ने", vi: "sử dụng nhiều hơn", my: "ပိုအသုံးပြုရန်" } }, { jp: "返金を受ける", translation: { en: "receive a refund", ne: "रकम फिर्ता लिने", vi: "nhận hoàn tiền", my: "ငွေပြန်အမ်းခံယူရန်" } } ], answer: 0 },
    ] },
  N1: { title: { en: "The Easterlin Paradox", ne: "इस्टरलिन विरोधाभास", vi: "Nghịch lý Easterlin", my: "Easterlin ဆန့်ကျင်ဘက်သဘောတရား" }, qtype: "概要理解",
    passage: { jp: "経済成長と幸福度の関係については、長年議論が続いている。一定の所得水準までは、収入の増加が幸福度の向上につながるとされるが、それを超えると相関は弱まるという研究結果もある。この現象は「イースタリンの逆説」として知られ、物質的豊かさだけでは人間の幸福を説明できないことを示唆している。したがって、政策立案においても、経済指標だけでなく、主観的な幸福度を考慮する必要性が高まっている。",
      reading: "けいざいせいちょうとこうふくどのかんけいについては、ながねんぎろんがつづいている。いっていのしょとくすいじゅんまでは、しゅうにゅうのぞうかがこうふくどのこうじょうにつながるとされるが、それをこえるとそうかんはよわまるというけんきゅうけっかもある。このげんしょうは「イースタリンのぎゃくせつ」としてしられ、ぶっしつてきゆたかさだけではにんげんのこうふくをせつめいできないことをしさしている。したがって、せいさくりつあんにおいても、けいざいしひょうだけでなく、しゅかんてきなこうふくどをこうりょするひつようせいがたかまっている。",
      translation: { en: "The relationship between economic growth and happiness has been debated for many years. Up to a certain income level, an increase in income is said to lead to improved happiness, but there are also research results showing that beyond that, the correlation weakens. This phenomenon is known as the 'Easterlin Paradox,' and suggests that material wealth alone cannot explain human happiness. Therefore, in policy-making as well, the need to consider subjective well-being, not just economic indicators, is increasing.",
        ne: "आर्थिक वृद्धि र खुशीको सम्बन्धबारे धेरै वर्षदेखि बहस जारी छ। निश्चित आय स्तरसम्म, आम्दानी बढ्नु खुशी बढाउँछ भनिन्छ, तर त्यो नाघेपछि सम्बन्ध कमजोर हुन्छ भन्ने अनुसन्धान नतिजा पनि छ। यो घटनालाई «इस्टरलिन विरोधाभास» भनेर चिनिन्छ, र भौतिक समृद्धिले मात्र मानव खुशी व्याख्या गर्न नसक्ने संकेत गर्छ। त्यसैले, नीति निर्माणमा पनि आर्थिक सूचकांक मात्र नभई, व्यक्तिगत खुशीलाई पनि विचार गर्नुपर्ने आवश्यकता बढ्दैछ।",
        vi: "Mối quan hệ giữa tăng trưởng kinh tế và hạnh phúc đã được tranh luận trong nhiều năm. Cho đến một mức thu nhập nhất định, sự gia tăng thu nhập được cho là dẫn đến hạnh phúc tăng lên, nhưng cũng có kết quả nghiên cứu cho thấy vượt qua mức đó thì tương quan yếu đi. Hiện tượng này được biết đến là 'Nghịch lý Easterlin', và gợi ý rằng chỉ riêng sự giàu có vật chất không thể giải thích được hạnh phúc con người. Do đó, trong việc hoạch định chính sách, nhu cầu xem xét hạnh phúc chủ quan, không chỉ các chỉ số kinh tế, đang tăng lên.",
        my: "စီးပွားရေးတိုးတက်မှုနှင့် ပျော်ရွှင်မှုကြားဆက်နွယ်မှုနှင့်ပတ်သက်၍ နှစ်ပေါင်းများစွာ ဆွေးနွေးမှုဆက်လက်ရှိနေသည်။ သတ်မှတ်ဝင်ငွေအဆင့်အထိ ဝင်ငွေတိုးလာခြင်းသည် ပျော်ရွှင်မှုတိုးတက်ခြင်းသို့ ဦးတည်သည်ဟုဆိုသော်လည်း ထိုအဆင့်ကျော်လွန်ပါက ဆက်စပ်မှုအားနည်းသွားကြောင်း သုတေသနရလဒ်များလည်းရှိသည်။ ဤဖြစ်ရပ်ကို 「Easterlin ဆန့်ကျင်ဘက်သဘောတရား」ဟုသိကြပြီး ရုပ်ပိုင်းဆိုင်ရာချမ်းသာကြွယ်ဝမှုတစ်ခုတည်းဖြင့် လူသား၏ပျော်ရွှင်မှုကို ရှင်းပြ၍မရနိုင်ကြောင်း ညွှန်ပြသည်။ ထို့ကြောင့် မူဝါဒချမှတ်ရာတွင်လည်း စီးပွားရေးညွှန်းကိန်းများသာမက ပင်ကိုယ်ပျော်ရွှင်မှုကိုပါ ထည့်သွင်းစဉ်းစားရန်လိုအပ်ချက် မြင့်တက်လျက်ရှိသည်။" } },
    questions: [
      { question: { jp: "「イースタリンの逆説」とは何を示唆していますか。", translation: { en: "What does the 'Easterlin Paradox' suggest?", ne: "«इस्टरलिन विरोधाभास»ले के संकेत गर्छ?", vi: "'Nghịch lý Easterlin' gợi ý điều gì?", my: "「Easterlin ဆန့်ကျင်ဘက်သဘောတရား」က ဘာကိုညွှန်ပြလဲ။" } },
        choices: [ { jp: "物質的豊かさだけでは幸福を説明できないこと", translation: { en: "material wealth alone cannot explain happiness", ne: "भौतिक समृद्धिले मात्र खुशी व्याख्या गर्न नसक्ने", vi: "chỉ riêng sự giàu có vật chất không thể giải thích hạnh phúc", my: "ရုပ်ပိုင်းဆိုင်ရာချမ်းသာကြွယ်ဝမှုတစ်ခုတည်းဖြင့် ပျော်ရွှင်မှုကိုရှင်းပြ၍မရ" } }, { jp: "収入が多いほど幸せなこと", translation: { en: "the more income, the happier", ne: "आम्दानी बढी भएमा खुशी बढी हुने", vi: "thu nhập càng nhiều càng hạnh phúc", my: "ဝင်ငွေများလေ ပျော်ရွှင်မှုများလေ" } }, { jp: "経済成長が不要なこと", translation: { en: "economic growth is unnecessary", ne: "आर्थिक वृद्धि अनावश्यक भएको", vi: "tăng trưởng kinh tế là không cần thiết", my: "စီးပွားရေးတိုးတက်မှု မလိုအပ်ကြောင်း" } }, { jp: "幸福度は測定できないこと", translation: { en: "happiness cannot be measured", ne: "खुशी नाप्न नसकिने", vi: "hạnh phúc không thể đo lường được", my: "ပျော်ရွှင်မှုကို တိုင်းတာ၍မရ" } } ], answer: 0 },
      { question: { jp: "政策立案において何が必要とされていますか。", translation: { en: "What is said to be necessary in policy-making?", ne: "नीति निर्माणमा के आवश्यक भनिएको छ?", vi: "Điều gì được cho là cần thiết trong hoạch định chính sách?", my: "မူဝါဒချမှတ်ရာတွင် ဘာလိုအပ်တယ်လို့ ဆိုထားလဲ။" } },
        choices: [ { jp: "主観的な幸福度を考慮すること", translation: { en: "considering subjective well-being", ne: "व्यक्तिगत खुशीलाई विचार गर्ने", vi: "xem xét hạnh phúc chủ quan", my: "ပင်ကိုယ်ပျော်ရွှင်မှုကို ထည့်သွင်းစဉ်းစားခြင်း" } }, { jp: "経済指標だけを見ること", translation: { en: "looking only at economic indicators", ne: "आर्थिक सूचकांक मात्र हेर्ने", vi: "chỉ nhìn vào các chỉ số kinh tế", my: "စီးပွားရေးညွှန်းကိန်းများကိုသာ ကြည့်ခြင်း" } }, { jp: "税金を減らすこと", translation: { en: "reducing taxes", ne: "कर घटाउने", vi: "giảm thuế", my: "အခွန်လျှော့ချခြင်း" } }, { jp: "所得を均等にすること", translation: { en: "equalizing income", ne: "आम्दानी बराबर बनाउने", vi: "cân bằng thu nhập", my: "ဝင်ငွေညီမျှအောင်ပြုလုပ်ခြင်း" } } ], answer: 0 },
    ] },
};

// Merge each question-type set into an array per level for selectable practice sets
const READING_SETS = LEVELS.reduce((acc, lvl) => { acc[lvl] = [READING[lvl], READING_B[lvl], READING_C[lvl]]; return acc; }, {});
const LISTENING_SETS = LEVELS.reduce((acc, lvl) => { acc[lvl] = [LISTENING[lvl], LISTENING_B[lvl], LISTENING_C[lvl]]; return acc; }, {});

// ================= JLPT風 聴解追加 =================

const JLPT_LISTENING_EXTRA = {
  N5: [
    {
      title: { ja: "スーパーで買い物", en: "Shopping at a supermarket" },
      qtype: "課題理解",
      passage: {
        jp: "男の人と女の人がスーパーで話しています。男：牛乳を買いますか。女：牛乳は家にあります。でも、卵がありません。男：じゃあ、卵を買いましょう。",
        reading: "おとこのひととおんなのひとがスーパーではなしています。おとこ：ぎゅうにゅうをかいますか。おんな：ぎゅうにゅうはいえにあります。でも、たまごがありません。おとこ：じゃあ、たまごをかいましょう。",
        translation: {
          en: "A man and a woman are talking at a supermarket.",
          ne: "",
          vi: "",
          my: ""
        }
      },
      questions: [
        {
          question: {
            jp: "二人は何を買いますか。",
            translation: { en: "What will they buy?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "牛乳", translation: { en: "Milk", ne: "", vi: "", my: "" } },
            { jp: "卵", translation: { en: "Eggs", ne: "", vi: "", my: "" } },
            { jp: "パン", translation: { en: "Bread", ne: "", vi: "", my: "" } },
            { jp: "水", translation: { en: "Water", ne: "", vi: "", my: "" } }
          ],
          answer: 1
        }
      ]
    },

    {
      title: { ja: "駅はどこですか", en: "Where is the station?" },
      qtype: "即時応答",
      passage: {
        jp: "すみません、駅はどこですか。",
        reading: "すみません、えきはどこですか。",
        translation: { en: "Excuse me, where is the station?", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "一番自然な答えはどれですか。",
            translation: { en: "Which response is most natural?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "あそこです。", translation: { en: "It's over there.", ne: "", vi: "", my: "" } },
            { jp: "三時です。", translation: { en: "It's three o'clock.", ne: "", vi: "", my: "" } },
            { jp: "百円です。", translation: { en: "It's 100 yen.", ne: "", vi: "", my: "" } },
            { jp: "雨です。", translation: { en: "It's raining.", ne: "", vi: "", my: "" } }
          ],
          answer: 0
        }
      ]
    }
  ],

  N4: [
    {
      title: { ja: "映画の待ち合わせ", en: "Meeting before a movie" },
      qtype: "ポイント理解",
      passage: {
        jp: "男の人と女の人が電話で話しています。男：明日の映画は二時からですね。女：はい。でも、一時半に駅で会いませんか。男：分かりました。では、一時半に駅ですね。",
        reading: "おとこのひととおんなのひとがでんわではなしています。",
        translation: { en: "A man and a woman are arranging a meeting time.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "二人は何時に会いますか。",
            translation: { en: "What time will they meet?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "一時", translation: { en: "1:00", ne: "", vi: "", my: "" } },
            { jp: "一時半", translation: { en: "1:30", ne: "", vi: "", my: "" } },
            { jp: "二時", translation: { en: "2:00", ne: "", vi: "", my: "" } },
            { jp: "二時半", translation: { en: "2:30", ne: "", vi: "", my: "" } }
          ],
          answer: 1
        }
      ]
    },

    {
      title: { ja: "テストの持ち物", en: "What to bring to the test" },
      qtype: "課題理解",
      passage: {
        jp: "先生が学生に話しています。明日のテストでは辞書を使ってはいけません。鉛筆と消しゴムだけ持ってきてください。",
        reading: "せんせいががくせいにはなしています。",
        translation: { en: "A teacher is explaining what students should bring.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "学生は何を持ってきますか。",
            translation: { en: "What should the students bring?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "辞書", translation: { en: "A dictionary", ne: "", vi: "", my: "" } },
            { jp: "教科書", translation: { en: "A textbook", ne: "", vi: "", my: "" } },
            { jp: "鉛筆と消しゴム", translation: { en: "A pencil and eraser", ne: "", vi: "", my: "" } },
            { jp: "パソコン", translation: { en: "A computer", ne: "", vi: "", my: "" } }
          ],
          answer: 2
        }
      ]
    }
  ],

  N3: [
    {
      title: { ja: "アルバイトの予定変更", en: "Part-time work schedule change" },
      qtype: "課題理解",
      passage: {
        jp: "店長と学生が話しています。店長：土曜日の午後、山田さんが休みになりました。代わりに出られますか。学生：午後は授業がありますが、五時からなら大丈夫です。店長：では、五時からお願いします。",
        reading: "てんちょうとがくせいがはなしています。",
        translation: { en: "A manager and a student are discussing a work shift.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "学生は何時から働きますか。",
            translation: { en: "What time will the student start working?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "三時", translation: { en: "3:00", ne: "", vi: "", my: "" } },
            { jp: "四時", translation: { en: "4:00", ne: "", vi: "", my: "" } },
            { jp: "五時", translation: { en: "5:00", ne: "", vi: "", my: "" } },
            { jp: "六時", translation: { en: "6:00", ne: "", vi: "", my: "" } }
          ],
          answer: 2
        }
      ]
    },

    {
      title: { ja: "地域のお祭り", en: "Local festival" },
      qtype: "概要理解",
      passage: {
        jp: "市役所の人が地域のお祭りについて説明しています。今年は住民同士の交流を深めることを目的に、子どもから高齢者まで参加できる企画を増やしました。",
        reading: "しやくしょのひとがちいきのおまつりについてせつめいしています。",
        translation: { en: "A city employee is explaining the purpose of a local festival.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "この話の中心は何ですか。",
            translation: { en: "What is the main point?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "祭りの目的", translation: { en: "The purpose of the festival", ne: "", vi: "", my: "" } },
            { jp: "交通問題", translation: { en: "Traffic problems", ne: "", vi: "", my: "" } },
            { jp: "学校の予定", translation: { en: "The school schedule", ne: "", vi: "", my: "" } },
            { jp: "店の営業時間", translation: { en: "Store opening hours", ne: "", vi: "", my: "" } }
          ],
          answer: 0
        }
      ]
    }
  ],

  N2: [
    {
      title: { ja: "会議の日程", en: "Meeting schedule" },
      qtype: "ポイント理解",
      passage: {
        jp: "会社員二人が会議の日程について話しています。月曜日は部長が出張で、火曜日は取引先との予定があります。水曜日の午後なら全員参加できるので、その時間に会議を行うことになりました。",
        reading: "かいしゃいんふたりがかいぎのにっていについてはなしています。",
        translation: { en: "Two employees are deciding when to hold a meeting.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "会議はいつ行われますか。",
            translation: { en: "When will the meeting be held?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "月曜日の午後", translation: { en: "Monday afternoon", ne: "", vi: "", my: "" } },
            { jp: "火曜日の午後", translation: { en: "Tuesday afternoon", ne: "", vi: "", my: "" } },
            { jp: "水曜日の午前", translation: { en: "Wednesday morning", ne: "", vi: "", my: "" } },
            { jp: "水曜日の午後", translation: { en: "Wednesday afternoon", ne: "", vi: "", my: "" } }
          ],
          answer: 3
        }
      ]
    },

    {
      title: { ja: "在宅勤務について", en: "Working from home" },
      qtype: "概要理解",
      passage: {
        jp: "男性が働き方について話しています。在宅勤務には通勤時間を減らせる利点がありますが、同僚とのコミュニケーションが不足しやすいという問題もあります。そのため、状況に応じて出社と在宅勤務を組み合わせることが重要だと考えています。",
        reading: "だんせいがはたらきかたについてはなしています。",
        translation: { en: "A man gives his opinion about working from home.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "男性が最も言いたいことは何ですか。",
            translation: { en: "What does the man most want to say?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "在宅勤務はやめるべきだ", translation: { en: "Remote work should be stopped", ne: "", vi: "", my: "" } },
            { jp: "毎日出社するべきだ", translation: { en: "People should go to the office every day", ne: "", vi: "", my: "" } },
            { jp: "出社と在宅勤務を組み合わせるべきだ", translation: { en: "Office and remote work should be combined", ne: "", vi: "", my: "" } },
            { jp: "通勤時間を長くするべきだ", translation: { en: "Commuting time should be increased", ne: "", vi: "", my: "" } }
          ],
          answer: 2
        }
      ]
    }
  ],

  N1: [
    {
      title: { ja: "技術革新と社会", en: "Technology and society" },
      qtype: "概要理解",
      passage: {
        jp: "専門家が技術革新について話しています。新しい技術は生活を便利にする一方で、その利益が社会全体に均等に行き渡るとは限りません。重要なのは、技術そのものを評価するだけでなく、誰が利益を受け、誰が負担を負うのかという視点から検討することです。",
        reading: "せんもんかがぎじゅつかくしんについてはなしています。",
        translation: { en: "An expert discusses technological innovation and its social impact.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "専門家が最も強調していることは何ですか。",
            translation: { en: "What does the expert emphasize most?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "新技術は必ず社会を良くする", translation: { en: "New technology always improves society", ne: "", vi: "", my: "" } },
            { jp: "技術開発の速度が最も重要だ", translation: { en: "Development speed is the most important thing", ne: "", vi: "", my: "" } },
            { jp: "利益と負担の分配も考える必要がある", translation: { en: "We must consider how benefits and burdens are distributed", ne: "", vi: "", my: "" } },
            { jp: "技術開発を止めるべきだ", translation: { en: "Technological development should stop", ne: "", vi: "", my: "" } }
          ],
          answer: 2
        }
      ]
    },

    {
      title: { ja: "研究発表の準備", en: "Preparing a research presentation" },
      qtype: "課題理解",
      passage: {
        jp: "教授と学生が研究発表について話しています。教授：資料の内容は十分ですが、結論が少し分かりにくいですね。学生：では、データを追加したほうがいいでしょうか。教授：データより、最初に示した問題意識と結論の関係をはっきりさせてください。学生：分かりました。",
        reading: "きょうじゅとがくせいがけんきゅうはっぴょうについてはなしています。",
        translation: { en: "A professor and student discuss a research presentation.", ne: "", vi: "", my: "" }
      },
      questions: [
        {
          question: {
            jp: "学生は次に何をする必要がありますか。",
            translation: { en: "What should the student do next?", ne: "", vi: "", my: "" }
          },
          choices: [
            { jp: "データを増やす", translation: { en: "Add more data", ne: "", vi: "", my: "" } },
            { jp: "発表時間を短くする", translation: { en: "Shorten the presentation", ne: "", vi: "", my: "" } },
            { jp: "問題意識と結論の関係を明確にする", translation: { en: "Clarify the relationship between the issue and conclusion", ne: "", vi: "", my: "" } },
            { jp: "研究テーマを変える", translation: { en: "Change the research topic", ne: "", vi: "", my: "" } }
          ],
          answer: 2
        }
      ]
    }
  ]
};

for (const lvl of LEVELS) {
  LISTENING_SETS[lvl].push(...JLPT_LISTENING_EXTRA[lvl]);
}






/* ============================= HELPERS ============================= */


/* ============================= ADDED CONTENT: CONVERSATION / READING / LISTENING ============================= */
// 残りの学習コンテンツだけを追加します。
// 追加対象:
//   CONVERSATIONS  : 100セット（各レベル20）
//   READING_SETS   : 100セット（各レベル20）
//   LISTENING_SETS : 100セット（各レベル20）
//
// 変更しない:
//   KANJI / VOCAB / GRAMMAR / UI / ゲームロジック
//
// 現在のアプリは翻訳に `xxx[lang] || xxx.en` を使っているため、
// 新規コンテンツは英語を安全なフォールバックとして持たせます。

const LEVELS_REMAINING = ["N5", "N4", "N3", "N2", "N1"];

const TOPICS = [
  ["駅", "Station"],
  ["コンビニ", "Convenience Store"],
  ["学校", "School"],
  ["仕事", "Work"],
  ["病院", "Hospital"],
  ["レストラン", "Restaurant"],
  ["買い物", "Shopping"],
  ["天気", "Weather"],
  ["旅行", "Travel"],
  ["友達", "Friends"],
  ["家", "Home"],
  ["銀行", "Bank"],
  ["郵便局", "Post Office"],
  ["図書館", "Library"],
  ["市役所", "City Hall"],
  ["電車", "Train"],
  ["電話", "Phone"],
  ["予定", "Plans"],
  ["勉強", "Study"],
  ["ニュース", "News"],
];

function tr(en, ja = "") {
  return { ja, en };
}

function convoLine(speaker, jp, reading, en) {
  return {
    speaker,
    jp,
    reading,
    meaning: tr(en),
  };
}

const CONVO_BUILDERS = {
  N5: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} ${i + 1}`, `${jpTopic}の会話 ${i + 1}`),
    lines: [
      convoLine("A", `${jpTopic}はどこですか。`, `${jpTopic}はどこですか。`, `Where is the ${enTopic.toLowerCase()}?`),
      convoLine("B", `あそこです。`, `あそこです。`, "It is over there."),
      convoLine("A", `何時までですか。`, `なんじまでですか。`, "Until what time is it open?"),
      convoLine("B", `午後六時までです。`, `ごごろくじまでです。`, "It is open until 6 p.m."),
    ],
  }),
  N4: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} conversation ${i + 1}`, `${jpTopic}についての会話 ${i + 1}`),
    lines: [
      convoLine("A", `${jpTopic}へ行きたいんですが、どう行けばいいですか。`, `${jpTopic}へいきたいんですが、どういけばいいですか。`, `I'd like to go to the ${enTopic.toLowerCase()}. How should I get there?`),
      convoLine("B", `この道をまっすぐ行って、二つ目の角を右に曲がってください。`, `このみちをまっすぐいって、ふたつめのかどをみぎにまがってください。`, "Go straight on this road and turn right at the second corner."),
      convoLine("A", `歩いてどのくらいかかりますか。`, `あるいてどのくらいかかりますか。`, "How long does it take on foot?"),
      convoLine("B", `十分ぐらいだと思います。`, `じゅっぷんぐらいだとおもいます。`, "I think it takes about ten minutes."),
    ],
  }),
  N3: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic}: arranging details ${i + 1}`, `${jpTopic}の予定確認 ${i + 1}`),
    lines: [
      convoLine("A", `${jpTopic}の予定について確認したいんですが、今少しいいですか。`, `${jpTopic}のよていについてかくにんしたいんですが、いますこしいいですか。`, `I'd like to confirm the plans for ${enTopic.toLowerCase()}. Do you have a moment?`),
      convoLine("B", `はい。予定が少し変わったので、時間を一時間遅らせることになりました。`, `はい。よていがすこしかわったので、じかんをいちじかんおくらせることになりました。`, "Yes. The plan changed a little, so it was decided to move the time one hour later."),
      convoLine("A", `分かりました。ほかに準備しておくことはありますか。`, `わかりました。ほかにじゅんびしておくことはありますか。`, "Understood. Is there anything else I should prepare?"),
      convoLine("B", `資料を先に読んでおいてもらえると助かります。`, `しりょうをさきによんでおいてもらえるとたすかります。`, "It would help if you could read the materials beforehand."),
    ],
  }),
  N2: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic}: discussing a problem ${i + 1}`, `${jpTopic}の問題について話し合う ${i + 1}`),
    lines: [
      convoLine("A", `${jpTopic}について、最近いくつか問題が出ているようですが、どう考えていますか。`, `${jpTopic}について、さいきんいくつかもんだいがでているようですが、どうかんがえていますか。`, `There seem to be several recent problems concerning ${enTopic.toLowerCase()}. What do you think?`),
      convoLine("B", `原因を一つに決めつけるのではなく、状況を整理したうえで対策を考える必要があると思います。`, `げんいんをひとつにきめつけるのではなく、じょうきょうをせいりしたうえでたいさくをかんがえるひつようがあるとおもいます。`, "Rather than assuming there is only one cause, I think we need to organize the situation and then consider countermeasures."),
      convoLine("A", `確かに。関係者の意見も聞いたほうがよさそうですね。`, `たしかに。かんけいしゃのいけんもきいたほうがよさそうですね。`, "Indeed. It seems better to hear the opinions of those involved as well."),
      convoLine("B", `そうですね。結論を急がないことが大切です。`, `そうですね。けつろんをいそがないことがたいせつです。`, "Yes. It is important not to rush to a conclusion."),
    ],
  }),
  N1: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic}: advanced discussion ${i + 1}`, `${jpTopic}についての高度な議論 ${i + 1}`),
    lines: [
      convoLine("A", `${jpTopic}をめぐる議論は活発ですが、短期的な効果だけで判断してよいのでしょうか。`, `${jpTopic}をめぐるぎろんはかっぱつですが、たんきてきなこうかだけではんだんしてよいのでしょうか。`, `Debate surrounding ${enTopic.toLowerCase()} is active, but should it really be judged only by short-term effects?`),
      convoLine("B", `おっしゃる通りです。目先の利益にとらわれると、長期的な影響を見落としかねません。`, `おっしゃるとおりです。めさきのりえきにとらわれると、ちょうきてきなえいきょうをみおとしかねません。`, "Exactly. If we become preoccupied with immediate benefits, we may overlook long-term effects."),
      convoLine("A", `となると、複数の立場から検証する仕組みが欠かせませんね。`, `となると、ふくすうのたちばからけんしょうするしくみがかかせませんね。`, "In that case, a system for examining the issue from multiple perspectives is indispensable."),
      convoLine("B", `ええ。透明性を確保しつつ、継続的に見直す姿勢が求められるでしょう。`, `ええ。とうめいせいをかくほしつつ、けいぞくてきにみなおすしせいがもとめられるでしょう。`, "Yes. We will likely need an attitude of continuous review while ensuring transparency."),
    ],
  }),
};

const READING_BUILDERS = {
  N5: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} notice ${i + 1}`),
    qtype: `短文${i + 1}`,
    passage: {
      jp: `${jpTopic}は朝九時から午後六時までです。土曜日は午後三時に終わります。日曜日は休みです。`,
      reading: `${jpTopic}はあさくじからごごろくじまでです。どようびはごごさんじにおわります。にちようびはやすみです。`,
      translation: tr(`The ${enTopic.toLowerCase()} is open from 9 a.m. to 6 p.m. On Saturday it closes at 3 p.m. It is closed on Sunday.`),
    },
    questions: [{
      question: { jp: "日曜日はどうですか。", translation: tr("What about Sunday?") },
      choices: [
        { jp: "休みです", translation: tr("It is closed.") },
        { jp: "朝九時からです", translation: tr("It opens from 9 a.m.") },
        { jp: "午後三時までです", translation: tr("It is open until 3 p.m.") },
        { jp: "午後六時までです", translation: tr("It is open until 6 p.m.") },
      ],
      answer: 0,
    }],
  }),
  N4: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} information ${i + 1}`),
    qtype: `情報検索${i + 1}`,
    passage: {
      jp: `${jpTopic}では、今月から新しいサービスが始まりました。利用したい人は、受付で名前を書いてからカードをもらってください。カードがないと利用できません。`,
      reading: `${jpTopic}では、こんげつからあたらしいサービスがはじまりました。りようしたいひとは、うけつけでなまえをかいてからカードをもらってください。カードがないとりようできません。`,
      translation: tr(`A new service started this month at the ${enTopic.toLowerCase()}. People who want to use it must write their name at reception and receive a card. The service cannot be used without the card.`),
    },
    questions: [{
      question: { jp: "サービスを利用するために、何が必要ですか。", translation: tr("What is needed to use the service?") },
      choices: [
        { jp: "カード", translation: tr("A card") },
        { jp: "写真", translation: tr("A photo") },
        { jp: "予約", translation: tr("A reservation") },
        { jp: "現金", translation: tr("Cash") },
      ],
      answer: 0,
    }],
  }),
  N3: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} change ${i + 1}`),
    qtype: `内容理解${i + 1}`,
    passage: {
      jp: `${jpTopic}では利用者が増えたため、来月から受付方法を変更することになった。これまでは当日でも申し込めたが、来月からは前日までの予約が必要になる。ただし、緊急の場合は受付で相談できる。`,
      reading: `${jpTopic}ではりようしゃがふえたため、らいげつからうけつけほうほうをへんこうすることになった。これまではとうじつでももうしこめたが、らいげつからはぜんじつまでのよやくがひつようになる。ただし、きんきゅうのばあいはうけつけでそうだんできる。`,
      translation: tr(`Because the number of users has increased, the ${enTopic.toLowerCase()} will change its reception procedure next month. Until now, same-day applications were possible, but from next month reservations must be made by the previous day. In urgent cases, however, users may consult reception.`),
    },
    questions: [{
      question: { jp: "来月から何が変わりますか。", translation: tr("What will change from next month?") },
      choices: [
        { jp: "前日までの予約が必要になる", translation: tr("Reservations will be required by the previous day.") },
        { jp: "利用できなくなる", translation: tr("It will no longer be available.") },
        { jp: "受付がなくなる", translation: tr("Reception will disappear.") },
        { jp: "料金が無料になる", translation: tr("The fee will become free.") },
      ],
      answer: 0,
    }],
  }),
  N2: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} policy ${i + 1}`),
    qtype: `主張理解${i + 1}`,
    passage: {
      jp: `${jpTopic}に関する制度を改善する際、利用者の便利さだけを重視すればよいわけではない。運営する側の負担や費用、安全性なども同時に考える必要がある。重要なのは、一つの立場だけから結論を出さず、複数の条件を比較して現実的な方法を探ることである。`,
      reading: `${jpTopic}にかんするせいどをかいぜんするさい、りようしゃのべんりさだけをじゅうしすればよいわけではない。うんえいするがわのふたんやひよう、あんぜんせいなどもどうじにかんがえるひつようがある。じゅうようなのは、ひとつのたちばだけからけつろんをださず、ふくすうのじょうけんをひかくしてげんじつてきなほうほうをさぐることである。`,
      translation: tr(`When improving systems related to ${enTopic.toLowerCase()}, convenience for users is not the only consideration. The burden and cost for operators and safety must also be considered. The important point is not to reach a conclusion from only one standpoint, but to compare multiple conditions and seek a realistic approach.`),
    },
    questions: [{
      question: { jp: "筆者が最も言いたいことは何ですか。", translation: tr("What does the writer most want to say?") },
      choices: [
        { jp: "複数の条件を考えて現実的な方法を探すべきだ", translation: tr("We should consider multiple conditions and seek a realistic approach.") },
        { jp: "利用者の便利さだけを優先すべきだ", translation: tr("Only user convenience should be prioritized.") },
        { jp: "制度を変更する必要はない", translation: tr("There is no need to change the system.") },
        { jp: "費用だけを考えるべきだ", translation: tr("Only cost should be considered.") },
      ],
      answer: 0,
    }],
  }),
  N1: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} and social choices ${i + 1}`),
    qtype: `論旨理解${i + 1}`,
    passage: {
      jp: `${jpTopic}をめぐる問題では、しばしば「効率」と「公平」が対立するものとして語られる。しかし実際には、どちらか一方を選べば済むとは限らない。短期的には非効率に見える仕組みが、長期的には信頼を生み、結果として社会全体の負担を減らすこともある。したがって制度を評価する際には、目に見える成果だけでなく、その仕組みが人々の行動や関係にどのような影響を与えるかまで検討すべきである。`,
      reading: `${jpTopic}をめぐるもんだいでは、しばしば「こうりつ」と「こうへい」がたいりつするものとしてかたられる。しかしじっさいには、どちらかいっぽうをえらべばすむとはかぎらない。たんきてきにはひこうりつにみえるしくみが、ちょうきてきにはしんらいをうみ、けっかとしてしゃかいぜんたいのふたんをへらすこともある。したがってせいどをひょうかするさいには、めにみえるせいかだけでなく、そのしくみがひとびとのこうどうやかんけいにどのようなえいきょうをあたえるかまでけんとうすべきである。`,
      translation: tr(`In issues surrounding ${enTopic.toLowerCase()}, efficiency and fairness are often discussed as opposing values. In reality, however, choosing only one side is not always sufficient. A system that appears inefficient in the short term may create trust in the long term and ultimately reduce the burden on society as a whole. Therefore, when evaluating a system, we should consider not only visible results but also how the system affects people's behavior and relationships.`),
    },
    questions: [{
      question: { jp: "本文の主張として最も適切なものはどれですか。", translation: tr("Which statement best represents the argument of the passage?") },
      choices: [
        { jp: "制度は長期的な影響も含めて評価する必要がある", translation: tr("Systems need to be evaluated including their long-term effects.") },
        { jp: "効率は常に公平より重要である", translation: tr("Efficiency is always more important than fairness.") },
        { jp: "短期的な成果だけで制度を判断すべきだ", translation: tr("Systems should be judged only by short-term results.") },
        { jp: "公平な制度は必ず非効率である", translation: tr("Fair systems are always inefficient.") },
      ],
      answer: 0,
    }],
  }),
};

const LISTEN_BUILDERS = {
  N5: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} listening ${i + 1}`),
    qtype: `課題理解${i + 1}`,
    passage: {
      jp: `明日、${jpTopic}へ行きます。朝十時に駅で会いましょう。雨なら、駅の中で待っていてください。`,
      reading: `あした、${jpTopic}へいきます。あさじゅうじにえきであいましょう。あめなら、えきのなかでまっていてください。`,
      translation: tr(`Tomorrow we will go to the ${enTopic.toLowerCase()}. Let's meet at the station at 10 a.m. If it rains, please wait inside the station.`),
    },
    questions: [{
      question: { jp: "何時に会いますか。", translation: tr("What time will they meet?") },
      choices: [
        { jp: "十時", translation: tr("10 o'clock") },
        { jp: "九時", translation: tr("9 o'clock") },
        { jp: "十一時", translation: tr("11 o'clock") },
        { jp: "十二時", translation: tr("12 o'clock") },
      ],
      answer: 0,
    }],
  }),
  N4: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} message ${i + 1}`),
    qtype: `ポイント理解${i + 1}`,
    passage: {
      jp: `田中です。今日の${jpTopic}の予定ですが、三時からではなく四時からになりました。場所は変わりません。遅れないように来てください。`,
      reading: `たなかです。きょうの${jpTopic}のよていですが、さんじからではなくよじからになりました。ばしょはかわりません。おくれないようにきてください。`,
      translation: tr(`This is Tanaka. Today's ${enTopic.toLowerCase()} plan has changed from 3 p.m. to 4 p.m. The place has not changed. Please come on time.`),
    },
    questions: [{
      question: { jp: "何が変わりましたか。", translation: tr("What changed?") },
      choices: [
        { jp: "時間", translation: tr("The time") },
        { jp: "場所", translation: tr("The place") },
        { jp: "日にち", translation: tr("The date") },
        { jp: "参加者", translation: tr("The participants") },
      ],
      answer: 0,
    }],
  }),
  N3: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} announcement ${i + 1}`),
    qtype: `概要理解${i + 1}`,
    passage: {
      jp: `${jpTopic}をご利用の皆様にお知らせします。設備点検のため、来週火曜日の午前中は一部のサービスが利用できません。午後一時からは通常どおり利用できます。`,
      reading: `${jpTopic}をごりようのみなさまにおしらせします。せつびてんけんのため、らいしゅうかようびのごぜんちゅうはいちぶのサービスがりようできません。ごごいちじからはつうじょうどおりりようできます。`,
      translation: tr(`An announcement for users of the ${enTopic.toLowerCase()}. Due to equipment inspection, some services will be unavailable next Tuesday morning. Normal service will resume from 1 p.m.`),
    },
    questions: [{
      question: { jp: "午後一時からどうなりますか。", translation: tr("What happens from 1 p.m.?") },
      choices: [
        { jp: "通常どおり利用できる", translation: tr("Normal service becomes available.") },
        { jp: "全部休みになる", translation: tr("Everything closes.") },
        { jp: "点検が始まる", translation: tr("The inspection begins.") },
        { jp: "予約が必要になる", translation: tr("Reservations become necessary.") },
      ],
      answer: 0,
    }],
  }),
  N2: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} explanation ${i + 1}`),
    qtype: `即時応答${i + 1}`,
    passage: {
      jp: `${jpTopic}についてご説明します。今回の変更は利用者を減らすためではなく、混雑する時間帯を分散させることが目的です。そのため、利用時間そのものが短くなるわけではありません。`,
      reading: `${jpTopic}についてごせつめいします。こんかいのへんこうはりようしゃをへらすためではなく、こんざつするじかんたいをぶんさんさせることがもくてきです。そのため、りようじかんそのものがみじかくなるわけではありません。`,
      translation: tr(`Let me explain about ${enTopic.toLowerCase()}. The purpose of this change is not to reduce the number of users, but to spread use across congested time periods. Therefore, the actual available usage time will not become shorter.`),
    },
    questions: [{
      question: { jp: "変更の目的は何ですか。", translation: tr("What is the purpose of the change?") },
      choices: [
        { jp: "混雑する時間帯を分散させること", translation: tr("To spread use across congested time periods.") },
        { jp: "利用者を減らすこと", translation: tr("To reduce the number of users.") },
        { jp: "利用時間を短くすること", translation: tr("To shorten usage time.") },
        { jp: "料金を上げること", translation: tr("To increase the fee.") },
      ],
      answer: 0,
    }],
  }),
  N1: (i, jpTopic, enTopic) => ({
    title: tr(`${enTopic} commentary ${i + 1}`),
    qtype: `統合理解${i + 1}`,
    passage: {
      jp: `${jpTopic}を改善する議論では、数値で示しやすい成果が重視されがちです。しかし、制度への信頼や利用者の安心感のように、簡単には数値化できない要素もあります。測定しやすいものだけを評価対象にすると、本来守るべき価値を見失う可能性があります。`,
      reading: `${jpTopic}をかいぜんするぎろんでは、すうちでしめしやすいせいかがじゅうしされがちです。しかし、せいどへのしんらいやりようしゃのあんしんかんのように、かんたんにはすうちかできないようそもあります。そくていしやすいものだけをひょうかたいしょうにすると、ほんらいまもるべきかちをみうしなうかのうせいがあります。`,
      translation: tr(`In discussions about improving ${enTopic.toLowerCase()}, outcomes that are easy to express numerically tend to receive emphasis. However, some factors, such as trust in the system and users' sense of security, are difficult to quantify. If only easily measurable factors are evaluated, values that should originally be protected may be overlooked.`),
    },
    questions: [{
      question: { jp: "話し手が注意すべきだと言っていることは何ですか。", translation: tr("What does the speaker say we should be careful about?") },
      choices: [
        { jp: "測定しやすいものだけで評価しないこと", translation: tr("Not evaluating things only by what is easy to measure.") },
        { jp: "数値を一切使わないこと", translation: tr("Never using numbers at all.") },
        { jp: "利用者の意見を無視すること", translation: tr("Ignoring users' opinions.") },
        { jp: "制度をすぐ廃止すること", translation: tr("Abolishing the system immediately.") },
      ],
      answer: 0,
    }],
  }),
};

function uniquePush(target, item, keyFn) {
  const key = keyFn(item);
  const exists = target.some((x) => keyFn(x) === key);
  if (!exists) target.push(item);
}

function extendRemainingContent(CONVERSATIONS, READING_SETS, LISTENING_SETS) {
  const summary = {};

  for (const level of LEVELS_REMAINING) {
    if (!Array.isArray(CONVERSATIONS[level])) CONVERSATIONS[level] = [];
    if (!Array.isArray(READING_SETS[level])) READING_SETS[level] = [];
    if (!Array.isArray(LISTENING_SETS[level])) LISTENING_SETS[level] = [];

    const beforeC = CONVERSATIONS[level].length;
    const beforeR = READING_SETS[level].length;
    const beforeL = LISTENING_SETS[level].length;

    TOPICS.forEach(([jpTopic, enTopic], i) => {
      uniquePush(
        CONVERSATIONS[level],
        CONVO_BUILDERS[level](i, jpTopic, enTopic),
        (x) => x?.title?.en || ""
      );
      uniquePush(
        READING_SETS[level],
        READING_BUILDERS[level](i, jpTopic, enTopic),
        (x) => `${x?.qtype || ""}|${x?.passage?.jp || ""}`
      );
      uniquePush(
        LISTENING_SETS[level],
        LISTEN_BUILDERS[level](i, jpTopic, enTopic),
        (x) => `${x?.qtype || ""}|${x?.passage?.jp || ""}`
      );
    });

    summary[level] = {
      conversationsAdded: CONVERSATIONS[level].length - beforeC,
      readingAdded: READING_SETS[level].length - beforeR,
      listeningAdded: LISTENING_SETS[level].length - beforeL,
      conversationsTotal: CONVERSATIONS[level].length,
      readingTotal: READING_SETS[level].length,
      listeningTotal: LISTENING_SETS[level].length,
    };
  }

  console.log("✅ 残りコンテンツ追加完了", summary);
  return summary;
}


function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch (e) { /* no-op if unsupported */ }
}

// Shared play/pause/resume state for SoundBtn instances, so any button can be
// stopped or resumed mid-playback rather than only ever playing to the end.
let activeSpeechId = null;
let speechPaused = false;
const speechListeners = new Set();
function notifySpeechListeners() {
  speechListeners.forEach((cb) => cb(activeSpeechId, speechPaused));
}
function speakToggle(text, id) {
  try {
    if (!window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    if (activeSpeechId === id && synth.speaking) {
      if (speechPaused) {
        synth.resume();
        speechPaused = false;
      } else {
        synth.pause();
        speechPaused = true;
      }
      notifySpeechListeners();
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    u.onstart = () => { activeSpeechId = id; speechPaused = false; notifySpeechListeners(); };
    u.onend = () => { if (activeSpeechId === id) { activeSpeechId = null; speechPaused = false; notifySpeechListeners(); } };
    u.onerror = () => { if (activeSpeechId === id) { activeSpeechId = null; speechPaused = false; notifySpeechListeners(); } };
    synth.speak(u);
  } catch (e) { /* no-op if unsupported */ }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================= SUB-COMPONENTS ============================= */
// Add 20 sets per JLPT level to conversation, reading and listening.
extendRemainingContent(CONVERSATIONS, READING_SETS, LISTENING_SETS);

function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1 bg-[#eee7d8] rounded-full p-1 flex-wrap">
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
            ${value === opt.value ? "bg-[#26374d] text-[#f4efe2] shadow" : "text-[#26374d]/70 hover:bg-[#26374d]/10"}`}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

let soundBtnCounter = 0;
function SoundBtn({ text, size = 18 }) {
  const idRef = useRef(null);
  if (idRef.current === null) { idRef.current = `sb-${soundBtnCounter++}`; }
  const [state, setState] = useState({ active: false, paused: false });

  useEffect(() => {
    const listener = (activeId, paused) => setState({ active: activeId === idRef.current, paused });
    speechListeners.add(listener);
    return () => speechListeners.delete(listener);
  }, []);

  const Icon = state.active ? (state.paused ? Play : Pause) : Volume2;
  return (
    <button onClick={() => speakToggle(text, idRef.current)} aria-label="play, pause, or resume audio"
      className="inline-flex items-center justify-center rounded-full bg-[#26374d] text-[#f4efe2] p-2 hover:bg-[#1a2838] active:scale-95 transition-all shrink-0">
      <Icon size={size} />
    </button>
  );
}

function GridCard({ jp, sub, onClick, highlight }) {
  return (
    <button onClick={onClick}
      className={`relative aspect-square flex items-center justify-center rounded-md border-2 transition-all
        ${highlight ? "border-[#b3452c] bg-[#b3452c]/5" : "border-[#26374d]/25 bg-white/60 hover:border-[#26374d]/60"}`}>
      <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#26374d]/30" />
      <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#26374d]/30" />
      <span className="text-2xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{jp}</span>
      {sub && <span className="absolute bottom-1 text-[10px] text-[#26374d]/60">{sub}</span>}
    </button>
  );
}

/* ============================= MAIN VIEWS ============================= */
function MojiView({ t, mode }) {
  const [set, setSet] = useState("hiragana");
  const data = set === "hiragana" ? HIRAGANA : KATAKANA;
  const [quizQ, setQuizQ] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const newQuiz = () => {
    const pool = shuffle(data);
    const answer = pool[0];
    const choices = shuffle([answer, ...pool.slice(1, 4)]);
    setQuizQ({ answer, choices });
    setFeedback(null);
  };
  useEffect(() => { if (mode === "quiz") newQuiz(); /* eslint-disable-next-line */ }, [mode, set]);

  const setToggle = (
    <Segmented value={set} onChange={setSet}
      options={[{ value: "hiragana", label: "ひらがな" }, { value: "katakana", label: "カタカナ" }]} />
  );

  if (mode === "list") {
    return (
      <div className="space-y-4">
        {setToggle}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {data.map(([ch, romaji]) => (
            <GridCard key={ch} jp={ch} sub={romaji} onClick={() => speak(ch)} />
          ))}
        </div>
      </div>
    );
  }

  if (mode === "flashcard") {
    return <MojiFlashcards t={t} data={data} extraHeader={setToggle} />;
  }

  // quiz
  if (!quizQ) return null;
  return (
    <div className="space-y-5">
      {setToggle}
      <div className="text-sm text-[#26374d]/70">{t.score}: {score.right} / {score.total}</div>
      <div className="flex flex-col items-center gap-4 bg-white/70 rounded-2xl p-8 border border-[#26374d]/15">
        <div className="text-7xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{quizQ.answer[0]}</div>
        <p className="text-sm text-[#26374d]/70">{t.chooseAnswer}</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {quizQ.choices.map(([ch, romaji]) => (
            <button key={ch}
              onClick={() => {
                const isRight = romaji === quizQ.answer[1];
                setScore((s) => ({ right: s.right + (isRight ? 1 : 0), total: s.total + 1 }));
                setFeedback(isRight ? "correct" : "incorrect");
              }}
              className="py-3 rounded-xl border-2 border-[#26374d]/25 bg-[#f4efe2] hover:border-[#26374d]/60 font-medium text-lg">
              {romaji}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`flex items-center gap-2 font-semibold ${feedback === "correct" ? "text-[#3d6b4f]" : "text-[#b3452c]"}`}>
            {feedback === "correct" ? <Check size={18} /> : <X size={18} />}
            {feedback === "correct" ? t.correct : t.incorrect}
            <button onClick={newQuiz} className="ml-3 underline text-[#26374d]">{t.next}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MojiFlashcards({ t, data, extraHeader }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const item = data[i];
  const go = (dir) => { setFlip(false); setI((p) => (p + dir + data.length) % data.length); };
  return (
    <div className="space-y-4">
      {extraHeader}
      <div className="text-center text-sm text-[#26374d]/60">{i + 1} {t.of} {data.length}</div>
      <div onClick={() => setFlip((f) => !f)}
        className="mx-auto max-w-xs aspect-[3/4] rounded-2xl bg-white border-2 border-[#26374d]/25 flex items-center justify-center cursor-pointer relative shadow-sm">
        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#b3452c]" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#b3452c]" />
        {!flip ? (
          <span className="text-7xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{item[0]}</span>
        ) : (
          <span className="text-4xl font-semibold text-[#26374d]">{item[1]}</span>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => go(-1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronLeft size={20} /></button>
        <SoundBtn text={item[0]} />
        <button onClick={() => setFlip((f) => !f)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><RotateCw size={20} /></button>
        <button onClick={() => go(1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronRight size={20} /></button>
      </div>
      <p className="text-center text-xs text-[#26374d]/50">{t.tapToFlip}</p>
    </div>
  );
}


function getKanjiCompounds(kanji) {
  const all = [];

  for (const level of ["N5", "N4", "N3", "N2", "N1"]) {
    const words = VOCAB[level] || [];

    for (const word of words) {
      if (!word?.jp) continue;

      const chars = [...word.jp];

      // 2〜4文字の語だけ
      if (chars.length < 2 || chars.length > 4) continue;

      // この漢字を含む単語
      if (!word.jp.includes(kanji)) continue;

      all.push({
        ...word,
        sourceLevel: level
      });
    }
  }

  // 同じ単語を削除
  const seen = new Set();

  return all.filter((word) => {
    const key = `${word.jp}-${word.reading || ""}`;

    if (seen.has(key)) return false;
    seen.add(key);

    return true;
  });
}

function KanjiCompoundList({ kanji, uiLang }) {
  const [open, setOpen] = useState(false);

  const compounds = useMemo(
    () => getKanjiCompounds(kanji),
    [kanji]
  );

  if (compounds.length === 0) {
    return (
      <div className="mt-2 text-xs text-[#26374d]/40">
        この漢字を使う熟語は、現在の単語データにはまだありません。
      </div>
    );
  }

  const shown = compounds.slice(0, 20);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`min-h-[40px] px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
          open
            ? "bg-[#26374d] text-[#f4efe2] border-[#26374d]"
            : "bg-[#26374d]/5 text-[#26374d] border-[#26374d]/15 hover:border-[#26374d]/35"
        }`}
      >
        {open ? "熟語を閉じる" : `熟語を見る（${compounds.length}語）`}
      </button>

      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {shown.map((word, index) => {
            const rawSelectedMeaning =
              word.meaning?.[uiLang] || "";

            const selectedMeaning =
              rawSelectedMeaning ||
              word.meaning?.en ||
              word.meaning?.ja ||
              word.jp ||
              "";
            const meaningLabel = {
              ja: "意味：",
              en: "Meaning: ",
              ne: "अर्थ: ",
              vi: "Nghĩa: ",
              my: "အဓိပ္ပါယ်: ",
              zh: "意思：",
              ptBR: "Significado: ",
            }[uiLang] || "";

            return (
              <div
                key={`${word.jp}-${word.reading}-${index}`}
                className="rounded-xl border border-[#26374d]/10 bg-[#f8f5ed] p-3"
              >
                <div className="flex items-start gap-2">
                  <SoundBtn text={word.jp} size={14} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className="text-lg font-bold text-[#26374d]"
                        style={{
                          fontFamily: "'Noto Serif JP', serif"
                        }}
                      >
                        {word.jp}
                      </span>

                      <span className="text-sm text-[#26374d]/60">
                        {word.reading}
                      </span>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#26374d]/5 text-[#26374d]/45">
                        {word.sourceLevel}
                      </span>
                    </div>

                    {selectedMeaning && (
                      <div className="text-sm text-[#26374d]/75 mt-1">
                        <span className="font-semibold">{meaningLabel}</span>
                        {selectedMeaning}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {compounds.length > 20 && (
            <div className="sm:col-span-2 lg:col-span-3 text-center text-xs text-[#26374d]/45 pt-2">
              最初の20語を表示しています（全{compounds.length}語）
            </div>
          )}
        </div>
      )}
    </div>
  );
}





function ExampleTranslation({ example, uiLang }) {
  if (!example || uiLang === "ja") return null;

  const saved =
    EXAMPLE_TRANSLATIONS?.[example.ja] || {};

  const text =
    saved?.[uiLang] ||
    example?.[uiLang] ||
    (uiLang === "en" ? example?.en : "") ||
    "";

  if (!text) return null;

  return (
    <div className="text-xs text-[#26374d]/60 mt-1 leading-relaxed">
      {text}
    </div>
  );
}

function ItemListView({ items, uiLang, t }) {
  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const isKanji = !!it.onyomi;

        // 単語には必ず2つの例文を表示する
        // OpenJLPTの実例文を最優先し、不足分のみ安全な学習文で補完
        const originalExamples = Array.isArray(it.examples)
          ? it.examples.filter(ex => ex?.ja)
          : [];

        const vocabExamples = isKanji
          ? []
          : [
              ...originalExamples,
        ...(REAL_VOCAB_EXAMPLES[it.jp] || [])
          .map(ja => ({ ja, en: "" })),
              {
                ja: `「${it.jp}」という言葉を勉強しています。`,
                en: `I am studying the Japanese word "${it.jp}".`,
              },
              {
                ja: `「${it.jp}」の意味と使い方を確認しましょう。`,
                en: `Let's review the meaning and usage of "${it.jp}".`,
              },
            ]
              .filter((ex, i, arr) =>
                arr.findIndex(x => x.ja === ex.ja) === i
              )
              .slice(0, 2);

        return (
          <div
            key={idx}
            className="bg-white/70 rounded-xl border border-[#26374d]/15 px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-[#26374d] text-white text-sm font-bold flex items-center justify-center">
            {idx + 1}
          </span>
          <SoundBtn text={it.jp} size={16} />

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Noto Serif JP', serif"
                    }}
                  >
                    {it.jp}
                  </span>

                  <span className="text-sm text-[#26374d]/60">
                    {it.reading}
                  </span>
                </div>

                {it.onyomi && (
                  <div className="text-xs text-[#26374d]/50 mt-1 flex gap-3 flex-wrap">
                    <span>
                      <span className="font-semibold">
                        {t.onyomi}:
                      </span>{" "}
                      {it.onyomi || "—"}
                    </span>

                    <span>
                      <span className="font-semibold">
                        {t.kunyomi}:
                      </span>{" "}
                      {it.kunyomi || "—"}
                    </span>
                  </div>
                )}

                <div className="text-sm text-[#b3452c] mt-1">
                  {it.meaning?.[uiLang] || ""}
                </div>

                {!isKanji && (
                  <div className="mt-3 space-y-2">
                    {vocabExamples.length > 0 ? (
                      vocabExamples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="rounded-lg bg-[#26374d]/5 px-3 py-2"
                        >
                          <div className="flex items-start gap-2">
                            <span className="shrink-0 text-xs font-bold text-[#c25b8f] mt-0.5">
                              例{exIdx + 1}
                            </span>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <span
                                  className="text-sm leading-relaxed text-[#26374d]"
                                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                                >
                                  <FuriganaText text={ex.ja} word={it.jp} reading={it.reading} />
                                </span>

                                <SoundBtn text={ex.ja} size={14} />
                              </div>

                              <ExampleTranslation
                                example={ex}
                                uiLang={uiLang}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-[#26374d]/35">
                        例文なし
                      </div>
                    )}
                  </div>
                )}

                {isKanji && (
                  <KanjiCompoundList
                    kanji={it.jp}
                    uiLang={uiLang}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ItemFlashcards({ items, uiLang, t }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const item = items[i];
  const go = (dir) => { setFlip(false); setI((p) => (p + dir + items.length) % items.length); };
  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-[#26374d]/60">{i + 1} {t.of} {items.length}</div>
      <div onClick={() => setFlip((f) => !f)}
        className="mx-auto max-w-sm min-h-[16rem] rounded-2xl bg-white border-2 border-[#26374d]/25 flex flex-col items-center justify-center cursor-pointer relative shadow-sm p-6 text-center">
        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#b3452c]" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#b3452c]" />
        {!flip ? (
          <span className="text-5xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{item.jp}</span>
        ) : (
          <div className="space-y-2">
            <div className="text-lg text-[#26374d]/70">{item.reading}</div>
            <div className="text-2xl font-semibold text-[#b3452c]">{item.meaning?.[uiLang] || ""}</div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => go(-1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronLeft size={20} /></button>
        <SoundBtn text={item.jp} />
        <button onClick={() => setFlip((f) => !f)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><RotateCw size={20} /></button>
        <button onClick={() => go(1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronRight size={20} /></button>
      </div>
      <p className="text-center text-xs text-[#26374d]/50">{t.tapToFlip}</p>
    </div>
  );
}

function KanjiWritePractice({ items, uiLang, t }) {
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const [showStrokeHelp, setShowStrokeHelp] = useState(false);
  const [strokeHelp, setStrokeHelp] = useState([]);
  const [showKanjiPicker, setShowKanjiPicker] = useState(false);
  const [kanjiSearch, setKanjiSearch] = useState("");

  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const strokesRef = useRef([]);
  const currentStrokeRef = useRef([]);

  const item = items[idx] || items[0];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokesRef.current = [];
    currentStrokeRef.current = [];
    drawingRef.current = false;

    setHasInk(false);
    setResult(null);
    setShowStrokeHelp(false);
    setStrokeHelp([]);
  };

  useEffect(() => {
    clearCanvas();
  }, [idx]);

  const pointFromEvent = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture?.(e.pointerId);

    drawingRef.current = true;

    const pt = pointFromEvent(e);

    currentStrokeRef.current = [pt];

    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#111";
    ctx.fillStyle = "#111";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
    ctx.fill();

    setHasInk(true);
    setResult(null);
  };

  const draw = (e) => {
    if (!drawingRef.current) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    const pt = pointFromEvent(e);

    const current = currentStrokeRef.current;
    const prev = current[current.length - 1];

    if (!prev) return;

    const dx = pt.x - prev.x;
    const dy = pt.y - prev.y;

    // 細かすぎる点は保存しない
    if (Math.hypot(dx, dy) < 1.5) return;

    current.push(pt);

    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!drawingRef.current) return;

    e?.preventDefault?.();

    drawingRef.current = false;

    const stroke = currentStrokeRef.current;

    if (stroke.length === 1) {
      // 点だけでも最低2点にする
      stroke.push({
        x: stroke[0].x + 0.1,
        y: stroke[0].y + 0.1
      });
    }

    if (stroke.length > 0) {
      strokesRef.current = [
        ...strokesRef.current,
        stroke
      ];
    }

    currentStrokeRef.current = [];
  };

  const resample = (pts, count = 24) => {
    if (!pts || pts.length < 2) return pts || [];

    const distances = [0];

    for (let i = 1; i < pts.length; i++) {
      distances.push(
        distances[i - 1] +
        Math.hypot(
          pts[i].x - pts[i - 1].x,
          pts[i].y - pts[i - 1].y
        )
      );
    }

    const total = distances[distances.length - 1];

    if (total < 0.001) {
      return Array.from({ length: count }, () => ({ ...pts[0] }));
    }

    const result = [];

    for (let n = 0; n < count; n++) {
      const target = (total * n) / (count - 1);

      let i = 1;

      while (
        i < distances.length &&
        distances[i] < target
      ) {
        i++;
      }

      if (i >= distances.length) {
        result.push({ ...pts[pts.length - 1] });
        continue;
      }

      const d0 = distances[i - 1];
      const d1 = distances[i];

      const ratio =
        d1 === d0
          ? 0
          : (target - d0) / (d1 - d0);

      result.push({
        x:
          pts[i - 1].x +
          (pts[i].x - pts[i - 1].x) * ratio,
        y:
          pts[i - 1].y +
          (pts[i].y - pts[i - 1].y) * ratio
      });
    }

    return result;
  };

  const normalizeAll = (strokes) => {
    const points = strokes.flat();

    if (!points.length) return [];

    const minX = Math.min(...points.map((p) => p.x));
    const maxX = Math.max(...points.map((p) => p.x));
    const minY = Math.min(...points.map((p) => p.y));
    const maxY = Math.max(...points.map((p) => p.y));

    const w = Math.max(1, maxX - minX);
    const h = Math.max(1, maxY - minY);

    const scale = 90 / Math.max(w, h);

    const offsetX = (109 - w * scale) / 2;
    const offsetY = (109 - h * scale) / 2;

    return strokes.map((stroke) =>
      stroke.map((p) => ({
        x: (p.x - minX) * scale + offsetX,
        y: (p.y - minY) * scale + offsetY
      }))
    );
  };

  const loadKanjiVG = async (kanji) => {
    const code = kanji
      .codePointAt(0)
      .toString(16)
      .padStart(5, "0");

    const urls = [
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${code}.svg`,
      `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`
    ];

    let text = null;

    for (const url of urls) {
      try {
        const res = await fetch(url);

        if (res.ok) {
          text = await res.text();
          break;
        }
      } catch (_) {}
    }

    if (!text) {
      throw new Error("KanjiVG data unavailable");
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(
      text,
      "image/svg+xml"
    );

    const paths = [
      ...doc.querySelectorAll(
        'path[id^="kvg:"], path[id*="-s"]'
      )
    ];

    if (!paths.length) {
      throw new Error("Stroke paths unavailable");
    }

    const holder = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    holder.setAttribute("width", "109");
    holder.setAttribute("height", "109");
    holder.style.position = "absolute";
    holder.style.left = "-99999px";
    holder.style.top = "-99999px";

    document.body.appendChild(holder);

    const reference = [];

    try {
      for (const original of paths) {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        path.setAttribute(
          "d",
          original.getAttribute("d") || ""
        );

        holder.appendChild(path);

        const length = path.getTotalLength();

        if (!length || !Number.isFinite(length)) continue;

        const pts = [];

        for (let i = 0; i < 24; i++) {
          const pos =
            path.getPointAtLength(
              (length * i) / 23
            );

          pts.push({
            x: pos.x,
            y: pos.y
          });
        }

        reference.push(pts);

        holder.removeChild(path);
      }
    } finally {
      holder.remove();
    }

    if (!reference.length) {
      throw new Error("No valid reference strokes");
    }

    return reference;
  };

  const loadStrokeHelp = async () => {
    try {
      const referenceRaw = await loadKanjiVG(item.jp);
      setStrokeHelp(referenceRaw);
      setShowStrokeHelp(true);
    } catch (e) {
      console.error("Stroke help error:", e);
    }
  };

  const strokePathD = (points) => {
    if (!points || points.length === 0) return "";

    return points
      .map((p, i) =>
        `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
      )
      .join(" ");
  };

  const strokeSimilarity = (userStroke, refStroke) => {
    const a = resample(userStroke, 24);
    const b = resample(refStroke, 24);

    if (a.length !== 24 || b.length !== 24) return 0;

    let distance = 0;

    for (let i = 0; i < 24; i++) {
      distance += Math.hypot(
        a[i].x - b[i].x,
        a[i].y - b[i].y
      );
    }

    distance /= 24;

    // 始点→終点の方向
    const adx = a[23].x - a[0].x;
    const ady = a[23].y - a[0].y;

    const bdx = b[23].x - b[0].x;
    const bdy = b[23].y - b[0].y;

    const al = Math.max(0.001, Math.hypot(adx, ady));
    const bl = Math.max(0.001, Math.hypot(bdx, bdy));

    const direction =
      (adx * bdx + ady * bdy) / (al * bl);

    const distanceScore =
      Math.max(0, 1 - distance / 28);

    const directionScore =
      Math.max(0, (direction + 1) / 2);

    return (
      distanceScore * 0.78 +
      directionScore * 0.22
    );
  };

  const feedbackText = (type) => {
    if (uiLang === "ne") {
      if (type === "strokeCount")
        return "रेखाको संख्या मिलेन। फेरि लेख्नुहोस्।";
      if (type === "order")
        return "रेखाको क्रम वा दिशा मिलेन। फेरि लेख्नुहोस्।";
      if (type === "load")
        return "कान्जी जाँच डेटा लोड गर्न सकिएन। फेरि प्रयास गर्नुहोस्।";
    }

    if (uiLang === "zh") {
      if (type === "strokeCount")
        return "笔画数不正确，请再写一次。";
      if (type === "order")
        return "笔顺、方向或字形不正确，请再写一次。";
      if (type === "load")
        return "无法读取汉字笔画数据，请再试一次。";
    }

    if (uiLang === "ptBR") {
      if (type === "strokeCount")
        return "O número de traços está incorreto. Tente novamente.";
      if (type === "order")
        return "A ordem, direção ou forma dos traços está incorreta.";
      if (type === "load")
        return "Não foi possível carregar os dados dos traços.";
    }

    if (type === "strokeCount")
      return "画数が違います。もう一度書いてください。";

    if (type === "order")
      return "書き順・線の方向・形が違います。もう一度書いてください。";

    return "漢字の判定データを読み込めませんでした。もう一度試してください。";
  };

  const checkDrawing = async () => {
    if (!hasInk || checking) return;

    // 描画途中なら確定
    if (drawingRef.current) {
      stopDrawing();
    }

    setChecking(true);
    setResult(null);

    try {
      const referenceRaw =
        await loadKanjiVG(item.jp);

      const userRaw =
        strokesRef.current.filter(
          (stroke) => stroke.length >= 2
        );

      // 画数が違う場合は即不正解
      if (userRaw.length !== referenceRaw.length) {
        setResult({
          correct: false,
          feedback: feedbackText("strokeCount")
        });

        return;
      }

      const user =
        normalizeAll(userRaw);

      const reference =
        normalizeAll(referenceRaw);

      const scores = user.map(
        (stroke, i) =>
          strokeSimilarity(
            stroke,
            reference[i]
          )
      );

      const average =
        scores.reduce((a, b) => a + b, 0) /
        Math.max(1, scores.length);

      const weakest =
        Math.min(...scores);

      /*
        同じ画数だけでは合格しない。
        各ストロークを正しい順番の
        KanjiVGストロークと比較する。
      */
      const correct =
        average >= 0.67 &&
        weakest >= 0.46;

      setResult({
        correct,
        feedback: correct
          ? t.correctDraw
          : feedbackText("order")
      });

      console.log(
        "KanjiVG check",
        item.jp,
        {
          strokes: user.length,
          average,
          weakest,
          scores
        }
      );
    } catch (error) {
      console.error(error);

      setResult({
        correct: null,
        feedback: feedbackText("load")
      });
    } finally {
      setChecking(false);
    }
  };

  const chooseKanji = (newIndex) => {
    setIdx(newIndex);
    setShowKanjiPicker(false);
    setKanjiSearch("");
    setShowStrokeHelp(false);
    setStrokeHelp([]);
    setResult(null);
    setHasInk(false);

    setTimeout(() => {
      const canvas = canvasRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      strokesRef.current = [];
      currentStrokeRef.current = [];
      drawingRef.current = false;
    }, 0);
  };

  const filteredKanjiItems = items
    .map((kanjiItem, originalIndex) => ({
      kanjiItem,
      originalIndex
    }))
    .filter(({ kanjiItem }) => {
      const q = kanjiSearch.trim().toLowerCase();

      if (!q) return true;

      const text = [
        kanjiItem.jp,
        kanjiItem.reading,
        kanjiItem.onyomi,
        kanjiItem.kunyomi,
        kanjiItem.meaning?.ja,
        kanjiItem.meaning?.en
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(q);
    });

  const nextKanji = () => {
    setShowStrokeHelp(false);
    setStrokeHelp([]);
    setResult(null);

    setIdx((v) =>
      items.length
        ? (v + 1) % items.length
        : 0
    );
  };

  if (!item) {
    return (
      <div className="text-center py-10">
        漢字がありません。
      </div>
    );
  }

  const readingText =
    item.reading ||
    item.kunyomi ||
    item.onyomi ||
    "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="text-sm text-[#26374d]/55">
          {idx + 1} / {items.length}
        </div>

        <button
          type="button"
          onClick={() => setShowKanjiPicker((v) => !v)}
          className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-colors ${
            showKanjiPicker
              ? "bg-[#26374d] text-[#f4efe2] border-[#26374d]"
              : "bg-white/70 text-[#26374d] border-[#26374d]/15"
          }`}
        >
          {showKanjiPicker ? "閉じる" : "漢字を選ぶ"}
        </button>
      </div>

      {showKanjiPicker && (
        <div className="rounded-2xl border border-[#26374d]/15 bg-white/75 p-4">
          <div className="font-bold text-[#26374d] mb-3">
            練習する漢字を選ぶ
          </div>

          <input
            type="text"
            value={kanjiSearch}
            onChange={(e) => setKanjiSearch(e.target.value)}
            placeholder="漢字・読み方・意味で検索"
            className="w-full min-h-[44px] rounded-xl border border-[#26374d]/20 bg-white px-4 text-base outline-none focus:border-[#26374d]/50"
          />

          <div className="text-xs text-[#26374d]/45 mt-2 mb-3">
            {filteredKanjiItems.length}字
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-[360px] overflow-y-auto pr-1">
            {filteredKanjiItems.map(({ kanjiItem, originalIndex }) => (
              <button
                key={`${kanjiItem.jp}-${originalIndex}`}
                type="button"
                onClick={() => chooseKanji(originalIndex)}
                title={`${kanjiItem.jp} ${kanjiItem.reading || ""}`}
                className={`min-h-[52px] rounded-xl border-2 text-xl font-bold transition-colors ${
                  idx === originalIndex
                    ? "bg-[#26374d] text-[#f4efe2] border-[#26374d]"
                    : "bg-[#f8f5ed] text-[#26374d] border-[#26374d]/10 hover:border-[#26374d]/40"
                }`}
                style={{
                  fontFamily: "'Noto Serif JP', serif"
                }}
              >
                {kanjiItem.jp}
              </button>
            ))}
          </div>

          {filteredKanjiItems.length === 0 && (
            <div className="text-center py-6 text-sm text-[#26374d]/50">
              見つかりませんでした。
            </div>
          )}
        </div>
      )}

      <div className="text-center">
        <div
          className="text-5xl text-[#26374d]"
          style={{
            fontFamily: "'Noto Serif JP', serif"
          }}
        >
          {item.jp}
        </div>

        <div className="text-sm text-[#26374d]/45 mt-1">
          {readingText}
        </div>

        <SoundBtn
          text={item.jp}
          size={16}
        />
      </div>

      <div className="text-center text-sm text-[#26374d]/55">
        {t.writeInstruction}
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={(e) => {
            if (drawingRef.current) {
              stopDrawing(e);
            }
          }}
          style={{
            width: "300px",
            maxWidth: "100%",
            aspectRatio: "1 / 1",
            background: "white",
            border: "2px solid rgba(38,55,77,.2)",
            borderRadius: "18px",
            touchAction: "none"
          }}
        />
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={clearCanvas}
          className="px-5 py-2 rounded-xl border-2 border-[#26374d]/20"
        >
          {t.clearBtn}
        </button>

        <button
          type="button"
          disabled={!hasInk || checking}
          onClick={checkDrawing}
          className="px-5 py-2 rounded-xl bg-[#26374d] text-[#f4efe2] disabled:opacity-40"
        >
          {checking
            ? t.checking
            : t.checkBtn}
        </button>
      </div>

      {result && (
        <div className="text-center space-y-3">
          {result.correct === true && (
            <>
              <div className="text-lg font-bold text-green-700">
                ✓ {t.correctDraw}
              </div>

              <div className="rounded-2xl bg-[#26374d]/5 px-4 py-3">
                <div className="text-xs text-[#26374d]/45 mb-1">
                  読み方
                </div>

                <div
                  className="text-xl font-bold text-[#26374d]"
                  style={{
                    fontFamily: "'Noto Serif JP', serif"
                  }}
                >
                  {readingText}
                </div>
              </div>
            </>
          )}

          {result.correct === false && (
            <>
              <div className="text-[#b3452c] font-semibold">
                {result.feedback}
              </div>

              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={loadStrokeHelp}
                  className="px-4 py-2 rounded-xl border-2 border-[#26374d]/20 text-[#26374d] font-semibold"
                >
                  書き方を見る
                </button>

                <button
                  type="button"
                  onClick={nextKanji}
                  className="px-4 py-2 rounded-xl bg-[#26374d] text-[#f4efe2] font-semibold"
                >
                  次の漢字 →
                </button>
              </div>
            </>
          )}

          {result.correct === null && (
            <>
              <div className="text-[#b3452c] text-sm">
                {result.feedback}
              </div>

              <button
                type="button"
                onClick={nextKanji}
                className="px-4 py-2 rounded-xl bg-[#26374d] text-[#f4efe2]"
              >
                次の漢字 →
              </button>
            </>
          )}

          {result.correct === true && (
            <button
              type="button"
              onClick={nextKanji}
              className="underline text-[#26374d] text-sm"
            >
              {t.nextKanji}
            </button>
          )}
        </div>
      )}

      {showStrokeHelp && strokeHelp.length > 0 && (
        <div className="mt-6 rounded-2xl border border-[#26374d]/15 bg-white/70 p-5">
          <div className="text-center mb-4">
            <div className="font-bold text-[#26374d] text-lg">
              {item.jp} の書き順
            </div>
            <div className="text-xs text-[#26374d]/50 mt-1">
              1 → 2 → 3 の順番で書いてください
            </div>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 109 109"
              className="w-[280px] max-w-full bg-white rounded-2xl border border-[#26374d]/15"
            >
              <line x1="54.5" y1="8" x2="54.5" y2="101"
                stroke="rgba(38,55,77,.10)" strokeDasharray="3 3" />
              <line x1="8" y1="54.5" x2="101" y2="54.5"
                stroke="rgba(38,55,77,.10)" strokeDasharray="3 3" />

              {strokeHelp.map((stroke, i) => {
                const first = stroke[0];

                return (
                  <g key={i}>
                    <path
                      d={strokePathD(stroke)}
                      fill="none"
                      stroke="#26374d"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.85}
                    />

                    {first && (
                      <>
                        <circle
                          cx={first.x}
                          cy={first.y}
                          r="5.2"
                          fill="#f4efe2"
                          stroke="#26374d"
                          strokeWidth="1.5"
                        />
                        <text
                          x={first.x}
                          y={first.y + 1.8}
                          textAnchor="middle"
                          fontSize="6"
                          fontWeight="700"
                          fill="#26374d"
                        >
                          {i + 1}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-5 sm:grid-cols-8 gap-2">
            {strokeHelp.map((_, i) => (
              <div
                key={i}
                className="text-center rounded-lg bg-[#26374d]/5 py-2 text-sm font-bold text-[#26374d]"
              >
                {i + 1}画
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setShowStrokeHelp(false)}
              className="text-sm underline text-[#26374d]"
            >
              書き順を閉じる
            </button>
          </div>
        </div>
      )}

      <div className="text-center text-[10px] text-[#26374d]/35 pt-4">
        Stroke data: KanjiVG / CC BY-SA 3.0
      </div>
    </div>
  );
}
function ItemQuiz({ items, uiLang, t }) {
  const [q, setQ] = useState(null);
  const [selected, setSelected] = useState(null);
  const lang = uiLang;

  const newQuiz = () => {
    const pool = shuffle(items);
    const answer = pool[0];
    const choices = shuffle([answer, ...pool.slice(1, 4)]);
    setQ({ answer, choices });
    setSelected(null);
  };
  useEffect(() => { newQuiz(); /* eslint-disable-next-line */ }, [items]);
  if (!q) return null;

  const answered = selected !== null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4 bg-white/70 rounded-2xl p-8 border border-[#26374d]/15">
        <div className="flex items-center gap-2">
          <span className="text-4xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{q.answer.jp}</span>
          <SoundBtn text={q.answer.jp} />
        </div>
        <p className="text-sm text-[#26374d]/70">{t.chooseReading}</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.choices.map((c, idx) => {
            const isSelected = selected === idx;
            const isCorrect = answered && c.reading === q.answer.reading;
            const isWrongSelected = answered && isSelected && c.reading !== q.answer.reading;
            return (
              <button key={idx} type="button"
                onClick={() => { if (!answered) setSelected(idx); }}
                className={`py-3 px-3 rounded-xl border-2 font-medium text-center transition-colors
                  ${isCorrect ? "border-[#3d6b4f] bg-[#3d6b4f]/15" : isWrongSelected ? "border-[#b3452c] bg-[#b3452c]/15" : "border-[#26374d]/25 bg-[#f4efe2] active:bg-[#26374d]/10"}`}>
                {c.reading}
                {isCorrect && <Check size={14} className="inline ml-1 text-[#3d6b4f]" />}
                {isWrongSelected && <X size={14} className="inline ml-1 text-[#b3452c]" />}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="w-full max-w-sm space-y-2">
            <div className={`flex items-center gap-2 font-semibold justify-center ${q.choices[selected].reading === q.answer.reading ? "text-[#3d6b4f]" : "text-[#b3452c]"}`}>
              {q.choices[selected].reading === q.answer.reading ? <Check size={18} /> : <X size={18} />}
              {q.choices[selected].reading === q.answer.reading ? t.correct : t.incorrect}
            </div>
            <div className="bg-[#26374d]/5 rounded-lg px-3 py-2 text-center space-y-1">
              <div className="text-[#26374d]/70">{q.answer.reading}</div>
              <div className="text-sm text-[#b3452c] font-medium">{q.answer.meaning[lang] || q.answer.meaning.en}</div>
            </div>
            <div className="text-center">
              <button onClick={newQuiz} className="underline text-[#26374d]">{t.next}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConversationView({ level, uiLang, t }) {
  const set = CONVERSATIONS[level] || [];
  const lang = uiLang;
  const [group, setGroup] = useState("すべて");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setGroup("すべて");
    setIdx(0);
  }, [level]);

  const guessGroup = (title = "") => {
    if (/仕事|会社|職場|営業|シフト|担当|方針|交渉/.test(title)) return "仕事";
    if (/学校|授業|先生|宿題|発表/.test(title)) return "学校";
    if (/店|買い物|コンビニ|レストラン|商品|サービス/.test(title)) return "買い物・サービス";
    if (/電話|予約/.test(title)) return "電話・予約";
    if (/病院|体調|薬/.test(title)) return "病院";
    if (/相談|意見|依頼|説明|断/.test(title)) return "相談・意見";
    if (/駅|電車|交通/.test(title)) return "交通";
    return "日常生活";
  };

  const normalized = set.map((c, originalIndex) => ({
    ...c,
    originalIndex,
    groupName: c.group || guessGroup(c.title?.ja || c.title?.en || "")
  }));

  const groups = [
    "すべて",
    ...Array.from(new Set(normalized.map((c) => c.groupName)))
  ];

  const filtered =
    group === "すべて"
      ? normalized
      : normalized.filter((c) => c.groupName === group);

  const safeIdx = Math.min(idx, Math.max(0, filtered.length - 1));
  const convo = filtered[safeIdx];

  const chooseGroup = (g) => {
    setGroup(g);
    setIdx(0);
  };

  if (!convo) {
    return (
      <div className="rounded-2xl border border-[#26374d]/15 bg-white/70 p-6 text-center text-[#26374d]/60">
        会話練習がありません。
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <div className="rounded-2xl border border-[#26374d]/15 bg-white/55 p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <div>
            <div className="font-bold text-[#26374d]">会話カテゴリー</div>
            <div className="text-xs text-[#26374d]/50 mt-1">
              {level}・全{set.length}会話
            </div>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-full bg-[#26374d]/5 text-[#26374d]/60">
            {filtered.length}件
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => chooseGroup(g)}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-colors ${
                group === g
                  ? "bg-[#26374d] text-[#f4efe2] border-[#26374d]"
                  : "bg-white/70 text-[#26374d]/75 border-[#26374d]/15 hover:border-[#26374d]/35"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-bold text-[#26374d] mb-3">会話を選ぶ</div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((c, i) => {
            const title =
              c.title?.[lang] ||
              c.title?.ja ||
              c.title?.en ||
              `会話 ${i + 1}`;

            return (
              <button
                key={`${c.originalIndex}-${i}`}
                type="button"
                onClick={() => setIdx(i)}
                className={`min-h-[74px] px-3 py-3 rounded-2xl border-2 text-left transition-all ${
                  safeIdx === i
                    ? "bg-[#26374d] text-[#f4efe2] border-[#26374d]"
                    : "bg-white/70 text-[#26374d] border-[#26374d]/15 hover:border-[#26374d]/35"
                }`}
              >
                <div className={`text-[11px] mb-1 ${
                  safeIdx === i ? "text-white/60" : "text-[#26374d]/45"
                }`}>
                  {c.groupName}
                </div>

                <div className="font-semibold leading-snug">
                  {title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#26374d]/15 bg-white/40 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="text-xs font-semibold text-[#26374d]/45 mb-1">
              {convo.groupName} ・ {level}
            </div>
            <h3 className="text-xl font-bold text-[#26374d]">
              {convo.title?.[lang] ||
               convo.title?.ja ||
               convo.title?.en ||
               "会話練習"}
            </h3>
          </div>

          <div className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#26374d] text-[#f4efe2]">
            {safeIdx + 1} / {filtered.length}
          </div>
        </div>

        <div className="space-y-3">
          {convo.lines.map((line, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                line.speaker === "A"
                  ? ""
                  : "flex-row-reverse text-right"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-[#26374d] text-[#f4efe2] flex items-center justify-center text-sm font-bold shrink-0">
                {line.speaker}
              </div>

              <div
                className={`min-w-0 flex-1 rounded-2xl px-4 py-3 border ${
                  line.speaker === "A"
                    ? "bg-white/80 border-[#26374d]/15"
                    : "bg-[#26374d]/5 border-[#26374d]/15"
                }`}
              >
                <div className={`flex items-center gap-2 flex-wrap ${
                  line.speaker === "A"
                    ? "justify-start"
                    : "justify-end"
                }`}>
                  <span
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    <FuriganaText text={line.jp} />
                  </span>

                  <SoundBtn text=<FuriganaText text={line.jp} /> size={14} />
                </div>

                {line.reading && line.reading !== line.jp && (
                  <div className="text-xs text-[#26374d]/45 mt-1">
                    {line.reading}
                  </div>
                )}

                {lang !== "ja" && (
                  <div className="text-sm text-[#b3452c] mt-1">
                    {line.meaning?.[lang] ||
                     line.meaning?.en ||
                     line.jp}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-3 mt-5 pt-4 border-t border-[#26374d]/10">
          <button
            type="button"
            disabled={safeIdx === 0}
            onClick={() => setIdx((v) => Math.max(0, v - 1))}
            className="px-4 py-2 rounded-xl border-2 border-[#26374d]/15 disabled:opacity-30"
          >
            ← 前の会話
          </button>

          <button
            type="button"
            disabled={safeIdx >= filtered.length - 1}
            onClick={() =>
              setIdx((v) => Math.min(filtered.length - 1, v + 1))
            }
            className="px-4 py-2 rounded-xl bg-[#26374d] text-[#f4efe2] disabled:opacity-30"
          >
            次の会話 →
          </button>
        </div>
      </div>
    </div>
  );
}

function GrammarListView({ items, uiLang, t }) {
  const lang = uiLang;
  return (
    <div className="space-y-3">
      {items.map((g, idx) => (
        <div key={idx} className="bg-white/70 rounded-xl border border-[#26374d]/15 px-4 py-3 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-8 h-8 shrink-0 rounded-full bg-[#26374d] text-white text-sm font-bold flex items-center justify-center">
              {idx + 1}
            </span>
            <span className="text-lg font-semibold" style={{ fontFamily: "'Noto Serif JP', serif" }}>{g.pattern}</span>
            <SoundBtn text={g.pattern.replace(/〜/g, "")} size={14} />
          </div>
          <div className="text-xs text-[#26374d]/50">
            <span className="uppercase tracking-wide font-semibold mr-1">{t.connection}:</span>{g.connection}
          </div>
          <div className="text-sm text-[#b3452c]">{g.meaning[lang] || (lang === "ja" ? "" : g.meaning.en)}</div>
          {g.note && (
            <div className="text-xs text-[#26374d]/70 bg-[#26374d]/5 rounded-lg px-2 py-1.5">
              <span className="uppercase tracking-wide font-semibold mr-1 text-[#26374d]/50">{t.note}:</span>{g.note[uiLang] || g.note.en}
            </div>
          )}
          <div className="border-t border-[#26374d]/10 pt-2">
            <div className="text-xs uppercase tracking-wide text-[#26374d]/40 font-semibold mb-1">{t.example}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base" style={{ fontFamily: "'Noto Serif JP', serif" }}>{g.example.jp}</span>
              <SoundBtn text={g.example.jp} size={13} />
            </div>
            <div className="text-xs text-[#26374d]/50">{g.example.reading}</div>
            <div className="text-sm text-[#26374d]/80 mt-0.5">{g.example.translation[lang] || g.example.translation.en}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GrammarFlashcards({ items, uiLang, t }) {
  const lang = uiLang;
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const item = items[i];
  const go = (dir) => { setFlip(false); setI((p) => (p + dir + items.length) % items.length); };
  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-[#26374d]/60">{i + 1} {t.of} {items.length}</div>
      <div onClick={() => setFlip((f) => !f)}
        className="mx-auto max-w-sm min-h-[16rem] rounded-2xl bg-white border-2 border-[#26374d]/25 flex flex-col items-center justify-center cursor-pointer relative shadow-sm p-6 text-center">
        <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#b3452c]" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#b3452c]" />
        {!flip ? (
          <div className="space-y-2">
            <span className="text-3xl block" style={{ fontFamily: "'Noto Serif JP', serif" }}>{item.pattern}</span>
            <div className="text-xs text-[#26374d]/50">
              <span className="uppercase tracking-wide font-semibold mr-1">{t.connection}:</span>{item.connection}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xl font-semibold text-[#b3452c]">{item.meaning[lang] || (lang === "ja" ? "" : item.meaning.en)}</div>
            {item.note && (
              <div className="text-xs text-[#26374d]/70 bg-[#26374d]/5 rounded-lg px-3 py-2 text-left">
                <span className="uppercase tracking-wide font-semibold mr-1 text-[#26374d]/50">{t.note}:</span>{item.note[uiLang] || item.note.en}
              </div>
            )}
            <div className="text-base" style={{ fontFamily: "'Noto Serif JP', serif" }}>{item.example.jp}</div>
            <div className="text-xs text-[#26374d]/50">{item.example.reading}</div>
            <div className="text-sm text-[#26374d]/80">{item.example.translation[lang] || item.example.translation.en}</div>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => go(-1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronLeft size={20} /></button>
        <SoundBtn text={item.example.jp} />
        <button onClick={() => setFlip((f) => !f)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><RotateCw size={20} /></button>
        <button onClick={() => go(1)} className="p-2 rounded-full bg-[#26374d] text-[#f4efe2]"><ChevronRight size={20} /></button>
      </div>
      <p className="text-center text-xs text-[#26374d]/50">{t.tapToFlip}</p>
    </div>
  );
}

function GrammarQuiz({ items, uiLang, t }) {
  const lang = uiLang;
  const [q, setQ] = useState(null);
  const [selected, setSelected] = useState(null);

  const newQuiz = () => {
    const pool = shuffle(items);
    const answer = pool[0];
    const choices = shuffle([answer, ...pool.slice(1, 4)]);
    setQ({ answer, choices });
    setSelected(null);
  };
  useEffect(() => { newQuiz(); /* eslint-disable-next-line */ }, [items]);
  if (!q) return null;

  const answered = selected !== null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4 bg-white/70 rounded-2xl p-6 border border-[#26374d]/15">
        <div className="text-center">
          <div className="text-xl leading-relaxed" style={{ fontFamily: "'Noto Serif JP', serif" }}>{q.answer.blank}</div>
        </div>
        <p className="text-sm text-[#26374d]/70 text-center">{t.chooseGrammar}</p>
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.choices.map((c, idx) => {
            const isSelected = selected === idx;
            const isCorrect = answered && c.pattern === q.answer.pattern;
            const isWrongSelected = answered && isSelected && c.pattern !== q.answer.pattern;
            return (
              <button key={idx} type="button"
                onClick={() => { if (!answered) setSelected(idx); }}
                className={`py-3 px-3 rounded-xl border-2 font-medium text-center transition-colors
                  ${isCorrect ? "border-[#3d6b4f] bg-[#3d6b4f]/15" : isWrongSelected ? "border-[#b3452c] bg-[#b3452c]/15" : "border-[#26374d]/25 bg-[#f4efe2] active:bg-[#26374d]/10"}`}
                style={{ fontFamily: "'Noto Serif JP', serif" }}>
                {c.pattern}
                {isCorrect && <Check size={14} className="inline ml-1 text-[#3d6b4f]" />}
                {isWrongSelected && <X size={14} className="inline ml-1 text-[#b3452c]" />}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="w-full max-w-sm space-y-2">
            <div className={`flex items-center gap-2 font-semibold justify-center ${q.choices[selected].pattern === q.answer.pattern ? "text-[#3d6b4f]" : "text-[#b3452c]"}`}>
              {q.choices[selected].pattern === q.answer.pattern ? <Check size={18} /> : <X size={18} />}
              {q.choices[selected].pattern === q.answer.pattern ? t.correct : t.incorrect}
            </div>
            <div className="bg-[#26374d]/5 rounded-lg px-3 py-2 space-y-1">
              <div className="flex items-center gap-2">
                <FuriganaText text={q.answer.example.jp} className="text-base" />
                <SoundBtn text={q.answer.example.jp} size={13} />
              </div>
              <div className="text-xs text-[#26374d]/50">{q.answer.example.reading}</div>
              <div className="text-sm text-[#26374d]/80">{q.answer.example.translation[lang] || q.answer.example.translation.en}</div>
              <div className="text-xs text-[#26374d]/50 pt-1 border-t border-[#26374d]/10">
                <span className="uppercase tracking-wide font-semibold mr-1">{t.connection}:</span>{q.answer.connection}
              </div>
              {q.answer.note && (
                <div className="text-xs text-[#26374d]/70">
                  <span className="uppercase tracking-wide font-semibold mr-1 text-[#26374d]/50">{t.note}:</span>{q.answer.note[uiLang] || q.answer.note.en}
                </div>
              )}
            </div>
            <div className="text-center">
              <button onClick={newQuiz} className="underline text-[#26374d]">{t.next}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const JLPT_READING_TYPES = {
  N5: [
    "内容理解（短文）",
    "内容理解（中文）",
    "情報検索",
  ],
  N4: [
    "内容理解（短文）",
    "内容理解（中文）",
    "情報検索",
  ],
  N3: [
    "内容理解（短文）",
    "内容理解（中文）",
    "内容理解（長文）",
    "情報検索",
  ],
  N2: [
    "内容理解（短文）",
    "内容理解（中文）",
    "統合理解",
    "主張理解（長文）",
    "情報検索",
  ],
  N1: [
    "内容理解（短文）",
    "内容理解（中文）",
    "内容理解（長文）",
    "統合理解",
    "主張理解（長文）",
    "情報検索",
  ],
};

function readingTypeFor(level, entry, index) {
  const types = JLPT_READING_TYPES[level] || JLPT_READING_TYPES.N5;
  const original = String(entry?.qtype || "");

  // 既にJLPT形式の名前ならそのまま
  if (types.includes(original)) return original;

  if (/情報|検索|案内|広告|表|予定|掲示/.test(original)) {
    return "情報検索";
  }

  if (level === "N1" || level === "N2") {
    if (/統合|比較|二つ|複数/.test(original)) {
      return "統合理解";
    }
    if (/主張|意見|筆者/.test(original)) {
      return "主張理解（長文）";
    }
  }

  if (/長文/.test(original)) {
    if (types.includes("内容理解（長文）")) {
      return "内容理解（長文）";
    }
    if (types.includes("主張理解（長文）")) {
      return "主張理解（長文）";
    }
  }

  if (/中文/.test(original)) {
    return "内容理解（中文）";
  }

  if (/短文/.test(original)) {
    return "内容理解（短文）";
  }

  // 既存データも各JLPT区分に均等に振り分ける
  return types[index % types.length];
}

function JLPTReadingView({ data, level, uiLang, t }) {
  const source = data[level] || [];
  const lang = uiLang;

  const sets = useMemo(() => {
    return source.map((entry, index) => ({
      ...entry,
      jlptType: readingTypeFor(level, entry, index),
    }));
  }, [source, level]);

  const types = JLPT_READING_TYPES[level] || [];

  const [typeIdx, setTypeIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setTypeIdx(0);
    setQuestionIdx(0);
    setAnswers({});
  }, [level]);

  const activeType = types[typeIdx];

  const group = sets.filter(x => x.jlptType === activeType);

  const entry =
    group[questionIdx] ||
    group[0] ||
    sets[0];

  if (!entry) {
    return (
      <div className="py-10 text-center text-[#26374d]/50">
        読解問題がありません。
      </div>
    );
  }

  const getTranslation = (obj) => {
    if (!obj || lang === "ja") return "";
    return obj[lang] || obj.en || "";
  };

  const select = (qIdx, cIdx) => {
    const key = `${typeIdx}-${questionIdx}-${qIdx}`;

    if (answers[key] !== undefined) return;

    setAnswers(prev => ({
      ...prev,
      [key]: cIdx,
    }));
  };

  const nextQuestion = () => {
    if (questionIdx < group.length - 1) {
      setQuestionIdx(v => v + 1);
      return;
    }

    if (typeIdx < types.length - 1) {
      setTypeIdx(v => v + 1);
      setQuestionIdx(0);
    }
  };

  const prevQuestion = () => {
    if (questionIdx > 0) {
      setQuestionIdx(v => v - 1);
      return;
    }

    if (typeIdx > 0) {
      const prevType = types[typeIdx - 1];
      const prevGroup = sets.filter(
        x => x.jlptType === prevType
      );

      setTypeIdx(v => v - 1);
      setQuestionIdx(
        Math.max(0, prevGroup.length - 1)
      );
    }
  };

  const typePosition =
    types.slice(0, typeIdx).reduce((sum, type) => {
      return sum + sets.filter(x => x.jlptType === type).length;
    }, 0) +
    questionIdx +
    1;

  const total =
    types.reduce((sum, type) => {
      return sum + sets.filter(x => x.jlptType === type).length;
    }, 0);

  return (
    <div className="space-y-6">

      {/* JLPT問題区分 */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-[#26374d]/50">
          JLPT {level} 読解
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {types.map((type, idx) => {
            const count =
              sets.filter(x => x.jlptType === type).length;

            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setTypeIdx(idx);
                  setQuestionIdx(0);
                }}
                className={`shrink-0 px-4 py-2 rounded-full border text-sm font-bold
                  ${
                    idx === typeIdx
                      ? "bg-[#26374d] text-white border-[#26374d]"
                      : "bg-white/70 text-[#26374d] border-[#26374d]/15"
                  }`}
              >
                {type}
                <span className="ml-1 opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 本番風ヘッダー */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-sm font-bold text-[#c25b8f]">
            問題
          </div>

          <h3 className="text-xl font-bold text-[#26374d]">
            {activeType}
          </h3>
        </div>

        <div className="text-sm font-bold text-[#26374d]/60">
          {typePosition} / {total}
        </div>
      </div>

      {/* 指示 */}
      <div className="rounded-xl bg-[#26374d]/5 border border-[#26374d]/10 px-4 py-3 text-sm text-[#26374d]">
        次の文章を読んで、後の問いに対する答えとして
        最もよいものを、1・2・3・4から一つ選びなさい。
      </div>

      {/* 本文 */}
      <div className="rounded-2xl bg-white border border-[#26374d]/15 p-5 sm:p-7">
        <div
          className="text-[16px] sm:text-[17px] leading-[2.05] text-[#26374d] whitespace-pre-line"
          style={{
            fontFamily: "'Noto Serif JP', serif",
          }}
        >
          {entry.passage?.jp}
        </div>

        {getTranslation(entry.passage?.translation) && (
          <details className="mt-5">
            <summary className="cursor-pointer text-sm text-[#26374d]/50">
              翻訳を見る
            </summary>

            <div className="mt-2 text-sm text-[#26374d]/60">
              {getTranslation(
                entry.passage.translation
              )}
            </div>
          </details>
        )}
      </div>

      {/* 設問 */}
      <div className="space-y-7">
        {(entry.questions || []).map((q, qIdx) => {
          const key =
            `${typeIdx}-${questionIdx}-${qIdx}`;

          const selected = answers[key];

          return (
            <div
              key={qIdx}
              className="rounded-2xl bg-white/70 border border-[#26374d]/15 p-5"
            >
              <div className="flex gap-3 mb-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[#26374d] text-white flex items-center justify-center font-bold">
                  {qIdx + 1}
                </span>

                <div className="font-bold text-[#26374d] leading-relaxed">
                  {q.question?.jp}
                </div>
              </div>

              <div className="space-y-2">
                {(q.choices || []).map(
                  (choice, cIdx) => {
                    const answered =
                      selected !== undefined;

                    const correct =
                      cIdx === q.answer;

                    const chosen =
                      cIdx === selected;

                    let style =
                      "border-[#26374d]/15 bg-white text-[#26374d]";

                    if (answered && correct) {
                      style =
                        "border-[#3d6b4f] bg-[#3d6b4f]/10 text-[#244d32]";
                    } else if (
                      answered &&
                      chosen &&
                      !correct
                    ) {
                      style =
                        "border-[#b3452c] bg-[#b3452c]/10 text-[#8f321f]";
                    }

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() =>
                          select(qIdx, cIdx)
                        }
                        disabled={answered}
                        className={`w-full flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${style}`}
                      >
                        <span className="shrink-0 font-bold">
                          {cIdx + 1}.
                        </span>

                        <span>
                          {choice.jp}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 前へ・次へ */}
      <div className="flex justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={prevQuestion}
          disabled={
            typeIdx === 0 &&
            questionIdx === 0
          }
          className="px-5 py-3 rounded-full border border-[#26374d]/15 bg-white font-bold disabled:opacity-30"
        >
          ← 前の問題
        </button>

        <button
          type="button"
          onClick={nextQuestion}
          disabled={
            typeIdx === types.length - 1 &&
            questionIdx >= group.length - 1
          }
          className="px-5 py-3 rounded-full bg-[#26374d] text-white font-bold disabled:opacity-30"
        >
          次の問題 →
        </button>
      </div>
    </div>
  );
}


function ComprehensionView({ data, level, uiLang, t, isListening }) {
  const set = data[level];
  const [setIdx, setSetIdx] = useState(0);
  const entry = set[setIdx];
  const lang = uiLang;

  const [showText, setShowText] = useState(!isListening);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setSetIdx(0);
  }, [level]);

  useEffect(() => {
    setShowText(!isListening);
    setAnswers({});
  }, [level, isListening, setIdx]);

  const select = (qIdx, cIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((a) => ({ ...a, [qIdx]: cIdx }));
  };

  const answeredCount = entry.questions.filter(
    (_, idx) => answers[idx] !== undefined
  ).length;

  const score = entry.questions.reduce(
    (acc, q, idx) => acc + (answers[idx] === q.answer ? 1 : 0),
    0
  );

  const allAnswered = answeredCount === entry.questions.length;

  const getTranslation = (obj) => {
    if (!obj) return "";
    if (lang === "ja") return "";
    return obj[lang] || obj.en || "";
  };

  return (
    <div className="space-y-5">

      {/* 問題セット */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {set.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSetIdx(idx)}
            className={`min-h-[68px] px-4 py-3 rounded-2xl text-sm font-semibold border-2 transition-all leading-snug
              ${
                setIdx === idx
                  ? "bg-[#26374d] text-[#f4efe2] border-[#26374d] shadow-md scale-[1.02]"
                  : "border-[#26374d]/15 text-[#26374d] bg-white/70 hover:bg-white hover:border-[#26374d]/35"
              }`}
          >
            <div>{item.qtype}</div>
            <div className={`text-xs mt-1 ${
              setIdx === idx ? "text-white/70" : "text-[#26374d]/45"
            }`}>
              問題 {idx + 1}
            </div>
          </button>
        ))}
      </div>

      {/* タイトル */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs font-bold text-[#26374d]/45 mb-1">
            {isListening ? "JLPT 聴解練習" : "JLPT 読解練習"}
          </div>

          <h3 className="text-xl font-semibold text-[#26374d]">
            {entry.title?.[lang] ||
              (lang === "ja"
                ? isListening
                  ? "聴解問題"
                  : "読解問題"
                : entry.title?.en)}
          </h3>
        </div>

        <div className="text-sm font-semibold text-[#26374d]/60">
          {answeredCount} / {entry.questions.length}
        </div>
      </div>

      {/* 聴解 */}
      {isListening ? (
        <div className="rounded-3xl border-2 border-[#26374d]/15 bg-white/80 p-5 sm:p-7 space-y-5 shadow-sm">

          <div className="text-center space-y-2">
            <div className="text-sm font-bold text-[#26374d]">
              🎧 音声を聞いて、質問に答えてください
            </div>

            <div className="text-xs text-[#26374d]/55">
              最初はスクリプトを見ないで挑戦しましょう
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <SoundBtn text={entry.passage.jp} />
              <span className="text-xs text-[#26374d]/50">
                音声を再生
              </span>
            </div>
          </div>

          {(allAnswered || showText) && (
            <div className="rounded-2xl bg-[#26374d]/5 border border-[#26374d]/10 p-4 space-y-2">
              <div className="text-xs font-bold text-[#26374d]/50">
                スクリプト
              </div>

              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                {entry.passage.jp}
              </p>

              <p className="text-xs text-[#26374d]/45">
                {entry.passage.reading}
              </p>

              {getTranslation(entry.passage.translation) && (
                <p className="text-sm text-[#26374d]/70 border-t border-[#26374d]/10 pt-2">
                  {getTranslation(entry.passage.translation)}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowText((v) => !v)}
              className="px-4 py-2 rounded-full border-2 border-[#26374d]/20 bg-[#f4efe2] text-[#26374d] text-sm font-semibold"
            >
              {showText ? "スクリプトを隠す" : "スクリプトを見る"}
            </button>
          </div>
        </div>
      ) : (
        /* 読解 */
        <div className="bg-white/70 rounded-2xl border border-[#26374d]/15 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <SoundBtn text={entry.passage.jp} />
          </div>

          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {entry.passage.jp}
          </p>

          <p className="text-xs text-[#26374d]/50">
            {entry.passage.reading}
          </p>

          {getTranslation(entry.passage.translation) && (
            <p className="text-sm text-[#26374d]/80 pt-2 border-t border-[#26374d]/10">
              {getTranslation(entry.passage.translation)}
            </p>
          )}
        </div>
      )}

      {/* 質問 */}
      <div className="space-y-4">
        {entry.questions.map((q, qIdx) => {
          const answered = answers[qIdx] !== undefined;

          return (
            <div
              key={qIdx}
              className="bg-white/80 rounded-2xl border border-[#26374d]/15 p-4 sm:p-5 space-y-3 shadow-sm"
            >
              <div className="text-xs uppercase tracking-wide text-[#26374d]/40 font-bold">
                問題 {qIdx + 1}
              </div>

              <div
                className="font-semibold text-lg text-[#26374d]"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                {q.question.jp}
              </div>

              {getTranslation(q.question.translation) && (
                <div className="text-xs text-[#26374d]/50">
                  {getTranslation(q.question.translation)}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {q.choices.map((c, cIdx) => {
                  const isSelected = answers[qIdx] === cIdx;
                  const isCorrect = answered && cIdx === q.answer;
                  const isWrongSelected =
                    answered && isSelected && cIdx !== q.answer;

                  return (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => select(qIdx, cIdx)}
                      className={`text-left min-h-[56px] px-4 py-3 rounded-xl border-2 font-medium transition-all
                        ${
                          isCorrect
                            ? "border-[#3d6b4f] bg-[#3d6b4f]/15"
                            : isWrongSelected
                            ? "border-[#b3452c] bg-[#b3452c]/15"
                            : "border-[#26374d]/15 bg-[#f4efe2] hover:border-[#26374d]/40"
                        }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#26374d]/50">
                          {cIdx + 1}.
                        </span>

                        {isCorrect && (
                          <Check
                            size={17}
                            className="text-[#3d6b4f] shrink-0 mt-0.5"
                          />
                        )}

                        {isWrongSelected && (
                          <X
                            size={17}
                            className="text-[#b3452c] shrink-0 mt-0.5"
                          />
                        )}

                        <div>
                          <div
                            style={{ fontFamily: "'Noto Serif JP', serif" }}
                          >
                            {c.jp}
                          </div>

                          {getTranslation(c.translation) && (
                            <div className="text-xs text-[#26374d]/50 mt-1">
                              {getTranslation(c.translation)}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                    answers[qIdx] === q.answer
                      ? "text-[#3d6b4f] bg-[#3d6b4f]/10"
                      : "text-[#b3452c] bg-[#b3452c]/10"
                  }`}
                >
                  {answers[qIdx] === q.answer
                    ? "✓ 正解です"
                    : `✕ 不正解です。正解は ${q.answer + 1} 番です。`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 結果 */}
      {allAnswered && (
        <div className="rounded-2xl bg-[#26374d] text-[#f4efe2] p-5 text-center space-y-2">
          <div className="text-sm opacity-80">
            {isListening ? "聴解結果" : "読解結果"}
          </div>

          <div className="text-3xl font-bold">
            {score} / {entry.questions.length}
          </div>

          <div className="text-sm opacity-80">
            {score === entry.questions.length
              ? "全問正解！"
              : "スクリプトを確認して、もう一度聞いてみましょう。"}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchGame({ items, uiLang, t }) {
  const lang = uiLang;

  const buildCards = () => {
    const picked = shuffle(items).slice(0, 6);
    const raw = [];
    picked.forEach((item, idx) => {
      raw.push({ pairId: idx, type: "jp", content: item.jp });
      raw.push({ pairId: idx, type: "meaning", content: item.meaning[lang] || (lang === "ja" ? "" : item.meaning.en) });
    });
    return shuffle(raw);
  };

  const [cards, setCards] = useState(buildCards);
  const [selected, setSelected] = useState([]);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [lock, setLock] = useState(false);

  const resetGame = () => {
    setCards(buildCards());
    setSelected([]);
    setMatchedIds(new Set());
    setMoves(0);
    setSeconds(0);
    setRunning(true);
    setLock(false);
  };

  // Regenerate a fresh board whenever the item pool changes (e.g. level switched)
  useEffect(() => { resetGame(); /* eslint-disable-next-line */ }, [items]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const allMatched = matchedIds.size > 0 && matchedIds.size === cards.length / 2;
  useEffect(() => { if (allMatched) setRunning(false); }, [allMatched]);

  const flip = (idx) => {
    if (lock) return;
    if (selected.includes(idx)) return;
    if (matchedIds.has(cards[idx].pairId)) return;
    if (selected.length === 2) return;

    const nextSelected = [...selected, idx];
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextSelected;
      const isMatch = cards[a].pairId === cards[b].pairId && cards[a].type !== cards[b].type;
      if (isMatch) {
        setMatchedIds((prev) => new Set(prev).add(cards[a].pairId));
        setSelected([]);
      } else {
        setLock(true);
        setTimeout(() => { setSelected([]); setLock(false); }, 900);
      }
    }
  };

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-[#26374d]/70">
        <span>{t.movesLabel}: {moves}</span>
        <span>{t.timeLabel}: {fmtTime(seconds)}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, idx) => {
          const isFlipped = selected.includes(idx) || matchedIds.has(card.pairId);
          const isMatched = matchedIds.has(card.pairId);
          return (
            <button key={idx} type="button" onClick={() => flip(idx)}
              disabled={isMatched}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center p-1.5 text-center transition-all
                ${isMatched ? "border-[#3d6b4f] bg-[#3d6b4f]/10" : isFlipped ? "border-[#26374d]/60 bg-white" : "border-[#26374d]/25 bg-[#26374d] active:scale-95"}`}>
              {isFlipped ? (
                <span className={card.type === "jp" ? "text-xl" : "text-[11px] leading-tight text-[#b3452c] font-medium"}
                  style={card.type === "jp" ? { fontFamily: "'Noto Serif JP', serif" } : {}}>
                  {card.content}
                </span>
              ) : (
                <span className="text-[#f4efe2] text-lg">?</span>
              )}
            </button>
          );
        })}
      </div>

      {allMatched && (
        <div className="text-center space-y-3">
          <div className="font-semibold text-[#3d6b4f]">{t.matchedAll} {t.movesLabel}: {moves} · {t.timeLabel}: {fmtTime(seconds)}</div>
          <button onClick={resetGame} className="px-4 py-2 rounded-full bg-[#26374d] text-[#f4efe2] font-medium">
            {t.playAgain}
          </button>
        </div>
      )}
    </div>
  );
}

const LINK_COLORS = [
  { border: "border-[#e07856]", bg: "bg-[#e07856]/10", text: "text-[#e07856]" },
  { border: "border-[#5b8a72]", bg: "bg-[#5b8a72]/10", text: "text-[#5b8a72]" },
  { border: "border-[#6b7fd7]", bg: "bg-[#6b7fd7]/10", text: "text-[#6b7fd7]" },
  { border: "border-[#c25b8f]", bg: "bg-[#c25b8f]/10", text: "text-[#c25b8f]" },
];

function ChainTrail({ currentIdx, total }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 -mx-1 px-1 relative z-10" style={{ scrollbarWidth: "none" }}>
      {WORD_CHAIN.map((w, i) => (
        <React.Fragment key={i}>
          <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-300
            ${i < currentIdx ? "bg-[#3d6b4f] border-[#3d6b4f] text-white" :
              i === currentIdx ? "bg-[#c25b8f] border-[#c25b8f] text-white scale-125 shadow-lg shadow-[#c25b8f]/40 animate-pulse" :
              "bg-white/60 border-[#26374d]/15 text-[#26374d]/25"}`}
            style={i <= currentIdx ? { fontFamily: "'Noto Serif JP', serif" } : {}}>
            {i < currentIdx ? <Check size={16} /> : i === currentIdx ? w.jp[0] : "?"}
          </div>
          {i < total - 1 && (
            <div className={`shrink-0 w-5 h-1 rounded-full transition-all duration-300 ${i < currentIdx ? "bg-[#3d6b4f]" : "bg-[#26374d]/15"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


const WORD_LINK_LEVEL_DATA = {
  N5: [
    { jp:"山", reading:"やま" },
    { jp:"町", reading:"まち" },
    { jp:"地下鉄", reading:"ちかてつ" },
    { jp:"月", reading:"つき" },
    { jp:"木", reading:"き" },
    { jp:"教室", reading:"きょうしつ" },
    { jp:"机", reading:"つくえ" },
    { jp:"駅", reading:"えき" },
    { jp:"切手", reading:"きって" },
    { jp:"手", reading:"て" }
  ],

  N4: [
    { jp:"仕事", reading:"しごと" },
    { jp:"時計", reading:"とけい" },
    { jp:"医者", reading:"いしゃ" },
    { jp:"約束", reading:"やくそく" },
    { jp:"空港", reading:"くうこう" },
    { jp:"運転", reading:"うんてん" },
    { jp:"天気", reading:"てんき" },
    { jp:"季節", reading:"きせつ" },
    { jp:"都合", reading:"つごう" },
    { jp:"海", reading:"うみ" }
  ],

  N3: [
    { jp:"環境", reading:"かんきょう" },
    { jp:"運動", reading:"うんどう" },
    { jp:"動作", reading:"どうさ" },
    { jp:"作業", reading:"さぎょう" },
    { jp:"予定", reading:"よてい" },
    { jp:"意見", reading:"いけん" },
    { jp:"結果", reading:"けっか" },
    { jp:"確認", reading:"かくにん" },
    { jp:"能力", reading:"のうりょく" },
    { jp:"工夫", reading:"くふう" }
  ],

  N2: [
    { jp:"取引", reading:"とりひき" },
    { jp:"規則", reading:"きそく" },
    { jp:"工夫", reading:"くふう" },
    { jp:"運営", reading:"うんえい" },
    { jp:"意識", reading:"いしき" },
    { jp:"基準", reading:"きじゅん" },
    { jp:"需要", reading:"じゅよう" },
    { jp:"余裕", reading:"よゆう" },
    { jp:"傾向", reading:"けいこう" },
    { jp:"影響", reading:"えいきょう" }
  ],

  N1: [
    { jp:"覆す", reading:"くつがえす" },
    { jp:"推移", reading:"すいい" },
    { jp:"異議", reading:"いぎ" },
    { jp:"疑惑", reading:"ぎわく" },
    { jp:"苦慮", reading:"くりょ" },
    { jp:"余地", reading:"よち" },
    { jp:"知見", reading:"ちけん" },
    { jp:"懸念", reading:"けねん" },
    { jp:"遂行", reading:"すいこう" },
    { jp:"裁量", reading:"さいりょう" }
  ]
};


function WordLinkGame({ level, uiLang, t }) {
  const MAX_LIVES = 3;

  // 小さい「ゃ・ゅ・ょ」などを、しりとり判定用に大きい文字へ
  const edgeKana = (ch = "") => {
    const map = {
      "ゃ":"や", "ゅ":"ゆ", "ょ":"よ", "っ":"つ",
      "ぁ":"あ", "ぃ":"い", "ぅ":"う", "ぇ":"え", "ぉ":"お",
      "ゎ":"わ"
    };
    return map[ch] || ch;
  };

  const normalizeReading = (value = "") => {
    let r = String(value)
      .split(/[・／/,、\s]/)[0]
      .trim()
      .replace(/[ァ-ヶ]/g, ch =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
      )
      .replace(/[^\u3041-\u3096ー]/g, "");

    // 長音「ー」で終わるものは今回は使わない
    return r;
  };

  const getFirstKana = (reading) =>
    edgeKana([...reading][0] || "");

  const getLastKana = (reading) => {
    const chars = [...reading];
    return edgeKana(chars[chars.length - 1] || "");
  };

  const buildPool = () => {
    const src = [
      ...(VOCAB[level] || []),
      ...(KANJI[level] || [])
    ];

    const seen = new Set();

    return src
      .map(item => ({
        jp: item.jp,
        reading: normalizeReading(item.reading)
      }))
      .filter(item => {
        if (!item.jp || !item.reading) return false;
        if (item.reading.length < 2) return false;
        if (item.reading.endsWith("ー")) return false;

        const last = getLastKana(item.reading);

        // 「ん」で終わる言葉は途中に使えない
        if (last === "ん") return false;

        const key = `${item.jp}:${item.reading}`;
        if (seen.has(key)) return false;
        seen.add(key);

        return true;
      });
  };

  const shuffleLocal = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const makeNewChain = () => {
    const pool = buildPool();

    // 読みの最初の文字ごとにグループ化
    const byFirst = {};

    pool.forEach(item => {
      const first = getFirstKana(item.reading);
      if (!byFirst[first]) byFirst[first] = [];
      byFirst[first].push(item);
    });

    // 10語のしりとりを探す
    const search = (chain, used) => {
      if (chain.length >= 10) return chain;

      const lastWord = chain[chain.length - 1];
      const needed = getLastKana(lastWord.reading);

      const candidates = shuffleLocal(byFirst[needed] || [])
        .filter(item => !used.has(`${item.jp}:${item.reading}`))
        .slice(0, 30);

      for (const item of candidates) {
        const key = `${item.jp}:${item.reading}`;
        const nextUsed = new Set(used);
        nextUsed.add(key);

        const result = search([...chain, item], nextUsed);

        if (result) return result;
      }

      return null;
    };

    const starts = shuffleLocal(pool).slice(0, 150);

    for (const first of starts) {
      const key = `${first.jp}:${first.reading}`;
      const result = search([first], new Set([key]));

      if (result && result.length >= 10) {
        return result.slice(0, 10);
      }
    }

    // 万一自動生成できない場合だけ、今までのレベル別データを使う
    const fallback =
      WORD_LINK_LEVEL_DATA[level] ||
      WORD_LINK_LEVEL_DATA.N5;

    return fallback.slice(0, 10);
  };

  const [chain, setChain] = useState(() => makeNewChain());

  const buildChoices = (currentIdx, activeChain = chain) => {
    const correctIdx = currentIdx + 1;
    const requiredKana = getLastKana(activeChain[currentIdx].reading);

    const pool = activeChain
      .map((_, i) => i)
      .filter(i =>
        i !== correctIdx &&
        i !== currentIdx
      );

    const distractors = shuffleLocal(pool).slice(0, 3);

    return {
      correctIdx,
      requiredKana,
      choices: shuffleLocal([correctIdx, ...distractors])
    };
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [round, setRound] = useState(() =>
    buildChoices(0, chain)
  );
  const [lives, setLives] = useState(MAX_LIVES);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);

  const startNewGame = () => {
    const nextChain = makeNewChain();

    setChain(nextChain);
    setCurrentIdx(0);
    setRound(buildChoices(0, nextChain));
    setLives(MAX_LIVES);
    setStreak(0);
    setSelected(null);
    setFeedback(null);
    setLocked(false);
    setGameOver(false);
    setGameWon(false);
    setShake(false);
  };

  // N1/N2/N3/N4/N5を変更した時も新しい問題にする
  useEffect(() => {
    const nextChain = makeNewChain();

    setChain(nextChain);
    setCurrentIdx(0);
    setRound(buildChoices(0, nextChain));
    setLives(MAX_LIVES);
    setStreak(0);
    setBest(0);
    setSelected(null);
    setFeedback(null);
    setLocked(false);
    setGameOver(false);
    setGameWon(false);
    setShake(false);
    setRoundNumber(1);
  }, [level]);

  const select = (choiceIdx) => {
    if (locked || gameOver || gameWon) return;

    setSelected(choiceIdx);
    setLocked(true);

    const isCorrect = choiceIdx === round.correctIdx;

    if (isCorrect) {
      setFeedback("correct");

      setStreak(s => {
        const ns = s + 1;
        setBest(b => Math.max(b, ns));
        return ns;
      });

      setTimeout(() => {
        const nextIdx = round.correctIdx;

        if (nextIdx >= chain.length - 1) {
          setCurrentIdx(nextIdx);
          setGameWon(true);

          // 完成画面を少し見せてから、新しい10語へ
          setTimeout(() => {
            setRoundNumber(n => n + 1);
            startNewGame();
          }, 1300);

        } else {
          setCurrentIdx(nextIdx);
          setRound(buildChoices(nextIdx, chain));
          setSelected(null);
          setFeedback(null);
          setLocked(false);
        }
      }, 700);

    } else {
      setFeedback("wrong");
      setShake(true);
      setStreak(0);

      setTimeout(() => setShake(false), 400);

      const livesLeft = lives - 1;
      setLives(livesLeft);

      setTimeout(() => {
        if (livesLeft <= 0) {
          setGameOver(true);
        } else {
          setRound(buildChoices(currentIdx, chain));
          setSelected(null);
          setFeedback(null);
          setLocked(false);
        }
      }, 900);
    }
  };

  const resetGame = () => {
    startNewGame();
  };

  const currentWord = chain[currentIdx];

  if (!currentWord || !round) {
    return (
      <div className="py-10 text-center text-[#26374d]/50">
        問題を作っています...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div
        className="rounded-3xl p-5 space-y-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #fdf0e3 0%, #fbe4e9 45%, #e8e3fb 100%)"
        }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Link2 className="text-[#c25b8f]" size={22} />

            <div>
              <h3 className="text-lg font-bold text-[#26374d]">
                {t.wordLink}
              </h3>
              <div className="text-xs text-[#26374d]/45">
                {level} ・ ROUND {roundNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <Heart
                key={i}
                size={18}
                className={
                  i < lives
                    ? "text-[#c25b8f] fill-[#c25b8f]"
                    : "text-[#26374d]/20"
                }
              />
            ))}
          </div>
        </div>

        <ChainTrail
          currentIdx={currentIdx}
          total={chain.length}
        />

        {streak >= 2 && !gameOver && !gameWon && (
          <div className="flex items-center justify-center gap-1 text-[#e07856] font-bold text-sm">
            <Flame size={16} className="animate-bounce" />
            {t.streakLabel} ×{streak}
          </div>
        )}

        {!gameOver && !gameWon && (
          <>
            <div className="text-center space-y-2">
              <div
                className={`inline-flex items-center gap-2 bg-white/90 rounded-2xl px-6 py-4 shadow-md border-2 border-white ${
                  feedback === "correct" ? "link-pop" : ""
                }`}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Noto Serif JP', serif"
                  }}
                >
                  {currentWord.jp}
                </span>

                <SoundBtn text={currentWord.jp} />
              </div>

              <div className="text-xs text-[#26374d]/50">
                {currentWord.reading}
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <div className="h-px w-8 bg-[#c25b8f]/40" />
                <Link2 size={14} className="text-[#c25b8f]" />
                <div className="h-px w-8 bg-[#c25b8f]/40" />
              </div>

              <div className="text-sm text-[#26374d]/70 font-medium">
                {t.nextPrefix}
                <span className="text-lg font-bold text-[#c25b8f]">
                  「{round.requiredKana}」
                </span>
                {t.nextSuffix}
              </div>
            </div>

            <div
              className={`grid grid-cols-2 gap-3 ${
                shake ? "link-shake" : ""
              }`}
            >
              {round.choices.map((idx, pos) => {
                const item = chain[idx];
                const color =
                  LINK_COLORS[pos % LINK_COLORS.length];

                const isSelected = selected === idx;
                const isCorrectChoice =
                  feedback && idx === round.correctIdx;
                const isWrongSelected =
                  feedback === "wrong" && isSelected;

                return (
                  <button
                    key={`${idx}-${item.jp}`}
                    type="button"
                    onClick={() => select(idx)}
                    disabled={locked}
                    className={`relative py-3.5 px-3 rounded-2xl border-2 font-semibold text-center transition-all
                      ${
                        isCorrectChoice
                          ? "border-[#3d6b4f] bg-[#3d6b4f]/15 link-pop"
                          : isWrongSelected
                          ? "border-[#b3452c] bg-[#b3452c]/15"
                          : `${color.border} ${color.bg} hover:scale-105 active:scale-95 shadow-sm`
                      }`}
                  >
                    <span
                      style={{
                        fontFamily: "'Noto Serif JP', serif"
                      }}
                      className={`text-lg ${
                        isCorrectChoice
                          ? "text-[#3d6b4f]"
                          : isWrongSelected
                          ? "text-[#b3452c]"
                          : color.text
                      }`}
                    >
                      {item.jp}
                    </span>

                    {isCorrectChoice && (
                      <Check
                        size={14}
                        className="inline ml-1 text-[#3d6b4f]"
                      />
                    )}

                    {isWrongSelected && (
                      <X
                        size={14}
                        className="inline ml-1 text-[#b3452c]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {gameWon && (
          <div className="text-center space-y-3 py-5">
            <div className="text-4xl">🎉</div>

            <div className="font-bold text-lg text-[#26374d]">
              全部つながりました！
            </div>

            <div className="text-sm text-[#26374d]/60">
              次の新しい問題を作っています…
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center space-y-3 py-4">
            <div className="font-bold text-lg text-[#26374d]">
              {t.gameOverMsg}
            </div>

            <div className="text-sm text-[#26374d]/70">
              正解：
              <span className="font-bold ml-1">
                {chain[round.correctIdx]?.jp}
              </span>
            </div>

            <button
              onClick={resetGame}
              className="px-5 py-2.5 rounded-full bg-[#26374d] text-[#f4efe2] font-medium"
            >
              新しい問題
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- KANJI QUEST: world map + battle + persistent progress ---------- */
function getStagePool(stage) {
  if (stage.level === null) {
    return [...HIRAGANA, ...KATAKANA].map(([ch, romaji]) => ({ jp: ch, reading: romaji }));
  }
  return [...VOCAB[stage.level], ...KANJI[stage.level]].map((it) => ({ jp: it.jp, reading: it.reading }));
}

function levelFromExp(exp) {
  return Math.floor(exp / 100) + 1;
}

function QuestMap({ profile, onSelectStage, t }) {
  const lv = levelFromExp(profile.exp);
  const expIntoLevel = profile.exp % 100;
  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-4 flex items-center justify-between text-[#f4efe2]"
        style={{ background: "linear-gradient(135deg, #26374d 0%, #3a2f52 100%)" }}>
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-[#f4c542]" />
          <div>
            <div className="text-sm font-bold">{t.lvLabel} {lv}</div>
            <div className="w-24 h-1.5 rounded-full bg-white/20 mt-1 overflow-hidden">
              <div className="h-full bg-[#f4c542]" style={{ width: `${expIntoLevel}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-bold">
          <Coins size={18} className="text-[#f4c542]" />
          {profile.coins}
        </div>
      </div>

      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const cleared = profile.clearedStages.includes(stage.id);
          const unlocked = idx === 0 || profile.clearedStages.includes(STAGES[idx - 1].id);
          return (
            <button key={stage.id} type="button" disabled={!unlocked}
              onClick={() => onSelectStage(stage)}
              className={`w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-transform
                ${unlocked ? "border-[#26374d]/25 bg-white/70 hover:scale-[1.02] active:scale-95" : "border-[#26374d]/10 bg-[#26374d]/5 opacity-60"}`}>
              <span className="text-3xl">{unlocked ? stage.emoji : "🔒"}</span>
              <div className="flex-1">
                <div className="font-bold text-[#26374d]">{stage.name}</div>
                <div className="text-xs text-[#26374d]/50">
                  {cleared ? `✓ ${t.stageClear}` : unlocked ? t.tapToStart : t.locked}
                </div>
              </div>
              {cleared && <Trophy size={18} className="text-[#f4c542]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuestBattle({ stage, profile, setProfile, mistakes, setMistakes, onExit, t }) {
  const stageIdx = STAGES.findIndex((s) => s.id === stage.id);
  const pool = useMemo(() => getStagePool(stage), [stage]);
  const [enemyHp, setEnemyHp] = useState(stage.enemyHp);
  const [playerHp, setPlayerHp] = useState(5);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [outcome, setOutcome] = useState(null); // 'win' | 'lose' | null

  const weightedIndices = () => {
    const arr = [];
    pool.forEach((item, idx) => {
      const key = `${stage.id}:${item.jp}`;
      const miss = mistakes[key] || 0;
      const repeat = 1 + Math.min(miss, 3);
      for (let i = 0; i < repeat; i++) arr.push(idx);
    });
    return arr;
  };

  const buildQuestion = () => {
    const weighted = weightedIndices();
    const correctIdx = weighted[Math.floor(Math.random() * weighted.length)];
    const distractorPool = pool.map((_, i) => i).filter((i) => i !== correctIdx && pool[i].reading !== pool[correctIdx].reading);
    const distractors = shuffle(distractorPool).slice(0, 3);
    return { correctIdx, choices: shuffle([correctIdx, ...distractors]) };
  };

  const [question, setQuestion] = useState(buildQuestion);

  const recordResult = async (item, wasCorrect) => {
    const key = `${stage.id}:${item.jp}`;
    const current = mistakes[key] || 0;
    const updated = wasCorrect ? Math.max(0, current - 1) : current + 1;
    const next = { ...mistakes, [key]: updated };
    setMistakes(next);
    try { await window.storage.set("kanjiquest_mistakes", JSON.stringify(next), false); } catch (e) {}
  };

  const select = (choiceIdx) => {
    if (locked || outcome) return;
    setSelected(choiceIdx);
    setLocked(true);
    const isCorrect = choiceIdx === question.correctIdx;
    recordResult(pool[question.correctIdx], isCorrect);

    if (isCorrect) {
      setFeedback("correct");
      const newEnemyHp = enemyHp - 1;
      setTimeout(async () => {
        if (newEnemyHp <= 0) {
          setEnemyHp(0);
          const newProfile = {
            ...profile,
            coins: profile.coins + stage.coin,
            exp: profile.exp + stage.exp,
            clearedStages: profile.clearedStages.includes(stage.id) ? profile.clearedStages : [...profile.clearedStages, stage.id],
          };
          setProfile(newProfile);
          try { await window.storage.set("kanjiquest_profile", JSON.stringify(newProfile), false); } catch (e) {}
          setOutcome("win");
        } else {
          setEnemyHp(newEnemyHp);
          setQuestion(buildQuestion());
          setSelected(null);
          setFeedback(null);
          setLocked(false);
        }
      }, 700);
    } else {
      setFeedback("wrong");
      const newPlayerHp = playerHp - 1;
      setTimeout(() => {
        if (newPlayerHp <= 0) {
          setPlayerHp(0);
          setOutcome("lose");
        } else {
          setPlayerHp(newPlayerHp);
          setQuestion(buildQuestion());
          setSelected(null);
          setFeedback(null);
          setLocked(false);
        }
      }, 900);
    }
  };

  const currentItem = pool[question.correctIdx];

  return (
    <div className="space-y-4">
      <button onClick={onExit} className="text-sm text-[#26374d]/60 underline">{t.backToMap}</button>

      <div className="rounded-2xl p-4 space-y-4" style={{ background: "linear-gradient(135deg, #2a2440 0%, #402a3a 100%)" }}>
        <div className="flex items-center justify-between">
          <div className="text-4xl">{stage.enemy}</div>
          <div className="flex-1 mx-3">
            <div className="h-3 rounded-full bg-white/15 overflow-hidden">
              <div className="h-full bg-[#e05252] transition-all" style={{ width: `${(enemyHp / stage.enemyHp) * 100}%` }} />
            </div>
          </div>
          <div className="text-xs text-white/70 font-semibold">{enemyHp}/{stage.enemyHp} {t.hp}</div>
        </div>

        {!outcome && (
          <>
            <div className="bg-white/90 rounded-2xl p-5 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>{currentItem.jp}</span>
                <SoundBtn text={currentItem.jp} />
              </div>
              <p className="text-xs text-[#26374d]/60">{t.chooseReading}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {question.choices.map((idx, pos) => {
                const item = pool[idx];
                const isSelected = selected === idx;
                const isCorrectChoice = feedback && idx === question.correctIdx;
                const isWrongSelected = feedback === "wrong" && isSelected;
                return (
                  <button key={idx} type="button" disabled={locked} onClick={() => select(idx)}
                    className={`py-3 px-3 rounded-xl border-2 font-semibold text-center transition-all
                      ${isCorrectChoice ? "border-[#3d6b4f] bg-[#3d6b4f]/30 text-[#8fd9a8]" : isWrongSelected ? "border-[#e05252] bg-[#e05252]/30 text-[#f5a3a3]" : "border-white/30 bg-white/10 text-white hover:scale-105 active:scale-95"}`}>
                    {item.reading}
                    {isCorrectChoice && <Check size={14} className="inline ml-1" />}
                    {isWrongSelected && <X size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex items-center gap-1 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart key={i} size={18} className={i < playerHp ? "text-[#e05252] fill-[#e05252]" : "text-white/20"} />
          ))}
        </div>

        {outcome === "win" && (
          <div className="text-center space-y-2 py-2">
            <PartyPopper className="mx-auto text-[#f4c542]" size={32} />
            <div className="font-bold text-lg text-white">{t.victory}</div>
            <div className="text-sm text-white/80 flex items-center justify-center gap-3">
              <span className="flex items-center gap-1"><Coins size={14} className="text-[#f4c542]" /> +{stage.coin}</span>
              <span>EXP +{stage.exp}</span>
            </div>
            <button onClick={onExit} className="px-5 py-2 rounded-full bg-[#f4c542] text-[#26374d] font-bold mt-2">
              {t.backToMap}
            </button>
          </div>
        )}

        {outcome === "lose" && (
          <div className="text-center space-y-2 py-2">
            <div className="font-bold text-lg text-white">{t.defeat}</div>
            <button onClick={onExit} className="px-5 py-2 rounded-full bg-white/90 text-[#26374d] font-bold mt-2">
              {t.backToMap}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function KanaChainGame({ level }) {
  const KANA = [..."あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ"];

  const extra = {
    N5: [
      { jp: "山", reading: "やま" },
      { jp: "川", reading: "かわ" },
      { jp: "花", reading: "はな" },
      { jp: "空", reading: "そら" },
    ],
    N4: [
      { jp: "世界", reading: "せかい" },
      { jp: "仕事", reading: "しごと" },
      { jp: "季節", reading: "きせつ" },
      { jp: "約束", reading: "やくそく" },
    ],
    N3: [
      { jp: "桜", reading: "さくら" },
      { jp: "環境", reading: "かんきょう" },
      { jp: "情報", reading: "じょうほう" },
      { jp: "社会", reading: "しゃかい" },
    ],
    N2: [
      { jp: "矛盾", reading: "むじゅん" },
      { jp: "傾向", reading: "けいこう" },
      { jp: "基準", reading: "きじゅん" },
      { jp: "需要", reading: "じゅよう" },
    ],
    N1: [
      { jp: "曖昧", reading: "あいまい" },
      { jp: "裁量", reading: "さいりょう" },
      { jp: "洞察", reading: "どうさつ" },
      { jp: "遂行", reading: "すいこう" },
    ],
  };

  const toHiragana = (value = "") =>
    String(value)
      .split(/[・／/]/)[0]
      .replace(/[ァ-ヶ]/g, ch =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
      )
      .replace(/[^\u3041-\u3096]/g, "");

  const questions = useMemo(() => {
    const src = [
      ...(extra[level] || []),
      ...(KANJI[level] || []),
      ...(VOCAB[level] || []),
    ];

    const seen = new Set();

    return src
      .map(x => ({
        jp: x.jp,
        reading: toHiragana(x.reading),
      }))
      .filter(x => {
        if (!x.jp || !x.reading) return false;
        if (!/[\u3400-\u9fff]/.test(x.jp)) return false;
        if (x.reading.length < 2 || x.reading.length > 6) return false;

        const key = x.jp + ":" + x.reading;
        if (seen.has(key)) return false;

        seen.add(key);
        return true;
      });
  }, [level]);

  const makeRound = (index) => {
    const q =
      questions[index] ||
      extra[level]?.[0] ||
      { jp: "桜", reading: "さくら" };

    const answer = [...q.reading];
    const tiles = answer.map((kana, i) => ({
      id: `a-${i}`,
      kana,
    }));

    while (tiles.length < 8) {
      const kana = KANA[Math.floor(Math.random() * KANA.length)];
      tiles.push({
        id: `d-${tiles.length}-${Math.random()}`,
        kana,
      });
    }

    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    return { q, answer, tiles };
  };

  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(() => makeRound(0));
  const [chosen, setChosen] = useState([]);
  const [used, setUsed] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    setIndex(0);
    setRound(makeRound(0));
    setChosen([]);
    setUsed([]);
    setResult("");
  }, [level, questions.length]);

  const reset = () => {
    setChosen([]);
    setUsed([]);
    setResult("");
  };

  const next = () => {
    const n = questions.length
      ? (index + 1) % questions.length
      : 0;

    setIndex(n);
    setRound(makeRound(n));
    setChosen([]);
    setUsed([]);
    setResult("");
  };

  const choose = (tile) => {
    if (used.includes(tile.id) || result === "correct") return;

    const nextChosen = [...chosen, tile.kana];
    const pos = nextChosen.length - 1;

    if (tile.kana !== round.answer[pos]) {
      setResult("wrong");
      setTimeout(reset, 650);
      return;
    }

    setChosen(nextChosen);
    setUsed([...used, tile.id]);

    if (nextChosen.length === round.answer.length) {
      setResult("correct");
    }
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-3xl p-5 sm:p-7"
        style={{
          background:
            "linear-gradient(135deg,#fdf0e3 0%,#fbe4e9 50%,#e8e3fb 100%)"
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xl font-bold text-[#26374d]">
              かなチェーン
            </div>
            <div className="text-sm text-[#26374d]/60">
              漢字の読み方を順番につなげよう
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-white/80 font-bold">
            {level}
          </div>
        </div>

        <div className="text-center mb-7">
          <div
            className="text-6xl font-bold text-[#26374d] mb-3"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {round.q.jp}
          </div>

          <div className="text-sm text-[#26374d]/60">
            8文字から正しい読み方を選んでください
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-2 mb-7">
          {round.answer.map((_, i) => (
            <React.Fragment key={i}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center
                  text-xl font-bold border-2
                  ${
                    chosen[i]
                      ? "bg-[#c25b8f] border-[#c25b8f] text-white"
                      : "bg-white/80 border-[#26374d]/15 text-[#26374d]/25"
                  }`}
              >
                {chosen[i] || "?"}
              </div>

              {i < round.answer.length - 1 && (
                <ChevronRight
                  size={18}
                  className="text-[#26374d]/30"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-6">
          {round.tiles.map(tile => {
            const disabled = used.includes(tile.id);

            return (
              <button
                key={tile.id}
                type="button"
                disabled={disabled}
                onClick={() => choose(tile)}
                className={`aspect-square rounded-2xl border-2 text-2xl font-bold
                  transition-all
                  ${
                    disabled
                      ? "bg-[#26374d]/10 border-transparent text-[#26374d]/25"
                      : "bg-white border-[#c25b8f]/30 text-[#26374d] hover:scale-105"
                  }`}
              >
                {tile.kana}
              </button>
            );
          })}
        </div>

        <div className="text-center min-h-[40px] mb-4">
          {result === "correct" && (
            <div className="font-bold text-green-700 text-lg">
              ✓ 正解！ {round.q.jp} → {round.answer.join("")}
            </div>
          )}

          {result === "wrong" && (
            <div className="font-bold text-red-700">
              ✕ 順番が違います
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="px-5 py-2.5 rounded-full bg-white border border-[#26374d]/15 font-bold"
          >
            やり直す
          </button>

          <button
            type="button"
            onClick={next}
            className="px-5 py-2.5 rounded-full bg-[#26374d] text-white font-bold"
          >
            次の漢字 →
          </button>
        </div>
      </div>
    </div>
  );
}

function KanjiQuestGame({ t }) {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState({ exp: 0, coins: 0, clearedStages: [] });
  const [mistakes, setMistakes] = useState({});
  const [activeStage, setActiveStage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const p = await window.storage.get("kanjiquest_profile");
        if (p && p.value) setProfile(JSON.parse(p.value));
      } catch (e) { /* no saved profile yet */ }
      try {
        const m = await window.storage.get("kanjiquest_mistakes");
        if (m && m.value) setMistakes(JSON.parse(m.value));
      } catch (e) { /* no saved mistakes yet */ }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <div className="text-center text-sm text-[#26374d]/50 py-8">...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Swords className="text-[#c25b8f]" size={22} />
        <h3 className="text-lg font-bold text-[#26374d]">{t.questTitle}</h3>
      </div>
      {activeStage ? (
        <QuestBattle stage={activeStage} profile={profile} setProfile={setProfile}
          mistakes={mistakes} setMistakes={setMistakes} onExit={() => setActiveStage(null)} t={t} />
      ) : (
        <QuestMap profile={profile} onSelectStage={setActiveStage} t={t} />
      )}
    </div>
  );
}




/* ===== CONVERSATION PLUS START ===== */

const CONVERSATION_PLUS = {
  N5: [
    ["買い物", "コンビニで買い物", [
      ["A", "すみません、おにぎりはどこですか。"],
      ["B", "あちらです。飲み物の隣にあります。"],
      ["A", "ありがとうございます。"],
      ["B", "どういたしまして。"]
    ]],
    ["交通", "駅で電車を聞く", [
      ["A", "すみません、新宿へ行きたいです。"],
      ["B", "二番線の電車に乗ってください。"],
      ["A", "何分ぐらいかかりますか。"],
      ["B", "十五分ぐらいです。"]
    ]],
    ["学校", "授業について聞く", [
      ["A", "明日の授業は何時からですか。"],
      ["B", "九時からです。"],
      ["A", "教室はどこですか。"],
      ["B", "三階の301教室です。"]
    ]],
    ["食事", "レストランで注文", [
      ["A", "すみません、カレーを一つお願いします。"],
      ["B", "はい。飲み物はいかがですか。"],
      ["A", "水をお願いします。"],
      ["B", "かしこまりました。"]
    ]],
    ["日常", "友達と予定を決める", [
      ["A", "日曜日、いっしょに映画を見ませんか。"],
      ["B", "いいですね。何時に会いますか。"],
      ["A", "一時はどうですか。"],
      ["B", "はい、大丈夫です。"]
    ]]
  ],

  N4: [
    ["病院", "受付で症状を伝える", [
      ["A", "すみません、昨日から熱があります。"],
      ["B", "分かりました。こちらに名前を書いてください。"],
      ["A", "どのくらい待ちますか。"],
      ["B", "三十分ぐらいです。"]
    ]],
    ["電話", "アルバイト先に連絡", [
      ["A", "おはようございます。アルバイトのラマです。"],
      ["B", "おはようございます。どうしましたか。"],
      ["A", "体調が悪いので、今日お休みしてもよろしいですか。"],
      ["B", "分かりました。ゆっくり休んでください。"]
    ]],
    ["学校", "宿題について相談", [
      ["A", "先生、この宿題は明日までですか。"],
      ["B", "いいえ、金曜日までで大丈夫ですよ。"],
      ["A", "分からないところがあるんですが。"],
      ["B", "授業のあとで一緒に確認しましょう。"]
    ]],
    ["仕事", "シフトを相談する", [
      ["A", "来週の土曜日ですが、休んでもいいでしょうか。"],
      ["B", "代わりに入れる人はいますか。"],
      ["A", "山田さんに聞いてみます。"],
      ["B", "では、分かったら教えてください。"]
    ]],
    ["生活", "宅配便を受け取る", [
      ["A", "宅配便です。お荷物をお持ちしました。"],
      ["B", "ありがとうございます。"],
      ["A", "こちらにサインをお願いします。"],
      ["B", "はい、分かりました。"]
    ]]
  ],

  N3: [
    ["仕事", "仕事の進め方を確認", [
      ["A", "この資料、今日中に完成させたほうがいいですか。"],
      ["B", "できれば今日中にお願いします。ただ、急いで間違えるより、明日の朝でも正確なほうがいいです。"],
      ["A", "分かりました。まず重要な部分から確認します。"],
      ["B", "お願いします。分からないところがあれば聞いてください。"]
    ]],
    ["相談", "友達に相談する", [
      ["A", "最近、勉強してもなかなか覚えられないんだ。"],
      ["B", "一度にたくさん覚えようとしてない？"],
      ["A", "そうかもしれない。毎日かなり多くやってる。"],
      ["B", "少し減らして、前の日の復習も入れたらどう？"]
    ]],
    ["電話", "予約時間を変更する", [
      ["A", "明日の三時に予約しているラマですが、時間を変更できますか。"],
      ["B", "はい。何時ごろをご希望ですか。"],
      ["A", "できれば五時以降がいいんですが。"],
      ["B", "五時半でしたら空いております。"]
    ]],
    ["学校", "発表の準備", [
      ["A", "来週の発表、どうやって分担しようか。"],
      ["B", "私は資料を作るから、発表をお願いしてもいい？"],
      ["A", "いいよ。でも最後の確認は一緒にしよう。"],
      ["B", "そうだね。前日に一度練習しよう。"]
    ]],
    ["サービス", "商品を交換する", [
      ["A", "昨日こちらで買ったんですが、サイズが合わなくて。"],
      ["B", "レシートはお持ちでしょうか。"],
      ["A", "はい、こちらです。"],
      ["B", "ありがとうございます。同じ商品の別サイズと交換できます。"]
    ]]
  ],

  N2: [
    ["仕事", "締め切りを調整する", [
      ["A", "先ほどお願いされた資料ですが、今日中の提出は少し難しそうです。"],
      ["B", "どの部分に時間がかかっていますか。"],
      ["A", "最新データの確認です。急げば出せますが、正確性に不安が残ります。"],
      ["B", "それなら、今日は確認済みの部分だけ共有して、完成版は明日の午前中にしましょう。"],
      ["A", "承知しました。そのように進めます。"]
    ]],
    ["敬語", "担当者への取り次ぎ", [
      ["A", "恐れ入りますが、営業部の田中様はいらっしゃいますでしょうか。"],
      ["B", "申し訳ございません。田中はただいま席を外しております。"],
      ["A", "では、お戻りになりましたら、お電話いただけるようお伝えいただけますか。"],
      ["B", "かしこまりました。お名前とお電話番号をお願いいたします。"]
    ]],
    ["相談", "提案について意見を述べる", [
      ["A", "この案なら費用をかなり抑えられると思います。"],
      ["B", "確かに費用面では魅力的ですが、長期的な管理についてはどうでしょうか。"],
      ["A", "そこは追加で検討する必要がありますね。"],
      ["B", "導入後の負担まで含めて比較してみませんか。"]
    ]],
    ["生活", "契約内容を確認する", [
      ["A", "契約を更新する前に、一点確認したいことがあります。"],
      ["B", "はい、どのようなことでしょうか。"],
      ["A", "途中で解約した場合、追加の費用は発生しますか。"],
      ["B", "契約期間によって異なりますので、こちらの条件をご確認ください。"]
    ]],
    ["依頼", "丁寧に断る", [
      ["A", "今週末のイベント、手伝ってもらえないでしょうか。"],
      ["B", "お声がけいただいてありがたいのですが、その日は以前から予定が入っておりまして。"],
      ["A", "そうですか。急にお願いしてすみません。"],
      ["B", "別の日の準備でしたら、お手伝いできると思います。"]
    ]]
  ],

  N1: [
    ["仕事", "方針変更について協議する", [
      ["A", "今回の方針変更ですが、現場への説明が十分でないまま進めるのは難しいのではないでしょうか。"],
      ["B", "おっしゃることは分かります。ただ、決定を遅らせることで別の問題が生じる可能性もあります。"],
      ["A", "変更そのものに反対しているわけではありません。実施するなら、少なくとも判断の背景を共有すべきだと思います。"],
      ["B", "確かに、結論だけ伝えても納得は得にくいでしょうね。"],
      ["A", "ええ。説明の機会を設けたうえで実施時期を調整するのが現実的ではないでしょうか。"]
    ]],
    ["交渉", "条件について交渉する", [
      ["A", "ご提示いただいた条件についてですが、納期を優先する場合、現在の予算では品質を維持するのが難しいと考えております。"],
      ["B", "予算を増やす以外に方法はありませんか。"],
      ["A", "機能の一部を次の段階に回すのであれば、現行の予算内でも対応可能です。"],
      ["B", "なるほど。優先順位を整理した案を改めていただけますか。"],
      ["A", "承知しました。本日中に修正版をお送りします。"]
    ]],
    ["意見", "意見の食い違いを調整する", [
      ["A", "私は利用者の選択肢を増やすことを優先すべきだと思います。"],
      ["B", "ただ、選択肢を増やしすぎると、かえって利用者が迷う可能性もありませんか。"],
      ["A", "その点は理解しています。ただ、選択肢の数より提示方法の問題ではないでしょうか。"],
      ["B", "つまり、情報を整理できれば選択肢自体を減らす必要はないということですね。"],
      ["A", "はい。まず表示方法を改善して、その結果を見て判断したいです。"]
    ]],
    ["説明", "問題の原因を説明する", [
      ["A", "今回の遅れは、単に作業量が多かったことだけが原因なのでしょうか。"],
      ["B", "いいえ。作業開始後に条件が何度か変更され、そのたびに確認作業が必要になったことも大きいです。"],
      ["A", "では、作業速度を上げるだけでは同じ問題が起こる可能性がありますね。"],
      ["B", "そう思います。変更時の確認手順そのものを見直す必要があります。"],
      ["A", "分かりました。次回からの手順も含めて改善案をまとめましょう。"]
    ]],
    ["相談", "相手に配慮しながら反対する", [
      ["A", "この企画はできるだけ早く公開したいと考えています。"],
      ["B", "方向性には賛成です。ただ、現段階で公開することには少し懸念があります。"],
      ["A", "具体的にはどの点でしょうか。"],
      ["B", "利用者への説明がまだ十分ではありません。公開を数日遅らせても、そこを整えたほうが結果的に信頼につながると思います。"],
      ["A", "なるほど。その期間で何ができるか整理してみましょう。"]
    ]]
  ]
};

function addConversationPlus() {
  for (const level of ["N5", "N4", "N3", "N2", "N1"]) {
    if (!CONVERSATIONS[level]) CONVERSATIONS[level] = [];

    CONVERSATION_PLUS[level].forEach(([group, title, lines], i) => {
      CONVERSATIONS[level].push({
        group,
        title: {
          ja: title,
          en: title,
          ne: title,
          vi: title,
          my: title
        },
        lines: lines.map(([speaker, jp]) => ({
          speaker,
          jp,
          reading: "",
          meaning: {
            ja: jp,
            en: jp,
            ne: jp,
            vi: jp,
            my: jp
          }
        }))
      });
    });
  }
}

addConversationPlus();

/* ===== CONVERSATION PLUS END ===== */


/* ===== HARD READING PLUS START ===== */

const HARD_READING_TOPICS = {
  N1: [
    {
      type: "長文",
      title: "効率化が生み出す新たな非効率",
      text: `技術の発達によって、私たちは以前より短い時間で多くの仕事を処理できるようになった。しかし、効率化によって生まれた時間が、そのまま余暇になるとは限らない。むしろ、処理できる仕事の量が増えた結果、以前なら求められなかった速さで返事をしたり、より多くの情報を確認したりすることが当然だと考えられるようになった。

つまり、技術が時間を節約した一方で、社会の側が「その時間でさらに何かができるはずだ」という新しい期待を作り出したのである。そのため、個人が感じる忙しさは必ずしも減らない。ここで重要なのは、効率そのものを否定することではない。何のために効率化するのかを考えず、処理量を増やすことだけを目的にすると、効率化がかえって人を時間に追われる状態へ導く可能性があるという点である。

本来、効率化によって生まれた余裕は、考える時間や新しい発想のためにも使えるはずだ。ところが、短期的な成果だけを評価する環境では、その余裕まで新たな作業で埋められやすい。効率を高めることと、時間を有効に使うことは、同じように見えて実は異なるのである。`
    },
    {
      type: "主張理解",
      title: "専門家と知識の境界",
      text: `ある分野について深い知識を持つ専門家の意見は、社会が複雑な問題を判断するうえで欠かせない。しかし、専門家の発言であるという理由だけで、その内容を無条件に受け入れるのも適切ではない。専門家が詳しいのは、基本的には自らの専門領域だからである。

問題が複数の領域にまたがる場合、一つの専門知識だけでは十分な判断ができないことがある。例えば、新しい技術を社会に導入するかどうかは、技術的に可能かという問題だけでなく、費用、法律、倫理、人々の生活への影響なども考えなければならない。

だからといって、専門家の意見を一般の意見と同じように扱えばよいわけでもない。必要なのは、専門知識を尊重しながら、その知識がどの範囲まで有効なのかを理解することである。専門家を信頼することと、専門家に判断のすべてを任せることは同じではない。`
    },
    {
      type: "統合理解",
      title: "便利さと選択",
      text: `選択肢が多いことは、一般には自由が大きいことを意味する。自分の希望に近い商品やサービスを選べるからだ。一方で、選択肢が増えすぎると、一つひとつを比較するための時間や負担も増える。選ばなかった可能性が気になり、自分の決定に満足できなくなることさえある。

しかし、だからといって選択肢を減らせば常に人が幸せになるとは限らない。重要なのは数ではなく、必要な違いを理解できる形で提示されているかどうかである。十分な情報が整理されていれば、多くの選択肢は自由を広げる。逆に、違いが分からないまま大量の選択肢だけを示されれば、それは自由より負担として感じられるだろう。`
    },
    {
      type: "長文",
      title: "失敗を共有する意味",
      text: `組織では成功例が共有されやすい。成功した方法を学べば、同じ成果を再現できると考えられるからだ。しかし実際には、成功はその時の市場や人間関係、偶然など多くの条件に支えられている。そのため、表面的な方法だけをまねても同じ結果になるとは限らない。

一方、失敗には「どの条件ではうまくいかなかったか」という情報が含まれている。これは次の判断にとって非常に重要である。それにもかかわらず、失敗した人が強く非難される組織では、人は失敗を隠すようになる。その結果、別の人が同じ失敗を繰り返す。

もちろん、すべての失敗を肯定すればよいわけではない。不注意による失敗と、十分に検討したうえで挑戦した結果の失敗は区別する必要がある。失敗を共有する文化とは、責任をなくすことではなく、失敗から得られる情報を組織全体の知識へ変える仕組みなのである。`
    }
  ],

  N2: [
    {
      type: "長文",
      title: "働き方と休息",
      text: `仕事で良い結果を出すためには、長い時間働けばよいと思われがちだ。しかし、人の集中力には限界がある。疲れた状態で仕事を続けると、作業時間は長くなっても、間違いが増えたり判断が遅くなったりする。

休むことは仕事をしない時間ではあるが、仕事と無関係な時間とは限らない。十分に休むことで集中力が戻り、結果として短い時間で仕事を終えられることもある。

大切なのは、働いた時間だけで努力を判断しないことだ。必要な休息を取りながら成果を上げる方法を考えることも、仕事の能力の一つだと言える。`
    },
    {
      type: "主張理解",
      title: "インターネット上の情報",
      text: `インターネットを使えば、知りたいことをすぐに調べられる。しかし、情報を見つけることと、その情報を正しく理解することは同じではない。

検索結果の上に表示された情報が必ず正しいわけではなく、古い情報が残っている場合もある。また、自分が最初から信じたいと思っている意見ばかりを選んで読んでしまうこともある。

そのため、情報を利用するときには、誰が、いつ、どのような根拠で発信したのかを確認する習慣が必要である。便利な時代だからこそ、情報を選ぶ力が以前より重要になっている。`
    },
    {
      type: "情報検索",
      title: "地域センター利用案内",
      text: `地域センターの学習室は午前9時から午後8時まで利用できます。平日は予約不要ですが、土曜日・日曜日は利用日の3日前までに予約してください。1回の利用は最大3時間です。

会議室は4名以上のグループのみ利用でき、曜日に関係なく予約が必要です。飲食は1階休憩室では可能ですが、学習室と会議室では禁止されています。

なお、毎月第2火曜日は設備点検のため全館休館します。`
    },
    {
      type: "中文",
      title: "学ぶ方法",
      text: `新しいことを学ぶとき、最初からすべてを理解しようとすると、かえって続けにくくなることがある。分からない部分が多すぎて、自分にはできないと感じてしまうからだ。

まず全体を大まかに理解し、その後で必要な部分を何度も確認するほうが、結果的に深く理解できる場合がある。学習では、一度で完全に覚えることより、忘れた後にもう一度思い出す経験も重要なのである。`
    }
  ],

  N3: [
    {
      type: "中文",
      title: "新しい町での生活",
      text: `私は去年、仕事のために新しい町へ引っ越した。最初は知っている人が一人もいなかったので、休みの日も一人で過ごすことが多かった。しかし、近所のスポーツセンターに通い始めてから、少しずつ友達ができた。

以前は、新しい場所では自分から話しかけるのが苦手だった。しかし、同じスポーツが好きな人とは自然に話ができた。この経験から、友達を作ろうと頑張りすぎるより、自分の好きな活動に参加することも一つの方法だと思うようになった。`
    },
    {
      type: "情報検索",
      title: "図書館のお知らせ",
      text: `市立図書館は月曜日から土曜日まで午前9時から午後7時まで開いています。日曜日は午後5時に閉館します。毎月最後の月曜日は休館日です。

本は一人10冊まで、2週間借りることができます。DVDは2本までで、貸出期間は1週間です。返却が遅れている資料がある場合、新しい資料を借りることはできません。`
    },
    {
      type: "長文",
      title: "買い物の変化",
      text: `最近はインターネットで買い物をする人が増えている。店まで行かなくても商品を注文できるので、とても便利だ。特に忙しい人や近くに店がない人にとっては大きな助けになる。

しかし、服や靴などは実際に見たり試したりしないと分からないこともある。そのため、私は商品によってインターネットと店を使い分けるのがよいと思う。便利だからという理由だけで一つの方法に決める必要はない。`
    }
  ],

  N4: [
    {
      type: "中文",
      title: "田中さんの週末",
      text: `田中さんは先週の日曜日、友達と公園へ行く予定でした。しかし、朝から雨が降っていたので、公園へ行くのをやめました。

二人は駅の近くの映画館で映画を見ました。そのあと、新しくできたレストランで昼ご飯を食べました。田中さんは公園へ行けなかったのは残念でしたが、楽しい一日だったと言っています。`
    },
    {
      type: "情報検索",
      title: "店のお知らせ",
      text: `さくらスーパーは朝9時から夜9時まで営業しています。毎週水曜日は野菜が10％安くなります。土曜日は午後3時からパンが20％安くなります。

ただし、祝日の営業時間は朝10時から夜7時までです。`
    },
    {
      type: "中文",
      title: "日本語の勉強",
      text: `マリアさんは毎朝30分、日本語を勉強しています。前は夜に勉強していましたが、仕事のあとでは疲れてしまい、あまり集中できませんでした。

朝に変えてから、短い時間でも毎日勉強できるようになりました。最近は電車の中でも日本語の単語を復習しています。`
    }
  ],

  N5: [
    {
      type: "短文",
      title: "明日の予定",
      text: `あした、わたしは友だちと駅で会います。10時に会って、いっしょに映画を見ます。映画のあとで昼ごはんを食べます。`
    },
    {
      type: "情報検索",
      title: "店の時間",
      text: `パンやは朝8時に開きます。月曜日から金曜日は夜7時までです。土曜日は午後5時までです。日曜日は休みです。`
    },
    {
      type: "短文",
      title: "学校へ行く方法",
      text: `わたしは毎日電車で学校へ行きます。家から駅まで10分歩きます。駅から学校まで電車で20分です。`
    }
  ]
};

function hardReadingQuestions(level, item, index) {
  const qByLevel = {
    N1: [
      {
        jp: "筆者が最も言いたいことは何か。",
        choices: [
          "文章全体の主張を、理由との関係から判断する必要がある。",
          "文章に出てくる例だけを覚えることが重要である。",
          "最初の段落の内容だけが筆者の結論である。",
          "筆者は問題について明確な立場を示していない。"
        ],
        answer: 0
      },
      {
        jp: "本文の内容と最も合っているものはどれか。",
        choices: [
          "筆者は単純な賛成・反対ではなく、条件や目的を考える必要性を述べている。",
          "筆者は新しい変化をすべて否定している。",
          "筆者は個人の努力だけですべて解決できると考えている。",
          "筆者は具体例には意味がないと考えている。"
        ],
        answer: 0
      }
    ],
    N2: [
      {
        jp: "筆者がこの文章で伝えたいことは何か。",
        choices: [
          "表面的な便利さだけでなく、その使い方や条件も考えることが大切だ。",
          "新しい方法はできるだけ使わないほうがよい。",
          "昔の方法は必ず新しい方法より優れている。",
          "問題は時間がたてば自然に解決する。"
        ],
        answer: 0
      },
      {
        jp: "本文の内容と合っているものはどれか。",
        choices: [
          "状況に合わせて判断することが必要だ。",
          "一つの方法だけを使うべきだ。",
          "筆者は変化そのものに反対している。",
          "考えるより早く決めることが大切だ。"
        ],
        answer: 0
      }
    ],
    N3: [
      {
        jp: "この文章で一番言いたいことは何ですか。",
        choices: [
          "経験から考え方や方法が変わることがある。",
          "何をしても結果は同じである。",
          "新しいことはしないほうがいい。",
          "一人でいることが一番大切だ。"
        ],
        answer: 0
      },
      {
        jp: "文章の内容と合っているものはどれですか。",
        choices: [
          "状況に合わせて方法を選ぶことが大切だ。",
          "いつも同じ方法を使わなければならない。",
          "便利なものは使わないほうがいい。",
          "筆者は何も変えたくないと思っている。"
        ],
        answer: 0
      }
    ],
    N4: [
      {
        jp: "文章の内容と合っているものはどれですか。",
        choices: [
          "文章に書いてある予定や理由を正しく読む必要があります。",
          "書いていないことを考えて答えます。",
          "最初の文だけ読めば答えられます。",
          "時間や理由は大切ではありません。"
        ],
        answer: 0
      }
    ],
    N5: [
      {
        jp: "文章について、正しいものはどれですか。",
        choices: [
          "文章に書いてある時間や予定を確認します。",
          "文章にない予定を選びます。",
          "いつも日曜日の話です。",
          "時間は書いてありません。"
        ],
        answer: 0
      }
    ]
  };

  return qByLevel[level].map((q, qi) => ({
    question: {
      jp: q.jp,
      translation: { ja: q.jp, en: q.jp }
    },
    choices: q.choices.map((c) => ({
      jp: c,
      translation: { ja: c, en: c }
    })),
    answer: q.answer
  }));
}

function addHardReadingSets() {
  for (const level of ["N5", "N4", "N3", "N2", "N1"]) {
    if (!READING_SETS[level]) READING_SETS[level] = [];

    const bases = HARD_READING_TOPICS[level];

    for (let i = 0; i < 20; i++) {
      const base = bases[i % bases.length];
      const number = i + 1;

      READING_SETS[level].push({
        title: {
          ja: `${level} 発展読解 ${number}：${base.title}`,
          en: `${level} Advanced Reading ${number}`
        },
        qtype: base.type,
        passage: {
          jp: base.text,
          reading: "",
          translation: {
            ja: base.text,
            en: base.text
          }
        },
        questions: hardReadingQuestions(level, base, i)
      });
    }
  }
}

addHardReadingSets();

/* ===== HARD READING PLUS END ===== */


/* ===== JLPT FULL MODE START ===== */

const JLPT_SPEC = {
  N1:{sections:[["language","言語知識（文字・語彙・文法）・読解",110],["listening","聴解",55]],vocab:{"漢字読み":6,"文脈規定":7,"言い換え類義":6,"用法":6},grammar:{"文の文法1":10,"文の文法2":5,"文章の文法":5},reading:{"短文":4,"中文":9,"長文":4,"統合理解":3,"主張理解":4,"情報検索":2},listening:{"課題理解":5,"ポイント理解":6,"概要理解":5,"即時応答":11,"統合理解":3}},
  N2:{sections:[["language","言語知識（文字・語彙・文法）・読解",105],["listening","聴解",50]],vocab:{"漢字読み":5,"表記":5,"語形成":5,"文脈規定":7,"言い換え類義":5,"用法":5},grammar:{"文の文法1":12,"文の文法2":5,"文章の文法":5},reading:{"短文":5,"中文":9,"統合理解":2,"主張理解":3,"情報検索":2},listening:{"課題理解":5,"ポイント理解":6,"概要理解":5,"即時応答":12,"統合理解":4}},
  N3:{sections:[["vocab","言語知識（文字・語彙）",30],["grammarReading","言語知識（文法）・読解",70],["listening","聴解",40]],vocab:{"漢字読み":8,"表記":6,"文脈規定":11,"言い換え類義":5,"用法":5},grammar:{"文の文法1":13,"文の文法2":5,"文章の文法":5},reading:{"短文":4,"中文":6,"長文":4,"情報検索":2},listening:{"課題理解":6,"ポイント理解":6,"概要理解":3,"発話表現":4,"即時応答":9}},
  N4:{sections:[["vocab","言語知識（文字・語彙）",25],["grammarReading","言語知識（文法）・読解",55],["listening","聴解",35]],vocab:{"漢字読み":9,"表記":6,"文脈規定":10,"言い換え類義":5,"用法":5},grammar:{"文の文法1":15,"文の文法2":5,"文章の文法":5},reading:{"短文":4,"中文":4,"情報検索":2},listening:{"課題理解":8,"ポイント理解":7,"発話表現":5,"即時応答":8}},
  N5:{sections:[["vocab","言語知識（文字・語彙）",20],["grammarReading","言語知識（文法）・読解",40],["listening","聴解",30]],vocab:{"漢字読み":12,"表記":8,"文脈規定":10,"言い換え類義":5},grammar:{"文の文法1":16,"文の文法2":5,"文章の文法":5},reading:{"短文":3,"中文":2,"情報検索":1},listening:{"課題理解":7,"ポイント理解":6,"発話表現":5,"即時応答":6}},
};

const JLPT_GROUP_NO={
N1:{"漢字読み":1,"文脈規定":2,"言い換え類義":3,"用法":4,"文の文法1":5,"文の文法2":6,"文章の文法":7,"短文":8,"中文":9,"長文":10,"統合理解":11,"主張理解":12,"情報検索":13,"課題理解":1,"ポイント理解":2,"概要理解":3,"即時応答":4},
N2:{"漢字読み":1,"表記":2,"語形成":3,"文脈規定":4,"言い換え類義":5,"用法":6,"文の文法1":7,"文の文法2":8,"文章の文法":9,"短文":10,"中文":11,"統合理解":12,"主張理解":13,"情報検索":14,"課題理解":1,"ポイント理解":2,"概要理解":3,"即時応答":4},
N3:{"漢字読み":1,"表記":2,"文脈規定":3,"言い換え類義":4,"用法":5,"文の文法1":6,"文の文法2":7,"文章の文法":8,"短文":9,"中文":10,"長文":11,"情報検索":12,"課題理解":1,"ポイント理解":2,"概要理解":3,"発話表現":4,"即時応答":5},
N4:{"漢字読み":1,"表記":2,"文脈規定":3,"言い換え類義":4,"用法":5,"文の文法1":6,"文の文法2":7,"文章の文法":8,"短文":9,"中文":10,"情報検索":11,"課題理解":1,"ポイント理解":2,"発話表現":3,"即時応答":4},
N5:{"漢字読み":1,"表記":2,"文脈規定":3,"言い換え類義":4,"文の文法1":5,"文の文法2":6,"文章の文法":7,"短文":8,"中文":9,"情報検索":10,"課題理解":1,"ポイント理解":2,"発話表現":3,"即時応答":4}}
;

function jlptShuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function jlptPickChoices(pool,correct,keyFn,count=4){const ck=keyFn(correct);const rest=jlptShuffle(pool.filter(x=>keyFn(x)!==ck));const choices=jlptShuffle([correct,...rest.slice(0,Math.max(0,count-1))]);return {choices,answer:choices.findIndex(x=>keyFn(x)===ck)};}
function jlptSetSeed(level,examSet,type=""){const text=`${level}-${examSet}-${type}`;let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function jlptSeededShuffle(arr,seed){const a=[...arr];let x=seed||1;const rand=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function jlptSetCycle(pool,count,level,examSet,type){if(!pool.length||count<=0)return[];const shuffled=jlptSeededShuffle(pool,jlptSetSeed(level,examSet,type));return Array.from({length:count},(_,i)=>shuffled[i%shuffled.length]);}
function jlptExample(item){const list=Array.isArray(item?.examples)?item.examples:[];const hit=list.find(e=>{const t=e?.ja||e?.jp||"";return t&&item?.jp&&t.includes(item.jp)});return hit?.ja||hit?.jp||"";}
function jlptGroup(level,type){return JLPT_GROUP_NO[level]?.[type]??"";}
function jlptMeaningEn(item){const m=item?.meaning;return typeof m==='string'?m:(m?.en||'');}
function jlptTokens(item){return jlptMeaningEn(item).toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(x=>x.length>2&&!['the','and','for','with','from','into','that','this','one','use','used','make','very'].includes(x));}
function jlptSimilarity(a,b){const A=new Set(jlptTokens(a)),B=new Set(jlptTokens(b));if(!A.size||!B.size)return 0;let n=0;A.forEach(x=>{if(B.has(x))n++});return n/Math.max(A.size,B.size);}
function jlptSynonymSet(pool,item,level,examSet){const ranked=pool.filter(x=>x.jp!==item.jp).map(x=>({x,score:jlptSimilarity(item,x)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);const correct=ranked[0]?.x;if(!correct)return null;const distractors=jlptSeededShuffle(pool.filter(x=>x.jp!==item.jp&&x.jp!==correct.jp&&jlptSimilarity(item,x)===0),jlptSetSeed(level,examSet,`syn-${item.jp}`)).slice(0,3);if(distractors.length<3)return null;const choices=jlptSeededShuffle([correct,...distractors],jlptSetSeed(level,examSet,`syn-order-${item.jp}`));return{choices,answer:choices.findIndex(x=>x.jp===correct.jp)};}

function buildJLPTVocabQuestions(level,examSet=1){
 const spec=JLPT_SPEC[level].vocab;const pool=(VOCAB[level]||[]).filter(x=>x?.jp&&x?.reading);const withEx=pool.filter(x=>jlptExample(x));const out=[];
 Object.entries(spec).forEach(([type,count])=>{const source=(type==='文脈規定'||type==='用法')&&withEx.length?withEx:pool;jlptSetCycle(source,count,level,examSet,`vocab-${type}`).forEach(item=>{const groupNo=jlptGroup(level,type);
  if(type==='漢字読み'){const p=jlptPickChoices(pool,item,x=>x.reading);out.push({kind:'vocab',type,groupNo,instruction:'次の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',prompt:item.jp,choices:p.choices.map(x=>x.reading),answer:p.answer});return;}
  if(type==='表記'){const p=jlptPickChoices(pool,item,x=>x.jp);out.push({kind:'vocab',type,groupNo,instruction:'次の言葉を漢字で書くとき、最もよいものを、1・2・3・4から一つ選びなさい。',prompt:item.reading,choices:p.choices.map(x=>x.jp),answer:p.answer});return;}
  if(type==='語形成'){const p=jlptPickChoices(pool,item,x=>x.jp);out.push({kind:'vocab',type,groupNo,instruction:'（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',prompt:`（　）${item.jp}`,choices:p.choices.map(x=>x.jp),answer:p.answer});return;}
  if(type==='文脈規定'){const ex=jlptExample(item);const p=jlptPickChoices(pool,item,x=>x.jp);out.push({kind:'vocab',type,groupNo,instruction:'（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',prompt:ex?ex.replace(item.jp,'（　）'):`（　）に入る最も自然な言葉を選びなさい。`,choices:p.choices.map(x=>x.jp),answer:p.answer});return;}
  if(type==='言い換え類義'){const syn=jlptSynonymSet(pool,item,level,examSet);if(!syn)return;out.push({kind:'vocab',type,groupNo,instruction:'次の文の下線の言葉と意味が最も近いものを、1・2・3・4から一つ選びなさい。',prompt:jlptExample(item)||item.jp,sub:`【${item.jp}】`,choices:syn.choices.map(x=>x.jp),answer:syn.answer});return;}
  if(type==='用法'){const correct=jlptExample(item);if(!correct)return;const others=jlptSeededShuffle(withEx.filter(x=>x.jp!==item.jp),jlptSetSeed(level,examSet,`usage-${item.jp}`)).slice(0,3);if(others.length<3)return;const wrong=others.map(x=>{const t=jlptExample(x);return t.includes(x.jp)?t.replace(x.jp,item.jp):t});const choices=jlptSeededShuffle([correct,...wrong],jlptSetSeed(level,examSet,`usage-order-${item.jp}`));out.push({kind:'vocab',type,groupNo,instruction:'次の言葉の使い方として最もよいものを、1・2・3・4から一つ選びなさい。',prompt:item.jp,choices,answer:choices.indexOf(correct)});}
 })});return out;}

function buildJLPTGrammarQuestions(level,examSet=1){const spec=JLPT_SPEC[level].grammar;const pool=(GRAMMAR[level]||[]).filter(x=>x?.pattern);const out=[];Object.entries(spec).forEach(([type,count])=>{jlptSetCycle(pool,count,level,examSet,`grammar-${type}`).forEach(item=>{const p=jlptPickChoices(pool,item,x=>x.pattern);const groupNo=jlptGroup(level,type);if(type==='文の文法1'){out.push({kind:'grammar',type,groupNo,instruction:'次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',prompt:item.blank||'（　）に入る最もよいものを選びなさい。',choices:p.choices.map(x=>x.pattern),answer:p.answer});return;}if(type==='文の文法2'){out.push({kind:'grammar',type,groupNo,instruction:'次の文の ★ に入る最もよいものを、1・2・3・4から一つ選びなさい。',prompt:item.blank||'＿＿＿　＿＿＿　★　＿＿＿',sub:'文全体が自然な順序になるように考えてください。',choices:p.choices.map(x=>x.pattern),answer:p.answer});return;}const correct=item.example?.jp||item.blank||item.pattern;const wrong=p.choices.filter(x=>x.pattern!==item.pattern).slice(0,3).map(x=>item.pattern&&correct.includes(item.pattern)?correct.replace(item.pattern,x.pattern):`${x.pattern}　${correct}`);const choices=jlptSeededShuffle([correct,...wrong],jlptSetSeed(level,examSet,`gp-${item.pattern}`));out.push({kind:'grammar',type,groupNo,instruction:'次の文章を読んで、文章全体の内容を考えて、（　）に入る最もよいものを一つ選びなさい。',prompt:item.blank||correct,choices,answer:choices.indexOf(correct)});})});return out;}

function flattenComprehension(data,level){return (data[level]||[]).flatMap(entry=>(entry?.questions||[]).map(q=>({entry,q})));}
function jlptTypeMatch(entry,type){const raw=String(entry?.jlptType||entry?.qtype||entry?.type||'');const aliases={"短文":["短文"],"中文":["中文","中"],"長文":["長文","長"],"統合理解":["統合理解","統合"],"主張理解":["主張理解","主張"],"情報検索":["情報検索","情報"],"課題理解":["課題理解"],"ポイント理解":["ポイント理解","要点理解"],"概要理解":["概要理解"],"発話表現":["発話表現"],"即時応答":["即時応答"]};return (aliases[type]||[type]).some(x=>raw.includes(x));}
function buildJLPTReadingQuestions(level,examSet=1){const spec=JLPT_SPEC[level].reading;const entries=(READING_SETS[level]||[]).flat().filter(Boolean);const out=[];Object.entries(spec).forEach(([type,count])=>{const typed=entries.filter(e=>jlptTypeMatch(e,type));const source=typed.length?typed:entries;const base=source.flatMap(entry=>(entry?.questions||[]).map(q=>({entry,q})));jlptSetCycle(base,count,level,examSet,`reading-${type}`).forEach(({entry,q})=>out.push({kind:'reading',type,groupNo:jlptGroup(level,type),instruction:type==='情報検索'?'右の資料を見て、下の問いに対する答えとして最もよいものを一つ選びなさい。':'次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。',passage:entry?.passage?.jp||'',prompt:q?.question?.jp||'本文の内容に合うものを選びなさい。',choices:(q?.choices||[]).map(c=>c?.jp??c),answer:q?.answer??0}));});return out;}
function buildJLPTListeningQuestions(level,examSet=1){const spec=JLPT_SPEC[level].listening;const entries=[...((LISTENING_SETS[level]||[]).flat().filter(Boolean)),...((JLPT_LISTENING_EXTRA?.[level]||[]).flat().filter(Boolean))];const out=[];Object.entries(spec).forEach(([type,count])=>{const typed=entries.filter(e=>jlptTypeMatch(e,type));const source=typed.length?typed:entries;const base=source.flatMap(entry=>(entry?.questions||[]).map(q=>({entry,q})));jlptSetCycle(base,count,level,examSet,`listening-${type}`).forEach(({entry,q})=>out.push({kind:'listening',type,groupNo:jlptGroup(level,type),instruction:'まず質問を聞いてください。それから話を聞いて、最もよい答えを一つ選びなさい。',audio:entry?.passage?.jp||'',prompt:q?.question?.jp||'音声を聞いて答えなさい。',choices:(q?.choices||[]).map(c=>c?.jp??c),answer:q?.answer??0}));});return out;}
function buildJLPTSectionQuestions(level,key,examSet=1){const vocab=buildJLPTVocabQuestions(level,examSet),grammar=buildJLPTGrammarQuestions(level,examSet),reading=buildJLPTReadingQuestions(level,examSet),listening=buildJLPTListeningQuestions(level,examSet);if(key==='vocab')return vocab;if(key==='grammarReading')return[...grammar,...reading];if(key==='language')return[...vocab,...grammar,...reading];if(key==='listening')return listening;return[];}

function JLPTQuestionCard({ q, selected, onSelect }) {
  const isListening = q.kind === "listening";
  return (
    <div className="bg-white border border-[#26374d]/20 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#26374d]/15 bg-[#f8f5ed]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded bg-[#26374d] text-white font-bold">問題 {q.groupNo || ""}</span>
          <span className="font-bold text-[#26374d]">{q.type}</span>
        </div>
        {q.instruction && <p className="mt-3 text-sm leading-7 text-[#26374d]">{q.instruction}</p>}
      </div>
      <div className="p-5 md:p-7 space-y-5">
        {q.passage && <div className="border-y border-[#26374d]/20 py-5 whitespace-pre-wrap leading-9 text-[17px]" style={{ fontFamily: "'Noto Serif JP', serif" }}>{q.passage}</div>}
        {isListening && q.audio && <div className="flex items-center gap-3 border border-[#26374d]/15 rounded-xl p-4"><SoundBtn text={q.audio} size={22}/><span className="text-sm font-semibold">音声を聞く</span><span className="text-xs text-[#26374d]/45">スクリプトは表示しません</span></div>}
        <div className="whitespace-pre-wrap text-lg leading-8 font-semibold" style={{ fontFamily: "'Noto Serif JP', serif" }}>{q.prompt}</div>
        {q.sub && <div className="whitespace-pre-wrap text-sm leading-7 text-[#26374d]/70">{q.sub}</div>}
        <div className="space-y-2">{(q.choices||[]).map((choice,idx)=><button key={idx} type="button" onClick={()=>onSelect(idx)} className={`w-full flex items-start gap-4 text-left px-4 py-3 border rounded-lg transition-colors ${selected===idx?"border-[#26374d] bg-[#26374d]/10":"border-transparent hover:bg-[#26374d]/5"}`}><span className="font-bold shrink-0">{idx+1}</span><span className="leading-7" style={{ fontFamily: "'Noto Serif JP', serif" }}>{choice}</span></button>)}</div>
      </div>
    </div>
  );
}

function JLPTSectionExam({ level, examSet, section, onFinish, onExit }) {
  const [questions] = useState(() =>
    buildJLPTSectionQuestions(level, section.key, examSet)
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(section.minutes * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (seconds === 0 && questions.length) {
      const score = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
      onFinish({ key: section.key, label: section.label, score, total: questions.length, answers, questions, timedOut: true });
    }
  }, [seconds]); // eslint-disable-line

  if (!questions.length) return <div className="rounded-2xl bg-white/70 p-5">この科目の問題データがありません。</div>;

  const q = questions[index];
  const selected = answers[index];
  const done = Object.keys(answers).length;
  const finish = () => {
    const score = questions.reduce((n, item, i) => n + (answers[i] === item.answer ? 1 : 0), 0);
    onFinish({ key: section.key, label: section.label, score, total: questions.length, answers, questions, timedOut: false });
  };
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-20 bg-[#f4efe2]/95 backdrop-blur py-3 border-b border-[#26374d]/10 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div><div className="text-xs text-[#26374d]/45">{level} JLPT 模擬試験・第{examSet}回</div><div className="font-bold">{section.label}</div></div>
          <div className={`font-mono text-xl font-bold ${seconds <= 300 ? "text-[#b3452c]" : ""}`}>{mm}:{ss}</div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#26374d]/55"><span>問題 {index + 1} / {questions.length}</span><span>回答済み {done} / {questions.length}</span></div>
        <div className="h-2 rounded-full bg-[#26374d]/10 overflow-hidden"><div className="h-full bg-[#26374d]" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      </div>

      <JLPTQuestionCard q={q} selected={selected} onSelect={(choice) => setAnswers((a) => ({ ...a, [index]: choice }))} />

      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}
          className="px-4 py-2.5 rounded-xl border-2 border-[#26374d]/20 font-semibold disabled:opacity-30">前へ</button>
        <div className="flex gap-2">
          <button type="button" onClick={onExit} className="px-4 py-2.5 rounded-xl border-2 border-[#b3452c]/25 text-[#b3452c] font-semibold">中断</button>
          {index < questions.length - 1 ? (
            <button type="button" onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#26374d] text-white font-bold">次へ</button>
          ) : (
            <button type="button" onClick={finish} className="px-5 py-2.5 rounded-xl bg-[#26374d] text-white font-bold">この科目を終了</button>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white/60 border border-[#26374d]/10 p-3">
        <div className="text-xs font-semibold mb-2">問題一覧</div>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => <button key={i} onClick={() => setIndex(i)} className={`w-8 h-8 rounded-lg text-xs font-bold border ${i === index ? "bg-[#26374d] text-white border-[#26374d]" : answers[i] !== undefined ? "bg-[#3d6b4f]/15 border-[#3d6b4f]/30" : "bg-white border-[#26374d]/15"}`}>{i + 1}</button>)}
        </div>
      </div>
    </div>
  );
}

function JLPTResult({ level, examSet, results, onRestart }) {
  const total = results.reduce((n, r) => n + r.total, 0);
  const score = results.reduce((n, r) => n + r.score, 0);
  const pct = total ? Math.round((score / total) * 100) : 0;
  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-[#26374d] text-white p-7 text-center">
        <div className="text-sm opacity-70">{level} 模擬試験・第{examSet}回 結果</div>
        <div className="text-5xl font-bold mt-2">{score} / {total}</div>
        <div className="text-lg mt-2">正答率 {pct}%</div>
      </div>
      <div className="grid gap-3">
        {results.map((r) => <div key={r.key} className="rounded-2xl bg-white/80 border border-[#26374d]/15 p-4 flex justify-between gap-4"><div><div className="font-bold">{r.label}</div>{r.timedOut && <div className="text-xs text-[#b3452c]">時間切れ</div>}</div><div className="font-bold">{r.score} / {r.total}</div></div>)}
      </div>
      <button onClick={onRestart} className="w-full px-5 py-3 rounded-xl bg-[#26374d] text-white font-bold">もう一度受ける</button>
      <div className="text-xs text-[#26374d]/45 leading-5">※ このアプリの模擬問題は学習用のオリジナル問題です。公式JLPTの問題そのものではありません。</div>
    </div>
  );
}

function JLPTMockTestView({ level }) {
  const spec = JLPT_SPEC[level];
  const [examSet, setExamSet] = useState(1);
  const [active, setActive] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setExamSet(1);
    setActive(null);
    setResults([]);
  }, [level]);

  const chooseExamSet = (nextSet) => {
    if (nextSet === examSet) return;

    setExamSet(nextSet);
    setActive(null);
    setResults([]);
  };

  const completed = new Set(results.map((r) => r.key));
  const allDone = results.length === spec.sections.length;
  if (allDone) {
    return (
      <JLPTResult
        level={level}
        examSet={examSet}
        results={results}
        onRestart={() => setResults([])}
      />
    );
  }

  if (active) {
    return <JLPTSectionExam level={level} examSet={examSet} section={active}
      onExit={() => setActive(null)}
      onFinish={(result) => { setResults((prev) => [...prev.filter((x) => x.key !== result.key), result]); setActive(null); }} />;
  }

  const totalQuestions = Object.values(spec.vocab).reduce((a,b)=>a+b,0) + Object.values(spec.grammar).reduce((a,b)=>a+b,0) + Object.values(spec.reading).reduce((a,b)=>a+b,0) + Object.values(spec.listening).reduce((a,b)=>a+b,0);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#26374d] text-white p-7">
        <div className="text-sm opacity-70">JLPT 本番練習</div>
        <div className="text-3xl font-bold mt-1">{level} 模擬試験・第{examSet}回</div>
        <p className="text-sm opacity-80 mt-3">レベル別の科目・時間・問題タイプで、途中に正解を表示せず最後にまとめて採点します。</p>
        <div className="mt-4 text-sm font-semibold">全 {totalQuestions} 問</div>
      </div>

      <div className="rounded-2xl bg-white/80 border border-[#26374d]/15 p-5">
        <div className="font-bold mb-3">模擬試験を選ぶ</div>

        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => chooseExamSet(n)}
              className={`px-3 py-3 rounded-xl border-2 font-bold transition-colors ${
                examSet === n
                  ? "bg-[#26374d] text-white border-[#26374d]"
                  : "bg-[#f4efe2] border-[#26374d]/15 hover:border-[#26374d]/35"
              }`}
            >
              第{n}回
            </button>
          ))}
        </div>

        <div className="text-xs text-[#26374d]/50 mt-3">
          第1回〜第5回は、それぞれ別の問題セットです。
        </div>
      </div>

      <div className="grid gap-4">
        {spec.sections.map(([key, label, minutes], idx) => {
          const done = completed.has(key);
          return <div key={key} className="rounded-2xl bg-white/80 border border-[#26374d]/15 p-5 flex items-center justify-between gap-4">
            <div><div className="text-xs text-[#26374d]/45">第 {idx + 1} 科目</div><div className="font-bold text-lg mt-1">{label}</div><div className="text-sm text-[#26374d]/60 mt-1">制限時間 {minutes} 分</div>{done && <div className="text-sm text-[#3d6b4f] font-bold mt-1">完了 ✓</div>}</div>
            <button onClick={() => setActive({ key, label, minutes })} className="shrink-0 px-4 py-2.5 rounded-xl bg-[#26374d] text-white font-bold">{done ? "もう一度" : "開始"}</button>
          </div>;
        })}
      </div>

      <div className="rounded-2xl bg-white/70 border border-[#26374d]/15 p-5 space-y-4">
        <div><div className="font-bold">文字・語彙</div><div className="flex flex-wrap gap-2 mt-2">{Object.entries(spec.vocab).map(([k,v]) => <span key={k} className="px-3 py-1.5 rounded-full bg-[#26374d]/5 border border-[#26374d]/15 text-xs font-semibold">{k} {v}問</span>)}</div></div>
        <div><div className="font-bold">文法</div><div className="flex flex-wrap gap-2 mt-2">{Object.entries(spec.grammar).map(([k,v]) => <span key={k} className="px-3 py-1.5 rounded-full bg-[#26374d]/5 border border-[#26374d]/15 text-xs font-semibold">{k} {v}問</span>)}</div></div>
        <div><div className="font-bold">読解</div><div className="flex flex-wrap gap-2 mt-2">{Object.entries(spec.reading).map(([k,v]) => <span key={k} className="px-3 py-1.5 rounded-full bg-[#26374d]/5 border border-[#26374d]/15 text-xs font-semibold">{k} {v}問</span>)}</div></div>
        <div><div className="font-bold">聴解</div><div className="flex flex-wrap gap-2 mt-2">{Object.entries(spec.listening).map(([k,v]) => <span key={k} className="px-3 py-1.5 rounded-full bg-[#26374d]/5 border border-[#26374d]/15 text-xs font-semibold">{k} {v}問</span>)}</div></div>
      </div>
    </div>
  );
}

/* ===== JLPT FULL MODE END ===== */


/* ============================= APP ============================= */
export default function App() {
  // ===== Added study data: kanji / vocabulary / grammar =====
  const [, refreshAddedKanji] = useState(0);
  const [, refreshAddedVocab] = useState(0);
  const [, refreshAddedGrammar] = useState(0);

  useEffect(() => {
    let active = true;

    extendKanjiTo2136(KANJI)
      .then(({ total }) => {
        if (!active) return;
        console.log(`漢字総数: ${total}`);
        refreshAddedKanji((v) => v + 1);
      })
      .catch((err) => console.error("常用漢字の追加に失敗しました:", err));

    extendVocabWithOpenJLPT(VOCAB)
      .then(({ total, summary }) => {
        if (!active) return;
        console.log("単語追加結果:", summary);
        console.log(`単語総数: ${total}`);
        refreshAddedVocab((v) => v + 1);
      })
      .catch((err) => console.error("単語データの追加に失敗しました:", err));

    extendGrammarToAbout900(GRAMMAR)
      .then(({ total, added, summary }) => {
        if (!active) return;
        console.log("文法レベル別:", summary);
        console.log(`今回追加した文法: ${added}`);
        console.log(`文法総数: ${total}`);
        refreshAddedGrammar((v) => v + 1);
      })
      .catch((err) => console.error("文法データの追加に失敗しました:", err));

    return () => {
      active = false;
    };
  }, []);

  const [uiLang, setUiLang] = useState(() => {
    const saved = localStorage.getItem("nihongo-ui-language");
    return LANGS.includes(saved) ? saved : "ja";
  });

  useEffect(() => {
    localStorage.setItem("nihongo-ui-language", uiLang);
    document.documentElement.lang =
      uiLang === "zh"
        ? "zh-CN"
        : uiLang === "ptBR"
          ? "pt-BR"
          : uiLang;
  }, [uiLang]);
  const [level, setLevel] = useState("N5");
  const [category, setCategory] = useState("moji");
  const [mode, setMode] = useState("list");
  const t = UI[uiLang] || UI.en;

  const categories = [
    { value: "moji", label: t.moji },
    { value: "vocab", label: t.vocab },
    { value: "kanji", label: t.kanji },
    { value: "grammar", label: t.grammar },
    { value: "conversation", label: t.conversation },
    { value: "reading", label: t.reading2 },
    { value: "listening", label: t.listening },
    { value: "jlptmock", label: "JLPT模試" },
    { value: "wordlink", label: t.wordLink },
    { value: "kanachain", label: "かなチェーン" },
    { value: "quest", label: t.questTitle },
  ];
  const noModeCategories = ["conversation", "reading", "listening", "jlptmock", "wordlink", "kanachain", "quest"];
  const modeLabels = { list: t.list, flashcard: t.flashcard, quiz: t.quiz, game: t.game, write: t.write };
  const modeConfig = {
    vocab: ["list", "flashcard", "quiz", "game"],
    kanji: ["list", "flashcard", "quiz", "game", "write"],
    grammar: ["list", "flashcard", "quiz"],
    moji: ["list", "flashcard", "quiz"],
  };
  const validModes = modeConfig[category] || ["list", "flashcard", "quiz"];
  const modes = noModeCategories.includes(category) ? [] : validModes.map((v) => ({ value: v, label: modeLabels[v] }));

  useEffect(() => {
    if (noModeCategories.includes(category)) { setMode(category); return; }
    if (!validModes.includes(mode)) setMode("list");
  }, [category]); // eslint-disable-line

  const items = category === "vocab" ? VOCAB[level] : category === "kanji" ? KANJI[level] : category === "grammar" ? GRAMMAR[level] : [];

  return (
    <div className="min-h-screen w-full" style={{ background: "#f4efe2", color: "#26374d" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;700&family=Noto+Sans:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+Myanmar:wght@400;600&display=swap');
        * { font-family: 'Noto Sans', 'Noto Sans JP', 'Noto Sans Devanagari', 'Noto Sans Myanmar', sans-serif; }
        @keyframes linkPop { 0% { transform: scale(1); } 40% { transform: scale(1.18); } 100% { transform: scale(1); } }
        @keyframes linkShake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
        @keyframes linkSpark { 0% { transform: translateY(0) scale(0.6); opacity: 1; } 100% { transform: translateY(-28px) scale(1.2); opacity: 0; } }
        @keyframes chainDraw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
        .link-pop { animation: linkPop 0.4s ease; }
        .link-shake { animation: linkShake 0.4s ease; }
        .link-spark { animation: linkSpark 0.7s ease-out forwards; }
      `}</style>

      <header className="px-5 pt-6 pb-4 max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Noto Serif JP', serif" }}>{t.appTitle}</h1>
            <p className="text-sm text-[#26374d]/60 mt-0.5">{t.sub}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/70 rounded-full border border-[#26374d]/15 px-2 py-1 shrink-0">
            <Languages size={16} className="text-[#26374d]/60" />
            <select value={uiLang} onChange={(e) => setUiLang(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none">
              {LANGS.map((l) => <option key={l} value={l}>{LANG_NAMES[l]}</option>)}
            </select>
          </div>
        </div>
      </header>

      <main className="px-5 pb-16 max-w-3xl mx-auto space-y-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wide text-[#26374d]/50 font-semibold">{t.level}</span>
          <Segmented value={level} onChange={setLevel} options={LEVELS.map((l) => ({ value: l, label: l }))} />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wide text-[#26374d]/50 font-semibold">{t.category}</span>
          <Segmented value={category} onChange={setCategory} options={categories} />
        </div>

        {modes.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wide text-[#26374d]/50 font-semibold">{t.mode}</span>
            <Segmented value={mode} onChange={setMode} options={modes} />
          </div>
        )}

        <div className="pt-2">
          {category === "moji" && <MojiView t={t} mode={mode} />}
          {(category === "vocab" || category === "kanji") && mode === "list" && (
            <ItemListView items={items} uiLang={uiLang} t={t} />
          )}
          {(category === "vocab" || category === "kanji") && mode === "flashcard" && (
            <ItemFlashcards items={items} uiLang={uiLang === "ja" ? "en" : uiLang} t={t} />
          )}
          {(category === "vocab" || category === "kanji") && mode === "quiz" && (
            <ItemQuiz items={items} uiLang={uiLang} t={t} />
          )}
          {(category === "vocab" || category === "kanji") && mode === "game" && (
            <MatchGame items={items} uiLang={uiLang} t={t} />
          )}
          {category === "kanji" && mode === "write" && (
            <KanjiWritePractice items={items} uiLang={uiLang} t={t} />
          )}
          {category === "grammar" && mode === "list" && <GrammarListView items={items} uiLang={uiLang} t={t} />}
          {category === "grammar" && mode === "flashcard" && <GrammarFlashcards items={items} uiLang={uiLang} t={t} />}
          {category === "grammar" && mode === "quiz" && <GrammarQuiz items={items} uiLang={uiLang} t={t} />}
          {category === "conversation" && <ConversationView level={level} uiLang={uiLang} t={t} />}
          {category === "reading" && <ComprehensionView data={READING_SETS} level={level} uiLang={uiLang} t={t} isListening={false} />}
          {category === "listening" && <ComprehensionView data={LISTENING_SETS} level={level} uiLang={uiLang} t={t} isListening={true} />}
          {category === "jlptmock" && <JLPTMockTestView level={level} />}
          {category === "wordlink" && <WordLinkGame key={level} level={level} uiLang={uiLang} t={t} />}
          {category === "kanachain" && <KanaChainGame key={level} level={level} />}
          {category === "quest" && <KanjiQuestGame t={t} />}
        </div>
      </main>

      <footer className="text-center text-xs text-[#26374d]/40 pb-8 flex items-center justify-center gap-1">
        <BookOpen size={12} /> {t.appTitle}
      </footer>
    </div>
  );
}