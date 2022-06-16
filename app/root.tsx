import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import { Todo } from "./components/todo";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
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

interface MenuItem {
  title: string;
  href: string;
}
const MENU_ITEMS: MenuItem[] = [
  { title: "Dette kan vi", href: "/dette-kan-vi" },
  { title: "Dette har vi gjort", href: "/dette-har-vi-gjort" },
  { title: "Blogg", href: "/blogg" },
  { title: "Mentorprogram", href: "/mentor" },
  { title: "Bli en av oss", href: "/bli-en-av-oss" },
  { title: "Partnere", href: "/partnere" },
  { title: "Om oss", href: "/om-oss" },
  { title: "Ansatte", href: "/ansatte" },
];
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
        <ul className="flex items-center">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </Todo>
  );
};

const Footer = () => {
  return (
    <Todo badge title="FOOTER" className="bg-red-500 border-none h-96">
      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Todo>
  );
};
