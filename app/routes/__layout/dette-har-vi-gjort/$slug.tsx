import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CapraImage } from "~/components/capra-image";
import { ProseableText } from "~/components/ProsableText";
import {
  getSanitySitemapEntries,
  sanityClient,
} from "~/sanity/sanity-client.server";
import { getMainImageAlt } from "~/sanity/utils";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";

export const handle: CapraHandle = {
  getSitemapEntries: () =>
    getSanitySitemapEntries("selvskryt", "/dette-har-vi-gjort"),
};

// TODO: I propose to move this function to a shared utility/common file
export function assertItemFound<T>(item: T | undefined): asserts item is T {
  if (item === undefined)
    throw new Response("Not Found", {
      status: 404,
    });
}

export const loader = async ({ params }: LoaderArgs) => {
  const query = (slug: string) =>
    sanityClient.getAll("selvskryt", `slug.current == "${slug}"`);

  const item = (await query(params.slug ?? ""))[0];
  assertItemFound(item);

  return json({ item }, { headers: cacheControlHeaders });
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
  title: data.item.helmetTitle,
  description: data.item.helmetDescription,
});

export default function DetteHarViGjortItem() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <article className="flex w-[90%] max-w-2xl flex-col gap-5">
      <h1 className="text-5xl font-bold leading-[1.14] text-header">
        {item.titleLong}
      </h1>
      <ProseableText value={item.ingress!} className="text-2xl text-brodtext" />

      <CapraImage
        className="max-w-3xl"
        // TODO: Crop to a square
        src={urlFor(item.mainImage!).url()}
        alt={getMainImageAlt(item)}
      />

      <ProseableText
        value={item.body!}
        className="color-brodtext text-xl font-light"
      />
    </article>
  );
}
