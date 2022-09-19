import { useState } from "react";

import { Donut } from "./donut";

export interface ValueProposition {
  id: string;
  textColor: string;
  text: string;
  content: string;
  color: string;
}

interface ValueWheelProps {
  title: string;
  valuePropositions: ValueProposition[];
}
export const ValueWheel = (props: ValueWheelProps) => {
  const [active, setActive] = useState(-1);
  return (
    <div className="w-5/6 max-w-xl my-0 mx-auto">
      <Donut
        {...props}
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
