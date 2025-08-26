// src/lib/config.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};