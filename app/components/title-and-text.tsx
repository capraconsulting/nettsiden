import { classNames } from "~/utils/misc";

interface TitleAndTextProps {
  title: React.ReactNode;
  titleAs: "h1" | "h2" | "h3";
  children: React.ReactNode;
  id?: string;
  className?: string;
}
export const TitleAndText = ({
  title,
  titleAs: TitleComponent,
  children,
  id,
  className,
}: TitleAndTextProps) => {
  return (
    <div
      id={id}
      className={classNames(
        "flex w-full flex-col items-center gap-14 text-center lg:gap-16",
        {
          "scroll-mt-nav-height": !!id,
        },
        className,
      )}
    >
      <TitleComponent className="w-[95%] max-w-7xl text-3xl font-bold text-secondary md:text-4xl lg:text-6xl">
        {title}
      </TitleComponent>
      <p className="w-[95%] max-w-2xl text-lg font-light text-secondary-80 md:text-xl lg:max-w-4xl lg:text-2xl">
        {children}
      </p>
    </div>
  );
};
