import { useCallback, useState } from 'react';

export interface UseOtpOptions {
  onResend?: () => Promise<void>;
  onValidate?: (otp: string) => Promise<boolean>;
  tokenNumber?: number;
}

export interface UseOtpReturn {
  otp: string;
  setOtp: (otp: string) => void;
  token: string;
  isLoading: boolean;
  error: string | null;
  resendOtp: () => Promise<void>;
  validateOtp: (otpValue?: string) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Hook for managing OTP (One-Time Password) functionality
 * - Manages OTP state (6 digits)
 * - Handles token number state (converted to string)
 * - Provides resend and validate functions
 * 
 * @example
 * ```tsx
 * const { otp, setOtp, token, resendOtp, validateOtp, isLoading } = useOtp({
 *   tokenNumber: 123456,
 *   onResend: async () => {
 *     // Resend OTP logic
 *   },
 *   onValidate: async (otp) => {
 *     // Validate OTP logic
 *     return true;
 *   }
 * });
 * ```
 */
export function useOtp(options: UseOtpOptions = {}): UseOtpReturn {
  const { onResend, onValidate, tokenNumber } = options;
  
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Convert token number to string
  const token = tokenNumber !== undefined ? String(tokenNumber) : '';

  const resendOtp = useCallback(async () => {
    if (!onResend) {
      console.warn('onResend callback not provided');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await onResend();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resend OTP';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [onResend]);

  const validateOtp = useCallback(async (otpValue?: string): Promise<boolean> => {
    if (!onValidate) {
      console.warn('onValidate callback not provided');
      return false;
    }

    const otpToValidate = otpValue ?? otp;
    
    if (!otpToValidate || otpToValidate.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const isValid = await onValidate(otpToValidate);
      if (!isValid) {
        setError('Invalid OTP. Please try again.');
      }
      return isValid;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to validate OTP';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [onValidate, otp]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    otp,
    setOtp,
    token,
    isLoading,
    error,
    resendOtp,
    validateOtp,
    clearError,
  };
}
