import { create } from 'zustand';

const useFirstStore = create((set) => ({
  activeTab: 'essay',                                         // 에세이, sw적성검사 여부
  setActiveTab: (tab) => set({ activeTab: tab }),
  selected: 'major',                                          // 전공자, 비전공자 유무
  setSelected: (select) => set({ selected: select }),
  showCorrection: false,                                      // ai 첨삭 버튼 클릭 여부
  setShowCorrection: (value) => set({ showCorrection: value }),
  
}));

export default useFirstStore;
