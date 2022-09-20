import * as React from "react";
import { ImageNode } from "./@types";
import * as css from "./styles.module.css";

type Evt = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default ({
  node,
  top,
  left,
  width,
  height,
  onClick,
}: {
  node: ImageNode;
  top: string;
  left: string;
  width: string;
  height: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={css.bubble}
      style={{
        top,
        left,
        width,
        height,
      }}
      onClick={(e: Evt) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <img
        src={node.src}
        style={{
          width: `${width}`,
          height: `${height}`,
        }}
        alt="Ansatt i Capra"
      />
    </div>
  );
};
