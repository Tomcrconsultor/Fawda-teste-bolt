import { useState } from 'react';
import { ChevronDown, Settings, Palette, Building2, Globe, Database } from 'lucide-react';
import SafeDiv from './SafeDiv';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: { id: string; label: string }[];
}

export default function AdminSidebar({ activeSection, onSectionChange }: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'site',
      label: 'Site',
      icon: <Globe size={20} />,
      subItems: [
        { id: 'site-info', label: 'Informações Básicas' },
        { id: 'site-social', label: 'Redes Sociais' },
        { id: 'site-hero', label: 'Imagem do Hero' },
      ]
    },
    {
      id: 'api',
      label: 'API',
      icon: <Database size={20} />,
      subItems: [
        { id: 'api-supabase', label: 'Supabase' },
        { id: 'api-integrations', label: 'Outras Integrações' },
        { id: 'api-environment', label: 'Ambiente' },
      ]
    },
    {
      id: 'theme',
      label: 'Tema',
      icon: <Palette size={20} />,
      subItems: [
        { id: 'theme-colors', label: 'Cores' },
        { id: 'theme-typography', label: 'Tipografia' },
        { id: 'theme-components', label: 'Componentes' },
      ]
    },
    {
      id: 'business',
      label: 'Negócio',
      icon: <Building2 size={20} />,
      subItems: [
        { id: 'business-hours', label: 'Horário de Funcionamento' },
        { id: 'business-contact', label: 'Informações de Contato' },
        { id: 'business-delivery', label: 'Entrega' },
        { id: 'business-notifications', label: 'Notificações' },
      ]
    },
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <SafeDiv className="w-64 bg-white border-r border-gray-200 h-full">
      <SafeDiv className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Configurações</h2>
        <nav>
          {menuItems.map((item) => (
            <SafeDiv key={item.id} className="mb-2">
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full flex items-center justify-between p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <SafeDiv className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </SafeDiv>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    expandedItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedItems.includes(item.id) && item.subItems && (
                <SafeDiv className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onSectionChange(subItem.id)}
                      className={`w-full text-left p-2 text-sm rounded-lg transition-colors ${
                        activeSection === subItem.id
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </SafeDiv>
              )}
            </SafeDiv>
          ))}
        </nav>
      </SafeDiv>
    </SafeDiv>
  );
} 