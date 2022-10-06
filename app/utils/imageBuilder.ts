import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { config } from "~/sanity/config";

const builder = imageUrlBuilder(config);

export const urlFor = (source: SanityImageSource) =>
  builder.image(source).auto("format");
