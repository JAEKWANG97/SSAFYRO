import { create } from 'zustand';

const useRoomStore = create((set) => ({
  userList: [],
  setUserList: (users) => set({ userList: users }),

  userTurn: 0,
  setUserTurn: (turn) => set({ userTurn: turn }),
}));

export default useRoomStore;
