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

/**
 * Simple deep equality checker. It will check value of every field in each object, as well as the length of their key sets.
 */
export function isEqual<T>(entry1: T, entry2: T): boolean {
  const fieldsIn1 = Object.entries(entry1);
  const keysIn2 = Object.keys(entry2);

  // 1. Different key/entry count? Different objects
  if (fieldsIn1.length !== keysIn2.length) {
    return false;
  }

  return fieldsIn1.every(([key1, value1]) => {
    const containsField = keysIn2.includes(key1);

    // 2. Key in 1 not in 2? Different objects
    if (!containsField) {
      return false;
    }

    const value2 = entry2[key1 as keyof T];

    // 3. We can do simple type + equality check on primitive fields
    if (typeof value1 !== "object") {
      return typeof value1 === typeof value2 && value1 === value2;
    }

    // 4. Field is an object? Recursion, here we come
    return isEqual(value1, value2);
  });
}
