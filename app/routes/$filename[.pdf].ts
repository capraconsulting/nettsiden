import { redirect } from "@remix-run/router";
import type { LoaderArgs } from "@remix-run/server-runtime";

import type { SanityFileAsset } from "@sanity/asset-utils";

import { getSanityClient } from "~/sanity/sanity-client.server";
import { assertItemFound } from "~/utils/misc";

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
    await getSanityClient().fetch<SanityFileAsset[]>(
      `* [_type == "fileAsset" && title == "${filename}"]{ ...file{...asset->} }`,
    )
  )[0];
  assertItemFound(item);

  const responseUrl = new URL(`${item.url}/${item.originalFilename}`);

  // Ask that the pdf be downloaded, rather than displayed
  if (dl !== undefined && item.originalFilename) {
    responseUrl.searchParams.append("dl", item.originalFilename);
  }
  return redirect(responseUrl.toString());
};
