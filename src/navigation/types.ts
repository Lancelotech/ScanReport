export type RootStackParamList = {
  Home: undefined;
  Details: {
    itemId?: number;
    title?: string;
  };
  Login: undefined;
  Signup: undefined;
  Scan: undefined;
  Upload: undefined;
  Report: {
    reportId: string;
    documentId?: string;
  };
  ReportEdit: {
    reportId: string;
  };
  History: undefined;
};

export type AuthStackParamList = {
  EmailVerification: undefined;
  OTP: undefined;
  CreatePassword: undefined;
  AccountantsList: undefined;
  CreateEmailContacts: undefined;
  TermsAndConditions: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

