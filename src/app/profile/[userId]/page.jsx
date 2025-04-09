'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FaEdit, FaUserPlus, FaUserCheck, FaRegHeart, FaUpload } from 'react-icons/fa';
import { getUserById, followUser, unfollowUser, getUserFollowers, getUserFollowing, updateUser } from '../../../services/userService';
import { getUserVideos } from '../../../services/videoService';
import { useAuth } from '../../../contexts/authContext';
import toast from 'react-hot-toast';
import Link from 'next/link';
// import useIntersectionObserver from '@react-hook/intersection-observer';

export default function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [videos, setVideos] = useState([]);
  
  // Edit profile form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const userData = await getUserById(userId);
        setUser(userData);
        setName(userData.name || '');
        setBio(userData.bio || '');

        // Check if current user is following this profile
        if (isAuthenticated && currentUser) {
          const followersData = await getUserFollowers(userId);
          setFollowers(followersData.followers || []);
          setIsFollowing(followersData.followers?.some(f => f.id === currentUser.id) || false);
        }

        const followingData = await getUserFollowing(userId);
        setFollowing(followingData.following || []);
        
        // Fetch videos without pagination for now
        const videosData = await getUserVideos({ userId });
        setVideos(videosData.videos || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId, isAuthenticated, currentUser]);

  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to follow users');
      return;
    }

    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
        setFollowers(prev => prev.filter(f => f.id !== currentUser.id));
        toast.success('Unfollowed user');
      } else {
        await followUser(userId);
        setIsFollowing(true);
        setFollowers(prev => [...prev, currentUser]);
        toast.success('Following user');
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error('Failed to follow/unfollow user');
    }
  };
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      
      await updateUser(userId, formData);
      
      // Update the user state with new data
      setUser(prev => ({
        ...prev,
        name,
        bio,
        avatar: avatarPreview || prev.avatar
      }));
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const getFullVideoUrl = (url) => {
    if (!url) return null;
    
    if (url.startsWith('http')) return url;
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const serverUrl = baseUrl.includes('/api') 
      ? baseUrl.substring(0, baseUrl.indexOf('/api')) 
      : baseUrl;
    
    return `${serverUrl}${url}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p>User not found</p>
      </div>
    );
  }
  
  const isOwnProfile = isAuthenticated && currentUser?.id === parseInt(userId);

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Profile header */}
      <div className="flex items-start mb-8">
        {isEditing ? (
          <div className="h-24 w-24 rounded-full mr-6 overflow-hidden relative">
            <div 
              onClick={() => avatarInputRef.current?.click()}
              className="cursor-pointer h-full w-full flex items-center justify-center bg-gray-200"
            >
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Profile preview" 
                  className="h-full w-full object-cover" 
                />
              ) : user.avatar ? (
                <img 
                  src={getFullVideoUrl(user.avatar)} 
                  alt={user.username} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <FaUpload className="text-gray-500" />
              )}
              <input
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">Change</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full mr-6 overflow-hidden bg-gray-200">
            {user.avatar ? (
              <img 
                src={getFullVideoUrl(user.avatar)} 
                alt={user.username} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                {user.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-xl font-bold mb-2">@{user.username}</h1>
          
          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-lg mb-4">{user.name || user.username}</h2>
              
              {isOwnProfile ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-1.5 rounded-md border border-gray-300 font-medium flex items-center mr-3"
                >
                  <FaEdit className="mr-2" /> Edit profile
                </button>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-1.5 rounded-md font-medium flex items-center mr-3 ${
                    isFollowing 
                      ? 'border border-gray-300' 
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <FaUserCheck className="mr-2" /> Following
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" /> Follow
                    </>
                  )}
                </button>
              )}
              
              <div className="flex items-center mt-4 space-x-4">
                <p><span className="font-bold">{following.length}</span> Following</p>
                <p><span className="font-bold">{followers.length}</span> Followers</p>
                <p><span className="font-bold">{user.likeCount || 0}</span> Likes</p>
              </div>
              
              <p className="mt-4 text-sm max-w-md">
                {user.bio || "No bio yet."}
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Video tabs */}
      <div className="border-b">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'videos' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            Videos
          </button>
          <button 
            onClick={() => setActiveTab('liked')}
            className={`py-2 px-4 font-medium ${
              activeTab === 'liked' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            Liked
          </button>
        </div>
      </div>
      
      {/* Videos grid */}
      <div className="py-4">
        {activeTab === 'videos' ? (
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {videos.length > 0 ? (
              videos.map((video) => (
                <Link href={`/video/${video.id}`} key={video.id} className="aspect-[9/16] relative block">
                  <img
                    src={video.thumbnailUrl ? getFullVideoUrl(video.thumbnailUrl) : "https://via.placeholder.com/150"}
                    alt={video.caption}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center text-white">
                    <FaRegHeart className="mr-1" />
                    <span>{video.likeCount || 0}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-6 py-20 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-2">
                    {isOwnProfile ? "Upload your first video" : "No videos yet"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {isOwnProfile ? "Your videos will appear here" : `${user.username} hasn't uploaded any videos yet`}
                  </p>
                  {isOwnProfile && (
                    <Link href="/upload" className="bg-blue-500 text-white px-8 py-2 rounded-md font-medium inline-block">
                      Upload now
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">Liked videos are private</p>
          </div>
        )}
      </div>
    </div>
  );
}