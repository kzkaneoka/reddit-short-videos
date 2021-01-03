import React, { useState, useEffect } from "react";
import { AspectRatio, Spinner } from "@chakra-ui/react";

function VideoPlayer(props) {
  console.log(props.playlist);
  return (
    <div>
      <h1>
        #{props.count + 1}: {props.playlist[props.count].title}
      </h1>
      <AspectRatio minW="800px" ratio={16 / 9}>
        <video src={props.playlist[props.count].video_url} controls>
          Your browser does not support the video tag.
        </video>
      </AspectRatio>
    </div>
  );
}

export default VideoPlayer;
