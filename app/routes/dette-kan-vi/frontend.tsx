import { ContactForm } from "~/components/contact-form";
import { ContentAndImageBox } from "~/components/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";

export default function Frontend() {
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
        image={undefined}
        height="50vw"
        contentBoxClassName="bg-light-blue"
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
        image={undefined}
        height="40vw"
        contentBoxClassName="bg-bordeaux text-peach-20"
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

      <ContactForm title="Trenger du frontend spisskompetanse på ditt team?" />
    </>
  );
}
