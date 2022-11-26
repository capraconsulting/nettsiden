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
import type { Author, Blogg } from "~/sanity/schema";
import { getMainImageAlt, getRawStringContent } from "~/sanity/utils";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { assertItemFound, typedBoolean } from "~/utils/misc";

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
  }).format(item.authors.map((x) => x.name).filter(typedBoolean));

  return json(
    { ...item, authors, publishedAt },
    { headers: cacheControlHeaders },
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title: data.helmetTitle ?? data.title!,
    description: data.helmetDescription ?? getRawStringContent(data.ingress),
    image: urlFor(data.mainImage!).url(),
    author: data.authors,
    card: "summary_large_image",
  });

export default function BloggPost() {
  const item = useLoaderData<typeof loader>();
  return (
    <article className="flex w-11/12 max-w-2xl flex-col gap-5">
      <h1 className="text-5xl font-bold leading-[1.14] text-header">
        {item.titleLong}
      </h1>
      <ProseableText value={item.ingress!} className="text-2xl text-brodtext" />

      <p>
        <span className="text-md block">{item.authors}</span>
        <time className="text-sm text-[#555]">{item.publishedAt}</time>
      </p>

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
