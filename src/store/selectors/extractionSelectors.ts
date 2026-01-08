import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectExtractionState = (state: RootState) => state.extraction;

export const selectCurrentExtraction = createSelector(
  [selectExtractionState],
  (extractionState) => extractionState?.currentExtraction ?? null
);

export const selectExtractionLoading = createSelector(
  [selectExtractionState],
  (extractionState) => extractionState?.isLoading ?? false
);

export const selectIsProcessing = createSelector(
  [selectExtractionState],
  (extractionState) => extractionState?.isProcessing ?? false
);

export const selectExtractionProgress = createSelector(
  [selectExtractionState],
  (extractionState) => extractionState?.progress ?? 0
);

export const selectExtractionError = createSelector(
  [selectExtractionState],
  (extractionState) => extractionState?.error ?? null
);

