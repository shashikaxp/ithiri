import { Week } from '@ithiri/shared-types';
import create from 'zustand';

interface Store {
  selectedWeek: Week;
  setSelectedWeek: (selectedWeek: Week) => void;
}

export const useStore = create<Store>((set) => ({
  selectedWeek: 'thisWeek',
  setSelectedWeek: (selectedWeek: Week) => set({ selectedWeek }),
}));
