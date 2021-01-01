import React, { useEffect } from "react";
import { Icon, IconButton, Center, Flex, Box } from "@chakra-ui/react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Ratings from "./Ratings/Ratings";
import useFetchVideos from "./useFetchVideos";

function Home() {
  const [{ videoList, isLoading, isError }, fetchVideo] = useFetchVideos();

  useEffect(() => {
    fetchVideo("http://localhost:5000/videos");
  }, []);

  return (
    <div>
      <Flex justify="center" mx={3} minW="700px">
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowLeftCircle} boxSize={14} color="#535345" />}
        />

        {videoList.length !== 0 ? (
          <VideoPlayer videoList={videoList} />
        ) : (
          <div>Loading video...</div>
        )}

        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowRightCircle} boxSize={14} color="#535345" />}
        />
      </Flex>
      {/* Maybe this component should go inside videoPlayer */}
      <Ratings />
    </div>
  );
}

export default Home;
