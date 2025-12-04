"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isTokenExpired } = useApp();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || isTokenExpired()) {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="inline-block">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children (will redirect)
  if (!isAuthenticated || isTokenExpired()) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}