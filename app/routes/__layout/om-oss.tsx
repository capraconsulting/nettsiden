import { CallToActionBox } from "~/components/call-to-action-box";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import type { ValueProposition } from "~/components/value-wheel/value-wheel";
import { ValueWheel } from "~/components/value-wheel/value-wheel";

export default function OmOss() {
  return (
    <>
      <TitleAndText title="Om oss" titleAs="h1">
        Vi er et IT-konsulentselskap bestående av de beste folkene i landet. Her
        jobber vi like fullt med hjertet som med hjernen.
      </TitleAndText>

      <InfoBox title="Hvem er vi?">
        Capra ble startet i 2005 og er i dag fremdeles et uavhengig og heleid
        norskt selskap . Vår rolle er å inspirere gjennom innovativ teknologi og
        løsninger, ikke bare for kundene våre, men hele bransjen. Vi tilegner,
        deler, bruker og utvikler kunnskap og løsninger for oss selv og for
        kundene våre.
      </InfoBox>

      <section className="flex flex-col gap-12">
        <TitleAndText title="Verdier driver oss i riktig retning" titleAs="h2">
          Verdiene er egenskaper som vi setter pris på hos våre kollegaer. Vi
          bruker verdiene når vi tar beslutninger, hver eneste dag!
        </TitleAndText>

        <ValueWheel
          title="Våre Verdier"
          valuePropositions={valuePropositions}
        />
      </section>

      <TitleAndText title="Vi skal bli passe store" titleAs="h2">
        Vi vil være et selskap hvor alle kjenner alle, hvor vi er små nok til å
        være smidig, men samtidig store nok til å ha innflytelse. Derfor skal vi
        ikke bli fler enn 140 personer. Det er akkurat nok folk til å fylle det
        området under!
      </TitleAndText>

      <Todo badge className="w-11/12 h-[600px]" title="human bubles" />

      <TitleAndText title="Capra er organisert i team" titleAs="h2">
        Vi bryr oss ikke om titler eller hieraki. Derfor har vi ingen
        ledergruppe, men heller team som består av kollegaer som har frivillig
        meldt seg til å gjøre Capra bedre.
      </TitleAndText>

      <Todo badge className="w-11/12 h-[400px]" title="Forskjelige teams" />

      <TitleAndText title="Visjoner for fremtiden" titleAs="h2">
        De neste årene skal vi fokusere på fire hovedområder som skal gjøre oss,
        våre ansatte og våre kunder bedre.
      </TitleAndText>

      <Todo
        badge
        className="w-11/12 h-[400px]"
        title="Organisasjon | Forretningsutvikling | Markedsføring | Kompetanse"
      />

      <InfoBox
        title={`Hva betyr egentlig "Capra"?`}
        className="bg-light-blue-20"
      >
        Navnet Capra betyr geit på latin. Geiter er naturlig nysgjerrige og
        intelligente , og de lever gjerne i flokk , samtidig som de har evnen
        til å være selvstendige . Det syns vi egentlig er ganske beskrivende for
        de geitene som jobber i Capra.
      </InfoBox>

      <TitleAndText title="Vi dyrker innovasjon" titleAs="h2">
        Det å lære og utvikle oss, sammen med frihet til å prøve ut ideer, gir
        grobunn for nyskapning og forandring. Det er noe av det viktigste vi
        gjør i Capra.
      </TitleAndText>

      <ContentAndImageBox
        title="Bratte læringskurver"
        image={undefined}
        height="40vw"
        color="peach"
      >
        For å bli de beste på våre fagområder, må vi kunne lære. Derfor setter
        vi av tid til fagsamlinger og inviduell læring .
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Du eier ideene dine"
        image={undefined}
        height="40vw"
        direction="right"
        color="lightBlue"
      >
        Vi vet at mange liker å holde på med hobby prosjekter. Så lenge
        prosjektet ikke faller under Capras anvendelsesområde så er ideen din.
        Det betyr at den appen eller SaaS-løsningen du bygger er din og bare din
        .
      </ContentAndImageBox>

      <TitleAndText title="Tenk selv, fremfor å ha regler" titleAs="h2">
        Kloke mennesker tar kloke valg! Vi vil tenke selv fremfor å ha mange
        regler . Vi tror det inspirerer til løsninger litt utenfor boksen.
      </TitleAndText>

      <Todo badge className="py-0 px-0 w-[550px]" title="">
        <div className="w-full flex flex-col gap-8">
          <Todo
            size="small"
            title="Vi jobber hvor vi vil, så lenge kunden er happy."
          />
          <Todo
            size="small"
            title="Vi styrer egne kompetanse- og hardwarebudsjetter."
          />
          <Todo
            size="small"
            title="Vi har ingen obligatoriske internaktiviteter - tiden vår styrer vi selv."
          />
        </div>
      </Todo>

      <CallToActionBox
        title="Vi arrangerer en kick-ass konferanse"
        description="Vi elsker å lære bort det vi kan. Derfor arrangerer vi internkonferanse hvert år!"
        linkText="Les om CapraCon"
      />

      <TitleAndText title="Kontakt" titleAs="h2">
        Vi vil gjerne høre fra deg!
      </TitleAndText>

      <Todo badge className="w-full" title="Kontakt oss kort" />
    </>
  );
}

interface InfoBoxProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
const InfoBox = ({ title, children, className }: InfoBoxProps) => {
  return (
    <Todo
      badge
      title=""
      className={`border-none bg-peach-20 w-11/12 max-w-7xl ${className ?? ""}`}
    >
      <div className="uppercase font-bold text-main">{title}</div>
      <div>{children}</div>
    </Todo>
  );
};

export const valuePropositions: ValueProposition[] = [
  {
    id: "value-proposition-1",
    textColor: "#03173E",
    text: "fleksibel",
    content: `Vi har fokus på frihet og er åpen for endringer.`,
    color: "#F8D3BC",
  },
  {
    id: "value-proposition-2",
    textColor: "#03173E",
    text: "stolt",
    content: `Vi har yrkesstolthet og føler eierskap. 
  Vi tar ansvar utover det som forventes av oss.`,
    color: "#C1DCE5",
  },
  {
    id: "value-proposition-3",
    textColor: "#fff",
    text: "lærende",
    content: `Vi lærer mye og fort, og 
  vi lærer bort. Vi søker forbedring og 
  utfordrer etablerte sannheter.`,
    color: "#EA5154",
  },
  {
    id: "value-proposition-4",
    textColor: "#fff",
    text: "uselvisk",
    content: `Vi er inkluderende og vi bryr oss. Vi unner og 
  feirer andres suksess.`,
    color: "#03173E",
  },
  {
    id: "value-proposition-5",
    textColor: "#fff",
    text: "åpen",
    content: `Vi er uformelle og ærlige. 
  Vi deler alt, med mindre norsk lov sier at vi ikke kan.`,
    color: "#5D2332",
  },
];
