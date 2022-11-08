import { TypingText } from "./typing-text";

export const ViErNorgesBestePaa = () => (
  <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
    Vi er norges beste på{" "}
    <TypingText
      text={[
        "AWS",
        "selvskryt",
        "java",
        "vaffelspising",
        "javascript",
        "smash",
        "agile",
        "bordtennis",
      ]}
    />
  </h1>
);
ViErNorgesBestePaa.storyName = "Vi er norges beste på";

export const Test123 = () => (
  <div className="flex flex-col gap-2">
    <TypingText text={["test", "test2", "test3"]} />
  </div>
);
