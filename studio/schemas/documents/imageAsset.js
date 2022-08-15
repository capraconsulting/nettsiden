export default {
  name: "imageAsset",
  title: "Bilderessurser",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",

      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Asset",
      type: "image",
      options: {
        hotspot: true,
      },

      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "imageAlt",
      description: "Alt tekst",
      title: "Alt tekst",
      type: "string",
    },
    {
      name: "description",
      title: "Image description",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
