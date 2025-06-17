import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock user database - in production, this would be handled by your backend
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123',
    createdAt: new Date().toISOString(),
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - in production, this would be an API call
        const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
          set({ isLoading: false });
          return { success: false, error: 'No account found with this email address' };
        }
        
        if (user.password !== password) {
          set({ isLoading: false });
          return { success: false, error: 'Incorrect password' };
        }
        
        const { password: _, ...userWithoutPassword } = user;
        set({ 
          user: userWithoutPassword, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return { success: true };
      },
      
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
          set({ isLoading: false });
          return { success: false, error: 'An account with this email already exists' };
        }
        
        // Create new user
        const newUser: User & { password: string } = {
          id: Math.random().toString(36).substring(2, 15),
          email: email.toLowerCase(),
          name,
          password,
          createdAt: new Date().toISOString(),
        };
        
        mockUsers.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ 
          user: userWithoutPassword, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return { success: true };
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);