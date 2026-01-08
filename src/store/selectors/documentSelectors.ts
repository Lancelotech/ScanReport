import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectDocumentState = (state: RootState) => state.document;

export const selectDocuments = createSelector(
  [selectDocumentState],
  (documentState) => documentState?.documents ?? []
);

export const selectCurrentDocument = createSelector(
  [selectDocumentState],
  (documentState) => documentState?.currentDocument ?? null
);

export const selectDocumentLoading = createSelector(
  [selectDocumentState],
  (documentState) => documentState?.isLoading ?? false
);

export const selectUploadProgress = createSelector(
  [selectDocumentState],
  (documentState) => documentState?.uploadProgress ?? 0
);

export const selectDocumentError = createSelector(
  [selectDocumentState],
  (documentState) => documentState?.error ?? null
);

