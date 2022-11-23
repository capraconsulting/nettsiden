import { sanityClient } from "~/sanity/sanity-client.server";
import type { Author } from "~/sanity/schema";
import { urlFor } from "~/utils/imageBuilder";
import { typedBoolean } from "~/utils/misc";

export async function fetchEmployeeImages() {
  const employees = await sanityClient.query<Author>(
    // Equivalent to query in gatsby repo
    `* [_type == "author" && employee == true && image.hotspot.x != null] | order(name)`,
  );

  return employees
    .map((x) => x.image)
    .filter(typedBoolean)
    .map((image) => urlFor(image).size(120, 120).url());
}
