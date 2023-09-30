import type { AppLoadContext } from "@remix-run/server-runtime";

export type EnvVariable =
  | "TEAM_TAILOR_API_KEY"
  | "SLACK_WEBHOOK_URL"
  | "SLACK_BANNED_USER_AGENTS_REGEX"
  | "SANITY_PREVIEW_SECRET"
  | "SANITY_TOKEN";

export function requireEnvVariable(key: EnvVariable, context: AppLoadContext) {
  const value = context[key];
  if (!value) {
    throw new Response(`${key} needs to be set`, {
      status: 500,
    });
  }

  return value;
}
