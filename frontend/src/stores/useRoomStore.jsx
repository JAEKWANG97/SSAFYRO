import { create } from 'zustand';

const useRoomStore = create((set) => ({
  userList: [],
  setUserList: (users) => set({ userList: users }),

  userNameMap: {},
  setUserNameMap: (userNameMap) => set({ userNameMap }),
  
  userTurn: 0,
  setUserTurn: (turn) => set({ userTurn: turn }),
}));

export default useRoomStore;
