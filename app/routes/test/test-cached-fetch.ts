import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  const catFact = await fetch("https://catfact.ninja/fact", {
    cf: {
      cacheEverything: true,
      cacheTtl: purge ? 0 : cacheTtl,
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
