import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/components";

import { classNames } from "~/utils/misc";

interface Props {
  href: string;
  variant: "solid" | "outline";
  prefetch?: RemixLinkProps["prefetch"];
}

export const LinkButton: React.FC<Props> = ({
  href,
  variant,
  prefetch = href.startsWith("/") ? "intent" : undefined,
  children = href,
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "w-[200px] rounded-md border-2 font-bold min-h-[40px] leading-snug m-1",
        {
          "bg-white border-main text-main hover:bg-main hover:text-white":
            variant === "outline",
          "bg-main border-transparent text-white hover:bg-main-darker":
            variant === "solid",
        },
      )}
    >
      <Link to={href} prefetch={prefetch} className="block w-full h-full py-3">
        {children}
      </Link>
    </button>
  );
};
