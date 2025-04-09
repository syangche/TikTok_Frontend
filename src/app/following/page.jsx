'use client';

import { useEffect } from 'react';
import VideoFeed from '../../components/ui/VideoFeed';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function FollowingPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Please log in to view your following feed');
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Following Feed</h1>
      <VideoFeed feedType="following" />
    </main>
  );
}