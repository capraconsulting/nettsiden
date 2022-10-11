import type { HeadersFunction } from "@remix-run/server-runtime";

import { Todo } from "~/components/todo";
import { cacheControlHeaders } from "~/utils/cache-control";

export const headers: HeadersFunction = () => cacheControlHeaders;

export default function Backend() {
  return <Todo title="Backend">Under construction…</Todo>;
}
