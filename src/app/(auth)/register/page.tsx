"use client";

import Footer from '@/app/footer/page';
import Header from '@/app/header/page';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { useSendOtpMutation } from '@/services/otpApi';
import { 
  setPhoneDetails, 
  setOtpId, 
  setLoading, 
  setError, 
  clearError,
  selectAuth 
} from '@/features/auth/authSlice';

// Type definitions for better type safety
interface ApiError {
  status?: number;
  data?: {
    message?: string;
    error?: string;
  };
  message?: string;
}

interface OtpResponse {
  success: boolean;
  message?: string;
  data?: {
    otpId?: string;
    [key: string]: unknown;
  };
}

// Fixed: Proper typing for country API response
interface CountryApiResponse {
  idd?: { 
    root?: string; 
    suffixes?: string[] 
  };
  flag?: string;
  flags?: { 
    png?: string; 
    svg?: string; 
    alt?: string 
  };
  name: { 
    common: string 
  };
  cca2: string;
}

const PhoneVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  // RTK Query mutation
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  
  // Redux state
  const { loading, error } = useSelector(selectAuth);
  
  type Country = { 
    code: string; 
    flag?: string; 
    flagImage?: string;
    country: string; 
    iso: string; 
  };
  
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: '+1',
    flag: '🇺🇸',
    flagImage: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    iso: 'US'
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag,flags');
        const data: CountryApiResponse[] = await response.json();
        
        const formattedCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes)
          .map((country) => ({
            code: country.idd && country.idd.root ? country.idd.root + (country.idd.suffixes?.[0] || '') : '',
            flag: country.flag,
            flagImage: country.flags?.png || `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
            country: country.name.common,
            iso: country.cca2
          }))
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountries(formattedCountries);
        
        const defaultCountry = formattedCountries.find(c => c.iso === 'US') || formattedCountries[0];
        if (defaultCountry) {
          setSelectedCountry(defaultCountry);
        }
        
        setCountriesLoading(false);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        setCountries([
          { code: '+1', flag: '🇺🇸', flagImage: 'https://flagcdn.com/w40/us.png', country: 'United States', iso: 'US' },
          { code: '+44', flag: '🇬🇧', flagImage: 'https://flagcdn.com/w40/gb.png', country: 'United Kingdom', iso: 'GB' },
          { code: '+33', flag: '🇫🇷', flagImage: 'https://flagcdn.com/w40/fr.png', country: 'France', iso: 'FR' },
          { code: '+49', flag: '🇩🇪', flagImage: 'https://flagcdn.com/w40/de.png', country: 'Germany', iso: 'DE' },
          { code: '+91', flag: '🇮🇳', flagImage: 'https://flagcdn.com/w40/in.png', country: 'India', iso: 'IN' }
        ]);
        setCountriesLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Clear error when component mounts or when user starts typing
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (phoneNumber) {
      dispatch(clearError());
    }
  }, [phoneNumber, dispatch]);

  // Helper function to extract error message with proper type checking
  const getErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'data' in error) {
      const apiError = error as ApiError;
      if (apiError.data?.message) {
        return apiError.data.message;
      }
      if (apiError.data?.error) {
        return apiError.data.error;
      }
    }
    if (error && typeof error === 'object' && 'message' in error) {
      const messageError = error as { message: string };
      return messageError.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred. Please try again.';
  };

  const handleSendCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!phoneNumber || !agreed) {
      dispatch(setError('Please enter phone number and agree to terms'));
      return;
    }

    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      const fullPhoneNumber = selectedCountry.code + phoneNumber.trim();

      // Save to Redux
      dispatch(setPhoneDetails({
        phoneNumber: phoneNumber.trim(),
        countryCode: selectedCountry.code
      }));

      const otpRequest = { phoneNumber: fullPhoneNumber };

      console.log('🔍 Sending OTP request:', otpRequest);

      const result: OtpResponse = await sendOtp(otpRequest).unwrap();

      // 🚨 ADD COMPREHENSIVE LOGGING HERE
      console.log('📥 SEND OTP BACKEND RESPONSE:');
      console.log('=====================================');
      console.log('Full Response Object:', result);
      console.log('Response Type:', typeof result);
      console.log('Response Keys:', Object.keys(result || {}));
      console.log('=====================================');
      
      // Log specific properties
      console.log('🔍 RESPONSE ANALYSIS:');
      console.log('result.success:', result.success, '(type:', typeof result.success, ')');
      console.log('result.message:', result.message);
      console.log('result.data:', result.data);
      console.log('=====================================');

      // 🔍 EXTRACT OTP FROM MESSAGE
      if (result.message) {
        console.log('🔑 LOOKING FOR OTP IN MESSAGE:');
        console.log('Message:', result.message);
        
        // Try to extract OTP from message using regex
        const otpMatch = result.message.match(/OTP[:\s]*(\d{6})/i) || 
                        result.message.match(/code[:\s]*(\d{6})/i) ||
                        result.message.match(/(\d{6})/);
        
        if (otpMatch) {
          console.log('🎯 OTP FOUND:', otpMatch[1]);
          console.log('=====================================');
          console.log('🎉 USE THIS OTP TO VERIFY:', otpMatch[1]);
          console.log('=====================================');
        } else {
          console.log('❌ No OTP found in message. Check message format.');
        }
      }

      if (result.success) {
        if (result.data?.otpId) {
          dispatch(setOtpId(result.data.otpId));
        }

        // ✅ Save phone in localStorage for OTPVerification page
        localStorage.setItem("phoneNumber", fullPhoneNumber);

        router.push('/register/verify');
      } else {
        throw new Error(result.message || 'Failed to send OTP');
      }

    } catch (error) {
      console.log('🚨 ERROR CAUGHT IN SEND OTP:');
      console.log('=====================================');
      console.error('❌ Error sending OTP:', error);
      
      // Log error details
      if (error && typeof error === 'object') {
        console.log('Error object keys:', Object.keys(error));
        if ('message' in error) {
          console.log('Error message:', error.message);
        }
        if ('data' in error) {
          console.log('Error data:', error.data);
        }
      }
      console.log('=====================================');
      
      const errorMessage = getErrorMessage(error);
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const nextElement = target.nextElementSibling as HTMLElement;
    target.style.display = 'none';
    if (nextElement) {
      nextElement.classList.remove('hidden');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-dropdown')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const isSubmitting = loading || isSendingOtp;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex justify-center px-4 py-8 sm:py-12">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-3 font-inter">
              Verify Your Phone
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              We&apos;ll send you a code to verify your phone number.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              
              {/* Container matching the exact design */}
              <div className="relative country-dropdown">
                <div className="flex items-center w-full px-4 py-4 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all">
                  
                  {/* Flag */}
                  {selectedCountry.flagImage ? (
                    <Image 
                      src={selectedCountry.flagImage} 
                      alt={`Flag of ${selectedCountry.country}`}
                      width={24}
                      height={16}
                      className="object-cover mr-3 flex-shrink-0"
                      onError={handleImageError}
                    />
                  ) : (
                    <span className="text-lg mr-3 flex-shrink-0">
                      {selectedCountry.flag}
                    </span>
                  )}
                  
                  {/* Dropdown arrow */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                    disabled={isSubmitting}
                    className="flex items-center justify-center p-1 hover:bg-gray-50 rounded transition-colors disabled:opacity-50 mr-3"
                  >
                    <Image 
                      src="/icons/dropdown.svg" 
                      alt="Dropdown arrow"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </button>
                  
                  {/* Country code and phone input combined */}
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="text-gray-950 font-normal mr-1 flex-shrink-0">
                      {selectedCountry.code}
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onFocus={() => setShowDropdown(false)}
                      onClick={() => setShowDropdown(false)}
                      placeholder="Enter phone number"
                      disabled={isSubmitting}
                      className="flex-1 px-2 py-0 outline-none text-gray-950 font-normal placeholder-gray-500 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
                    />
                  </div>
                </div>
                
                {/* Dropdown menu */}
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                    {countriesLoading ? (
                      <div className="px-4 py-3 text-center text-gray-500 text-sm">
                        Loading countries...
                      </div>
                    ) : (
                      countries.map((country, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCountrySelect(country);
                          }}
                          className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left text-sm transition-colors"
                        >
                          {country.flagImage ? (
                            <Image 
                              src={country.flagImage} 
                              alt={`Flag of ${country.country}`}
                              width={20}
                              height={12}
                              className="object-cover rounded mr-3 flex-shrink-0"
                              onError={handleImageError}
                            />
                          ) : (
                            <span className="text-base mr-3 flex-shrink-0">
                              {country.flag}
                            </span>
                          )}
                          <span className="flex-1 text-gray-900 truncate">{country.country}</span>
                          <span className="text-gray-900 ml-2 flex-shrink-0 ">{country.code}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={isSubmitting}
              className="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
            />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                  Terms of Use
                </a>{' '}
                of Superapp
              </label>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleSendCode}
                disabled={!phoneNumber || !agreed || isSubmitting}
                className="  sm:w-auto min-w-32  disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-[3px] transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Code'
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhoneVerificationPage;