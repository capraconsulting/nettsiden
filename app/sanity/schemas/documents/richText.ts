import { defineType } from "sanity";

export default defineType({
  name: "richText",
  title: "Riktekst",
  type: "array",
  of: [
    {
      type: "block",
    },
    { type: "richTextImage", title: "Bilde" },
    {
      title: "Code",
      type: "code",
      options: {
        languageAlternatives: [
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "Kotlin", value: "kotlin" },
          { title: "Java", value: "java" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "TSX", value: "tsx" },
          { title: "JSX", value: "jsx" },
          { title: "YAML", value: "yaml" },
          { title: "Plain text", value: "text" },
        ],
      },
    },
    {
      title: "YouTube",
      type: "youtube",
    },
    {
      title: "Bilde (deprecated)",
      type: "image",
    },
  ],
});
