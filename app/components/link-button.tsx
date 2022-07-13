import type { PropsWithChildren } from "react";
import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";

import { classNames } from "~/utils/misc";

type Props = PropsWithChildren<{
  href: string;
  variant: "solid" | "outline";
  prefetch?: RemixLinkProps["prefetch"];
}>;

// TODO: The red color used in this button is not compliant with WCAG contrast requirements when used for text on our
//       "almost white" background. Consider using something darker? It's fine as a button bg color.
export const LinkButton: React.FC<Props> = ({
  href,
  variant,
  prefetch = href.startsWith("/") ? "intent" : undefined,
  children = href,
}) => (
  <Link
    to={href}
    prefetch={prefetch}
    className={classNames(
      "w-[200px] rounded-md border-2 font-bold min-h-[40px] leading-snug m-1 block py-3 text-center",
      {
        "bg-white border-main text-main hover:bg-main hover:text-white":
          variant === "outline",
        "bg-main border-transparent text-white hover:bg-main-darker":
          variant === "solid",
      },
    )}
  >
    {children}
  </Link>
);
