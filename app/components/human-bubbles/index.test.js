import React from "react";
import { render } from "@testing-library/react";
import { HumanBubbles } from ".";
import { useStaticQuery } from "gatsby";

useStaticQuery.mockReturnValue({
  allSanityAuthor: {
    edges: [
      {
        node: {
          name: "John Doe",
          email: "john@example.com",
          image: {
            asset: {
              gatsbyImageData: {
                width: 10,
                height: 10,
                images: {
                  fallback: {
                    src: "example.png",
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
});

describe("HumanBubbles", () => {
  it("mounts small variant", () => {
    const { getByText } = render(<HumanBubbles variant="small" />);
    getByText("Vi har kickass folk");
  });

  it("mounts large variant", () => {
    const { container } = render(<HumanBubbles variant="large" />);
    expect(container.querySelector("#humanBubblesContainer")).toBeTruthy();
  });
});
