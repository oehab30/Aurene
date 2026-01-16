import { create } from 'zustand';

interface ShopFilters {
  category: string | null;
  material: string[];
  priceRange: [number, number];
  color: string | null;
  sortBy: string;
}

interface ShopState {
  filters: ShopFilters;
  setCategory: (category: string | null) => void;
  toggleMaterial: (material: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setColor: (color: string | null) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
}

export const useShopStore = create<ShopState>((set) => ({
  filters: {
    category: null,
    material: [],
    priceRange: [0, 5000],
    color: null,
    sortBy: 'newest',
  },
  setCategory: (category) => set((state) => ({ 
    filters: { ...state.filters, category } 
  })),
  toggleMaterial: (material) => set((state) => ({
    filters: {
      ...state.filters,
      material: state.filters.material.includes(material)
        ? state.filters.material.filter((m) => m !== material)
        : [...state.filters.material, material]
    }
  })),
  setPriceRange: (priceRange) => set((state) => ({ 
    filters: { ...state.filters, priceRange } 
  })),
  setColor: (color) => set((state) => ({ 
    filters: { ...state.filters, color } 
  })),
  setSortBy: (sortBy) => set((state) => ({ 
    filters: { ...state.filters, sortBy } 
  })),
  resetFilters: () => set({
    filters: {
      category: null,
      material: [],
      priceRange: [0, 5000],
      color: null,
      sortBy: 'newest',
    }
  }),
}));
