// src/api/cartApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
// }
interface Product {
  id: number;
  title: string;
  price: number;
  quentity: number;
}
 
export interface Cart {
  id: number;
  total: number;
  products: Product[];
}

export interface CartsResponse {
  carts: Cart[];
}

interface AddCartRequest {
  userId: number;
  products: { id: number; quantity: number }[];
}

interface AddCartResponse {
  id: number; // cart id
  userId: number;
  products: Product[];
  total: number;
}

// export const cartApi = createApi({
//   reducerPath: 'cartApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
//   endpoints: builder => ({
//     getCarts: builder.query<CartsResponse, void>({
//       query: () => 'carts',
//     }),

//     // ✅ GET cart by ID (e.g., /carts/1)
//     getCartById: builder.query<SingleCartResponse, number>({
//       query: id => `carts/${id}`,
//     }),

//     getCartByUser: builder.query<SingleCartResponse, number>({
//       query: id => `carts/user/${id}`,
//     }),

//     // ✅ POST (Add Cart)
//     addCart: builder.mutation<AddCartResponse, AddCartRequest>({
//       query: body => ({
//         url: 'carts/add',
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       }),
//     }),
//   }),
// });

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    getCarts: builder.query<CartsResponse, void>({
      query: () => 'carts',
    }),
    getCartById: builder.query<CartsResponse, number>({
      query: id => `carts/${id}`,
    }),
    // post (add cart)
    addCart: builder.mutation<AddCartResponse, AddCartRequest>({
      query: body => ({
        url: 'carts/add',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),
    }),


    
    getCartByUser: builder.query<CartsResponse, number>({
      query: id => `carts/user/${id}`,
    }),
  }),
});
export const {
  useGetCartsQuery,
  useLazyGetCartByIdQuery,
  useLazyGetCartByUserQuery,
  useAddCartMutation, // ✅ new hook for POST
} = cartApi;
