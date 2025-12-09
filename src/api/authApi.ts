// src/api/authApi.ts
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (body) => ({
        url: 'users/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
