import { ContactForm } from "~/components/contact-form";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";

export default function Blogg() {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <TitleAndText title="Blogg" titleAs="h1">
          Her på bloggen skriver vi om det som interesserer oss av tech, ting
          som skjer der ute i bransjen vår og andre happenings i Capra.
        </TitleAndText>

        <Todo badge title="filter buttons" className="w-full" />

        <Todo badge className="h-96" title="Blogg items" />
      </div>
      <ContactForm title="Vil du vite mer om hvordan vi kan hjelpe deg?" />
    </>
  );
}
