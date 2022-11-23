import { useState } from "react";

import { useHydrated } from "~/hooks/use-hydrated";
import { classNames, shiftedBy } from "~/utils/misc";
import { shuffled } from "~/utils/random";

type PixelsOrPercentage = `${number}px` | `${number}%`;
export interface Position {
  top: PixelsOrPercentage;
  left: PixelsOrPercentage;
  width: PixelsOrPercentage;
  height: PixelsOrPercentage;
}

type BubbleProps = {
  position: Position;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;
export const Bubble = ({ position, children, ...rest }: BubbleProps) => {
  const isHydrated = useHydrated();
  return (
    <div
      className={classNames(
        "absolute select-none overflow-hidden rounded-full transition-[top,left,width,height] duration-500 ease-in-out",
        "border border-light-blue",
        {
          "cursor-pointer hover:scale-105 active:scale-110":
            !!rest.onClick && isHydrated,
        },
      )}
      style={{ ...position }}
      {...rest}
    >
      {children}
    </div>
  );
};

export type BubbleEffect = "shift" | "shuffle" | "none";
export type BubbleContent = React.ReactNode;

interface BubbleContainerProps {
  positions: Position[];
  items: BubbleContent[];
  bubbleEffect: "shift" | "shuffle" | "none";
  className?: string;
}
export const BubbleContainer = ({
  positions,
  items,
  bubbleEffect,
  className,
}: BubbleContainerProps) => {
  const maxBubbleCount = Math.min(positions.length, items.length);
  const [count, setCount] = useState(0);
  const triggerBubbling = () => setCount((x) => x + 1);

  let updatedPositions: Position[];
  if (bubbleEffect === "shift") updatedPositions = shiftedBy(positions, count);
  else if (bubbleEffect === "shuffle") updatedPositions = shuffled(positions);
  else updatedPositions = positions;

  return (
    <div className={`relative ${className}`}>
      {items.slice(0, maxBubbleCount).map((x, i) => (
        <Bubble
          key={i}
          position={updatedPositions[i]}
          onClick={bubbleEffect !== "none" ? triggerBubbling : undefined}
        >
          {x}
        </Bubble>
      ))}
    </div>
  );
};
