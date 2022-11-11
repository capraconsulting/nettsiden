import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/server-runtime";

import globalStyles from "./global.css";
import tailwindStyles from "./tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/ico",
    sizes: "any",
  },
  {
    rel: "icon",
    href: "/icon.svg",
    type: "image/svg+xml",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
  },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="no">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        {/* The old Gatsby site had a service worker, get rid of it */}
        {/* https://stackoverflow.com/a/43251773 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //returns installed service workers
    if (registrations.length) {
      for(let registration of registrations) {
        registration.unregister();
      }
    }
  });
}
`,
          }}
        />
      </body>
    </html>
  );
}
