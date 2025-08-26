// frontend/lib/api.ts
import { JobState } from '@/store/slices/jobSlice';
import { getApiUrl } from './env';

const API_BASE_URL = getApiUrl();

export interface UploadResponse {
  message: string;
  jobId: string;
}

export interface ResultsResponse {
  jobId: string;
  status: JobState['status'];
  fullName: string;
  age: number;
  rawText: string;
  aiExtractedData?: any;
  processingMethod: 'standard' | 'ai';
  progress?: number;
}

export const api = {
  async uploadDocument(formData: FormData): Promise<UploadResponse> {
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Upload failed');
    }

    return response.json();
  },

  async getResults(jobId: string): Promise<ResultsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/results/${jobId}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to fetch results');
    }

    return response.json();
  },

  async getAllResults(): Promise<{ jobs: any[] }> {
    const response = await fetch(`${API_BASE_URL}/api/results`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to fetch results');
    }

    return response.json();
  },

  async deleteJob(jobId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/results/${jobId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to delete job');
    }
  },

  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (!response.ok) {
      throw new Error('Backend not healthy');
    }

    return response.json();
  },
};