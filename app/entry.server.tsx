import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/server-runtime";

import { ServerStyleSheet } from "styled-components";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const isStudioRoute = new URL(request.url).pathname.startsWith("/studio");

  let markup: string;
  if (isStudioRoute) {
    const sheet = new ServerStyleSheet();
    markup = renderToString(
      sheet.collectStyles(
        <RemixServer context={remixContext} url={request.url} />,
      ),
    );
    const styles = sheet.getStyleTags();
    markup = markup.replace("__STYLES__", styles);
  } else {
    markup = renderToString(
      <RemixServer context={remixContext} url={request.url} />,
    );
  }

  responseHeaders.set("Content-Type", "text/html");

  // Preemptively kill the previous service worker
  // see the `_headers` file
  responseHeaders.set("Clear-Site-Data", `"storage"`);

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
