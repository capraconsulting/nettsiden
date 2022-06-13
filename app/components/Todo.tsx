interface Props {
  title?: string;
  className?: string;
  display?: "block" | "inline-block";
  size?: "small" | "large";
  children?: React.ReactNode;
}
export const Todo = ({
  title = "TODO",
  display = "block",
  size = "large",
  className,
  children,
}: Props) => {
  let classNames = "border-gray-600 ";
  let titleClassName = "";
  if (size === "large") {
    classNames += " border-4 p-6";
    titleClassName += " text-2xl font-semibold";
  }
  if (size === "small") {
    classNames += " border-2 p-2";
    titleClassName += " text-xl";
  }

  return (
    <div className={display}>
      <div
        className={`flex flex-col justify-center items-center ${classNames} ${className}`}
      >
        <div className={titleClassName}>{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};
