import React from "react";

import { classNames } from "~/utils/misc";

interface BadgeProps {
  variant: "solid" | "outline";
  color: "main" | "blue";
  size: "xs" | "sm";
  children: React.ReactNode;
  className?: string;
}
export const Badge = ({
  children,
  variant,
  color,
  size,
  className,
}: BadgeProps) => {
  return (
    <span
      className={classNames(
        "rounded border px-2 py-1 font-semibold",
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "border-main bg-main text-white":
            variant === "solid" && color === "main",
          "border-blue bg-blue text-white":
            variant === "solid" && color === "blue",
          "border-main text-main": variant === "outline" && color === "main",
          "border-blue text-blue": variant === "outline" && color === "blue",
        },
        className,
      )}
    >
      {children}
    </span>
  );
};
