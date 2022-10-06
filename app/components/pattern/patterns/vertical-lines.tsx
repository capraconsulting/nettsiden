import React from "react";

import { PatternGenerator } from "~/components/pattern/pattern-generator";
import { Size } from "~/components/pattern/size";
import type { PatternComponent } from "~/components/pattern/types";
import { randomNumber } from "~/utils/random";

const RECT_CONFIG = {
  size: Size.randomInRange(2, 3),
  padding: Size.randomInRange(2, 3),
};

export const VerticalLines: PatternComponent = ({ shape, ...props }) => {
  let clip = props.size;

  if (shape === "l-like") {
    clip = clip.scaled({
      width: randomNumber(0.3, 0.7),
      height: randomNumber(0.15, 0.6),
    });
  }

  return (
    <PatternGenerator
      {...props}
      rect={RECT_CONFIG}
      cols={true}
      modifyRect={({ x }) => ({
        height:
          x + RECT_CONFIG.size.width > clip.width
            ? clip.height
            : props.size.height,
      })}
    />
  );
};
