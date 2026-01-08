import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SecurityState, SecuritySettings } from '../../types/security';

const initialState: SecurityState = {
  settings: {
    deleteOriginalAfterProcessing: false,
    enableBiometricAuth: false,
    sessionTimeout: 3600000, // 1 hour in milliseconds
  },
  isSecure: true,
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    // Add reducers here
  },
});

export const { } = securitySlice.actions;
export default securitySlice.reducer;

