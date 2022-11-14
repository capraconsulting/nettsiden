// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

import author from "./documents/author";
import blogg from "./documents/blogg";
import bloggFilter from "./documents/bloggFilter";
import category from "./documents/category";
import fileAsset from "./documents/fileAsset";
import imageAsset from "./documents/imageAsset";
import jobCategory from "./documents/jobCategory";
import richText from "./documents/richText";
import selvskryt from "./documents/selvskryt";
import selvskrytFilter from "./documents/selvskrytFilter";
// We import object and document schemas
import blockContent from "./objects/blockContent";
import factbox from "./objects/factbox";
import mainImage from "./objects/mainImage";
import richTextImage from "./objects/richTextImage";
import services from "./objects/services";
import youtube from "./objects/youtube";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
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
  ]),
});
