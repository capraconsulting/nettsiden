import React from "react";

import { PatternGenerator } from "~/components/pattern/pattern-generator";
import { Size } from "~/components/pattern/size";
import type { SingleShapePatternComponent } from "~/components/pattern/types";
import { randomNumber } from "~/utils/random";

const RECT_CONFIG = {
  size: Size.randomInRange(3, 5),
  padding: Size.randomInRange(3, 5),
};

export const Grid: SingleShapePatternComponent = (props) => {
  const clip = props.size.scaled({
    height: randomNumber(0.3, 0.6),
    width: randomNumber(0.3, 0.8),
  });

  return (
    <PatternGenerator
      {...props}
      rect={RECT_CONFIG}
      cols={true}
      rows={true}
      filterRects={(rect) =>
        rect.x + rect.width < clip.width || rect.y > clip.height
      }
    />
  );
};
