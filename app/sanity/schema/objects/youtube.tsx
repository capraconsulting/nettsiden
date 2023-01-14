import React from "react";
import { FaYoutube } from "react-icons/fa";
import YouTube from "react-youtube";

import { s } from "sanity-typed-schema-builder";

function getYouTubeId(url: string) {
  return url; // TODO;
}

export const youtube = s.objectNamed({
  name: "youtube",
  title: "YouTube Embed",
  icon: FaYoutube,
  fields: [
    {
      name: "url",
      type: s.url(),
      title: "YouTube video URL",
    },
  ],
  components: {
    preview(props) {
      const { url } = props;
      const id = getYouTubeId(url);
      return (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mb-24"
        >
          {" "}
          <YouTube videoId={id} />
        </div>
      );
    },
  },
  preview: {
    select: {
      url: "url",
    },
  },
});
