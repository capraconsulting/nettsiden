import { Button } from "~/components/button";

interface CallToActionBoxProps {
  title: React.ReactNode;
  titleAs?: "h2" | "h3" | "h4" | "p";
  description: React.ReactNode;
  linkText: React.ReactNode;
  href: string;
}

export const CallToActionBox = ({
  title,
  titleAs: TitleComponent = "p",
  description,
  linkText,
  href,
}: CallToActionBoxProps) => {
  return (
    <div className="relative flex w-screen max-w-7xl flex-col items-center gap-7 bg-peach-20 py-24 px-6 text-secondary lg:w-11/12">
      <div className="flex flex-col gap-1 text-center">
        <TitleComponent className="text-xl font-bold">{title}</TitleComponent>
        <p>{description}</p>
      </div>
      <Button variant="solid" href={href}>
        {linkText}
      </Button>
    </div>
  );
};
