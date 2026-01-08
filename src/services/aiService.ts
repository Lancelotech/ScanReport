import { ExtractionResult, ExtractionSchema } from '../types/extraction';
import { Document } from '../types/document';

export class AIService {
  // Add AI extraction methods here
  static async extractData(
    document: Document,
    schema: ExtractionSchema
  ): Promise<ExtractionResult> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async processDocument(documentId: string): Promise<ExtractionResult> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async getExtractionStatus(
    extractionId: string
  ): Promise<{ status: string; progress: number }> {
    // Implementation here
    throw new Error('Not implemented');
  }
}

