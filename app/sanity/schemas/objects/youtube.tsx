import React from "react";
import { FaYoutube } from "react-icons/fa";
import YouTube from "react-youtube";

import { defineField, defineType } from "sanity";

function getYouTubeId(url: string) {
  return url; // TODO;
}

export default defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: FaYoutube,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube video URL",
    }),
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    preview(props) {
      console.log(props);
      // FIXME
      // @ts-expect-error
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
});
