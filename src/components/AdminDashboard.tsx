"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { menuData } from '@/data/menu';
import { MenuItem } from '@/types/menu';
import { Edit2, Plus, Trash2, Upload, X } from 'lucide-react';
import { imageService } from '@/services/imageService';
import { menuService } from '@/services/menuService';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState(menuData[0].id);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadItemId, setUploadItemId] = useState<string | null>(null);

  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const currentCategory = menuData.find(category => category.id === selectedCategory);

  const handleImageUpload = async (itemId: string, file: File) => {
    setIsUploading(true);
    setUploadItemId(itemId);

    try {
      const path = `menu/${itemId}/${file.name}`;
      const imageUrl = await imageService.uploadImage(file, path);
      
      await menuService.updateMenuItem(itemId, {
        image_url: imageUrl
      });

      alert('Upload realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setIsUploading(false);
      setUploadItemId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <button
          onClick={() => logout()}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Sair
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {menuData.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {currentCategory && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{currentCategory.title}</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Item
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentCategory.items.map(item => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 relative group"
                >
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {/* TODO: Implementar edição */}}
                      className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {/* TODO: Implementar exclusão */}}
                      className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>

                  <div className="relative h-40 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
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
                          if (file) {
                            handleImageUpload(item.id, file);
                          }
                        }}
                      />
                      <div className="text-white flex flex-col items-center">
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-sm">
                          {isUploading && uploadItemId === item.id
                            ? 'Enviando...'
                            : 'Alterar Imagem'
                          }
                        </span>
                      </div>
                    </label>
                  </div>

                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="text-emerald-600 font-medium">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}