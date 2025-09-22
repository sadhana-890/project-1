"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/app/header/page';
import Footer from '@/app/footer/page';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { useUpdateProfileMutation } from '@/services/userApi';

const ProfilePictureSelector = () => {
  const avatars = [
    '/avatars/avatar1.svg',
    '/avatars/avatar2.svg', 
    '/avatars/avatar3.svg',
    '/avatars/avatar4.svg',
    '/avatars/avatar5.svg',
    '/avatars/avatar6.svg'
  ];

  const router = useRouter();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  


  const handlePrevious = () => {
    setCurrentAvatarIndex((prev) => 
      prev === 0 ? avatars.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentAvatarIndex((prev) => 
      prev === avatars.length - 1 ? 0 : prev + 1
    );
  };

  const handleSelect = async () => {
    const selectedAvatar = avatars[currentAvatarIndex];
    
    // Check localStorage for token (since userApi uses localStorage)
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      alert('Please log in first');
      return;
    }
    
    
    try {
      // Create FormData for userApi
      const formData = new FormData();
      formData.append('profilePicture', selectedAvatar);
      
      const result = await updateProfile(formData).unwrap();
      router.push('./leaderboard');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error && (error as { status: number }).status === 401) {
        alert('Authentication failed - please log in again');
      } else {
        alert('Update failed - please try again');
      }
    }
  };

  const handleSkip = () => {
    router.push('./leaderboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-sm text-center">

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 font-inter">
            Select Profile Picture
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            Choose your profile picture
          </p>
          
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="rounded-full overflow-hidden">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatars[currentAvatarIndex]} alt={`Avatar option ${currentAvatarIndex + 1}`} />
                  <AvatarFallback>{currentAvatarIndex + 1}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <button
              onClick={handlePrevious}
              disabled={isLoading}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous avatar"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next avatar"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </button>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleSelect}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Updating...' : 'Select'}
            </Button>
            
            <button
              onClick={handleSkip}
              disabled={isLoading}
              className="block mx-auto text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default ProfilePictureSelector;