import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

const cloudflareCachedFetch = async (
  initialRequest: string | Request,
  options: { cacheTtl: number; purge: boolean } = { cacheTtl: 0, purge: false },
) => {
  const defaultCache = (caches as any).default as Cache;

  let _request = initialRequest;
  if (typeof _request === "string") _request = new Request(_request);
  const cacheUrl = new URL(_request.url);
  const cacheKey = new Request(cacheUrl.toString(), _request);

  if (options.purge) {
    await defaultCache.delete(cacheKey);
  }
  let response = await defaultCache.match(cacheKey);
  if (!response) {
    response = await fetch(_request);
    response = new Response(response.body, response);
    response.headers.delete("Cache-Control");
    response.headers.append("Cache-Control", `s-maxage=${options.cacheTtl}`);

    await defaultCache.put(cacheKey, response.clone());
  }

  return response;
};

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  const catFact = await cloudflareCachedFetch(
    "https://catfact.ninja/fact?test=1234",
    { cacheTtl, purge },
  );

  const catFactJson = await catFact.json<{
    fact: string;
    length: number;
  }>();
  return json({
    caches,
    purged: purge,
    cacheTtl,
    now: new Date(),
    age: catFact.headers.get("age"),
    cacheControl: catFact.headers.get("Cache-Control"),
    "cf-cache-status": catFact.headers.get("cf-cache-status"),
    fact: catFactJson.fact,
  });
};
