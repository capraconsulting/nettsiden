/**
 * Simple function for creating a (pseudo) random integer in a given range.
 *
 * @param min (default 0) - Minimum value of the generated number.
 * @param max (default 100) - Maximum value of the generated number.
 */
export function randomInteger(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Similar to {@link randomInteger}, but supports numbers with decimals.
 *
 * @param min - Minimum value of the generated number.
 * @param max - Maximum value of the generated number.
 */
export function randomNumber(min: number, max: number): number {
  return randomInteger(min * 100, max * 100) / 100;
}

/**
 * Select a (pseudo) random value in an array.
 *
 * @param arr - Values to choose from.
 */
export function randomValue<T>(arr: ReadonlyArray<T> | T[]): T {
  return arr[randomInteger(0, arr.length - 1)];
}

/**
 * Shuffle an array
 *
 * @param arr - The array to shuffle
 * @returns a new shuffled arrate
 */
export function shuffled<T>(arr: ReadonlyArray<T> | T[]): T[] {
  const _arr = arr.slice();

  let currentIndex = _arr.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    const tmp = _arr[currentIndex];
    _arr[currentIndex] = _arr[randomIndex];
    _arr[randomIndex] = tmp;
  }
  return _arr;
}
