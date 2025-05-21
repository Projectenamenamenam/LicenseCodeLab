import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  username: string;
  balance: number;
  package: {
    name: string;
    quota: number;
  } | null;
}

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (name: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  updatePackage: (packageName: string, quota: number) => void;
  decrementQuota: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false,
      isAuthenticated: false,
      login: async (username, password) => {
        // In a real app, you would make an API call here
        // For now, we'll simulate a successful login
        
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.username === username && u.password === password);
        
        if (!user) {
          throw new Error('Invalid username or password');
        }
        
        const { password: _, ...userWithoutPassword } = user;
        
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
          isInitialized: true
        });
      },
      signup: async (name, username, password) => {
        // In a real app, you would make an API call here
        // For now, we'll simulate a successful signup
        
        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find((u: any) => u.username === username);
        
        if (existingUser) {
          throw new Error('Username already exists');
        }
        
        const newUser = {
          id: Date.now().toString(),
          name,
          username,
          password,
          balance: 0,
          package: null
        };
        
        // Save user to localStorage
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        
        const { password: _, ...userWithoutPassword } = newUser;
        
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
          isInitialized: true
        });
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
      updateBalance: (newBalance) => {
        set((state) => ({
          user: state.user ? { ...state.user, balance: newBalance } : null
        }));
        
        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((u: any) => {
          if (u.username === state.user?.username) {
            return { ...u, balance: newBalance };
          }
          return u;
        });
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      },
      updatePackage: (packageName, quota) => {
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            package: { name: packageName, quota }
          } : null
        }));
        
        // Update user in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((u: any) => {
          if (u.username === state.user?.username) {
            return { 
              ...u, 
              package: { name: packageName, quota }
            };
          }
          return u;
        });
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      },
      decrementQuota: () => {
        set((state) => {
          if (!state.user || !state.user.package) return state;
          
          const newQuota = state.user.package.quota - 1;
          const newPackage = newQuota > 0 
            ? { ...state.user.package, quota: newQuota }
            : null;
          
          // Update user in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const updatedUsers = users.map((u: any) => {
            if (u.username === state.user?.username) {
              return { 
                ...u, 
                package: newPackage
              };
            }
            return u;
          });
          
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          
          return {
            user: {
              ...state.user,
              package: newPackage
            }
          };
        });
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);