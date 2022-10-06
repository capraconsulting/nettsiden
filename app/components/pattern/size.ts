import type { RawSize } from "~/components/pattern/types";
import { randomInteger } from "~/utils/random";

export class Size {
  readonly height: number;
  readonly width: number;

  private constructor(size: RawSize) {
    this.height = size.height;
    this.width = size.width;
  }

  /**
   * Create a new size as a direct scale of another.
   *
   * @param scale - either a number (which will be used for both width and height), or separate width and height values
   */
  scaled(scale: Partial<RawSize> | number) {
    const isNumber = typeof scale === "number";
    return new Size({
      width: this.width * (isNumber ? scale : scale.width ?? 1),
      height: this.height * (isNumber ? scale : scale.height ?? 1),
    });
  }

  static of(size: RawSize | number) {
    return new Size(
      typeof size === "number"
        ? {
            height: size,
            width: size,
          }
        : size,
    );
  }

  /**
   * Create a random (equal width/height) size in a given range.
   *
   * @param min - minimum size value
   * @param max - maximum size value
   */
  static randomInRange(min: number, max: number) {
    return Size.of(randomInteger(min, max));
  }
}
