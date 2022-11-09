import type { SVGProps } from "react";
import React from "react";

import type { Size } from "~/components/pattern/size";
import type { RectProps } from "~/components/pattern/types";
import type { FillClass } from "~/components/pattern/types";
import { classNames } from "~/utils/misc";

interface Props {
  /**
   * Should rows be generated?
   */
  rows?: boolean;

  /**
   * Should columns be generated?
   */
  cols?: boolean;

  /**
   * Wanted total pattern size (px).
   */
  size: Size;

  /**
   * Per-<rect> config.
   */
  rect: {
    size: Size;
    padding: Size;
  };

  /**
   * All rects will use this class for color.
   */
  color: FillClass;

  /**
   * Pass extra styled overrides to the <svg> wrapper element.
   */
  style?: SVGProps<unknown>["style"];

  /**
   * Can be used if some rects should not be rendered. If not present, all rects will be rendered.
   */
  filterRects?(props: RectProps): boolean;

  /**
   * Can be used to modify position, size, etc. of each rect.
   */
  modifyRect?(
    props: { col: number; row: number } & RectProps,
  ): Partial<RectProps>;
}

/**
 * Main engine in our pattern generation logic. Based on props, it will generate and render some number of <rect> nodes,
 * inside an <svg> element.
 */
export const PatternGenerator: React.FC<Props> = ({
  size,
  rows,
  cols,
  rect,
  color,
  style,
  filterRects = () => true,
  modifyRect = () => ({}),
}) => {
  // Calculate how many rows and cols we want based on padding and pattern/rect sizes
  const rowCount = rows
    ? Math.floor(size.height / (rect.size.height + rect.padding.height))
    : 1;
  const colCount = cols
    ? Math.floor(size.width / (rect.size.width + rect.padding.width))
    : 1;

  const rects: React.ReactNode[] = [];

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const defaultProps: RectProps = {
        ...rect.size,
        x: cols ? col * (rect.size.width + rect.padding.width) : 0,
        y: rows ? row * (rect.size.height + rect.padding.height) : 0,
      };

      const props: RectProps = {
        ...defaultProps,
        ...modifyRect({ col, row, ...defaultProps }),
      };

      if (filterRects(props)) {
        rects.push(<rect key={`${row}-${col}`} {...props} />);
      }
    }
  }

  return (
    <svg
      {...size}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className={classNames(color, "z-9 absolute hidden md:block")}
      style={style}
    >
      {rects}
    </svg>
  );
};
