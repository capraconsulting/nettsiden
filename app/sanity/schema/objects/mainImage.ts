import { s } from "sanity-typed-schema-builder";

export const mainImage = s.image({
  name: "mainImage",
  title: "Image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: s.string(),
      title: "Caption",
    },
    {
      name: "alt",
      type: s.string(),
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
      /* FIXME
      validation: (Rule) =>
        Rule.error("You have to fill out the alternative text.").required(),

       */
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
});
