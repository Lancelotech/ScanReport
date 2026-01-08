import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryState, HistoryItem, HistoryFilters } from '../../types/history';

const initialState: HistoryState = {
  items: [],
  isLoading: false,
  error: null,
  filters: {},
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { } = historySlice.actions;
export default historySlice.reducer;

