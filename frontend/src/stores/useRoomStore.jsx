import { create } from 'zustand';

const useRoomStore = create((set) => ({
  userList: [],
  setUserList: (users) => set({ userList: users }),
}));

export default useRoomStore;
