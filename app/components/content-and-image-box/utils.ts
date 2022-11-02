import type { FillClass } from "~/components/pattern/types";
import { BRAND_BG_AND_FG_COLORS } from "~/utils/constants";
import { randomValue } from "~/utils/random";

export type BoxColor = "peach" | "lightBlue" | "bordeaux" | "darkBlue";

type BoxClass = `bg-${string} text-${string}`;

const PATTERN_CLASSES: Record<BoxColor, [BoxClass, FillClass[]]> = {
  peach: [
    BRAND_BG_AND_FG_COLORS.peach,
    ["fill-main", "fill-bordeaux", "fill-light-blue", "fill-secondary"],
  ],
  lightBlue: [
    BRAND_BG_AND_FG_COLORS.lightBlue,
    ["fill-main", "fill-secondary", "fill-bordeaux", "fill-peach"],
  ],
  bordeaux: [
    BRAND_BG_AND_FG_COLORS.bordeaux,
    ["fill-peach", "fill-light-blue"],
  ],
  darkBlue: [
    BRAND_BG_AND_FG_COLORS.darkBlue,
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
