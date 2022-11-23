import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";

import { Todo } from "~/components/todo";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "Backendutvikling - Hva er det?",
    description:
      "De senere år har backendutvikling vært preget av Java, open-source, kontinuerlig leveranse og mye mer. Les mer her om hva vi kan om backend >>",
  });

export default function Backend() {
  return <Todo title="Backend">Under construction…</Todo>;
}
