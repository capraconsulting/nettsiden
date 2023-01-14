import type { AppLoadContext } from "@remix-run/server-runtime";

import SanityClient from "@sanity/client";

import type { SitemapEntry } from "~/types";
import { getEnv } from "~/utils/env";
import { typedBoolean } from "~/utils/misc";
import { projectDetails } from "./config";
import type { Documents } from "./schema";
import { isInPreviewMode } from "./utils";

export const getSanityClient = (requestAndContext?: {
  request: Request;
  context: AppLoadContext;
}) => {
  // FIXME
  const previewMode = requestAndContext && isInPreviewMode(requestAndContext);
  const token =
    requestAndContext && getEnv(requestAndContext.context).SANITY_TOKEN;

  return new SanityClient({
    ...projectDetails,
    useCdn: false,
    token,
  });
};

export async function getSanitySitemapEntries(
  type: Documents["_type"],
  parent: string,
  priority?: SitemapEntry["priority"],
): Promise<SitemapEntry[]> {
  const entries: Array<{
    _id: string;
    _updatedAt?: string;
    slug?: {
      current: string;
    };
  }> = await getSanityClient().fetch(
    `*[_type == "${type}"]{ _id, _updatedAt, slug }`,
  );

  return entries
    .filter((it) => !!it.slug?.current)
    .map((it) => ({
      route: [parent, it.slug?.current].filter(typedBoolean).join("/"),
      lastmod: it._updatedAt?.slice(0, 10),
      priority,
    }));
}
