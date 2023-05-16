import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";
import { fetchImageAssets } from "~/utils/sanity-image";

export const handle: CapraHandle = {
  contactFormTitle: "Ta kontakt!",
  contactFormDescription:
    "Fyll ut skjemaet så kontakter vi deg for en gratis smidig helsesjekk uten forpliktelser! Flere spørsmå? Ta kontakt med Tuva.",
  contactFormRepresentativesPredicate: (representative) =>
    representative.name.includes("Tuva"),
};

export async function loader() {
  const [images] = await Promise.all([
    fetchImageAssets(["photo-whiteboard-hga-sba"]),
  ]);

  return json(
    {
      images,
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
    image: data.images["photo-whiteboard-hga-sba"].src,
  });

export default function Component() {
  const { images } = useLoaderData<typeof loader>();
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
        <div className="scroll-smooth">
          <Button variant="solid" href="#kontakt-skjema">
            Få en smidig helsesjekk her!
          </Button>
        </div>
      </Section>

      <CapraImage
        className="w-screen max-w-7xl"
        image={images["photo-whiteboard-hga-sba"]}
      />

      <Section>
        <TitleAndText title="Hva er en smidig helsesjekk?" titleAs="h2">
          En smidig helsesjekk gir deg et øyeblikksbilde av hvor godt rigget
          virksomheten din er for fart, sammen med konkrete forslag til
          forbedring.
        </TitleAndText>
        <Button variant="solid" href="#kontakt-skjema">
          Book gratis smidig helsesjekk
        </Button>
      </Section>
      <Todo badge size="large" title="Steg bokser" />
      <Section>
        <TitleAndText title="Hva er en smidig helsesjekk?" titleAs="h2">
          En smidig helsesjekk gir deg et øyeblikksbilde av hvor godt rigget
          virksomheten din er for fart, sammen med konkrete forslag til
          forbedring.
        </TitleAndText>
        <Button variant="solid" href="/dette-kan-vi">
          Oversikt over alle tjenester
        </Button>
      </Section>
    </>
  );
}
