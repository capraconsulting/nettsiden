import type { PropsWithChildren } from "react";
import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
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
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { formatPhoneNumber } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";

function cropper(builder: ImageUrlBuilder): ImageUrlBuilder {
  return builder.crop("center").fit("crop").width(660).height(515);
}

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
      `* [_type == "author" && employee == true && "tpu-contact-us" in placement] | order(name){ ..., filter[]-> }`,
    ),
  ]);

  return json(
    {
      images,
      contact: contacts[0]
        ? {
            name: contacts[0].name,
            phone: contacts[0].phone,
            email: contacts[0].email,
            image:
              contacts[0].image &&
              urlFor(contacts[0].image).size(210, 160).url(),
          }
        : undefined,
    },
    {
      headers: cacheControlHeaders,
    },
  );
}

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: V2_MetaFunction = () =>
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
          basert på denne legger vi frem forslag til forbedringer for å nå
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
            Et lite, men sterkt fokusert fagmiljø, preget av åpenhet og deling,
            gir deg kortere vei til relevante erfaringer.
          </IconTitleAndTextBlock>
        </div>
      </Section>
      <Section className="gap-8">
        <Text>
          Vi tilbyr kurs og rådgiving som kjente, norske selskaper allerede har
          benyttet seg av. Dette er basert på den nyeste forskningen, beste
          praksis og erfaringer fra Capra og andre kunder.
        </Text>
        <Text>
          Du sitter igjen med de beste forutsetningene for å lykkes med å bygge
          psykologisk trygge team med høy leveransekraft, målstyring og gode
          samarbeidsformer med andre.
        </Text>
        <Text>
          Dette er ikke et generisk kurs om teamledelse eller smidige
          transformasjoner. Vi skreddersyr ved å kombinere innsikt og forarbeid
          for å forstå ditt selskap, sammen med vårt tunge fagmiljø sin erfaring
          med beste praksis i markedet. Siden vi skreddersyr kurset må vi nesten
          møte deg og bli bedre kjent først, men vi har også muligheten til å
          tilpasse og skalere opp og ned.
        </Text>
      </Section>
      <Section className="gap-16">
        <ContentAndImageBox
          title="Team"
          image={images["photo-people-and-dog"]}
          height="35vw"
          direction="left"
          color="peach"
        >
          Hva må man tenke på dersom man ser behovet for et nytt team? Vi
          fasiliterer en komplett prosess, med et sterkt fokus på å etablere
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
          <span lang="en">growth mindset</span> gjennom praktiske øvelser.
        </ContentAndImageBox>
      </Section>
      {contact && (
        <Section>
          <div className="flex w-[710px] max-w-[90%] gap-7">
            {contact.image && (
              <CapraImage
                src={contact.image}
                alt=""
                className="hidden sm:block"
              />
            )}
            <div className="flex flex-col justify-between gap-4">
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

const Text: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="w-[95%] max-w-2xl text-center text-lg font-light text-secondary-80 md:text-xl lg:text-2xl">
      {children}
    </p>
  );
};
