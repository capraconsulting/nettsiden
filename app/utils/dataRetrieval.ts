import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

import { sanityClient } from "~/sanity/sanity-client.server";
import type { ImageAsset } from "~/sanity/schema";
import { urlFor } from "./imageBuilder";

export type Image = { imageUrl: string; alt: string; description?: string };

export type Images<T extends string> = Record<T, Image>;

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
              description: asset.description,
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

export async function fetchImageAssets<T extends string>(imageNames: T[]) {
  const imageData = await sanityClient.getAll(
    "imageAsset",
    `title in ${JSON.stringify(imageNames)}`,
  );
  return getImageObjectWithDefaultImages(imageNames, imageData);
}
