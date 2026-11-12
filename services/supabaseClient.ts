/**
 * Supabase Client Configuration & Helper Service
 * 
 * Este módulo gestiona la conexión con el Backend de Supabase.
 * Para activar el backend:
 * 1. Instala el SDK: npm install @supabase/supabase-js
 * 2. Asigna VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env.local
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = import.meta.env.VITE_SUPABASE_URL || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  };
};

/**
 * Esquema de datos para las tablas principales de la plataforma
 */
export interface UserProgress {
  user_id: string;
  completed_exercises: number[];
  completed_lessons: string[];
  total_score: number;
  updated_at: string;
}

export interface UserBookmark {
  id: string;
  user_id: string;
  item_type: 'periodic_element' | 'exercise' | 'course';
  item_id: string;
  created_at: string;
}
