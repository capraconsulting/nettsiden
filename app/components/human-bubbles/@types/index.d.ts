import { IGatsbyImageData } from "gatsby-plugin-image";

type HumanBubblesProps = {
  variant: "small" | "large";
};

type IImageQueryResult = {
  allSanityAuthor: {
    edges: {
      node: {
        name: string;
        email: string;
        image: {
          asset: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      };
    }[];
  };
};

type ImageNode = {
  src: string;
  height: number;
  width: number;
};
