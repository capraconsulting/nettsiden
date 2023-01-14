import { defineField, defineType } from "sanity";

export default defineType({
  name: "bloggfilter",
  title: "Blogg filter",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
  ],
});
