import React from "react";

import { Grid } from "~/components/pattern/patterns/grid";
import { HorizontalLines } from "~/components/pattern/patterns/horizontal-lines";
import { LHorizontalLines } from "~/components/pattern/patterns/l-horizontal-lines";
import { LSolid } from "~/components/pattern/patterns/l-solid";
import { OffsetGrid } from "~/components/pattern/patterns/offset-grid";
import { SquareOffsetGrid } from "~/components/pattern/patterns/square-offset-grid";
import { VerticalLines } from "~/components/pattern/patterns/vertical-lines";
import { Size } from "~/components/pattern/size";
import type {
  FillClass,
  Patterns,
  PatternType,
  Shape,
} from "~/components/pattern/types";
import { PATTERN_TYPES } from "~/components/pattern/types";
import { useWindowWidth } from "~/hooks/use-window-width";
import { randomValue } from "~/utils/random";

export interface Props {
  width: number;
  height: number;
  color: FillClass;
  pattern?: PatternType;
  shape?: Shape;
  left?: string;
  right?: string;
  top?: string;
  flipV?: boolean;
  flipH?: boolean;
}

const BREAKPOINT_TABLET_PX = 1024;

const patterns: Patterns = {
  grid: Grid,
  "v-lines": VerticalLines,
  "offset-grid": OffsetGrid,
  "h-lines": HorizontalLines,
  "square-offset-grid": SquareOffsetGrid,
  "l-h-lines": LHorizontalLines,
  "l-solid": LSolid,
};

export const Pattern: React.FC<Props> = ({
  pattern = randomValue(PATTERN_TYPES),
  shape = Math.random() > 0.33 ? "rect" : "l-like",
  color,
  width,
  height,
  left = "unset",
  top = "unset",
  right = "unset",
  flipV = false,
  flipH = false,
}) => {
  // TODO: An even better way to get a good default value here, is to check the user agent of the client, but it's a bit more involved.
  const windowWidth = useWindowWidth(BREAKPOINT_TABLET_PX);

  let size = Size.of({ width, height });

  // On smaller devices we should make the pattern a bit smaller
  if (windowWidth <= BREAKPOINT_TABLET_PX) {
    size = size.scaled(0.8);
  }

  const PatternComponent = patterns[pattern];

  return (
    <PatternComponent
      size={size}
      shape={shape}
      color={color}
      style={{
        left,
        top,
        right,
        transform: `scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})`,
      }}
    />
  );
};
