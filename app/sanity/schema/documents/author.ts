import { s } from "sanity-typed-schema-builder";

import { jobCategory } from "~/sanity/schema/documents/jobCategory";

export const author = s.document({
  name: "author",
  title: "Forfatter",
  // @ts-expect-error This expects all fields to be provided to the initial value, but Sanity doesn't require that
  initialValue: {
    employee: false,
    placement: [],
  },
  fields: [
    {
      name: "name",
      title: "Navn",
      type: s.string(),
    },
    {
      name: "jobTitle",
      title: "Stilling",
      description: "Hvilken stilling har personen",
      type: s.string(),
    },
    {
      name: "filter",
      title: "Jobbkategori",
      description:
        "Hvilken kategori/avdeling er personen i (kun relevant for ansatte i Capra)? Salg, Marked..etc",
      optional: true,
      type: s.array({
        of: [
          s.reference({
            to: [jobCategory],
          }),
        ],
      }),
    },
    {
      name: "employee",
      title: "Er personen ansatt i Capra?",
      type: s.boolean(),
      description:
        "Hvis denne blir huket av, så vil personen dukke opp i listen over ansatte",
    },
    {
      name: "phone",
      title: "Telefon",
      type: s.string(),
      optional: true,
    },
    {
      name: "email",
      title: "E-post",
      type: s.string(),
      optional: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: s.slug(),
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Bilde",
      type: s.image(),
      options: {
        hotspot: true,
      },
    },
    {
      name: "placement",
      title: "Komponent plassering",
      description: "Plasser person i følgende komponenter.",
      type: s.array({
        of: [s.string()],
        min: 0,
        options: {
          list: [
            {
              // found on om-oss page,
              // typically, 5 select employees (in regards to design)
              title: "Kontakt oss (om oss)",
              value: "contact-us",
            },
            {
              // found on multiple pages
              title: "Kontakt form (liten)",
              value: "contact-form",
            },
            {
              // found on bli-en-av-oss page
              title: "Rekrutteringsgjengen",
              value: "recruitment",
            },
            {
              // general employee - employed by capra
              title: "Ansatt",
              value: "employee",
            },
          ],
        },
      }),
    },
    {
      name: "bio",
      title: "Bio",
      optional: true,
      type: s.array({
        of: [
          s.block({
            styles: [{ title: "Normal", value: "normal" }],
            lists: [],
          }),
        ],
      }),
    },
    {
      name: "linkedIn",
      title: "LinkedIn",
      optional: true,
      type: s.url(),
    },
    {
      name: "twitter",
      title: "Twitter",
      optional: true,
      type: s.url(),
    },
    {
      name: "github",
      title: "GitHub",
      optional: true,
      type: s.url(),
    },
    {
      name: "website",
      title: "Hjemmeside",
      optional: true,
      type: s.url(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
