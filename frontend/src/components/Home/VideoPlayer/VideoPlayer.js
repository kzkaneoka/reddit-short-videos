import React, { useState, useEffect } from "react";
import { AspectRatio, Spinner } from "@chakra-ui/react";

function VideoPlayer(props) {
  console.log(props);
  return (
    <div>
      <AspectRatio ratio={16 / 9}>
        <iframe
          title={props.videoList[0].title}
          src={props.videoList[0].video_url}
          allowFullScreen
        />
      </AspectRatio>
    </div>
  );
}

export default VideoPlayer;
