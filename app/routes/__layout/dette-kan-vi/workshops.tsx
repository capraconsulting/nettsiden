import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

import { CapraImage } from "~/components/capra-image";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Author } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { formatPhoneNumber } from "~/utils/misc";

function cropper(builder: ImageUrlBuilder): ImageUrlBuilder {
  return builder.crop("center").fit("crop").width(660).height(515);
}

// TODO: This should perhaps be done in Sanity somehow?
const contactSlug = "stein-otto-svorstoel";

export async function loader() {
  const [images, contacts] = await Promise.all([
    fetchImageAssets([
      "icon-competence-red",
      "icon-technical-red",
      "icon-time-red",
      ["photo-people-and-dog", cropper],
      ["photo-whiteboard-hga-sba", cropper],
    ]),
    getSanityClient().query<Author>(
      `* [_type == "author" && employee == true && slug.current == "${contactSlug}"] | order(name){ ..., filter[]-> }`,
    ),
  ]);

  console.log(contacts);

  return json({
    images,
    contact: contacts[0]
      ? {
          name: contacts[0].name,
          phone: contacts[0].phone,
          email: contacts[0].email,
          image:
            contacts[0].image && urlFor(contacts[0].image).size(210, 160).url(),
        }
      : undefined,
  });
}

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "TODO",
    description: "TODO",
  });

export default function Workshops() {
  const { images, contact } = useLoaderData<typeof loader>();
  return (
    <>
      <Section>
        <TitleAndText title="Kurs og rådgivning" titleAs="h1">
          Capra tilbyr en analyse av hvordan din organisasjon jobber i dag, og
          baser på denne legger vi frem forslag til eksperimenter for å nå
          selskapets mål oftere, få mer ut av teamene og de ansatte, samt øke
          trivselen på jobb.
        </TitleAndText>
        <div className="grid max-w-4xl grid-cols-1 gap-10 px-10 md:grid-cols-3">
          <IconTitleAndTextBlock
            title="Beste praksis"
            titleAs="h2"
            image={images["icon-technical-red"]}
          >
            Vi oppdaterer oss kontinuerlig på beste praksis i markedet, og gir
            forslag basert på din kultur og domene.
          </IconTitleAndTextBlock>
          <IconTitleAndTextBlock
            title="Læring først"
            titleAs="h2"
            image={images["icon-time-red"]}
          >
            I Capra er vi veldig opptatte av kontinuerlig læring. Derfor tester
            vi alltid nye rammeverk og måter å jobbe på internt først.
          </IconTitleAndTextBlock>

          <IconTitleAndTextBlock
            title="Tett koblet fagmiljø"
            titleAs="h2"
            image={images["icon-competence-red"]}
          >
            Et lite men sterkt fokusert fagmiljø, preget av åpenhet og deling,
            gir deg kortere vei til relevante erfaringer.
          </IconTitleAndTextBlock>
        </div>
      </Section>
      <Section className="gap-16">
        <p className="w-[95%] max-w-md text-center text-lg font-light text-secondary-80 md:text-xl lg:max-w-lg lg:text-2xl">
          Vi tilbyr workshopper og kurs som flere norske selskaper allerede har
          benyttet seg av, med temaer som:
        </p>
        <ContentAndImageBox
          title="Team"
          image={images["photo-people-and-dog"]}
          height="35vw"
          direction="left"
          color="peach"
        >
          Hva må man tenke på dersom man ser behovet for et nytt team? Vi
          fasiliterer en komplett prosess , med et sterkt fokus på å etablere
          team med sterk psykologisk trygghet for langvarig og høy
          leveransekraft. Sammen med teamet etablerer vi en skikkelig
          teamkontrakt, et team-API og målstyring.
        </ContentAndImageBox>
        <ContentAndImageBox
          title="Smidig tankegang"
          image={images["photo-whiteboard-hga-sba"]}
          height="35vw"
          direction="right"
          color="lightBlue"
        >
          Hvorfor skal man egentlig bry seg om <span lang="en">agility</span> og
          smidighet? Vi drar gjennom bakgrunnen, prinsippene og verdiene, hvor
          det passer og ikke passer, samt hvordan legge til rette for et{" "}
          <span lang="en">growth mindset</span>.
        </ContentAndImageBox>
      </Section>
      {contact && (
        <Section>
          <div className="flex w-[710px] max-w-[90%] gap-7">
            {contact.image && <CapraImage src={contact.image} alt="" />}
            <div className="flex flex-col justify-between">
              <p>
                Ta kontakt med oss for et uforpliktende møte hvor vi sammen
                finner ut hva akkurat deres behov er:
              </p>
              <div>
                <div className="font-semibold">{contact.name}</div>
                {contact.email && (
                  <div className="font-light">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                )}
                {contact.phone && (
                  <div className="font-light">
                    <a href={`tel:${contact.phone}`}>
                      {formatPhoneNumber(contact.phone)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
