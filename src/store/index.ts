// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/themeSlice';
import uploadReducer from '@/store/slices/uploadSlice';
import jobReducer from '@/store/slices/jobSlice';
import resultsReducer from '@/store/slices/resultsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    upload: uploadReducer,
    job: jobReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;