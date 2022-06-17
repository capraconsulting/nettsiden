import { ContentAndImageBox } from "~/components/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";

export default function DetteKanVi() {
  return (
    <>
      <TitleAndText title="Våre tjenester og ekspertiser" titleAs="h1">
        Forskjellige utfordringer krever forskjellige løsninger. Vi tilbyr
        derfor to tjenester for å skape løsninger for deg og din bedrift.
      </TitleAndText>

      {/* Disse er de samme som brukes på hovedsiden */}
      <Todo badge className="w-full" title="Liflig" />
      <Todo badge className="w-full" title="Konsulenter" />

      <TitleAndText title="Teknologier" titleAs="h2">
        Vi i Capra er spesialister. Vi har tatt klare tekniske valg og blitt
        blant de beste innenfor våre fagfelt.
      </TitleAndText>

      <ContentAndImageBox title="Sky" image={undefined} height="40vw">
        I Capra spesialiserer vi oss innenfor Amazon Web Services og er én av
        fire bedrifter som er advanced tier consulting partnere i Norge. Vår
        dybdekunnskap på sky gjør at vi kan vi hjelpe deg på din reise opp i
        skyen, også om du bruker Microsoft Azure og Google Cloud.
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Backend"
        direction="right"
        image={undefined}
        height="40vw"
      >
        {
          "På backend har vi valgt å satse på Java-plattformen og Kotlin for å løse de store og tunge prosessene i kulissene. \n\n Hvorfor det? Vi har valgt markedets største, modne og levende språk. Ved å velge de språkene som utvikler seg raskest sørger vi for at vi alltid vil kunne levere nye og smartere løsninger som vi vet fungerer."
        }
      </ContentAndImageBox>

      <ContentAndImageBox title="Frontend" image={undefined} height="40vw">
        {
          "På frontend satser vi blant annet på TypeScript, JavaScript, React og Vue. \n\n Riktig bruk av rammeverk og fokus på framtidsrettet og testet kode, mener vi er   suksessfaktorer. Med rette applikasjoner som raskt kan endres og som er enkle å vedlikeholde, skaper vi brukeropplevelser i verdensklasse."
        }
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Teknisk arkitektur"
        direction="right"
        image={undefined}
        height="40vw"
      >
        {
          "Det er viktig å benytte riktig metodikk for å komme frem til en god arkitektur og god teknologi. Kodenære arkitekter kan teste ut funksjoner for å sikre at løsningene lar seg realisere og at rammene for en god implementasjon er der for utviklerne. \n\n Sentralt her er CI/CD, DevOps/NoOps, Microservices, IaC, DDD, Terraform og AWS. "
        }
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Team-, prosjektleder og smidig coach"
        image={undefined}
        height="40vw"
      >
        {
          "For å skape verdi raskt bør man bruke metodikker som sørger for at man fokuserer på de rette oppgavene, målene og skaper selvgående autonome team. Vi hjelper våre kunder med teamledelse, prosjektledelse, produktutvikling, smidig coaching, og organisasjonsutvikling. \n\n Stikkord her er Agile, Team Topologies, DDD, Accelerate, 5 Dysfunctions of a Team og Empowered."
        }
      </ContentAndImageBox>
    </>
  );
}
