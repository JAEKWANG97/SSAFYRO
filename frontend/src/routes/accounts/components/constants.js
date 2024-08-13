export const EMOTIONS = {
  HAPPY: {
    emoji: "😊",
    label: "행복",
    color: "text-yellow-500",
  },
  NEUTRAL: {
    emoji: "😐",
    label: "중립",
    color: "text-gray-500",
  },
  SAD: {
    emoji: "😢",
    label: "슬픔",
    color: "text-blue-500",
  },
  DISGUST: {
    emoji: "🤢",
    label: "혐오",
    color: "text-green-500",
  },
  SURPRISE: {
    emoji: "😲",
    label: "놀람",
    color: "text-purple-500",
  },
  FEAR: {
    emoji: "😨",
    label: "공포",
    color: "text-indigo-500",
  },
  ANGRY: {
    emoji: "😠",
    label: "분노",
    color: "text-red-500",
  },
};

export const SCORE_RANGES = [
  { min: 80, color: "bg-green-100 text-green-800 border-green-300" },
  { min: 60, color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { min: 0, color: "bg-red-100 text-red-800 border-red-300" },
];
