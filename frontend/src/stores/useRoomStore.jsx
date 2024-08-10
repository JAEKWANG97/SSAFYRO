import { create } from 'zustand';
import { users } from '../routes/second/interview/data';

const useRoomStore = create((set) => ({
  userList: [],
  setUserList: (users) => set({ userList: users }),

  addUser: (user) => set((state) => ({
    userList: [...state.userList, user]
  })),

  removeUser: (userId) => set((state) => ({
    userList: state.userList.filter((user) => user.userId !== userId)
  })),

  clearUserList: () => set({ userList: [] }), // 참여자 목록 초기화
  
  userTurn: 0,
  setUserTurn: (turn) => set({ userTurn: turn }),
}));

export default useRoomStore;
