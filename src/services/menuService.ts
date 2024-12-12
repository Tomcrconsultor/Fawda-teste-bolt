import { supabase } from '@/lib/supabase';
import { MenuItem, Category } from '@/types/menu';

const STORAGE_URL = "https://vobaklixhkvwmmmpajeb.supabase.co/storage/v1/object/public/menu-images";

export const menuService = {
  async getCategories(): Promise<Category[]> {
    try {
      console.log('Buscando categorias...');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      throw err;
    }
  },

  async getMenuItems(): Promise<MenuItem[]> {
    try {
      console.log('Buscando itens do menu...');
      
      const { data, error } = await supabase
        .from('menu_items')
        .select(`
          *,
          category:categories(*)
        `)
        .order('category_id, name');

      if (error) {
        console.error('Erro ao buscar itens:', error);
        throw error;
      }

      return data || [];
    } catch (err) {
      console.error('Erro ao buscar itens:', err);
      throw err;
    }
  },

  async updateMenuItem(item: MenuItem): Promise<MenuItem> {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update({
          name: item.name,
          description: item.description,
          price: item.price,
          category_id: item.category_id,
          image_url: item.image_url,
          available: item.available,
          serve_people: item.serve_people,
          preparation_time: item.preparation_time,
          updated_at: new Date().toISOString()
        })
        .eq('id', item.id)
        .select(`*, category:categories(*)`)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Erro ao atualizar item:', err);
      throw err;
    }
  },

  async createMenuItem(item: Partial<MenuItem>): Promise<MenuItem> {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([{
          ...item,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select(`*, category:categories(*)`)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Erro ao criar item:', err);
      throw err;
    }
  },

  async deleteMenuItem(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Erro ao deletar item:', err);
      throw err;
    }
  },

  async uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `menu-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      return `${STORAGE_URL}/${fileName}`;
    } catch (err) {
      console.error('Erro ao fazer upload da imagem:', err);
      throw err;
    }
  },

  subscribeToChanges(callback: (payload: any) => void) {
    return supabase
      .channel('menu-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'menu_items'
        },
        callback
      )
      .subscribe();
  }
}; 