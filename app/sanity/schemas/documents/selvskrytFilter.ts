import { defineField, defineType } from "sanity";

export default defineType({
  name: "selvskrytfilter",
  title: "Selvskryt filter",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
  ],
});
