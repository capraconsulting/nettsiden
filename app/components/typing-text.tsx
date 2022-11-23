import { useEffect, useReducer, useState } from "react";

import { useHydrated } from "~/hooks/use-hydrated";
import { classNames } from "~/utils/misc";

interface Timing {
  delay: number;
  speed: number;
}

interface State {
  currentWordIndex: number;
  displayText: string;
  state: keyof typeof timings | "idle";
}

interface Props {
  text: string | string[];
  typing?: Timing;
  erasing?: Timing;
}

const timings: Required<Pick<Props, "typing" | "erasing">> = {
  typing: {
    delay: 1000,
    speed: 50,
  },
  erasing: {
    delay: 2000,
    speed: 50,
  },
};

export const TypingText: React.FC<Props> = ({
  text,
  typing = timings.typing,
  erasing = timings.erasing,
}) => {
  const [{ state, displayText }, tick] = useTextReducer(
    typeof text === "string" ? [text] : text,
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    switch (state) {
      case "idle":
        timeout = setTimeout(
          tick,
          displayText.length === 0 ? typing.delay : erasing.delay,
        );
        break;
      case "typing":
        interval = setInterval(tick, typing.speed);
        break;
      case "erasing":
        interval = setInterval(tick, erasing.speed);
        break;
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };

    // I know better than eslint here tbh. This will trigger more often than necessary if we listen to all changes they want us to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, erasing, typing]);

  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <span>{typeof text === "string" ? text : text[0]}</span>;
  }

  return (
    <span
      aria-label={new Intl.ListFormat().format(
        typeof text === "string" ? [text] : text,
      )}
    >
      {displayText}
      <Cursor />
    </span>
  );
};

function useTextReducer(texts: string[]) {
  return useReducer(
    ({ currentWordIndex, displayText, state }: State): State => {
      if (!(currentWordIndex in texts)) {
        throw new Error(
          `Unresolvable index: i=${currentWordIndex}, l=${texts.length}`,
        );
      }

      const selectedWord = texts[currentWordIndex];
      let currentLength = displayText.length;

      switch (state) {
        case "typing":
          if (currentLength === selectedWord.length) {
            state = "idle";
          } else {
            currentLength++;
          }
          break;
        case "erasing":
          if (currentLength === 0) {
            state = "idle";
            currentWordIndex++;
            if (!(currentWordIndex in texts)) {
              currentWordIndex = 0;
            }
          } else {
            currentLength--;
          }
          break;
        case "idle":
          state = currentLength === 0 ? "typing" : "erasing";
          break;
      }

      return {
        state,
        currentWordIndex,
        displayText: selectedWord.substring(0, currentLength),
      };
    },
    {
      currentWordIndex: 0,
      displayText: "",
      state: "idle",
    },
  );
}

const Cursor: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span
      aria-hidden={true}
      className={classNames(
        "inline-block transition-opacity duration-500",
        show ? "opacity-1" : "opacity-0",
      )}
    >
      |
    </span>
  );
};
