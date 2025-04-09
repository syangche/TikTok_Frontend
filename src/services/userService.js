import apiClient from '../lib/axios';

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    let config = {};
    
    // If userData is FormData, set the right headers
    if (userData instanceof FormData) {
      config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    }
    
    const response = await apiClient.put(`/users/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const followUser = async (userId) => {
  try {
    const response = await apiClient.post(`/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error(`Error following user ${userId}:`, error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error(`Error unfollowing user ${userId}:`, error);
    throw error;
  }
};

export const getUserFollowers = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching followers for user ${userId}:`, error);
    throw error;
  }
};

export const getUserFollowing = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/following`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching following for user ${userId}:`, error);
    throw error;
  }
};

export const getUserVideos = async (userId) => {
  try {
    const id = typeof userId === 'object' ? userId.userId : userId;
    
    const response = await apiClient.get(`/users/${id}/videos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for user ${userId}:`, error);
    
    return { videos: [] };
  }
};