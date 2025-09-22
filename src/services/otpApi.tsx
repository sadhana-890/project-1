// src/services/otpApi.tsx
import { createApi, fetchBaseQuery, FetchBaseQueryMeta, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// ================== Types ==================
interface User {
  id: string;
  phoneNumber: string;
  isVerified: boolean;
  createdAt?: string;
}

interface Wallet {
  id: string;
  chain: string;
  address: string;
  balance: number;
}

interface SendOtpRequest {
  phoneNumber: string;
}

interface SendOtpResponse {
  success: boolean;
  message: string;
  otpSent?: boolean;
  expiresIn?: number;
}

interface VerifyOtpRequest {
  phoneNumber: string;
  code: string;
  chains: string[];
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: User;
  wallets?: Wallet[];
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  };
}

interface ResendOtpRequest {
  phoneNumber: string;
}

interface ResendOtpResponse {
  success: boolean;
  message: string;
  otpSent: boolean;
  expiresIn: number;
}

interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: unknown;
}

// Auth state interface for getState typing
interface AuthState {
  token?: string;
  accessToken?: string;
}

interface RootState {
  auth?: AuthState;
}

// Error response interface
interface ErrorResponse {
  status: number;
  data: ApiError | string;
}

// ================== API ==================
export const otpApi = createApi({
  reducerPath: 'otpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token || state.auth?.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['OTP', 'User', 'Wallet'],
  endpoints: (builder) => ({
    // -------------------- SEND OTP --------------------
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: ({ phoneNumber }) => ({
        url: '/wallet/send-otp',
        method: 'POST',
        body: { phoneNumber },
      }),
      invalidatesTags: ['OTP'],
      transformErrorResponse: (response: FetchBaseQueryError) => {
        const errorResponse = response as ErrorResponse;
        return {
          status: errorResponse.status || 500,
          data: (errorResponse.data as ApiError) || {
            message: 'Failed to send OTP',
            statusCode: errorResponse.status || 500,
          },
        };
      },
    }),

    // -------------------- VERIFY OTP --------------------
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: ({ phoneNumber, code, chains }) => ({
        url: '/wallet/verify-otp',
        method: 'POST',
        body: { phoneNumber, code, chains },
      }),

      transformResponse: (
        response: unknown,
        meta: FetchBaseQueryMeta | undefined
      ): VerifyOtpResponse => {
        const typedResponse = response as Partial<VerifyOtpResponse>;
        const httpStatus = meta?.response?.status;
        const isHttpSuccess = httpStatus !== undefined && httpStatus >= 200 && httpStatus < 300;

        if (!isHttpSuccess) {
          throw new Error(typedResponse?.message || 'Request failed');
        }

        return {
          success: typedResponse?.success ?? false,
          message: typedResponse?.message ?? '',
          token: typedResponse?.data?.accessToken || typedResponse?.token,
          refreshToken: typedResponse?.data?.refreshToken || typedResponse?.refreshToken,
          user: typedResponse?.data?.user || typedResponse?.user,
          data: typedResponse?.data,
          wallets: typedResponse?.wallets,
        };
      },

      transformErrorResponse: (
        response: FetchBaseQueryError,
        meta: FetchBaseQueryMeta | undefined
      ) => {
        const errorResponse = response as ErrorResponse;
        const status = meta?.response?.status || errorResponse?.status || 400;
        let errorMessage = 'OTP verification failed';

        if (typeof errorResponse.data === 'string') {
          errorMessage = errorResponse.data;
        } else if (errorResponse.data && typeof errorResponse.data === 'object' && 'message' in errorResponse.data) {
          errorMessage = (errorResponse.data as ApiError).message;
        }

        return {
          status,
          data: {
            message: errorMessage,
            success: false,
            statusCode: status,
            originalError: response,
          },
        };
      },

      invalidatesTags: ['OTP', 'User', 'Wallet'],

      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Error is handled in transformErrorResponse
          console.error('OTP verification failed:', error);
        }
      },
    }),

    // -------------------- RESEND OTP --------------------
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: ({ phoneNumber }) => ({
        url: '/wallet/resend-otp',
        method: 'POST',
        body: { phoneNumber },
      }),
      invalidatesTags: ['OTP'],
      transformErrorResponse: (response: FetchBaseQueryError) => {
        const errorResponse = response as ErrorResponse;
        return {
          status: errorResponse.status || 500,
          data: (errorResponse.data as ApiError) || {
            message: 'Failed to resend OTP',
            statusCode: errorResponse.status || 500,
          },
        };
      },
    }),

    // -------------------- CHECK OTP STATUS --------------------
    checkOtpStatus: builder.query<
      { isValid: boolean; expiresIn: number },
      { phoneNumber: string }
    >({
      query: ({ phoneNumber }) => ({
        url: `/wallet/otp-status?phoneNumber=${encodeURIComponent(phoneNumber)}`,
        method: 'GET',
      }),
      providesTags: ['OTP'],
      transformErrorResponse: (response: FetchBaseQueryError) => {
        const errorResponse = response as ErrorResponse;
        return {
          status: errorResponse.status || 500,
          data: (errorResponse.data as ApiError) || {
            message: 'Failed to check OTP status',
            statusCode: errorResponse.status || 500,
          },
        };
      },
    }),
  }),
});

// ================== Hooks ==================
export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useCheckOtpStatusQuery,
  useLazyCheckOtpStatusQuery,
} = otpApi;

// ================== Helpers ==================
export type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ApiError,
  User,
  Wallet,
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return phone.startsWith('+') ? phone : `+${cleaned}`;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const validateOtpCode = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};

export const DEFAULT_CHAINS = ['Ethereum', 'Bitcoin', 'Solana'];
export const OTP_EXPIRY_MINUTES = 5;