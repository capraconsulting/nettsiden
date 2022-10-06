import React from "react";

import { PatternGenerator } from "~/components/pattern/pattern-generator";
import { Size } from "~/components/pattern/size";
import type { PatternComponent } from "~/components/pattern/types";
import { randomNumber } from "~/utils/random";

const RECT_CONFIG = {
  size: Size.randomInRange(2, 4).scaled({
    width: 0.8,
  }),
  padding: Size.randomInRange(3, 4),
};

export const OffsetGrid: PatternComponent = ({ shape, ...props }) => {
  let clip = props.size;

  if (shape === "l-like") {
    clip = clip.scaled({
      height: randomNumber(0.4, 0.7),
      width: randomNumber(0.3, 0.8),
    });
  }

  return (
    <PatternGenerator
      {...props}
      rect={RECT_CONFIG}
      cols={true}
      rows={true}
      filterRects={({ x, y, width }) =>
        x + width < clip.width || y > props.size.height - clip.height
      }
      modifyRect={({ x, row }) => ({
        // Offset x position of every other row width padding
        x: x + (row % 2 === 0 ? 0 : RECT_CONFIG.padding.width),
      })}
    />
  );
};
