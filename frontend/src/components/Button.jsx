export default function Button({ text, type, onClick, isActive }) {
  const baseClass = "cursor-pointer transition-all duration-300";
  const typeClass = type === 'GUIDENAV'
    ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-[#90CCF0] ${
        isActive ? 'bg-[#90CCF0] text-white' : 'bg-white text-[#90CCF0] hover:bg-[#90CCF0] hover:text-white'
      }`
    : type === 'INTERVIEWCLOSE'
      ?  'bg-red-100 text-red-800 text-base font-semibold px-4 py-2 rounded ml-auto'
      : type === 'INTERVIEWSTART'
        ? 'bg-blue-100 text-blue-800 text-base font-semibold px-4 py-2 rounded ml-auto'
        : 'text-white'

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >
      {text}
    </button>
  );
}
