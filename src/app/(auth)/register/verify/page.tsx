"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "../../../header/page";
import Footer from "../../../footer/page";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useVerifyOtpMutation } from "@/services/otpApi";
import Image from "next/image";
import { DEFAULT_CHAINS } from "@/services/otpApi";

interface ApiError {
  data?: {
    message?: string;
    error?: string;
  };
  status?: number;
  message?: string;
}

interface UserData {
  id?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

interface AuthTokenData {
  accessToken?: string;
  refreshToken?: string;
  user?: UserData;
}

interface VerifyOtpResponse {
  success?: boolean;
  token?: string;
  refreshToken?: string;
  user?: UserData;
  message?: string;
  data?: AuthTokenData;
}

interface OtpVerifyRequestPayload {
  phoneNumber: string;
  code: string;
  chains: string[];
}

const normalizePhoneNumber = (phone: string): string => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  return phone.startsWith("+") ? `+${digits}` : `+${digits}`;
};

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  useEffect(() => {
    setIsMounted(true);
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    if (storedPhoneNumber) {
      setPhoneNumber(normalizePhoneNumber(storedPhoneNumber));
    }
  }, []);

  const handleInputChange = (index: number, value: string): void => {
    if (hasError) {
      setHasError(false);
    }

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
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearOtpFields = (): void => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const storeAuthData = (data: VerifyOtpResponse): void => {
    if (!isMounted) return;

    try {
      const token = data.token || data.data?.accessToken;
      const refreshToken = data.refreshToken || data.data?.refreshToken;
      const user = data.user || data.data?.user;

      if (token) {
        localStorage.setItem("authToken", token);
      }
      
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      
      if (user) {
        localStorage.setItem("userData", JSON.stringify(user));
      }
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  };

  const handleVerify = async (): Promise<void> => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setHasError(true);
      return;
    }

    if (!phoneNumber) {
      setHasError(true);
      return;
    }

    try {
      const payload: OtpVerifyRequestPayload = {
        phoneNumber: phoneNumber,
        code: otpCode,
        chains: DEFAULT_CHAINS,
      };

      const result = await verifyOtp(payload).unwrap() as VerifyOtpResponse;

      const token = result.token || result.data?.accessToken;
      
      if (!token) {
        throw new Error("No authentication token received");
      }

      storeAuthData(result);
      router.push("./profile");

    } catch (error: unknown) {
      setHasError(true);
      // ONLY CHANGE 1: Removed clearOtpFields() call here - keep the wrong OTP numbers
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-md text-center">
            <div className="animate-pulse">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 font-inter">
                Enter OTP Code
              </h1>
              <p className="mb-8 text-gray-600 text-sm">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#060535] mb-4 leading-snug font-inter tracking-tighter whitespace-nowrap">
            Enter OTP Code
          </h1>

          <p className="mb-8 text-gray-600 text-sm">
            Please check{" "}
            <span className="text-purple-600 font-medium">
              {phoneNumber || "your phone"}
            </span>{" "}
            for a message from Superapp and enter your code below.
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  hasError
                    ? "border-red-400 text-red-600"
                    : digit
                    ? "border-gray-900 bg-purple-50 text-gray-900"
                    : "border-gray-300 bg-white focus:border-purple-600 hover:border-gray-400"
                }`}
                maxLength={1}
                disabled={isVerifying}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {hasError && (
            <div className="mb-4 flex items-center text-red-500 text-sm" style={{ marginLeft: 'calc(50% - 164px)' }}>
                <Image
                  src="/icons/helpCircle.svg"
                  alt="Error"
                  width={16}
                  height={16}
                  className="mr-2"
                  style={{ filter: 'brightness(0) saturate(100%) invert(17%) sepia(96%) saturate(7062%) hue-rotate(355deg) brightness(87%) contrast(118%)' }}
                />
              <span>Invalid code</span>
            </div>
          )}

          <Button
            onClick={handleVerify}
            disabled={otp.some((digit) => digit === "") || isVerifying}
            className={`w-full${
              otp.some((digit) => digit === "") || isVerifying
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OTPVerification;