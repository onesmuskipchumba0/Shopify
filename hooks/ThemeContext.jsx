import React, { createContext, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Define light and dark themes
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme in any component
export const useTheme = () => useContext(ThemeContext);

const lightTheme = StyleSheet.create({
  container: { backgroundColor: '#f5f5f5' },
  text: { color: '#333' },
});

const darkTheme = StyleSheet.create({
  container: { backgroundColor: '#333' },
  text: { color: '#f5f5f5' },
});
