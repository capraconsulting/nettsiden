import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";

import { Badge } from "~/components/badge";
import { CallToActionBox } from "~/components/call-to-action-box";
import { Card } from "~/components/card";
import { FilterRow } from "~/components/filter-row";
import { TitleAndText } from "~/components/title-and-text";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Selvskryt, Selvskrytfilter } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { uniqueBy } from "~/utils/misc";

type SelvskrytExpanded = Omit<Selvskryt, "filter"> & {
  filter: Selvskrytfilter[];
};

const URL_FILTER_KEY = "kategori";
export const loader = async ({ request }: LoaderArgs) => {
  const allSelvskryt = await sanityClient.query<SelvskrytExpanded>(
    `* [_type == "selvskryt"] { ..., filter[]-> }`,
  );

  let filters = allSelvskryt.flatMap((x) => x.filter);
  filters = uniqueBy(filters, (x) => x._id);

  // Filter the results
  const searchParams = new URL(request.url).searchParams;
  const activeFilters = new Set(searchParams.getAll(URL_FILTER_KEY));
  const filteredSelvskryt = allSelvskryt.filter(
    (x) =>
      activeFilters.size === 0 ||
      x.filter.some((filter) => activeFilters.has(filter.title!)),
  );

  return json({ selvskrytList: filteredSelvskryt, filters });
};

export const meta: MetaFunction = () => ({
  title: "Vi er stolte av arbeidet vi gjør - Se caser her | Capra Consulting",
  description:
    "Det er viktig å løfte frem godt arbeid! Vi syns også det er helt nødvendig å vise frem det flotte vi i Capra får til sammen med våre kunder. Se caser her.",
});

export default function DetteHarViGjort() {
  const data = useLoaderData<typeof loader>();
  const [search] = useSearchParams();
  return (
    <>
      <div className="max-w-7xl w-full sm:w-11/12 flex flex-col gap-12">
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

          <ul className="grid gap-12 sm:gap-10 md:gap-8 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {data.selvskrytList.map((x) => (
              <li key={x._id}>
                <SelvskrytCard key={x._id} selvskryt={x as SelvskrytExpanded} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CallToActionBox
        title="Er du nysgjerrig om du og Capra er en match?"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
      />
    </>
  );
}

interface SelvskrytCardProps {
  selvskryt: SelvskrytExpanded;
}
export const SelvskrytCard = ({ selvskryt }: SelvskrytCardProps) => {
  return (
    <Link prefetch="intent" to={selvskryt.slug?.current!}>
      <Card
        image={
          <div className="relative pb-[66%] md:pb-[100%]">
            <img
              className="absolute h-full w-full object-cover"
              alt={selvskryt.mainImageAlt}
              src={urlFor(selvskryt.mainImage!)
                .size(4500 / 5, 3000 / 5)
                .url()}
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
