export default function Button({ text, type, onClick, className }) {
  const baseClass = "cursor-pointer transition-all duration-300";
  const typeClass = type === 'GUIDENAV'
    ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-[#90CCF0] bg-white text-[#90CCF0] hover:bg-[#90CCF0] hover:text-white ${className}`
    : type === 'NEGATIVE'
      ? `bg-red-500 text-white ${className}`
      : `bg-gray-200 ${className}`;

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >
      {text}
    </button>
  );
}
