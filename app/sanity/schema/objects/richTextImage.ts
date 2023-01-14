import { s } from "sanity-typed-schema-builder";

export const richTextImage = s.image({
  name: "richTextImage",
  title: "Bilde",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "caption",
      type: s.string(),
      title: "Caption text",
    },
    {
      type: s.text(),
      name: "alt",
      title: "Alternative text",
      description: `Some of your visitors cannot see images,
            be they blind, color-blind, low-sighted;
            alternative text is of great help for those
            people that can rely on it to have a good idea of
            what's on your page.`,
    },
  ],
});
