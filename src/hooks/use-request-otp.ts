import { useCallback, useState } from 'react';
import { AuthService } from '../services/authService';

export interface UseRequestOtpOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface UseRequestOtpReturn {
  requestOtp: (email: string, ip?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook for requesting OTP (One-Time Password)
 * - Manages loading and error states
 * - Handles OTP request API calls
 * - Supports optional IP address parameter
 * 
 * @example
 * ```tsx
 * const { requestOtp, isLoading, error, clearError } = useRequestOtp({
 *   onSuccess: () => {
 *     console.log('OTP sent successfully');
 *   },
 *   onError: (error) => {
 *     console.error('Failed to send OTP:', error);
 *   }
 * });
 * 
 * // Request OTP with email only
 * await requestOtp('user@example.com');
 * 
 * // Request OTP with email and IP
 * await requestOtp('user@example.com', '192.168.1.1');
 * ```
 */
export function useRequestOtp(options: UseRequestOtpOptions = {}): UseRequestOtpReturn {
  const { onSuccess, onError } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOtp = useCallback(async (email: string, ip?: string) => {
    if (!email || !email.trim()) {
      const errorMessage = 'Email is required';
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await AuthService.requestOtp({ email: email.trim(), ip });
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to request OTP';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess, onError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    requestOtp,
    isLoading,
    error,
    clearError,
  };
}
