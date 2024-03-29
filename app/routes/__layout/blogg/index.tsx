import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_ServerRuntimeMetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { CapraImage } from "~/components/capra-image";
import { Card } from "~/components/card";
import { FilterRow } from "~/components/filter-row";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Author, Blogg, Bloggfilter } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { uniqueBy } from "~/utils/misc";

type BloggExpanded = Omit<Blogg, "filter" | "authors"> & {
  filter: Bloggfilter[];
  authors: Author[];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: V2_ServerRuntimeMetaFunction = () =>
  metaTags({
    title: "Les hva som rører seg i IT-bransjen - Blogg",
    description:
      "På bloggen vår kan du lese om hva som skjer i IT-bransjen. Vi vil dele tips, råd og mye snacks! Spesielt relevant for deg som skal starte å jobbe med IT.",
  });

const URL_FILTER_KEY = "kategori";

export const loader = async (args: LoaderArgs) => {
  const allBloggPosts = await getSanityClient(args).fetch<BloggExpanded[]>(
    `*[_type == "blogg"]|order(publishedAt desc) { ..., filter[]->, authors[]-> }`,
  );

  // Hack: Replace null with empty list
  // Perfably the groq api call should return empty list, but it returns null
  allBloggPosts.forEach((bloggPost) => {
    if (bloggPost.filter === null) bloggPost.filter = [];
    if (bloggPost.authors === null) bloggPost.authors = [];
  });
  let filters = allBloggPosts.flatMap((it) => it.filter);
  filters = uniqueBy(filters, (x) => x._id);

  // Filter the results
  const searchParams = new URL(args.request.url).searchParams;
  const activeFilters = new Set(searchParams.getAll(URL_FILTER_KEY));
  const filteredBloggPosts = allBloggPosts.filter(
    (x) =>
      activeFilters.size === 0 ||
      x.filter.some((filter) => activeFilters.has(filter.title!)),
  );

  return json(
    { bloggPosts: filteredBloggPosts, filters },
    { headers: cacheControlHeaders },
  );
};

export default function BloggIndex() {
  const { bloggPosts, filters } = useLoaderData<typeof loader>();

  const [search] = useSearchParams();
  return (
    <>
      <Section>
        <TitleAndText title="Blogg" titleAs="h1">
          Her på bloggen skriver vi om det som interesserer oss av tech, ting
          som skjer der ute i bransjen vår og andre happenings i Capra.
        </TitleAndText>

        <div className="flex flex-col gap-8">
          <Form method="get" action="">
            <FilterRow
              filters={filters.map((x) => x.title!)}
              activeFilters={search.getAll(URL_FILTER_KEY)}
              filterKey={URL_FILTER_KEY}
            />
          </Form>

          <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
            {bloggPosts.map((x, i) => (
              <li key={x._id}>
                {x.slug?.current ? (
                  <Link prefetch="intent" to={x.slug.current}>
                    <BloggCard
                      bloggEntry={x}
                      imageProps={{ loading: i >= 4 ? "lazy" : "eager" }}
                    />
                  </Link>
                ) : (
                  <BloggCard
                    bloggEntry={x}
                    imageProps={{ loading: i >= 4 ? "lazy" : "eager" }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

interface BloggCardProps {
  bloggEntry: BloggExpanded;
  imageProps?: React.ComponentProps<"img">;
}
export const BloggCard = ({ bloggEntry, imageProps }: BloggCardProps) => {
  return (
    <Card
      image={
        <div className="relative pb-[50%]">
          {bloggEntry.mainImage && (
            <CapraImage
              className="absolute h-full w-full object-cover"
              alt="" // TODO
              src={urlFor(bloggEntry.mainImage)
                .width(600 * 2)
                .url()}
              {...imageProps}
            />
          )}
        </div>
      }
    >
      <p className="text-xl font-bold">{bloggEntry.title}</p>
      <div>
        {bloggEntry.authors.map((author) => (
          <p key={author._id} className="text-grey">
            {author.name}
          </p>
        ))}
      </div>
      <p className="text-sm font-light text-grey-dark">
        {new Date(bloggEntry.publishedAt!).toLocaleDateString("no", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </p>
    </Card>
  );
};
