"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/header/page'
import Footer from '@/app/footer/page';
import { Button } from '@/components/ui/button';

const ProfileCreationPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const router = useRouter();

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fullName.trim()) {
      console.log('Profile created for:', fullName);
      // Add your profile creation logic here
      router.push('./avatar'); // or wherever you want to redirect
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 font-inter">
              Create your Superapp profile
            </h1>
            <p className="text-gray-600 text-sm">
              This will be your display name in the app
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex. John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className='flex justify-center'>
              <Button
                onClick={handleContinue}
                disabled={!fullName.trim()}
                
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProfileCreationPage;