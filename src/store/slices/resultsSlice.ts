// src/store/slices/resultsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultsState {
  data: {
    fullName: string;
    age: number;
    rawText: string;
    aiExtractedData: any;
    processingMethod: 'standard' | 'ai';
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ResultsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<ResultsState['data']>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResultsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetResults: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setResults,
  setLoading,
  setResultsError,
  resetResults,
} = resultsSlice.actions;

export default resultsSlice.reducer;