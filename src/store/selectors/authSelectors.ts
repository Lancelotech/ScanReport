import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (authState) => authState?.user ?? null
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (authState) => authState?.isAuthenticated ?? false
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (authState) => authState?.isLoading ?? false
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (authState) => authState?.error ?? null
);

