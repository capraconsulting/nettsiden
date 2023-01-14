import type { PreviewValue } from "sanity";
import { s } from "sanity-typed-schema-builder";

import { author } from "~/sanity/schema/documents/author";
import { category } from "~/sanity/schema/documents/category";
import { selvskrytfilter } from "~/sanity/schema/documents/selvskrytfilter";
import { blockContent } from "~/sanity/schema/objects/blockContent";
import { factbox } from "~/sanity/schema/objects/factbox";

export const selvskryt = s.document({
  name: "selvskryt",
  title: "Selvskryt",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
    {
      name: "filter",
      title: "Kategorier",
      type: s.array({
        of: [
          s.reference({
            to: [selvskrytfilter],
          }),
        ],
        min: 0,
      }),
    },
    {
      name: "slug",
      title: "Slug",
      description:
        "Brukes til å generere URL for artikkelen under `capraconsulting.no/selvskryt/[slug]`",
      type: s.slug({
        options: {
          source: "title",
          maxLength: 96,
        },
      }),
    },
    {
      name: "author",
      title: "Forfatter",
      type: s.reference({
        to: [author],
      }),
    },
    {
      name: "mainImage",
      title: "Hovedbilde",
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
      type: s.string(),
    },
    {
      name: "categories",
      title: "Kategori",
      type: s.array({
        of: [
          s.reference({
            to: [category],
          }),
        ],
      }),
    },
    {
      name: "publishedAt",
      title: "Publisert",
      type: s.datetime(),
    },
    {
      name: "titleLong",
      title: "Lang tittel",
      description: "Brukt som tittel i artikkel",
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
      type: blockContent,
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
      }),
    },
    {
      name: "helmetTitle",
      title: "SEO: Tittel i HEAD",
      type: s.string(),
    },
    {
      name: "helmetDescription",
      title: "SEO: Description i HEAD",
      type: s.string(),
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
      } as PreviewValue; // TODO: If possible, fix this so we don't have to cast;
    },
  },
});
