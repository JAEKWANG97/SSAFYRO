import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Level from './../routes/first/components/Level';

const useFirstStore = create(
  persist(
    (set, get) => ({
      activeTab: 'essay', // 에세이, sw적성검사 여부
      setActiveTab: (tab) => set({ activeTab: tab }),
      selected: 'major', // 전공자, 비전공자 유무
      setSelected: (select) => set({ selected: select }),
      essayContent: '', // 에세이 내용
      setEssayContent: (content) => set({ essayContent: content }),
      showCorrection: false, // ai 첨삭 버튼 클릭 여부
      setShowCorrection: (value) => set({ showCorrection: value }),
      essayData: null,
      setEssayData: (value) => set({ setEssayData: value }),
      saved: {},
      setSaved: (problemId) =>
        set((state) => ({
          saved: {
            ...state.saved,
            [problemId]: !state.saved[problemId],
          },
        })),

      toggleSave: (id) => {
        const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/';
        const Token = localStorage.getItem('Token');
        const saved = get().saved;
        const url = saved[id]
          ? `${APIURL}coding-test-problems/scrap/r`
          : `${APIURL}coding-test-problems/scrap`;

        const method = saved[id] ? 'delete' : 'post';

        axios({
          method: method,
          url: url,
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          data: { problemId: id },
        })
          .then((res) => {
            console.log(res.data);
            get().setSaved(id); // 여기서 saved 상태를 토글
          })
          .catch((error) => {
            console.error('Error updating save status:', error);
          });
      },

      icons: [
        { id: 'D1', component: <Level text="1" color="#CD7F32" /> },
        { id: 'D2', component: <Level text="2" color="#C0C0C0" /> },
        { id: 'D3', component: <Level text="3" color="#FFD700" /> },
        { id: 'D4', component: <Level text="4" color="#00FFFF" /> },
      ],
      getIconById: (id) => {
        const icons = get().icons; // 상태에서 아이콘 목록을 가져옴
        return icons.find((icon) => icon.id === id);
      },
    }),
    {
      name: 'first-store', // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        activeTab: state.activeTab,
        selected: state.selected,
        essayContent: state.essayContent,
        showCorrection: state.showCorrection,
        saved: state.saved, // 지속적으로 저장할 상태만 선택
      }),
    }
  )
);

export default useFirstStore;
