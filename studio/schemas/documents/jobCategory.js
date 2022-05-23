export default {
  name: "jobCategory",
  title: "Teams og stillinger",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Navn",
      type: "string",
    },
    { name: "purpose", title: "Formål", type: "text" },
    {
      name: "visibleInOrgChart",
      title: "Synlig i orgnisasjonskart?",
      type: "boolean",
    },
  ],
};
