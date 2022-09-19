import type { SliceProps } from "./types";
import { getFlags } from "./utils";

const $j = (ary: string[] | number[], ...args: [number?, number?]) => {
  if (!Array.isArray(ary)) {
    throw new Error("$j function only works with arrays.");
  }
  return ary.slice(...args).join(" ");
};

export const Slice = ({
  arc1,
  arc2,
  filter,
  style,
  text,
  textXy,
  textColor,
  textStyles,
  onClick,
}: SliceProps) => {
  const id = "slice-" + arc1.concat(arc2).map(Math.round).join(".");

  const args = {
    d: $j(
      [
        `M ${$j(arc1, 0, 2)}`,
        `A ${$j(arc1, 2)}`,
        `L ${$j(arc2, -2)}`,
        `A ${$j(arc2, 2, 4)} ${$j(getFlags({ invert: true }))} ${$j(
          arc2,
          0,
          2,
        )}`,
        `L ${$j(arc1, 0, 2)}`,
      ],
      0,
    ),
    id,
    filter,
    style,
  };
  return (
    <g style={{ cursor: "pointer" }} onClick={() => onClick()}>
      <path {...args} />
      <text
        x={textXy[0]}
        y={textXy[1]}
        fill={textColor}
        style={{
          ...textStyles,
          fontSize: "2.5pt",
          fontWeight: "bold",
          textAnchor: "middle",
          dominantBaseline: "central",
          textTransform: "uppercase",
        }}
      >
        {text}
      </text>
    </g>
  );
};
