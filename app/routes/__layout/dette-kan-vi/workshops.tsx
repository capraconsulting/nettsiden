import type { PropsWithChildren } from "react";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CapraLink } from "~/components/capra-link";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
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
import { fetchImageAssets } from "~/utils/sanity-image";

export async function loader() {
  const [images, contactFormRepresentatives, companyImages] = await Promise.all(
    [
      fetchImageAssets([
        "icon-connected-people-red",
        "icon-medal-red",
        "icon-learning-light-bulb-red",
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

const courses = [
  {
    label: "Smidig helsesjekk (gratis)",
    link: {
      href: "/dette-kan-vi/workshops/smidighelsesjekk",
      label: "Les mer og bestill",
    },
  },
  {
    label: "Team Assessment Service",
  },
  {
    label: "Kanbankurs",
  },
];

export const meta: V2_ServerRuntimeMetaFunction = () =>
  metaTags({
    title: "Kurs og rådgivning",
    description:
      "Vi tilbyr kurs og rådgivning som kjente, norske selskaper allerede har benyttet seg av. Vi baserer alltid våre kurs og rådgivning på den nyeste forskningen, beste praksis og erfaring.",
  });

export default function Workshops() {
  const { images, contactFormRepresentatives, companyImages } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Section>
        <TitleAndText
          title="Kurs og rådgivning"
          titleAs="h1"
          className="max-w-4xl"
        >
          Vi tilbyr kurs og rådgivning som kjente, norske selskaper allerede har
          benyttet seg av. Vi baserer alltid våre kurs og rådgivning på den
          nyeste forskningen, beste praksis og erfaring.
        </TitleAndText>
        <div className="grid max-w-4xl grid-cols-1 gap-10 px-10 md:grid-cols-3">
          <IconTitleAndTextBlock
            title="Beste praksis"
            titleAs="h2"
            image={images["icon-medal-red"]}
          >
            Vi oppdaterer oss kontinuerlig på beste praksis i markedet, og gir
            forslag basert på din kultur og domene.
          </IconTitleAndTextBlock>
          <IconTitleAndTextBlock
            title="Læring først"
            titleAs="h2"
            image={images["icon-learning-light-bulb-red"]}
          >
            I Capra er vi veldig opptatte av kontinuerlig læring. Derfor tester
            vi alltid nye rammeverk og måter å jobbe på internt først.
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Tett koblet fagmiljø"
            titleAs="h2"
            image={images["icon-connected-people-red"]}
          >
            Et lite, men sterkt fokusert fagmiljø, preget av åpenhet og deling,
            gir deg kortere vei til relevante erfaringer.
          </IconTitleAndTextBlock>
        </div>
      </Section>
      <Section className="gap-8">
        <Text>
          Dette er ikke generiske kurs eller workshopper. Vi skreddersyr ved å
          kombinere innsikt og forarbeid for å forstå ditt selskap, sammen med
          vårt tunge fagmiljø sin erfaring med beste praksis i markedet. Siden
          vi skreddersyr kurset må vi nesten møte deg og bli bedre kjent først.
          Det gir oss også muligheten til å eventuelt skreddersy en pakke om det
          er behov for det.
        </Text>
      </Section>
      <Section>
        <div className="flex w-2/3 max-w-2xl flex-col">
          <h3 className="mb-4 flex cursor-pointer border-b border-b-[#ccc] pb-2 text-2xl font-bold">
            Kurs og Workshops
          </h3>
          <ul className="flex flex-col gap-3">
            {courses.map((x) => (
              <li
                key={x.label}
                className="text-md flex w-full justify-between md:text-xl"
              >
                <p>{x.label}</p>
                {x.link ? (
                  <CapraLink
                    href={x.link.href}
                    target="_blank"
                    className="no-underline hover:underline"
                  >
                    {x.link.label}
                  </CapraLink>
                ) : (
                  <p>Kommer snart</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <div className="w-screen">
        <ContactForm
          title="Ta kontakt!"
          description="Fyll ut skjemaet så kontakter vi deg for å finne riktig kurs eller workshop for deg og ditt selskap!
Flere spørsmål? Ta kontakt med Tuva."
          representatives={contactFormRepresentatives.filter((representative) =>
            representative.name.includes("Tuva"),
          )}
        />
      </div>

      <Section>
        <ViJobberMedStoreAktørerINorge
          companyImages={companyImages}
          actions={
            <div className="flex w-full max-w-2xl flex-col items-center justify-evenly gap-4 sm:flex-row">
              <Button href="/dette-kan-vi/it-konsulenter" variant="solid">
                Lei en konsulent
              </Button>
              <Button
                href="/dette-kan-vi/liflig"
                variant="solid"
                width="content"
              >
                Abonner på et produktteam
              </Button>
            </div>
          }
        />
      </Section>
    </>
  );
}

const Text: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="w-[95%] max-w-2xl text-center text-lg font-light text-secondary-80 md:text-xl lg:text-2xl">
      {children}
    </p>
  );
};
