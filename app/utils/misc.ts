export function typedBoolean<T>(
  value: T,
): value is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(value);
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}
