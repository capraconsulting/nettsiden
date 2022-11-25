import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const loader = async ({ request, context }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  // Just purge everything!
  // const cacheKeys = await caches.keys();
  // (await caches.keys()).forEach((key) => caches.delete(key));
  const getMethods = (obj: any) =>
    Object.getOwnPropertyNames(obj).filter(
      (item) => typeof obj[item] === "function",
    );

  const catFact = await fetch("https://catfact.ninja/fact?test=123", {
    cf: {
      cacheEverything: true,
      cacheTtl: purge ? 0 : cacheTtl,
    },
  });

  const catFactJson = await catFact.json<{ fact: string; length: number }>();
  return json({
    caches,
    cachesFromContext: context,
    cachesFunctions: getMethods(caches),
    cachesFromContextFunctions: getMethods(caches),
    purged: purge,
    cacheTtl,
    now: new Date(),
    age: catFact.headers.get("age"),
    "cf-cache-status": catFact.headers.get("cf-cache-status"),
    fact: catFactJson.fact,
  });
};
