import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { BubbleSandwich } from "~/components/bubbles/bubble-sandwich";
import { fetchEmployeeImages } from "~/components/bubbles/capra-helper.server";
import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { ContentAndImageBox } from "~/components/content-and-image-box/content-and-image-box";
import { TitleAndText } from "~/components/title-and-text";
import { TypingText } from "~/components/typing-text";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { shuffled } from "~/utils/random";
import {
  KonsulenterPitchAndSloganBox,
  LifligPitchAndSloganBox,
} from "./dette-kan-vi";

export const meta: MetaFunction = () => ({
  title: "Capra Consulting: IT-konsulenter med ekspertise i software",
  "og:title": "Capra Consulting: IT-konsulenter med ekspertise i software",
  description:
    "Vi er IT-konsulenter innen softwareutvikling og Norges beste på sky. I Capra har vi høy kvalitet på våre ansatte, og det vil vi fortsette med. Bli med oss!",
});

export const loader = async () => {
  const [images, employeeImages] = await Promise.all([
    fetchImageAssets([
      "tech",
      "aws",

      "icon-brain",
      "icon-tech",
      "icon-time",
      "illustration-square-dots",

      "icon-cloud",
      "icon-counsel",
      "icon-book",
      "illustration-square-dots2",

      "company-europris",
      "company-gjensidige",
      "company-kinnetik",
      "company-vy",
    ]),
    fetchEmployeeImages()
      .then(shuffled)
      .then((l) => l.slice(0, 13)),
  ]);
  return json(
    {
      images,
      employeeImages,

      companies: Object.entries(images)
        .filter(([name]) => name.startsWith("company-"))
        .map(([_, image]) => image),
    },
    { headers: cacheControlHeaders },
  );
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const handle: CapraHandle = {
  contactFormTitle: "Vil du vite mer om hvordan vi kan hjelpe deg?",
};

export default function Index() {
  const { images, employeeImages, companies } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex w-full flex-col gap-12">
        <TitleAndText
          title={
            <>
              Vi er norges beste på{" "}
              <span className="block sm:inline-block">
                <TypingText
                  text={[
                    "AWS",
                    "selvskryt",
                    "java",
                    "vaffelspising",
                    "javascript",
                    "smash",
                    "agile",
                    "bordtennis",
                  ]}
                />
              </span>
            </>
          }
          titleAs="h1"
        >
          Bold statement? Absolutt.
        </TitleAndText>
        <div className="mx-auto flex w-11/12 justify-center gap-4">
          <Button variant="outline" href="/dette-kan-vi">
            Bli kunde?
          </Button>
          <Button variant="outline" href="/bli-en-av-oss">
            Jobb hos oss!
          </Button>
        </div>
      </div>

      <TitleAndText title="Hva trenger du?" titleAs="h2">
        Vi elsker å løse komplekse problemer, men vi vet at en enkelt
        arbeidsmetode ikke passer alle. Derfor tilbyr vi to måter å løse
        utfordringene dine!
      </TitleAndText>

      <LifligPitchAndSloganBox direction="left" images={images} />

      <KonsulenterPitchAndSloganBox direction="right" images={images} />

      <ContentAndImageBox
        title="Vi er Advanced Tier Consulting Partner"
        image={<CapraImage src={images.aws.imageUrl} alt={images.aws.alt} />}
        height="32vw"
        color="peach"
      >
        Vi er et av fire norske selskaper som kan kalle seg AWS-Partner!
      </ContentAndImageBox>
      <ContentAndImageBox
        title="Vi er spesialister"
        image={
          <CapraImage
            className="h-full w-full overflow-hidden object-contain"
            src={images.tech.imageUrl}
            alt={images.tech.alt}
          />
        }
        height="35vw"
        direction="right"
        color="lightBlue"
      >
        Ingen kan være best i alt! Derfor spesialiserer vi oss på utvalgte
        markedsledenede teknologier.
      </ContentAndImageBox>

      <BubbleSandwich
        items={employeeImages.map((x) => (
          <CapraImage key={x} src={x} alt="Ansatt i Capra" />
        ))}
      >
        <div className="flex flex-col items-center gap-8 sm:gap-[10vh]">
          <TitleAndText title="Vi har kickass folk" titleAs="h2">
            I Capra setter vi menneskene først. Vi vet at fornøyde og motiverte
            folk skaper den beste arbeidsplassen.
          </TitleAndText>
          <Button href="/ansatte" variant="solid">
            Se våre ansatte
          </Button>
        </div>
      </BubbleSandwich>

      <section className="flex flex-col gap-12">
        <TitleAndText title="Vi jobber med store aktører i Norge" titleAs="h2">
          Capra leverer kompetanse til prosjekter over hele landet. Som
          bransjeuavhengig er vi åpne for både{" "}
          <strong className="font-bold">offentlig</strong> og{" "}
          <strong className="font-bold">privat</strong> virksomhet
        </TitleAndText>
        <div className="mx-auto grid w-11/12 max-w-xl grid-cols-2 items-center">
          {companies.map(({ alt, imageUrl, key }) => (
            <div
              key={key ?? imageUrl}
              className="flex items-center justify-center"
            >
              <CapraImage src={imageUrl} alt={alt} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
