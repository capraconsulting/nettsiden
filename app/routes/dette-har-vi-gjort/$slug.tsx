import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import sanityClient from "~/sanity/sanity-client";

// TODO: I propose to move this function to a shared utility/common file
export function assertItemFound<T>(item: T | undefined): asserts item is T {
  if (item === undefined)
    throw new Response("Not Found", {
      status: 404,
    });
}

const query = (slug: string) =>
  sanityClient.getAll("selvskryt", `slug.current == "${slug}"`);

type Data = { item: Awaited<ReturnType<typeof query>>[0] };
export const loader: LoaderFunction = async ({ params }) => {
  const item = (await query(params.slug ?? ""))[0];
  assertItemFound(item);

  return json<Data>({ item });
};

export const meta: MetaFunction = ({ data }: { data: Data }) => ({
  title: data.item.helmetTitle,
  description: data.item.helmetDescription,
});

export default function () {
  const { item } = useLoaderData<Data>();

  // Quick and dirty
  // Extract some text from the BlockContent body
  const texts = item.body
    ?.map((x) => (x as any)?.children[0]?.text)
    .filter(Boolean);

  return (
    <main>
      <h1>{item.helmetTitle}</h1>
      <p>{item.helmetDescription}</p>
      {texts?.map((x, i) => (
        <p key={i}>{x}</p>
      ))}
      <details>
        <summary>See JSON</summary>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </details>
    </main>
  );
}
