import * as build from "@remix-run/dev/server-build";

import { createPagesFunctionHandler } from "./cloudflare-pages-worker";
import { logDevReady } from "@remix-run/cloudflare";

if (process.env.NODE_ENV === "development") {
  logDevReady(build);
}

export const onRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
});
