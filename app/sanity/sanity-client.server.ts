import type { AppLoadContext } from "@remix-run/server-runtime";

import { createClient } from "sanity-codegen";

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
  const previewMode = requestAndContext && isInPreviewMode(requestAndContext);
  const token =
    requestAndContext && getEnv(requestAndContext.context).SANITY_TOKEN;

  return createClient<Documents>({
    ...projectDetails,
    useCdn: false,
    previewMode,
    token,

    // Avoid "ReferenceError - fetch is not defined"
    // By wrapping it in a lambda function we defer the initilisation
    // of fetch until after remix has put fetch into the global scope.
    //
    // Ideally this should not be needed, fetch should be in the global scope
    // when this is parsed. It worked in previous commits 🤷
    fetch: (...args) => fetch(...args),
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
    }; // FIXME: This should probably be a getAll, but I can't get it to work with the fields filter..
  }> = await getSanityClient().query(
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
