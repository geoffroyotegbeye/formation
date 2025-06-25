import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export interface Media {
  type: 'image' | 'video';
  url: string;
  preview?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  media_urls: string[];
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export const getTestimonials = async (limit: number = 6): Promise<Testimonial[]> => {
  try {
    const response = await axios.get(`${API_URL}/testimonials/`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Récupérer tous les témoignages (avec pagination optionnelle)
export const getAllTestimonials = async (status?: 'pending' | 'approved' | 'rejected'): Promise<Testimonial[]> => {
  try {
    const response = await axios.get<Testimonial[]>(`${API_URL}/testimonials/`, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    throw error;
  }
};

// Mettre à jour un témoignage
export const updateTestimonial = async (id: string, updateData: Partial<Testimonial>): Promise<Testimonial> => {
  try {
    const response = await axios.patch<Testimonial>(`${API_URL}/testimonials/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
};

// Supprimer un témoignage
export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/testimonials/${id}`);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};

export const createTestimonial = async (testimonialData: Omit<Testimonial, 'id' | 'created_at' | 'updated_at' | 'status'>, files: File[] = []): Promise<Testimonial> => {
  try {
    const formData = new FormData();
    
    // Ajouter les champs du formulaire
    formData.append('name', testimonialData.name);
    formData.append('role', testimonialData.role);
    formData.append('content', testimonialData.content);
    formData.append('rating', testimonialData.rating.toString());
    
    // Ajouter les fichiers
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    
    const response = await axios.post<Testimonial>(`${API_URL}/testimonials/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // S'assurer que la réponse correspond au type Testimonial attendu
    const testimonial: Testimonial = {
      ...response.data,
      media_urls: response.data.media_urls || [],
      created_at: response.data.created_at || new Date().toISOString(),
      id: response.data.id || Date.now().toString(),
      status: response.data.status || 'pending',
      name: response.data.name,
      role: response.data.role,
      content: response.data.content,
      rating: response.data.rating
    };
    
    return testimonial;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
};
