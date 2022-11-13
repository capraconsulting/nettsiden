import { ContentAndImageBox } from "./content-and-image-box";

export const ViErSpesialister = () => (
  <ContentAndImageBox
    title="Vi er spesialister"
    image={{
      src: "#",
      alt: "Image here!",
    }}
    height="35vw"
    direction="right"
    color="bordeaux"
  >
    Ingen kan være best i alt! Derfor spesialiserer vi oss på utvalgte
    markedsledenede teknologier.
  </ContentAndImageBox>
);

export const BratteLaeringsKurver = () => (
  <ContentAndImageBox
    title="Bratte læringskurver"
    image={{
      src: "#",
      alt: "Image here!",
    }}
    height="35vw"
    color="peach"
  >
    For å bli de beste på våre fagområder, må vi kunne lære. Derfor setter vi av
    tid til fagsamlinger og inviduell læring .
  </ContentAndImageBox>
);
BratteLaeringsKurver.storyName = "Bratte læringskurver";
