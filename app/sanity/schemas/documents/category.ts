import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
    }),
  ],
});
