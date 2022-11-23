interface MetaTags {
  title: string;
  description?: string;
  image?: string;
}

const COMPANY_NAME = "Capra Consulting";

/**
 * Create title, description and image meta tags, including open graph variants.
 */
export function metaTags({ title, description, image }: MetaTags) {
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

  if (image) {
    tags["og:image"] = image;
  }

  return tags;
}
