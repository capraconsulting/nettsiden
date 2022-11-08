import type { BubbleContent, BubbleEffect, Position } from "./bubble";
import { BubbleContainer } from "./bubble";

interface BubbleSandwichProps {
  items: BubbleContent[];
  children: React.ReactNode;
  bubbleEffect?: BubbleEffect;
}
export const BubbleSandwich = ({
  items,
  children,
  bubbleEffect = "shift",
}: BubbleSandwichProps) => {
  const middleIndex = Math.floor(items.length / 2);
  const items1 = items.slice(0, middleIndex);
  const items2 = items.slice(middleIndex);

  return (
    <div
      className="max-w-4xl sm:grid sm:min-h-[300px]"
      style={{ gridTemplateColumns: "22% 54% 22%" }}
    >
      <BubbleContainer
        items={items1}
        positions={positions1}
        bubbleEffect={bubbleEffect}
        className="hidden sm:block"
      />
      <div>{children}</div>
      <BubbleContainer
        items={items2}
        positions={positions2}
        bubbleEffect={bubbleEffect}
        className="hidden sm:block"
      />
    </div>
  );
};

const positions1: Position[] = [
  {
    top: "0%",
    left: "40%",
    width: "70px",
    height: "70px",
  },
  {
    top: "15%",
    left: "5%",
    width: "80px",
    height: "80px",
  },
  {
    top: "25%",
    left: "50%",
    width: "60px",
    height: "60px",
  },
  {
    top: "46%",
    left: "3%",
    width: "75px",
    height: "75px",
  },
  {
    top: "46%",
    left: "45%",
    width: "65px",
    height: "65px",
  },
  {
    top: "66%",
    left: "60%",
    width: "75px",
    height: "75px",
  },
];

const positions2: Position[] = [
  {
    top: "0%",
    left: "40%",
    width: "80px",
    height: "80px",
  },
  {
    top: "10%",
    left: "5%",
    width: "70px",
    height: "70px",
  },
  {
    top: "25%",
    left: "60%",
    width: "60px",
    height: "60px",
  },
  {
    top: "36%",
    left: "16%",
    width: "75px",
    height: "75px",
  },
  {
    top: "46%",
    left: "60%",
    width: "65px",
    height: "65px",
  },
  {
    top: "66%",
    left: "6%",
    width: "75px",
    height: "75px",
  },
  {
    top: "70%",
    left: "44%",
    width: "75px",
    height: "75px",
  },
];
