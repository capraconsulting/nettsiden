import type { PropsWithChildren } from "react";
import React from "react";

import classNames from "classnames";

import { CapraImage } from "~/components/capra-image";
import type { Image } from "~/utils/sanity-image";

type IconTitleAndTextBlockProps = {
  title: string;
  titleAs: "h1" | "h2" | "h3" | "h4";
  image: Image;
  imageClassName?: string;
};

const IconTitleAndTextBlock: React.FC<
  PropsWithChildren<IconTitleAndTextBlockProps>
> = ({ title, titleAs: TitleComponent, children, image, imageClassName }) => {
  return (
    <div className="flex max-w-md flex-col gap-3 text-center">
      <CapraImage
        image={image}
        className={classNames("max-h-28 sm:max-h-24", imageClassName)}
      />
      <TitleComponent className="text-2xl font-bold text-secondary">
        {title}
      </TitleComponent>
      <p className="text-lg text-secondary">{children}</p>
    </div>
  );
};

export default IconTitleAndTextBlock;
