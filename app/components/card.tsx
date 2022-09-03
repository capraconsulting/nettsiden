import { classNames } from "~/utils/misc";

interface CardProps {
  image?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, image, className }: CardProps) => (
  <div
    className={classNames(
      "flex flex-col w-full h-full border transition-all shadow hover:shadow-xl",
      className,
    )}
  >
    {image}
    <div className="h-full px-3 py-4 flex flex-col gap-5">{children}</div>
  </div>
);
