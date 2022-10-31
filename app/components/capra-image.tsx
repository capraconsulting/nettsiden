type ImageProps = React.ComponentProps<"img"> & { alt: string };

const DEFAULT: React.ComponentProps<"img"> = {
  // Makes the image not load before scrolling into view
  // Very useful for pages showing lots of images, or when there are images at bottom
  loading: "lazy",

  // This seems to be the default in most or all other img abstractions
  decoding: "async",
};

// TODO:
// - [] Prop for sanity imageUrl
// - [] Prop for sanity imageObject
// - [] Generate srcset
// - [] Placeholder
export const CapraImage = (props: ImageProps) => {
  return <img {...DEFAULT} {...props} alt={props.alt} />;
};
