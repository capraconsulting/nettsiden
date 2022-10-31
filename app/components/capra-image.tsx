type ImageProps = React.ComponentProps<"img"> & { alt: string };

const DEFAULT: React.ComponentProps<"img"> = {
  // Makes the image not load before scrolling into view
  // Very useful for pages showing lots of images, or when there are images at bottom
  loading: "lazy",

  // `decoding="async" seems to be the default in most or all other img abstractions
  // Like Next 13
  // But without placeholder tricks and such this causes a quick flash when first loading a page with images visible,
  // not so nice.
  // we can consider this at a later time, maybe it's an edge case and the tradeoff is worth it.
  // decoding: "async",
};

// TODO:
// - [] Prop for sanity imageUrl
// - [] Prop for sanity imageObject
// - [] Generate srcset
// - [] Placeholder
export const CapraImage = (props: ImageProps) => {
  return <img {...DEFAULT} {...props} alt={props.alt} />;
};
