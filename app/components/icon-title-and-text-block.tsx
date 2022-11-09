import type { PropsWithChildren } from "react";
import React from "react";

type IconTitleAndTextBlockProps = {
  title: string;
  titleAs: "h1" | "h2" | "h3" | "h4";
  img: string;
  imgAlt: string;
};

const IconTitleAndTextBlock: React.FC<
  PropsWithChildren<IconTitleAndTextBlockProps>
> = ({ title, titleAs: TitleComponent, children, img, imgAlt }) => {
  return (
    <div className="flex flex-col gap-3 text-center">
      <img src={img} alt={imgAlt} className="max-h-28 sm:max-h-32" />
      <TitleComponent className="text-2xl font-bold md:text-3xl">
        {title}
      </TitleComponent>
      <p>{children}</p>
    </div>
  );
};

export default IconTitleAndTextBlock;
