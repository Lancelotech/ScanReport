import axios, { isAxiosError } from 'axios';
import { LoginCredentials, SignupCredentials, User } from '../types/auth';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://us-central1-scanreport-d1a16.cloudfunctions.net/api';

export class AuthService {
  // Add authentication methods here
  static async login(credentials: LoginCredentials): Promise<User> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async signup(credentials: SignupCredentials): Promise<User> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async logout(): Promise<void> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async getCurrentUser(): Promise<User | null> {
    // Implementation here
    throw new Error('Not implemented');
  }
  static async requestOtp(params: { email: string; ip?: string }): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/otp/request`, {
        email: params.email,
        ...(params.ip && { ip: params.ip }),
      });
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to request OTP');
      }
      throw error;
    }
  }
}


