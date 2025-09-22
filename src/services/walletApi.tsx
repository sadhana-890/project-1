// src/services/walletApi.ts
'use client';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// ----------- Types -----------
export interface SendOtpRequest {
  phoneNumber: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: {
    otpId?: string;
    transactionId?: string;
    expiresIn?: number;
    otpLength?: number;
  };
  error?: string;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
  otpId?: string;
  transactionId?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id?: string;
      phoneNumber?: string;
      isVerified?: boolean;
      walletId?: string;
    };
    wallet?: {
      id?: string;
      balance?: number;
      currency?: string;
    };
  };
  error?: string;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
}

export interface UserProfile {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  walletId?: string;
}

export interface ApiErrorResponse {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR" | "CUSTOM_ERROR";
  message: string;
  errors?: string[];
  code?: string;
  details?: unknown;
}

interface ErrorResponseData {
  message?: string;
  error?: string;
  errors?: string[];
  code?: string;
  [key: string]: unknown;
}

// RootState (simplified for token access)
export interface RootState {
  auth: {
    token?: string;
    accessToken?: string;
  };
  walletApi: unknown;
}

// ----------- Base Query -----------
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const state = getState() as RootState;
    const token = state?.auth?.token || state?.auth?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Retry wrapper
const baseQueryWithRetry = async (
  args: Parameters<typeof baseQueryWithAuth>[0],
  api: Parameters<typeof baseQueryWithAuth>[1],
  extraOptions: Parameters<typeof baseQueryWithAuth>[2]
) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 'FETCH_ERROR') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = await baseQueryWithAuth(args, api, extraOptions);
  }

  return result;
};

// ----------- API Definition -----------
export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Wallet', 'User', 'OTP'],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: (body) => ({
        url: '/wallet/send-otp',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (
        response: FetchBaseQueryError | { data?: ErrorResponseData; status: number }
      ): ApiErrorResponse => {
        const data = ('data' in response ? response.data : undefined) as ErrorResponseData | undefined;
        return {
          status: response.status,
          message: data?.message || data?.error || 'Failed to send OTP',
          errors: data?.errors || [],
          code: data?.code || 'SEND_OTP_ERROR',
          details: data,
        };
      },
      invalidatesTags: ['OTP'],
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/wallet/verify-otp',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (
        response: FetchBaseQueryError | { data?: ErrorResponseData; status: number }
      ): ApiErrorResponse => {
        const data = ('data' in response ? response.data : undefined) as ErrorResponseData | undefined;
        return {
          status: response.status,
          message: data?.message || data?.error || 'Failed to verify OTP',
          errors: data?.errors || [],
          code: data?.code || 'VERIFY_OTP_ERROR',
          details: data,
        };
      },
      invalidatesTags: ['User', 'Wallet'],
    }),

    getWalletInfo: builder.query<Wallet, string>({
      query: (walletId) => `/wallet/${walletId}`,
      providesTags: ['Wallet'],
    }),

    createWallet: builder.mutation<Wallet, Partial<Wallet>>({
      query: (body) => ({
        url: '/wallet',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wallet'],
    }),

    getUserProfile: builder.query<UserProfile, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),

    resendOtp: builder.mutation<SendOtpResponse, { phoneNumber: string; otpId?: string }>({
      query: (body) => ({
        url: '/wallet/resend-otp',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (
        response: FetchBaseQueryError | { data?: ErrorResponseData; status: number }
      ): ApiErrorResponse => {
        const data = ('data' in response ? response.data : undefined) as ErrorResponseData | undefined;
        return {
          status: response.status,
          message: data?.message || 'Failed to resend OTP',
          errors: data?.errors || [],
          details: data,
        };
      },
    }),
  }),
});

// ----------- Hooks -----------
export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetWalletInfoQuery,
  useCreateWalletMutation,
  useGetUserProfileQuery,
  useResendOtpMutation,
} = walletApi;
