import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  // Invalidate the fetch cache by doing a fetch it out caching
  // And then in the second fetch call underneath actually cache it.
  // Ideally we should only need one fetch, but I don't know if it that is possbile currently 🤷
  if (purge) await fetch("https://catfact.ninja/fact");

  const catFact = await fetch("https://catfact.ninja/fact", {
    cf: {
      cacheEverything: true,
      cacheTtl,
    },
  });

  const catFactJson = await catFact.json<{ fact: string; length: number }>();
  return json({
    purged: purge,
    cacheTtl,
    now: new Date(),
    fact: catFactJson.fact,
  });
};
