import { create } from 'zustand';
import { users } from '../routes/second/interview/data';

const useRoomStore = create((set) => ({
  userList: [],
  setUserList: (users) => set({ userList: users }),
  userTurn: 0,
  setUserTurn: (turn) => set({ userTurn: turn }),
}));

export default useRoomStore;
