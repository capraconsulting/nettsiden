interface TitleAndTextProps {
  title: React.ReactNode;
  titleAs: "h1" | "h2" | "h3";
  children: React.ReactNode;
}
export const TitleAndText = ({
  title,
  titleAs: TitleComponent,
  children,
}: TitleAndTextProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 lg:gap-4 text-center">
      <TitleComponent className="max-w-7xl font-bold text-3xl md:text-4xl lg:text-6xl text-secondary">
        {title}
      </TitleComponent>
      <p className="max-w-4xl font-light text-lg md:text-xl lg:text-2xl text-secondary-80">
        {children}
      </p>
    </div>
  );
};
