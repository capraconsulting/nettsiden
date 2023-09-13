import type { HTMLProps, PropsWithChildren } from "react";
import React from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import classNames from "classnames";

import Checked from "~/assets/icons/check.svg";
import Cross from "~/assets/icons/cross.svg";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import QuoteBlock from "~/components/quote-block";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import {
  ContactForm,
  fetchContactFormForLifligRepresentatives,
} from "~/routes/api.contact";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { fetchImageAssets } from "~/utils/sanity-image";

export const handle: CapraHandle = {};

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

export const loader = async () => {
  const [images, contactFormRepresentatives, items] = await Promise.all([
    fetchImageAssets([
      "illustration-money",
      "illustration-lock",
      "illustration-group",
      "icon-quote",
      "photo-money",
      "photo-money-spire",
      "liflig-europris",
      "liflig-tavler",
      "liflig-tomra",
      "liflig-fnf",
      "photo-kontor-nrk",
    ]),
    fetchContactFormForLifligRepresentatives(),
    getSanityClient().query<SelvskrytExpanded>(
      `* [_type == "selvskryt"] { ..., filter[]-> }`,
    ),
  ]);

  return json({
    images,
    contactFormRepresentatives,
    items: items.filter((item) =>
      item.filter.some((selvskrytFilter) => selvskrytFilter.title === "Liflig"),
    ),
  });
};

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: V2_ServerRuntimeMetaFunction = () =>
  metaTags({
    title: "Skreddersydde IT-løsninger for bedriften din",
    description:
      "Du velger hva som skal bygges, vi vet hvordan! Hos oss får du en skreddersydd softwaretjeneste som alltid er oppdatert via en løpende kontrakt. Les mer >>",
  });

const TableThingy = () => {
  const TD = ({ children }: PropsWithChildren) => (
    <td className="px-1 py-4 lg:px-2">{children}</td>
  );
  const TH = ({
    children,
    first = false,
  }: PropsWithChildren<{ first?: boolean }>) => (
    <th
      className={classNames("truncate px-1 lg:px-2", {
        "!w-[30%]": first,
        "!w-[17%]": !first,
      })}
    >
      {children}
    </th>
  );
  const IMG = ({ className, alt, ...rest }: HTMLProps<HTMLImageElement>) => (
    <img
      {...rest}
      alt={alt}
      className={classNames("mx-auto h-6 w-6 overflow-hidden", className)}
    />
  );

  return (
    <table className="w-full min-w-[500px] max-w-5xl">
      <thead>
        <tr>
          <TH first></TH>
          <TH>Liflig</TH>
          <TH>Utviklingsteam</TH>
          <TH>Low-code</TH>
          <TH>Hyllevare</TH>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-blue-50">
          <TD>Skreddersøm</TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
        </tr>
        <tr>
          <TD>Inkludert sikkerhet og GDPR</TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
        </tr>
        <tr className="bg-blue-50">
          <TD>Leverandøruavhengighet</TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
        </tr>
        <tr>
          <TD>Kun faste kostnader</TD>
          <TD>
            <IMG src={Checked} alt="Checked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
          <TD>
            <IMG src={Cross} alt="Unchecked" />
          </TD>
        </tr>
      </tbody>
    </table>
  );
};

export default function Liflig() {
  const { images, contactFormRepresentatives } = useLoaderData<typeof loader>();
  return (
    <>
      <Section>
        <TitleAndText
          title="Liflig - Skreddersydde IT-løsninger for bedriften din"
          titleAs="h1"
          className="max-w-5xl"
        >
          Nye utviklingsmodeller krever nye arbeidsmåter. Liflig er til for at
          du skal slippe og tenke på håndtering av bla. konsulenter, forvaltning
          og tekniske valg. Det er vår jobb!
        </TitleAndText>

        <div className="grid max-w-7xl grid-cols-1 gap-10 px-10 md:grid-cols-3">
          <IconTitleAndTextBlock
            title="Fleksible produktteam"
            titleAs="h2"
            image={images["illustration-group"]}
            imageClassName="!max-h-none h-48"
          >
            Vi skalerer teamene våre etter dine behov for kompetanse og
            kapasitet. Om du ønsker å skalere opp eller ned, tilpasser vi
            månedsprisen
          </IconTitleAndTextBlock>
          <IconTitleAndTextBlock
            title="Vi tar ansvaret"
            titleAs="h2"
            image={images["illustration-lock"]}
            imageClassName="!max-h-none h-48"
          >
            Vi tar ansvaret for å overholde lovverk, sikkerhet og oppetid. Vi
            sikrer at løsningen er oppdater og enkel å videreutvikle,
            vedlikeholde og drifte.
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Forutsigbar prismodell"
            titleAs="h2"
            image={images["illustration-money"]}
            imageClassName="!max-h-none h-48"
          >
            Fast månedspris betyr at du enkelt kan budsjettere uten uforutsette
            kostnader. Vi håndterer alt av sykdom, oppsigelse og ansettelse.
          </IconTitleAndTextBlock>
        </div>
      </Section>

      <QuoteBlock
        caption="Andreas Tegle, Produktleder i Tavler"
        image={images["icon-quote"]}
      >
        Jeg kan gi dere en løs spesifikasjon og dra på ferie i en måned og være
        trygg på at det blir bra.
      </QuoteBlock>

      <Section className="!items-start overflow-x-auto">
        <TitleAndText
          title="Hva får du av Liflig?"
          titleAs="h1"
          className="max-w-5xl"
        />
        <TableThingy />
      </Section>

      <Section className="md:gap-20">
        <TitleAndText
          title="Utfordringer som vi har løst"
          titleAs="h2"
          className="max-w-5xl"
        />

        <ContentAndImageBox
          title="Europris"
          titleAs="h3"
          image={images["liflig-europris"]}
          color="peach"
          height="40vh"
          direction="right"
          readMoreLink={{
            linkText: "Les mer",
            to: "/dette-har-vi-gjort/europris",
          }}
        >
          Data om varelager, prising og kundeadferd, var spredt mellom mange
          systemer. Det ga utfordringer for GDPR, sikkerhet, fart og var åpenbar
          tapt forretningskritisk innsikt.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Finans Norge"
          titleAs="h3"
          image={images["liflig-fnf"]}
          color="darkBlue"
          height="40vh"
          direction="left"
          readMoreLink={{
            linkText: "Les mer",
            to: "/dette-har-vi-gjort/finans-norge",
          }}
        >
          Trengte flere forretningskritiske systemer som automatiserte og
          reduserte behandlingstid. Tjenestene blir brukt av brannvesen,
          helsenett og Norges største forsikringsaktører.
        </ContentAndImageBox>

        <ContentAndImageBox
          title="Tavler"
          titleAs="h3"
          image={images["liflig-tavler"]}
          color="lightBlue"
          height="40vh"
          direction="right"
        >
          Gikk fra å levere en tjeneste med whiteboard, penn og møter, til å
          levere et totalt digitalt verktøy som kjernetjeneste!
        </ContentAndImageBox>
      </Section>

      <div className="-mb-12 w-screen">
        <ContactForm
          title="Vil din bedrift prøve fremtidens leveransemodell?"
          description="Fyll ut skjemaet så kontakter vi deg!"
          representatives={contactFormRepresentatives}
        />
      </div>
    </>
  );
}
