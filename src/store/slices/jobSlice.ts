// src/store/slices/jobSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobState {
  jobId: string | null;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  progress: number;
}

const initialState: JobState = {
  jobId: null,
  status: 'idle',
  progress: 0,
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    setJobStatus: (state, action: PayloadAction<JobState['status']>) => {
      state.status = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    resetJob: (state) => {
      state.jobId = null;
      state.status = 'idle';
      state.progress = 0;
    },
  },
});

export const {
  setJobId,
  setJobStatus,
  setProgress,
  resetJob,
} = jobSlice.actions;

export default jobSlice.reducer;
