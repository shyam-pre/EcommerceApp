import { MMKV } from 'react-native-mmkv';
import type { Storage } from 'redux-persist';

// ✅ Initialize MMKV
export const storage = new MMKV();

// ✅ All storage keys in one place
export const keys = {
  TOKEN: 'token',
  USER_ID: 'user_id',
  Cart_Data: 'cart_data',
};

// ✅ Save data (auto stringify if object)
export const saveData = (key: string, value: any) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : String(value);
  storage.set(key, data);
};

// ✅ Get data (auto parse JSON)
export const getData = (key: string) => {
  const value = storage.getString(key);
  if (value == null) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// ✅ Remove single key
export const removeData = (key: string) => storage.delete(key);

// ✅ Clear all MMKV data
export const clearAllData = () => storage.clearAll();

// 🔹 Adapter for Redux Persist (async wrapper for MMKV)
export const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};


// import { MMKV } from 'react-native-mmkv';
// import type { Storage } from 'redux-persist'
// export const storage = new MMKV();

// export const keys = {
//   TOKEN: 'token',
//   USER_ID: 'user_id',
//   Cart_Data: 'cart_data',
// };
// export const saveData = (key: string, value: any) => {
//   const data =
//     typeof value === 'object' ? JSON.stringify(value) : String(value);
//   storage.set(key, data);
// };

// export const getData = (key: string) => {
//   const value = storage.getString(key);
//   if (value == null) return null; // agar kuch nahi mila

//   try {
//     return JSON.parse(value);
//   } catch {
//     return value;
//   }
// };

// export const removeData = (key: string) => storage.delete(key);
// export const clearAllData = () => storage.clearAll();
