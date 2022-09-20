import * as React from "react";
import { ButtonColor } from "../button/Button";
import { CallToActionButtons } from "../callToActionButtons/CallToActionButtons";
import { ImageNode } from "./@types";
import Image from "./image";
import { positions1, positions2 } from "./positions";
import * as css from "./styles.module.css";

export const Bubbles = ({
  nodes,
  positions,
}: {
  nodes: ImageNode[];
  positions: {
    top: number;
    left: number;
    width: number;
    height: number;
  }[];
}) => {
  const [counter, setCounter] = React.useState(0);

  const getPos = (idx: number) => {
    return positions[idx % positions.length];
  };

  const update = () => {
    setCounter(() => counter + 1);
  };

  return (
    <>
      {nodes.map((node, i) => {
        const { top, left, width, height } = getPos(i + counter);
        return (
          <Image
            top={`${top}%`}
            left={`${left}%`}
            width={`${width}px`}
            height={`${height}px`}
            key={node.src}
            node={node}
            onClick={() => update()}
          />
        );
      })}
    </>
  );
};

export const HumanBubblesSmall = ({ nodes }: { nodes: ImageNode[] }) => {
  const sliceIdx = Math.floor(nodes.length / 2);

  return (
    <div className={css.grid}>
      <div className={css.gridlr}>
        <Bubbles positions={positions1} nodes={nodes.slice(0, sliceIdx)} />
      </div>
      <div className={css.gridcenter}>
        <h2>Vi har kickass folk</h2>
        <p>
          I Capra setter vi menneskene først. Vi vet at fornøyde og motiverte
          folk skaper den beste arbeidsplassen.
        </p>
        <div className={css.cta}>
          <CallToActionButtons
            data={[
              {
                label: "Se våre ansatte",
                link: "/ansatte",
                color: ButtonColor.PRIMARY,
              },
            ]}
          ></CallToActionButtons>
        </div>
      </div>
      <div className={css.gridlr}>
        <Bubbles positions={positions2} nodes={nodes.slice(sliceIdx)} />
      </div>
    </div>
  );
};
