import { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";
import { getAllVideos } from "../api/video";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getAllVideos();
        setVideos(res.data.data); // adjust if your backend structure differs
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-6">
      <VideoGrid videos={videos} />
    </div>
  );
};

export default Home;
