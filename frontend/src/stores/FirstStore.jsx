import { create } from 'zustand';
import Level from './../routes/first/components/Level' // Level 컴포넌트가 있는 경로를 정확히 지정해주세요

const useFirstStore = create((set, get) => ({
  activeTab: 'essay', // 에세이, sw적성검사 여부
  setActiveTab: (tab) => set({ activeTab: tab }),
  selected: 'major', // 전공자, 비전공자 유무
  setSelected: (select) => set({ selected: select }),
  showCorrection: false, // ai 첨삭 버튼 클릭 여부
  setShowCorrection: (value) => set({ showCorrection: value }),
  icons: [
    { id: 1, component: <Level text="1" color="#CD7F32" /> },
    { id: 2, component: <Level text="2" color="#C0C0C0" />},
    { id: 3, component: <Level text="3" color="#FFD700" />},
    { id: 4, component: <Level text="4" color="#00FFFF" />}
  ],
  getIconById: (id) => {
    const icons = get().icons;  // 상태에서 아이콘 목록을 가져옴
    return icons.find(icon => icon.id === id);
  },
}));

export default useFirstStore;;
