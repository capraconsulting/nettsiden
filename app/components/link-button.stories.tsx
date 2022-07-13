import { BrowserRouter } from "react-router-dom";

import { LinkButton } from "~/components/link-button";

export const SolidVariant: React.FC = () => (
  // Wrap it in a router since it uses Link (and thus the router context) internally
  <BrowserRouter>
    <LinkButton href="#" variant="solid">
      Se våre ansatte
    </LinkButton>
  </BrowserRouter>
);

export const OutlineVariant: React.FC = () => (
  <BrowserRouter>
    <LinkButton href="#" variant="outline">
      Bli kunde?
    </LinkButton>
    <LinkButton href="#" variant="outline">
      Jobb hos oss!
    </LinkButton>
  </BrowserRouter>
);
