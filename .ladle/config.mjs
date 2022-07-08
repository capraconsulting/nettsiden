export default {
  stories: "app/**/*.stories.{ts,tsx}",
  outDir: "public/ladle",
  addons: {
    rtl: {
      enabled: false,
    },
  },
  viteConfig: ".ladle/vite.config.ts",
};
