import React from "react";

import { CapraImage } from "~/components/capra-image";
import { CapraLink } from "~/components/capra-link";
import { randomPattern } from "~/components/content-and-image-box/patterns";
import type { BoxColor } from "~/components/content-and-image-box/utils";
import { getBoxConfig } from "~/components/content-and-image-box/utils";
import { Pattern } from "~/components/pattern/pattern";
import { useHydrated } from "~/hooks/use-hydrated";
import type { Image } from "~/utils/dataRetrieval";
import { classNames } from "~/utils/misc";

/**
 * Notes:
 * This component uses some fixed dimensions, like 100px
 * and some kinda fixed dimenision with vw
 *
 * This might set some limitations on how we do layoting 🤔
 * Or maybe it's not a problem 🤷
 */

type ReadMoreLink = {
  to: string;
  linkText?: string;
};

interface Props {
  title: React.ReactNode;
  titleAs?: "h2" | "h3" | "h4" | "p";
  children: React.ReactNode;
  image: Image;

  color: BoxColor;

  height: `${number}vw`;
  direction?: "left" | "right";
  readMoreLink?: ReadMoreLink;
  hideMobileImage?: boolean;
}

export const ContentAndImageBox: React.FC<Props> = ({
  title,
  titleAs: TitleComponent = "p",
  children,
  image,

  color,

  height,
  direction = "left",
  readMoreLink,
  hideMobileImage = true,
}) => {
  const { boxClassName, patternClassName } = getBoxConfig(color);
  const isHydrated = useHydrated();
  return (
    <div
      className={classNames(
        "flex w-11/12 flex-col-reverse items-center justify-center",
        {
          "md:flex-row": direction === "left",
          "md:flex-row-reverse": direction === "right",
        },
      )}
    >
      <div
        className={classNames(
          "flex w-full flex-col items-start justify-center p-6 md:w-[40vw] md:min-w-[500px] lg:w-[60w]",
          boxClassName,
          {
            "md:pl-[40px] md:pr-[100px]": direction === "left",
            "md:pl-[100px]": direction === "right",
          },
        )}
        style={{ minHeight: height }}
      >
        <TitleComponent className="p-[2vw] pb-0 text-2xl font-bold md:text-3xl">
          {title}
        </TitleComponent>
        <div className="text-md whitespace-pre-line p-[2vw] md:text-lg">
          {children}
        </div>
        {readMoreLink && (
          <CapraLink
            href={readMoreLink.to}
            className={`text-md p-[2vw] underline-offset-4 md:text-lg ${
              color === "bordeaux" || color === "darkBlue"
                ? "text-white"
                : "text-secondary"
            }`}
          >
            {readMoreLink.linkText ?? "Les mer"}
          </CapraLink>
        )}
      </div>

      <div
        className={classNames("relative bg-white md:h-[30vw]", {
          "md:-ml-[100px]": direction === "left",
          "md:-mr-[100px]": direction === "right",
        })}
      >
        {isHydrated && (
          <Pattern {...randomPattern(direction, patternClassName)} />
        )}
        <CapraImage
          image={image}
          className={classNames(
            "h-full w-full overflow-hidden object-contain md:inline-block",
            {
              hidden: hideMobileImage,
            },
          )}
        />
      </div>
    </div>
  );
};
