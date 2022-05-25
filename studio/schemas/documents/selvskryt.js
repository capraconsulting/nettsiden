export default {
  name: "selvskryt",
  title: "Selvskryt",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      name: "filter",
      title: "Kategorier",
      type: "array",
      of: [{ type: "reference", to: { type: "selvskrytfilter" } }],
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/selvskryt/[slug]`",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Forfatter",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "mainImageAlt",
      title: "Alt tekst",
      description: "Alt tekst til hovedbildet",
      type: "string",
    },
    {
      name: "categories",
      title: "Kategori",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
    },
    {
      name: "titleLong",
      title: "Lang tittel",
      description: "Brukt som tittel i artikkel",
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
      type: "blockContent",
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
    {
      name: "helmetTitle",
      title: "SEO: Tittel i HEAD",
      type: "string",
    },
    {
      name: "helmetDescription",
      title: "SEO: Description i HEAD",
      type: "string",
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
};
