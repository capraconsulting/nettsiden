import { classNames } from "~/utils/misc";

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
}
export const FilterButton = ({ children, active }: FilterButtonProps) => {
  return (
    <span
      className={classNames(
        "py-1 px-4 rounded border border-secondary transition font-bold text-sm peer-focus:ring-secondary peer-focus:ring-1",
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
