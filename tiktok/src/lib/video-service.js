import api from '../lib/api-config.js';

export const videoService = {
  // Get all videos (feed)
  getVideos: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('../videos', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },
  
  // Get video by ID
  getVideo: async (videoId) => {
    try {
      const response = await api.get(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Get videos by user
  getUserVideos: async (userId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users/${userId}/videos`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching videos for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Upload a new video
  uploadVideo: async (videoData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add video file
      formData.append('video', videoData.videoFile);
      
      // Add other video metadata
      if (videoData.caption) formData.append('caption', videoData.caption);
      if (videoData.hashtags) formData.append('hashtags', videoData.hashtags);
      
      const response = await api.post('/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  },
  
  // Update video metadata
  updateVideo: async (videoId, videoData) => {
    try {
      const response = await api.put(`/videos/${videoId}`, videoData);
      return response.data;
    } catch (error) {
      console.error(`Error updating video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Delete a video
  deleteVideo: async (videoId) => {
    try {
      const response = await api.delete(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Like a video
  likeVideo: async (videoId) => {
    try {
      const response = await api.post(`/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Unlike a video
  unlikeVideo: async (videoId) => {
    try {
      const response = await api.delete(`/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error unliking video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Search videos
  searchVideos: async (query, page = 1, limit = 10) => {
    try {
      const response = await api.get('/videos/search', {
        params: { q: query, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching videos for "${query}":`, error);
      throw error;
    }
  }
};