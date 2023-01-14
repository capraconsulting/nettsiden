import type { StructureResolver } from "sanity/desk";
import type { ListItemBuilder } from "sanity/desk";

function hiddenDocTypes(listItem: ListItemBuilder) {
  const id = listItem.getId();
  return !id || !["category", "author", "post"].includes(id);
}

export const structure: StructureResolver = (S) =>
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
