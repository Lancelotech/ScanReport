import { Document, DocumentType, ScanOptions } from '../types/document';

export class DocumentService {
  // Add document methods here
  static async uploadDocument(
    fileUri: string,
    fileName: string,
    documentType: DocumentType
  ): Promise<Document> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async scanDocument(options: ScanOptions): Promise<Document> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async getDocument(documentId: string): Promise<Document> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async deleteDocument(documentId: string): Promise<void> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async getDocuments(): Promise<Document[]> {
    // Implementation here
    throw new Error('Not implemented');
  }
}

