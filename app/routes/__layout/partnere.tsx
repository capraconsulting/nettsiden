import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraImage } from "~/components/capra-image";
import { TitleAndText } from "~/components/title-and-text";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import type { Image } from "~/utils/dataRetrieval";
import { fetchImageAssets } from "~/utils/dataRetrieval";

export const handle: CapraHandle = {
  contactFormTitle: "Hvordan kan vi hjelpe deg?",
};

export const loader = async () => {
  const images = await fetchImageAssets([
    "logo-oswa",
    "logo-kode24",
    "logo-kongsvingertennisklubb",
    "logo-teknologihuset",
    "logo-aws-partner",
  ]);

  return json({ images }, { headers: cacheControlHeaders });
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function Partnere() {
  const { images } = useLoaderData<typeof loader>();
  return (
    <>
      <TitleAndText title="Amazon Web Services" titleAs="h1">
        I Capra er vi stolte av å være et av de få virkelig store norske
        kompetansemiljøene på AWS.
      </TitleAndText>

      <div className="flex flex-col items-center gap-10 bg-peach-20 py-[5%] px-[10%] lg:flex-row">
        <div>
          Som{" "}
          <a
            href="https://aws.amazon.com/blogs/apn/"
            className="font-bold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            APN Advanced Tier Consulting Partner
          </a>{" "}
          med over 40 sertifiserte medarbeidere og dyp erfaring fra noen av de
          mest innovative implementeringene i Norge, gjør vi overgangen til sky
          til et smertefritt paradigmeskifte.
        </div>
        <CapraImage
          className="h-[90px] w-[340px] py-0 px-0"
          src={images["logo-aws-partner"].imageUrl}
          alt={images["logo-aws-partner"].alt}
        />
      </div>

      <TitleAndText title="Andre partnere" titleAs="h2">
        I Capra har vi flere partnere som vi setter stor pris på. Vi støtter
        store og små aktører som Capra og våre ansatte bryr seg om.
      </TitleAndText>

      <section className="grid max-w-3xl grid-cols-1 justify-items-center gap-5 md:grid-cols-2">
        {/* TODO: Kan disse hentes dynamisk? */}
        <PartnerCard image={images["logo-kode24"]} />
        <PartnerCard image={images["logo-oswa"]} />
        <PartnerCard image={images["logo-teknologihuset"]} />
        <PartnerCard image={images["logo-kongsvingertennisklubb"]} />
      </section>

      <CallToActionBox
        title="Vi skriver ofte om partnerne våre i bloggen"
        description="Sjekk ut hva som skjer i og rundt Capra"
        linkText="Les bloggen"
        href="/blogg"
      />
    </>
  );
}

const PartnerCard: React.FC<{ image: Image }> = ({ image }) => {
  return (
    <div className="flex w-[95%] flex-col gap-4 p-3 shadow-lg md:w-full">
      {image.description && (
        <div className="font-bold text-[#03173E]">{image.description}</div>
      )}
      <div className="block text-center">
        <CapraImage
          className="inline-block"
          src={image.imageUrl}
          alt={image.alt}
        />
      </div>
    </div>
  );
};
