import React from "react";

import { PatternGenerator } from "~/components/pattern/pattern-generator";
import { Size } from "~/components/pattern/size";
import type { SingleShapePatternComponent } from "~/components/pattern/types";

const RECT_CONFIG = {
  size: Size.of(7),
  padding: Size.of(6).scaled({
    width: 0.8,
  }),
};

export const SquareOffsetGrid: SingleShapePatternComponent = (props) => (
  <PatternGenerator
    {...props}
    rect={RECT_CONFIG}
    cols={true}
    rows={true}
    modifyRect={({ x, row }) => ({
      // Offset x position of every other row width padding
      x: x + (row % 2 === 0 ? 0 : RECT_CONFIG.padding.width),
    })}
  />
);
