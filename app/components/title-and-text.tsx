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
    <Todo badge title="" className="border-none outline-dashed px-0 py-0">
      <div className="flex flex-col items-center gap-8 lg:gap-4 w-11/12 max-w-4xl text-center">
        <TitleComponent className="font-bold text-3xl md:text-4xl lg:text-6xl">
          {title}
        </TitleComponent>
        <p>{children}</p>
      </div>
    </Todo>
  );
};
