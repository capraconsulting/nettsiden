import type { MetaFunction } from "@remix-run/node";

import { ContactForm } from "~/components/ContactForm";
import { Todo } from "~/components/Todo";

export const meta: MetaFunction = () => ({
  title: "Capra Consulting: IT-konsulenter med ekspertise i software",
  ogTitle: "Capra Consulting: IT-konsulenter med ekspertise i software",
  description:
    "Vi er IT-konsulenter innen softwareutvikling og Norges beste på sky. I Capra har vi høy kvalitet på våre ansatte, og det vil vi fortsette med. Bli med oss!",
});

export default function Index() {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-16 py-8">
        <Todo title="Vi er Norges beste på ...">Bold statement? Absolutt.</Todo>

        <div className="flex gap-4 justify-center">
          <Todo display="inline-block" size="small" title="Bli kunde?" />
          <Todo display="inline-block" size="small" title="Jobb hos oss!" />
        </div>

        <Todo title="Hva trenger du?">
          <p>
            Vi elsker å løse komplekse problemer, men vi vet at en enkelt
            arbeidsmetode ikke passer alle. Derfor tilbyr vi to måter å løse
            utfordringene dine!
          </p>
        </Todo>

        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          <Todo title="Liflig">
            Du har ideene - la vårt inhouse team bygge og forvalte hele
            tjenesten for deg
          </Todo>
          <div className="flex flex-wrap">
            <CardModule title="Vi tar det tekniske" className="bg-red-900" />
            <CardModule title="Kompetanse på laget" className="bg-red-900" />
            <CardModule title="Kort oppstartstid" className="bg-red-900" />
            <CardModule title="" className="bg-red-900" />
          </div>
        </div>

        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          <Todo title="Konsulenter">
            Trenger du flere gode hoder på teamet ditt? Vi gir deg
            IT-konsulenter med spisskompetanse!
          </Todo>
          <div className="flex flex-wrap">
            <CardModule
              title="Opp i skyen
"
              className="bg-sky-400"
            />
            <CardModule
              title="Vi tør å rådgi
"
              className="bg-sky-400"
            />
            <CardModule
              title="Faglig sterke
"
              className="bg-sky-400"
            />
            <CardModule title="" className="bg-sky-400" />
          </div>
        </div>

        <Todo title="Fancy AWS card" className="h-60" />
        <Todo title={`Fancy "Vi er spesialister" Card`} className="h-60" />
        <Todo title="Fancy Vi har kickass folk" className="h-60" />
        <Todo title="Vi jobber med store aktører i Norge">
          <div className="flex flex-wrap gap-4">
            <Todo title="Bilde fra sanity" className="h-40 w-40" />
            <Todo title="Bilde fra sanity" className="h-40 w-40" />
            <Todo title="Bilde fra sanity" className="h-40 w-40" />
            <Todo title="Bilde fra sanity" className="h-40 w-40" />
          </div>
        </Todo>
      </div>
      <ContactForm />
    </>
  );
}

interface CardModuleProps {
  title: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}
const CardModule = ({ title, illustration, className }: CardModuleProps) => {
  return (
    <Todo
      display="inline-block"
      className={`border-none rounded text-white h-full w-full ${className}`}
      title=""
    >
      {illustration}
      <div className="font-semibold">{title}</div>
    </Todo>
  );
};
