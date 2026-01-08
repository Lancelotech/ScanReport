import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentState, Document, ScanOptions } from '../../types/document';

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { } = documentSlice.actions;
export default documentSlice.reducer;

