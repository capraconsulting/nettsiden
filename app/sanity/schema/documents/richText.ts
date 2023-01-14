import { s } from "sanity-typed-schema-builder";

import { richTextImage } from "~/sanity/schema/objects/richTextImage";
import { youtube } from "~/sanity/schema/objects/youtube";

export const richText = s.array({
  name: "richText",
  title: "Riktekst",
  of: [
    s.block(),
    richTextImage,
    /* FIXME
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

     */
    youtube,
    s.image(),
  ],
});
