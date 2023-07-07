/** @type {import("@remix-run/dev").AppConfig} */
export default {
  future: {
    v2_meta: true,
    v2_dev: true,
    v2_headers: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
  },
  tailwind: true,
  server: "./server.cloudflare.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
};
