"use client"

import React from 'react';
import { MenuItem as MenuItemType, Category } from '@/types/menu';
import MenuItem from './MenuItem';
import { menuService } from '@/services/menuService';
import { useSupabaseRealtime } from '@/hooks/useSupabaseRealtime';
import DynamicDiv from './DynamicDiv';

const menuSections = [
  { id: 'menu', title: 'Cardápio Completo', slug: 'menu' },
  { id: 'combos', title: 'Combos', slug: 'combos' },
  { id: 'lanches', title: 'Lanches', slug: 'lanches' },
  { id: 'doces-sirios', title: 'Doces Sírios', slug: 'doces-sirios' },
  { id: 'mercado-sirio', title: 'Mercado Sírio', slug: 'mercado-sirio' }
];

function MenuNavigation({ activeSection, onSectionChange }: { 
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}) {
  return (
    <nav className="sticky top-16 bg-white shadow-sm z-10 mb-8">
      <DynamicDiv className="container mx-auto px-4 py-4 overflow-x-auto">
        <DynamicDiv className="flex space-x-4 min-w-max">
          {menuSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {section.title}
            </button>
          ))}
        </DynamicDiv>
      </DynamicDiv>
    </nav>
  );
}

function MenuLoading() {
  return (
    <DynamicDiv className="container mx-auto px-4 py-8">
      <DynamicDiv className="animate-pulse space-y-8">
        {[1, 2, 3].map((i) => (
          <DynamicDiv key={i} className="space-y-4">
            <DynamicDiv className="h-8 bg-gray-200 rounded w-1/4"></DynamicDiv>
            <DynamicDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <DynamicDiv key={j} className="bg-gray-200 h-64 rounded-lg"></DynamicDiv>
              ))}
            </DynamicDiv>
          </DynamicDiv>
        ))}
      </DynamicDiv>
    </DynamicDiv>
  );
}

export default function Menu() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [menuItems, setMenuItems] = React.useState<MenuItemType[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [activeSection, setActiveSection] = React.useState('menu');

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, menuItemsData] = await Promise.all([
          menuService.getCategories(),
          menuService.getMenuItems()
        ]);

        setCategories(categoriesData);
        setMenuItems(menuItemsData);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar o menu. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useSupabaseRealtime({
    table: 'menu_items',
    onEvent: (payload, event) => {
      if (event === 'INSERT') {
        setMenuItems(prev => [...prev, payload]);
      } else if (event === 'UPDATE') {
        setMenuItems(prev => prev.map(item => 
          item.id === payload.id ? { ...item, ...payload } : item
        ));
      } else if (event === 'DELETE') {
        setMenuItems(prev => prev.filter(item => item.id !== payload.id));
      }
    }
  });

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <MenuLoading />;
  }

  if (error) {
    return (
      <DynamicDiv className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Tentar Novamente
        </button>
      </DynamicDiv>
    );
  }

  if (!categories.length || !menuItems.length) {
    return (
      <DynamicDiv className="text-center py-8">
        <p className="text-gray-600">Nenhum item encontrado no cardápio.</p>
        <p className="text-sm text-gray-500 mt-2">
          {!categories.length ? 'Nenhuma categoria cadastrada. ' : ''}
          {!menuItems.length ? 'Nenhum item cadastrado.' : ''}
        </p>
      </DynamicDiv>
    );
  }

  const filteredCategories = categories.filter(category => {
    if (activeSection === 'menu') return true;
    return category.slug === activeSection;
  });

  return (
    <DynamicDiv>
      <MenuNavigation 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <DynamicDiv className="container mx-auto px-4 py-8">
        {filteredCategories.map(category => {
          const categoryItems = menuItems.filter(item => item.category_id === category.id);
          
          if (categoryItems.length === 0) return null;

          return (
            <section key={category.id} id={category.slug} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
              <DynamicDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map(item => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </DynamicDiv>
            </section>
          );
        })}
      </DynamicDiv>
    </DynamicDiv>
  );
}