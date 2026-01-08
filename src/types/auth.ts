export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface CreateUserCredentials {
  fullName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface CreateEmailContactsCredentials {
  contactType: 0 | 1; // 0 = user, 1 = accountant
  emails: string; // This will be converted to string[] via tags
}
