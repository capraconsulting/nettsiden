import { createClient } from "sanity-codegen";

import type { ClientArgs } from "~/integrations/types";
import type { SitemapEntry } from "~/types";
import { typedBoolean } from "~/utils/misc";
import { config } from "./config";
import type { Documents } from "./schema";
import { isInPreviewMode } from "./utils";

export function getSanityClient(clientArgs?: ClientArgs) {
  const previewMode = clientArgs && isInPreviewMode(clientArgs);
  const token = clientArgs?.context.SANITY_TOKEN;
  return createClient<Documents>({
    ...config,
    previewMode,
    token,
    fetch,
  });
}

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
