import { valuePropositions } from "~/routes/__layout/om-oss";
import { ValueWheel } from "./value-wheel";

export const ValueWheelStories = () => {
  return (
    <>
      <ValueWheel title="Våre verdier" valuePropositions={valuePropositions} />
    </>
  );
};
