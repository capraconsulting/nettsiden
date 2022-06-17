import { CallToActionBox } from "~/components/call-to-action-box";
import { ContentAndImageBox } from "~/components/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";

export default function BliEnAvOss() {
  return (
    <>
      <div className="flex flex-col gap-12 w-full">
        <TitleAndText title="Bli en av oss!" titleAs="h1">
          Det skal være skikkelig bra å være ansatt i Capra. Vi vet nemlig at
          kick-ass ansatte er et resultat av en god arbeidsplass - og det
          ansvaret tar vi på største alvor.
        </TitleAndText>

        <div className="flex gap-4 justify-center">
          <Todo display="inline-flex" size="small" title="Se stillinger" />
          <Todo display="inline-flex" size="small" title="Se de ansatte" />
        </div>
      </div>

      <Todo
        badge
        className="w-11/12 max-w-4xl"
        title="Stillinger fra TeamTailor"
      >
        Disse henter vi fra team tailor sitt api
      </Todo>

      <ContentAndImageBox
        title="TODO: Info om størrelse på selskapet"
        image={undefined}
        height="40vw"
      >
        Er du happy og kunden happy, så er Capra happy!
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi er stolte av fagmiljøet"
        image={undefined}
        height="40vw"
        direction="right"
      >
        Vi består av en gjeng som er over gjennomsnittet interessert i tech, og
        det reflekteres i fagmiljøet vårt. Fagmiljøene er åpne og du kan delta
        på det du vil .
      </ContentAndImageBox>

      <ContentAndImageBox
        title="Vi liker å være sammen"
        image={undefined}
        height="50vw"
      >
        Kontoret til Capra ligger midt på Jernbanetorget sånn at du enkelt kan
        komme “hjemom” en tur, før eller etter du har vært hos kunde. Kontoret
        blir brukt mye . Når du er på hjemmebane kan du slappe av med ping pong,
        spill, noe digg å drikke og godt selskap. I tillegg til julelunsj,
        juletrefest, sommerfest, årsfest, lønningspilser og internkonferansen
        CapraCon , så har vi mange sosiale initiativ som er startet av våre
        egne. Blant annet er det flere som digger squash, toppturer, cageball,
        familieturer på teater, vinsmaking osv . Savner du noe? Det er åpent for
        nye initiativer!
      </ContentAndImageBox>

      <CallToActionBox
        title="Er du nysgjerrig om du og Capra er en match?"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
      />
    </>
  );
}
