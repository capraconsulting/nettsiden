import { Todo } from "./todo";

interface Props {
  title: React.ReactNode;
}
export const ContactForm = ({ title }: Props) => {
  return (
    <Todo
      badge
      title="Contact form"
      className="bg-blue-700 text-white h-96 w-full -mb-[50px]"
    >
      <div className="text-3xl font-semibold text-orange-200">{title}</div>
      <span>Fyll ut skjemaet så kontakter vi deg!</span>
    </Todo>
  );
};
