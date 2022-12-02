import type { AppLoadContext } from "@remix-run/server-runtime";

import type { BlockContent, Blogg, Selvskryt } from "~/sanity/schema";
import { getEnv } from "~/utils/env";
import { typedBoolean } from "~/utils/misc";

export function getMainImageAlt({
  mainImageAlt,
}: Pick<Blogg | Selvskryt, "mainImageAlt">): string {
  if (typeof mainImageAlt === "string") {
    return mainImageAlt;
  }

  return getRawStringContent(mainImageAlt);
}

// https://www.sanity.io/docs/presenting-block-text#ac67a867dd69
export function getRawStringContent(block: BlockContent | undefined): string {
  return (block ?? [])
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return null;
      }
      return block.children
        .map((child: { text?: string }) => child.text)
        .join("");
    })
    .filter(typedBoolean)
    .join("\n\n");
}

export const isInPreviewMode = ({
  request,
  context,
}: {
  request: Request;
  context: AppLoadContext;
}): boolean => {
  const requestUrl = new URL(request.url);
  return (
    requestUrl.searchParams.get("preview") ===
    getEnv(context).SANITY_PREVIEW_SECRET
  );
};
