export type StyleProps = {
  [k: string]: string | number;
};

export type BubbleProps = {
  x: number;
  y: number;
  style: StyleProps;
  text: string;
  wordsPerLine: number;
};

export type AnimatedBubbleProps = {
  isActive: boolean;
  style: StyleProps;
  onClick: (e: React.MouseEvent) => void;
  textColor: string;
  textStyles?: StyleProps;
  text: string;
};

export type Arc = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

export type Point2D = [number, number];

export type SliceProps = {
  arc1: Arc;
  arc2: Arc;
  textColor: string;
  textStyles?: StyleProps;
  text: string;
  textXy: Point2D;
  style: {
    [key: string]: string | number;
  };
  filter: string;
  onClick: () => void;
};
