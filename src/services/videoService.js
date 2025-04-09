import apiClient from '../lib/axios';


export const getVideos = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/videos?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Other functions can stay the same

export const getVideoById = async (id) => {
  try {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    throw error;
  }
};

export const getUserVideos = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/videos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for user ${userId}:`, error);
    throw error;
  }
};

export const getFollowingVideos = async () => {
  try {
    const response = await apiClient.get('/videos/following');
    return response.data;
  } catch (error) {
    console.error('Error fetching following videos:', error);
    throw error;
  }
};

export const likeVideo = async (videoId) => {
  try {
    const response = await apiClient.post(`/videos/${videoId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error liking video ${videoId}:`, error);
    throw error;
  }
};

export const unlikeVideo = async (videoId) => {
  try {
    const response = await apiClient.delete(`/videos/${videoId}/like`);
    return response.data;
  } catch (error) {
    console.error(`Error unliking video ${videoId}:`, error);
    throw error;
  }
};

export const addComment = async (videoId, content) => {
  try {
    const response = await apiClient.post(`/comments`, {
      videoId,
      content
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to video ${videoId}:`, error);
    throw error;
  }
};

export const getVideoComments = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for video ${videoId}:`, error);
    throw error;
  }
};