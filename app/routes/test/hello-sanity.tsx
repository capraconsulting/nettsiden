import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import sanityClient from "~/sanity/sanity-client.server";

const query = () =>
  sanityClient.get("selvskryt", "49e6900e-71e9-4a23-a84c-be7a6bbb4956");

type Data = { services: Awaited<ReturnType<typeof query>> };
export const loader: LoaderFunction = async () => {
  const services = await query();
  return json<Data>({ services });
};

export default function HelloSanity() {
  const { services } = useLoaderData<Data>();
  return (
    <main>
      Hello, world
      <pre>{JSON.stringify(services, null, 2)}</pre>
    </main>
  );
}
