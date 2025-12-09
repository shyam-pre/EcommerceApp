// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Auth', 'Cart', 'Product'],
  endpoints: () => ({}),
});
