/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import type { EnvVariable } from "~/utils/env";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext
    extends Record<EnvVariable, string | undefined> {
    ASSETS: string;
  }
}

export {};
