import * as build from "@remix-run/dev/server-build";
import { createRequestHandler } from "@remix-run/netlify";
import { createEntryRouteModules } from "@remix-run/server-runtime/dist/entry";

import type { HandlerContext, HandlerEvent } from "@netlify/functions";

import type { CapraLoadContext } from "~/types";

function getLoadContext(
  event: HandlerEvent & { authlifyToken?: string | null },
  context: HandlerContext,
): CapraLoadContext {
  let rawAuthorizationString;
  let netlifyGraphToken;

  if (event.authlifyToken != null) {
    netlifyGraphToken = event.authlifyToken;
  }

  let authHeader = event.headers["authorization"];
  let graphSignatureHeader = event.headers["x-netlify-graph-signature"];

  if (authHeader != null && /Bearer /gi.test(authHeader)) {
    rawAuthorizationString = authHeader.split(" ")[1];
  }

  let loadContext = {
    clientNetlifyGraphAccessToken: rawAuthorizationString,
    netlifyGraphToken: netlifyGraphToken,
    netlifyGraphSignature: graphSignatureHeader,
    routeModules: createEntryRouteModules(build.routes),
    manifest: build.assets,
  };

  // Remove keys with undefined values
  Object.keys(loadContext).forEach((rawKey) => {
    const key = rawKey as keyof typeof loadContext;
    if (loadContext[key] == null) {
      delete loadContext[key];
    }
  });

  return loadContext;
}

export const handler = createRequestHandler({
  build,
  getLoadContext,
  mode: process.env.NODE_ENV,
});
