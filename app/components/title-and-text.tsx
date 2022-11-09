import { classNames } from "~/utils/misc";

interface TitleAndTextProps {
  title: React.ReactNode;
  titleAs: "h1" | "h2" | "h3";
  children: React.ReactNode;
  id?: string;
}
export const TitleAndText = ({
  title,
  titleAs: TitleComponent,
  children,
  id,
}: TitleAndTextProps) => {
  return (
    <div
      id={id}
      className={classNames(
        "flex w-full flex-col items-center gap-3 text-center lg:gap-4",
        {
          "scroll-mt-nav-height": !!id,
        },
      )}
    >
      <TitleComponent className="w-[95%] max-w-7xl text-3xl font-bold text-secondary md:text-4xl lg:text-6xl">
        {title}
      </TitleComponent>
      <p className="w-[95%] max-w-4xl text-lg font-light text-secondary-80 md:text-xl lg:text-2xl">
        {children}
      </p>
    </div>
  );
};
