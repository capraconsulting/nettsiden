import type { PropsWithChildren } from "react";
import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";

import { classNames } from "~/utils/misc";

function getClassNames(variant: Props["variant"]) {
  return classNames(
    "w-[200px] rounded-md border-2 font-bold min-h-[40px] leading-snug block py-3 text-center transition ease-in-out",
    {
      "bg-white border-main text-main hover:bg-main hover:text-white":
        variant === "outline",
      "bg-main border-transparent text-white hover:bg-main-darker":
        variant === "solid",
    },
  );
}

type Props = {
  variant: "solid" | "outline";
  className?: string;
} & (
  | React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  | (React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > & {
      href: string;
      external?: boolean;
      prefetch?: RemixLinkProps["prefetch"];
    })
);

// TODO: The red color used in this button is not compliant with WCAG contrast requirements when used for text on our
//       "almost white" background. Consider using something darker? It's fine as a button bg color.
export const Button: React.FC<Props> = ({ variant, ...props }) => {
  const className = classNames(getClassNames(variant), props.className);

  if (
    "href" in props &&
    (props.external ||
      props.href.startsWith("http://") ||
      props.href.startsWith("https://"))
  ) {
    return (
      <a
        className={className}
        href={props.href}
        rel="noopener noreferrer"
        target={props.target}
      >
        {props.children}
      </a>
    );
  } else if ("href" in props) {
    return (
      <Link to={props.href} prefetch={props.prefetch} className={className}>
        {props.children}
      </Link>
    );
  } else {
    return <button {...props} className={className} />;
  }
};
