import type { PropsWithChildren } from "react";
import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { BubbleGrid } from "~/components/bubbles/bubble-grid";
import { fetchEmployeeImages } from "~/components/bubbles/capra-helper.server";
import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraImage } from "~/components/capra-image";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import IconTitleAndTextBlock from "~/components/icon-title-and-text-block";
import { TitleAndText } from "~/components/title-and-text";
import type { ValueProposition } from "~/components/value-wheel/value-wheel";
import { ValueWheel } from "~/components/value-wheel/value-wheel";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author, JobCategory } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import type { BrandColor } from "~/utils/constants";
import { BRAND_BG_AND_FG_COLORS } from "~/utils/constants";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { metaTags } from "~/utils/meta-tags";
import { classNames } from "~/utils/misc";
import { AnsattCard } from "./ansatte";

type AuthorExpanded = Omit<Author, "filter"> & { filter: JobCategory[] };

export const loader = async () => {
  const [images, employeeImages, contactUsEmployees] = await Promise.all([
    fetchImageAssets([
      "icon-graph-up",
      "icon-idea-bulb",

      // For AnsattCard
      "icon-website",
      "icon-twitter",
      "icon-linkedin",
      "icon-github",

      // Iconer til Visjoner
      "icon-vision-competence",
      "icon-vision-marketing",
      "icon-vision-organization",
      "icon-vision-development",
    ]),
    fetchEmployeeImages(),
    sanityClient.query<AuthorExpanded>(
      `* [_type == "author" && employee == true && "contact-us" in placement] | order(name){ ..., filter[]-> }`,
    ),
  ]);

  return json(
    { images, employeeImages, contactUsEmployees },
    { headers: cacheControlHeaders },
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "Innovasjon og teknologi i fokus - Om oss",
  });

