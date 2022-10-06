import { classNames } from "~/utils/misc";
import { CapraLink } from "./capra-link";

interface Slogan {
  title: string;
  imageUrl: string;
}

interface Props {
  title: React.ReactNode;
  titleAs: "h2" | "h3" | "h4";
  children: React.ReactNode;

  sloganColor: SloganColor;
  slogans: Slogan[];
  illustrationImageUrl: string;

  readMoreHref?: string;

  direction: "left" | "right";
}
export const ContentAndSlogansBox = ({
  title,
  titleAs: TitleComponent,
  children,
  slogans,
  sloganColor,
  illustrationImageUrl,
  readMoreHref,
  direction,
}: Props) => {
  return (
    <div
      className={classNames(
        "flex-col-reverse flex w-full",
        {
          "md:flex-row": direction === "left",
          "md:flex-row-reverse": direction === "right",
        },
        "w-[95%] max-w-4xl",
      )}
    >
      <div
        className={classNames(
          "w-full md:w-1/2 pt-[15%] px-[10%] text-secondary",
        )}
      >
        <TitleComponent
          className={classNames(
            "text-4xl font-bold ",

            // Fancy underline
            "after:content-['']",
            "after:w-[40pt]",
            "after:h-[4pt]",
            "after:bg-main",
            "after:absolute",
            "after:block",
            "after:rounded",
          )}
        >
          {title}
        </TitleComponent>

        <div className="mt-[4vh]">{children}</div>

        {readMoreHref && (
          <CapraLink
            href={readMoreHref}
            prefetch="intent"
            className="text-xl block mt-[10%] md:mt-[25%]"
          >
            Les mer
          </CapraLink>
        )}
      </div>

      <div className="w-full md:w-1/2 grid grid-cols-2 gap-2.5 p-1">
        {slogans.map(({ title, imageUrl }) => (
          <div
            key={title}
            className={classNames(
              "relative",
              "flex flex-col items-center rounded",
              SLOGAN_COLORS[sloganColor],
              "aspect-square",
            )}
          >
            <img className="mt-[20%] w-[40%]" src={imageUrl} alt="" />
            <p className="font-bold absolute bottom-[20%]">{title}</p>
          </div>
        ))}
        <img src={illustrationImageUrl} alt="" />
      </div>
    </div>
  );
};

export type SloganColor = "peach" | "lightBlue" | "bordeaux" | "darkBlue";
const SLOGAN_COLORS: Record<SloganColor, string> = /*tw*/ {
  peach: "bg-peach text-secondary",
  lightBlue: "bg-light-blue text-secondary",
  bordeaux: "bg-bordeaux text-white",
  darkBlue: "bg-secondary-80 text-peach-20",
};
