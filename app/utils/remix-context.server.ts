import * as build from "@remix-run/dev/server-build";
import { createEntryRouteModules } from "@remix-run/server-runtime/dist/entry";

/**
 * Helper function to access remix context information
 * Primally to be used inside loader functions
 */
export function createRemixContext(request: Request) {
  const routeModules = createEntryRouteModules(build.routes);
  const url = new URL(request.url);
  const matches = Object.values(build.routes).filter(
    (it) => `/${it.path ?? ""}` === url.pathname,
  );

  return {
    routes: build.routes,
    routeModules,
    manifest: build.assets,
    matches,
  };
}
