import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

import type { ImageAsset } from "~/sanity/schema";
import { urlFor } from "./imageBuilder";

type Images<T extends string> = Record<T, { imageUrl: string; alt: string }>;

export const getImageObjectWithDefaultImages = <T extends readonly string[]>(
  imageNames: T,
  data: ({
    _type: "imageAsset";
  } & ImageAsset)[],
) => {
  type ArrayElement = T[number];
  type ReturnType = Images<ArrayElement>;
  const retrievedImages = data.reduce<ReturnType>(
    (images, asset) =>
      asset.title
        ? {
            ...images,
            [asset.title]: {
              imageUrl: urlFor(asset.image as SanityImageObject).url(),
              alt: asset.imageAlt ?? "",
            },
          }
        : images,
    {} as ReturnType,
  );

  return imageNames.reduce<ReturnType>(
    (images, imageName) => ({
      ...images,
      [imageName]:
        imageName in retrievedImages
          ? retrievedImages[imageName as ArrayElement]
          : { imageUrl: "", alt: "" }, // TODO: Supply default image
    }),
    {} as ReturnType,
  );
};
