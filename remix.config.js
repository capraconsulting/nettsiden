/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  devServerPort: 8002,
  serverBuildTarget: "netlify",
  server: "./server.ts",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
