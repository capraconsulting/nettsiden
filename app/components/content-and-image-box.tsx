import { Todo } from "./todo";

/**
 * Notes:
 * This component uses some fixed dimensions, like 100px
 * and some kinda fixed dimenision with vw
 *
 * This might set some limitations on how we do layoting 🤔
 * Or maybe it's not a problem 🤷
 */

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  image: React.ReactNode;

  height: `${number}vw`;
  direction?: "left" | "right";

  className?: string;
  contentBoxClassName?: string;
  imageBoxClassName?: string;
}
export const ContentAndImageBox = ({
  title,
  children,
  image,

  height,
  direction = "left",

  className: initialClassName = "",
  contentBoxClassName: initialContentBoxClassName = "bg-blue-300",
  imageBoxClassName: initialImageBoxClassName = "bg-white",
}: Props) => {
  let className = initialClassName;
  let contentBoxClassName = initialContentBoxClassName;
  let imageBoxClassName = initialImageBoxClassName;

  if (direction === "left") {
    className += " md:flex-row ";
    contentBoxClassName += " md:pl-[40px] md:pr-[100px]";
    imageBoxClassName += " md:-ml-[100px]";
  }
  if (direction === "right") {
    className += " md:flex-row-reverse";
    contentBoxClassName += " md:pl-[100px]";
    imageBoxClassName += " md:-mr-[100px]";
  }

  return (
    <div
      className={`flex-col-reverse flex w-full justify-center items-center ${className}`}
    >
      <div
        className={`w-full md:w-[40vw] lg:w-[60w] md:min-w-[500px] flex flex-col justify-center ${contentBoxClassName}`}
        style={{ height }}
      >
        <div className="p-[2vw] pb-0 text-2xl md:text-4xl text-secondary font-bold">
          {title}
        </div>
        <div className="p-[2vw] whitespace-pre-line text-md md:text-lg text-secondary">
          {children}
        </div>
      </div>

      <div
        className={`relative max-h-60 md:h-[30vw] md:max-h-96 aspect-square shadow-xl ${imageBoxClassName}`}
      >
        <div className="absolute top-0 w-full">
          <Todo size="small" badge title="fancy patterns" />
        </div>
        {image}
      </div>
    </div>
  );
};
