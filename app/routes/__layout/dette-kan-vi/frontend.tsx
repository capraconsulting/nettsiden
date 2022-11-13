import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";

export const handle: CapraHandle = {
  contactFormTitle: "Trenger du frontend spisskompetanse på ditt team?",
};

export const loader = async () => {
  const images = await fetchImageAssets([
    "photo-laughing-sara",
    "photo-mingling-capracon",
  ]);
  return json({ images }, { headers: cacheControlHeaders });
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function Frontend() {
  const { images } = useLoaderData<typeof loader>();
  return (
    <>
      <TitleAndText title="Hvorfor frontend?" titleAs="h1">
        Frontend er det vanlige folk har mest forhold til. Det er her de store
        brukeropplevelsene skapes. Om det gjelder et internsystem, hjemmeside
        eller nettbutikk, er frontend absolutt noe alle selskaper bør investere
        i. En god frontendopplevelse kan være forskjellen på å vinne og tape
        kunder. Har du en robust frontendløsning i dag er du godt rigget for å
        være konkurransedyktig i markedet.
      </TitleAndText>

      <ContentAndImageBox
        title="Løsningen"
        image={images["photo-laughing-sara"]}
        height="50vw"
        color="lightBlue"
      >
        For å bygge en robust løsning trenger du gode frontend-utviklere som
        hjelper deg med å velge riktig arkitektur. Riktig arkitektur sørger
        blant annet for at det går lynraskt fra du trykker enter til nettsiden
        dukker opp i vinduet ditt og for muligheter til å bygge det du trenger
        effektivt. I frontendverdenen endres teknologiene i et raskt tempo.
        Rammeverk, bibliotek og verktøy brukes i sammenheng med hvilket behov
        man har for løsningen. Noen av teknologiene vi har valgt å spesialisere
        oss på er TypeScript, React, Vue og Svelte. Ikke bare er dette blant de
        rammeverkene som brukes av noen av verdens største selskap, som Facebook
        og Instagram, men er de som utvikleres og moderniseres raskest.
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Våre utviklere"
        image={images["photo-mingling-capracon"]}
        height="40vw"
        color="bordeaux"
        direction="right"
      >
        I dag skaper våre frontend utviklere kick-ass brukeropplevelser hos bla.
        Gjensidige, Amedia og NRK, og vi mener at suksessoppskriften er våre
        evner til å ta i bruk riktig rammeverk og fokus på fremtidsrettet,
        modulær og testet kode. Disse faktorene er det viktigste grunnlaget for
        å skape applikasjoner som er dynamiske, tilpasningsdyktige og enkle å
        vedlikeholde. Teknologier og arkitekturer er der jo bare for å tjene et
        større formål: å hjelpe brukeren å få gjort jobben sin trygt, raskt og
        effektivt. Og Capra har selvfølgelig de mest brukerorienterte frontend
        utviklerene som er å oppdrive!
      </ContentAndImageBox>
    </>
  );
}
