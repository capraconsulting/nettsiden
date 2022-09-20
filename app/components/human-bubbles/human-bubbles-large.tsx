import * as React from "react";
import { ImageNode } from "./@types";
import Image from "./image";
import * as css from "./styles.module.css";
import { createBubbles, shuffle } from "./utils";

export const Bubbles = ({
  nodes,
  width,
  height,
}: {
  nodes: ImageNode[];
  width: number;
  height: number;
}) => {
  const [counter, setCounter] = React.useState(0);
  const bubbles = shuffle(createBubbles(width, height, nodes.length));
  return (
    <div>
      {nodes.map((node, idx) => {
        return (
          <Bubble
            key={`bubble-${node?.src}`}
            node={node}
            bubble={bubbles[idx]}
            onClick={() => {
              setCounter(() => counter + 1);
            }}
          />
        );
      })}
    </div>
  );
};

export const Bubble = ({
  node,
  bubble,
  onClick,
}: {
  node: ImageNode;
  bubble: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  onClick: () => void;
}) => {
  if (!node) {
    return null;
  }
  return (
    <div className="bubble">
      <Image
        node={node}
        top={(bubble?.top || 0) + "px"}
        left={(bubble?.left || 0) + "px"}
        width={(bubble?.width || 0) + "px"}
        height={(bubble?.height || 0) + "px"}
        onClick={() => onClick()}
      />
    </div>
  );
};

export const useWindowSize = () => {
  // don't use when SSR
  if (typeof window === "undefined") {
    return [0, 0];
  }
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const HumanBubblesLarge = ({ nodes }: { nodes: ImageNode[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [wh, setWh] = React.useState<[number, number]>([0, 0]);
  const size = useWindowSize();

  React.useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setWh((_wh) => [rect.width, rect.height]);
    }
  }, [size]);

  return (
    <div className={css.bubblesLarge}>
      <div ref={ref}>
        <Bubbles width={wh[0]} height={wh[1]} nodes={nodes} />
      </div>
    </div>
  );
};
