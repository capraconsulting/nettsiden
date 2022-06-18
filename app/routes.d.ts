declare module "routes-gen" {
  export type RouteParams = {
    "/dette-kan-vi/it-konsulenter": {};
    "/dette-har-vi-gjort/:slug": { slug: string };
    "/dette-har-vi-gjort": {};
    "/personvernerklaering": {};
    "/dette-kan-vi/liflig": {};
    "/informasjonskapsler": {};
    "/dette-kan-vi": {};
    "/test/hello-sanity": {};
    "/test/kitchen-sink": {};
    "/bli-en-av-oss": {};
    "/blogg/:slug": { slug: string };
    "/blogg": {};
    "/partnere": {};
    "/ansatte": {};
    "/mentor": {};
    "/om-oss": {};
    "/": {};
  };

  export function route<
    T extends
      | ["/dette-kan-vi/it-konsulenter"]
      | ["/dette-har-vi-gjort/:slug", RouteParams["/dette-har-vi-gjort/:slug"]]
      | ["/dette-har-vi-gjort"]
      | ["/personvernerklaering"]
      | ["/dette-kan-vi/liflig"]
      | ["/informasjonskapsler"]
      | ["/dette-kan-vi"]
      | ["/test/hello-sanity"]
      | ["/test/kitchen-sink"]
      | ["/bli-en-av-oss"]
      | ["/blogg/:slug", RouteParams["/blogg/:slug"]]
      | ["/blogg"]
      | ["/partnere"]
      | ["/ansatte"]
      | ["/mentor"]
      | ["/om-oss"]
      | ["/"],
  >(...args: T): typeof args[0];
}
