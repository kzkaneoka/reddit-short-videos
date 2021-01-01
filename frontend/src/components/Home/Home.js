import React, { useState, useEffect } from "react";
import { Icon, IconButton, Spinner, Flex, Box } from "@chakra-ui/react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Ratings from "./Ratings/Ratings";
import useFetchVideos from "./useFetchVideos";

function Home() {
  const [{ videoList, isLoading, isError }, fetchVideo] = useFetchVideos();
  const [vidCount, setVidCount] = useState(0);

  useEffect(() => {
    fetchVideo("http://localhost:5000/videos");
  }, []);

  const prevVid = () => {
    setVidCount(vidCount - 1);
  };

  const nextVid = () => {
    setVidCount(vidCount + 1);
  };

  return (
    <div>
      <Flex justify="center" mx={3} minW="700px">
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowLeftCircle} boxSize={14} color="#535345" />}
          visibility={vidCount === 0 ? "hidden" : "visible"}
          onClick={prevVid}
        />

        {videoList.length !== 0 ? (
          <VideoPlayer videoList={videoList} count={vidCount} />
        ) : (
          <Spinner />
        )}

        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowRightCircle} boxSize={14} color="#535345" />}
          visibility={vidCount === videoList.length - 1 ? "hidden" : "visible"}
          onClick={nextVid}
        />
      </Flex>
      <Ratings />
    </div>
  );
}

export default Home;
