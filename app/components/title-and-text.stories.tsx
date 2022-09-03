import { TitleAndText } from "./title-and-text";

export const TitleAndTextStories = () => (
  <div className="flex flex-col gap-12 items-center">
    <TitleAndText title="Bli en av oss!" titleAs="h2">
      Det skal være skikkelig bra å være ansatt i Capra. Vi vet nemlig at
      kick-ass ansatte er et resultat av en god arbeidsplass - og det ansvaret
      tar vi på største alvor.
    </TitleAndText>
    <TitleAndText
      title="Er du en teknologistudent i Oslo og ønsker veiledning fra en mentor?"
      titleAs="h2"
    >
      Vi tror mangelen på erfaring er det største hinderet mellom
      teknologistudenter og drømmejobben. Derfor ønsker Capra å veilede fem
      studenter gjennom våren 2022.
    </TitleAndText>
  </div>
);
