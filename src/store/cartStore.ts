import { create } from 'zustand';
import { CartItem } from '@/types/menu';

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (item: CartItem) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return { items: [...state.items, item] };
    });
  },
  
  removeFromCart: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  
  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => set({ items: [] }),
  
  get total() {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));