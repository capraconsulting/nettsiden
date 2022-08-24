import { Todo } from "~/components/todo";

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
    // <Todo badge title="" className="border-none outline-dashed px-0 py-0">
    <div className="w-full flex flex-col items-center gap-3 lg:gap-4 text-center">
      <TitleComponent className="font-bold text-3xl md:text-4xl lg:text-6xl text-secondary">
        {title}
      </TitleComponent>
      <p className="font-light text-lg md:text-xl lg:text-2xl text-secondary">
        {children}
      </p>
    </div>
    // </Todo>
  );
};
