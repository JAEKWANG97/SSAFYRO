// src/stores/SecondStore.js
import {create} from 'zustand';

const useSecondStore = create((set) => ({
  activeTab: 'guide',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useSecondStore;
