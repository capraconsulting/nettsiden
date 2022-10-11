import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Badge } from "~/components/badge";
import { Card } from "~/components/card";
import { FilterRow } from "~/components/filter-row";
import { TitleAndText } from "~/components/title-and-text";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author, JobCategory } from "~/sanity/schema";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import type { Images } from "~/utils/dataRetrieval";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { urlFor } from "~/utils/imageBuilder";
import { uniqueBy } from "~/utils/misc";

type AuthorExpanded = Omit<Author, "filter"> & { filter: JobCategory[] };

const URL_FILTER_KEY = "kategori";
export const loader = async ({ request }: LoaderArgs) => {
  const [allItems, icons] = await Promise.all([
    sanityClient.query<AuthorExpanded>(
      `* [_type == "author" && employee == true] | order(name){ ..., filter[]-> }`,
    ),
    fetchImageAssets([
      "icon-website",
      "icon-twitter",
      "icon-linkedin",
      "icon-github",
    ]),
  ]);

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
    { items: filteredItems, filters, icons },
    { headers: cacheControlHeaders },
  );
};
export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const handle: CapraHandle = {
  contactFormTitle: "Snakk med oss om dine IT-utfordringer!",
};

export default function Ansatte() {
  const data = useLoaderData<typeof loader>();
  const [search] = useSearchParams();
  return (
    <div className="max-w-7xl w-full sm:w-11/12 flex flex-col gap-12">
      <TitleAndText title="Kontakt oss i Capra" titleAs="h1">
        Vi vil gjerne høre fra deg.
      </TitleAndText>

      <div className="flex flex-col gap-8">
        <Form method="get" action=".">
          <FilterRow
            filters={data.filters.map((x) => x.title!)}
            activeFilters={search.getAll(URL_FILTER_KEY)}
            filterKey={URL_FILTER_KEY}
          />
        </Form>

        <ul className="grid gap-12 sm:gap-10 md:gap-8 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
          {data.items.map((x) => (
            <li key={x._id}>
              <AnsattCard employee={x as AuthorExpanded} icons={data.icons} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface AnsattCardProps {
  employee: AuthorExpanded;
  icons: Images<
    "icon-website" | "icon-twitter" | "icon-linkedin" | "icon-github"
  >;
}

export const AnsattCard = ({ employee, icons }: AnsattCardProps) => {
  const classes = /*tw*/ {
    icon: "w-6 h-6 transition-all hover:invert",
  };
  return (
    <Card
      image={
        <div className="relative pb-[66%] md:pb-[100%]">
          <img
            className="absolute h-full w-full object-cover"
            alt={`Bilde av ${employee.name}`}
            src={urlFor(employee.image!)
              .size(4500 / 5, 3000 / 5)
              .url()}
          />
        </div>
      }
    >
      <div>
        <p className="text-lg font-bold color-secondary¨">{employee.name}</p>
        <a href={`mailto:${employee.email}`} className="underline">
          {employee.email}
        </a>
        {employee.phone && (
          <a
            href={`tel:+47${employee.phone.replace(/\s/g, "")}`}
            className="underline"
          >
            {employee.phone}
          </a>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1">
        {employee.filter.map((x) => (
          <Badge key={x._id} variant="solid" color="main" size="sm">
            {x.title}
          </Badge>
        ))}
      </div>

      {/* Social Icons */}
      <div className="mt-auto flex gap-1">
        {employee.linkedIn && (
          <a href={employee.linkedIn}>
            <img
              alt="linkedin"
              className={classes.icon}
              src={icons["icon-linkedin"].imageUrl}
            />
          </a>
        )}
        {employee.twitter && (
          <a href={employee.twitter}>
            <img
              alt="twitter"
              className={classes.icon}
              src={icons["icon-twitter"].imageUrl}
            />
          </a>
        )}
        {employee.github && (
          <a href={employee.github}>
            <img
              alt="github"
              className={classes.icon}
              src={icons["icon-github"].imageUrl}
            />
          </a>
        )}
        {employee.website && (
          <a href={employee.website}>
            <img
              alt="nettside"
              className={classes.icon}
              src={icons["icon-website"].imageUrl}
            />
          </a>
        )}
      </div>
    </Card>
  );
};
