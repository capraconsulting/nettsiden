import { s } from "sanity-typed-schema-builder";

export const jobCategory = s.document({
  name: "jobCategory",
  title: "Teams og stillinger",
  fields: [
    {
      name: "title",
      title: "Navn",
      type: s.string(),
    },
    {
      name: "purpose",
      title: "Formål",
      type: s.text(),
      optional: true,
    },
    {
      name: "visibleInOrgChart",
      title: "Synlig i organisasjonskart?",
      type: s.boolean(),
      optional: true,
    },
  ],
});
