import React from "react";

const reducefn =
  (n: number) =>
  (acc: string[][], _word: string, i: number, words: string[]) => {
    if (i % n === 0) {
      return acc.concat([words.slice(i, i + n)]);
    }
    return acc;
  };

const mapfn = (x: number) => (line: string[], i: number) => {
  const tprops: {
    key: string;
    x: number;
    dy?: number;
  } = {
    key: `word-${i}`,
    x: x,
  };
  if (i > 0) {
    tprops.dy = 5;
  }
  return <tspan {...tprops}>{line.join(" ")}</tspan>;
};

export const TextSpan = ({ x, y, style, text, wordsPerLine }: BubbleProps) => {
  const spans = text
    .split(" ")
    .filter((w) => {
      return !(/\s/.test(w) || w.length < 1);
    })
    .reduce(reducefn(wordsPerLine), [])
    .map(mapfn(x));

  const adjustY = spans.length > 1 ? y - spans.length * 1.5 : y;

  return (
    <text style={style} y={adjustY} textAnchor="middle">
      {spans}
    </text>
  );
};
