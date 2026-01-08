import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import reducers here
import exampleReducer from './slices/exampleSlice';
import authReducer from './slices/authSlice';
import documentReducer from './slices/documentSlice';
import extractionReducer from './slices/extractionSlice';
import reportReducer from './slices/reportSlice';
import historyReducer from './slices/historySlice';
import securityReducer from './slices/securitySlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    example: exampleReducer,
    auth: authReducer,
    document: documentReducer,
    extraction: extractionReducer,
    report: reportReducer,
    history: historyReducer,
    security: securityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

