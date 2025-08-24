// src/lib/mappers.ts
import { ResultsResponse } from './api';

export const mapApiResultsToState = (apiResponse: ResultsResponse) => ({
  fullName: apiResponse.fullName,
  age: apiResponse.age,
  rawText: apiResponse.rawText,
  aiExtractedData: apiResponse.aiExtractedData,
  processingMethod: apiResponse.processingMethod,
});