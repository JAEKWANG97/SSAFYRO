import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin : false, // 로그인 여부
  setIsLogin : (isLoggedIn) => set({ isLogin: isLoggedIn }),
  isPerson : false, // 인성면접 수행 여부
  setIsPerson : (tab) => set({isPerson : tab}),
  isPt : false, // pt면접 수행 여부
  setIsPt : (tab) => set({IsPt : tab}),
 
}));

export default useAuthStore;;
