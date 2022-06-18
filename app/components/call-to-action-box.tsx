import { Todo } from "~/components/todo";

interface CallToActionBoxProps {
  title: React.ReactNode;
  description: React.ReactNode;
  linkText: React.ReactNode;
}
export const CallToActionBox = ({
  title,
  description,
  linkText,
}: CallToActionBoxProps) => {
  return (
    <Todo badge title="" className="border-none py-0 px-0 w-full">
      <div className="w-11/12 max-w-7xl py-24 px-6 bg-peach-20 flex flex-col items-center">
        <p className="font-bold text-xl">{title}</p>
        <p>{description}</p>
        <Todo className="mt-7 w-48" badge size="small" title={linkText} />
      </div>
    </Todo>
  );
};
