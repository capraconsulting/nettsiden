import { Button } from "~/components/button";

interface CallToActionBoxProps {
  title: React.ReactNode;
  description: React.ReactNode;
  linkText: React.ReactNode;
  href: string;
}

export const CallToActionBox = ({
  title,
  description,
  linkText,
  href,
}: CallToActionBoxProps) => {
  return (
    <div className="w-11/12 max-w-7xl py-24 px-6 bg-peach-20 flex flex-col items-center flex flex-col gap-7 text-secondary">
      <div className="text-center flex flex-col gap-1">
        <p className="font-bold text-xl">{title}</p>
        <p>{description}</p>
      </div>
      <Button variant="solid" href={href}>
        {linkText}
      </Button>
    </div>
  );
};
