import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

function VideoPlayer({ url }) {
  const { videoId } = useParams();
 
  return (
    <ReactPlayer
      url="https://cdn.pixabay.com/video/2024/12/03/244754_large.mp4"
      pip={true}
      playing={true}
      stopOnUnmount={false}
      height="100%"
      width="100%"
      controls={true}
      volume={8}
      className="absolute top-0 left-0 object-cover object-center "
    />
  );
}

export default VideoPlayer;
