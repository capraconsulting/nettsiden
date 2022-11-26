import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CapraImage } from "~/components/capra-image";
import { ProseableText } from "~/components/prosable-text";
import {
  getSanitySitemapEntries,
  sanityClient,
} from "~/sanity/sanity-client.server";
import { getMainImageAlt } from "~/sanity/utils";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { assertItemFound } from "~/utils/misc";

export const handle: CapraHandle = {
  getSitemapEntries: () =>
    getSanitySitemapEntries("selvskryt", "/dette-har-vi-gjort"),
};

export const loader = async ({ params }: LoaderArgs) => {
  const query = (slug: string) =>
    sanityClient.getAll("selvskryt", `slug.current == "${slug}"`);

  const item = (await query(params.slug ?? ""))[0];
  assertItemFound(item);

  return json({ item }, { headers: cacheControlHeaders });
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title: data.item.helmetTitle!,
    description: data.item.helmetDescription!,
  });

export default function DetteHarViGjortItem() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <article className="flex w-[90%] max-w-2xl flex-col gap-5">
      <h1 className="text-5xl font-bold leading-[1.14] text-header">
        {item.titleLong}
      </h1>
      <ProseableText value={item.ingress!} className="text-2xl text-brodtext" />

      <div className="relative left-[50%] ml-[-50vw] w-screen max-w-3xl md:left-0 md:ml-0 md:w-full">
        <CapraImage
          src={urlFor(item.mainImage!)
            .width(714 * 2)
            .url()}
          alt={getMainImageAlt(item)}
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <ProseableText
        value={item.body!}
        className="color-brodtext text-xl font-light"
      />
    </article>
  );
}
