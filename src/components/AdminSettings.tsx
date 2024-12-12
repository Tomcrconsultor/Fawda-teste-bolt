"use client"

import { useState, useCallback, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useRouter } from 'next/navigation';
import SafeDiv from './SafeDiv';
import { Settings, Store, Palette, Globe, Database, Check, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('site');
  const { settings, updateSettings, isLoading, error, refreshSettings } = useSettings();
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'business', label: 'Negócio', icon: Store },
    { id: 'theme', label: 'Tema', icon: Palette },
    { id: 'api', label: 'API', icon: Database },
  ];

  // Atualiza a URL quando a tab muda
  useEffect(() => {
    router.push(`/admin?tab=${activeTab}`, { scroll: false });
  }, [activeTab, router]);

  // Recupera a tab da URL ao carregar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  const showFeedback = useCallback((type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  }, []);

  const handleInputChange = useCallback(async (field: string, value: string) => {
    try {
      setIsSaving(true);
      const success = await updateSettings({ [field]: value });
      
      if (success) {
        showFeedback('success', 'Configuração atualizada com sucesso!');
      } else {
        showFeedback('error', 'Erro ao atualizar configuração');
      }
    } catch (err) {
      console.error('Erro ao atualizar configuração:', err);
      showFeedback('error', 'Erro ao atualizar configuração');
    } finally {
      setIsSaving(false);
    }
  }, [updateSettings, showFeedback]);

  const handleColorChange = useCallback(async (field: string, value: string) => {
    try {
      // Validar formato da cor
      if (!/^#[0-9A-F]{6}$/i.test(value)) {
        showFeedback('error', 'Formato de cor inválido. Use #RRGGBB');
        return;
      }

      setIsSaving(true);
      const success = await updateSettings({ [field]: value });
      
      if (success) {
        showFeedback('success', 'Cor atualizada com sucesso!');
      } else {
        showFeedback('error', 'Erro ao atualizar cor');
      }
    } catch (err) {
      console.error('Erro ao atualizar cor:', err);
      showFeedback('error', 'Erro ao atualizar cor');
    } finally {
      setIsSaving(false);
    }
  }, [updateSettings, showFeedback]);

  if (isLoading) {
    return (
      <SafeDiv className="flex items-center justify-center min-h-screen">
        <SafeDiv className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="text-gray-600">Carregando configurações...</span>
        </SafeDiv>
      </SafeDiv>
    );
  }

  return (
    <SafeDiv className="divide-y divide-gray-200">
      {/* Feedback */}
      {feedback && (
        <SafeDiv 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center z-50 ${
            feedback.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          {feedback.message}
        </SafeDiv>
      )}

      {/* Saving Indicator */}
      {isSaving && (
        <SafeDiv className="fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg flex items-center z-50">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Salvando...
        </SafeDiv>
      )}

      {/* Tabs Navigation */}
      <SafeDiv className="border-b border-gray-200">
        <SafeDiv className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </SafeDiv>
      </SafeDiv>

      {/* Tab Content */}
      <SafeDiv className="p-6">
        {error && (
          <SafeDiv className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
            <button
              onClick={refreshSettings}
              className="ml-auto text-sm underline hover:text-red-700"
            >
              Tentar novamente
            </button>
          </SafeDiv>
        )}

        {activeTab === 'site' && (
          <SafeDiv className="space-y-6">
            <SafeDiv className="grid gap-6 md:grid-cols-2">
              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nome do Site
                </label>
                <input
                  type="text"
                  value={settings?.site_name || ''}
                  onChange={(e) => handleInputChange('site_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <input
                  type="text"
                  value={settings?.site_description || ''}
                  onChange={(e) => handleInputChange('site_description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>
            </SafeDiv>
          </SafeDiv>
        )}

        {activeTab === 'business' && (
          <SafeDiv className="space-y-6">
            <SafeDiv className="grid gap-6 md:grid-cols-2">
              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={settings?.business_name || ''}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  value={settings?.business_address || ''}
                  onChange={(e) => handleInputChange('business_address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  value={settings?.business_phone || ''}
                  onChange={(e) => handleInputChange('business_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={settings?.business_email || ''}
                  onChange={(e) => handleInputChange('business_email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>
            </SafeDiv>
          </SafeDiv>
        )}

        {activeTab === 'theme' && (
          <SafeDiv className="space-y-6">
            <SafeDiv className="grid gap-6 md:grid-cols-2">
              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cor Primária
                </label>
                <SafeDiv className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings?.theme_primary_color || '#10b981'}
                    onChange={(e) => handleColorChange('theme_primary_color', e.target.value)}
                    className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings?.theme_primary_color || '#10b981'}
                    onChange={(e) => handleColorChange('theme_primary_color', e.target.value)}
                    pattern="^#[0-9A-F]{6}$"
                    placeholder="#RRGGBB"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </SafeDiv>
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cor Secundária
                </label>
                <SafeDiv className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings?.theme_secondary_color || '#6b7280'}
                    onChange={(e) => handleColorChange('theme_secondary_color', e.target.value)}
                    className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings?.theme_secondary_color || '#6b7280'}
                    onChange={(e) => handleColorChange('theme_secondary_color', e.target.value)}
                    pattern="^#[0-9A-F]{6}$"
                    placeholder="#RRGGBB"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </SafeDiv>
              </SafeDiv>
            </SafeDiv>
          </SafeDiv>
        )}

        {activeTab === 'api' && (
          <SafeDiv className="space-y-6">
            <SafeDiv className="grid gap-6 md:grid-cols-2">
              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Chave da API
                </label>
                <input
                  type="password"
                  value={settings?.api_key || ''}
                  onChange={(e) => handleInputChange('api_key', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>

              <SafeDiv className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  URL da API
                </label>
                <input
                  type="url"
                  value={settings?.api_url || ''}
                  onChange={(e) => handleInputChange('api_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                />
              </SafeDiv>
            </SafeDiv>
          </SafeDiv>
        )}
      </SafeDiv>
    </SafeDiv>
  );
} 