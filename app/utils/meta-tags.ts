import type { V2_HtmlMetaDescriptor } from "@remix-run/server-runtime";

interface MetaTags {
  title: string;
  description?: string;
  image?: string;
  card?: "summary" | "summary_large_image";
  author?: string;
}

const COMPANY_NAME = "Capra Consulting";

/**
 * Create title, description, author and image meta tags, including open graph and twitter card variants.
 */
export function metaTags({
  author,
  title,
  description,
  image,
  card = "summary",
}: MetaTags) {
  if (!description) {
    description = `${COMPANY_NAME} AS`;
  }

  if (!title.includes(COMPANY_NAME)) {
    title = [title, COMPANY_NAME].join(" | ");
  }

  const tags: V2_HtmlMetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];

  if (author) {
    tags.push({ name: "author", content: author });
  }

  if (image) {
    tags.push({ property: "og:image", content: image });
  }

  if (card) {
    tags.push(
      { property: "og:type", content: card },
      { property: "twitter:card", content: card },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description },
    );

    if (image) {
      tags.push({ property: "twitter:image", content: image });
    }

    if (author) {
      tags.push({ property: "twitter:creator", content: author });
    }
  }

  return tags;
}
