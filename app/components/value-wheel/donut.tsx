import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { AnimatedBubble } from "./bubble";
import { Filter } from "./filter";
import { Slice } from "./slice";
import { createAngles, createArc } from "./utils";

export const Donut = ({
  active,
  onClick,
}: {
  active: number;
  onClick: (idx: number) => void;
}) => {
  const q = graphql`
    query valuePropositions {
      allValueProposition {
        edges {
          node {
            text
            content
            color
            textColor
          }
        }
      }
    }
  `;

  const queryResult: ValuePropositionQueryResult = useStaticQuery(q);
  const nodes = queryResult.allValueProposition.edges.map((edge) => {
    return edge.node;
  });

  const x = 50;
  const y = 50;
  const rad1 = 46;
  const rad2 = 17;
  const rad3 = 32;
  const nslices = 5;
  const margin = (360 / 100) * 0.5;

  // function $angles will return start + end angle
  const $angles = createAngles(nslices, margin);

  const slices = nodes.map((_d, idx): [Arc, Arc, Arc] => {
    const offsetRad = active === idx ? 2 : 0;
    const angles = $angles(idx, 0);
    const textAngles = $angles(idx, 38);
    return [
      createArc(x, y, rad1 + offsetRad, ...angles),
      createArc(x, y, rad2 + offsetRad, ...angles),
      createArc(x, y, rad3 + offsetRad, ...textAngles),
    ];
  });

  return (
    <svg
      style={{
        width: "100%",
        height: "100%",
        userSelect: "none",
      }}
      viewBox="0 0 100 100"
    >
      <Filter id="shadow" />
      {slices.map(([arc1, arc2, arc3], idx: number) => {
        const key = arc1.map(Math.floor).join(".");
        const textXy = arc3.slice(-2).map(Math.round) as Point2D;
        return (
          <Slice
            key={`slice-${key}`}
            filter="url(#shadow)"
            onClick={() => onClick(idx)}
            arc1={arc1}
            arc2={arc2}
            textXy={textXy}
            text={nodes[idx].text}
            textColor={nodes[idx].textColor}
            style={{
              stroke: nodes[idx].color,
              fill: nodes[idx].color,
              strokeWidth: "0.33",
            }}
          />
        );
      })}
      <text
        x={50}
        y={51}
        style={{
          textAnchor: "middle",
          fill: "black",
          fontSize: "2.5pt",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Våre verdier
      </text>
      <AnimatedBubble
        isActive={active > -1}
        style={{
          stroke: nodes[active]?.color,
          fill: nodes[active]?.color || "white",
          strokeWidth: 0.33,
        }}
        textColor={nodes[active]?.textColor}
        onClick={() => onClick(active)}
        text={nodes[active]?.content || "Våre verdier"}
      />
    </svg>
  );
};
