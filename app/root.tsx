import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Todo } from "./components/todo";
import globalStyles from "./global.css";
import { sanityClient } from "./sanity/sanity-client.server";
import tailwindStyles from "./tailwind.css";
import { getImageObjectWithDefaultImages } from "./utils/dataRetrieval";

export const loader = async () => {
  const imageNames = [
    "logo-quality-sys-cert-iso-9001",
    "logo-miljofyrtaarn",
    "logo-ekt",
  ] as const;
  const imageData = await sanityClient.getAll(
    "imageAsset",
    `title in ${JSON.stringify(imageNames)}`,
  );
  const images = getImageObjectWithDefaultImages(imageNames, imageData);

  return json({ images });
};

// https://remix.run/docs/en/v1/api/conventions#never-reloading-the-root
export const unstable_shouldReload = () => false;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Capra Consulting: IT-konsulenter med ekspertise i software",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="no">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full">
        <Header />
        <main className="flex-grow flex flex-col items-center gap-12 md:gap-36 py-[50px] overflow-x-hidden md:overflow-x-auto">
          <Outlet />
        </main>
        <Footer images={data.images} />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  // Her fanges alle errors
  // Den mest vanlige som kommer til å skje er 404
  // Vi trenger å håndtere to cases:
  //
  // 1. 404 - Når brukeren har blitt navigert til noe som ikke eksisterer
  // 2. 500 - Når noe går feil på server siden
  const caught = useCatch();
  const data = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <title>TODO Error side</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className="flex flex-col h-screen">
          {caught.status === 404 && (
            <Todo badge className="h-full" title="404 - Siden ble ikke funnet">
              <Todo title="F.eks. bilde av en søt/forvirret geit" />
            </Todo>
          )}

          {/* Alt annet, hovedsaklig 500 */}
          {caught.status !== 404 && (
            <Todo
              badge
              className="h-full"
              title={`${caught.status} ${caught.statusText}`}
            >
              <Todo title="Kanskje en stacktrace?"></Todo>
              <Todo title="F.eks. bilde av en geit som prøver frebrilsk å fikse nettsiden" />
            </Todo>
          )}
        </main>
        <Footer images={data.images} />
        <Scripts />
      </body>
    </html>
  );
}
