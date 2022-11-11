import type { HeadersFunction } from "@remix-run/server-runtime";

import { cacheControlHeaders } from "~/utils/cache-control";

export const headers: HeadersFunction = () => cacheControlHeaders;

export default function Informasjonskapsler() {
  return (
    <article className="prose">
      <h1> Hva er informasjonskapsler?</h1>
      <p className="lead">
        «Informasjonskapsler» eller «cookies» er noe nesten alle nettsider
        bruker i dag. Fra og med 1. juli 2013 må alle norske nettsteder som
        benytter seg av informasjonskapsler innhente samtykke fra brukeren om at
        disse kan lagres på brukerens kommunikasjonsenhet, jf. ekomloven § 2-7b.
      </p>
      <p>
        Ved å bruke dette nettstedet samtykker du i at vi kan sette
        informasjonskapsler i din nettleser.
      </p>
      <p>
        En informasjonskapsel er en liten tekstfil som lagres lokalt på
        brukerens kommunikasjonsenhet når et nettsted åpnes. Informasjonskapsler
        kan ha en rekke formål, hvor informasjonen som lagres blant annet kan
        benyttes til å gjøre nettstedet mer brukervennlig og tilpasset den
        enkelte bruker. Når en bruker besøker et nettsted, spør
        informasjonskapselen om tillatelse til å bli lagret lokalt på
        kommunikasjonsenheten.De fleste moderne nettlesere er innstilt for å
        akseptere informasjonskapsler automatisk, men brukeren kan når som helst
        trekke tilbake sitt samtykke. Dette gjøres ved å endre innstillingene
        for informasjonskapsler i den enkelte nettleser. Mange nettsteder,
        inkludert denne, vil uten aksept for informasjonskapsler ikke kunne
        fungere optimalt.
      </p>
      <h2>Tredjepartsinformasjonskapsler</h2>
      <p>
        Nedenfor kan du lese om de ulike informasjonskapslene fra
        tredjepartsleverandører som vi benytter på vårt nettsted. Ved å følge de
        enkelte koblingene kan du lese mer om leverandørens retningslinjer for
        personvern.
      </p>
      <p>
        Vi benytter{" "}
        <a
          href="http://www.google.com/intl/en/policies/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics
        </a>{" "}
        slik at vi kan analysere aktiviteten på nettstedet vårt, og på bakgrunn
        av dette, optimalisere nettstedet for våre brukere. Google setter
        informasjonskapsler for å hente informasjon om hvordan besøkende bruker
        nettstedet. Informasjonskapslene innhenter anonym informasjon om den
        besøkende, som hvordan nettstedet blir brukt, hvilket nettsted brukeren
        kommer fra, utgangsside, antall og lengde på besøk, og hvilket
        operativsystem eller kommunikasjonsenhet som benyttes.
      </p>
      <p>
        Vi benytter, eller kan i fremtiden benytte, oss av moduler eller
        plug-ins for å dele innhold fra tjenester som for eksempel{" "}
        <a
          href="https://www.facebook.com/about/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        ,{" "}
        <a
          href="https://twitter.com/en/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        ,{" "}
        <a
          href="https://www.google.com/intl/en/policies/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps
        </a>
        ,{" "}
        <a
          href="https://www.google.com/intl/en/policies/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google+
        </a>{" "}
        eller{" "}
        <a
          href="https://www.google.com/intl/no/policies/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        . Disse kan sette informasjonskapsler for å identifisere brukere ved de
        ulike tjenestene eller huske tidligere preferanser fra tidligere besøk,
        som for eksempel hvilket lydnivå som siste ble benyttet i en
        YouTube-avspiller eller om brukeren har likt vår Facebookside.
      </p>
      <p>
        Dette nettstedet benytter informasjonskapsel fra Google og Facebook for
        å kunne markedsføre relevant innhold for bruker. Informasjonen som
        lagres i kapselen er anonym og kan ikke spores til brukeren personlig.
        Informasjonen som lagres er blant annet brukerens nettleser,
        surfemønster i annonsenettverket, hvilke annonser brukeren har blitt
        vist og hyppigheten av disse.
      </p>
      <p>Slik kan du slette informasjonskapsler/cookies i din nettleser:</p>
      <h3>Internett Explorer</h3>
      <ul>
        <li>Velg Verktøy</li>
        <li>Velg Alternativer for internett</li>
        <li>Velg Generelt-fanen</li>
        <li>Velg Slett… (leserlogg)</li>
        <li>
          huk av for Bevar data for webområder i Favoritter, Midlertidige
          internett-filer, informasjonskapsler/cookies, Logg
        </li>
      </ul>
      <h3>Mozilla Firefox</h3>
      <ul>
        <li>Velg Verktøy</li>
        <li>Velg Innstillinger</li>
        <li>Velg Personvern-fanen</li>
        <li>Velg Slette nylig historikk – trykk på Detaljer</li>
        <li>
          huk av for Nettlesing-og nedlastningshistorikk, Skjema og
          søkehistorikk, informasjonskapsler/cookies, Hurtiglager for nettsider
        </li>
        <li>Velg Tidsperiode du vil slette for og velg Slett nå</li>
      </ul>
      <h3>Safari</h3>
      <ul>
        <li>Velg Tannhjul (Bruker du Mac trykker du på Safari)</li>
        <li>Velg Nullstill Safari</li>
        <li>Fjern alle Avhukninger</li>
        <li>
          Huk av for Slett logg, Tøm bufferen, Fjern alle informasjonskapsler
        </li>
        <li>Opera</li>
        <li>Trykk på Opera logoen</li>
        <li>Velg Innstillinger</li>
        <li>Velg Slett private data…</li>
        <li>Trykk på detaljer, fjern alle avhukninger</li>
        <li>
          Huk av for Slett midlertidige infokapsler, Tøm hele mellomlageret,
          Fjern historikk over besøkte sider, Fjern historikk over nedlastede
          filer
        </li>
      </ul>
      <h3>Chrome</h3>
      <ul>
        <li>Velg Alternativer (Valg for Mac)</li>
        <li>Trykk på fanen Avansert.</li>
        <li>Trykk på Slett nettleserdata</li>
        <li>
          Huk av for Tøm nettlesingslogg, Tøm nedlastningsloggen, Tøm bufferen,
          Slett informasjonskapsler og andre moduldata for nettsteder
        </li>
      </ul>
    </article>
  );
}
