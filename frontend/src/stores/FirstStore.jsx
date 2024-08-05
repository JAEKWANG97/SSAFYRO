import { create } from 'zustand';
import Level from './../routes/first/components/Level' 

const useFirstStore = create((set, get) => ({
  isLogin : false, // 로그인 여부
  setIsLogin : (isLoggedIn) => set({ isLogin: isLoggedIn }),
  activeTab : 'essay', // 에세이, sw적성검사 여부
  setActiveTab : (tab) => set({ activeTab: tab }),
  selected : 'major', // 전공자, 비전공자 유무
  setSelected : (select) => set({ selected: select }),
  essayContent: '' , // 에세이 내용
  setEssayContent : (content) => set({ essayContent: content }),
  showCorrection : false, // ai 첨삭 버튼 클릭 여부
  setShowCorrection : (value) => set({ showCorrection: value }),
  isPerson : false, // 인성면접 수행 여부
  setIsPerson : (tab) => set({isPerson : tab}),
  isPt : false, // pt면접 수행 여부
  setIsPt : (tab) => set({IsPt : tab}),


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
