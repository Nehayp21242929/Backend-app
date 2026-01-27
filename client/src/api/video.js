import API from "./auth"; // reuse your axios instance

// Upload video
export const uploadVideo = (formData) => {
  return API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get all published videos (home/watch page)
export const getAllVideos = () => {
  return API.get("/videos/");
};

// Get single video
export const getVideoById = (videoId) => {
  return API.get(`/videos/playvideo/${videoId}`);
};

// Get all videos of a channel
export const getChannelVideos = (userId) => {
  return API.get(`/videos/gallery/${userId}`);
};
