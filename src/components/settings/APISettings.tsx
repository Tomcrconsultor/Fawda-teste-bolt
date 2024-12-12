import { ChangeEvent } from 'react';
import SafeDiv from '../SafeDiv';

interface APISettingsProps {
  settings: {
    supabaseUrl: string;
    supabaseAnonKey: string;
    googleMapsKey: string;
    stripePublicKey: string;
    environment: 'development' | 'production';
    apiVersion: string;
    debug: boolean;
  };
  onSettingChange: (key: string, value: string | boolean) => void;
}

export default function APISettings({ settings, onSettingChange }: APISettingsProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      onSettingChange(name, (e.target as HTMLInputElement).checked);
    } else {
      onSettingChange(name, value);
    }
  };

  return (
    <SafeDiv className="space-y-6">
      <SafeDiv className="grid grid-cols-1 gap-6">
        {/* Configurações do Supabase */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Configurações do Supabase
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="supabaseUrl" className="block text-sm font-medium text-gray-700">
                URL do Supabase
              </label>
              <input
                type="url"
                id="supabaseUrl"
                name="supabaseUrl"
                value={settings.supabaseUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="supabaseAnonKey" className="block text-sm font-medium text-gray-700">
                Chave Anônima do Supabase
              </label>
              <input
                type="password"
                id="supabaseAnonKey"
                name="supabaseAnonKey"
                value={settings.supabaseAnonKey}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Outras Integrações */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Outras Integrações
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="googleMapsKey" className="block text-sm font-medium text-gray-700">
                Google Maps API Key
              </label>
              <input
                type="password"
                id="googleMapsKey"
                name="googleMapsKey"
                value={settings.googleMapsKey}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="stripePublicKey" className="block text-sm font-medium text-gray-700">
                Stripe Public Key
              </label>
              <input
                type="password"
                id="stripePublicKey"
                name="stripePublicKey"
                value={settings.stripePublicKey}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Ambiente */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Ambiente
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="environment" className="block text-sm font-medium text-gray-700">
                Ambiente
              </label>
              <select
                id="environment"
                name="environment"
                value={settings.environment}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="development">Desenvolvimento</option>
                <option value="production">Produção</option>
              </select>
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="apiVersion" className="block text-sm font-medium text-gray-700">
                Versão da API
              </label>
              <input
                type="text"
                id="apiVersion"
                name="apiVersion"
                value={settings.apiVersion}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="debug"
                name="debug"
                checked={settings.debug}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="debug" className="ml-2 block text-sm text-gray-700">
                Modo Debug
              </label>
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>
      </SafeDiv>

      <SafeDiv className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Salvar Alterações
        </button>
      </SafeDiv>
    </SafeDiv>
  );
} 