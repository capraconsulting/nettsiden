import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { typedBoolean } from "~/utils/misc";

export const fetchEmployeeImages = async () => {
  const employees = await sanityClient.query<Author>(
    // Equivalent to query in gatsby repo
    `* [_type == "author" && image.hotspot.x != null] | order(name) {..., image{..., asset->}}`,

    // TODO: Update to one of the queries below
    //
    // Only current employees
    // `* [_type == "author" && employee == true && image.hotspot.x != null] | order(name)`,

    // Only current employees regardless of hotspot
    // `* [_type == "author" && employee == true] | order(name)`,
  );
  const employeeImages = employees
    .map((x) => x.image)
    .filter(typedBoolean)
    .map((image) => urlFor(image).size(120, 120).url());
  return employeeImages;
};
