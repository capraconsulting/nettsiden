interface Props {
  title?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  display?: "flex" | "inline-flex";
  size?: "small" | "large";
  children?: React.ReactNode;
  badge?: boolean;
}
export const Todo = ({
  title = "TODO",
  display = "flex",
  size = "large",
  className,
  style,
  children,
  badge = false,
}: Props) => {
  let classNames = "border-gray-600 border-dashed";
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
    <div
      style={style}
      className={`${display} relative flex-col justify-center items-center ${classNames} ${className}`}
    >
      {badge && (
        <span className="absolute left-2 top-2 font-bold bg-yellow-400 border-black border-2 text-black rounded p-1">
          TODO
        </span>
      )}
      <div className={titleClassName}>{title}</div>
      {children}
    </div>
  );
};
