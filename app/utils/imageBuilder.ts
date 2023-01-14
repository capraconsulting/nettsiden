import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { projectDetails } from "~/sanity/config";

const builder = imageUrlBuilder(projectDetails);

export const urlFor = (source: SanityImageSource) =>
  builder.image(source).auto("format");
