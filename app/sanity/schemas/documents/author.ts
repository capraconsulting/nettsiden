import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Forfatter",
  type: "document",
  initialValue: {
    employee: false,
    placement: [],
  },
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Stilling",
      description: "Hvilken stilling har personen",
      type: "string",
    }),
    defineField({
      name: "filter",
      title: "Jobbkategori",
      description:
        "Hvilken kategori/avdeling er personen i (kun relevant for ansatte i Capra)? Salg, Marked..etc",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "jobCategory" }],
        },
      ],
    }),
    defineField({
      name: "employee",
      title: "Er personen ansatt i Capra?",
      type: "boolean",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      description:
        "Hvis denne blir huket av, så vil personen dukke opp i listen over ansatte",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-post",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "placement",
      title: "Komponent plassering",
      description: "Plasser person i følgende komponenter.",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
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
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Twitter",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
    }),
    defineField({
      name: "website",
      title: "Hjemmeside",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
