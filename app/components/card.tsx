import { classNames } from "~/utils/misc";

interface CardProps {
  image?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, image, className }: CardProps) => (
  <div
    className={classNames(
      "flex h-full w-full flex-col border shadow transition-all hover:shadow-xl",
      className,
    )}
  >
    {image}
    <div className="flex h-full flex-col gap-5 px-3 py-4">{children}</div>
  </div>
);
