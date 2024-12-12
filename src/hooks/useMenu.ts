import { useState, useEffect } from 'react';
import { MenuItem, Category } from '@/types/menu';
import { menuService } from '@/services/menuService';

export function useMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    const subscription = menuService.subscribeToChanges(() => {
      fetchData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const [categoriesData, menuData] = await Promise.all([
        menuService.getCategories(),
        menuService.getMenuItems()
      ]);

      setCategories(categoriesData);
      setMenuItems(menuData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
      console.error('Erro ao carregar dados:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenuItem = async (item: MenuItem) => {
    try {
      setError(null);
      const updatedItem = await menuService.updateMenuItem(item);
      setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
      return updatedItem;
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar item');
      throw err;
    }
  };

  const createMenuItem = async (item: Partial<MenuItem>) => {
    try {
      setError(null);
      const newItem = await menuService.createMenuItem(item);
      setMenuItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar item');
      throw err;
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      setError(null);
      await menuService.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir item');
      throw err;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setError(null);
      return await menuService.uploadImage(file);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload da imagem');
      throw err;
    }
  };

  return {
    menuItems,
    categories,
    isLoading,
    error,
    updateMenuItem,
    createMenuItem,
    deleteMenuItem,
    uploadImage,
    refreshData: fetchData
  };
} 