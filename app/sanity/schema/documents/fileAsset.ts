import { s } from "sanity-typed-schema-builder";

export const fileAsset = s.document({
  name: "fileAsset",
  title: "Filresurser",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: s.string(),
    },
    {
      name: "file",
      title: "Asset",
      type: s.file(),
    },
  ],
});
