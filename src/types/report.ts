import { ExtractedField } from './extraction';

export interface Report {
  id: string;
  documentId: string;
  userId: string;
  fields: ExtractedField[];
  version: number;
  createdAt: string;
  updatedAt: string;
  isFinal: boolean;
}

export interface ReportState {
  reports: Report[];
  currentReport: Report | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

export interface ReportEdit {
  fieldName: string;
  newValue: string | number;
}

