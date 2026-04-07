import { create } from 'zustand';

type ModalType = 'none' | 'product_search' | 'checkout_success';

interface UIState {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  
  // Mobile drawer states
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  toggleSidebar: () => void;
  toggleCart: () => void;
  closeDrawers: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: 'none',
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: 'none' }),
  
  isSidebarOpen: false,
  isCartOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen, isCartOpen: false })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isSidebarOpen: false })),
  closeDrawers: () => set({ isSidebarOpen: false, isCartOpen: false }),
}));