export default function OmOss() {
  const { images, employeeImages, contactUsEmployees } =
    useLoaderData<typeof loader>();
  return (
    <>
      <TitleAndText title="Om oss" titleAs="h1">
        Vi er et IT-konsulentselskap bestående av de beste folkene i landet. Her
        jobber vi like fullt med hjertet som med hjernen.
      </TitleAndText>

      <InfoBox title="Hvem er vi?">
        Capra ble <strong>startet i 2005</strong> og er i dag fremdeles et{" "}
        <strong>uavhengig og heleid norskt selskap</strong>. Vår rolle er å
        inspirere gjennom innovativ teknologi og løsninger, ikke bare for
        kundene våre, men hele bransjen. Vi tilegner, deler, bruker og utvikler
        kunnskap og løsninger for oss selv og for kundene våre.
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

      <section className="flex flex-col gap-12">
        <TitleAndText title="Vi skal bli passe store" titleAs="h2">
          Vi vil være et selskap hvor alle kjenner alle, hvor vi er små nok til
          å være smidig, men samtidig store nok til å ha innflytelse. Derfor
          skal vi ikke bli fler enn 140 personer. Det er akkurat nok folk til å
          fylle det området under!
        </TitleAndText>

        <BubbleGrid
          items={employeeImages.map((x) => (
            <CapraImage key={x} src={x} alt="Ansatt i Capra" />
          ))}
        />

        {/* HACK: The Bubble grid above takes more vertical space than it's given */}
        {/* Making the content overflow into the title below */}
        {/* Perferably this should be fixed inside the component */}
        {/* but for now, just offset the known overflow */}
        {/* The gap from the flex is sufficent offset */}
        <div className="md:hidden" />
      </section>

      <TitleAndText title="Capra er organisert i team" titleAs="h2">
        Vi bryr oss ikke om titler eller hieraki.{" "}
        <strong className="font-bold">
          Derfor har vi ingen ledergruppe, men heller team
        </strong>{" "}
        som består av kollegaer som har frivillig meldt seg til å gjøre Capra
        bedre.
      </TitleAndText>

      <section className="grid w-[90%] max-w-5xl grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
        {teams.map((props) => (
          <TeamCard key={props.title} {...props} />
        ))}
      </section>

      <TitleAndText title="Visjoner for fremtiden" titleAs="h2">
        De neste årene skal vi fokusere på fire hovedområder som skal gjøre oss,
        våre ansatte og våre kunder bedre.
      </TitleAndText>

      <div className="grid max-w-4xl grid-cols-1 gap-20 px-10 sm:grid-cols-2">
        <IconTitleAndTextBlock
          title="Organisasjon"
          titleAs="h3"
          image={images["icon-vision-organization"]}
        >
          Vi skal tilpasse organisasjonsstrukturen for å <b>øke farten </b>
          og <b>respondere</b> raskere med <b>enda høyere kvalitet.</b>
        </IconTitleAndTextBlock>
        <IconTitleAndTextBlock
          title="Forretningsutvikling"
          titleAs="h3"
          image={images["icon-vision-development"]}
        >
          Vi skal <b>skape nye forretningsmuligheter</b> og
          <b> videreutvikle de eksisterende</b> i skjønn harmoni.
        </IconTitleAndTextBlock>
        <IconTitleAndTextBlock
          title="Markedsføring"
          titleAs="h3"
          image={images["icon-vision-marketing"]}
        >
          Vi skal <b>inspirere og dele det vi kan og gjør</b> på nye måter. Vi
          skal
          <b> tørre å ta et standpunkt og være en tydelig stemme i bransjen.</b>
        </IconTitleAndTextBlock>
        <IconTitleAndTextBlock
          title="Kompetanse"
          titleAs="h3"
          image={images["icon-vision-competence"]}
        >
          Vi skal bygge Norges sterkeste kompetansemiljø for våre faglige
          satningsområder.
        </IconTitleAndTextBlock>
      </div>

      <InfoBox
        title={`Hva betyr egentlig "Capra"?`}
        className="bg-light-blue-20"
      >
        Navnet Capra betyr geit på latin. Geiter er{" "}
        <strong className="font-bold">
          naturlig nysgjerrige og intelligente
        </strong>
        , og de <strong className="font-bold">lever gjerne i flokk</strong>,
        samtidig som de har{" "}
        <strong className="font-bold">evnen til å være selvstendige</strong>.
        Det syns vi egentlig er ganske beskrivende for de geitene som jobber i
        Capra.
      </InfoBox>

      <TitleAndText title="Vi dyrker innovasjon" titleAs="h2">
        Det å lære og utvikle oss, sammen med frihet til å prøve ut ideer, gir
        grobunn for nyskapning og forandring. Det er noe av det viktigste vi
        gjør i Capra.
      </TitleAndText>

      <ContentAndImageBox
        title="Bratte læringskurver"
        image={images["icon-graph-up"]}
        height="40vw"
        color="peach"
      >
        For å bli de beste på våre fagområder, må vi kunne lære. Derfor setter
        vi av tid til <strong className="font-bold">fagsamlinger</strong> og{" "}
        <strong className="font-bold">inviduell læring.</strong>
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Du eier ideene dine"
        image={images["icon-idea-bulb"]}
        height="40vw"
        direction="right"
        color="lightBlue"
      >
        Vi vet at mange liker å holde på med hobby prosjekter. Så lenge
        prosjektet ikke faller under Capras anvendelsesområde så er ideen din.
        Det betyr at{" "}
        <strong className="font-bold">
          den appen eller SaaS-løsningen du bygger er din og bare din
        </strong>
        .
      </ContentAndImageBox>

      <section className="flex flex-col items-center gap-12">
        <TitleAndText title="Tenk selv, fremfor å ha regler" titleAs="h2">
          Kloke mennesker tar kloke valg! Vi vil{" "}
          <strong className="font-bold">
            tenke selv fremfor å ha mange regler
          </strong>
          . Vi tror det inspirerer til løsninger litt utenfor boksen.
        </TitleAndText>

        <div
          className={classNames(
            "flex w-11/12 max-w-xl flex-col gap-4",
            // Make the boxes offset on bigger screens
            "md:[&>*:nth-child(even)]:ml-5 md:[&>*:nth-child(odd)]:mr-5",
          )}
        >
          <EmphasizedTextBox color="secondary">
            Vi jobber hvor vi vil, så lenge kunden er happy.
          </EmphasizedTextBox>
          <EmphasizedTextBox color="lightBlue">
            Vi styrer egne kompetanse- og hardwarebudsjetter.
          </EmphasizedTextBox>
          <EmphasizedTextBox color="peach">
            Vi har ingen obligatoriske internaktiviteter - tiden vår styrer vi
            selv.
          </EmphasizedTextBox>
        </div>
      </section>

      <CallToActionBox
        title="Vi arrangerer en kick-ass konferanse"
        description="Vi elsker å lære bort det vi kan. Derfor arrangerer vi internkonferanse hvert år!"
        linkText="Les om CapraCon"
        href="https://capracon.no"
      />
      <section className="flex w-11/12 max-w-6xl flex-col gap-12">
        <TitleAndText title="Kontakt" titleAs="h2">
          Vi vil gjerne høre fra deg!
        </TitleAndText>

        <ul className="flex flex-col flex-wrap justify-center gap-8 sm:flex-row sm:gap-10">
          {contactUsEmployees.map((x) => (
            <li key={x._id} className="w-full sm:w-72 lg:w-80">
              <AnsattCard employee={x} hideImage icons={images} />
            </li>
          ))}
        </ul>
      </section>
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
    <div
      className={`flex w-full sm:w-11/12 md:max-w-2xl flex-col gap-4 border-none bg-peach-20 py-7 px-6 md:p-12 ${
        className ?? ""
      }`}
    >
      <div className="font-bold uppercase text-lg text-main">{title}</div>
      <div className="text-lg leading-16">{children}</div>
    </div>
  );
};

