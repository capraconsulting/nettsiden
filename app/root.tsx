import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
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
import { menuItems } from "~/utils/constants";
import { Todo } from "./components/todo";
import globalStyles from "./global.css";
import tailwindStyles from "./tailwind.css";

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
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

interface Data {
  baseUrl: string;
  requestHeaders: any;
}
export const loader: LoaderFunction = ({ request }) => {
  const host = request.headers.get("host")!;
  return json<Data>({
    baseUrl: `//${host}/`,
    requestHeaders: Object.fromEntries(request.headers),
  });
};

export default function App() {
  const { baseUrl, requestHeaders } = useLoaderData<Data>();

  return (
    <html lang="en">
      <head>
        <base href={baseUrl} />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center gap-12 md:gap-36 py-[50px]">
          <Outlet />
        </main>
        <pre>{JSON.stringify(requestHeaders, null, 2)}</pre>
        <Footer />

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
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <Todo
      badge
      title=""
      className="border-l-0 border-r-0 border-t-0 border-b-2 h-20 w-full"
    >
      <div className="flex w-screen gap-2 justify-between items-center px-4">
        <a href="/" className="text-2xl font-bold">
          CAPRA
        </a>
        <ul className="flex items-center overflow-scroll">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </Todo>
  );
};
