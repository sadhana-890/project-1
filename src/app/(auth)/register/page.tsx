"use client";

import Footer from '@/app/footer/page'; // Updated import path
import Header from '@/app/header/page'; // Updated import path
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PhoneVerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter(); 
  
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag,flags');
        const data: Array<{
          idd?: { root?: string; suffixes?: string[] };
          flag?: string;
          flags?: { png?: string; svg?: string; alt?: string };
          name: { common: string };
          cca2: string;
        }> = await response.json();
        
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
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        setCountries([
          { code: '+1', flag: '🇺🇸', flagImage: 'https://flagcdn.com/w40/us.png', country: 'United States', iso: 'US' },
          { code: '+44', flag: '🇬🇧', flagImage: 'https://flagcdn.com/w40/gb.png', country: 'United Kingdom', iso: 'GB' },
          { code: '+33', flag: '🇫🇷', flagImage: 'https://flagcdn.com/w40/fr.png', country: 'France', iso: 'FR' },
          { code: '+49', flag: '🇩🇪', flagImage: 'https://flagcdn.com/w40/de.png', country: 'Germany', iso: 'DE' },
          { code: '+91', flag: '🇮🇳', flagImage: 'https://flagcdn.com/w40/in.png', country: 'India', iso: 'IN' }
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
    }
    router.push('/register/verify'); // Fixed route path
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Component */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Verify Your Phone
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              We'll send you a code to verify your phone number.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-5">
            {/* Phone Number Input */}
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
                    className="flex items-center px-3 py-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-l-lg transition-colors"
                  >
                    {selectedCountry.flagImage ? (
                      <img 
                        src={selectedCountry.flagImage} 
                        alt={`Flag of ${selectedCountry.country}`}
                        className="w-5 h-3 object-cover rounded mr-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <span className={`text-base mr-2 ${selectedCountry.flagImage ? 'hidden' : ''}`}>
                      {selectedCountry.flag}
                    </span>
                    <svg 
                      className="w-4 h-4 text-gray-400 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="text-gray-600 ml-1 text-sm">{selectedCountry.code}</span>
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {loading ? (
                        <div className="px-3 py-3 text-center text-gray-500 text-sm">
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
                            className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left text-sm transition-colors"
                          >
                            {country.flagImage ? (
                              <img 
                                src={country.flagImage} 
                                alt={`Flag of ${country.country}`}
                                className="w-5 h-3 object-cover rounded mr-2"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <span className={`text-base mr-2 ${country.flagImage ? 'hidden' : ''}`}>
                              {country.flag}
                            </span>
                            <span className="flex-1 text-gray-900">{country.country}</span>
                            <span className="text-gray-600 ml-2">{country.code}</span>
                          </button>
                        ))
                      )}
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
                  className="w-full pl-20 sm:pl-28 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900 transition-all"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 underline">
                  Terms of Use
                </a>{' '}
                of Superapp
              </label>
            </div>

            {/* Send Code Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleSendCode}
                disabled={!phoneNumber || !agreed}
                className="w-full sm:w-auto min-w-32 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-all duration-200"
              >
                Send Code
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PhoneVerificationPage;