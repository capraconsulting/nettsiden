export default {
  name: "factbox",
  title: "Faktaboks",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Navn i venstrekolonne her inne",
      description: "Brukes aldri utenfor Sanity studio",
      type: "string",
    },
    {
      name: "titleLong",
      title: "Overskrift",
      type: "string",
    },
    {
      name: "description",
      title: "Beskrivelse",
      type: "text",
    },
    {
      name: "servicesName",
      title: "Tjenester fra",
      type: "string",
    },
    {
      name: "servicesUrl",
      title: "Tjenester fra (url)",
      type: "url",
    },
    {
      name: "servicesList",
      title: "Tjenesteliste",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "services" }],
        },
      ],
    },
  ],
};
