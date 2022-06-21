export const constants = {
  contactEmail: "post@capraconsulting.no",
  contactPhoneNumber: "45832632",
  iconSize: 24,
  address: (
    <p className="mb-6">
      Capra&nbsp;Consulting&nbsp;AS
      <br />
      Stenersgata&nbsp;2
      <br />
      0184&nbsp;Oslo
    </p>
  ),
} as const;

interface MenuItem {
  title: string;
  href: string;
}

export const menuItems: readonly MenuItem[] = [
  { title: "Dette kan vi", href: "/dette-kan-vi" },
  { title: "Dette har vi gjort", href: "/dette-har-vi-gjort" },
  { title: "Blogg", href: "/blogg" },
  { title: "Mentorprogram", href: "/mentor" },
  { title: "Bli en av oss", href: "/bli-en-av-oss" },
  { title: "Partnere", href: "/partnere" },
  { title: "Om oss", href: "/om-oss" },
  { title: "Ansatte", href: "/ansatte" },
];

export const externalLinks = {
  mailto: `mailto:${constants.contactEmail}`,
  callUs: `tel:+47${constants.contactPhoneNumber}`,
  facebook: "https://facebook.com/capraconsulting",
  instagram: "https://instagram.com/capraconsulting",
  linkedIn: "https://linkedin.com/company/capraconsulting",
  youTube: "https://youtube.com/channel/UCL8VXozo5_A2zSMlQ05sCSw",
  gitHub: "https://github.com/capraconsulting",
  googleMaps:
    "https://google.com/maps/place/Capra+Consulting+AS/@59.9130579,10.7490986,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e89e8977fa5:0x2cb9207380d3722e!8m2!3d59.9130579!4d10.7512872",
} as const;

export const socialPlatforms = [
  "facebook",
  "instagram",
  "linkedIn",
  "youTube",
  "gitHub",
] as const;

export type SocialPlatform = typeof socialPlatforms[number];

export const socialIcons: Record<SocialPlatform, React.ReactNode> = {
  facebook: (
    <path d="M3.104 22C2.494 22 2 21.506 2 20.896V3.104C2 2.494 2.494 2 3.104 2h17.792C21.506 2 22 2.494 22 3.104v17.792c0 .61-.494 1.104-1.104 1.104H15.8v-7.745h2.6l.389-3.019h-2.99V9.31c0-.873.243-1.469 1.497-1.469h1.598v-2.7a21.367 21.367 0 00-2.33-.12c-2.304 0-3.881 1.407-3.881 3.99v2.226h-2.607v3.019h2.607V22h-9.58z" />
  ),
  instagram: (
    <>
      <path
        d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="white"
      />
      <path
        d="M16 11.37a4 4 0 11-7.914 1.173A4 4 0 0116 11.37zM17.5 6.5h.01"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#fd414d"
        fill="#fd414d"
      />
    </>
  ),
  linkedIn: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.476 2h17.043c.816 0 1.479.646 1.479 1.442v17.114c0 .796-.663 1.443-1.48 1.443H3.477c-.814 0-1.476-.647-1.476-1.443V3.442C2 2.646 2.662 2 3.476 2zm12.6 17.041h2.966v-5.234c0-2.57-.555-4.546-3.558-4.546-1.443 0-2.411.79-2.807 1.541h-.04V9.497H9.79v9.544h2.965v-4.72c0-1.245.236-2.452 1.78-2.452 1.521 0 1.54 1.424 1.54 2.53v4.642zM4.729 6.474a1.72 1.72 0 103.439 0 1.72 1.72 0 00-3.439 0zM7.931 19.04H4.964V9.497H7.93v9.544z"
    />
  ),
  youTube: (
    <path d="M10 15V9l6 3-6 3zm11.8-6.98s-.196-1.372-.795-1.976c-.76-.793-1.613-.796-2.004-.842C16.202 5 12.004 5 12.004 5h-.008s-4.199 0-6.997.202c-.391.046-1.243.05-2.005.842C2.395 6.648 2.2 8.02 2.2 8.02S2 9.63 2 11.24v1.51c0 1.612.2 3.222.2 3.222s.195 1.372.794 1.976c.762.793 1.761.768 2.206.85C6.8 18.954 12 19 12 19s4.203-.006 7.001-.208c.39-.046 1.243-.05 2.004-.843.6-.604.795-1.976.795-1.976s.2-1.61.2-3.221v-1.51c0-1.611-.2-3.222-.2-3.222z" />
  ),
  gitHub: (
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  ),
};
