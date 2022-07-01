import { useEffect } from "react";

/**
 * Hook that disables scrolling.
 *
 * @param condition (Optional) - whether scroll should be disabled.
 */
export function useDisableScroll(condition: boolean = true) {
  useEffect(() => {
    document.body.style.overflowY = condition ? "hidden" : "scroll";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [condition]);
}
