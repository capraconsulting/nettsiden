import type { HeadersFunction, MetaFunction } from "@remix-run/server-runtime";

import { Todo } from "~/components/todo";
import { cacheControlHeaders } from "~/utils/cache-control";
import { metaTags } from "~/utils/meta-tags";

export const headers: HeadersFunction = () => cacheControlHeaders;

export const meta: MetaFunction = () =>
  metaTags({
    title: "Utleie av konsulenter - IT-konsulenter",
  });

export default function ItKonsulenter() {
  return <Todo className="h-full" />;
}
