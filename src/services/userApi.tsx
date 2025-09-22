// src/services/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Define a proper response type instead of `any`
interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    profilePicUrl: string;
  };
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      // ✅ Only use localStorage (getState removed)
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Strongly typed mutation
    updateProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/users/profile/update",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = userApi;
