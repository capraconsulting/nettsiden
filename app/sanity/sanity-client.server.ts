import { createClient } from "sanity-codegen";

import type { Documents } from "./schema";

export const sanityClient = createClient<Documents>({
  projectId: process.env.SANITY_PROJECT_ID || "3drrs17h",
  dataset: process.env.SANITY_DATASET || "production",
  fetch,
  previewMode: false,
  token: process.env.SANITY_TOKEN || "",
  useCdn: false,
});
