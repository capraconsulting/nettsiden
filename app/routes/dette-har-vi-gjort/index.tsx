import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import sanityClient from "~/sanity/sanity-client.server";
import { TitleAndText } from "../../components/title-and-text";

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
      <TitleAndText title="Dette har vi gjort for andre" titleAs="h1">
        Vi skaper samfunsnytte for over 1 000 000 brukere hver eneste dag! Her
        har du noen få av tingene våre kick-ass folk gjør for kunder.
      </TitleAndText>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <Link to={item.slug?.current!}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <details>
        <summary>See JSON</summary>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </details>
    </>
  );
}
