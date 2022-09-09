import { Todo } from "~/components/todo";
import { getSanitySitemapEntries } from "~/sanity/sanity-client.server";
import type { CapraHandle } from "~/types";

export const handle: CapraHandle = {
  getSitemapEntries: () => getSanitySitemapEntries("blogg", "/blogg"),
};

export default function BloggPost() {
  return <Todo className="h-full" />;
}
