'use client';
import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import Loading from '../../components/ui/Loading';
import { videoService } from '../../lib/video-service';

export default function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [page]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videoService.getVideos(page, 5);
      
      setVideos(prev => {
        // If it's the first page, replace videos; otherwise append
        return page === 1 ? response.videos : [...prev, ...response.videos];
      });
      
      // Check if there are more videos to load
      setHasMore(response.hasMore || false);
      setError(null);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (loading && videos.length === 0) {
    return <Loading />;
  }

  if (error && videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 my-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-[550px] mx-auto">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
      
      {loading && videos.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-red-500"></div>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="text-center py-4">
          <button 
            onClick={handleLoadMore}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Load More
          </button>
        </div>
      )}
      
      {!hasMore && videos.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No more videos to load
        </div>
      )}
      
      {videos.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No videos found</p>
        </div>
      )}
    </div>
  );
}