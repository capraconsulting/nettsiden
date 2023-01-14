import type { LinksFunction } from "@remix-run/server-runtime";

import { ClientOnly } from "remix-utils";
import { Studio } from "sanity";

import { config } from "~/sanity/config";
import styles from "~/studio.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function SanityStudio() {
  return (
    <ClientOnly>
      {() => (
        <Studio
          config={config}
          // To enable guests view-only access to your Studio,
          // uncomment this line!
          // unstable_noAuthBoundary
        />
      )}
    </ClientOnly>
  );
}
