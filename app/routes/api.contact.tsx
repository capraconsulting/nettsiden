import { json } from "@remix-run/server-runtime";
import type { DataFunctionArgs } from "@remix-run/server-runtime/dist/routeModules";

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
