export interface ExtractedField {
  name: string;
  value: string | number | null;
  confidence: number;
  isEditable: boolean;
}

export interface ExtractionSchema {
  documentType: string;
  fields: ExtractedField[];
}

export interface ExtractionResult {
  id: string;
  documentId: string;
  schema: ExtractionSchema;
  rawData: Record<string, any>;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExtractionState {
  currentExtraction: ExtractionResult | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  progress: number;
}

