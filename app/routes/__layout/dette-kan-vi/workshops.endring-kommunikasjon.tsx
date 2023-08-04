import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { Pattern } from "~/components/pattern/pattern";
import { Section } from "~/components/section";
import { StepBox } from "~/components/step-box";
import { TitleAndText } from "~/components/title-and-text";
import { useHydrated } from "~/hooks/use-hydrated";
import {
  fetchCompanyImages,
  ViJobberMedStoreAktørerINorge,
} from "~/routes/__layout/index";
import {
  ContactForm,
  fetchContactFormForWorkshopRepresentatives,
} from "~/routes/api.contact";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { classNames } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";

export const handle: CapraHandle = {
  scrollSmooth: true,
};

export async function loader() {
  const [images, contactFormRepresentatives, companyImages] = await Promise.all(
    [
      fetchImageAssets(["photo-workshop-endring-kommunikasjon-anne-anita"]),
      fetchContactFormForWorkshopRepresentatives(),
      fetchCompanyImages(),
    ],
  );

  return json(
    {
      images,
      contactFormRepresentatives,
      companyImages,
    },
    {
      headers: cacheControlHeaders,
    },
  );
}

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: V2_ServerRuntimeMetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title: "Fra dårlig kommunikasjon til tillit og skaperglede",
    description:
      "Vi drømmer alle om det gode teamsamarbeidet hvor vi snakker det samme språket, spiller hverandre gode og kjenner på en god flyt. Det er ikke alltid like lett å få til i praksis. Vi hjelper deg med å komme i gang!",

    image: data?.images["photo-workshop-endring-kommunikasjon-anne-anita"].src,
    card: "summary_large_image",
  });

export default function Component() {
  const { images, contactFormRepresentatives, companyImages } =
    useLoaderData<typeof loader>();
  const isHydrated = useHydrated();

  return (
    <>
      <Section>
        <TitleAndText
          title="Fra dårlig kommunikasjon til tillit og skaperglede"
          titleAs="h1"
        >
          Vi drømmer alle om det gode teamsamarbeidet hvor vi snakker det samme språket, spiller hverandre gode og kjenner på en god flyt.
          Det er ikke alltid like lett å få til i praksis.
          Vi hjelper deg med å komme i gang!
        </TitleAndText>

        <Button width="content" variant="solid" href="#kontaktskjema">
          Book workshop her
        </Button>

        <div className="relative overflow-hidden">
          <CapraImage
            className="md:aspect-[3/2] md:w-screen md:max-w-7xl md:origin-top md:scale-[1.5] md:object-cover md:object-bottom lg:aspect-[3.8/2]"
            image={images["photo-workshop-endring-kommunikasjon-anne-anita"]}
          />
          <div className="md:absolute md:bottom-16 md:right-12 md:w-[50%] lg:min-h-[200px] lg:w-[40%]">
            <InformationCard className="bg-light-blue-20">
              Anne Landro er en rutinert tjenestedesigner som har erfaring med hvordan selv ett ord kan velte et helt prosjekt.
              <br /> <br />
              Anita Jenbergsen har lang erfaring med ledelse og implementeringsprosesser med design. Hun vet hva som skjer når team ikke kommuniserer godt.
            </InformationCard>

            {isHydrated && (
              <div className="absolute bottom-[60px] right-[60px]">
                <Pattern
                  width={100}
                  height={100}
                  color="fill-main"
                  pattern="offset-grid"
                  shape="rect"
                />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <TitleAndText title="Vil du forbedre ditt team?" titleAs="h2">
          Få de rette verktøyene til å skape endring når team har dårlig kommunikasjon og ikke klarer å levere som forventet.
          Anne Landro og Anita Jenbergsen har skreddersydd 3 pakker med variasjon til hvor dypt du vil gå.
        </TitleAndText>
        <Button width="content" variant="solid" href="#kontaktskjema">
          Skap endring for ditt team
        </Button>

        <ol
          className={classNames(
            "flex w-11/12 max-w-3xl flex-col gap-8 lg:gap-12",
          )}
        >
          <StepBox
            titleAs="h3"
            title="Pakke 1"
            description="Denne pakken er en bli inspirert og øv på verktøyene-pakke. En speedintro til god kommunikasjon og skaperglede:"
            items={[
              "God blanding mellom korte foredrag om teori og korte øvelser hvor gruppen(e) øver på å bruke de.",
              "Teorier vi bygger på er blant annet fra Amy Edmondson og 5 Dysfunctions of a Team.",
              "Deltagerne trenger ikke å være et fast team. Enkeltpersoner i et team kan delta og hente inspirasjon som de tar med til sitt team for å gjøre det bedre.",
              "Workshop på 4 timer (inkludert pauser).",
            ]}
            extraInfo={["5000 kr per pers"]}
          />
          <StepBox
            titleAs="h3"
            title="Pakke 2"
            description="Denne pakken er for å  forbedre teamsamarbeidet:"
            items={[
              "God blanding mellom korte foredrag om teori og verktøy",
              "Teorier vi bygger på er blant annet fra Amy Edmondson og 5 dysfunctions of a team.",
              "Deltakerne burde være  ett eller  to team som vil ha mer hjelp",
              "Målet er å bruke verktøy for å  skape tillit, åpenhet og trygghet nok til at vi tør å ta de gode diskusjonene.",
              "Workshop på 1 dag (inkludert pauser).",
            ]}
            extraInfo={["7000 KR PER PERS/", "45 000 KR For  13 PERS"]}
          />
          <StepBox
            titleAs="h3"
            title="Pakke 3"
            description="Denne pakken er for å dere som ønsker å gå i dybden for å rydde opp i større utfordringer i team:"
            items={[
              "God blanding mellom korte foredrag om teori og verktøy",
              "Teorier vi bygger på er blant annet fra Amy Edmondson og 5 dysfunctions of a team.",
              "Deltakerne burde være  ett eller  to team som vil ha mer hjelp",
              "Målet er å bruke verktøy for å  skape tillit, åpenhet og trygghet nok til at vi tør å ta de gode diskusjonene, gå inn i en konflikt når det er nødvendig, og  gi hverandre tilbakemelding når det er behov for det.",
              "Workshop på 2 dager (inkludert pauser).",
            ]}
            extraInfo={["10 000 KR PER PERS"]}
          />
        </ol>
      </Section>

      <Section>
        <div className="relative flex w-11/12 max-w-7xl flex-col items-center">
          <InformationCard className="flex w-full max-w-7xl flex-col items-center bg-peach-20">
            Dette er perfekt for kick-off for team etter en ferie eller når man skal starte nye prosjekter.
            Det er også for team som står litt fast eller trenger en liten restart. {" "}
            <strong className="font-bold text-red">
              Vi skreddersyr alltid etter ditt behov.
            </strong>{" "}
          </InformationCard>

          {isHydrated && (
            <>
              <div className="absolute left-[-30px] top-[-30px]">
                <Pattern
                  width={100}
                  height={100}
                  color="fill-light-blue"
                  pattern="offset-grid"
                  shape="rect"
                />
              </div>
              <div className="absolute bottom-[60px] right-[60px]">
                <Pattern
                  width={100}
                  height={100}
                  color="fill-bordeaux"
                  pattern="offset-grid"
                  shape="rect"
                />
              </div>
            </>
          )}
        </div>

        <Button width="content" variant="solid" href="/dette-kan-vi">
          Oversikt over alle tjenester
        </Button>
      </Section>

      <div className="w-screen">
        <ContactForm
          title="Ta kontakt!"
          description="Fyll ut skjemaet så kontakter vi deg for å sette opp og finne ut hvilken pakke som passer!
          Flere spørsmål? Ta kontakt med Anita eller Anne."
          representatives={contactFormRepresentatives.filter(
            (representative) =>
              representative.name.includes("Anita") ||
              representative.name.includes("Anne"),
          )}
        />
      </div>

      <Section>
        <ViJobberMedStoreAktørerINorge
          companyImages={companyImages}
          actions={
            <Button href="/dette-har-vi-gjort" variant="solid">
              Dette har vi gjort
            </Button>
          }
        />
      </Section>
    </>
  );
}

const InformationCard = ({
                           className,
                           children,
                         }: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center px-16 py-16 text-secondary",
      )}
    >
      <div className="max-w-3xl">
        <p className="text-left">{children}</p>
      </div>
    </div>
  );
};

