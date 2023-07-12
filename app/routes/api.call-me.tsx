import { useEffect, useId, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/server-runtime";

import { z } from "zod";

import { Button } from "~/components/button";
import { Section } from "~/components/section";
import { TitleAndText } from "~/components/title-and-text";
import { slackClient } from "~/integrations/slack.server";

export async function action(args: DataFunctionArgs) {
  const errorMessage = "Vi trenger et gyldig telefonnummer.";
  return await slackClient(args).submit({
    header: '"Ring meg"-forespørsel',
    schema: z.object({
      phoneNumber: z
        .string()
        .min(8, errorMessage)
        .max(14, errorMessage)
        .regex(/^[- +\d]+$/g, errorMessage),
    }),
  });
}

interface CallMeFormProps {
  titleAs: "h2" | "h3";
}
export const CallMeForm = ({ titleAs }: CallMeFormProps) => {
  const fetcher = useFetcher<typeof action>();
  const inputRef = useRef<HTMLInputElement>(null);

  const receivedPhoneNumber =
    fetcher.data && "phoneNumber" in fetcher.data && fetcher.data.phoneNumber;
  const isSuccess = fetcher.type === "done" && Boolean(receivedPhoneNumber);

  const errors =
    fetcher.type === "done" && fetcher.data && "errors" in fetcher.data
      ? fetcher.data.errors
      : undefined;
  const errorId = useId();

  useEffect(() => {
    if (errors) {
      inputRef.current?.focus();
    }
  }, [errors]);

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
            aria-invalid={!!errors}
            aria-describedby={errorId}
            placeholder="Ditt telefonnummer"
            data-lpignore="true" // Disable LastPass autofill
            data-form-type="other" // Disable Dashlane autofill
          />

          {errors && (
            <div id={errorId} className="absolute text-red">
              {errors.phoneNumber}
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
