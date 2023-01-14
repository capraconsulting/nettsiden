import { s } from "sanity-typed-schema-builder";

import { services } from "~/sanity/schema/objects/services";

export const factbox = s.document({
  name: "factbox",
  title: "Faktaboks",
  fields: [
    {
      name: "title",
      title: "Navn i venstrekolonne her inne",
      description: "Brukes aldri utenfor Sanity studio",
      type: s.string(),
    },
    {
      name: "titleLong",
      title: "Overskrift",
      type: s.string(),
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: s.text(),
      optional: true,
    },
    {
      name: "servicesName",
      title: "Tjenester fra",
      type: s.string(),
      optional: true,
    },
    {
      name: "servicesUrl",
      title: "Tjenester fra (url)",
      type: s.url(),
      optional: true,
    },
    {
      name: "servicesList",
      title: "Tjenesteliste",
      type: s.array({
        of: [
          s.reference({
            to: [services],
          }),
        ],
        min: 0,
      }),
    },
  ],
});
