import { ChangeEvent } from 'react';
import SafeDiv from '../SafeDiv';

interface BusinessSettingsProps {
  settings: {
    workingHours: {
      [key: string]: { open: string; close: string };
    };
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    delivery: {
      minimumOrder: number;
      deliveryFee: number;
      deliveryRadius: number;
      estimatedTime: string;
      freeDeliveryThreshold: number;
    };
    notifications: {
      email: boolean;
      push: boolean;
      orderUpdates: boolean;
      marketing: boolean;
      sounds: boolean;
    };
  };
  onSettingChange: (key: string, value: any) => void;
}

const weekDays = [
  { id: 'monday', label: 'Segunda-feira' },
  { id: 'tuesday', label: 'Terça-feira' },
  { id: 'wednesday', label: 'Quarta-feira' },
  { id: 'thursday', label: 'Quinta-feira' },
  { id: 'friday', label: 'Sexta-feira' },
  { id: 'saturday', label: 'Sábado' },
  { id: 'sunday', label: 'Domingo' },
];

export default function BusinessSettings({ settings, onSettingChange }: BusinessSettingsProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (type === 'checkbox') {
        onSettingChange(parent, {
          ...settings[parent as keyof typeof settings],
          [child]: checked,
        });
      } else if (type === 'number') {
        onSettingChange(parent, {
          ...settings[parent as keyof typeof settings],
          [child]: parseFloat(value),
        });
      } else {
        onSettingChange(parent, {
          ...settings[parent as keyof typeof settings],
          [child]: value,
        });
      }
    } else {
      onSettingChange(name, type === 'checkbox' ? checked : value);
    }
  };

  const handleWorkingHoursChange = (day: string, field: 'open' | 'close', value: string) => {
    onSettingChange('workingHours', {
      ...settings.workingHours,
      [day]: {
        ...settings.workingHours[day],
        [field]: value,
      },
    });
  };

  return (
    <SafeDiv className="space-y-6">
      <SafeDiv className="grid grid-cols-1 gap-6">
        {/* Horário de Funcionamento */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Horário de Funcionamento
          </h4>
          <SafeDiv className="space-y-4">
            {weekDays.map((day) => (
              <SafeDiv key={day.id} className="grid grid-cols-2 gap-4">
                <SafeDiv>
                  <label className="block text-sm font-medium text-gray-700">
                    {day.label}
                  </label>
                </SafeDiv>
                <SafeDiv className="flex gap-2">
                  <input
                    type="time"
                    value={settings.workingHours[day.id]?.open || ''}
                    onChange={(e) => handleWorkingHoursChange(day.id, 'open', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  <span className="text-gray-500 self-center">até</span>
                  <input
                    type="time"
                    value={settings.workingHours[day.id]?.close || ''}
                    onChange={(e) => handleWorkingHoursChange(day.id, 'close', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </SafeDiv>
              </SafeDiv>
            ))}
          </SafeDiv>
        </SafeDiv>

        {/* Informações de Contato */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Informações de Contato
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contact.phone"
                value={settings.contact.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contact.email"
                value={settings.contact.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                id="contactAddress"
                name="contact.address"
                value={settings.contact.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Configurações de Entrega */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Configurações de Entrega
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv>
              <label htmlFor="minimumOrder" className="block text-sm font-medium text-gray-700">
                Valor Mínimo do Pedido (R$)
              </label>
              <input
                type="number"
                id="minimumOrder"
                name="delivery.minimumOrder"
                value={settings.delivery.minimumOrder}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700">
                Taxa de Entrega (R$)
              </label>
              <input
                type="number"
                id="deliveryFee"
                name="delivery.deliveryFee"
                value={settings.delivery.deliveryFee}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="deliveryRadius" className="block text-sm font-medium text-gray-700">
                Raio de Entrega (km)
              </label>
              <input
                type="number"
                id="deliveryRadius"
                name="delivery.deliveryRadius"
                value={settings.delivery.deliveryRadius}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">
                Tempo Estimado (minutos)
              </label>
              <input
                type="text"
                id="estimatedTime"
                name="delivery.estimatedTime"
                value={settings.delivery.estimatedTime}
                onChange={handleInputChange}
                placeholder="30-45"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>

            <SafeDiv>
              <label htmlFor="freeDeliveryThreshold" className="block text-sm font-medium text-gray-700">
                Frete Grátis Acima de (R$)
              </label>
              <input
                type="number"
                id="freeDeliveryThreshold"
                name="delivery.freeDeliveryThreshold"
                value={settings.delivery.freeDeliveryThreshold}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </SafeDiv>
          </SafeDiv>
        </SafeDiv>

        {/* Notificações */}
        <SafeDiv className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Notificações
          </h4>
          <SafeDiv className="space-y-4">
            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="notifications.email"
                checked={settings.notifications.email}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                Notificações por Email
              </label>
            </SafeDiv>

            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="pushNotifications"
                name="notifications.push"
                checked={settings.notifications.push}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                Notificações Push
              </label>
            </SafeDiv>

            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="orderUpdates"
                name="notifications.orderUpdates"
                checked={settings.notifications.orderUpdates}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="orderUpdates" className="ml-2 block text-sm text-gray-700">
                Atualizações de Pedido
              </label>
            </SafeDiv>

            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="marketingNotifications"
                name="notifications.marketing"
                checked={settings.notifications.marketing}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="marketingNotifications" className="ml-2 block text-sm text-gray-700">
                Marketing
              </label>
            </SafeDiv>

            <SafeDiv className="flex items-center">
              <input
                type="checkbox"
                id="soundNotifications"
                name="notifications.sounds"
                checked={settings.notifications.sounds}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="soundNotifications" className="ml-2 block text-sm text-gray-700">
                Sons
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