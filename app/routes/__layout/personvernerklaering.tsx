import type { HeadersFunction } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { Todo } from "~/components/todo";
import { cacheControlHeaders } from "~/utils/cache-control";

export const headers: HeadersFunction = () => cacheControlHeaders;

export default function Personvernerklæring() {
  return (
    <article className="prose">
      <h1>Personvernerklæring</h1>

      <p className="lead">
        Denne personvernerklæringen forteller hvordan Capra Consulting AS samler
        inn og bruker personopplysninger.
      </p>
      <p>
        Capra Consulting AS, ved daglig leder, er behandlingsansvarlig for
        virksomhetens behandling av personopplysninger. Der det daglige ansvaret
        er delegert, kommer det fram under hvert enkelt punkt. Delegeringen
        omfatter kun oppgavene og ikke ansvaret. Erklæringen inneholder
        opplysninger du har krav på når det samles inn opplysninger fra
        nettstedet vårt, rekrutteringssystemet, salgssystemet
        (personopplysningsloven § 19) og generell informasjon om hvordan vi
        behandler personopplysninger (personopplysningsloven § 18 1. ledd).
      </p>

      <h2>Behandling av personopplysninger for ikke-ansatte</h2>
      <p>
        Det er 3 tilfeller hvor Capra innhenter persondata om
        eksterne/ikke-ansatte. Det ene tilfellet er rekruttering, hvor
        kandidater legges inn i rekrutteringssystemet. Det andre og tredje
        tilfellet er i salgssammenheng, hvor henholdsvis underkonsulenter og
        kunder legges inn i salgssystemet. I de to første tilfellene kan en
        kandidat/kunde/underkonsulent havne i systemene våre på to måter: a) Ved
        å registrere seg selv gjennom en utlyst søknad, eller b) Vedkommende
        blir lagt inn som følge av tips fra andre eller sourcing (LinkedIn,
        rekrutteringsbyrå, etc.). For kunder legges kontaktinfo inn så snart vi
        er i forhandlingsprosess med de.
      </p>

      <h3>Rekruttering</h3>
      <p>
        Avhengig av hvilke opplysninger kandidaten gir oss eller vi finner om
        kandidaten, samler vi blant annet inn følgende opplysninger: Navn,
        e-postadresse, telefonnummer, utdannelse, arbeidserfaring, URLer til
        relevante sosiale medium (som LinkedIn, GitHub, mv.), referansepersoner
        og opplastede dokumenter (som CV, søknadsbrev, karakterer, mv.).
      </p>

      <h4>Kandidat registrerer seg selv</h4>
      <ul>
        <li>
          Kandidaten må godta samtykke for å kunne sende inn søknad via
          søknadssidene våre.
        </li>
        <li>
          Opplysninger oppbevares i systemene så lenge de er oppdaterte og det
          er relevant å beholde de, men maksimalt 2 år såfremt samtykke er
          innhentet.
        </li>
      </ul>

      <h4>Kandidat blir tipset om til Capra uten sin viten</h4>
      <ul>
        <li>
          Vi tar kontakt med kandidater gjennom tips fra egne søk,
          nettverkstreff, anbefaling fra ansatte eller videresendte fra
          rekrutteringsbyrå.
        </li>
        <li>
          Vi innhenter samtykke senest 30 dager fra kandidatenes data blir
          behandlet av rekruttering. Opplysninger oppbevares i systemene så
          lenge de er oppdaterte og relevante å beholdemen maksimalt 2 år
          såfremt samtykke er innhentet.
        </li>
        <li>Uten innhentet samtykke blir kandidaten slettet etter 30 dager.</li>
        <li>
          Kandidater som er blitt tipset av ansatte før innføringen av den nye
          personvernlovgivningen har mottatt en informasjonsmail og vil bli
          slettet etter ønske fra kandidaten eller automatisk etter 2 år fra den
          nye personvernlovgivningen trådte i kraft.
        </li>
      </ul>

      <h3>Salg</h3>

      <p>
        Avhengig av hvilke opplysninger kunde eller underkonsulent gir oss eller
        vi finner om de, samler vi blant annet inn følgende opplysninger: Navn,
        e-postadresse, telefonnummer, utdannelse, arbeidserfaring.
      </p>

      <h4>Kundeinformasjon</h4>
      <ul>
        <li>
          I Capra lagrer vi personopplysninger om KAM og andre relevante
          kontaktpersoner hos kunde. Disse lagres så lenge kundeforholdet
          vedvarer.
        </li>
      </ul>

      <h4>Underkonsulent registrerer seg selv</h4>
      <ul>
        <li>
          Underkonsulenten får en automatisk generert beskjed om å samtykke til
          oppbevaring av persondata.
        </li>

        <li>
          Etter 10 år vil underkonsulenten få et varsel om man fremdeles ønsker
          å være registrert i vår database. Om de ikke ønsker dette, vil de bli
          slettet.
        </li>
      </ul>

      <h4>Underkonsulent blir tipset om til Capra uten sin viten</h4>
      <ul>
        <li>
          Salgsansvarlig har da ansvar for ukentlig å gå over underkonsulenter
          som er tipset om.
        </li>

        <li>
          Det skal da, senest 7 dager etter tips er registrert sendes ut en mail
          med info om personopplysningene vi har, med en forespørsel om å
          beholde disse.
        </li>
        <li>
          Om det ikke mottas samtykke innen 14 dager, vil underkonsulent bli
          slettet fra databasen.
        </li>
      </ul>
      <h2>Behandling av personopplysninger for ansatte</h2>

      <p>
        Capra Consulting AS behandler personopplysninger om sine ansatte for å
        administrere lønn og personalansvar. Rettslig grunnlag følger av
        personopplysningsloven § 8, første ledd og § 8 a), b) eller f) samt § 9
        a), b) og f). Det er Administrasjonen v/økonomiansvarlig som har det
        daglige ansvaret for dette. Det registreres nødvendige opplysninger for
        utbetaling av lønn, for eksempel grunndata, lønnsnivå, tidsregistrering,
        skatteprosent, skattekommune og fagforeningstilhørighet. Andre
        opplysninger om ansatte er knyttet til vedkommendes arbeidsinstruks og
        tilrettelegging av vedkommendes arbeid.
      </p>

      <p>
        Dessuten registreres det opplysninger i tilknytning til
        nøkkelkortadministrasjon av inn- og utpasseringer og opplysninger om
        tilgangsstyring i IT-systemene våre. Opplysningene hentes fra de ansatte
        selv. Opplysningene utleveres bare i forbindelse med lønnsutbetalinger
        og andre lovpliktige utleveringer. Sletterutiner for
        personalopplysninger følger regnskapsloven og arkivloven, all persondata
        vi ikke kan lagre under disse lovene fjernes etter siste arbeidsdag.
        Opplysninger om navn, stilling og arbeidsområde regnes å være offentlige
        opplysninger og kan publiseres på Capra Consulting AS sine nettsider.
        Informasjon om den ansatte, som ikke kreves arkivert av regnskapsloven
        og arkivloven, vil slettes så snart ansatte har gjennomført siste
        arbeidsdag.
      </p>

      <p>
        I Capra innhenter vi følgende personopplysninger fra våre ansatte til
        bruk i våre interne IT-systemer:
      </p>

      <ul>
        <li>Fornavn</li>
        <li>Etternavn</li>
        <li>Personnummer</li>
        <li>Adresse</li>
        <li>E-post</li>
        <li>Telefonnr</li>
        <li>Kontonummer</li>
        <li>Tidligere arbeidsgiver</li>
        <li>Nasjonalitet</li>
      </ul>

      <h2>Sikkerhet</h2>

      <p>
        Hver enkelt tredjepartssystem ivaretar sikkerheten for den dataen de
        behandler. Dette skal være dokumentert i henhold til hver enkelt
        leverandør av tredjepartssystemer sin databehandleravtale med Capra
        Consulting AS.
      </p>

      <h2>Rettigheter</h2>

      <p>
        Alle som spør har rett på grunnleggende informasjon om behandlinger av
        personopplysninger i en virksomhet etter personopplysningslovens § 18,
        1. ledd. Capra Consulting AS har gitt denne informasjonen i denne
        erklæringen, og vil henvise til den ved eventuelle forespørsler. De som
        er registrert i en av Capra Consulting AS sine systemer har rett på
        innsyn i egne opplysninger. Vedkommende har også rett til å be om at
        uriktige, ufullstendige eller opplysninger Capra Consulting AS ikke har
        adgang til å behandle blir rettet, slettet eller supplert. Krav fra den
        registrerte skal besvares kostnadsfritt og senest innen 30 dager.
      </p>

      <h2>Kontakt oss</h2>
      <p>
        For henvendelser knyttet til rettighetene til den registrerte, kan Capra
        Consulting AS kontaktes på:
      </p>
      <p>
        Capra Consulting AS
        <br />
        v/administrasjonsansvarlig
        <br />
        Stenersgata 2 <br />
        0184 Oslo
        <br />
        <br />
        <a href="mailto:post@capraconsulting.no">post@capraconsulting.no</a>
      </p>
      <Button
        variant="outline"
        href="/personvernerklaering.pdf?dl"
        title="Last ned Personvernerklæring som PDF"
        rel="noopener noreferrer"
        external
      >
        Last ned PDF
      </Button>
    </article>
  );
}
