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

import { route } from "routes-gen";

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center gap-12 md:gap-36 py-[50px]">
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
  { title: "Dette kan vi", href: route("/dette-kan-vi") },
  { title: "Dette har vi gjort", href: route("/dette-har-vi-gjort") },
  { title: "Blogg", href: route("/blogg") },
  { title: "Mentorprogram", href: route("/mentor") },
  { title: "Bli en av oss", href: route("/bli-en-av-oss") },
  { title: "Partnere", href: route("/partnere") },
  { title: "Om oss", href: route("/om-oss") },
  { title: "Ansatte", href: route("/ansatte") },
];
const Header = () => {
  return (
    <Todo
      badge
      title=""
      className="border-l-0 border-r-0 border-t-0 border-b-2 h-20 w-full"
    >
      <div className="flex w-screen gap-2 justify-between items-center px-4">
        <a href={route("/")} className="text-2xl font-bold">
          CAPRA
        </a>
        <ul className="flex items-center overflow-scroll">
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
    <Todo badge title="FOOTER" className="bg-main border-none h-96">
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
