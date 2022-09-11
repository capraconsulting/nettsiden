import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { DataFunctionArgs } from "@remix-run/server-runtime/dist/routeModules";

import { ContactForm } from "~/components/contact-form";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Todo } from "~/components/todo";
import type { CapraHandle } from "~/types";
import { fetchImageAssets } from "~/utils/dataRetrieval";
import { typedBoolean } from "~/utils/misc";

export const loader = async ({ context }: DataFunctionArgs) => {
  const images = await fetchImageAssets([
    "logo-quality-sys-cert-iso-9001",
    "logo-miljofyrtaarn",
    "logo-ekt",
  ]);

  const handle: CapraHandle | undefined = context.currentMatches
    .map((it) => it.module.handle)
    .filter(typedBoolean)
    .find((it: CapraHandle) => !!it.contactFormTitle);

  // TODO: Hente salgsansatt-bilder her om handle?.contactFormTitle finnes?

  return json({
    images,
    contactFormTitle: handle?.contactFormTitle,
  });
};

// https://remix.run/docs/en/v1/api/conventions#never-reloading-the-root
export const unstable_shouldReload = () => false;

export const meta: MetaFunction = () => ({
  title: "Capra Consulting: IT-konsulenter med ekspertise i software",
});

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();

  const contactFormTitle: string | undefined =
    matches
      .map((it) => it.handle?.contactFormTitle)
      .filter(typedBoolean)
      .reverse()[0] ?? data.contactFormTitle;

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center gap-12 md:gap-36 py-[50px] overflow-x-hidden md:overflow-x-auto">
        <Outlet />
        {contactFormTitle && <ContactForm title={contactFormTitle} />}
      </main>
      <Footer images={data.images} />
    </>
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
