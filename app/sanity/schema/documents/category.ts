import { s } from "sanity-typed-schema-builder";

export const category = s.document({
  name: "category",
  title: "Kategori",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: s.text(),
      optional: true,
    },
  ],
});
