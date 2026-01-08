import { Document, DocumentStatus } from './document';
import { Report } from './report';

export interface HistoryItem {
  id: string;
  document: Document;
  report: Report | null;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryState {
  items: HistoryItem[];
  isLoading: boolean;
  error: string | null;
  filters: HistoryFilters;
}

export interface HistoryFilters {
  documentType?: string;
  status?: DocumentStatus;
  dateFrom?: string;
  dateTo?: string;
}

