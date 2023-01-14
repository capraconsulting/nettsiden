import { defineField, defineType } from "sanity";

export default defineType({
  name: "factbox",
  title: "Faktaboks",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Navn i venstrekolonne her inne",
      description: "Brukes aldri utenfor Sanity studio",
      type: "string",
    }),
    defineField({
      name: "titleLong",
      title: "Overskrift",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
    }),
    defineField({
      name: "servicesName",
      title: "Tjenester fra",
      type: "string",
    }),
    defineField({
      name: "servicesUrl",
      title: "Tjenester fra (url)",
      type: "url",
    }),
    defineField({
      name: "servicesList",
      title: "Tjenesteliste",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "services" }],
        },
      ],
    }),
  ],
});
