import type { HTMLInputTypeAttribute } from "react";
import { useFetcher } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";

import type { SanityImageAsset, SanityReference } from "sanity-codegen";

import { Button } from "~/components/button";
import type { action as contactAction } from "~/routes/api.contact";
import { urlFor } from "~/utils/imageBuilder";
import { CapraImage } from "./capra-image";
import { CapraLink } from "./capra-link";

interface ContactFormProps {
  title: React.ReactNode;
  representatives: ContactFormRepresentative[];
}
export const ContactForm = ({ title, representatives }: ContactFormProps) => {
  const fetcher = useFetcher<SerializeFrom<typeof contactAction>>();
  const isSuccess = fetcher.type === "done" && !fetcher.data;
  return (
    <div className="bg-secondary pt-[3vh] pb-[6vh]">
      <article className="flex flex-col items-center text-white w-10/12 sm:w-9/12 md:11/12 mx-auto">
        <section className="text-center">
          <p className="text-xl md:text-4xl font-bold text-peach">
            {isSuccess ? "Takk for din interesse!" : title}
          </p>
          <p className="md:mt-5">
            {isSuccess
              ? "Vi tar kontakt med deg så snart som mulig."
              : "Fyll ut skjemaet så kontakter vi deg!"}
          </p>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl gap-12">
          <fetcher.Form
            method="post"
            action="/api/contact"
            className="w-full flex flex-col gap-[4vh]"
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <Input
              id="name"
              label="Navn"
              required
              placeholder="Ditt navn"
              errors={fetcher.data?.errors}
            />
            <Input id="company" label="Bedrift" placeholder="Din bedrift" />
            <Input
              id="phoneNumber"
              label="Telefon"
              required
              placeholder="Ditt telefonnummer"
              errors={fetcher.data?.errors}
            />
            <Input
              id="email"
              label="E-post"
              type="email"
              required
              placeholder="Din e-post"
              errors={fetcher.data?.errors}
            />
            <Button variant="solid" type="submit">
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
  return (
    <div>
      <label htmlFor={id} className="block" aria-required={required}>
        {label}
        {required && <span className="inline-block text-red">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full p-[1vh] text-black"
      />
      {fieldErrors && <div className="text-red">{fieldErrors}</div>}
    </div>
  );
};

export interface ContactFormRepresentative {
  name: string;
  email: string;
  image: SanityImageAsset | SanityReference<SanityImageAsset>;
}
interface RepresentativesProps {
  representatives: ContactFormRepresentative[];
}
const Representatives = ({ representatives }: RepresentativesProps) => {
  return (
    <div className="grid grid-flow-dense grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-14 px-5">
      {representatives.map(({ name, email, image }) => (
        <div key={name} className="flex flex-col">
          <CapraImage
            className=""
            alt={`Bilde av ${name}`}
            src={urlFor(image).size(600, 600).url()}
          />
          <strong className="mt-5">{name}</strong>
          <CapraLink href={`mailto:${email}`}>{email}</CapraLink>
        </div>
      ))}
    </div>
  );
};
