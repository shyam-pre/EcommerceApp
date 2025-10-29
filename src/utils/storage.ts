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
