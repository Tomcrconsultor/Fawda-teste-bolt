"use client"

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';

interface Settings {
  id?: string;
  site_name?: string;
  site_description?: string;
  business_name?: string;
  business_address?: string;
  business_phone?: string;
  business_email?: string;
  theme_primary_color?: string;
  theme_secondary_color?: string;
  api_key?: string;
  api_url?: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const loadSettings = useCallback(async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);

      const { data: existingSettings, error: fetchError } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // Se não existir configurações, cria uma nova
          const { data: newSettings, error: insertError } = await supabase
            .from('settings')
            .insert([{
              site_name: 'SiriaExpress',
              site_description: 'Comida Árabe Autêntica',
              business_name: 'SiriaExpress',
              business_address: 'Rua Exemplo, 123',
              business_phone: '(11) 99999-9999',
              business_email: 'contato@siriaexpress.com',
              theme_primary_color: '#10b981',
              theme_secondary_color: '#6b7280'
            }])
            .select()
            .single();

          if (insertError) {
            console.error('Erro ao criar configurações:', insertError);
            throw new Error('Erro ao criar configurações iniciais');
          }
          setSettings(newSettings);
        } else {
          console.error('Erro ao buscar configurações:', fetchError);
          throw new Error('Erro ao carregar configurações');
        }
      } else {
        setSettings(existingSettings);
      }
    } catch (err: any) {
      console.error('Erro ao carregar configurações:', err);
      setError(err.message || 'Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    loadSettings();

    // Inscreve-se para atualizações em tempo real
    const channel = supabase
      .channel('settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'settings'
        },
        (payload) => {
          console.log('Configurações atualizadas:', payload);
          loadSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadSettings]);

  const updateSettings = async (newSettings: Partial<Settings>): Promise<boolean> => {
    if (!user) {
      router.push('/login');
      return false;
    }

    if (!settings?.id) {
      setError('Configurações não inicializadas');
      return false;
    }

    try {
      setError(null);

      const { error: updateError } = await supabase
        .from('settings')
        .update({
          ...newSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);

      if (updateError) {
        console.error('Erro ao atualizar configurações:', updateError);
        throw new Error('Erro ao salvar alterações');
      }

      // Atualiza o estado local imediatamente para melhor UX
      setSettings(prev => prev ? { ...prev, ...newSettings } : newSettings);
      
      return true;
    } catch (err: any) {
      console.error('Erro ao atualizar configurações:', err);
      setError(err.message || 'Erro ao atualizar configurações');
      return false;
    }
  };

  const refreshSettings = useCallback(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    refreshSettings
  };
} 