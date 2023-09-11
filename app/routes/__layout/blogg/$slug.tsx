import { useLoaderData } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CapraImage } from "~/components/capra-image";
import { ProseableText } from "~/components/prosable-text";
import {
  getSanityClient,
  getSanitySitemapEntries,
} from "~/sanity/sanity-client.server";
import type { Author, Blogg } from "~/sanity/schema";
import {
  getMainImageAlt,
  getRawStringContent,
  isInPreviewMode,
} from "~/sanity/utils";
import type { CapraHandle } from "~/types";
import {
  cacheControlHeaders,
  noStoreCacheControlHeaders,
} from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { assertItemFound, raise, typedBoolean } from "~/utils/misc";

export const handle: CapraHandle = {
  getSitemapEntries: () => getSanitySitemapEntries("blogg", "/blogg"),
};

type BloggExpanded = Omit<Blogg, "authors"> & {
  authors?: Author[];
};

export const loader = async ({ params, request, context }: LoaderArgs) => {
  const isPreviewMode = isInPreviewMode({ request, context });
  const query = `* [_type == "blogg" && slug.current == "${params.slug}"]|{ ..., authors[]-> }`;
  const blogPost = (
    await getSanityClient({ request, context }).query<BloggExpanded>(query)
  )[0];

  assertItemFound(blogPost);

  const publishedAt = new Intl.DateTimeFormat("no-nb", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(blogPost.publishedAt!));

  const authors = new Intl.ListFormat("no-nb", {
    style: "long",
    type: "conjunction",
  }).format((blogPost.authors ?? []).map((x) => x.name).filter(typedBoolean));

  return json(
    {
      blogPost: { ...blogPost, authors, publishedAt },
      isPreviewMode,
    },
    {
      headers: isPreviewMode ? noStoreCacheControlHeaders : cacheControlHeaders,
    },
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: V2_ServerRuntimeMetaFunction<typeof loader> = ({ data }) =>
  metaTags({
    title:
      data?.blogPost.helmetTitle ??
      data?.blogPost.title ??
      raise(new Error("Helmet title and title was undefined for blog post.")),
    description:
      data?.blogPost.helmetDescription ??
      getRawStringContent(data?.blogPost.ingress),
    image: urlFor(
      data?.blogPost.mainImage ??
        raise(new Error(`Main image for blog post is undefined.`)),
    ).url(),
    author: data?.blogPost.authors,
    card: "summary_large_image",
  });

export default function BloggPost() {
  const { blogPost, isPreviewMode } = useLoaderData<typeof loader>();

  return (
    <article className="flex w-11/12 max-w-2xl flex-col gap-5">
      {isPreviewMode && <div>Preview mode</div>}
      <h1 className="text-5xl font-bold leading-[1.14] text-header">
        {blogPost.titleLong}
      </h1>
      <ProseableText
        value={blogPost.ingress!}
        className="text-2xl text-brodtext"
      />

      <p>
        <span className="text-md block">{blogPost.authors}</span>
        <time className="text-sm text-[#555]">{blogPost.publishedAt}</time>
      </p>

      <div className="relative left-[50%] ml-[-50vw] w-screen max-w-3xl md:left-0 md:ml-0 md:w-full">
        <CapraImage
          src={urlFor(blogPost.mainImage!)
            .width(714 * 2)
            .url()}
          alt={getMainImageAlt(blogPost)}
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <ProseableText
        value={blogPost.body!}
        className="color-brodtext text-xl font-light"
      />
    </article>
  );
}
