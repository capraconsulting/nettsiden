import type { PreviewValue } from "sanity";
import { s } from "sanity-typed-schema-builder";

import { author } from "~/sanity/schema/documents/author";
import { bloggfilter } from "~/sanity/schema/documents/bloggfilter";
import { richText } from "~/sanity/schema/documents/richText";
import { blockContent } from "~/sanity/schema/objects/blockContent";
import { factbox } from "~/sanity/schema/objects/factbox";

export const blogg = s.document({
  name: "blogg",
  title: "Blogg",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/blogg/[slug]`",
      type: s.slug({
        options: {
          source: "title",
          maxLength: 96,
        },
      }),
    },
    {
      name: "authors",
      title: "Forfatter",
      description: "Legg inn en eller flere forfattere",
      type: s.array({
        of: [s.reference({ to: [author] })],
        min: 1,
      }),
    },
    {
      name: "mainImage",
      title: "Hovedbildet",
      optional: true,
      type: s.image({
        options: {
          hotspot: true,
        },
      }),
    },
    {
      name: "mainImageAlt",
      title: "Alt tekst",
      description: "Alt tekst til hovedbildet",
      optional: true,
      type: blockContent,
    },
    {
      name: "filter",
      title: "Kategorier",
      type: s.array({
        of: [
          s.reference({
            to: [bloggfilter],
          }),
        ],
        min: 0,
      }),
    },
    {
      title: "Publisert",
      name: "publishedAt",
      type: s.datetime({
        options: {
          // @ts-expect-error FIXME
          locale: "no",
          dateFormat: "lll",
          timeStep: 15,
          calendarTodayLabel: "Today",
        },
      }),
    },
    {
      name: "helmetTitle",
      title: "SEO: Title i HEAD",
      type: s.string(),
    },
    {
      name: "helmetDescription",
      title: "SEO: Meta description in HEAD",
      type: s.string(),
    },
    {
      name: "titleLong",
      title: "Long title",
      description: "Used as title in article",
      type: s.string(),
    },
    {
      name: "ingress",
      title: "Ingress",
      type: blockContent,
    },
    {
      name: "body",
      title: "Body",
      type: richText,
    },
    {
      name: "factboxes",
      title: "Faktabokser",
      type: s.array({
        of: [
          s.reference({
            to: [factbox],
          }),
        ],
        min: 0,
      }),
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
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      } as PreviewValue; // TODO: If possible, fix this so we don't have to cast
    },
  },
  // @ts-expect-error This expects all fields to be provided to the initial value, but Sanity doesn't require that
  initialValue: {
    publishedAt: new Date().toISOString(),
  },
});
