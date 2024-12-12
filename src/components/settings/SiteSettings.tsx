import { ChangeEvent } from 'react';
import SafeDiv from '../SafeDiv';

interface SiteSettingsProps {
  settings: {
    businessName: string;
    address: string;
    phone: string;
    email: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      whatsapp: string;
    };
    heroImage: string;
  };
  onSettingChange: (key: string, value: string | { [key: string]: string }) => void;
}

export default function SiteSettings({ settings, onSettingChange }: SiteSettingsProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        {/* Informações Básicas */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Informações Básicas
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Nome do Estabelecimento
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={settings.businessName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Redes Sociais */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Redes Sociais
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="https://facebook.com/sua-pagina"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                type="url"
                id="instagram"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="https://instagram.com/seu-perfil"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="socialMedia.whatsapp"
                value={settings.socialMedia.whatsapp}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="+55 11 99999-9999"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Imagem do Hero */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Imagem do Hero
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input
                type="url"
                id="heroImage"
                name="heroImage"
                value={settings.heroImage}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            {settings.heroImage && (
              <SafeDiv className="mt-2">
                <img
                  src={settings.heroImage}
                  alt="Hero Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </SafeDiv>
            )}
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