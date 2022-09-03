import type { DataFunctionArgs } from "@remix-run/server-runtime/dist/routeModules";

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();

  if (process.env.NODE_ENV === "production") {
    // Send the form to Netlify for now
    const url = new URL(request.url);
    formData.set("sentFrom", url.pathname);
    await fetch(url.origin, {
      method: "POST",
      body: formData,
    });
  }

  return new Response(null, {
    status: 201,
  });
};