interface TeamCardProps {
  title: string;
}

const TeamCard = ({ title, children }: PropsWithChildren<TeamCardProps>) => {
  return (
    <div className="bg-white p-4 sm:p-8 text-sm ">
      <div className="font-bold uppercase text-main text-base mb-1 border-b-2 border-secondary inline-block">{title}</div>
      <div className="text-base">{children}</div>
    </div>
  );
};

interface EmphasizedTextBoxProps {
  color: BrandColor;
}

const EmphasizedTextBox = ({
  color,
  children,
}: PropsWithChildren<EmphasizedTextBoxProps>) => {
  return (
    <div
      className={classNames(
        BRAND_BG_AND_FG_COLORS[color],
        "font-bold",
        "rounded py-4 px-5",
      )}
    >
      {children}
    </div>
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

const teams: PropsWithChildren<TeamCardProps>[] = [
  {
    title: "Team felles retning",
    children:
      "Sørger for at alle geiter vet hvilke topp vi skal bestige og jobber sammen om å bringe oss dit.",
  },
  {
    title: "Team sosialt",
    children: "Organiserer morsomme felles aktiviteter for alle sammen!",
  },
  {
    title: "HR",
    children: "Sørger for at alle blir tatt godt vare på.",
  },
  {
    title: "Salgsteam",
    children: "Sørger for oppdrag med bratte læringskurver.",
  },
  {
    title: "Team økonomi",
    children: "Holder den økonomiske skuta gående",
  },
  {
    title: "Team marked",
    children:
      "Jobber for at blant annet du skal vite hvem vi er og hva vi gjør!",
  },
  {
    title: "Fagteam",
    children: "Vi har 5 fagteam som sørger for et levende fagmiljø!",
  },
  {
    title: "Team Organisasjonsutvikling",
    children: "Fasilitere og støtte organiseringen.",
  },
];
