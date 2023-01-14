import { defineField, defineType } from "sanity";

export default defineType({
  name: "services",
  title: "Tjenester",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Brukes pt ikke, men er tenkt som supplerende info",
      type: "text",
    }),
  ],
});
