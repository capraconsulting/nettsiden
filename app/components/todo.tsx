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
  let rootClassName = "border-gray-600 border-dashed";
  let titleClassName = "";
  let badgeClassName = "";
  if (size === "large") {
    rootClassName += " border-4 p-6";
    titleClassName += " text-2xl font-semibold";
    badgeClassName += " left-2 top-2 border-2 p-1";
  }
  if (size === "small") {
    rootClassName += " border-2 p-2";
    titleClassName += " text-xl";
    badgeClassName += " left-1 top-1 border px-1 text-xs";
  }

  return (
    <div
      style={style}
      className={`${display} relative flex-col items-center justify-center ${rootClassName} ${className}`}
    >
      {badge && (
        <span
          className={`absolute rounded border-black bg-yellow font-bold text-black ${badgeClassName}`}
        >
          TODO
        </span>
      )}
      <div className={titleClassName}>{title}</div>
      {children}
    </div>
  );
};
