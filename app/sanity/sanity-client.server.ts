import { createClient } from "sanity-codegen";

import type { SitemapEntry } from "~/types";
import { typedBoolean } from "~/utils/misc";
import type { Documents } from "./schema";

export const sanityClient = createClient<Documents>({
  projectId: process.env.SANITY_PROJECT_ID || "3drrs17h",
  dataset: process.env.SANITY_DATASET || "production",

  // Avoid "ReferenceError - fetch is not defined"
  // By wrapping it I lambda function we defer the initilisation
  // of fetch until after remix has put fetch into the global scope.
  //
  // Ideally this should not be needed, fetch should be in the global scope
  // when this is parsed. It worked in previous commits 🤷
  fetch: (...args) => fetch(...args),

  previewMode: false,
  token: process.env.SANITY_TOKEN || "",
  useCdn: false,
});

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
  }> = await sanityClient.query(
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
