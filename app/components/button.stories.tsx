import { BrowserRouter } from "react-router-dom";

import { Button } from "~/components/button";

export const SolidVariant: React.FC = () => (
  // Wrap it in a router since it uses Link (and thus the router context) internally
  <BrowserRouter>
    <Button href="#" variant="solid">
      Se våre ansatte
    </Button>
  </BrowserRouter>
);

export const OutlineVariant: React.FC = () => (
  <BrowserRouter>
    <Button href="#" variant="outline">
      Bli kunde?
    </Button>
    <Button href="#" variant="outline">
      Jobb hos oss!
    </Button>
  </BrowserRouter>
);
