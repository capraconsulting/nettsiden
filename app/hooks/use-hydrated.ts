import { useEffect, useState } from "react";

let hydrating = true;

/**
 * Hook that returns true if the app has been hydrated.
 *
 * Useful for rendering stuff only on the client.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(() => {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
}
