"use client"

import React, { useState } from 'react';
import { MenuItem, EditMenuItemProps } from '@/types/menu';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { imageService } from '@/services/imageService';
import { menuService } from '@/services/menuService';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function MenuItemEdit({ item, onSave, onCancel }: EditMenuItemProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [editedItem, setEditedItem] = useState<MenuItem>({
    ...item,
    price: Number(item.price)
  });
  const [isUploading, setIsUploading] = useState(false);

  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const path = `menu/${item.id}/${file.name}`;
      const imageUrl = await imageService.uploadImage(file, path);
      setEditedItem(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(editedItem);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar as alterações');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden group">
        {editedItem.image ? (
          <Image
            src={editedItem.image}
            alt={editedItem.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          <div className="text-white flex flex-col items-center">
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-sm">
              {isUploading ? 'Enviando...' : 'Alterar Imagem'}
            </span>
          </div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="description"
          value={editedItem.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}