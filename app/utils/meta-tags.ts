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

  const tags: Record<string, string> = {
    title,
    description,
    "og:title": title,
    "og:description": description,
  };

  if (author) {
    tags.author = author;
  }

  if (image) {
    tags["og:image"] = image;
  }

  if (card) {
    tags["og:type"] = card;
    tags["twitter:card"] = card;
    tags["twitter:title"] = title;
    tags["twitter:description"] = description;

    if (image) {
      tags["twitter:image"] = image;
    }

    if (author) {
      tags["twitter:creator"] = author;
    }
  }

  return tags;
}
