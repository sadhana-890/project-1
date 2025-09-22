// src/store.js
'use client';
import { configureStore } from '@reduxjs/toolkit';
import { walletApi } from '@/services/walletApi';
import { otpApi } from '@/services/otpApi';
import { userApi } from '@/services/userApi';

import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [otpApi.reducerPath]: otpApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      walletApi.middleware,
      otpApi.middleware,
      userApi.middleware,
     
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;