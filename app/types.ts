export interface SitemapEntry {
  route: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
}

type SiteMapEntries = Array<SitemapEntry | null> | null;

export interface CapraHandle {
  scrollSmooth?: boolean;
  contactFormTitle?: string;
  contactFormDescription?: string;
  getSitemapEntries?: (
    request: Request,
  ) => Promise<SiteMapEntries> | SiteMapEntries;
}
