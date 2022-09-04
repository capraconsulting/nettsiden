import type { FillClass } from "~/components/pattern/types";
import { randomValue } from "~/utils/random";

export type BoxColor = "peach" | "lightBlue" | "bordeaux" | "darkBlue";

type BoxClass = `bg-${string} text-${string}`;

const PATTERN_CLASSES: Record<BoxColor, [BoxClass, FillClass[]]> = {
  peach: [
    "bg-peach text-secondary",
    ["fill-main", "fill-bordeaux", "fill-light-blue", "fill-secondary"],
  ],
  lightBlue: [
    "bg-light-blue text-secondary",
    ["fill-main", "fill-secondary", "fill-bordeaux", "fill-peach"],
  ],
  bordeaux: ["bg-bordeaux text-secondary", ["fill-peach", "fill-light-blue"]],
  darkBlue: [
    "bg-secondary-80 text-peach-20",
    ["fill-peach", "fill-light-blue"],
  ],
};

export function getBoxConfig(color: BoxColor): {
  boxClassName: BoxClass;
  patternClassName: FillClass;
} {
  const [boxClassName, patternClassNames] = PATTERN_CLASSES[color];
  return {
    boxClassName,
    patternClassName: randomValue(patternClassNames),
  };
}
