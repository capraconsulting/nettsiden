import type { AssetsManifest } from "@remix-run/server-runtime/dist/entry";
import type {
  EntryRouteModule,
  RouteModules,
} from "@remix-run/server-runtime/dist/routeModules";

import type { CapraHandle, SitemapEntry } from "~/types";
import { isEqual, removeTrailingSlash, typedBoolean } from "~/utils/misc";

export async function getSiteMapEntries(
  request: Request,
  routeModules: RouteModules<EntryRouteModule>,
  manifest: AssetsManifest,
): Promise<SitemapEntry[]> {
  const entries = await Promise.all(
    Object.entries(routeModules).map(async ([id, mod]) => {
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

      const manifestEntry = manifest.routes[id];
      if (!manifestEntry) {
        console.warn(`Could not find a manifest entry for ${id}`);
        return;
      }
      let parentId = manifestEntry.parentId;
      let parent = parentId ? manifest.routes[parentId] : null;

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
        parent = parentId ? manifest.routes[parentId] : null;
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
