import { ChangeEvent } from 'react';
import SafeDiv from '../SafeDiv';

interface ThemeSettingsProps {
  settings: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    font: string;
    buttonStyle: string;
    borderRadius: string;
  };
  onSettingChange: (key: string, value: string | { [key: string]: string }) => void;
}

const fontOptions = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Poppins',
  'Lato',
];

const buttonStyleOptions = [
  { value: 'rounded', label: 'Arredondado' },
  { value: 'pill', label: 'Pílula' },
  { value: 'sharp', label: 'Reto' },
];

const borderRadiusOptions = [
  { value: '0', label: 'Sem borda' },
  { value: '0.25rem', label: 'Pequeno' },
  { value: '0.5rem', label: 'Médio' },
  { value: '1rem', label: 'Grande' },
  { value: '9999px', label: 'Circular' },
];

export default function ThemeSettings({ settings, onSettingChange }: ThemeSettingsProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      onSettingChange(parent, {
        ...settings[parent as keyof typeof settings],
        [child]: value,
      });
    } else {
      onSettingChange(name, value);
    }
  };

  return (
    <SafeDiv className="space-y-6">
      <SafeDiv className="grid grid-cols-1 gap-6">
        {/* Cores */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Cores
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                Cor Primária
              </label>
              <SafeDiv className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  id="primaryColor"
                  name="colors.primary"
                  value={settings.colors.primary}
                  onChange={handleInputChange}
                  className="h-8 w-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.colors.primary}
                  onChange={handleInputChange}
                  name="colors.primary"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </SafeDiv>
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                Cor Secundária
              </label>
              <SafeDiv className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  id="secondaryColor"
                  name="colors.secondary"
                  value={settings.colors.secondary}
                  onChange={handleInputChange}
                  className="h-8 w-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.colors.secondary}
                  onChange={handleInputChange}
                  name="colors.secondary"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </SafeDiv>
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700">
                Cor de Destaque
              </label>
              <SafeDiv className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  id="accentColor"
                  name="colors.accent"
                  value={settings.colors.accent}
                  onChange={handleInputChange}
                  className="h-8 w-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.colors.accent}
                  onChange={handleInputChange}
                  name="colors.accent"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </SafeDiv>
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Tipografia */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Tipografia
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="font" className="block text-sm font-medium text-gray-700">
                Fonte Principal
              </label>
              <select
                id="font"
                name="font"
                value={settings.font}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Componentes */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Componentes
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="buttonStyle" className="block text-sm font-medium text-gray-700">
                Estilo dos Botões
              </label>
              <select
                id="buttonStyle"
                name="buttonStyle"
                value={settings.buttonStyle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {buttonStyleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700">
                Raio das Bordas
              </label>
              <select
                id="borderRadius"
                name="borderRadius"
                value={settings.borderRadius}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                {borderRadiusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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