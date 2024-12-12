import { create } from 'zustand';
import { AuthState, User, LoginCredentials } from '@/types/auth';
import { authService } from '@/services/authService';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      const user = await authService.login(credentials.email, credentials.password);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao fazer login', 
        loading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao fazer logout',
        loading: false 
      });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null });
    try {
      const user = await authService.register(email, password, name);
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao registrar',
        loading: false 
      });
      throw error;
    }
  },

  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  initialize: async () => {
    set({ loading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: !!user, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao inicializar',
        loading: false 
      });
    }
  },
}));