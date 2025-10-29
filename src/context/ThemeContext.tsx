// ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { themes, ThemeType } from '../utils/themes';

type ThemeContextType = {
  theme: ThemeType;
  selectedTheme: string;
  changeTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  selectedTheme: 'light',
  changeTheme: () => {},
});

const storage = new MMKV();

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = storage.getString('theme');
    if (savedTheme && themes[savedTheme]) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName: string) => {
    if (themes[themeName]) {
      setSelectedTheme(themeName);
      storage.set('theme', themeName);
    }
  };

  const theme = themes[selectedTheme];

  return (
    <ThemeContext.Provider value={{ theme, selectedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
