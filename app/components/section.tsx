import type { PropsWithChildren } from "react";

import { classNames } from "~/utils/misc";

interface SectionProps {
  className?: string;
}

/**
 * Generalised layout component for a section of vertical content
 *
 * use the `className` prop to overwrite
 *
 * as of 27.11.2022 it gives these properties
 * - max width of 1280px
 * - 90% width on screen size over 640px
 * - vertical gap of children
 */
export const Section = ({
  className,
  children,
}: PropsWithChildren<SectionProps>) => {
  return (
    <section
      className={classNames(
        "flex w-full max-w-7xl flex-col items-center gap-12 sm:w-11/12",
        className,
      )}
    >
      {children}
    </section>
  );
};
