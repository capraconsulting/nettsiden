import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";
import { HumanBubblesProps, IImageQueryResult, ImageNode } from "./@types";
import { HumanBubblesLarge } from "./human-bubbles-large";
import { HumanBubblesSmall } from "./human-bubbles-small";
import * as css from "./styles.module.css";
import { shuffle } from "./utils";

export const HumanBubbles = ({ variant }: HumanBubblesProps) => {
  const data: IImageQueryResult = useStaticQuery(graphql`
    {
      allSanityAuthor(
        filter: { image: { hotspot: { x: { ne: null } } } }
        sort: { order: ASC, fields: name }
      ) {
        edges {
          node {
            name
            email
            image {
              asset {
                gatsbyImageData(aspectRatio: 1, width: 120)
              }
            }
          }
        }
      }
    }
  `);

  const nodes: ImageNode[] = data.allSanityAuthor.edges.map((edge) => {
    const gatsbyImageData: IGatsbyImageData =
      edge.node.image.asset.gatsbyImageData;
    return {
      height: gatsbyImageData.height,
      width: gatsbyImageData.width,
      src: gatsbyImageData.images.fallback?.src ?? "",
    };
  });

  const _nodes = shuffle(nodes);

  return (
    <div id="humanBubblesContainer" className={css.container}>
      {variant === "small" ? (
        <HumanBubblesSmall nodes={_nodes.slice(0, 13)} />
      ) : (
        <HumanBubblesLarge nodes={_nodes} />
      )}
    </div>
  );
};
