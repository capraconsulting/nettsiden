import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageAsset",
  title: "Bilderessurser",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Asset",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageAlt",
      description: "Alt tekst",
      title: "Alt tekst",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Image description",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
