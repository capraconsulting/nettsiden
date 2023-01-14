import { s } from "sanity-typed-schema-builder";

export const bloggfilter = s.document({
  name: "bloggfilter",
  title: "Blogg filter",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
  ],
});
