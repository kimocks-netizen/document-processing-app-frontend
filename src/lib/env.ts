// Environment utility functions
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
};

export const getSupabaseUrl = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://biklzpyuarncssdbwfmk.supabase.co';
};

export const getSupabaseKey = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa2x6cHl1YXJuY3NzZGJ3Zm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjQzMDAsImV4cCI6MjA3MTUwMDMwMH0.LYCQhm6L3RHoTW-G3KbpTOLQuGJf4gzHatjzlzYJAKs';
};

export const getEnvironment = () => {
  if (isDevelopment) return 'development';
  if (isProduction) return 'production';
  return 'unknown';
};

export const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
};

export const isProductionDomain = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1';
};
