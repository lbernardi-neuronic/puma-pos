import { create } from 'zustand';
import { Product } from '@/lib/mock-data';

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  discount: number;
  taxRate: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (amount: number) => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  discount: 0,
  taxRate: 0.21, // IVA 21%

  addItem: (product, quantity = 1) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    return {
      items: [...state.items, { ...product, cartId: Math.random().toString(36).substring(7), quantity }]
    };
  }),

  removeItem: (cartId) => set((state) => ({
    items: state.items.filter(item => item.cartId !== cartId)
  })),

  updateQuantity: (cartId, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(item => item.cartId !== cartId)
      : state.items.map(item => item.cartId === cartId ? { ...item, quantity } : item)
  })),

  clearCart: () => set({ items: [], discount: 0 }),
  
  applyDiscount: (amount) => set({ discount: amount }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getTax: () => {
    const { getSubtotal, taxRate } = get();
    return getSubtotal() * taxRate;
  },

  getTotal: () => {
    const { getSubtotal, getTax, discount } = get();
    return getSubtotal() + getTax() - discount;
  }
}));
