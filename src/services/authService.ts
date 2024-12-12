import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';

export const authService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Buscar informações adicionais do usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    return userData as User;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session?.user) {
      return null;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (userError) throw userError;

    return userData as User;
  },

  async register(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Criar registro na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            name,
            role: 'user',
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      return userData as User;
    }

    throw new Error('Erro ao criar usuário');
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!error && userData) {
          callback(userData as User);
        }
      } else if (event === 'SIGNED_OUT') {
        callback(null);
      }
    });
  },
}; 