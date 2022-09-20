import type { Story } from "@ladle/react";

import type { Props as PatternProps } from "~/components/pattern/pattern";
import { Pattern } from "~/components/pattern/pattern";
import {
  FILL_CLASSES,
  PATTERN_TYPES,
  SHAPES,
} from "~/components/pattern/types";

export const PatternStory: Story<PatternProps> = Pattern;

PatternStory.argTypes = {
  color: {
    options: FILL_CLASSES,
    control: {
      type: "select",
    },
    defaultValue: "fill-main",
  },
  shape: {
    options: SHAPES,
    control: {
      type: "radio",
    },
    defaultValue: "rect",
  },
  pattern: {
    options: PATTERN_TYPES,
    control: {
      type: "select",
    },
    defaultValue: "h-lines",
  },
};

PatternStory.args = {
  width: 250,
  height: 150,
  flipH: false,
  flipV: false,
};
