import { Week } from '@ithiri/shared-types';
import create from 'zustand';

interface Store {
  selectedWeek: Week;
  setSelectedWeek: (selectedWeek: Week) => void;
  userName: string | null,
  setUserName: (userName: string | null) => void;
  isAuthenticated: boolean,
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  selectedWeek: 'thisWeek',
  setSelectedWeek: (selectedWeek: Week) => set({ selectedWeek }),
  userName: null,
  setUserName: (userName: string | null) => set({userName}),
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated})
}));
