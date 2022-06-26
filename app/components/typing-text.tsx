import { useEffect, useState } from "react";

import { classNames } from "~/utils/misc";

interface TimingConfig {
  delay?: number;
  speed?: number;
}

interface Props {
  typing?: TimingConfig;
  erasing?: TimingConfig;
  className?: string;
  text: string | string[];
}

let timeout: ReturnType<typeof setTimeout>;
let interval: ReturnType<typeof setInterval>;

type State = "idle" | "typing" | "erasing";

export const TypingText: React.VFC<Props> = ({
  text,
  typing = {
    delay: 1000,
    speed: 50,
  },
  erasing = {
    delay: 2000,
    speed: 50,
  },
}) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [states, setStates] = useState<[State, State]>(["idle", "typing"]);

  useEffect(() => {
    const [currentState, nextState] = states;
    if (currentState === "idle") {
      const delay = nextState === "typing" ? typing?.delay : erasing?.delay;
      timeout = setTimeout(() => {
        setStates([nextState, "idle"]);
      }, delay);
    } else if (currentState === "typing") {
      interval = setInterval(() => {
        const rawText = typeof text === "string" ? text : text[index];
        setDisplayText((prev) => {
          if (rawText.length > prev.length) {
            return rawText.substring(0, prev.length + 1);
          } else {
            setStates(["idle", "erasing"]);
            return prev;
          }
        });
      }, typing?.speed);
    } else if (currentState === "erasing") {
      interval = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length === 0) {
            const textArray = typeof text === "string" ? [text] : text;
            setIndex((prev) => (prev + 1 === textArray.length ? 0 : prev + 1));
            setStates(["idle", "typing"]);
            return prev;
          } else {
            return prev.substring(-prev.length, prev.length - 1);
          }
        });
      }, erasing?.speed);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [states, erasing, typing, text, index]);

  return (
    <span>
      {displayText}
      <Cursor />
    </span>
  );
};

interface CursorProps {
  interval?: number;
}

const Cursor: React.VFC<CursorProps> = ({ interval = 500 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShow((prev) => !prev);
    }, interval);

    return () => clearInterval(cursorInterval);
  }, [interval]);

  return (
    <span
      className={classNames(
        "inline-block transition-opacity duration-500",
        show ? "opacity-1" : "opacity-0",
      )}
    >
      |
    </span>
  );
};
