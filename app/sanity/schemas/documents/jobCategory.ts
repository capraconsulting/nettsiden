import { defineField, defineType } from "sanity";

export default defineType({
  name: "jobCategory",
  title: "Teams og stillinger",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Navn",
      type: "string",
    }),
    defineField({ name: "purpose", title: "Formål", type: "text" }),
    defineField({
      name: "visibleInOrgChart",
      title: "Synlig i orgnisasjonskart?",
      type: "boolean",
    }),
  ],
});
