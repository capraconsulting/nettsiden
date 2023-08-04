import type { HTMLInputTypeAttribute } from "react";
import { useId } from "react";
import { useFetcher } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/server-runtime";

import type { SanityImageAsset, SanityReference } from "sanity-codegen";
import { z } from "zod";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { CapraLink } from "~/components/capra-link";
import { slackClient } from "~/integrations/slack.server";
import { getSanityClient } from "~/sanity/sanity-client.server";
import { urlFor } from "~/utils/imageBuilder";
import { formatPhoneNumber } from "~/utils/misc";

export async function action(args: DataFunctionArgs) {
  return await slackClient(args).submit({
    header: "Kontaktforespørsel",
    schema: z.object({
      name: z
        .string()
        .regex(
          /^[A-Za-zÀ-ÖØ-öø-ÿ ']+$/,
          "Navn kan kun inneholde bokstaver og mellomrom.",
        )
        .min(3, "Navn må være satt."),
      email: z.string().email("Vi trenger en gyldig e-post."),
      company: z.string().optional(),
    }),
  });
}

interface ContactFormProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  representatives: ContactFormRepresentative[];
}
export const ContactForm = ({
  title,
  description = "Fyll ut skjemaet så kontakter vi deg!",
  representatives,
}: ContactFormProps) => {
  const fetcher = useFetcher<typeof action>();
  const isSuccess =
    fetcher.type === "done" && fetcher.data && !("errors" in fetcher.data);
  const errors =
    fetcher.data && "errors" in fetcher.data ? fetcher.data.errors : undefined;
  return (
    <div
      id="kontaktskjema"
      className="scroll-mt-12 bg-secondary pb-[6vh] pt-12"
    >
      <article className="md:11/12 mx-auto flex w-10/12 flex-col items-center text-white sm:w-9/12">
        <section className="text-center">
          <p className="pb-4 text-xl font-bold text-peach md:text-4xl">
            {isSuccess ? "Takk for din interesse!" : title}
          </p>
          <p className="md:mb-8">
            {isSuccess
              ? "Vi tar kontakt med deg så snart som mulig."
              : description}
          </p>
        </section>
        <section className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          <fetcher.Form
            method="post"
            action="/api/contact"
            className="flex w-full flex-col gap-[4vh]"
            name="contact"
          >
            <Input
              id="name"
              label="Navn"
              required
              placeholder="Ditt navn"
              errors={errors}
            />
            <Input id="company" label="Bedrift" placeholder="Din bedrift" />
            <Input
              id="email"
              label="E-post"
              type="email"
              required
              placeholder="Din e-post"
              errors={errors}
            />
            <Button variant="solid" type="submit" className="mx-auto lg:mx-0">
              Kontakt meg
            </Button>
          </fetcher.Form>
          <div className="w-full">
            <Representatives representatives={representatives} />
          </div>
        </section>
      </article>
    </div>
  );
};

const Input: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  errors?: Record<string, string>;
}> = ({ id, label, required, placeholder, type = "text", errors }) => {
  const fieldErrors = errors?.[id];
  const errorId = useId();
  return (
    <div>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={Boolean(fieldErrors)}
        aria-describedby={errorId}
        aria-required={required}
        placeholder={placeholder}
        className="w-full p-[1vh] text-black"
        data-lpignore="true" // Disable LastPass autofill
        data-form-type="other" // Disable Dashlane autofill
      />
      {fieldErrors && (
        <div id={errorId} className="text-red">
          {fieldErrors}
        </div>
      )}
    </div>
  );
};

export interface ContactFormRepresentative {
  name: string;
  email: string;
  phoneNumber?: string;
  image: SanityImageAsset | SanityReference<SanityImageAsset>;
}
interface RepresentativesProps {
  representatives: ContactFormRepresentative[];
}
const Representatives = ({ representatives }: RepresentativesProps) => {
  return (
    <div className="grid grid-flow-dense grid-cols-1 gap-x-14 gap-y-5 px-5 md:grid-cols-2">
      {representatives.map(({ name, email, phoneNumber, image }) => (
        <div key={name} className="flex flex-col">
          <CapraImage
            alt={`Bilde av ${name}`}
            src={urlFor(image).size(600, 600).url()}
          />
          <strong className="mt-5">{name}</strong>
          {phoneNumber && (
            <CapraLink href={`tel:${phoneNumber}`}>
              {formatPhoneNumber(phoneNumber)}
            </CapraLink>
          )}
          <CapraLink href={`mailto:${email}`}>Send mail</CapraLink>
        </div>
      ))}
    </div>
  );
};

export const fetchContactFormForWorkshopRepresentatives = () =>
  getSanityClient()
    .getAll(
      "author",
      `employee == true && "workshop-endring-kommunikasjon-contact-us" in placement`,
    )
    .then((authors) =>
      authors.map(
        (author): ContactFormRepresentative => ({
          name: author.name ?? "",
          email: author.email ?? "",
          phoneNumber: author.phone,
          image: author.image!.asset,
        }),
      ),
    );

export const fetchContactFormRepresentatives = () =>
  getSanityClient()
    .getAll("author", `employee == true && "contact-form" in placement`)
    .then((authors) =>
      authors.map(
        (author): ContactFormRepresentative => ({
          name: author.name ?? "",
          email: author.email ?? "",
          phoneNumber: author.phone,
          image: author.image!.asset,
        }),
      ),
    );
