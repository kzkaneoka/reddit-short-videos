import React, { useState, useEffect } from "react";
import { AspectRatio, Spinner } from "@chakra-ui/react";

function VideoPlayer(props) {
  console.log(props);
  // props.cantChange(false);
  return (
    <div>
      <h1>
        #{props.count + 1}: {props.videoList[props.count].title}
      </h1>
      <AspectRatio minW="650px" ratio={16 / 9}>
        <iframe
          title={props.videoList[props.count].title}
          src={props.videoList[props.count].video_url}
          allowFullScreen
        />
      </AspectRatio>
    </div>
  );
}

export default VideoPlayer;
