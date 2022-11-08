import type { PropsWithChildren } from "react";
import React from "react";

type IconTitleAndTextBlockProps = {
  title: string;
  img: string;
  imgAlt: string;
};

const IconTitleAndTextBlock: React.FC<
  PropsWithChildren<IconTitleAndTextBlockProps>
> = ({ title, children, img, imgAlt }) => {
  return (
    <div className="flex flex-col gap-3 text-center">
      <img src={img} alt={imgAlt} className="max-h-28 sm:max-h-32" />
      <h3 className="font-bold text-2xl md:text-3xl">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default IconTitleAndTextBlock;
