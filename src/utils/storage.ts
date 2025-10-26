// src/storage/storage.ts
// import { MMKV } from 'react-native-mmkv';
// export const storage = new MMKV();
// export const TOKEN_KEY = 'token';
// export const KEYS = {
//   TOKEN: 'token',
//   USER_ID: 'user_id',
// };

// Generic storage helpers
// export const saveItem = (key: string, value: string | number | boolean) => storage.getString(key, value);
// export const getItem = (key: string) => storage.getString(key);
// export const removeItem = (key: string) => storage.delete(key);

// export const saveToken = (token:string) => storage.set(TOKEN_KEY, token);
// export const getToken = () => storage.getString(TOKEN_KEY);
// export const removeToken = () => storage.delete(TOKEN_KEY)

// export const saveItem = (token:string) => storage.set(TOKEN_KEY, token)

// // Save a number
// saveItem(USER_ID_KEY, 101);

// // Get a number (use getNumber)
// console.log(storage.getNumber(USER_ID_KEY)); // ✅ 101

// // Save a boolean
// saveItem('isLoggedIn', true);

// // Get a boolean
// console.log(storage.getBoolean('isLoggedIn')); // ✅ true

import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const keys = {
  TOKEN: 'token',
  USER_ID: 'user_id',
  Cart_Data : 'cart_data'
};
export const saveData = (key: string, value: any) => {
  const data =
    typeof value === 'object' ? JSON.stringify(value) : String(value);
  storage.set(key, data);
};

export const getData = (key: string) => {
  const value = storage.getString(key);
  if (value == null) return null; // agar kuch nahi mila

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const removeData = (key: string) => storage.delete(key);
export const clearAllData = () => storage.clearAll();
