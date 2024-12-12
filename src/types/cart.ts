import { MenuItem, Ingredient } from './menu';

export interface CartItemCustomization {
  removedIngredients?: string[];
  additionalIngredients?: Ingredient[];
  selectedOption?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations?: CartItemCustomization;
  totalPrice: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (menuItem: MenuItem, quantity?: number, customizations?: CartItemCustomization) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} 