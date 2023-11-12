import type { DataFunctionArgs } from "@remix-run/server-runtime";

import type { ZodSchema } from "zod";
import { z } from "zod";

import { requireEnvVariable } from "~/utils/env";

const BASE_URL = "https://api.teamtailor.com/v1/";
const API_VERSION = "20210218";

const department = z.object({
  id: z.string(),
  attributes: z.object({
    name: z.string(),
  }),
});

const job = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    internal: z.boolean(),
  }),
  links: z.object({
    "careersite-job-url": z.string(),
  }),
  relationships: z.object({
    department: z.object({
      data: z
        .object({
          type: z.literal("departments"),
          id: z.string(),
        })
        .optional(),
      links: z.object({
        related: z.string(),
      }),
    }),
  }),
});

export function teamTailorClient({
  context,
}: Pick<DataFunctionArgs, "context">) {
  const apiKey = requireEnvVariable("TEAM_TAILOR_API_KEY", context);

  async function fetchFromTeamTailor<T>(
    path: string,
    schema: ZodSchema<T>,
  ): Promise<{
    data: T[];
  }> {
    const res = await fetch(new URL(path, BASE_URL), {
      headers: {
        Authorization: `Token token=${apiKey}`,
        "X-Api-Version": API_VERSION,
      },
    });

    const json = await res.json();
    if (!res.ok) {
      console.error(
        `Failed to fetch from TeamTailor (${path}, ${res.status})`,
        JSON.stringify(
          (json as { errors?: unknown } | undefined)?.errors ?? json,
        ),
      );
    } else {
      const parsed = z
        .object({
          data: z.array(schema),
        })
        .safeParse(json);

      if (parsed.success) {
        return parsed.data;
      } else {
        console.error(
          `Failed to parse TeamTailor response (${path})`,
          parsed.error,
        );
      }
    }

    return { data: [] };
  }

  return {
    fetch: fetchFromTeamTailor,
    departments: () => fetchFromTeamTailor("departments", department),
    jobs: () => fetchFromTeamTailor("jobs?include=department", job),
  };
}
