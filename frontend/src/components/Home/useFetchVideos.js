import { useState, useEffect } from "react";
import axios from "axios";

const useFetchVideos = () => {
  const [url, setUrl] = useState("http://localhost:5000/videos");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setVideoList(result.data);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ videoList, isLoading, isError }, setUrl];
};

export default useFetchVideos;
