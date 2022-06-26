import { TypingText } from "~/components/typing-text";

interface Props {
  title: string;
  subTitle: string;
  className?: string;
  dynamicText?: string | string[];
}

export const TextHeader: React.VFC<Props> = ({
  title,
  subTitle,
  dynamicText,
}) => (
  <div className="flex flex-col justify-center items-center text-center w-full">
    <h1
      className="font-bold mx-2 mb-4"
      style={{ fontSize: "clamp(35px,5vw,60px)" }}
    >
      {title}
      {dynamicText && (
        <>
          &nbsp;
          <TypingText text={dynamicText} />
        </>
      )}
    </h1>
    <p className="font-light" style={{ fontSize: "clamp(20px,2.5vw,30px)" }}>
      {subTitle}
    </p>
  </div>
);
