import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

import { getOldSanityClient } from "~/sanity/sanity-client.server";
import { urlFor } from "./imageBuilder";

export type Image = {
  src: string;
  alt: string;
  key?: string;
  description?: string;
  builder?: ImageBuilder;
};

type ImageBuilder = (b: ImageUrlBuilder) => ImageUrlBuilder;

type ImageParameter = string | [string, ImageBuilder];

function toKey<T extends ImageParameter>(parameter: T): ImageKey<T> {
  return (
    typeof parameter === "string" ? parameter : parameter[0]
  ) as ImageKey<T>;
}

export type Images<T extends ImageParameter> = Record<ImageKey<T>, Image>;

type ImageKey<T extends ImageParameter> = T extends string ? T : T[0];

export async function fetchImageAssets<T extends ImageParameter>(images: T[]) {
  const imageData = await getOldSanityClient().getAll(
    "imageAsset",
    `title in ${JSON.stringify(images.map(toKey))}`,
  );

  const resolvedImages = {} as Images<T>;

  let key = 0;
  for (const image of images) {
    const imageKey = toKey(image);

    // TODO: Provide sensible default image
    resolvedImages[imageKey] = {
      src: "",
      alt: "",
      key: `${++key}`,
      builder: Array.isArray(image) ? image[1] : undefined,
    };
  }

  for (const asset of imageData) {
    if (asset.title) {
      const imageKey = asset.title as ImageKey<T>;

      let src = "";
      if (asset.image) {
        let builder = urlFor(asset.image);
        const extraBuilder = resolvedImages[imageKey]?.builder;
        if (extraBuilder) {
          builder = extraBuilder(builder);
        }
        src = builder.url();
      }

      resolvedImages[imageKey] = {
        src,
        alt: asset.imageAlt ?? "",
        description: asset.description,
      };
    }
  }

  return resolvedImages;
}
