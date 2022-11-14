import type { LoaderArgs } from "@remix-run/server-runtime";

import type { SanityDocument } from "sanity-codegen";

import { sanityClient } from "~/sanity/sanity-client.server";
import { assertItemFound } from "~/utils/misc";

interface ShallowSanityFileAsset extends SanityDocument {
  url: string;
  originalFilename: string;
}

/**
 * Fetch pdf's from the sanity file asset store and redirect the user to them
 * as of 14. november 2022 we have two active pdf's:
 * - thecapraway.pdf
 * - personvernerklaering.pdf
 */
export const loader = async ({ params, request }: LoaderArgs) => {
  const filename = params.filename + ".pdf";
  const dl = new URL(request.url).searchParams.get("dl");

  const item = (
    await sanityClient.query<ShallowSanityFileAsset>(
      `* [_type == "fileAsset" && title == "${filename}"]{ ...file{...asset->} }`,
    )
  )[0];
  assertItemFound(item);

  const responseUrl = new URL(`${item.url}/${item.originalFilename}`);

  // Ask that the pdf be downloaded, rather than displayed
  if (dl !== undefined) {
    responseUrl.searchParams.append("dl", item.originalFilename);
  }
  return Response.redirect(responseUrl);
};
