"use client";
import React, { useState } from 'react';

import Image from 'next/image'; 
import Forward from "/public/icons/forward.svg";
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

        <h1 className="text-4xl md:text-5xl font-semibold text-[#060535] mb-4 leading-snug font-inter tracking-tighter whitespace-nowrap">
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8  flex items-center justify-center  transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous avatar"
            >
            <Image src="/icons/backward.svg" alt="backward" width={16} height={16} className="w-4 h-4" />

            </button>
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next avatar"
            >
            <Image src="/icons/forward.svg" alt="forward" width={16} height={16} className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleSelect}
              disabled={isLoading}
              className="py-5 px-6 rounded-[3px]"
            >
              {isLoading ? 'Updating...' : 'Select'}
            </Button>
            <br/>
            
            <button
              onClick={handleSkip}
              disabled={isLoading}
          
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