import { useState, useCallback } from 'react';
import {
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

interface UseInputPropsReturn {
  isFocused: boolean;
  handleFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  handleBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  inputProps: RNTextInputProps;
}

/**
 * Custom hook for managing TextInput props and focus state
 * Handles all TextInput props and focus/blur events
 */
export function useInputProps(
  props: RNTextInputProps
): UseInputPropsReturn {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    },
    [props]
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    },
    [props]
  );

  const inputProps: RNTextInputProps = {
    ...props,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return {
    isFocused,
    handleFocus,
    handleBlur,
    inputProps,
  };
}

