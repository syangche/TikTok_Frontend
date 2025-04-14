"use client";

import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import { getVideos, getFollowingVideos } from '../../services/videoService';
import toast from 'react-hot-toast';

const VideoFeed = ({ feedType = 'forYou' }) => { // Add default value
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      let response;
      
      // Use different API endpoints based on feed type
      if (feedType === 'following') {
        response = await getFollowingVideos();
      } else {
        response = await getVideos();
      }
      
      setVideos(response.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos. Please try again later.');
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [feedType]); 
// const VideoFeed = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchVideos();
  // }, []);

  // const fetchVideos = async () => {
  //   try {
  //     setLoading(true);
  //     const data = await getVideos();
  //     setVideos(data.videos || []);
  //   } catch (error) {
  //     console.error('Error fetching videos:', error);
  //     setError('Failed to load videos. Please try again later.');
  //     toast.error('Failed to load videos');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchVideos}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No videos found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;




