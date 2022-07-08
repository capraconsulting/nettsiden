import { ContentAndImageBox } from "./content-and-image-box";

export const ViErSpesialister = () => (
  <ContentAndImageBox
    title="Vi er spesialister"
    image={<div>Image here!</div>}
    height="35vw"
    direction="right"
  >
    Ingen kan være best i alt! Derfor spesialiserer vi oss på utvalgte
    markedsledenede teknologier.
  </ContentAndImageBox>
);

export const BratteLaeringsKurver = () => (
  <ContentAndImageBox
    title="Bratte læringskurver"
    image={<div>Image here!</div>}
    height="35vw"
  >
    For å bli de beste på våre fagområder, må vi kunne lære. Derfor setter vi av
    tid til fagsamlinger og inviduell læring .
  </ContentAndImageBox>
);
BratteLaeringsKurver.storyName = "Bratte læringskurver";
