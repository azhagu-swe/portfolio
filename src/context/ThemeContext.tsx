// context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../styles/theme';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from cookie
  useEffect(() => {
    const storedTheme = document.cookie.replace(
      /(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.cookie = `theme=${newTheme ? 'dark' : 'light'}; path=/; max-age=31536000`; // 1-year expiry
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
