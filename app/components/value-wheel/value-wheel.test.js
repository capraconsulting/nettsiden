import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { ValueWheel } from "./value-wheel";
import { useStaticQuery } from "gatsby";

useStaticQuery.mockReturnValue({
  allValueProposition: {
    edges: [
      {
        node: {
          textColor: "#fff",
          color: "#000",
          text: "foo",
          content: "bar",
        },
      },
      {
        node: {
          textColor: "#fff",
          color: "#000",
          text: "baz",
          content: "bax",
        },
      },
    ],
  },
});

describe("ValueWheel", () => {
  it("opens 'foo' bubble on click", async () => {
    const { getByText } = render(<ValueWheel />);

    expect(() => getByText("bar")).toThrowError();

    fireEvent.click(getByText("foo"));

    await waitFor(() => {
      getByText("bar");
    });
  });
});
