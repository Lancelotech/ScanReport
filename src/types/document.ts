export type DocumentStatus = 'uploading' | 'processing' | 'ready' | 'failed';

export type DocumentType = 'receipt' | 'invoice' | 'form' | 'other';

export interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  thumbnailUrl?: string;
  type: DocumentType;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  pageCount?: number;
}

export interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

export interface ScanOptions {
  autoCrop: boolean;
  perspectiveCorrection: boolean;
  imageEnhancement: boolean;
}

