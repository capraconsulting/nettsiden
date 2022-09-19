type ValuePropositionEdge = {
  node: {
    text: string;
    textColor: string;
    content: string;
    color: string;
  };
};

type ValuePropositionQueryResult = {
  allValueProposition: {
    edges: ValuePropositionEdge[];
  };
};

type Arc = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

type Point2D = [number, number];

type FilterProps = {
  id: string;
};

type SliceProps = {
  arc1: Arc;
  arc2: Arc;
  textColor: string;
  textStyles?: StyleProps;
  text: string;
  textXy: Point2D;
  style: {
    [key: string]: string | number;
  };
  filter: string;
  onClick: () => void;
};
