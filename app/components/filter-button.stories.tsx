import { useState } from "react";

import { FilterButton } from "./filter-button";

export const FilterButtonStories = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <FilterButton children="Inactive" active={false} />
      <FilterButton children="Active" active={true} />
      <button onClick={() => setActive((x) => !x)}>
        <FilterButton children="Click me" active={active} />
      </button>
    </div>
  );
};
