"use client";
import React, { useState, useRef } from 'react';
import Header from '../../../header/page';
import Footer from '../../../footer/page';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const router = useRouter();
  
  const handleInputChange = (index: number, value: string): void => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value.toUpperCase();
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    const otpCode = otp.join('');
    console.log('OTP Code:', otpCode);
    // Add your verification logic here
    router.push('./profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Enter OTP Code
          </h1>

          <p className="mb-8 text-gray-600 text-sm">
            Check <span className="text-purple-600 font-medium">+1 (202) 555-0198</span> for your code
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                maxLength={1}
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={otp.some((digit) => digit === '')}
            className={`rounded-sm font-semibold transition-colors ${
              otp.some((digit) => digit === '')
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            Verify
          </Button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OTPVerification;