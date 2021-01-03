import React, { useState, useEffect, useRef } from "react";
import { Icon, IconButton, Spinner, Flex, Box } from "@chakra-ui/react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import Filter from "./Filter/Filter";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import Ratings from "./Ratings/Ratings";
import useFetchVideos from "./useFetchVideos";

function Home() {
  const [{ videoList, isLoading, isError }, fetchVideo] = useFetchVideos();
  const [vidCount, setVidCount] = useState(0);
  const [filterList, setFilterList] = useState([]);
  const [playlist, setPlaylist] = useState(videoList);

  useEffect(() => {
    fetchVideo("http://localhost:5000/videos");
  }, []);

  const handlePrevVidClick = () => {
    if (vidCount > 0) {
      setVidCount(vidCount - 1);
    }
  };

  const handleNextVidClick = () => {
    if (vidCount < playlist.length - 1) {
      setVidCount(vidCount + 1);
    }
  };

  useEffect(() => {
    if (filterList.length === 0) {
      setPlaylist(videoList);
    } else {
      setPlaylist(
        videoList.filter((vid) => {
          return filterList.includes(vid.subreddit_id);
        })
      );
      setVidCount(0);
    }
  }, [videoList, filterList]);

  return (
    <div>
      <Filter videoList={videoList} setFilterList={setFilterList} />
      <Flex justify="center" align="center" mx={3} minW="700px">
        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowLeftCircle} boxSize={14} color="#535345" />}
          visibility={vidCount === 0 ? "hidden" : "visible"}
          onClick={handlePrevVidClick}
          mx={3}
        />

        {playlist.length !== 0 ? (
          <VideoPlayer
            playlist={playlist}
            count={vidCount}
            filterList={filterList}
          />
        ) : (
          <Spinner />
        )}

        <IconButton
          bg="transparent"
          size={14}
          aria-label="Skip rating video"
          icon={<Icon as={FiArrowRightCircle} boxSize={14} color="#535345" />}
          visibility={vidCount === playlist.length - 1 ? "hidden" : "visible"}
          onClick={handleNextVidClick}
          mx={3}
        />
      </Flex>
      <Ratings />
    </div>
  );
}

export default Home;
