// src/store/slices/uploadSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
  file: File | null;
  firstName: string;
  lastName: string;
  dob: string;
  processingMethod: 'standard' | 'ai';
  isUploading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  file: null,
  firstName: '',
  lastName: '',
  dob: '',
  processingMethod: 'standard',
  isUploading: false,
  error: null,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      state.file = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setDob: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    setProcessingMethod: (state, action: PayloadAction<'standard' | 'ai'>) => {
      state.processingMethod = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetUpload: (state) => {
      state.file = null;
      state.firstName = '';
      state.lastName = '';
      state.dob = '';
      state.processingMethod = 'standard';
      state.isUploading = false;
      state.error = null;
    },
  },
});

export const {
  setFile,
  setFirstName,
  setLastName,
  setDob,
  setProcessingMethod,
  setUploading,
  setError,
  resetUpload,
} = uploadSlice.actions;

export default uploadSlice.reducer;