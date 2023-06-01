import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { Pattern } from "~/components/pattern/pattern";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import { useHydrated } from "~/hooks/use-hydrated";
import {
  fetchCompanyImages,
  ViJobberMedStoreAktørerINorge,
} from "~/routes/__layout/index";
import {
  ContactForm,
  fetchContactFormRepresentatives,
} from "~/routes/api.contact";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { classNames } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";

export async function loader() {
  const [images, contactFormRepresentatives, companyImages] = await Promise.all(
    [
      fetchImageAssets([
        "photo-whiteboard-hga-sba",
        "social-image-smidighelsesjekk",
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

export const meta: V2_MetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title:
      "Skaper du faktisk forretningsverdi med teknologien i selskapet ditt?",
    description:
      "Få et øyeblikksbilde av hvor godt rigget virksomheten din er for fart, sammen med konkrete forslag til forbedring!",
    image: data.images["social-image-smidighelsesjekk"].src,
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

        <Button width="content" variant="solid" href="#kontakt-skjema">
          Få en smidig helsesjekk her!
        </Button>

        <div className="relative overflow-hidden">
          <CapraImage
            className="aspect-[3.8/2] w-screen max-w-7xl origin-bottom-right scale-[1.2] object-cover object-bottom"
            image={images["photo-whiteboard-hga-sba"]}
          />

          <div className="absolute right-12 bottom-16 w-[50%] lg:min-h-[200px] lg:w-[40%]">
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
        <Button width="content" variant="solid" href="#kontakt-skjema">
          Book gratis smidig helsesjekk
        </Button>
      </Section>
      <Todo size="large" title="Steg bokser" />
      <Section>
        <InformationCard className="flex w-screen max-w-7xl flex-col items-center bg-peach-20">
          Med vår smidig helsesjekk følger det{" "}
          <strong className="font-bold text-red">ingen forpliktelser.</strong>{" "}
          Det skal sies at vi er såpass trygge på vår ekspertise at vi tror og
          håper dere vil fortsette samarbeidet i dag eller i fremtiden.
        </InformationCard>

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
        <ViJobberMedStoreAktørerINorge companyImages={companyImages} />
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
        "flex items-center justify-center py-16 px-16 text-secondary",
      )}
    >
      <div className="max-w-3xl">
        <p className="text-left">{children}</p>
      </div>
    </div>
  );
};
