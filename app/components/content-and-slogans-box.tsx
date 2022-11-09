import type { BrandColor } from "~/utils/constants";
import { BRAND_BG_AND_FG_COLORS } from "~/utils/constants";
import { classNames } from "~/utils/misc";
import { CapraImage } from "./capra-image";
import { CapraLink } from "./capra-link";

interface Slogan {
  title: string;
  imageUrl: string;
}

interface Props {
  title: React.ReactNode;
  titleAs: "h2" | "h3" | "h4";
  children: React.ReactNode;

  sloganColor: BrandColor;
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
        "flex w-full flex-col-reverse",
        {
          "md:flex-row": direction === "left",
          "md:flex-row-reverse": direction === "right",
        },
        "w-[95%] max-w-4xl",
      )}
    >
      <div
        className={classNames(
          "w-full px-[10%] pt-[15%] text-secondary md:w-1/2",
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
            className="mt-[10%] inline-block text-xl md:mt-[25%]"
          >
            Les mer
          </CapraLink>
        )}
      </div>

      <div className="grid w-full grid-cols-2 gap-2.5 p-1 md:w-1/2">
        {slogans.map(({ title, imageUrl }) => (
          <div
            key={title}
            className={classNames(
              "relative",
              "flex flex-col items-center rounded",
              BRAND_BG_AND_FG_COLORS[sloganColor],
              "aspect-square",
            )}
          >
            <CapraImage className="mt-[20%] w-[40%]" src={imageUrl} alt="" />
            <p className="absolute bottom-[20%] font-bold">{title}</p>
          </div>
        ))}
        <CapraImage src={illustrationImageUrl} alt="" />
      </div>
    </div>
  );
};
