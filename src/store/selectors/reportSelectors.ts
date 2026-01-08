import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectReportState = (state: RootState) => state.report;

export const selectReports = createSelector(
  [selectReportState],
  (reportState) => reportState?.reports ?? []
);

export const selectCurrentReport = createSelector(
  [selectReportState],
  (reportState) => reportState?.currentReport ?? null
);

export const selectReportLoading = createSelector(
  [selectReportState],
  (reportState) => reportState?.isLoading ?? false
);

export const selectIsSaving = createSelector(
  [selectReportState],
  (reportState) => reportState?.isSaving ?? false
);

export const selectReportError = createSelector(
  [selectReportState],
  (reportState) => reportState?.error ?? null
);

