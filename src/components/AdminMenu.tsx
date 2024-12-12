"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { Pencil, Trash2, Plus, Save, X, Image as ImageIcon, AlertCircle, Loader2 } from 'lucide-react';
import { useMenu } from '@/hooks/useMenu';

export default function AdminMenu() {
  const {
    menuItems,
    categories,
    isLoading,
    error: apiError,
    updateMenuItem,
    createMenuItem,
    deleteMenuItem,
    uploadImage
  } = useMenu();

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSaveItem = async (item: MenuItem) => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    
    try {
      let imageUrl = item.image_url;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const updatedItem = {
        ...item,
        image_url: imageUrl
      };

      if (item.id) {
        // Atualizar item existente
        await updateMenuItem(updatedItem);
        setSuccess('Item atualizado com sucesso!');
      } else {
        // Criar novo item
        await createMenuItem(updatedItem);
        setSuccess('Item criado com sucesso!');
      }

      setEditingItem(null);
      setIsAddingItem(false);
      setSelectedImage(null);
    } catch (error: any) {
      setError('Erro ao salvar item: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    setError('');
    try {
      await deleteMenuItem(id);
      setSuccess('Item excluído com sucesso!');
    } catch (error: any) {
      setError('Erro ao excluir item: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Cardápio</h2>
        <button
          onClick={() => {
            setIsAddingItem(true);
            setEditingItem({
              id: '',
              name: '',
              price: 0,
              category_id: '',
              available: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            } as MenuItem);
          }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Adicionar Item
        </button>
      </div>

      {/* Mensagens de Feedback */}
      {(error || apiError) && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          {error || apiError}
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-lg">
          {success}
        </div>
      )}

      {/* Lista de Itens */}
      <div className="grid gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            {editingItem?.id === item.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      value={editingItem.category_id}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category_id: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Selecione uma categoria</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preço (R$)
                    </label>
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Serve (pessoas)
                    </label>
                    <input
                      type="number"
                      value={editingItem.serve_people || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          serve_people: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tempo de Preparo
                    </label>
                    <input
                      type="text"
                      value={editingItem.preparation_time || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          preparation_time: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Ex: 15-20 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem
                  </label>
                  <div className="flex items-center gap-4">
                    {(editingItem.image_url || selectedImage) && (
                      <div className="relative w-24 h-24">
                        <Image
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : editingItem.image_url || ''
                          }
                          alt={editingItem.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
                      <ImageIcon size={20} />
                      Escolher Imagem
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          setSelectedImage(e.target.files?.[0] || null)
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setSelectedImage(null);
                      setError('');
                      setSuccess('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
                  >
                    <X size={20} />
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveItem(editingItem)}
                    disabled={isSaving}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Salvar
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {item.image_url && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      R$ {item.price.toFixed(2)} • {item.category?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-gray-600 hover:text-gray-800 transition-colors p-2"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Adicionar Item */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Adicionar Novo Item</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={editingItem?.name || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        name: e.target.value,
                      } as MenuItem)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingItem?.category_id || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category_id: e.target.value,
                      } as MenuItem)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={editingItem?.description || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    } as MenuItem)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    value={editingItem?.price || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value),
                      } as MenuItem)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Serve (pessoas)
                  </label>
                  <input
                    type="number"
                    value={editingItem?.serve_people || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        serve_people: parseInt(e.target.value),
                      } as MenuItem)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tempo de Preparo
                  </label>
                  <input
                    type="text"
                    value={editingItem?.preparation_time || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        preparation_time: e.target.value,
                      } as MenuItem)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Ex: 15-20 min"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem
                </label>
                <div className="flex items-center gap-4">
                  {selectedImage && (
                    <div className="relative w-24 h-24">
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg flex items-center gap-2">
                    <ImageIcon size={20} />
                    Escolher Imagem
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setSelectedImage(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setIsAddingItem(false);
                    setEditingItem(null);
                    setSelectedImage(null);
                    setError('');
                    setSuccess('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
                >
                  <X size={20} />
                  Cancelar
                </button>
                <button
                  onClick={() => editingItem && handleSaveItem(editingItem)}
                  disabled={isSaving}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 