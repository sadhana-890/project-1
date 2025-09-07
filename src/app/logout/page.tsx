"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call your logout API
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Clear any local storage or session data if needed
          localStorage.removeItem('token'); // adjust based on your auth implementation
          sessionStorage.clear(); // clear session storage as well
          
          // Redirect to login page
          router.push('/login');
        } else {
          console.error('Logout failed');
          // Still redirect even if logout API fails
          localStorage.removeItem('token');
          sessionStorage.clear();
          router.push('/login');
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Clear storage and redirect to login even on error
        localStorage.removeItem('token');
        sessionStorage.clear();
        router.push('/login');
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Logging you out...</p>
        <p className="text-gray-400 text-xs mt-2">Please wait</p>
      </div>
    </div>
  );
}