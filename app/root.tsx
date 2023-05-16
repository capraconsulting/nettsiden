import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";

import sourceSansStyles from "@fontsource/source-sans-pro/latin.css";

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
    href: sourceSansStyles,
    // href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900&display=swap",
  },
];

export default function App() {
  return (
    <html lang="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col scroll-smooth">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        {/* Cloudflare Web Analytics */}
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "144efc4bcac246e2acd9d9e779d0cc8a"}'
          />
        )}

        {/* Google Tag Manager */}
        {process.env.NODE_ENV === "production" && (
          // Copied from the Google Tag Manager dashboard tagmanager.google.com
          // This script manipulates the DOM, causing hydration errors
          // Use this neat trick I found on the Remix discord to lett react load first
          // conditionally rendering the script tag after hydration did not work.
          <script
            ref={(ref) => {
              if (!ref) return;
              ref.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T6XK756');`;
            }}
          />
        )}

        {/* Kill Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
              for (let registration of registrations) {
                registration.unregister();
              }
            });
        `,
          }}
        />
      </body>
    </html>
  );
}
