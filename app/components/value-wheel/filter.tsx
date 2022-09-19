import React from "react";

export const Filter = ({ id }: FilterProps) => (
  <filter id={id} height="200%">
    {/** stdDeviation is how much to blur */}
    <feGaussianBlur in="SourceAlpha" stdDeviation=".33" />
    {/** how much to offset */}
    <feOffset dx="0" dy=".33" result="offsetblur" />
    <feComponentTransfer>
      {/** slope is the opacity of the shadow */}
      <feFuncA type="linear" slope=".33" />
    </feComponentTransfer>
    <feMerge>
      {/** this contains the offset blurred image */}
      <feMergeNode />
      {/** this contains the element that the filter is applied to */}
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);
