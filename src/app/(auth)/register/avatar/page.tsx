"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/app/header/page';
import Footer from '@/app/footer/page';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const ProfilePictureSelector = () => {
  const avatars = [
    '/avatars/avatar1.svg',
    '/avatars/avatar2.svg', 
    '/avatars/avatar3.svg',
    '/avatars/avatar4.svg',
    '/avatars/avatar5.svg',
    '/avatars/avatar6.svg'
  ];

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

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

  const handleSelect = () => {
    const selectedAvatar = avatars[currentAvatarIndex];
    console.log('Selected avatar:', selectedAvatar);
    sessionStorage.setItem('register.avatar', selectedAvatar);
    alert(`Avatar selected: ${selectedAvatar}`);
  };

  const handleSkip = () => {
    console.log('Skipped avatar selection');
    alert('Avatar selection skipped!');
  };

  return (
   <div className="min-h-screen flex flex-col">
    <Header/>
    <div className="min-h-screen flex justify-center  px-4 py-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Select Profile Picture
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Choose your profile picture
        </p>
        
        <div className="relative mb-8">
          {/* Avatar Container */}
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="rounded-full overflow-hidden">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatars[currentAvatarIndex]} alt={`Avatar option ${currentAvatarIndex + 1}`} />
                <AvatarFallback>{currentAvatarIndex + 1}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
            aria-label="Previous avatar"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
            aria-label="Next avatar"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSelect}
          >
            Select
          </Button>
          
          <button
            onClick={handleSkip}
            className="block mx-auto text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm"
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