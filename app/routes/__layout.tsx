import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
  useMatches,
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Todo } from "~/components/todo";
import type { CapraHandle } from "~/types";
import { typedBoolean } from "~/utils/misc";
import { fetchImageAssets } from "~/utils/sanity-image";
import { ContactForm, fetchContactFormRepresentatives } from "./api.contact";

export const loader = async ({ request }: LoaderArgs) => {
  // TODO: Consider conditionally fetching the contactFormRepresentatives based on the current route
  // This might lead to some clunky revalidation when the user navigates the site
  //
  // const { matches } = createRemixContext(request);
  // const contactFormTitle = getContactFormTitle(matches.map((it) => it.module));

  const [contactFormRepresentatives, images] = await Promise.all([
    fetchContactFormRepresentatives(),
    fetchImageAssets([
      "logo-quality-sys-cert-iso-9001",
      "logo-miljofyrtaarn",
      "logo-ekt",
    ]),
  ]);

  return json({
    images,
    contactFormRepresentatives,
  });
};

// https://remix.run/docs/en/v1/route/should-revalidate#never-reloading-the-root
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const { contactFormTitle, contactFormDescription } =
    getContactFormData(matches);

  return (
    <>
      <Header />
      <main className="overflow-x-hidden md:overflow-x-auto">
        <div className="flex flex-grow flex-col items-center gap-12 py-12 md:gap-36">
          <Outlet />
        </div>
        {contactFormTitle && (
          <ContactForm
            title={contactFormTitle}
            description={contactFormDescription}
            representatives={data.contactFormRepresentatives}
          />
        )}
      </main>
      <Footer images={data.images} />
    </>
  );
}

export function UnusedCatchBoundary() {
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
        <main className="flex h-screen flex-col">
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

const getContactFormData = (matches: { handle?: CapraHandle }[]) => {
  const handleWithContactForm = matches
    .map((it) => it.handle)
    .filter(typedBoolean)
    .reverse()
    .find((it) => it.contactFormTitle !== undefined);
  const { contactFormTitle, contactFormDescription } =
    handleWithContactForm ?? {};
  return {
    contactFormTitle,
    contactFormDescription,
  };
};
