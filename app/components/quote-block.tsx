import type { PropsWithChildren } from "react";
import React from "react";

import { CapraImage } from "~/components/capra-image";
import type { Image } from "~/utils/sanity-image";
import { Section } from "~/components/section";
import { getBoxConfig } from "~/components/content-and-image-box/utils";
import classNames from "classnames";

type QuoteBlock = {
  caption: string;
  image: Image;
};

const QuoteBlock: React.FC<
  PropsWithChildren<QuoteBlock>
> = ({ title, caption, image, children }) => {
  const { boxClassName, patternClassName } = getBoxConfig("peach");
  return (
    <div className={classNames("w-full py-32", boxClassName)}>
      <Section className={"mx-auto"}>
        <figure className={classNames("max-w-5xl relative")}>
          <div className="w-16 h-16 py-2 absolute right-full bg-[#d19c91] mt-2 mr-4" style={{ mask: `url(${ image.src }) no-repeat center` }}/>
          <div className={"space-y-4"}>
            <blockquote className="text-4xl font-bold leading-normal"><i>{children}</i></blockquote>
            <figcaption className="text-2xl">{caption}</figcaption>
          </div>
        </figure>
      </Section>
    </div>
  );
};

export default QuoteBlock;
