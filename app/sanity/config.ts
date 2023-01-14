import { codeInput } from "@sanity/code-input";
import { dashboardTool, projectUsersWidget } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";

import { projectStructureWidget } from "~/sanity/plugins/project-structure-widget";
import { structure } from "~/sanity/structure";
import schema from "./schema";

// This config is public, both in git and when compiled and bundled it might be served to the users
// Do not put any secrets here, not secrets read from `process.env.*` either.
//
// If the need arises, create a new config with `.server.ts` suffix to ensure secrets will not be bundled to the user
export const projectDetails = {
  apiVersion: "2021-03-25",
  dataset: "production",
  projectId: "3drrs17h",
};

export const config = defineConfig({
  ...projectDetails,
  name: "capraconsulting-no",
  title: "Capra Consulting",
  basePath: "/studio",
  schema: {
    name: "default",
    types: schema,
  },
  plugins: [
    projectStructureWidget(),
    dashboardTool({
      widgets: [
        projectUsersWidget({
          layout: {
            height: "auto",
          },
        }),
        documentListWidget({
          title: "Recent selvskryt posts",
          query:
            '*[_type == "selvskryt" && !(_id match "drafts.*")] | order(_createdAt desc) [0...10]',
          layout: { width: "small" },
        }),
        documentListWidget({
          title: "Unpublished pages",
          query:
            '*[_type in $types && _id match "drafts.*"] | order(title asc) [0...10]',
          queryParams: {
            types: ["selvskryt", "blogg"],
          },
          layout: { width: "small" },
        }),
        // TODO: Add Cloudflare widget? https://www.npmjs.com/package/sanity-plugin-cloudflare-pages-deploy
      ],
    }),
    deskTool({
      structure,
    }),
    visionTool({
      defaultApiVersion: projectDetails.apiVersion,
      defaultDataset: projectDetails.dataset,
    }),
    codeInput(),
  ],
});
