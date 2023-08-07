import React from "react";

import { Card } from "~/components/card";

interface StepBoxProps {
  titleAs: "h2" | "h3" | "h4";
  title: React.ReactNode;
  description?: React.ReactNode;
  items?: React.ReactNode[];
  extraInfo?: React.ReactNode[];
}

export const StepBox = ({
  titleAs: TitleComponent,
  title,
  description,
  items,
  extraInfo,
}: StepBoxProps) => (
  <Card as="li">
    <article>
      <TitleComponent className="font-bold uppercase text-main">
        {title}
      </TitleComponent>
      <div>
        <p>{description}</p>
        <ul style={{ paddingLeft: 28, listStyle: "disc" }}>
          {items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {extraInfo && (
          <div className="pt-3">
            <ul className="text-right font-bold uppercase text-main">
              {extraInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  </Card>
);
