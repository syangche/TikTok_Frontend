'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { videoService } from '@/lib/video-service';
import { useAuth } from '@/contexts/AuthContext';

export default function UploadPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuet, setAllowDuet] = useState(true);
  const [allowStitch, setAllowStitch] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page
    router.push('/login');
    return null;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file.');
      return;
    }
    
    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError('Video size should be less than 100MB.');
      return;
    }
    
    setVideoFile(file);
    setError(null);
    
    // Create video preview
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a video file.');
        return;
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Video size should be less than 100MB.');
        return;
      }
      
      setVideoFile(file);
      setError(null);
      
      // Create video preview
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!videoFile) {
      setError('Please select a video to upload.');
      return;
    }
    
    if (!caption) {
      setError('Please add a caption for your video.');
      return;
    }
    
    try {
      setIsUploading(true);
      setError(null);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
      
      // Process hashtags
      const hashtagArray = hashtags
        .split(/[,\s#]+/)
        .filter(tag => tag.trim())
        .map(tag => tag.trim())
        .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('caption', caption);
      
      if (hashtagArray.length > 0) {
        formData.append('hashtags', JSON.stringify(hashtagArray));
      }
      
      formData.append('privacy', privacy);
      formData.append('allowComments', allowComments);
      formData.append('allowDuet', allowDuet);
      formData.append('allowStitch', allowStitch);
      
      // Upload video
      await videoService.uploadVideo(formData);
      
      // Complete the progress bar
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Show success for a moment
      setTimeout(() => {
        alert('Video uploaded successfully!');
        router.push('/profile'); // Redirect to profile page after upload
      }, 1000);
      
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video. Please try again.');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload video</h1>
      
      <div className="flex flex-col md:flex-row">
        <div 
          className="w-full md:w-[360px] border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center mb-6 md:mb-0"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="w-full">
              <div className="mb-2 text-center">Uploading... {uploadProgress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : videoPreview ? (
            <div className="w-full">
              <video 
                src={videoPreview} 
                className="w-full h-[300px] object-contain mb-4 bg-black" 
                controls
              />
              <button 
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview('');
                }}
                className="text-red-500 hover:text-red-700"
              >
                Remove video
              </button>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <span className="text-4xl text-gray-400">+</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Select video to upload</h3>
              <p className="text-sm text-gray-500 mb-4">Or drag and drop a file</p>
              <p className="text-xs text-gray-400 mb-4">MP4 or WebM</p>
              <p className="text-xs text-gray-400 mb-4">720x1280 resolution or higher</p>
              <p className="text-xs text-gray-400">Up to 10 minutes</p>
              <p className="text-xs text-gray-400">Less than 100 MB</p>
              <label className="mt-8 bg-red-500 text-white py-2 px-8 rounded-md cursor-pointer">
                Select file
                <input 
                  type="file" 
                  accept="video/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}
        </div>
        
        <div className="flex-1 md:ml-6">
          <form onSubmit={handleUpload}>
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-500 rounded">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Caption</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="Add a caption..." 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={150}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {caption.length}/150
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Hashtags</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md" 
                placeholder="#funny #trending" 
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate hashtags with spaces or commas
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Who can view this video</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Allow users to:</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="comments" 
                    className="mr-2"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)} 
                  />
                  <label htmlFor="comments">Comment</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="duet" 
                    className="mr-2"
                    checked={allowDuet}
                    onChange={(e) => setAllowDuet(e.target.checked)} 
                  />
                  <label htmlFor="duet">Duet</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="stitch" 
                    className="mr-2"
                    checked={allowStitch}
                    onChange={(e) => setAllowStitch(e.target.checked)} 
                  />
                  <label htmlFor="stitch">Stitch</label>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button 
                type="button" 
                className="px-6 py-2 border rounded-md"
                onClick={() => router.back()}
                disabled={isUploading}
              >
                Discard
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-red-500 text-white rounded-md"
                disabled={isUploading || !videoFile}
              >
                {isUploading ? 'Uploading...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}