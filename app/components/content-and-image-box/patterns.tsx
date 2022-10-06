import type { Props as PatternProps } from "~/components/pattern/pattern";
import type { FillClass } from "~/components/pattern/types";
import { randomValue } from "~/utils/random";

type Direction = "left" | "right";

export function randomPattern(
  direction: Direction,
  fillClassName: FillClass,
): PatternProps {
  return {
    ...randomValue(CONTENT_BOX_PATTERNS[direction]),
    color: fillClassName,
  };
}

const CONTENT_BOX_PATTERNS: Record<Direction, Omit<PatternProps, "color">[]> = {
  left: [
    {
      pattern: "square-offset-grid",
      width: 170,
      height: 170,
      left: "-5%",
      top: "-20%",
    },
    {
      pattern: "l-h-lines",
      width: 300,
      height: 120,
      left: "-2%",
      top: "-18%",
    },
    {
      pattern: "l-h-lines",
      width: 300,
      height: 120,
      left: "-2%",
      top: "-5%",
      flipV: true,
    },
    {
      pattern: "l-solid",
      width: 300,
      height: 120,
      left: "-2%",
      top: "-5%",
      flipV: true,
    },
  ],
  right: [
    {
      pattern: "square-offset-grid",
      width: 150,
      height: 150,
      left: "75%",
      top: "-20%",
    },
    {
      pattern: "l-h-lines",
      width: 250,
      height: 150,
      left: "-12%",
      top: "-10%",
      flipV: true,
    },
    {
      pattern: "l-h-lines",
      width: 250,
      height: 150,
      right: "-1%",
      top: "-7%",
      flipV: true,
      flipH: true,
    },
    {
      pattern: "l-solid",
      width: 300,
      height: 120,
      left: "-2%",
      top: "-5%",
      flipV: true,
    },
    {
      pattern: "l-solid",
      width: 300,
      height: 120,
      right: "-2%",
      top: "-5%",
      flipV: true,
      flipH: true,
    },
  ],
};
