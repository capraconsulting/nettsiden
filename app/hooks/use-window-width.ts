import { useEffect, useState } from "react";

/**
 * Hook that always returns how wide the browser window is, which can be used to resize content dynamically.
 * *
 * @param defaultValue - can be used to decrease chance of layout shift during SSR (since we at that point in time don't _actually_ know how wide the client window is).
 */
export function useWindowWidth(defaultValue: number) {
  const [windowWidth, setWindowWidth] = useState(defaultValue);

  useEffect(() => {
    function updateWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", updateWindowWidth);

    updateWindowWidth();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return windowWidth;
}
