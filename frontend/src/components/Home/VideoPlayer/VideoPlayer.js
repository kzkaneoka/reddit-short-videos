import React, { useState, useEffect } from "react";
import { AspectRatio, Spinner } from "@chakra-ui/react";

function VideoPlayer(props) {
  // props.cantChange(false);
  console.log(props.playlist);
  return (
    <div>
      <h1>
        #{props.count + 1}: {props.playlist[props.count].title}
      </h1>
      <AspectRatio minW="650px" ratio={16 / 9}>
        <iframe
          title={props.playlist[props.count].title}
          src={props.playlist[props.count].video_url}
          allowFullScreen
        />
      </AspectRatio>
    </div>
  );
}

export default VideoPlayer;
