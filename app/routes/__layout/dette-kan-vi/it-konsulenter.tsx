import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { CallMeForm } from "~/routes/api.call-me";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { metaTags } from "~/utils/meta-tags";
import { DetteHarViGjortCard } from "../dette-har-vi-gjort";

export const handle: CapraHandle = {
  contactFormTitle: "Trenger din bedrift kompetanse på laget?",
};

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

export const loader = async () => {
  const [images, items] = await Promise.all([
    fetchImageAssets([
      "icon-cloud-red",
      "icon-counseling-red",
      "icon-book-red",
      "photo-capracon-aca",
      "photo-monitors-and-person",
      "photo-whiteboard-and-person",
      "photo-kontor-ten",
    ]),
    getSanityClient().query<SelvskrytExpanded>(
      `* [_type == "selvskryt"] { ..., filter[]-> }`,
    ),
  ]);

  return json({
    images,
    items: items.filter((item) =>
      item.filter.some(
        (selvskrytFilter) => selvskrytFilter.title === "Konsulent",
      ),
    ),
  });
};

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "Utleie av konsulenter - IT-konsulenter",
  });

export default function ItKonsulenter() {
  const { images, items } = useLoaderData<typeof loader>();

  return (
    <>
      <Section>
        <TitleAndText title="IT-Konsulenter" titleAs="h1">
          En Capra-konsulent er alltid forberedt og oppdatert på de nyeste
          metodene og teknologiene.
        </TitleAndText>
        <div className="grid max-w-4xl grid-cols-1 gap-20 px-10 sm:grid-cols-3">
          <IconTitleAndTextBlock
            title="Opp i skyen"
            titleAs="h2"
            image={images["icon-cloud-red"]}
          >
            <strong>
              Over halvparten av våre konsulenter er sertifiserte{" "}
            </strong>{" "}
            på sky! Flere har dyp erfaring fra noen av de mest{" "}
            <strong>innovative implementeringene i Norge!</strong>
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Tør å rådgi"
            titleAs="h2"
            image={images["icon-counseling-red"]}
          >
            Vi tar <strong>stolthet </strong>i faget vårt og ansvarfor
            løsningene vi er med å skape,{" "}
            <strong>vi tør å utfordre dine valg på veien.</strong>
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Faglig sterke"
            titleAs="h2"
            image={images["icon-book-red"]}
          >
            Vi ønsker at kunder skal benytte oss fordi{" "}
            <strong>vi kan noe spesifikt, </strong>
            ikke for å få «en til». Vi tar helst roller der vi kan ha stor
            påvirkningskraft
          </IconTitleAndTextBlock>
        </div>
      </Section>
      <Section className="md:gap-20">
        <TitleAndText title="Få kompetanse med på laget!" titleAs="h2">
          Vi mener konsulenttjenester bør være mye mer enn bare kapasitet. En
          IT-konsulent fra oss gir deg mer enn du forventer.
        </TitleAndText>

        <ContentAndImageBox
          title="Løsninger for ditt domene"
          titleAs="h3"
          image={images["photo-capracon-aca"]}
          color="bordeaux"
          height="40vw"
          direction="left"
        >
          Det ligger i Capras kultur å brenne for de oppgavene der løsningen
          ikke er gitt. Det er nemlig der vår kunnskap kan utgjøre en forskjell.
          Vi har kunder innen mange forskjellige domener som bla. NRK,
          Gjensidige, Vy og Apcoa Parkering. For å forstå deg som kunde er det
          viktig å vite hva som gir verdiskapning for dere spesielt. Da må vi
          komme skikkelig godt under huden deres; Få et innblikk i deres domene
          og hva som gjør det spesielt. Vi finner det unike i deres bedrift og
          dyrker dette, og på denne måten skaper vi sammen systemer som gjør at
          dere oppnår en sterkere posisjon i markedet.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Vi tar ansvar"
          titleAs="h3"
          image={images["photo-monitors-and-person"]}
          color="peach"
          height="40vw"
          direction="right"
        >
          Vi gir deg konsulenter som tør å rådgi deg om alternative
          arbeidsmåter, prinsipper, metoder og teknologier. Det gjør vi selv om
          rådet vi gir betyr mindre arbeid for våre konsulenter. For oss handler
          det om faglig stolthet, integritet og ærlighet. Vi aksepterer
          selvfølgelig alltid din beslutning og er kloke nok til å innse når vi
          skal gi oss. Gjennom å ta ansvar utover rollen vi har, skaper verdi og
          fornøyde kunder.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Vi vil gjøre deg bedre"
          titleAs="h3"
          image={images["photo-whiteboard-and-person"]}
          color="lightBlue"
          height="40vw"
          direction="left"
        >
          I Capra er vi flinke til å dele det vi kan. Denne kulturen tar vi med
          oss ut på oppdrag hos deg. Sett gjerne Capra-konsulenter på team med
          dine faste ansatte, vi ønsker å inspirere og gi de rundt oss den
          kunnskapen de trenger for å oppnå de mest kick-ass løsningene. Målet
          vårt er at du ikke skal trenge oss på sikt, men bli autome og
          selvdrevne. Så har du en IT-avdeling i dag, men mangler kompetanse,
          bør du vurdere en IT-konsulent fra Capra.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Blant i beste i bransjen"
          titleAs="h3"
          image={images["photo-kontor-ten"]}
          color="darkBlue"
          height="40vw"
          direction="right"
        >
          Vi mener at ekstremt flinke mennesker trives god sammen og blir raskt
          de beste. Derfor ansetter Capra kun disse menneskene. Vi har altså
          valgt å satse på de beste i bransjen, med høy kompetanse. Skal vi
          kunne konkurrere over tid på kompetanse, må vi også være bedre på
          læring enn konkurrenter. Vi er konsulenter fordi vi liker å lære, og
          ved å sørge for den bratteste læringskurven fortsetter vi å gjøre
          hverandre best.
        </ContentAndImageBox>
      </Section>
      <Section>
        <TitleAndText title="Kundehistorier" titleAs="h2">
          Våre konsulenter bygger mange spennende tjenester. Under kan du lese
          noen av dem.
        </TitleAndText>

        <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
          {items.map((x) => (
            <li key={x._id}>
              <DetteHarViGjortCard key={x._id} selvskryt={x} />
            </li>
          ))}
        </ul>
      </Section>
      <CallMeForm titleAs="h2" />
      <div /> {/* Add some whitespace */}
    </>
  );
}
