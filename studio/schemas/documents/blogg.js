export default {
  name: "blogg",
  title: "Blogg",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/blogg/[slug]`",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "authors",
      title: "Forfatter",
      description: "Legg inn en eller flere forfattere",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
    },
    {
      name: "mainImage",
      title: "Hovedbildet",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mainImageAlt",
      description: "Alt tekst til hovedbildet",
      title: "Alt tekst",
      type: "blockContent",
    },
    {
      name: "filter",
      title: "Kategorier",
      type: "array",
      of: [{ type: "reference", to: { type: "bloggfilter" } }],
    },
    {
      title: "Publisert",
      name: "publishedAt",
      type: "datetime",
      options: {
        locale: "no",
        dateFormat: "lll",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "helmetTitle",
      title: "SEO: Title i HEAD",
      type: "string",
    },
    {
      name: "helmetDescription",
      title: "SEO: Meta description in HEAD",
      type: "string",
    },
    {
      name: "titleLong",
      title: "Long title",
      description: "Used as title in article",
      type: "string",
    },
    {
      name: "ingress",
      title: "Ingress",
      type: "blockContent",
    },
    {
      name: "body",
      title: "Body",
      type: "richText",
    },
    {
      name: "factboxes",
      title: "Faktabokser",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "factbox" }],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      ingress: "ingress",
      body: "body",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
};
