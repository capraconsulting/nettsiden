export const shuffle = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array as T[];
};

export const randomInRange = (low: number, high: number) => {
  return Math.floor(Math.random() * (high - low + 1) + low);
};

export const createBubbles = (w: number, h: number, length: number) => {
  const x = (h * h) / length;

  if (length === 0 || x === 0) {
    return [];
  }

  const dim = Math.sqrt(x);
  const cols = Math.floor(w / dim);
  const offset = Math.round((w - dim * cols) / 2); // rest of w
  const rows = Math.ceil(h / dim);
  const bubbles = [...Array(rows).keys()]
    .map((i) => {
      return [...Array(cols).keys()].map((j) => {
        return {
          width: Math.round(dim),
          height: Math.round(dim),
          top: i * Math.round(dim),
          left: offset + j * Math.round(dim),
        };
      });
    })
    .reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
  return bubbles;
};
