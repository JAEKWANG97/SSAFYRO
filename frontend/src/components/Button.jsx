export default function Button({ text, type, onClick, isActive }) {
  const baseClass = "cursor-pointer flex items-center justify-center";
  const typeClass = type === 'GUIDENAV'
    ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-blue-400 font-extrabold ${
        isActive ? 'bg-blue-400 text-white' : 'bg-white text-blue-400 hover:bg-blue-400 hover:text-white'
      }`
    : type === 'INTERVIEWCLOSE'
      ?  'bg-red-100 text-red-800 text-base font-semibold px-4 py-2 rounded ml-auto'
      : type === 'INTERVIEWSTART'
        ? 'bg-blue-100 text-blue-800 text-base font-semibold px-4 py-2 rounded ml-auto'
        : type === 'ESSAYSAVE'
          ? 'ml-auto text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800'
            : type === "WAITINGROOMOUT"
            ? "bg-red-100 text-red-800 text-base font-semibold px-5 py-2 rounded w-12 h-12"
              : type === "WAITINGROOMSTART"
              ? "bg-blue-100 text-blue-800 text-xl font-bold px-16 py-7 rounded-2xl w-64 h-16"
                : type === "SEARCHROOM"
                ? "text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg p-2 mb-4 focus:outline-none dark:focus:ring-blue-800"
                  : type === "ENTERROOM"
                    ? "text-white bg-blue-500 hover:bg-blue-800 rounded px-2 w-[60px] focus:outline-none dark:focus:ring-blue-800"
                      : "text-white";


  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >    
      {text}
    </button>
  );
}
