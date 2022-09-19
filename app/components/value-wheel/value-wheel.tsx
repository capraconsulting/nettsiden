import React, { useState } from "react";
import { Donut } from "./donut";
import * as styles from "./value-wheel.module.scss";

export const ValueWheel = () => {
  const [active, setActive] = useState(-1);
  return (
    <div className={styles.container}>
      <Donut
        active={active}
        onClick={(idx) => {
          if (idx === active) {
            setActive(-1);
          } else {
            setActive(idx);
          }
        }}
      />
    </div>
  );
};
