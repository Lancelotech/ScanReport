import { Report, ReportEdit } from '../types/report';

export class ReportService {
  // Add report methods here
  static async createReport(documentId: string): Promise<Report> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async getReport(reportId: string): Promise<Report> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async updateReport(
    reportId: string,
    edits: ReportEdit[]
  ): Promise<Report> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async saveReport(reportId: string): Promise<Report> {
    // Implementation here
    throw new Error('Not implemented');
  }

  static async exportReport(reportId: string, format: 'pdf' | 'json'): Promise<string> {
    // Implementation here
    throw new Error('Not implemented');
  }
}

