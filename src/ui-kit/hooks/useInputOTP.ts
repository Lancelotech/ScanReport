import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';

export interface UseInputOTPOptions {
  value: string;
  onChangeText: (text: string) => void;
  length?: number;
  autoFocus?: boolean;
}

export interface UseInputOTPReturn {
  focusedIndex: number | null;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>;
  otpArray: string[];
  handleChangeText: (text: string, index: number) => void;
  handleKeyPress: (e: any, index: number) => void;
  handleFocus: (index: number) => void;
  handleBlur: () => void;
}

/**
 * Hook for managing OTP input logic
 * - Manages focus state and input refs
 * - Handles text changes with auto-focus next input
 * - Handles backspace to go to previous input
 * - Creates OTP array from value string
 */
export function useInputOTP({
  value,
  onChangeText,
  length = 6,
  autoFocus = false,
}: UseInputOTPOptions): UseInputOTPReturn {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(autoFocus ? 0 : null);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const otpArray = value.split('').slice(0, length);
  while (otpArray.length < length) {
    otpArray.push('');
  }

  const handleChangeText = useCallback((text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, '');
    
    if (digit.length > 1) {
      // Handle paste: take only the first digit
      const newOtp = value.split('');
      newOtp[index] = digit[0];
      onChangeText(newOtp.join('').slice(0, length));
      
      // Focus next input if available
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
      return;
    }

    const newOtp = value.split('');
    newOtp[index] = digit;
    const newValue = newOtp.join('').slice(0, length);
    onChangeText(newValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  }, [value, onChangeText, length]);

  const handleKeyPress = useCallback((e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      // If current input is empty and backspace is pressed, focus previous input
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  }, [value]);

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  return {
    focusedIndex,
    inputRefs,
    otpArray,
    handleChangeText,
    handleKeyPress,
    handleFocus,
    handleBlur,
  };
}
