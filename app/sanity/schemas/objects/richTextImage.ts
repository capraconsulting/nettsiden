import { defineField, defineType } from "sanity";

export default defineType({
  type: "image",
  name: "richTextImage",
  title: "Bilde",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "caption",
      type: "string",
      title: "Caption text",
    }),
    defineField({
      type: "text",
      name: "alt",
      title: "Alternative text",
      description: `Some of your visitors cannot see images,
            be they blind, color-blind, low-sighted;
            alternative text is of great help for those
            people that can rely on it to have a good idea of
            what's on your page.`,
    }),
  ],
});
