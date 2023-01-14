import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogg",
  title: "Blogg",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/blogg/[slug]`",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "authors",
      title: "Forfatter",
      description: "Legg inn en eller flere forfattere",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
    }),
    defineField({
      name: "mainImage",
      title: "Hovedbildet",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mainImageAlt",
      description: "Alt tekst til hovedbildet",
      title: "Alt tekst",
      type: "blockContent",
    }),
    defineField({
      name: "filter",
      title: "Kategorier",
      type: "array",
      of: [{ type: "reference", to: { type: "bloggfilter" } }],
    }),
    defineField({
      title: "Publisert",
      name: "publishedAt",
      type: "datetime",
      options: {
        // FIXME
        // @ts-expect-error
        locale: "no",
        dateFormat: "lll",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    }),
    defineField({
      name: "helmetTitle",
      title: "SEO: Title i HEAD",
      type: "string",
    }),
    defineField({
      name: "helmetDescription",
      title: "SEO: Meta description in HEAD",
      type: "string",
    }),
    defineField({
      name: "titleLong",
      title: "Long title",
      description: "Used as title in article",
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
      type: "richText",
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
});
