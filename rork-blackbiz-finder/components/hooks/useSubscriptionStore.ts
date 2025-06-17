import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SubscriptionTierId } from '@/types/subscription';

interface SubscriptionState {
  selectedTierId: SubscriptionTierId | null;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  setSelectedTier: (tierId: SubscriptionTierId) => void;
  setBusinessInfo: (name: string, email: string, phone: string) => void;
  clearSubscriptionData: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      selectedTierId: null,
      businessName: '',
      businessEmail: '',
      businessPhone: '',
      setSelectedTier: (tierId: SubscriptionTierId) => set({ selectedTierId: tierId }),
      setBusinessInfo: (name: string, email: string, phone: string) =>
        set({
          businessName: name,
          businessEmail: email,
          businessPhone: phone,
        }),
      clearSubscriptionData: () =>
        set({
          selectedTierId: null,
          businessName: '',
          businessEmail: '',
          businessPhone: '',
        }),
    }),
    {
      name: 'subscription-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);