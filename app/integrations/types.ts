import type { DataFunctionArgs } from "@remix-run/server-runtime";

export type ClientArgs = Pick<DataFunctionArgs, "request" | "context">;
