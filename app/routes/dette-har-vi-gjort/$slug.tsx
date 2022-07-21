import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { UseDataFunctionReturn } from "@remix-run/react/dist/components";

import { Todo } from "~/components/todo";
import {
  getSanitySitemapEntries,
  sanityClient,
} from "~/sanity/sanity-client.server";
import type { CapraHandle } from "~/types";

export const handle: CapraHandle = {
  getSitemapEntries: () =>
    getSanitySitemapEntries("selvskryt", "/dette-har-vi-gjort"),
};

// TODO: I propose to move this function to a shared utility/common file
export function assertItemFound<T>(item: T | undefined): asserts item is T {
  if (item === undefined)
    throw new Response("Not Found", {
      status: 404,
    });
}

export const loader = async ({ params }: LoaderArgs) => {
  const query = (slug: string) =>
    sanityClient.getAll("selvskryt", `slug.current == "${slug}"`);

  const item = (await query(params.slug ?? ""))[0];
  assertItemFound(item);

  return json({ item });
};

type LoaderData = UseDataFunctionReturn<typeof loader>;
export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.item.helmetTitle,
  description: data.item.helmetDescription,
});

export default function DetteHarViGjortItem() {
  const { item } = useLoaderData<typeof loader>();

  // Quick and dirty
  // Extract some text from the BlockContent body
  const texts = item.body
    ?.map((x) => (x as any)?.children[0]?.text)
    .filter(Boolean);

  return (
    <Todo>
      <h1>{item.helmetTitle}</h1>
      <p>{item.helmetDescription}</p>
      {texts?.map((x, i) => (
        <p key={i}>{x}</p>
      ))}
      <details>
        <summary>See JSON</summary>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </details>
    </Todo>
  );
}
