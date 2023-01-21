/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_meta: true,
  },
  serverBuildTarget:
    process.env.NODE_ENV === "production" ||
    process.env.CLOUDFLARE_DEV !== undefined
      ? "cloudflare-pages"
      : undefined,
  server:
    process.env.NODE_ENV === "production" ||
    process.env.CLOUDFLARE_DEV !== undefined
      ? "./server.cloudflare.ts"
      : undefined,
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
};
