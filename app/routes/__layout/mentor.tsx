import { CallToActionBox } from "~/components/call-to-action-box";
import { ContentAndImageBox } from "~/components/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";

export default function Mentor() {
  return (
    <>
      <TitleAndText
        title="Er du en teknologistudent i Oslo og ønsker veiledning fra en mentor?"
        titleAs="h1"
      >
        Vi tror mangelen på erfaring er det største hinderet mellom
        teknologistudenter og drømmejobben. Derfor ønsker Capra å veilede fem
        studenter gjennom våren 2022.
      </TitleAndText>

      <Todo badge title="Søk her!" className="w-60" />

      <Todo
        badge
        className="w-full h-[500px]"
        title="Din egen mentor | CV- og LinkedIn-kurs | Oppstart midten av februar"
      />

      <ContentAndImageBox
        title="Hva får du ut av det?"
        image={undefined}
        height="40vw"
        contentBoxClassName="bg-peach"
      >
        Du får din egen helt egne mentor som følger deg gjennom et semester.
        Målet er å hjelpe deg til å få din drømmejobb etter studiene, enten du
        vil bli konsulent eller noe helt annet. Rekrutteringsgjengen holder et
        CV- og LinkedIn-kurs for å hjelpe deg på veien. I tillegg er det
        planlagt flere fellessamlinger der du kan bli kjent med de andre
        mentorene og menteene.
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Hva ser vi etter?"
        image={undefined}
        height="40vw"
        direction="right"
        contentBoxClassName="bg-bordeaux text-peach-20"
      >
        Vi ser etter deg som går i 1-3. klasse og som ønsker å forberede seg til
        det faktiske arbeidslivet. Vi er ikke opptatt av karakterer, og du
        trenger heller ikke ha et ønske om å jobbe i Capra etter studiene.
      </ContentAndImageBox>

      <CallToActionBox
        title="Vil du ha en egen mentor?"
        description="Send en søknad til mentorprogrammet vårt da vel!"
        linkText="Søknadsskjema"
      />
    </>
  );
}
