import { classNames } from "~/utils/misc";

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
}
export const FilterButton = ({ children, active }: FilterButtonProps) => {
  return (
    <span
      className={classNames(
        "rounded border border-secondary px-4 py-1 text-sm font-bold transition peer-focus:ring-1 peer-focus:ring-secondary",
        {
          "bg-secondary text-white": active,
          "bg-white text-secondary": !active,
        },
      )}
    >
      {children}
    </span>
  );
};
