import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Forfatter
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Navn — `string`
   *
   *
   */
  name?: string;

  /**
   * Stilling — `string`
   *
   * Hvilken stilling har personen
   */
  jobTitle?: string;

  /**
   * Jobbkategori — `array`
   *
   * Hvilken kategori/avdeling er personen i (kun relevant for ansatte i Capra)? Salg, Marked..etc
   */
  filter?: Array<SanityKeyedReference<JobCategory>>;

  /**
   * Er personen ansatt i Capra? — `boolean`
   *
   * Hvis denne blir huket av, så vil personen dukke opp i listen over ansatte
   */
  employee?: boolean;

  /**
   * Telefon — `string`
   *
   *
   */
  phone?: string;

  /**
   * E-post — `string`
   *
   *
   */
  email?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Bilde — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Komponent plassering — `array`
   *
   * Plasser person i følgende komponenter.
   */
  placement?: Array<SanityKeyed<string>>;

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>;

  /**
   * LinkedIn — `url`
   *
   *
   */
  linkedIn?: string;

  /**
   * Twitter — `url`
   *
   *
   */
  twitter?: string;

  /**
   * GitHub — `url`
   *
   *
   */
  github?: string;

  /**
   * Hjemmeside — `url`
   *
   *
   */
  website?: string;
}

/**
 * Blogg
 *
 *
 */
export interface Blogg extends SanityDocument {
  _type: "blogg";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   * Brukes til å generere URL for artikkelen under `capraconsulting.no/blogg/[slug]`
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Forfatter — `array`
   *
   * Legg inn en eller flere forfattere
   */
  authors?: Array<SanityKeyedReference<Author>>;

  /**
   * Hovedbildet — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Alt tekst — `blockContent`
   *
   * Alt tekst til hovedbildet
   */
  mainImageAlt?: BlockContent;

  /**
   * Kategorier — `array`
   *
   *
   */
  filter?: Array<SanityKeyedReference<Bloggfilter>>;

  /**
   * Publisert — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * SEO: Title i HEAD — `string`
   *
   *
   */
  helmetTitle?: string;

  /**
   * SEO: Meta description in HEAD — `string`
   *
   *
   */
  helmetDescription?: string;

  /**
   * Long title — `string`
   *
   * Used as title in article
   */
  titleLong?: string;

  /**
   * Ingress — `blockContent`
   *
   *
   */
  ingress?: BlockContent;

  /**
   * Body — `richText`
   *
   *
   */
  body?: RichText;

  /**
   * Faktabokser — `array`
   *
   *
   */
  factboxes?: Array<SanityKeyedReference<Factbox>>;
}

/**
 * Blogg filter
 *
 *
 */
export interface Bloggfilter extends SanityDocument {
  _type: "bloggfilter";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;
}

/**
 * Kategori
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Beskrivelse — `text`
   *
   *
   */
  description?: string;
}

/**
 * Faktaboks
 *
 *
 */
export interface Factbox extends SanityDocument {
  _type: "factbox";

  /**
   * Navn i venstrekolonne her inne — `string`
   *
   * Brukes aldri utenfor Sanity studio
   */
  title?: string;

  /**
   * Overskrift — `string`
   *
   *
   */
  titleLong?: string;

  /**
   * Beskrivelse — `text`
   *
   *
   */
  description?: string;

  /**
   * Tjenester fra — `string`
   *
   *
   */
  servicesName?: string;

  /**
   * Tjenester fra (url) — `url`
   *
   *
   */
  servicesUrl?: string;

  /**
   * Tjenesteliste — `array`
   *
   *
   */
  servicesList?: Array<SanityKeyedReference<Services>>;
}

/**
 * Bilderessurser
 *
 *
 */
export interface ImageAsset extends SanityDocument {
  _type: "imageAsset";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Asset — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Alt tekst — `string`
   *
   * Alt tekst
   */
  imageAlt?: string;

  /**
   * Image description — `string`
   *
   *
   */
  description?: string;
}

/**
 * Teams og stillinger
 *
 *
 */
export interface JobCategory extends SanityDocument {
  _type: "jobCategory";

  /**
   * Navn — `string`
   *
   *
   */
  title?: string;

  /**
   * Formål — `text`
   *
   *
   */
  purpose?: string;

  /**
   * Synlig i orgnisasjonskart? — `boolean`
   *
   *
   */
  visibleInOrgChart?: boolean;
}

/**
 * Selvskryt
 *
 *
 */
export interface Selvskryt extends SanityDocument {
  _type: "selvskryt";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Kategorier — `array`
   *
   *
   */
  filter?: Array<SanityKeyedReference<Selvskrytfilter>>;

  /**
   * Slug — `slug`
   *
   * Brukes til å generere URL for artikkelen under `capraconsulting.no/selvskryt/[slug]`
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Forfatter — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Hovedbilde — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Alt tekst — `string`
   *
   * Alt tekst til hovedbildet
   */
  mainImageAlt?: string;

  /**
   * Kategori — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Publisert — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Lang tittel — `string`
   *
   * Brukt som tittel i artikkel
   */
  titleLong?: string;

  /**
   * Ingress — `blockContent`
   *
   *
   */
  ingress?: BlockContent;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;

  /**
   * Faktabokser — `array`
   *
   *
   */
  factboxes?: Array<SanityKeyedReference<Factbox>>;

  /**
   * SEO: Tittel i HEAD — `string`
   *
   *
   */
  helmetTitle?: string;

  /**
   * SEO: Description i HEAD — `string`
   *
   *
   */
  helmetDescription?: string;
}

/**
 * Selvskryt filter
 *
 *
 */
export interface Selvskrytfilter extends SanityDocument {
  _type: "selvskrytfilter";

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;
}

/**
 * Tjenester
 *
 *
 */
export interface Services extends SanityDocument {
  _type: "services";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   * Brukes pt ikke, men er tenkt som supplerende info
   */
  description?: string;
}

export type MainImage = {
  _type: "mainImage";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption — `string`
   *
   *
   */
  caption?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type RichText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<RichTextImage>
  | SanityKeyed<Code>
  | SanityKeyed<Youtube>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type RichTextImage = {
  _type: "richTextImage";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Caption text — `string`
   *
   *
   */
  caption?: string;

  /**
       * Alternative text — `text`
       *
       * Some of your visitors cannot see images,
            be they blind, color-blind, low-sighted;
            alternative text is of great help for those
            people that can rely on it to have a good idea of
            what's on your page.
       */
  alt?: string;
};

export type Youtube = {
  _type: "youtube";
  /**
   * YouTube video URL — `url`
   *
   *
   */
  url?: string;
};

export type BlockContent = Array<
  SanityKeyed<SanityBlock> | SanityKeyed<MainImage>
>;

export type Documents =
  | Author
  | Blogg
  | Bloggfilter
  | Category
  | Factbox
  | ImageAsset
  | JobCategory
  | Selvskryt
  | Selvskrytfilter
  | Services;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Code = any;
