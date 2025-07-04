import ApiService from './api';

export interface Quote {
  id?: string;
  full_name: string;
  email: string;
  company_name?: string;
  phone: string;
  service_type: string;
  description: string;
  budget?: number;
  timeline?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'completed';
  created_at?: string;
  updated_at?: string;
  admin_notes?: string;
}

export class QuoteService {
  private static instance: QuoteService;

  private constructor() {
    // Pas besoin d'instancier ApiService car il utilise des méthodes statiques
  }

  public static getInstance(): QuoteService {
    if (!QuoteService.instance) {
      QuoteService.instance = new QuoteService();
    }
    return QuoteService.instance;
  }

  /**
   * Récupère tous les devis
   */
  async getAllQuotes(): Promise<Quote[]> {
    return ApiService.get<Quote[]>('/quotes');
  }

  /**
   * Récupère un devis par son ID
   */
  async getQuoteById(id: string): Promise<Quote> {
    return ApiService.get<Quote>(`/quotes/${id}`);
  }

  /**
   * Crée un nouveau devis
   */
  async createQuote(quote: Quote): Promise<Quote> {
    return ApiService.post<Quote>('/quotes', quote);
  }

  /**
   * Met à jour un devis existant
   */
  async updateQuote(id: string, quote: Quote): Promise<Quote> {
    return ApiService.put<Quote>(`/quotes/${id}`, quote);
  }

  /**
   * Met à jour le statut d'un devis
   */
  async updateQuoteStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'completed', adminNotes?: string): Promise<Quote> {
    return ApiService.put<Quote>(`/quotes/${id}/status`, { status, admin_notes: adminNotes });
  }

  /**
   * Supprime un devis
   */
  async deleteQuote(id: string): Promise<void> {
    return ApiService.delete<void>(`/quotes/${id}`);
  }
}
