// src/lib/constants.ts
export const API_ENDPOINTS = {
    UPLOAD: '/api/upload',
    RESULTS: '/api/results',
    HEALTH: '/api/health',
  };
  
  export const JOB_STATUS = {
    IDLE: 'idle',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const;
  
  export const PROCESSING_METHODS = {
    STANDARD: 'standard',
    AI: 'ai',
  } as const;