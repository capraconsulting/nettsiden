import type { PropsWithChildren } from "react";
import React from "react";

import classNames from "classnames";

import { getBoxConfig } from "~/components/content-and-image-box/utils";
import { Section } from "~/components/section";
import type { Image } from "~/utils/sanity-image";

type QuoteBlock = {
  caption: string;
  image: Image;
};

const QuoteBlock: React.FC<PropsWithChildren<QuoteBlock>> = ({
  caption,
  image,
  children,
}) => {
  const { boxClassName } = getBoxConfig("peach");
  return (
    <div className={classNames("w-full px-4 py-24 lg:py-32", boxClassName)}>
      <Section className="mx-auto">
        <figure className={classNames("relative max-w-5xl")}>
          <div
            className="right-full mr-4 mt-2 h-16 w-16 bg-[#d19c91] py-2 lg:absolute"
            style={{ mask: `url(${image.src}) no-repeat center` }}
          />
          <div className="space-y-4">
            <blockquote className="text-4xl font-bold leading-normal">
              <i>{children}</i>
            </blockquote>
            <figcaption className="text-2xl">{caption}</figcaption>
          </div>
        </figure>
      </Section>
    </div>
  );
};

export default QuoteBlock;
