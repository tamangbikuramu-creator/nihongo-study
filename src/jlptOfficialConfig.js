export const JLPT_OFFICIAL_CONFIG = {
  N1: {
    sections: [["language","言語知識（文字・語彙・文法）・読解",110],["listening","聴解",55]],
    vocab: [{name:"漢字読み",count:6},{name:"文脈規定",count:7},{name:"言い換え類義",count:6},{name:"用法",count:6}],
    grammar: [{name:"文の文法1（文法形式の判断）",count:10},{name:"文の文法2（文の組み立て）",count:5},{name:"文章の文法",count:5}],
    reading: [{name:"短文",count:4},{name:"中文",count:9},{name:"長文",count:4},{name:"統合理解",count:3},{name:"主張理解（長文）",count:4},{name:"情報検索",count:2}],
    listening: [{name:"課題理解",count:6},{name:"ポイント理解",count:7},{name:"概要理解",count:6},{name:"即時応答",count:14},{name:"統合理解",count:4}],
  },
  N2: {
    sections: [["language","言語知識（文字・語彙・文法）・読解",105],["listening","聴解",50]],
    vocab: [{name:"漢字読み",count:5},{name:"表記",count:5},{name:"語形成",count:5},{name:"文脈規定",count:7},{name:"言い換え類義",count:5},{name:"用法",count:5}],
    grammar: [{name:"文の文法1（文法形式の判断）",count:12},{name:"文の文法2（文の組み立て）",count:5},{name:"文章の文法",count:5}],
    reading: [{name:"短文",count:5},{name:"中文",count:9},{name:"統合理解",count:2},{name:"主張理解（長文）",count:3},{name:"情報検索",count:2}],
    listening: [{name:"課題理解",count:5},{name:"ポイント理解",count:6},{name:"概要理解",count:5},{name:"即時応答",count:12},{name:"統合理解",count:4}],
  },
  N3: {
    sections: [["vocab","言語知識（文字・語彙）",30],["grammarReading","言語知識（文法）・読解",70],["listening","聴解",40]],
    vocab: [{name:"漢字読み",count:8},{name:"表記",count:6},{name:"文脈規定",count:11},{name:"言い換え類義",count:5},{name:"用法",count:5}],
    grammar: [{name:"文の文法1（文法形式の判断）",count:13},{name:"文の文法2（文の組み立て）",count:5},{name:"文章の文法",count:5}],
    reading: [{name:"短文",count:4},{name:"中文",count:6},{name:"長文",count:4},{name:"情報検索",count:2}],
    listening: [{name:"課題理解",count:6},{name:"ポイント理解",count:6},{name:"概要理解",count:3},{name:"発話表現",count:4},{name:"即時応答",count:9}],
  },
  N4: {
    sections: [["vocab","言語知識（文字・語彙）",25],["grammarReading","言語知識（文法）・読解",55],["listening","聴解",35]],
    vocab: [{name:"漢字読み",count:9},{name:"表記",count:6},{name:"文脈規定",count:10},{name:"言い換え類義",count:5},{name:"用法",count:5}],
    grammar: [{name:"文の文法1（文法形式の判断）",count:15},{name:"文の文法2（文の組み立て）",count:5},{name:"文章の文法",count:5}],
    reading: [{name:"短文",count:4},{name:"中文",count:4},{name:"情報検索",count:2}],
    listening: [{name:"課題理解",count:8},{name:"ポイント理解",count:7},{name:"発話表現",count:5},{name:"即時応答",count:8}],
  },
  N5: {
    sections: [["vocab","言語知識（文字・語彙）",20],["grammarReading","言語知識（文法）・読解",40],["listening","聴解",30]],
    vocab: [{name:"漢字読み",count:12},{name:"表記",count:8},{name:"文脈規定",count:10},{name:"言い換え類義",count:5}],
    grammar: [{name:"文の文法1（文法形式の判断）",count:16},{name:"文の文法2（文の組み立て）",count:5},{name:"文章の文法",count:5}],
    reading: [{name:"短文",count:3},{name:"中文",count:2},{name:"情報検索",count:1}],
    listening: [{name:"課題理解",count:7},{name:"ポイント理解",count:6},{name:"発話表現",count:5},{name:"即時応答",count:6}],
  },
};

export const jlptNames = (items = []) => items.map(x => typeof x === "string" ? x : x.name);
export const jlptCount = (items = []) => items.reduce((n, x) => n + (typeof x === "string" ? 0 : (x.count || 0)), 0);
