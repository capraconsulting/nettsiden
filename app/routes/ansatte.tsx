import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";

import imageUrlBuilder from "@sanity/image-url";

import { ContactForm } from "~/components/contact-form";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author, JobCategory } from "~/sanity/schema";
import type { Images } from "~/utils/dataRetrieval";
import { getImageObjectWithDefaultImages } from "~/utils/dataRetrieval";

type AuthorExpanded = Omit<Author, "filter"> & { filter: JobCategory[] };

// TEMP: 🤷
const imageBuilder = imageUrlBuilder({
  dataset: "production",
  projectId: "3drrs17h",
});

export const loader = async () => {
  const employyes = await sanityClient.query<AuthorExpanded>(
    `* [_type == "author" && employee == true] | order(name){ ..., filter[]-> }`,
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

  return json({ employyes, icons });
};

export default function Ansatte() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Todo title="" className="h-full px-0 py-0">
        <div className="w-full flex flex-col gap-8">
          <TitleAndText title="Kontakt oss i Capra" titleAs="h1">
            Vi vil gjerne høre fra deg.
          </TitleAndText>

          <Todo badge title="filter buttons" className="w-full" />

          <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center pb-64">
            {data.employyes.map((x) => (
              <AnsattCard
                key={x._id}
                employee={x as AuthorExpanded}
                icons={data.icons}
              />
            ))}
          </div>

          <details>
            <summary>Se kode</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </details>
        </div>
      </Todo>
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
    icon: "w-6 h-6",
  };
  return (
    <div className="bg-red no-underline transition-all w-full relative">
      {/* Image */}

      <img
        alt={`Bilde av ${employee.name}`}
        src={imageBuilder
          .image(employee.image!)
          .size(4500 / 5, 3000 / 5)
          .url()}
      />

      <p className="text-lg font-bold color-secondary¨">{employee.name}</p>
      <p className="underline">{employee.email}</p>
      <p>{employee.phone}</p>

      {/* Categories */}
      <div className="flex gap-2">
        {employee.filter.map((x) => (
          <span key={x._id} className="bg-blue p-1 rounded">
            {x.title}
          </span>
        ))}
      </div>

      {/* Icons */}
      <div className="flex gap-1">
        <span>{employee.twitter}</span>
        {employee.linkedIn && (
          <a href={employee.linkedIn}>
            <img
              alt=""
              className={classes.icon}
              src={icons["icon-linkedin"].imageUrl}
            />
          </a>
        )}
        {employee.twitter && (
          <a href={employee.twitter}>
            <img
              alt=""
              className={classes.icon}
              src={icons["icon-twitter"].imageUrl}
            />
          </a>
        )}
        {employee.github && (
          <a href={employee.github}>
            <img
              alt=""
              className={classes.icon}
              src={icons["icon-github"].imageUrl}
            />
          </a>
        )}
        {employee.website && (
          <a href={employee.website}>
            <img
              alt=""
              className={classes.icon}
              src={icons["icon-website"].imageUrl}
            />
          </a>
        )}
      </div>
    </div>
  );
};
