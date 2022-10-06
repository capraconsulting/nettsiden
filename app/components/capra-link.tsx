import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";

import { classNames } from "~/utils/misc";

type CapraLinkProps = {
  href: string;
  children: React.ReactNode;
  prefetch?: RemixLinkProps["prefetch"];
} & React.HTMLProps<HTMLAnchorElement>;

/**
 * Simple link component with basic styling
 *
 * called this CapraLink to not confuse with remix Link component
 */
export const CapraLink = ({
  ref,
  href,
  children,
  className,
  ...rest
}: CapraLinkProps) => {
  const finalClassName = classNames("underline decoration-main", className);

  // Naive protocol matcher
  if (href.match(/^\w+:/)) {
    return (
      <a href={href} className={finalClassName} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={finalClassName} {...rest}>
      {children}
    </Link>
  );
};
