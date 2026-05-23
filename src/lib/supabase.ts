import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Expose true client ONLY if variables are set
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check and direct auth / database calls
export const getAuthClient = () => {
  if (isSupabaseConfigured && supabase) {
    return supabase.auth;
  }
  
  // Return a mock auth object matching the supabase.auth shape
  return {
    signUp: async ({ email, password }: any) => {
      if (typeof window !== 'undefined') {
        const user = { email, id: 'usr_' + Math.random().toString(36).substr(2, 9) };
        localStorage.setItem('clipmind_user', JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: new Error('Window undefined') };
    },
    signInWithPassword: async ({ email, password }: any) => {
      if (typeof window !== 'undefined') {
        const user = { email, id: 'usr_' + Math.random().toString(36).substr(2, 9) };
        localStorage.setItem('clipmind_user', JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: new Error('Window undefined') };
    },
    signOut: async () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('clipmind_user');
        localStorage.removeItem('clipmind_subscription');
        return { error: null };
      }
      return { error: null };
    },
    getUser: async () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('clipmind_user');
        return { data: { user: user ? JSON.parse(user) : null }, error: null };
      }
      return { data: { user: null }, error: null };
    }
  };
};
