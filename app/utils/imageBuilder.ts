import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { picoSanityClient } from "../sanity/getPicoClient";

const builder = imageUrlBuilder(picoSanityClient);

export const urlFor = (source: SanityImageSource) => builder.image(source);
