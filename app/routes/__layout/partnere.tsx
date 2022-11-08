import type { HeadersFunction } from "@remix-run/server-runtime";

import { CallToActionBox } from "~/components/call-to-action-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";

export const handle: CapraHandle = {
  contactFormTitle: "Hvordan kan vi hjelpe deg?",
};

export const headers: HeadersFunction = () => cacheControlHeaders;

export default function Partnere() {
  return (
    <>
      <TitleAndText title="Amazon Web Services" titleAs="h1">
        I Capra er vi stolte av å være et av de få virkelig store norske
        kompetansemiljøene på AWS.
      </TitleAndText>

      <Todo badge className="w-full py-0 px-0" title="">
        <div className="flex flex-row items-center bg-peach-20 py-[5%] px-[10%] ">
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
            mest innovative implementeringene i Norge, gjør vi overgangen til
            sky til et smertefritt paradigmeskifte.
          </div>
          <Todo
            title="AWS partner network bilde"
            className="h-[90px] w-[340px] py-0 px-0"
          />
        </div>
      </Todo>

      <TitleAndText title="Andre partnere" titleAs="h2">
        I Capra har vi flere partnere som vi setter stor pris på. Vi støtter
        store og små aktører som Capra og våre ansatte bryr seg om.
      </TitleAndText>

      <Todo
        badge
        className="px-y h-[500px] py-0"
        title="Kode 24 | Oslo Architect | Teknologihuset | Kongsvinger Tennisklubb"
      ></Todo>

      <CallToActionBox
        title="Vi skriver ofte om partnerne våre i bloggen"
        description="Sjekk ut hva som skjer i og rundt Capra"
        linkText="Les bloggen"
        href="/blogg"
      />
    </>
  );
}
