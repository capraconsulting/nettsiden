import { classNames } from "~/utils/misc";

interface CardProps {
  as?: "article" | "div" | "li";
  image?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const Card = ({
  as: Component = "div",
  children,
  image,
  className,
}: CardProps) => (
  <Component
    className={classNames(
      "flex h-full w-full flex-col border shadow transition-all hover:shadow-xl",
      className,
    )}
  >
    {image}
    <div className="flex h-full flex-col gap-5 px-3 py-4">{children}</div>
  </Component>
);
