import { s } from "sanity-typed-schema-builder";

export const imageAsset = s.document({
  name: "imageAsset",
  title: "Bilderessurser",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
    {
      name: "image",
      title: "Asset",
      type: s.image({
        options: {
          hotspot: true,
        },
      }),
    },
    {
      name: "imageAlt",
      description: "Alt tekst",
      title: "Alt tekst",
      type: s.string(),
      optional: true,
    },
    {
      name: "description",
      title: "Image description",
      type: s.string(),
      optional: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
