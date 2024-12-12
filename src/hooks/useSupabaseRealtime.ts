import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

interface UseSupabaseRealtimeProps {
  table: string;
  onEvent: (payload: any, event: 'INSERT' | 'UPDATE' | 'DELETE') => void;
}

export function useSupabaseRealtime({ table, onEvent }: UseSupabaseRealtimeProps) {
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtime = async () => {
      channel = supabase
        .channel(`public:${table}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          (payload) => {
            const event = payload.eventType.toUpperCase() as 'INSERT' | 'UPDATE' | 'DELETE';
            onEvent(payload.new, event);
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, onEvent]);
} 