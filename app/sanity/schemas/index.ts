import author from "~/sanity/schemas/documents/author";
import blogg from "~/sanity/schemas/documents/blogg";
import bloggFilter from "~/sanity/schemas/documents/bloggFilter";
import category from "~/sanity/schemas/documents/category";
import fileAsset from "~/sanity/schemas/documents/fileAsset";
import imageAsset from "~/sanity/schemas/documents/imageAsset";
import jobCategory from "~/sanity/schemas/documents/jobCategory";
import richText from "~/sanity/schemas/documents/richText";
import selvskryt from "~/sanity/schemas/documents/selvskryt";
import selvskrytFilter from "~/sanity/schemas/documents/selvskrytFilter";
import blockContent from "~/sanity/schemas/objects/blockContent";
import factbox from "~/sanity/schemas/objects/factbox";
import mainImage from "~/sanity/schemas/objects/mainImage";
import richTextImage from "~/sanity/schemas/objects/richTextImage";
import services from "~/sanity/schemas/objects/services";
import youtube from "~/sanity/schemas/objects/youtube";

export default [
  // The following are document types which will appear
  // in the studio.
  author,
  blogg,
  bloggFilter,
  category,
  factbox,
  fileAsset,
  imageAsset,
  jobCategory,
  mainImage,
  selvskryt,
  selvskrytFilter,
  services,
  richText,
  richTextImage,
  youtube,
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  blockContent,
];
