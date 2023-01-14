import type { s } from "sanity-typed-schema-builder";

import { author } from "~/sanity/schema/documents/author";
import { blogg } from "~/sanity/schema/documents/blogg";
import { bloggfilter } from "~/sanity/schema/documents/bloggfilter";
import { category } from "~/sanity/schema/documents/category";
import { fileAsset } from "~/sanity/schema/documents/fileAsset";
import { imageAsset } from "~/sanity/schema/documents/imageAsset";
import { jobCategory } from "~/sanity/schema/documents/jobCategory";
import { richText } from "~/sanity/schema/documents/richText";
import { selvskryt } from "~/sanity/schema/documents/selvskryt";
import { selvskrytfilter } from "~/sanity/schema/documents/selvskrytfilter";
import { blockContent } from "~/sanity/schema/objects/blockContent";
import { factbox } from "~/sanity/schema/objects/factbox";
import { mainImage } from "~/sanity/schema/objects/mainImage";
import { richTextImage } from "~/sanity/schema/objects/richTextImage";
import { services } from "~/sanity/schema/objects/services";
import { youtube } from "~/sanity/schema/objects/youtube";

export type Author = s.infer<typeof author>;

export type Blogg = s.infer<typeof blogg>;

export type Bloggfilter = s.infer<typeof bloggfilter>;

export type Category = s.infer<typeof category>;

export type Factbox = s.infer<typeof factbox>;

export type FileAsset = s.infer<typeof fileAsset>;

export type ImageAsset = s.infer<typeof imageAsset>;

export type JobCategory = s.infer<typeof jobCategory>;

export type Selvskryt = s.input<typeof selvskryt>;

export type Selvskrytfilter = s.infer<typeof selvskrytfilter>;

export type Services = s.infer<typeof services>;

export type MainImage = s.infer<typeof mainImage>;

export type RichText = s.infer<typeof richText>;

export type RichTextImage = s.infer<typeof richTextImage>;

export type Youtube = s.infer<typeof youtube>;

export type BlockContent = s.infer<typeof blockContent>;

export type Documents =
  | Author
  | Blogg
  | Bloggfilter
  | Category
  | Factbox
  | FileAsset
  | ImageAsset
  | JobCategory
  | Selvskryt
  | Selvskrytfilter
  | Services;

export default [
  author.schema(),
  blogg.schema(),
  bloggfilter.schema(),
  category.schema(),
  factbox.schema(),
  fileAsset.schema(),
  imageAsset.schema(),
  jobCategory.schema(),
  mainImage.schema(),
  selvskryt.schema(),
  selvskrytfilter.schema(),
  services.schema(),
  richText.schema(),
  richTextImage.schema(),
  youtube.schema(),
  blockContent.schema(),
];
