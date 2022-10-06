import React from "react";

import { randomPattern } from "~/components/content-and-image-box/patterns";
import type { BoxColor } from "~/components/content-and-image-box/utils";
import { getBoxConfig } from "~/components/content-and-image-box/utils";
import { Pattern } from "~/components/pattern/pattern";
import { classNames } from "~/utils/misc";

/**
 * Notes:
 * This component uses some fixed dimensions, like 100px
 * and some kinda fixed dimenision with vw
 *
 * This might set some limitations on how we do layoting 🤔
 * Or maybe it's not a problem 🤷
 */

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  image: React.ReactNode;

  color: BoxColor;

  height: `${number}vw`;
  direction?: "left" | "right";
}

export const ContentAndImageBox: React.FC<Props> = ({
  title,
  children,
  image,

  color,

  height,
  direction = "left",
}) => {
  const { boxClassName, patternClassName } = getBoxConfig(color);
  return (
    <div
      className={classNames(
        "flex-col-reverse flex w-full justify-center items-center",
        {
          "md:flex-row": direction === "left",
          "md:flex-row-reverse": direction === "right",
        },
      )}
    >
      <div
        className={classNames(
          "w-full md:w-[40vw] lg:w-[60w] md:min-w-[500px] flex flex-col justify-center",
          boxClassName,
          {
            "md:pl-[40px] md:pr-[100px]": direction === "left",
            "md:pl-[100px]": direction === "right",
          },
        )}
        style={{ height }}
      >
        <div className="p-[2vw] pb-0 text-2xl md:text-4xl font-bold">
          {title}
        </div>
        <div className="p-[2vw] whitespace-pre-line text-md md:text-lg">
          {children}
        </div>
      </div>

      <div
        className={classNames(
          "relative max-h-60 md:h-[30vw] md:max-h-96 aspect-square shadow-xl bg-white",
          {
            "md:-ml-[100px]": direction === "left",
            "md:-mr-[100px]": direction === "right",
          },
        )}
      >
        <Pattern {...randomPattern(direction, patternClassName)} />
        {image}
      </div>
    </div>
  );
};
