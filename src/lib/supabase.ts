import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== '' &&
    !supabaseUrl.includes('placeholder')
  );
};

// Crear cliente seguro con anon key. Si no hay claves, se inicializa con un placeholder
// pero isSupabaseConfigured indicará a la UI que muestre el asistente de conexión.
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key'
);

export interface SupabaseDiagnostic {
  isConfigured: boolean;
  status: 'connected' | 'not_configured' | 'table_missing' | 'rls_error' | 'network_error';
  message: string;
}

export async function checkSupabaseConnection(): Promise<SupabaseDiagnostic> {
  if (!isSupabaseConfigured()) {
    return {
      isConfigured: false,
      status: 'not_configured',
      message: 'Faltan configurar las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env',
    };
  }

  try {
    const { error } = await supabase.from('categorias').select('count', { count: 'exact', head: true });

    if (!error) {
      return {
        isConfigured: true,
        status: 'connected',
        message: 'Conexión exitosa con la base de datos PostgreSQL en Supabase.',
      };
    }

    if (error.code === '42P01' || error.message.includes('relation "public.categorias" does not exist')) {
      return {
        isConfigured: true,
        status: 'table_missing',
        message: 'La base de datos está conectada pero las tablas aún no existen. Ejecuta el script de migración SQL en Supabase.',
      };
    }

    if (error.code === '42501') {
      return {
        isConfigured: true,
        status: 'rls_error',
        message: 'Error de políticas de seguridad RLS (Row Level Security). Comprueba los permisos de lectura pública.',
      };
    }

    return {
      isConfigured: true,
      status: 'network_error',
      message: `Error al consultar Supabase: ${error.message}`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      isConfigured: true,
      status: 'network_error',
      message: `Error de red al contactar Supabase: ${msg}`,
    };
  }
}
