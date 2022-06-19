import S from "@sanity/desk-tool/structure-builder";

const hiddenDocTypes = (listItem) =>
  !["category", "author", "post"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Ansatte")
        .schemaType("author")
        .child(
          S.documentTypeList("author")
            .title("Ansatte")
            .filter("employee == true"),
        ),
      S.listItem()
        .title("Ikke ansatte")
        .schemaType("author")
        .child(
          S.documentTypeList("author")
            .title("Ikke ansatte")
            .filter("employee == false"),
        ),
      S.listItem()
        .title("Alle personer")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Personer")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
