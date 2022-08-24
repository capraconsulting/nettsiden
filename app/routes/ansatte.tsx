import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { ContactForm } from "~/components/contact-form";
import { FilterButton } from "~/components/filter-button";
import { TitleAndText } from "~/components/title-and-text";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author, JobCategory } from "~/sanity/schema";
import type { Images } from "~/utils/dataRetrieval";
import { getImageObjectWithDefaultImages } from "~/utils/dataRetrieval";
import { urlFor } from "~/utils/imageBuilder";
import { uniqueBy } from "~/utils/misc";

type AuthorExpanded = Omit<Author, "filter"> & { filter: JobCategory[] };

const URL_FILTER_KEY = "kategori";
export const loader = async ({ request }: LoaderArgs) => {
  const allEmployees = await sanityClient.query<AuthorExpanded>(
    `* [_type == "author" && employee == true] | order(name){ ..., filter[]-> }`,
  );

  let filters = allEmployees.flatMap((x) => x.filter);
  filters = uniqueBy(filters, (x) => x._id);

  // Filter the results
  const searchParams = new URL(request.url).searchParams;
  const activeFilters = new Set(searchParams.getAll(URL_FILTER_KEY));
  const filteredEmployees = allEmployees.filter(
    (x) =>
      activeFilters.size === 0 ||
      x.filter.some((filter) => activeFilters.has(filter.title!)),
  );

  const iconNames = [
    "icon-website",
    "icon-twitter",
    "icon-linkedin",
    "icon-github",
  ] as const;
  const iconData = await sanityClient.getAll(
    "imageAsset",
    `title in ${JSON.stringify(iconNames)}`,
  );

  const icons = getImageObjectWithDefaultImages(iconNames, iconData);

  return json({ employyes: filteredEmployees, filters, icons });
};

export default function Ansatte() {
  const data = useLoaderData<typeof loader>();

  const submit = useSubmit();
  const transition = useTransition();
  const [search] = useSearchParams();

  const isFilterActive = (key: string, filter: string) => {
    if (transition.submission?.formData)
      return transition.submission?.formData.getAll(key).includes(filter);
    else if (search.getAll(key).includes(filter)) return true;
    else return false;
  };

  return (
    <>
      <div className="max-w-7xl w-full sm:w-11/12 flex flex-col gap-12">
        <TitleAndText title="Kontakt oss i Capra" titleAs="h1">
          Vi vil gjerne høre fra deg.
        </TitleAndText>

        <div className="flex flex-col gap-8">
          {/* Filter */}
          <Form method="get" action="">
            <div className="flex gap-3 flex-wrap">
              {data.filters.map((x) => (
                <label key={x._id} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name={URL_FILTER_KEY}
                    className="peer sr-only"
                    value={x.title}
                    checked={isFilterActive(URL_FILTER_KEY, x.title!)}
                    onChange={(e) => submit(e.currentTarget.form)}
                  />
                  <FilterButton
                    active={isFilterActive(URL_FILTER_KEY, x.title!)}
                  >
                    {x.title}
                  </FilterButton>
                </label>
              ))}
            </div>
          </Form>

          {/* Cards */}
          <ul className="grid gap-12 sm:gap-10 md:gap-8 lg:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
            {data.employyes.map((x) => (
              <li key={x._id}>
                <AnsattCard employee={x as AuthorExpanded} icons={data.icons} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ContactForm title="Snakk med oss om dine IT-utfordringer!" />
    </>
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
    <div className="flex flex-col w-full h-full border transition-shadow shadow hover:shadow-xl">
      {/* Image */}
      <div className="relative pb-[66%] md:pb-[100%]">
        <img
          className="absolute h-full w-full object-cover"
          alt={`Bilde av ${employee.name}`}
          src={urlFor(employee.image!)
            .size(4500 / 5, 3000 / 5)
            .url()}
        />
      </div>

      <div className="h-full px-3 py-4 flex flex-col gap-5">
        <div>
          <p className="text-lg font-bold color-secondary¨">{employee.name}</p>
          <p className="underline">
            <a href={`mailto:${employee.email}`}>{employee.email}</a>
          </p>
          <p>{employee.phone}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {employee.filter.map((x) => (
            <span
              key={x._id}
              className="bg-main py-1 px-2 rounded text-sm text-white font-semibold"
            >
              {x.title}
            </span>
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
      </div>
    </div>
  );
};
