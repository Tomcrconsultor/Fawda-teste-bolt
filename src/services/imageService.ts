import { supabase } from '@/lib/supabase';

export const imageService = {
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('menu-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('menu-images')
      .getPublicUrl(path);

    return publicUrl;
  },

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('menu-images')
      .remove([path]);

    if (error) throw error;
  }
}; 