// src/stores/firstStore.js
import {create} from 'zustand';

const useFirstStore = create((set) => ({
  activeTab: 'essay',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useFirstStore;
