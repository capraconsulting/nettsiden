import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Todo } from "./components/Todo";
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
        <div className="text-2xl font-bold">CAPRA</div>
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
    <Todo badge title="FOOTER" className="bg-red-500 grow border-none h-96">
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
