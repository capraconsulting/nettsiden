import type { DataFunctionArgs } from "@remix-run/server-runtime";

import type { SitemapEntry } from "~/types";
import { getDomainUrl } from "~/utils/misc";
import { createRemixContext } from "~/utils/remix-context.server";
import { getSiteMapEntries } from "~/utils/sitemap.server";

function toXmlTag([key, value]: [string, string | number]) {
  return value ? `<${key}>${value}</${key}>` : "";
}

function toXmlEntry(domainUrl: string) {
  return ({ route, ...entry }: SitemapEntry) => {
    const tags = Object.entries(entry).map(toXmlTag);

    return `<url><loc>${domainUrl}${route}</loc>${tags.join("")}</url>`;
  };
}

export const loader = async ({ request }: DataFunctionArgs) => {
  const domainUrl = getDomainUrl(request);
  const { routeModules, manifest } = createRemixContext(request);
  const sitemapEntries: SitemapEntry[] = await getSiteMapEntries(
    request,
    routeModules,
    manifest,
  );

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${sitemapEntries.map(toXmlEntry(domainUrl)).join("")}
</urlset>
  `.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
