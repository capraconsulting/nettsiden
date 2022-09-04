import React, { useId } from "react";

import type { SingleShapePatternComponent } from "~/components/pattern/types";
import { classNames } from "~/utils/misc";

const COLS = 100;
const ROWS = 100;

const BODY_COLS = 25;
const TAIL_COLS = COLS - BODY_COLS;
const TAIL_ROWS = 30;

export const LSolid: SingleShapePatternComponent = ({ size, color, style }) => {
  const clipId = useId();

  const body = size.scaled({
    width: BODY_COLS / COLS,
  });

  const tail = size.scaled({
    height: TAIL_ROWS / ROWS,
    width: TAIL_COLS / COLS,
  });

  return (
    <svg
      {...size}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className={classNames(color, "hidden md:block z-9 absolute")}
      style={style}
    >
      <clipPath id={clipId}>
        <rect x="0" y="0" {...body} />
        <rect
          x={body.width}
          y={body.height - tail.height}
          width={tail.width}
          height={tail.height}
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect height={size.height} width={size.width} x={0} y={0} />
      </g>
    </svg>
  );
};
