import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import type { ZodSchema } from "zod";

import { requireEnvVariable } from "~/utils/env";
import { getDomainUrl } from "~/utils/misc";

type SubmitParams<T extends object> = {
  header: string;
  meta?: Record<string, string>;
  schema?: ZodSchema<T>;
};

export function slackClient({ request, context }: DataFunctionArgs) {
  const referer = request.headers.get("Referer");
  const path = referer ? new URL(referer).pathname : "?";

  const sharedMeta = {
    UserAgent: request.headers.get("User-Agent") ?? "?",
    ENV: process.env.NODE_ENV,
    Page: path,
    Domain: getDomainUrl(request),
  };

  const webHookUrl = requireEnvVariable("SLACK_WEBHOOK_URL", context);

  return {
    // TODO: Overload in order to get more precise type back (should always return data or error if schema is present, always undefined if not)
    async submit<T extends object>(params: SubmitParams<T>) {
      const meta = { ...sharedMeta, ...params.meta };

      let data: T | undefined;

      if (params.schema) {
        const formData = await request.formData();
        const parsed = params.schema.safeParse(Object.fromEntries(formData));
        if (parsed.success) {
          data = parsed.data;
        } else {
          console.error("Failed to parse form data", parsed.error);
          return json(
            {
              errors: parsed.error.errors.reduce<Record<string, string>>(
                (acc, curr) => ({
                  ...acc,
                  [curr.path.join(".")]: curr.message,
                }),
                {},
              ),
            },
            {
              status: 400,
            },
          );
        }
      }

      // Don't send anything to slack in development by default, remove this if you want to
      if (process.env.NODE_ENV === "production") {
        const formBlocks = data ? Object.entries(data) : [];

        const response = await fetch(webHookUrl, {
          method: "POST",
          body: JSON.stringify({
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: params.header,
                  emoji: true,
                },
              },
              ...formBlocks
                .filter(([, value]) => !!value)
                .map(([key, value]) => ({
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `*${key}*: ${value}`,
                  },
                })),
              {
                type: "context",
                elements: Object.entries(meta)
                  .filter(([, value]) => !!value)
                  .map(([key, value]) => ({
                    type: "mrkdwn",
                    text: `${key}: *${value}*`,
                  })),
              },
            ],
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Response(response.body, { status: 500 });
        }
      }

      return json(data, { status: 201 });
    },
  };
}
