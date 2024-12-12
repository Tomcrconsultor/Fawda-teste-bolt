export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface AvailableItem {
  id: string;
  name: string;
  price?: number;
}

export interface Extra {
  category: string;
  items: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: string;
  available: boolean;
  created_at?: string;
  available_items?: string;
  quantity_allowed?: number;
  serve_people?: number;
  extras?: string;
  preparation_time?: string;
  rating?: number;
}

export interface ParsedMenuItem extends Omit<MenuItem, 'available_items' | 'extras'> {
  availableItems: AvailableItem[];
  extras: Extra[];
}

export const parseAvailableItems = (items?: string): AvailableItem[] => {
  if (!items) return [];
  return items.split('|').map(item => {
    const [id, name, price] = item.split(':');
    return { 
      id, 
      name,
      price: price ? parseFloat(price) : undefined
    };
  });
};

export const parseExtras = (extras?: string): Extra[] => {
  if (!extras) return [];
  return extras.split(';').map(category => {
    const [categoryName, itemsStr] = category.split(':');
    const items = itemsStr.split('|');
    return {
      category: categoryName,
      items
    };
  });
};

export interface MenuSection {
  id: string;
  title: string;
  items?: MenuItem[];
}