import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ProseableText } from "~/components/ProsableText";
import {
  getSanitySitemapEntries,
  sanityClient,
} from "~/sanity/sanity-client.server";
import type { Author, Blogg } from "~/sanity/schema";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { assertItemFound } from "../dette-har-vi-gjort/$slug";

export const handle: CapraHandle = {
  getSitemapEntries: () => getSanitySitemapEntries("blogg", "/blogg"),
};

type BloggExpanded = Omit<Blogg, "authors"> & {
  authors: Author[];
};

export const loader = async ({ params }: LoaderArgs) => {
  const query = (slug: string) =>
    sanityClient.query<BloggExpanded>(
      `* [_type == "blogg" && slug.current == "${slug}"]|{ ..., authors[]-> }`,
    );

  const item = (await query(params.slug ?? ""))[0];
  assertItemFound(item);

  const publishedAt = new Intl.DateTimeFormat("no-nb", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(item.publishedAt!));

  const authors = new Intl.ListFormat("no-nb", {
    style: "long",
    type: "conjunction",
  }).format(item.authors.map((x) => x.name));

  return json(
    { ...item, authors, publishedAt },
    { headers: cacheControlHeaders },
  );
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function BloggPost() {
  const item = useLoaderData<typeof loader>();
  return (
    <article>
      <h1 className="text-4xl font-bold">{item.titleLong}</h1>
      <ProseableText value={item.ingress!} />

      <p>{item.authors}</p>

      <time>{item.publishedAt}</time>

      <img
        className="max-w-3xl"
        src={urlFor(item.mainImage!).url()}
        alt="TODO ALT"
      />
      <ProseableText value={item.body!} />
    </article>
  );
}
