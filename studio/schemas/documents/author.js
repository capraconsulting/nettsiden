export default {
  name: "author",
  title: "Forfatter",
  type: "document",
  initialValue: {
    employee: false,
    placement: [],
  },
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
    {
      name: "jobTitle",
      title: "Stilling",
      description: "Hvilken stilling har personen",
      type: "string",
    },
    {
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
    },
    {
      name: "employee",
      title: "Er personen ansatt i Capra?",
      type: "boolean",
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),
      description:
        "Hvis denne blir huket av, så vil personen dukke opp i listen over ansatte",
    },
    {
      name: "phone",
      title: "Telefon",
      type: "string",
    },
    {
      name: "email",
      title: "E-post",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
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
          {
            // found on TPU page, preferably only one person should have this placement
            title: "Kontakt oss (TPU)",
            value: "tpu-contact-us",
          },
        ],
      },
    },
    {
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
    },
    {
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
    },
    {
      name: "twitter",
      title: "Twitter",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub",
      type: "url",
    },
    {
      name: "website",
      title: "Hjemmeside",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
