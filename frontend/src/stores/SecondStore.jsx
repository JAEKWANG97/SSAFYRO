import { create } from 'zustand';

const useSecondStore = create((set) => ({
  secondActiveTab: 'guide',
  setSecondActiveTab: (tab) => set({ secondActiveTab: tab }),
}));

export default useSecondStore;
