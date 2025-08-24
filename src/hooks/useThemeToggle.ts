// src/hooks/useThemeToggle.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme } from '@/store/slices/themeSlice';

export const useThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      dispatch(setTheme(savedMode === 'true'));
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setTheme(true));
    }
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    dispatch(setTheme(!isDarkMode));
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};