import type { Blogg, Selvskryt } from "~/sanity/schema";
import { typedBoolean } from "~/utils/misc";

// https://www.sanity.io/docs/presenting-block-text#ac67a867dd69
export function getMainImageAlt({
  mainImageAlt,
}: Pick<Blogg | Selvskryt, "mainImageAlt">): string {
  if (typeof mainImageAlt === "string") {
    return mainImageAlt;
  }

  return (mainImageAlt ?? [])
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return null;
      }

      return block.children
        .map((child: { text?: string }) => child.text)
        .join("");
    })
    .filter(typedBoolean)
    .join("\n\n");
}
