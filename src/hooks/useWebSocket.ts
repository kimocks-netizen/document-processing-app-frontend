// src/hooks/useWebSocket.ts
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setProgress, setJobStatus } from '@/store/slices/jobSlice';

export const useWebSocket = (jobId: string | null) => {
  const dispatch = useAppDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!jobId) return;

    // For now, i will use polling instead of WebSocket since Supabase free plan
    // doesn't support WebSocket connections easily
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/results/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'completed' || data.status === 'failed') {
            clearInterval(pollInterval);
          }
          dispatch(setJobStatus(data.status));
          dispatch(setProgress(data.progress || 0));
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000);

    return () => {
      clearInterval(pollInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [jobId, dispatch]);

  return null;
};