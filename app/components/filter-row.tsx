import { useSubmit, useTransition } from "@remix-run/react";

import { FilterButton } from "./filter-button";

interface FilterRowProps {
  filters: string[];
  activeFilters: string[];
  filterKey: string;
  method?: "append" | "replace";
}
/**
 * Use inside a Remix Form component
 *
 * Unable to create a story for this component due to it using remix hooks
 * https://github.com/remix-run/remix/discussions/2481
 */
export const FilterRow = ({
  filters,
  activeFilters,
  filterKey,
}: FilterRowProps) => {
  const submit = useSubmit();
  const transition = useTransition();

  const isFilterActive = (key: string, filter: string) => {
    if (transition.submission?.formData)
      return transition.submission?.formData.getAll(key).includes(filter);
    else if (activeFilters.includes(filter)) return true;
    else return false;
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((x) => (
        <label key={x} className="cursor-pointer">
          <input
            type="radio"
            name={filterKey}
            className="peer sr-only"
            value={x}
            checked={isFilterActive(filterKey, x)}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FilterButton active={isFilterActive(filterKey, x)}>{x}</FilterButton>
        </label>
      ))}
    </div>
  );
};
