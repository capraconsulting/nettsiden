export default {
  widgets: [
    { name: "structure-menu" },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent selvskryt posts",
        query:
          '*[_type == "selvskryt" && !(_id match "drafts.*")] | order(_createdAt desc) [0...10]',
      },
      layout: { width: "small" },
    },
    {
      name: "document-list",
      options: {
        title: "Unpublished pages",
        query:
          '*[_type in $types && _id match "drafts.*"] | order(title asc) [0...10]',
        queryParams: {
          types: ["selvskryt", "blogg"],
        },
      },
      layout: { width: "small" },
    },
    {
      name: "netlify",
      layout: { width: "medium" },
      options: {
        title: "Capraconsulting.no",
        sites: [
          {
            title: "Capra Consulting Homepage",
            apiId: "4d7f1767-1ab1-405d-b633-6804f31a93d0",
            buildHookId: "5e54e8fc13f835855d833988",
          },
        ],
      },
    },
  ],
};
