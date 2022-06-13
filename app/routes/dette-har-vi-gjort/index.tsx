import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import sanityClient from "~/sanity/sanity-client.server";

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

const TITLE = "Dette har vi gjort"; // TODO: get from sanity
const DESCRIPTION = "Dette har vi gjort"; // TODO: get from sanity
export const meta: MetaFunction = () => ({
  title: TITLE,
  description: DESCRIPTION,
});

export default function () {
  const { items } = useLoaderData<Data>();

  return (
    <main>
      <h1>{TITLE}</h1>

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
    </main>
  );
}
