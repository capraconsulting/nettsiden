import { ContactForm } from "~/components/contact-form";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";

export default function Ansatte() {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <TitleAndText title="Kontakt oss i Capra" titleAs="h1">
          Vi vil gjerne høre fra deg.
        </TitleAndText>

        <Todo badge title="filter buttons" className="w-full" />
        <Todo badge className="h-96" title="Ansatte" />
      </div>
      <ContactForm title="Snakk med oss om dine IT-utfordringer!" />
    </>
  );
}
