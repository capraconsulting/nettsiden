import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ProseableText } from "~/components/ProsableText";
import {
  getSanitySitemapEntries,
  sanityClient,
} from "~/sanity/sanity-client.server";
import type { Author, BlockContent, Blogg } from "~/sanity/schema";
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
    <article className="w-[90%] max-w-2xl flex flex-col gap-5">
      <h1 className="text-5xl font-bold text-header leading-[1.14]">
        {item.titleLong}
      </h1>
      <ProseableText value={item.ingress!} className="text-brodtext text-2xl" />

      <p>
        <span className="text-md block">{item.authors}</span>
        <time className="text-sm text-[#555]">{item.publishedAt}</time>
      </p>

      <img
        className="max-w-3xl"
        src={urlFor(item.mainImage!).url()}
        alt={getMainImageAlt(item.mainImageAlt)}
      />

      <ProseableText
        value={item.body!}
        className="color-brodtext text-xl font-light"
      />
    </article>
  );
}

// https://www.sanity.io/docs/presenting-block-text#ac67a867dd69
function getMainImageAlt(mainImageAlt: BlockContent | undefined): string {
  return (mainImageAlt ?? [])
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return null;
      }

      return block.children
        .map((child: { text?: string }) => child.text)
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}
