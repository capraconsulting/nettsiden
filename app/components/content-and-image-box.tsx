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
  imageBoxClassName:
    initialImageBoxClassName = "bg-gradient-to-bl from-lime-600 via-teal-400 to-emerald-400",
}: Props) => {
  let className = initialClassName;
  let contentBoxClassName = initialContentBoxClassName;
  let imageBoxClassName = initialImageBoxClassName;

  if (direction === "left") {
    className += "flex-col md:flex-row";
    contentBoxClassName += " md:pl-[40px] md:pr-[100px]";
    imageBoxClassName += " md:-ml-[100px]";
  }
  if (direction === "right") {
    className += "flex-col md:flex-row-reverse";
    contentBoxClassName += " md:pl-[100px]";
    imageBoxClassName += " md:-mr-[100px]";
  }

  return (
    <Todo badge title="" className="border-none px-0 py-0">
      <div className={`flex items-center ${className}`}>
        <div
          className={`bg-blue w-full md:w-[40vw] lg:w-[60w] md:min-w-[500px] flex flex-col justify-center ${contentBoxClassName}`}
          style={{ height }}
        >
          <div className="p-[2vw] pb-0 text-2xl font-semibold">{title}</div>
          <div className="p-[2vw] whitespace-pre-line">{children}</div>
        </div>

        <div
          className={`relative h-[30vw] aspect-square shadow-lg ${imageBoxClassName}`}
        >
          <div className="absolute top-0 w-full">
            <Todo size="small" badge title="fancy patterns" />
          </div>
          {image}
        </div>
      </div>
    </Todo>
  );
};
