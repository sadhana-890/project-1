"use client";

// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the auth state type

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string; // optional field
  // add anything else your backend gives you
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  phoneNumber: string | null;
  countryCode: string | null;
  otpId: string | null;
  verificationStatus: 'idle' | 'pending' | 'success' | 'failed';
  loading: boolean;
  error: string | null;
}

// Define the root state type (you can also import this from your store)
export interface RootState {
  auth: AuthState;
  // Add other slices here as needed
}

// Define payload types for actions
export interface PhoneDetailsPayload {
  phoneNumber: string;
  countryCode: string;
}

export interface SetUserPayload {
  user: User; // Fixed: Changed from any to User
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  phoneNumber: null,
  countryCode: null,
  otpId: null,
  verificationStatus: 'idle', // idle, pending, success, failed
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set phone number and country code for verification
    setPhoneDetails: (state, action: PayloadAction<PhoneDetailsPayload>) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.countryCode = action.payload.countryCode;
      state.error = null;
    },
    
    // Set OTP ID after successful OTP send
    setOtpId: (state, action: PayloadAction<string>) => {
      state.otpId = action.payload;
    },
    
    // Set verification status
    setVerificationStatus: (state, action: PayloadAction<AuthState['verificationStatus']>) => {
      state.verificationStatus = action.payload;
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
    // Set user after successful verification
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.verificationStatus = 'success';
      state.loading = false;
      state.error = null;
    },
    
    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.phoneNumber = null;
      state.countryCode = null;
      state.otpId = null;
      state.verificationStatus = 'idle';
      state.loading = false;
      state.error = null;
    },
    
    // Reset verification state
    resetVerification: (state) => {
      state.verificationStatus = 'idle';
      state.otpId = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setPhoneDetails,
  setOtpId,
  setVerificationStatus,
  setLoading,
  setError,
  clearError,
  setUser,
  logout,
  resetVerification,
} = authSlice.actions;

// Typed selectors
export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectUser = (state: RootState): User | null => state.auth.user; // Fixed: Changed from any to User
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectPhoneDetails = (state: RootState): { phoneNumber: string | null; countryCode: string | null } => ({
  phoneNumber: state.auth.phoneNumber,
  countryCode: state.auth.countryCode,
});
export const selectVerificationStatus = (state: RootState): AuthState['verificationStatus'] => state.auth.verificationStatus;
export const selectLoading = (state: RootState): boolean => state.auth.loading;
export const selectError = (state: RootState): string | null => state.auth.error;
export const selectToken = (state: RootState): string | null => state.auth.token;
export const selectOtpId = (state: RootState): string | null => state.auth.otpId;

export default authSlice.reducer;