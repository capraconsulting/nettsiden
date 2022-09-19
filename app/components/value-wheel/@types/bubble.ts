type StyleProps = {
  [k: string]: string | number;
};

type BubbleProps = {
  x: number;
  y: number;
  style: StyleProps;
  text: string;
  wordsPerLine: number;
};

type AnimatedBubbleProps = {
  isActive: boolean;
  style: StyleProps;
  onClick: (e: React.MouseEvent) => void;
  textColor: string;
  textStyles?: StyleProps;
  text: string;
};
