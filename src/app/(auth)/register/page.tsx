"use client";

import Footer from '@/app/footer/page';
import Header from '@/app/header/page';
import React, { useEffect, useState } from 'react';

const PhoneVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  type Country = { code: string; flag?: string; country: string; iso: string };
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: '+1',
    flag: '🇺🇸',
    country: 'United States',
    iso: 'US'
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
        const data: Array<{
          idd?: { root?: string; suffixes?: string[] };
          flag?: string;
          name: { common: string };
          cca2: string;
        }> = await response.json();
        
        const formattedCountries = data
          .filter((country) => country.idd?.root && country.idd?.suffixes)
          .map((country) => ({
            code: country.idd && country.idd.root ? country.idd.root + (country.idd.suffixes?.[0] || '') : '',
            flag: country.flag,
            country: country.name.common,
            iso: country.cca2
          }))
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountries(formattedCountries);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        // Fallback to basic countries if API fails
        setCountries([
          { code: '+1', flag: '🇺🇸', country: 'United States', iso: 'US' },
          { code: '+44', flag: '🇬🇧', country: 'United Kingdom', iso: 'GB' },
          { code: '+33', flag: '🇫🇷', country: 'France', iso: 'FR' },
          { code: '+49', flag: '🇩🇪', country: 'Germany', iso: 'DE' },
          { code: '+91', flag: '🇮🇳', country: 'India', iso: 'IN' }
        ]);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (phoneNumber && agreed) {
      console.log('Sending code to:', selectedCountry.code + phoneNumber);
      // Add your send code logic here
    }
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
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

  return (
    <>
    <Header/>
    <div className="min-h-screen  flex justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Verify Your Phone
          </h1>
          <p className="text-gray-600 text-lg">
            We'll send you a code to verify your phone number.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative country-dropdown">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className="flex items-center px-3 py-3 border-r border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-l-lg"
                >
                  <span className="text-lg mr-2">{selectedCountry.flag}</span>
                  <span className="text-gray-600 mr-1">{selectedCountry.code}</span>
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {countries.map((country, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCountrySelect(country);
                        }}
                        className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                      >
                        <span className="text-lg mr-3">{country.flag}</span>
                        <span className="flex-1 text-gray-900">{country.country}</span>
                        <span className="text-gray-600 ml-2">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => setShowDropdown(false)}
                onClick={() => setShowDropdown(false)}
                placeholder="(202) 555-0198"
                className="w-full pl-24 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                Terms of Use
              </a>{' '}
              of Superapp
            </label>
          </div>

          <button
            onClick={handleSendCode}
            disabled={!phoneNumber || !agreed}
            className="w-full bg-[#8759FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send Code
          </button>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
};

export default PhoneVerificationPage;