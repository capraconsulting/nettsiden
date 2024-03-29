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
  fetchContactFormRepresentatives,
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
      fetchImageAssets([
        "photo-whiteboard-hga-sba",
        [
          "social-image-smidighelsesjekk",
          (builder) => builder.width(1200).format("jpg"),
        ],
      ]),
      fetchContactFormRepresentatives(),
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
    title:
      "Skaper du faktisk forretningsverdi med teknologien i selskapet ditt?",
    description:
      "Få et øyeblikksbilde av hvor godt rigget virksomheten din er for fart, sammen med konkrete forslag til forbedring!",

    image: data?.images["social-image-smidighelsesjekk"].src,
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
          title="Skaper du faktisk forretningsverdi med teknologien i selskapet ditt?"
          titleAs="h1"
        >
          Noen ganger kan det være verdifullt å bli evaluert utenfra. Nå tilbyr
          vi gratis smidig helsesjekk slik at du kan finne ut hvordan dere
          ligger an og hva deres potensiale for å øke verdiskapningen er!
        </TitleAndText>

        <Button width="content" variant="solid" href="#kontaktskjema">
          Få en smidig helsesjekk her!
        </Button>

        <div className="relative overflow-hidden">
          <CapraImage
            className="aspect-[3/2] w-screen max-w-7xl origin-bottom-right scale-[1.2] object-cover object-bottom lg:aspect-[3.8/2]"
            image={images["photo-whiteboard-hga-sba"]}
          />

          <div className="md:absolute md:bottom-16 md:right-12 md:w-[50%] lg:min-h-[200px] lg:w-[40%]">
            <InformationCard className="bg-light-blue-20">
              Capra har siden 2005 spesialisert seg på smidig utvikling,
              transformasjon og ledelse i noen av Norges største virksomheter,
              inkludert vår egen.
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
        <TitleAndText title="Hva er en smidig helsesjekk?" titleAs="h2">
          En smidig helsesjekk gir deg et øyeblikksbilde av hvor godt rigget
          virksomheten din er for fart, sammen med konkrete forslag til
          forbedring.
        </TitleAndText>
        <Button width="content" variant="solid" href="#kontaktskjema">
          Book gratis smidig helsesjekk
        </Button>

        <ol
          className={classNames(
            "flex w-11/12 max-w-3xl flex-col gap-8 lg:gap-12",
            // TODO: Connect the steps with lines
            // "[&>*]:before:self-stretch [&>*]:before:border [&>*]:before:border-main",
          )}
        >
          <StepBox
            titleAs="h3"
            title="Steg 1: Avklaringer"
            description="Første møte blir vi enige om"
            items={[
              "Hvilket område ved virksomheten som skal vurderes",
              "Hvilke nøkkelpersoner som skal intervjues",
              "Fremdriftsplan og møter",
            ]}
          />
          <StepBox
            titleAs="h3"
            title="Steg 2: Innsiktsfase"
            description="Vi henter informasjon ved"
            items={[
              "Gjennomføre 6 kvalitative intervjuer",
              "Utsendelse av vår utarbeidede interne spørreundersøkelse",
              "Innhenting av KPIer/målsetninger og annen data",
            ]}
          />
          <StepBox
            titleAs="h3"
            title="Steg 3: Bearbeidelse"
            items={[
              "Vi bruker innsikten og kalibrerer opp mot vårt referansemateriale basert på erfaring og metodikk som er godt forankret i forskning.",
            ]}
          />
          <StepBox
            titleAs="h3"
            title="Steg 4: Sluttrapport"
            description="Basert på stegene over leverer vi en rapport på følgende"
            items={[
              "Overordnet vurdering av smidighet",
              "Anbefalte tiltak med prioritering",
              "Kvalitativ kost/nytte-vurdering av tiltak",
              "Beskrivelse av forretningseffekt av tiltakene",
            ]}
          />
        </ol>
      </Section>

      <Section>
        <div className="relative flex w-11/12 max-w-7xl flex-col items-center">
          <InformationCard className="flex w-full max-w-7xl flex-col items-center bg-peach-20">
            Med vår smidig helsesjekk følger det{" "}
            <strong className="font-bold text-red">ingen forpliktelser.</strong>{" "}
            Det skal sies at vi er såpass trygge på vår ekspertise at vi tror og
            håper dere vil fortsette samarbeidet i dag eller i fremtiden.
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
          description="Fyll ut skjemaet så kontakter vi deg for en gratis smidig helsesjekk uten forpliktelser! Flere spørsmål? Ta kontakt med Tuva."
          representatives={contactFormRepresentatives.filter((representative) =>
            representative.name.includes("Tuva"),
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
