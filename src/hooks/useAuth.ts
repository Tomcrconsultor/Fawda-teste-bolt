import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Verifica a sessão atual
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setState(prev => ({ ...prev, error: error.message, isLoading: false }));
        return;
      }

      if (session) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata.role || 'user'
          },
          isLoading: false,
          error: null
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    // Escuta mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata.role || 'user'
          },
          isLoading: false,
          error: null
        });
      } else {
        setState({
          user: null,
          isLoading: false,
          error: null
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Se for o email de teste e não existir, cria primeiro
      if (email === 'admin@teste.com') {
        const { data: existingUsers } = await supabase
          .from('users')
          .select('email')
          .eq('email', email)
          .single();

        if (!existingUsers) {
          // Cria o usuário
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                role: 'admin'
              }
            }
          });

          if (signUpError) throw signUpError;
        }
      }
      
      // Faz o login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setState({
          user: {
            id: data.user.id,
            email: data.user.email!,
            role: data.user.user_metadata.role || 'user'
          },
          isLoading: false,
          error: null
        });
      }

      return data;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Erro ao fazer login',
        isLoading: false
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState({
        user: null,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Erro ao fazer logout',
        isLoading: false
      }));
      throw error;
    }
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    signIn,
    signOut,
  };
} 