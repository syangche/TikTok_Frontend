'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaHeart, FaRegHeart, FaComment, 
  FaShare, FaMusic, FaVolumeMute, FaVolumeUp 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/authContext';
import { videoService } from '../../lib/video-service';
import { commentService } from '../../lib/comment-service';

export default function VideoCard({ video }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const [liked, setLiked] = useState(video.isLiked || false);
  const [likeCount, setLikeCount] = useState(video.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  
  // Handle video visibility and autoplay
  useEffect(() => {
    if (!videoRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If video is more than 50% visible, play it
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (videoRef.current) {
            videoRef.current.play()
              .catch(err => console.error('Error playing video:', err));
            setIsPlaying(true);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: [0.5] }
    );
    
    observer.observe(videoRef.current);
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .catch(err => console.error('Error playing video:', err));
      setIsPlaying(true);
    }
  };
  
  const handleVolumeToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };
  
  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    
    try {
      if (liked) {
        await videoService.unlikeVideo(video._id);
        setLikeCount(prev => prev - 1);
      } else {
        await videoService.likeVideo(video._id);
        setLikeCount(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like/unlike video. Please try again.');
    }
  };

  const handleCommentClick = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    
    if (!showComments) {
      setIsLoadingComments(true);
      try {
        const response = await commentService.getComments(video._id);
        setComments(response.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !isAuthenticated) return;
    
    setIsLoadingComments(true);
    try {
      const newComment = await commentService.addComment(video._id, commentText);
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  return (
    <div className="flex py-6 border-b">
      {/* User avatar */}
      <div className="mr-3">
        <Link href={`/profile/${video.user._id}`}>
          <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
            {video.user.avatar ? (
              <img 
                src={video.user.avatar} 
                alt={video.user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-red-500 text-white">
                {video.user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>
      </div>
      
      <div className="flex-1">
        {/* User info and caption */}
        <div className="mb-2">
          <Link href={`/profile/${video.user._id}`}>
            <span className="font-bold hover:underline cursor-pointer">@{video.user.username}</span>
          </Link>
          <span className="text-sm ml-1">• {new Date(video.createdAt).toLocaleDateString()}</span>
          <p className="text-sm mt-1">{video.caption}</p>
          
          {video.hashtags && video.hashtags.length > 0 && (
            <p className="text-sm text-blue-500">
              {video.hashtags.map(tag => `#${tag} `)}
            </p>
          )}
        </div>
        
        {/* Audio info */}
        <div className="flex items-center text-sm mb-3">
          <FaMusic className="mr-2 text-xs" />
          <span className="truncate max-w-[250px]">
            {video.audio || `Original sound - ${video.user.username}`}
          </span>
        </div>
        
        <div className="flex">
          {/* Video container */}
          <div className="mr-5 w-[300px] h-[530px] bg-black rounded-md relative overflow-hidden">
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              onClick={handleVideoClick}
            />
            
            {/* Play/pause overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <div className="w-16 h-16 rounded-full bg-gray-200 bg-opacity-50 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            )}
            
            {/* Volume control */}
            <button 
              className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-gray-800 bg-opacity-50"
              onClick={handleVolumeToggle}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
          
          {/* Interaction buttons */}
          <div className="flex flex-col justify-end space-y-3 py-2">
            {/* Like button */}
            <button 
              className="flex flex-col items-center"
              onClick={handleLikeClick}
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                {liked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              <span className="text-xs mt-1">{likeCount}</span>
            </button>
            
            {/* Comment button */}
            <button 
              className="flex flex-col items-center"
              onClick={handleCommentClick}
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaComment />
              </div>
              <span className="text-xs mt-1">{video.commentCount || 0}</span>
            </button>
            
            {/* Share button */}
            <button className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaShare />
              </div>
              <span className="text-xs mt-1">{video.shareCount || 0}</span>
            </button>
          </div>
        </div>
        
        {/* Comments section */}
        {showComments && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Comments</h3>
            
            {/* Comment form */}
            {isAuthenticated && (
              <form onSubmit={handleAddComment} className="mb-4 flex">
                <input 
                  type="text"
                  className="flex-1 border rounded-l-md px-3 py-1.5"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isLoadingComments}
                />
                <button 
                  type="submit"
                  className="bg-red-500 text-white px-4 py-1.5 rounded-r-md"
                  disabled={isLoadingComments || !commentText.trim()}
                >
                  Post
                </button>
              </form>
            )}
            
            {/* Comments list */}
            {isLoadingComments ? (
              <div className="text-center py-4">
                <div className="animate-spin inline-block h-6 w-6 border-b-2 border-red-500 rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex space-x-2 group">
                      <Link href={`/profile/${comment.user._id}`}>
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                          {comment.user.avatar ? (
                            <img 
                              src={comment.user.avatar} 
                              alt={comment.user.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-red-500 text-white">
                              {comment.user.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Link href={`/profile/${comment.user._id}`}>
                            <span className="text-sm font-semibold">@{comment.user.username}</span>
                          </Link>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          {(isAuthenticated && (user._id === comment.user._id || user._id === video.user._id)) && (
                            <button 
                              className="ml-auto text-xs text-gray-500 opacity-0 group-hover:opacity-100"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                )}
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="text-center py-2 border-t mt-2">
                <Link href="/login">
                  <span className="text-red-500 text-sm hover:underline">
                    Log in to comment
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}