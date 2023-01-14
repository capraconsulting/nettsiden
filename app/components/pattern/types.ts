import type { SVGProps } from "react";
import type React from "react";

import type { Size } from "~/components/pattern/size";

export const PATTERN_TYPES = [
  "grid",
  "offset-grid",
  "v-lines",
  "h-lines",
  "square-offset-grid",
  "l-h-lines",
  "l-solid",
] as const;

export type PatternType = (typeof PATTERN_TYPES)[number];

export const SHAPES = ["rect", "l-like"] as const;

export type Shape = (typeof SHAPES)[number];

export type RawSize = Pick<Size, "height" | "width">;

export type PatternComponent = React.FC<{
  size: Size;
  shape: Shape;
  color: FillClass;
  style?: SVGProps<unknown>["style"];
}>;

export type SingleShapePatternComponent = React.FC<{
  size: Size;
  color: FillClass;
  style?: SVGProps<unknown>["style"];
}>;

export type Patterns = Record<PatternType, PatternComponent>;

export type RectProps = React.SVGProps<SVGRectElement> & {
  x: number;
  y: number;
  width: number;
};

export const FILL_CLASSES = [
  "fill-main",
  "fill-bordeaux",
  "fill-light-blue",
  "fill-secondary",
  "fill-peach",
] as const;

export type FillClass = (typeof FILL_CLASSES)[number];
