import React from "react";

import { PatternGenerator } from "~/components/pattern/pattern-generator";
import { Size } from "~/components/pattern/size";
import type { SingleShapePatternComponent } from "~/components/pattern/types";

const RECT_CONFIG = {
  size: Size.of(3),
  padding: Size.of(3),
};

export const LHorizontalLines: SingleShapePatternComponent = (props) => {
  const clip = props.size.scaled(0.4);

  return (
    <PatternGenerator
      {...props}
      rect={RECT_CONFIG}
      rows={true}
      modifyRect={({ y }) => ({
        width:
          y > props.size.height - clip.height ? props.size.width : clip.width,
      })}
    />
  );
};
