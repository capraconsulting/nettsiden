import { s } from "sanity-typed-schema-builder";

export const services = s.document({
  name: "services",
  title: "Tjenester",
  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string(),
    },
    {
      name: "description",
      title: "Description",
      description: "Brukes pt ikke, men er tenkt som supplerende info",
      type: s.text(),
      optional: true,
    },
  ],
});
