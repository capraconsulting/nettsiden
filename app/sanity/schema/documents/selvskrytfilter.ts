import { s } from "sanity-typed-schema-builder";

export const selvskrytfilter = s.document({
  name: "selvskrytfilter",
  title: "Selvskryt filter",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
  ],
});
