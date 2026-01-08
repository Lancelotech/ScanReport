import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportState, Report, ReportEdit } from '../../types/report';

const initialState: ReportState = {
  reports: [],
  currentReport: null,
  isLoading: false,
  isSaving: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { } = reportSlice.actions;
export default reportSlice.reducer;

