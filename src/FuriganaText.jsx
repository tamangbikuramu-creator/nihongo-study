import React from "react";
import { EXAMPLE_FURIGANA } from "./vocab-example-furigana.generated.js";

function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ruby(base, reading) {
  if (!base || !reading) return escapeHtml(base || "");

  return `<ruby><rb>${escapeHtml(base)}</rb><rt>${escapeHtml(
    reading
  )}</rt></ruby>`;
}

function makeFallbackRuby(text, word, reading) {
  if (!text || !word) return null;

  const w = escapeHtml(word);
  const wr = ruby(word, reading);

  // 「○○」という言葉を勉強しています。
  const pattern1 = `「${word}」という言葉を勉強しています。`;

  if (text === pattern1) {
    return (
      `「${wr}」という` +
      `<ruby><rb>言葉</rb><rt>ことば</rt></ruby>を` +
      `<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>しています。`
    );
  }

  // 「○○」の意味と使い方を確認しましょう。
  const pattern2 = `「${word}」の意味と使い方を確認しましょう。`;

  if (text === pattern2) {
    return (
      `「${wr}」の` +
      `<ruby><rb>意味</rb><rt>いみ</rt></ruby>と` +
      `<ruby><rb>使</rb><rt>つか</rt></ruby>い` +
      `<ruby><rb>方</rb><rt>かた</rt></ruby>を` +
      `<ruby><rb>確認</rb><rt>かくにん</rt></ruby>しましょう。`
    );
  }

  return null;
}

export default function FuriganaText({
  text = "",
  word = "",
  reading = "",
  className = "",
}) {
  // ① 事前生成済みルビ
  const saved = EXAMPLE_FURIGANA?.[text];

  // ② アプリが作る補助例文
  const fallback = makeFallbackRuby(text, word, reading);

  // ③ どちらも無ければ元文章
  const html =
    saved ||
    fallback ||
    escapeHtml(text);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
