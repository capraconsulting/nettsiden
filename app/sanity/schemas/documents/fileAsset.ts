import { defineField, defineType } from "sanity";

export default defineType({
  name: "fileAsset",
  title: "Filresurser",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "file",
      title: "Asset",
      type: "file",
    }),
  ],
});
