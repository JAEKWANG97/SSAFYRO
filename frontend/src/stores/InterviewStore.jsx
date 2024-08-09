import { create } from "zustand";

const useInterviewStore = create((set) => ({
  roomType: "PRESENTATION",
  setRoomType: (type) => set({roomType: type}),
  
  PTQuestions: [],
  setPTQuestions: (questions) => set({PTQuestions: questions}),

  personalityQuestions: ["1분 자기소개를 해주세요.", "본인이 다른 지원자들보다 SSAFY에서 공부해야 하는 이유가 무엇인가요?"]
}));

export default useInterviewStore;