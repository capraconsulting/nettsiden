import { Link } from "@remix-run/react";

import { Todo } from "~/components/todo";
import type { SocialPlatform } from "~/utils/constants";
import {
  contactInfo,
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

const ICON_SIZE = 24;

const FooterSocialIcon: React.VFC<FooterSocialIconProps> = ({ platform }) => (
  <FooterLink
    href={externalLinks[platform]}
    external={true}
    title={capitalize(platform)}
  >
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      className="fill-white"
      xmlns="https://www.w3.org/2000/svg"
    >
      {socialIcons[platform]}
    </svg>
  </FooterLink>
);

type FooterLinkProps =
  | {
      external: true;
      title: string;
      children?: React.ReactNode;
      href: `https://${string}`;
    }
  | {
      external?: false;
      title?: never;
      children?: React.ReactNode;
      href: string;
    };

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
  <footer className="bg-main border-none flex flex-col gap-10 py-7 items-center">
    <section className="flex flex-col gap-10 md:gap-0 md:flex-row justify-evenly w-full max-w-6xl px-6 md:px-0">
      <div className="flex flex-col gap-6">
        <FooterModule title="Besøksadresse">
          <FooterLink
            href={externalLinks.googleMaps}
            external={true}
            title="Adressen til Capra"
          >
            <p>
              {contactInfo.companyAddress.name}
              <br />
              {contactInfo.companyAddress.street}
              <br />
              {contactInfo.companyAddress.postalCode}{" "}
              {contactInfo.companyAddress.city}
            </p>
          </FooterLink>
        </FooterModule>
        <FooterModule title="Kontakt">
          <FooterLink href={externalLinks.mailto}>
            {contactInfo.email}
          </FooterLink>
        </FooterModule>
        <FooterModule title="Telefon">
          <FooterLink href={externalLinks.callUs}>
            {formatPhoneNumber(contactInfo.phoneNumber)}
          </FooterLink>
        </FooterModule>
      </div>
      <div>
        <FooterModule title="Meny">
          <ul className="flex flex-col gap-1">
            {menuItems.map((it) => (
              <li key={it.href}>
                <FooterLink href={it.href}>{it.title}</FooterLink>
              </li>
            ))}
          </ul>
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
      <a href="/personvernerklaering">Personvernerklæring</a>
      <a href="/informasjonskapsler">Informasjonskapsler</a>
    </section>
  </footer>
);
