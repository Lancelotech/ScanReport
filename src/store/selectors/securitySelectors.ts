import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSecurityState = (state: RootState) => state.security;

export const selectSecuritySettings = createSelector(
  [selectSecurityState],
  (securityState) => securityState?.settings
);

export const selectIsSecure = createSelector(
  [selectSecurityState],
  (securityState) => securityState?.isSecure ?? true
);

