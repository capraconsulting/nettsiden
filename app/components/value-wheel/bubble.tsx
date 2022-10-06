import { useEffect, useRef } from "react";

import { TextSpan } from "./text-span";
import type { AnimatedBubbleProps } from "./types";

const canAnimate = (ref: React.MutableRefObject<any>) => {
  return ref && ref.current && "beginElement" in ref.current;
};

export const AnimatedBubble = ({
  isActive,
  style,
  onClick,
  textColor,
  textStyles,
  text,
}: AnimatedBubbleProps) => {
  const beginRef = useRef<any>(undefined);
  const endRef = useRef<any>(null);
  const wasActive = useRef(isActive);
  const className = `animated-bubble ${isActive ? "active" : ""}`;

  useEffect(() => {
    const doAnimBegin = !wasActive.current && isActive;
    const doAnimEnd = wasActive.current && !isActive;

    if (doAnimBegin && canAnimate(beginRef)) {
      beginRef.current.beginElement();
    }

    if (doAnimEnd && canAnimate(endRef)) {
      endRef.current.beginElement();
    }

    if (wasActive.current !== isActive) {
      wasActive.current = isActive;
    }
  });

  return (
    <g className={className} onClick={onClick}>
      <circle
        r={15}
        cx={50}
        cy={50}
        style={{
          ...style,
          stroke: "white",
          strokeWidth: "0.5",
          cursor: "pointer",
        }}
      >
        <animate
          ref={beginRef}
          attributeName="r"
          begin="indefinite"
          dur="125ms"
          to={35}
          fill="freeze"
        />
        <animate
          ref={endRef}
          attributeName="r"
          begin="indefinite"
          dur="125ms"
          to={15}
          fill="freeze"
        />
      </circle>

      <TextSpan
        x={50}
        y={50}
        style={{
          ...textStyles,
          fontSize: "2.8pt",
          fill: textColor,
          cursor: "pointer",
        }}
        text={text}
        wordsPerLine={6}
      />
    </g>
  );
};
