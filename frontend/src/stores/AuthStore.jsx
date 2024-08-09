import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin : false, // 로그인 여부
  setIsLogin : (isLoggedIn) => set({ isLogin: isLoggedIn }),
  isPerson : true, // 인성면접 수행 여부
  setIsPerson : (tab) => set({isPerson : tab}),
  isPt : true, // pt면접 수행 여부
  setIsPt : (tab) => set({IsPt : tab}),
  userInfo : {
    userId : 1,
    userName : "이정준"
  }
}));

export default useAuthStore;;
