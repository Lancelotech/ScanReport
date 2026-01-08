import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectHistoryState = (state: RootState) => state.history;

export const selectHistoryItems = createSelector(
  [selectHistoryState],
  (historyState) => historyState?.items ?? []
);

export const selectHistoryLoading = createSelector(
  [selectHistoryState],
  (historyState) => historyState?.isLoading ?? false
);

export const selectHistoryFilters = createSelector(
  [selectHistoryState],
  (historyState) => historyState?.filters ?? {}
);

export const selectHistoryError = createSelector(
  [selectHistoryState],
  (historyState) => historyState?.error ?? null
);

