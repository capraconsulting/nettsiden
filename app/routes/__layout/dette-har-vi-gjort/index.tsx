import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Badge } from "~/components/badge";
import { CallToActionBox } from "~/components/call-to-action-box";
import { CapraImage } from "~/components/capra-image";
import { Card } from "~/components/card";
import { FilterRow } from "~/components/filter-row";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import { cacheControlHeaders } from "~/utils/cache-control";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { uniqueBy } from "~/utils/misc";

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

const URL_FILTER_KEY = "kategori";
export const loader = async ({ request }: LoaderArgs) => {
  const allItems = await getSanityClient().query<SelvskrytExpanded>(
    `* [_type == "selvskryt"] { ..., filter[]-> }`,
  );

  // Hack: Replace null with empty list
  // Perfably the groq api call should return empty list, but it returns null
  allItems.forEach((item) => {
    if (item.filter === null) item.filter = [];
  });

  let filters = allItems.flatMap((x) => x.filter);
  filters = uniqueBy(filters, (x) => x._id);

  // Filter the results
  const searchParams = new URL(request.url).searchParams;
  const activeFilters = new Set(searchParams.getAll(URL_FILTER_KEY));
  const filteredItems = allItems.filter(
    (x) =>
      activeFilters.size === 0 ||
      x.filter.some((filter) => activeFilters.has(filter.title!)),
  );

  return json(
    { items: filteredItems, filters },
    { headers: cacheControlHeaders },
  );
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const meta: V2_MetaFunction = () =>
  metaTags({
    title: "Vi er stolte av arbeidet vi gjør - Se caser her",
    description:
      "Det er viktig å løfte frem godt arbeid! Vi syns også det er helt nødvendig å vise frem det flotte vi i Capra får til sammen med våre kunder. Se caser her.",
  });

export default function DetteHarViGjort() {
  const data = useLoaderData<typeof loader>();
  const [search] = useSearchParams();
  return (
    <>
      <Section>
        <TitleAndText title="Dette har vi gjort for andre" titleAs="h1">
          Vi skaper samfunsnytte for over 1 000 000 brukere hver eneste dag! Her
          har du noen få av tingene våre kick-ass folk gjør for kunder.
        </TitleAndText>

        <div className="flex flex-col gap-8">
          <Form method="get" action="">
            <FilterRow
              filters={data.filters.map((x) => x.title!)}
              activeFilters={search.getAll(URL_FILTER_KEY)}
              filterKey={URL_FILTER_KEY}
            />
          </Form>

          <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
            {data.items.map((x, i) => (
              <li key={x._id}>
                <DetteHarViGjortCard
                  key={x._id}
                  selvskryt={x}
                  imageProps={{ loading: i >= 4 ? "lazy" : "eager" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CallToActionBox
        title="Er du nysgjerrig på om du og Capra er en match?"
        titleAs="h2"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
        href="https://capraconsulting.teamtailor.com/jobs"
      />
    </>
  );
}

interface DetteHarViGjortCardCardProps {
  selvskryt: SelvskrytExpanded;
  imageProps?: React.ComponentProps<"img">;
}
export const DetteHarViGjortCard = ({
  selvskryt,
  imageProps,
}: DetteHarViGjortCardCardProps) => {
  return (
    <Link
      prefetch="intent"
      to={`/dette-har-vi-gjort/${selvskryt.slug?.current}`}
    >
      <Card
        image={
          <div className="relative pb-[50%]">
            <CapraImage
              className="absolute h-full w-full object-cover"
              alt={selvskryt.mainImageAlt ?? ""}
              src={urlFor(selvskryt.mainImage!)
                .width(600 * 2)
                .url()}
              {...imageProps}
            />
          </div>
        }
      >
        <div>
          <p className="text-xl font-bold text-blue">{selvskryt.title}</p>
          <p>{selvskryt.titleLong}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {selvskryt.filter.map((x) => (
            <Badge key={x._id} variant="outline" color="blue" size="sm">
              {x.title}
            </Badge>
          ))}
        </div>
      </Card>
    </Link>
  );
};
