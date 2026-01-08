export interface SecuritySettings {
  deleteOriginalAfterProcessing: boolean;
  enableBiometricAuth: boolean;
  sessionTimeout: number;
}

export interface SecurityState {
  settings: SecuritySettings;
  isSecure: boolean;
}

