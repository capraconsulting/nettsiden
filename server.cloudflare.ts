import * as build from "@remix-run/dev/server-build";

import { createPagesFunctionHandler } from "./cloudflare-pages-worker";

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
});

export function onRequest(context: any) {
  return handleRequest(context);
}
