import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Базовый селектор - получает весь example state
const selectExampleState = (state: RootState) => state.example;

// Простой селектор - получает значение
export const selectExampleValue = createSelector(
  [selectExampleState],
  (exampleState) => exampleState?.value ?? 0
);

// Селектор с вычислениями - удвоенное значение
export const selectDoubleValue = createSelector(
  [selectExampleValue],
  (value) => value * 2
);

// Селектор с несколькими входными данными
export const selectIsPositive = createSelector(
  [selectExampleValue],
  (value) => value > 0
);

// Селектор с комбинацией данных (пример для будущего расширения)
export const selectFormattedValue = createSelector(
  [selectExampleValue, selectIsPositive],
  (value, isPositive) => {
    return {
      value,
      isPositive,
      formatted: `Значение: ${value}`,
    };
  }
);

