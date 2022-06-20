import type { LoaderFunction } from "@remix-run/node";

import { getSitemapXml } from "~/utils/sitemap.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const sitemap = await getSitemapXml(
    request,
    context.routeModules,
    context.manifest,
  );
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(sitemap)),
    },
  });
};
