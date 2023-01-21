import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Badge } from "~/components/badge";
import { CapraImage } from "~/components/capra-image";
import { Card } from "~/components/card";
import { FilterRow } from "~/components/filter-row";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Author, JobCategory } from "~/sanity/schema";
import type { CapraHandle } from "~/types";
import { cacheControlHeaders } from "~/utils/cache-control";
import type { Images } from "~/utils/dataRetrieval";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { urlFor } from "~/utils/imageBuilder";
import { metaTags } from "~/utils/meta-tags";
import { uniqueBy } from "~/utils/misc";

type AuthorExpanded = Omit<Author, "filter"> & { filter: JobCategory[] };

const URL_FILTER_KEY = "kategori";
export const loader = async ({ request }: LoaderArgs) => {
  const [allItems, icons] = await Promise.all([
    getSanityClient().query<AuthorExpanded>(
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

export const meta: V2_MetaFunction = () =>
  metaTags({
    title: "IT-konsulenter med ekspertise i software",
    description:
      "Vi er IT-konsulenter innen softwareutvikling og Norges beste på sky. I Capra har vi høy kvalitet på våre ansatte, og det vil vi fortsette med. Bli med oss!",
  });

export default function Ansatte() {
  const data = useLoaderData<typeof loader>();
  const [search] = useSearchParams();
  return (
    <Section>
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

        <ul className="grid grid-cols-1 justify-center gap-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-6">
          {data.items.map((x, i) => (
            <li key={x._id}>
              <AnsattCard
                employee={x}
                icons={data.icons}
                imageProps={{ loading: i >= 4 ? "lazy" : "eager" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

interface AnsattCardProps {
  employee: AuthorExpanded;
  icons: Images<
    "icon-website" | "icon-twitter" | "icon-linkedin" | "icon-github"
  >;
  hideImage?: boolean;
  imageProps?: React.ComponentProps<"img">;
}

export const AnsattCard = ({
  employee,
  icons,
  hideImage = false,
  imageProps,
}: AnsattCardProps) => {
  const classes = /*tw*/ {
    icon: "w-6 h-6 transition-all hover:invert",
  };
  return (
    <Card
      image={
        !hideImage && (
          <div className="relative pb-[66%] md:pb-[100%]">
            <CapraImage
              className="absolute h-full w-full object-cover"
              alt={`Bilde av ${employee.name}`}
              src={urlFor(employee.image!)
                .size(4500 / 5, 3000 / 5)
                .url()}
              {...imageProps}
            />
          </div>
        )
      }
    >
      <div className="flex flex-col items-start">
        <p className="color-secondary¨ text-lg font-bold">{employee.name}</p>
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
            <CapraImage
              className={classes.icon}
              image={icons["icon-linkedin"]}
            />
          </a>
        )}
        {employee.twitter && (
          <a href={employee.twitter}>
            <CapraImage
              className={classes.icon}
              image={icons["icon-twitter"]}
            />
          </a>
        )}
        {employee.github && (
          <a href={employee.github}>
            <CapraImage className={classes.icon} image={icons["icon-github"]} />
          </a>
        )}
        {employee.website && (
          <a href={employee.website}>
            <CapraImage
              className={classes.icon}
              image={icons["icon-website"]}
            />
          </a>
        )}
      </div>
    </Card>
  );
};
