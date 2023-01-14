import { defineField, defineType } from "sanity";

export default defineType({
  name: "selvskryt",
  title: "Selvskryt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "filter",
      title: "Kategorier",
      type: "array",
      of: [{ type: "reference", to: { type: "selvskrytfilter" } }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/selvskryt/[slug]`",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Forfatter",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Hovedbilde",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mainImageAlt",
      title: "Alt tekst",
      description: "Alt tekst til hovedbildet",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Kategori",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
    }),
    defineField({
      name: "titleLong",
      title: "Lang tittel",
      description: "Brukt som tittel i artikkel",
      type: "string",
    }),
    defineField({
      name: "ingress",
      title: "Ingress",
      type: "blockContent",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "factboxes",
      title: "Faktabokser",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "factbox" }],
        },
      ],
    }),
    defineField({
      name: "helmetTitle",
      title: "SEO: Tittel i HEAD",
      type: "string",
    }),
    defineField({
      name: "helmetDescription",
      title: "SEO: Description i HEAD",
      type: "string",
    }),
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
});
