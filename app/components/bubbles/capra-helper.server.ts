import { getSanityClient } from "~/sanity/sanity-client.server";
import type { Author } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { typedBoolean } from "~/utils/misc";

export async function fetchEmployeeImages() {
  const employees = await getSanityClient().query<Author>(
    `* [_type == "author" && employee == true] | order(name)`,

    // TODO: Enable filtering on for when hotspot is set
    // As of 27.11.2022 the difference is 121 without hotspot vs 44 with
    // The real solution is to set hotspot every image, but for now
    // hiding all the employees is not good. Looks bad, and is missleading.
    // `* [_type == "author" && employee == true && image.hotspot.x != null] | order(name)`,
  );

  return employees
    .map((x) => x.image)
    .filter(typedBoolean)
    .map((image) => urlFor(image).size(120, 120).url());
}
