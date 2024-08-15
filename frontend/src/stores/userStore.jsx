import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'user-storage', 
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useUserStore