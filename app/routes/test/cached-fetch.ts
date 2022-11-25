import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  const defaultCache = (caches as any).default as Cache;
  const f = await caches.open("default");
  // const cacheKeys = await f?.keys?.();
  // const defaultCacheKeys = await defaultCache?.keys?.();
  const keysFunction = typeof defaultCache?.keys;
  const catFact = await fetch("https://catfact.ninja/fact?test=123", {
    cf: {
      cacheEverything: true,
      cacheTtl: purge ? 0 : cacheTtl,
    },
  });

  const catFactJson = await catFact.json<{ fact: string; length: number }>();
  return json({
    caches,
    // cacheKeys,
    defaultCache,
    // defaultCacheKeys,
    keysFunction,

    purged: purge,
    cacheTtl,
    now: new Date(),
    age: catFact.headers.get("age"),
    "cf-cache-status": catFact.headers.get("cf-cache-status"),
    fact: catFactJson.fact,
  });
};
