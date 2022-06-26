import { useEffect, useState } from "react";

/**
 * Hook that listens to changes to the scroll position and returns a boolean
 * representing whether the user has scrolled or not.
 *
 * @param offset (Optional) - Amount of pixels from the top of the page that
 *                            the user has to scroll before it's considered a scroll.
 */
export function useHasScrolled(offset: number = 0): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > offset);
    }

    document.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => document.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return hasScrolled;
}
