import type { HTMLInputTypeAttribute } from "react";
import { useFetcher } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";

import { Button } from "~/components/button";
import { Todo } from "~/components/todo";
import type { action as contactAction } from "~/routes/contact";

export const ContactForm: React.FC<{
  title: React.ReactNode;
}> = ({ title }) => {
  const fetcher = useFetcher<SerializeFrom<typeof contactAction>>();
  const isSuccess = fetcher.type === "done" && !fetcher.data;
  return (
    <article className="bg-secondary flex flex-col items-center text-white w-full -mb-[50px] py-[3vh] px-[100px] mx-auto">
      <section className="text-center">
        <div className="text-3xl font-semibold text-peach">
          {isSuccess ? "Takk for din interesse!" : title}
        </div>
        <span>
          {isSuccess
            ? "Vi tar kontakt med deg så snart som mulig."
            : "Fyll ut skjemaet så kontakter vi deg!"}
        </span>
      </section>
      <section className="flex justify-between w-full max-w-7xl gap-12 mb-10">
        <fetcher.Form
          method="post"
          action="/contact"
          className="w-[50%]"
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
          <Button variant="solid" type="submit" className="m-0 mt-8">
            Kontakt meg
          </Button>
        </fetcher.Form>
        <Todo badge title="Salgsrepresentanter" className="w-[50%]" />
      </section>
    </article>
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
    <div className="my-[2vh]">
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
