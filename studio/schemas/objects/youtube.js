import React from "react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import { FaYoutube } from "react-icons/fa";

const Preview = ({ value }) => {
  const { url } = value;
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
};

export default {
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: FaYoutube,
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: Preview,
  },
};
