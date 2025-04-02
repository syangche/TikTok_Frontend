import api from '../lib/api-config.js';

export const commentService = {
  // Get comments for a video
  getComments: async (videoId, page = 1, limit = 20) => {
    try {
      const response = await api.get(`/videos/${videoId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Add a comment to a video
  addComment: async (videoId, content) => {
    try {
      const response = await api.post(`/videos/${videoId}/comments`, { content });
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to video ${videoId}:`, error);
      throw error;
    }
  },
  
  // Update a comment
  updateComment: async (commentId, content) => {
    try {
      const response = await api.put(`/comments/${commentId}`, { content });
      return response.data;
    } catch (error) {
      console.error(`Error updating comment ${commentId}:`, error);
      throw error;
    }
  },
  
  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment ${commentId}:`, error);
      throw error;
    }
  },
  
  // Like a comment
  likeComment: async (commentId) => {
    try {
      const response = await api.post(`/comments/${commentId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error liking comment ${commentId}:`, error);
      throw error;
    }
  },
  
  // Unlike a comment
  unlikeComment: async (commentId) => {
    try {
      const response = await api.delete(`/comments/${commentId}/like`);
      return response.data;
    } catch (error) {
      console.error(`Error unliking comment ${commentId}:`, error);
      throw error;
    }
  }
};