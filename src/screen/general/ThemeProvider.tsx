import { createContext, useEffect, useState } from "react";
type ThemecontextType = 'light' | 'dark';
  
export const ThemContext = createContext<ThemecontextType>('light')

const ThemeProvider = ({ children }: { children: ThemecontextType }) => {
    const [theme, setTheme] = useState('light');

    const toggleThem = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemContext.Provider value={'shyam'}>
            {children}
        </ThemContext.Provider>
    )
}
