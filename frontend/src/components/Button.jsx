export default function Button({ text, type, onClick, isActive }) {
  const baseClass = "cursor-pointer transition-all duration-300";
  const typeClass = type === 'GUIDENAV'
    ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-[#90CCF0] ${
        isActive ? 'bg-[#90CCF0] text-white' : 'bg-white text-[#90CCF0] hover:bg-[#90CCF0] hover:text-white'
      }`
    : type === 'NEGATIVE'
      ? `bg-red-500 text-white`
      : `bg-gray-200`;

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >
      {text}
    </button>
  );
}
