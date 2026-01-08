import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtractionState, ExtractionResult } from '../../types/extraction';

const initialState: ExtractionState = {
  currentExtraction: null,
  isLoading: false,
  isProcessing: false,
  error: null,
  progress: 0,
};

const extractionSlice = createSlice({
  name: 'extraction',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { } = extractionSlice.actions;
export default extractionSlice.reducer;

