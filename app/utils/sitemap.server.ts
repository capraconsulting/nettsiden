import type { EntryContext } from "@remix-run/node";

import type { CapraHandle, SitemapEntry } from "~/types";
import {
  getDomainUrl,
  isEqual,
  removeTrailingSlash,
  typedBoolean,
} from "~/utils/misc";

async function getSiteMapEntries(
  request: Request,
  remixContext: EntryContext,
): Promise<SitemapEntry[]> {
  const entries = await Promise.all(
    Object.entries(remixContext.routeModules).map(async ([id, mod]) => {
      if (
        id === "root" ||
        id.startsWith("routes/_") ||
        id.startsWith("routes/test")
      ) {
        return;
      }

      const handle = mod.handle as CapraHandle | undefined;
      if (handle?.getSitemapEntries) {
        return handle.getSitemapEntries(request);
      }

      // exclude resource routes from the sitemap
      // (these are an opt-in via the getSitemapEntries method)
      if (!("default" in mod)) return;

      const manifestEntry = remixContext.manifest.routes[id];
      if (!manifestEntry) {
        console.warn(`Could not find a manifest entry for ${id}`);
        return;
      }
      let parentId = manifestEntry.parentId;
      let parent = parentId ? remixContext.manifest.routes[parentId] : null;

      let path;
      if (manifestEntry.path) {
        path = removeTrailingSlash(manifestEntry.path);
      } else if (manifestEntry.index) {
        path = "";
      } else {
        return;
      }

      while (parent) {
        // the root path is '/', so it messes things up if we add another '/'
        const parentPath = parent.path ? removeTrailingSlash(parent.path) : "";
        path = `${parentPath}/${path}`;
        parentId = parent.parentId;
        parent = parentId ? remixContext.manifest.routes[parentId] : null;
      }

      // we can't handle dynamic routes, so if the handle doesn't have a
      // getSitemapEntries function, we just
      if (path.includes(":")) {
        return;
      }

      const entry: SitemapEntry = { route: removeTrailingSlash(path) };
      return entry;
    }),
  );

  const rawSitemapEntries: SitemapEntry[] = entries.flat().filter(typedBoolean);

  const sitemapEntries: SitemapEntry[] = [];
  for (const entry of rawSitemapEntries) {
    const existingEntryForRoute = sitemapEntries.find(
      (e) => e.route === entry.route,
    );
    if (existingEntryForRoute) {
      if (!isEqual(existingEntryForRoute, entry)) {
        console.warn(
          `Duplicate route for ${entry.route} with different sitemap data`,
          { entry, existingEntryForRoute },
        );
      }
    } else {
      sitemapEntries.push(entry);
    }
  }

  return sitemapEntries;
}

function toXmlTag([key, value]: [string, string]) {
  return value ? `<${key}>${value}</${key}>` : "";
}

function getEntry(domainUrl: string, { route, ...entry }: SitemapEntry) {
  const tags = Object.entries(entry).map(toXmlTag);

  return `<url><loc>${domainUrl}${route}</loc>${tags.join("")}</url>`;
}

export async function getSitemapXml(
  request: Request,
  remixContext: EntryContext,
) {
  const domainUrl = getDomainUrl(request);

  const sitemapEntries: SitemapEntry[] = await getSiteMapEntries(
    request,
    remixContext,
  );

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${sitemapEntries.map((entry) => getEntry(domainUrl, entry)).join("")}
</urlset>
  `.trim();
}
