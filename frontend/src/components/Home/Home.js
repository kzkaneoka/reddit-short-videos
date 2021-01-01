import React, { useEffect } from "react";
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
      {videoList.length !== 0 ? (
        <VideoPlayer videoList={videoList} />
      ) : (
        <div>Loading video...</div>
      )}

      <Ratings />
    </div>
  );
}

export default Home;
