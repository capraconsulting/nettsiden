import { Link } from "@remix-run/react";

import { Todo } from "~/components/todo";
import type { SocialPlatform } from "~/utils/constants";
import {
  constants,
  externalLinks,
  menuItems,
  socialIcons,
  socialPlatforms,
} from "~/utils/constants";
import { capitalize, formatPhoneNumber } from "~/utils/misc";

interface FooterModuleProps {
  title: string;
  children: React.ReactNode;
}

const FooterModule: React.VFC<FooterModuleProps> = ({ title, children }) => (
  <div>
    <h3 className="uppercase text-white font-bold text-lg mb-0.5">{title}</h3>
    {children}
  </div>
);

interface FooterSocialIconProps {
  platform: SocialPlatform;
}

const FooterSocialIcon: React.VFC<FooterSocialIconProps> = ({ platform }) => (
  <FooterLink
    href={externalLinks[platform]}
    external={true}
    title={capitalize(platform)}
  >
    <svg
      width={constants.iconSize}
      height={constants.iconSize}
      className="fill-white"
      xmlns="https://www.w3.org/2000/svg"
    >
      {socialIcons[platform]}
    </svg>
  </FooterLink>
);

type FooterLinkProps =
  | { external: true; title: string; href: `https://${string}` }
  | { external?: false; title?: never; href: string };

const footerLinkClass = "text-secondary underline block mb-2 mt-1 md:my-0";

const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  external,
  children,
  title,
}) => {
  if (external) {
    return (
      <a
        href={href}
        className={footerLinkClass}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
      >
        {children || href}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link className={footerLinkClass} to={href}>
        {children || href}
      </Link>
    );
  }

  return (
    <a href={href} className={footerLinkClass}>
      {children || href}
    </a>
  );
};

export const Footer: React.VFC = () => (
  <footer className="bg-main border-none flex flex-col gap-4 py-7 items-center">
    <section className="flex flex-col md:flex-row justify-evenly w-full max-w-6xl ml-6 md:ml-0">
      <div>
        <FooterModule title="Besøksadresse">
          <FooterLink
            href={externalLinks.googleMaps}
            external={true}
            title="Adressen til Capra"
          >
            {constants.address}
          </FooterLink>
        </FooterModule>
        <FooterModule title="Kontakt">
          <FooterLink href={externalLinks.mailto}>
            {constants.contactEmail}
          </FooterLink>
        </FooterModule>
        <FooterModule title="Telefon">
          <FooterLink href={externalLinks.callUs}>
            {formatPhoneNumber(constants.contactPhoneNumber)}
          </FooterLink>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Meny">
          {menuItems.map((it) => (
            <FooterLink key={it.href} href={it.href}>
              {it.title}
            </FooterLink>
          ))}
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Samarbeidspartner">
          <Todo badge title="Bilde">
            Rideskole
          </Todo>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Sertifiseringer">
          <Todo badge title="Bilde">
            Miljøfyrtårn
          </Todo>
          <Todo badge title="Bilde">
            DNV
          </Todo>
        </FooterModule>
      </div>
    </section>
    <section className="flex flex-row justify-center gap-8">
      {socialPlatforms.map((it) => (
        <FooterSocialIcon platform={it} key={it} />
      ))}
    </section>
    <section className="flex flex-row justify-center gap-3 text-xs text-white underline">
      <a href="/personvernerklæring">Personvernerklæring</a>
      <a href="/informasjonskapsler">Informasjonskapsler</a>
    </section>
  </footer>
);
