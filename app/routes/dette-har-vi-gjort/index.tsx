import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { CallToActionBox } from "~/components/call-to-action-box";
import { TitleAndText } from "~/components/title-and-text";
import { Todo } from "~/components/todo";
import { sanityClient } from "~/sanity/sanity-client.server";

// TODO: I propose to move this function to a shared utility/common file
export function assertItemFound<T>(item: T | undefined): asserts item is T {
  if (item === undefined)
    throw new Response("Not Found", {
      status: 404,
    });
}

const query = () => sanityClient.getAll("selvskryt");

type Data = { items: Awaited<ReturnType<typeof query>> };
export const loader: LoaderFunction = async () => {
  const items = await query();
  return json<Data>({ items });
};

const TITLE =
  "Vi er stolte av arbeidet vi gjør - Se caser her | Capra Consulting";
const DESCRIPTION =
  "Det er viktig å løfte frem godt arbeid! Vi syns også det er helt nødvendig å vise frem det flotte vi i Capra får til sammen med våre kunder. Se caser her.";
export const meta: MetaFunction = () => ({
  title: TITLE,
  description: DESCRIPTION,
});

export default function DetteHarViGjort() {
  const { items } = useLoaderData<Data>();

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <TitleAndText title="Dette har vi gjort for andre" titleAs="h1">
          Vi skaper samfunsnytte for over 1 000 000 brukere hver eneste dag! Her
          har du noen få av tingene våre kick-ass folk gjør for kunder.
        </TitleAndText>

        <Todo badge title="filter buttons" className="w-full" />
        <ul
          className="grid gap-10"
          style={{ gridTemplateColumns: "repeat(auto-fit,360px)" }}
        >
          {items.map((item) => (
            <li key={item._id} className="">
              <Todo
                title=""
                className="block border-none py-0 px-0 h-full w-full"
              >
                <Link className="w-full border shadow" to={item.slug?.current!}>
                  <Todo title="image" className="h-40" />
                  <div className="p-4">
                    <div className="text-lg font-semibold text-sky-500">
                      {item.title}
                    </div>
                    <div>{item.helmetTitle}</div>
                    <div className="mt-4 flex gap-2">
                      <Todo
                        size="small"
                        title=""
                        className="text-xs py-0 px-1 w-20"
                      >
                        Konsulent
                      </Todo>
                      <Todo
                        size="small"
                        title=""
                        className="text-xs py-0 px-1 w-20"
                      >
                        Privat
                      </Todo>
                    </div>
                  </div>
                </Link>
              </Todo>
            </li>
          ))}
        </ul>
      </div>

      <CallToActionBox
        title="Er du nysgjerrig om du og Capra er en match?"
        description="Ta en titt på stillingene våre da vel!"
        linkText="Se stillinger"
      />
    </>
  );
}

interface CardGridProps {}
export const CardGrid = (_: CardGridProps) => {
  return <Todo />;
};
