import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

const cloudflareCachedFetch = async (
  request: string | Request,
  options: { cacheTtl: number; purge: boolean } = { cacheTtl: 0, purge: false },
) => {
  const defaultCache = (caches as any).default as Cache;
  if (options.purge) {
    await defaultCache.delete(request);
  }
  let response = await defaultCache.match(request);
  if (!response) {
    response = await fetch(request);
    response = new Response(response.body, response);
    response.headers.append("Cache-Control", `s-maxage=${options.cacheTtl}`);

    await defaultCache.put(request, response.clone());
  }

  return response;
};

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const cacheTtl = Number.parseInt(searchParams.get("cacheTtl") ?? "") || 10;
  const purge = searchParams.get("purge") === "true";

  const catFactResponse = await cloudflareCachedFetch(
    "https://catfact.ninja/fact?test=1234",
    { cacheTtl, purge },
  );

  const catFactJson = await catFactResponse.json<{
    fact: string;
    length: number;
  }>();
  return json({
    purged: purge,
    cacheTtl,
    now: new Date(),
    fact: catFactJson.fact,
  });
};
