import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { TitleAndText } from "~/components/title-and-text";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { SelvskrytCard } from "../dette-har-vi-gjort";

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

export const loader = async () => {
  // TODO: Use the actual images
  const [images, items] = await Promise.all([
    fetchImageAssets(["icon-graph-up", "icon-idea-bulb"]),
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

export default function Liflig() {
  const { images, items } = useLoaderData<typeof loader>();
  return (
    <div className="flex w-full flex-col gap-12">
      <TitleAndText
        title="Liflig - Skreddersydde IT-løsninger for bedriften din
"
        titleAs="h1"
      >
        Nye utviklingsmodeller krever nye arbeidsmåter. Liflig er til for at du
        skal slippe og tenke på håndtering av bla. konsulenter, forvaltning og
        tekniske valg. Det er vår jobb!
      </TitleAndText>

      <div className="grid max-w-4xl grid-cols-1 gap-20 px-10 sm:grid-cols-2">
        <IconTitleAndTextBlock
          title="Vi tar det tekniske"
          titleAs="h2"
          image={images["icon-graph-up"]}
        >
          Du slipper tekniske valg og kan fokusere på det du er god på.{" "}
          <strong>
            Vi tar oss av bygging, sikkerhet, forvaltning og teknologier.
          </strong>
        </IconTitleAndTextBlock>
        <IconTitleAndTextBlock
          title="Kort oppstartstid"
          titleAs="h2"
          image={images["icon-graph-up"]}
        >
          Vi har ferdig utviklet infrastruktur som gjør at{" "}
          <strong>vi kan begynne å skrive kode fra dag 1.</strong>
        </IconTitleAndTextBlock>

        <IconTitleAndTextBlock
          title="Kompetanse på laget"
          titleAs="h2"
          image={images["icon-graph-up"]}
        >
          Modellen til Liflig gjør at{" "}
          <strong>
            du betaler for færre konsulenter, men får tilgang til ekspertise fra
            flere.
          </strong>
        </IconTitleAndTextBlock>
      </div>

      <TitleAndText title="Vi vil gjøre din jobb lettere!" titleAs="h2">
        Visste du at Liflig betyr behagelig og noe man finner glede i? Liflig er
        med andre ord følelsen når alle IT-systemer bare fungerer som det skal.
      </TitleAndText>

      <ContentAndImageBox
        title="Alltid tilgjengelig"
        image={images["icon-graph-up"]}
        color="peach"
        height="40vw"
      >
        Liflig-teamet sitter inhouse på Capra sitt hovedkontor i Oslo, du og din
        bedrift kan sitte akkurat hvor dere vil i landet. Du som kunde skriver
        rett og slett direkte til teamet hva du ønsker skal lages eller hva du
        opplever som feil. Første ledige i teamet vil raskt plukke oppgavene og
        løse de for deg. Hvordan oppgavene skal prioriteres velger du, men vi
        vil alltid rådgi deg om hva som er viktig f.eks. med tanke på sikkerhet.
        Du skal få lov til å drømme, mens vi tar oss av resten!
      </ContentAndImageBox>

      {/* TODO: The other ones */}

      <TitleAndText title="Kundehistorier" titleAs="h2">
        Liflig leverer kontinuerlig verdi for kundene våre. Her har du noen
        eksempler på hva Liflig har hjulpet andre med.
      </TitleAndText>

      <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
        {items.map((x) => (
          <li key={x._id}>
            <SelvskrytCard key={x._id} selvskryt={x as SelvskrytExpanded} />
          </li>
        ))}
      </ul>
    </div>
  );
}
