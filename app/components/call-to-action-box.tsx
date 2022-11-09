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
    <div className="flex w-11/12 max-w-7xl flex-col items-center gap-7 bg-peach-20 py-24 px-6 text-secondary">
      <div className="flex flex-col gap-1 text-center">
        <p className="text-xl font-bold">{title}</p>
        <p>{description}</p>
      </div>
      <Button variant="solid" href={href}>
        {linkText}
      </Button>
    </div>
  );
};
