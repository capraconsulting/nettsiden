import { useEffect, useId, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { getEnvVariableOrThrow } from "~/utils/env";

function validatePhoneNumber(phoneNumber: FormDataEntryValue | null) {
  const errorMessage = "Vi trenger et gyldig telefonnummer.";
  if (typeof phoneNumber !== "string" || phoneNumber.trim().length === 0) {
    return errorMessage;
  } else {
    // Simple check that the number only includes digits after removing spaces, dashes and pluses
    const trimmedPhoneNumber = phoneNumber.replace(/[- +]/g, "");
    if (!/^\d+$/.test(trimmedPhoneNumber)) {
      return errorMessage;
    }
  }
  return undefined;
}

export const action = async ({ request, context }: DataFunctionArgs) => {
  const formData = await request.formData();

  const phoneNumber = formData.get("phoneNumber");
  const errorMessage = validatePhoneNumber(phoneNumber);
  if (errorMessage) {
    return json({ errorMessage }, 400);
  }

  // Send using slack
  // Unlike Netlify this does not have mechanisms to handle bot or abuse
  // We should implement that in the long term, but for now, let's just see
  const SLACK_WEBHOOK_URL = getEnvVariableOrThrow("SLACK_WEBHOOK_URL", context);

  const referer = request.headers.get("Referer");
  const path = referer ? new URL(referer).pathname : "";

  const response = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Ring meg forespørsel",
            emoji: true,
          },
        },
        ...[...formData.entries()].map(([key, value]) => ({
          type: "section",
          text: {
            type: "plain_text",
            text: `${key}: ${value}`,
            emoji: false,
          },
        })),
        {
          type: "context",
          elements: [
            {
              type: "plain_text",
              text: `Page: ${path}`,
              emoji: false,
            },
            {
              type: "plain_text",
              text: `ENV: ${process.env.NODE_ENV}`,
              emoji: false,
            },
          ],
        },
      ],
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Response("Could not submit form", { status: 500 });
  }

  return json({ phoneNumber: phoneNumber as string }, 201);
};

interface CallMeFormProps {
  titleAs: "h2" | "h3";
}
export const CallMeForm = ({ titleAs }: CallMeFormProps) => {
  const fetcher = useFetcher<typeof action>();
  const inputRef = useRef<HTMLInputElement>(null);

  const receivedPhoneNumber =
    fetcher.data && "phoneNumber" in fetcher.data && fetcher.data.phoneNumber;
  const isSuccess = fetcher.type === "done" && Boolean(receivedPhoneNumber);

  const errorMessage =
    fetcher.data && "errorMessage" in fetcher.data && fetcher.data.errorMessage;
  const isError = fetcher.type === "done" && Boolean(errorMessage);
  const errorId = useId();

  useEffect(() => {
    if (isError) {
      inputRef.current?.focus();
    }
  }, [isError]);

  // Clear the phone number input field
  // The user will be presented with a success message
  // by also removing the input we make it clearer that we have "taken" the phone number
  // also avoids multiple submits with the same phone number.
  // Wise to show in the success message which phone number we have received
  useEffect(() => {
    if (isSuccess && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  }, [isSuccess]);

  return (
    <Section>
      {!isSuccess && (
        <TitleAndText title="Kontakt" titleAs={titleAs}>
          Vi kan ringe deg. Legg igjen nummeret ditt så tar vi opp kontakten.
        </TitleAndText>
      )}
      {isSuccess && (
        <TitleAndText title="Takk for din interesse" titleAs={titleAs}>
          Vi tar kontakt med deg på <strong>{receivedPhoneNumber}</strong> så
          snart som mulig.
        </TitleAndText>
      )}

      <fetcher.Form
        method="post"
        action="/api/call-me"
        name="call-me"
        className="mx-auto grid w-11/12 max-w-lg grid-cols-3 gap-6"
      >
        <div className="relative col-span-2">
          <input
            className="h-full w-full rounded border border-black/70 px-4 py-2 text-black"
            ref={inputRef}
            type="tel"
            name="phoneNumber"
            aria-required
            aria-invalid={isError}
            aria-describedby={errorId}
            placeholder="Ditt telefonnummer"
            data-lpignore="true" // Disable LastPass autofill
            data-form-type="other" // Disable Dashlane autofill
          />

          {isError && (
            <div id={errorId} className="absolute text-red">
              {errorMessage}
            </div>
          )}
        </div>

        <Button variant="solid" type="submit" className="w-full">
          Ring meg
        </Button>
      </fetcher.Form>
    </Section>
  );
};
