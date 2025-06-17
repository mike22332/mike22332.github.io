import { create } from 'zustand';
import { Business, BusinessCategory } from '@/types/business';
import { BUSINESSES, searchBusinesses, getBusinessesByCategory } from '@/mocks/businesses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BusinessState {
  businesses: Business[];
  favoriteBusinessIds: string[];
  searchQuery: string;
  selectedCategory: BusinessCategory | null;
  
  // Actions
  searchBusinesses: (query: string) => void;
  filterByCategory: (category: BusinessCategory | null) => void;
  toggleFavorite: (businessId: string) => void;
  isFavorite: (businessId: string) => boolean;
  getFavoriteBusinesses: () => Business[];
  resetFilters: () => void;
}

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      businesses: BUSINESSES,
      favoriteBusinessIds: [],
      searchQuery: '',
      selectedCategory: null,
      
      searchBusinesses: (query: string) => {
        set({ searchQuery: query });
        if (query.trim() === '') {
          set({ businesses: BUSINESSES });
        } else {
          const results = searchBusinesses(query);
          set({ businesses: results });
        }
      },
      
      filterByCategory: (category: BusinessCategory | null) => {
        set({ selectedCategory: category });
        if (!category) {
          set({ businesses: BUSINESSES });
        } else {
          const results = getBusinessesByCategory(category);
          set({ businesses: results });
        }
      },
      
      toggleFavorite: (businessId: string) => {
        set((state) => {
          const isFavorited = state.favoriteBusinessIds.includes(businessId);
          
          if (isFavorited) {
            return {
              favoriteBusinessIds: state.favoriteBusinessIds.filter(id => id !== businessId)
            };
          } else {
            return {
              favoriteBusinessIds: [...state.favoriteBusinessIds, businessId]
            };
          }
        });
      },
      
      isFavorite: (businessId: string) => {
        return get().favoriteBusinessIds.includes(businessId);
      },
      
      getFavoriteBusinesses: () => {
        const favoriteIds = get().favoriteBusinessIds;
        return BUSINESSES.filter(business => favoriteIds.includes(business.id));
      },
      
      resetFilters: () => {
        set({
          businesses: BUSINESSES,
          searchQuery: '',
          selectedCategory: null
        });
      }
    }),
    {
      name: 'business-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteBusinessIds: state.favoriteBusinessIds }),
    }
  )
);