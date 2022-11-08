import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CapraImage } from "~/components/capra-image";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { ContentAndSlogansBox } from "~/components/content-and-slogans-box";
import { TitleAndText } from "~/components/title-and-text";
import { cacheControlHeaders } from "~/utils/cache-control";
import type { Images } from "~/utils/dataRetrieval";
import { fetchImageAssets } from "~/utils/dataRetrieval";

export const meta: MetaFunction = () => ({});

export const loader = async () => {
  const images = await fetchImageAssets([
    "cloud",
    "backend",
    "frontend",
    "tech-architecture",
    "project-lead",

    "icon-brain",
    "icon-tech",
    "icon-time",
    "illustration-square-dots",

    "icon-cloud",
    "icon-counsel",
    "icon-book",
    "illustration-square-dots2",
  ]);
  return json(
    {
      images,
    },
    { headers: cacheControlHeaders },
  );
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function DetteKanVi() {
  const { images } = useLoaderData<typeof loader>();
  return (
    <>
      <TitleAndText title="Våre tjenester og ekspertiser" titleAs="h1">
        Forskjellige utfordringer krever forskjellige løsninger. Vi tilbyr
        derfor to tjenester for å skape løsninger for deg og din bedrift.
      </TitleAndText>

      <LifligPitchAndSloganBox direction="left" images={images} />
      <KonsulenterPitchAndSloganBox direction="right" images={images} />

      <TitleAndText id="teknologier" title="Teknologier" titleAs="h2">
        Vi i Capra er spesialister. Vi har tatt klare tekniske valg og blitt
        blant de beste innenfor våre fagfelt.
      </TitleAndText>

      <ContentAndImageBox
        title="Sky"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images.cloud.imageUrl}
            alt={images.cloud.alt}
          />
        }
        height="40vw"
        color="peach"
      >
        I Capra spesialiserer vi oss innenfor Amazon Web Services og er én av
        fire bedrifter som er advanced tier consulting partnere i Norge. Vår
        dybdekunnskap på sky gjør at vi kan vi hjelpe deg på din reise opp i
        skyen, også om du bruker Microsoft Azure og Google Cloud.
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Backend"
        direction="right"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images.backend.imageUrl}
            alt={images.backend.alt}
          />
        }
        height="40vw"
        color="darkBlue"
        // Re-enable when the backend page is implemented
        // readMoreLink={{ to: "/dette-kan-vi/backend" }}
      >
        {
          "På backend har vi valgt å satse på Java-plattformen og Kotlin for å løse de store og tunge prosessene i kulissene. \n\n Hvorfor det? Vi har valgt markedets største, modne og levende språk. Ved å velge de språkene som utvikler seg raskest sørger vi for at vi alltid vil kunne levere nye og smartere løsninger som vi vet fungerer."
        }
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Frontend"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images.frontend.imageUrl}
            alt={images.frontend.alt}
          />
        }
        height="40vw"
        color="lightBlue"
        readMoreLink={{ to: "/dette-kan-vi/frontend" }}
      >
        {
          "På frontend satser vi blant annet på TypeScript, JavaScript, React og Vue. \n\n Riktig bruk av rammeverk og fokus på framtidsrettet og testet kode, mener vi er   suksessfaktorer. Med rette applikasjoner som raskt kan endres og som er enkle å vedlikeholde, skaper vi brukeropplevelser i verdensklasse."
        }
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Teknisk arkitektur"
        direction="right"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images["tech-architecture"].imageUrl}
            alt={images["tech-architecture"].alt}
          />
        }
        height="40vw"
        color="bordeaux"
      >
        {
          "Det er viktig å benytte riktig metodikk for å komme frem til en god arkitektur og god teknologi. Kodenære arkitekter kan teste ut funksjoner for å sikre at løsningene lar seg realisere og at rammene for en god implementasjon er der for utviklerne. \n\n Sentralt her er CI/CD, DevOps/NoOps, Microservices, IaC, DDD, Terraform og AWS. "
        }
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Team-, prosjektleder og smidig coach"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images["project-lead"].imageUrl}
            alt={images["project-lead"].alt}
          />
        }
        height="40vw"
        color="peach"
      >
        {
          "For å skape verdi raskt bør man bruke metodikker som sørger for at man fokuserer på de rette oppgavene, målene og skaper selvgående autonome team. Vi hjelper våre kunder med teamledelse, prosjektledelse, produktutvikling, smidig coaching, og organisasjonsutvikling. \n\n Stikkord her er Agile, Team Topologies, DDD, Accelerate, 5 Dysfunctions of a Team og Empowered."
        }
      </ContentAndImageBox>
    </>
  );
}

export const LifligPitchAndSloganBox = ({
  direction,
  images,
}: {
  direction: "left" | "right";
  images: Images<
    "icon-tech" | "icon-brain" | "icon-time" | "illustration-square-dots"
  >;
}) => {
  return (
    <ContentAndSlogansBox
      direction={direction}
      title="Liflig"
      titleAs="h2"
      sloganColor="bordeaux"
      slogans={[
        {
          title: "Vi tar det tekniske",
          imageUrl: images["icon-tech"].imageUrl,
        },
        {
          title: "Kompetanse på laget",
          imageUrl: images["icon-brain"].imageUrl,
        },
        {
          title: "Kort oppstartstid",
          imageUrl: images["icon-time"].imageUrl,
        },
      ]}
      illustrationImageUrl={images["illustration-square-dots"].imageUrl}
      readMoreHref="/dette-kan-vi/liflig"
    >
      Du har ideene - la vårt inhouse team bygge og forvalte hele tjenesten for
      deg
    </ContentAndSlogansBox>
  );
};

export const KonsulenterPitchAndSloganBox = ({
  direction,
  images,
}: {
  direction: "left" | "right";
  images: Images<
    "icon-cloud" | "icon-counsel" | "icon-book" | "illustration-square-dots2"
  >;
}) => {
  return (
    <ContentAndSlogansBox
      direction={direction}
      title="Konsulenter"
      titleAs="h2"
      sloganColor="lightBlue"
      slogans={[
        {
          title: "Opp i skyen",
          imageUrl: images["icon-cloud"].imageUrl,
        },
        {
          title: "Vi tør å rådgi",
          imageUrl: images["icon-counsel"].imageUrl,
        },
        {
          title: "Faglig sterke",
          imageUrl: images["icon-book"].imageUrl,
        },
      ]}
      illustrationImageUrl={images["illustration-square-dots2"].imageUrl}
      readMoreHref="/dette-kan-vi/it-konsulenter"
    >
      Trenger du flere gode hoder på teamet ditt? Vi gir deg IT-konsulenter med
      spisskompetanse!
    </ContentAndSlogansBox>
  );
};
