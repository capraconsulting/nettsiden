import { valuePropositions } from "~/utils/constants";
import { ValueWheel } from "./value-wheel";

export const ValueWheelStories = () => {
  return (
    <ValueWheel title="Våre verdier" valuePropositions={valuePropositions} />
  );
};
