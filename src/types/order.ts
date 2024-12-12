export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  customizations?: {
    removed: string[];
  };
}

// ... resto do arquivo permanece igual