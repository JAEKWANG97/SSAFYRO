import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Level from './../routes/first/components/Level';

const useFirstStore = create(
  persist(
    (set, get) => ({
      activeTab: 'essay', 
      setActiveTab: (tab) => set({ activeTab: tab }),
      selected: 'major', 
      setSelected: (select) => set({ selected: select }),
      essayContent: '', 
      setEssayContent: (content) => set({ essayContent: content }),
      showCorrection: false, 
      setShowCorrection: (value) => set({ showCorrection: value }),
      essayData: null,
      setEssayData: (value) => set({ essayData: value }),
      
      saved: {},
      setSaved: (problemId, scrapId = null) => {
        set((state) => {
          const newSaved = { ...state.saved };
          if (scrapId) {
            newSaved[problemId] = { scrapId };
          } else {
            delete newSaved[problemId];
          }
          return { saved: newSaved };
        });
      },

      toggleSave: async (id) => {
        const APIURL = 'https://i11c201.p.ssafy.io:8443/api/v1/';
        const Token = localStorage.getItem('Token');
        const saved = get().saved;
        const isSaved = saved[id]?.scrapId;

        const url = isSaved
          ? `${APIURL}coding-test-problems/scrap/${isSaved}`
          : `${APIURL}coding-test-problems/scrap`;

        const method = isSaved ? 'delete' : 'post';

        try {
          const response = await axios({
            method: method,
            url: url,
            headers: {
              Authorization: `Bearer ${Token}`,
            },
            data: isSaved ? null : { problemId: id },
          });

          console.log(response.data)
          if (isSaved) {
            get().setSaved(id, null); // 상태에서 제거
          } else {
            const scrapId = response.data.response.problemScrapId;
            get().setSaved(id, scrapId); // 상태에 추가
          }

          console.log('Updated saved:', get().saved);
          
        } catch (error) {
          console.log(error)
        }
      },

      icons: [
        { id: 'D1', component: <Level text="1" color="#CD7F32" /> },
        { id: 'D2', component: <Level text="2" color="#C0C0C0" /> },
        { id: 'D3', component: <Level text="3" color="#FFD700" /> },
        { id: 'D4', component: <Level text="4" color="#00FFFF" /> },
      ],
      
      getIconById: (id) => {
        const icons = get().icons;
        return icons.find((icon) => icon.id === id);
      },
    }),
    {
      name: 'first-store', 
      partialize: (state) => ({
        activeTab: state.activeTab,
        selected: state.selected,
        essayContent: state.essayContent,
        showCorrection: state.showCorrection,
        saved: state.saved, 
      }),
    }
  )
);

export default useFirstStore;
