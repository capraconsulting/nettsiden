import type { HTMLInputTypeAttribute } from "react";
import { useFetcher } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { DataFunctionArgs } from "@remix-run/server-runtime/dist/routeModules";

import type { SanityImageAsset, SanityReference } from "sanity-codegen";

import { Button } from "~/components/button";
import { CapraImage } from "~/components/capra-image";
import { CapraLink } from "~/components/capra-link";
import { urlFor } from "~/utils/imageBuilder";

function validate(formData: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = formData.get("name");
  if (typeof name !== "string" || name.trim().length === 0) {
    errors.name = "Navn må være satt.";
  }

  const phoneNumber = formData.get("phoneNumber");
  if (typeof phoneNumber !== "string" || phoneNumber.trim().length === 0) {
    errors.phoneNumber = "Vi trenger et gyldig telefonnummer.";
  } else {
    // Simple check that the number only includes digits after removing spaces, dashes and pluses
    const trimmedPhoneNumber = phoneNumber.replace(/[- +]/g, "");
    if (!/^\d+$/.test(trimmedPhoneNumber)) {
      errors.phoneNumber = "Vi trenger et gyldig telefonnummer.";
    }
  }

  const email = formData.get("email");
  if (typeof email !== "string" || email.trim().length === 0) {
    errors.email = "Vi trenger en gyldig e-post.";
  } else {
    // We only do extremely simple sanity checks here, as correct email validation is not something we should bother trying
    const parts = email.split("@");
    if (parts.length < 2 || parts.some((p) => p.length === 0)) {
      errors.email = "Vi trenger en gyldig e-post.";
    }
  }

  return errors;
}

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();

  const errors = validate(formData);

  if (Object.keys(errors).length > 0) {
    return json({ errors }, 400);
  }

  if (process.env.NODE_ENV === "production") {
    // Send the form to Netlify for now
    const url = new URL(request.url);
    formData.set("sentFrom", url.pathname);
    await fetch(`${url.origin}/`, {
      method: "POST",
      body: formData,
    });
  }

  return json(null, 201);
};

interface ContactFormProps {
  title: React.ReactNode;
  representatives: ContactFormRepresentative[];
}
export const ContactForm = ({ title, representatives }: ContactFormProps) => {
  const fetcher = useFetcher<SerializeFrom<typeof action>>();
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
