import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";

import isbot from "isbot";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // We don't want to do streaming for bots
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  if (process.env.NODE_ENV !== "production") {
    responseHeaders.set("Cache-Control", "no-store");
  }

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            // @ts-expect-error TS complains that the body is not a ReadableStream, but it is, it's just the nodejs implementation, so the types are different (but compatible).
            new Response(body, {
              status: didError ? 500 : responseStatusCode,
              headers: responseHeaders,
            }),
          );
          pipe(body);
        },
        onShellError(err) {
          reject(err);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      },
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
