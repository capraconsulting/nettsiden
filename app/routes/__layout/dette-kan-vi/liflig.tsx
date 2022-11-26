import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { TitleAndText } from "~/components/title-and-text";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { metaTags } from "~/utils/meta-tags";
import { DetteHarViGjortCard } from "../dette-har-vi-gjort";

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

export const loader = async () => {
  const [images, items] = await Promise.all([
    fetchImageAssets([
      "icon-competence-red",
      "icon-technical-red",
      "icon-time-red",
      "photo-money",
      "photo-money-spire",
      "photo-kontor-gjensidige",
      "photo-kontor-nrk",
    ]),
    sanityClient.query<SelvskrytExpanded>(
      `* [_type == "selvskryt"] { ..., filter[]-> }`,
    ),
  ]);

  return json({
    images,
    items: items.filter((item) =>
      item.filter.some((selvskrytFilter) => selvskrytFilter.title === "Liflig"),
    ),
  });
};

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "Skreddersydde IT-løsninger for bedriften din",
    description:
      "Du velger hva som skal bygges, vi vet hvordan! Hos oss får du en skreddersydd softwaretjeneste som alltid er oppdatert via en løpende kontrakt. Les mer >>",
  });

export default function Liflig() {
  const { images, items } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="flex w-full max-w-7xl flex-col items-center gap-12 sm:w-11/12">
        <TitleAndText
          title="Liflig - Skreddersydde IT-løsninger for bedriften din"
          titleAs="h1"
        >
          Nye utviklingsmodeller krever nye arbeidsmåter. Liflig er til for at
          du skal slippe og tenke på håndtering av bla. konsulenter, forvaltning
          og tekniske valg. Det er vår jobb!
        </TitleAndText>

        <div className="grid max-w-4xl grid-cols-1 gap-10 px-10 md:grid-cols-3">
          <IconTitleAndTextBlock
            title="Vi tar det tekniske"
            titleAs="h2"
            image={images["icon-technical-red"]}
          >
            Du slipper tekniske valg og kan fokusere på det du er god på.{" "}
            <strong>
              Vi tar oss av bygging, sikkerhet, forvaltning og teknologier.
            </strong>
          </IconTitleAndTextBlock>
          <IconTitleAndTextBlock
            title="Kort oppstartstid"
            titleAs="h2"
            image={images["icon-time-red"]}
          >
            Vi har ferdig utviklet infrastruktur som gjør at{" "}
            <strong>vi kan begynne å skrive kode fra dag 1.</strong>
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Kompetanse på laget"
            titleAs="h2"
            image={images["icon-competence-red"]}
          >
            Modellen til Liflig gjør at{" "}
            <strong>
              du betaler for færre konsulenter, men får tilgang til ekspertise
              fra flere.
            </strong>
          </IconTitleAndTextBlock>
        </div>
      </section>

      <section className="flex w-full max-w-7xl flex-col items-center gap-12 sm:w-11/12 md:gap-20">
        <TitleAndText title="Vi vil gjøre din jobb lettere!" titleAs="h2">
          Visste du at Liflig betyr behagelig og noe man finner glede i? Liflig
          er med andre ord følelsen når alle IT-systemer bare fungerer som det
          skal.
        </TitleAndText>

        <ContentAndImageBox
          title="Alltid tilgjengelig"
          image={images["photo-kontor-gjensidige"]}
          color="peach"
          height="40vw"
          direction="left"
        >
          Liflig-teamet sitter <span lang="en">in house</span> på Capra sitt
          hovedkontor i Oslo, du og din bedrift kan sitte akkurat hvor dere vil
          i landet. Du som kunde skriver rett og slett direkte til teamet hva du
          ønsker skal lages eller hva du opplever som feil. Første ledige i
          teamet vil raskt plukke oppgavene og løse de for deg. Hvordan
          oppgavene skal prioriteres velger du, men vi vil alltid rådgi deg om
          hva som er viktig f.eks. med tanke på sikkerhet. Du skal få lov til å
          drømme, mens vi tar oss av resten!
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Betal kun for det du trenger"
          image={images["photo-money-spire"]}
          color="lightBlue"
          height="40vw"
          direction="right"
        >
          Liflig er et team med teknologer, som til sammen utgjør all den
          kompetanse du trenger for å bygge den løsningen du ønsker. I
          motsetning til å leie et prosjektteam med konsulenter, hvor hver
          konsulent har hver sin ekspertise, booker du i Liflig den
          arbeidskapasiteten du trenger uten å spesifisere hvilken kompetanse du
          har behov for - du har alltid hele teamet og all kompetanse
          tilgjengelig. Altså med Liflig kan du få tilgang til eksperter på
          backend, UX, frontend, infrastruktur og arkitektur, men bare betale
          for arbeidskapasiteten til f.eks. 2 konsulenter!
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Ingen uforutsette kostnader!"
          image={images["photo-money"]}
          color="darkBlue"
          height="60vw"
          direction="left"
        >
          Siden du betaler for kapasitet og ikke enkelthoder, slipper du å
          forholde deg til sykdom, permisjoner og andre uforutsette hendelser
          livet garantert byr på. Vi jobber i team, så det vil alltid være noen
          som er klare til å ta over oppgaven. Resultatet er ingen forsinkelser
          i produksjon. Forvaltningsgjeld, den unødvendige tiden en utvikler
          bruker på å forvalte tjenesten og løse feil, slipper du også. Med
          riktig dokumentasjon, gode rutiner og at vi unngår å skape avhengighet
          til 1 person som sitter med all kunnskapen, sikrer vi at vi kan
          forvalte din tjeneste mer effektivt og enklere. For deg betyr det
          totalt sett en rimeligere tjeneste og forutsigbart kostnadsbilde.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Raskere utvikling"
          image={images["photo-kontor-nrk"]}
          color="bordeaux"
          height="40vw"
          direction="right"
        >
          Har du et IT-problem du helst skulle løst i dag? Gjennom ferdig
          utviklet infrastruktur og metode kan vi begynne å skrive kode så raskt
          som fra dag én! Vi har allerede utviklet rammene som trengs for å
          komme raskt igang med å skreddersy tjenesten til akkurat dine behov.
          Om du ønsker å ta over driften av tjenesten din på sikt er også det
          mulig. Vi har gode metoder for dokumentering, slik at en handover vil
          gå smidig.
        </ContentAndImageBox>
      </section>

      <section className="flex w-full max-w-7xl flex-col gap-12 sm:w-11/12">
        <TitleAndText title="Kundehistorier" titleAs="h2">
          Liflig leverer kontinuerlig verdi for kundene våre. Her har du noen
          eksempler på hva Liflig har hjulpet andre med.
        </TitleAndText>

        <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
          {items.map((x) => (
            <li key={x._id}>
              <DetteHarViGjortCard key={x._id} selvskryt={x} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
