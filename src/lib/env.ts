// Environment utility functions
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const getApiUrl = () => {
  // PRIORITY 1: Check if we're in production (Vercel, etc.) - ALWAYS override env vars
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If we're on Vercel or any production domain, ALWAYS use Fly.io
    if (hostname.includes('vercel.app') || 
        hostname.includes('document-processing-app-ashen.vercel.app') || 
        hostname.includes('netlify.app') ||
        hostname.includes('github.io') ||
        hostname !== 'localhost' && hostname !== '127.0.0.1') {
      console.log('Production detected, using Fly.io backend');
      return 'https://backend-document-processing-app.fly.dev';
    }
  }
  
  // PRIORITY 2: Use environment variable (only for localhost)
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
    console.log('🏠 Local development detected, using env var:', envUrl);
    return envUrl;
  }
  
  // PRIORITY 3: Fallback to localhost
  console.log('⚠️ No specific environment detected, using localhost fallback');
  return 'http://localhost:3001';
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

export const isVercel = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('vercel.app');
};

export const getCurrentApiUrl = () => {
  const apiUrl = getApiUrl();
  console.log('🌐 Current API URL:', apiUrl);
  return apiUrl;
};
