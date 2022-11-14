import { useRef } from "react";

import { useHydrated } from "~/hooks/use-hydrated";
import { useWindowWidth } from "~/hooks/use-window-width";
import type { BubbleContent, BubbleEffect, Position } from "./bubble";
import { BubbleContainer } from "./bubble";

interface BubbleGridProps {
  items: BubbleContent[];
  bubbleEffect?: BubbleEffect;
}
export const BubbleGrid = ({
  items,
  bubbleEffect = "shuffle",
}: BubbleGridProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useWindowWidth(0);
  const rect = ref.current?.getBoundingClientRect() ?? {
    width: 400,
    height: 600,
  };

  const positions = createGridPositions(rect.width, rect.height, items.length);

  const isHydrated = useHydrated();
  return (
    <div className="h-full min-h-[600px] w-full max-w-4xl" ref={ref}>
      {(isHydrated || bubbleEffect !== "shuffle") && (
        <BubbleContainer
          items={items}
          bubbleEffect={bubbleEffect}
          positions={positions}
        />
      )}
    </div>
  );
};

export const createGridPositions = (
  w: number,
  h: number,
  length: number,
): Position[] => {
  const x = (h * h) / length;

  if (length === 0 || x === 0) {
    return [];
  }

  const dim = Math.sqrt(x);
  const cols = Math.floor(w / dim);
  const offset = Math.round((w - dim * cols) / 2); // rest of w
  const rows = Math.ceil(h / dim);

  const positions = [...Array(rows).keys()]
    .flatMap((i) => {
      return [...Array(cols).keys()].map((j) => {
        return {
          width: Math.round(dim),
          height: Math.round(dim),
          top: i * Math.round(dim),
          left: offset + j * Math.round(dim),
        };
      });
    })
    .map(
      (x) =>
        ({
          top: `${x.top}px`,
          left: `${x.left}px`,
          width: `${x.width}px`,
          height: `${x.height}px`,
        } as const),
    );

  return positions;
};
