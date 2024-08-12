export default function Button({ text, type, onClick, isActive }) {
  const baseClass = "cursor-pointer flex items-center justify-center transition duration-300 ease-in-out";

  const typeClass = type === 'GUIDENAV'
    ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-blue-400 font-extrabold ${
        isActive ? 'bg-blue-400 text-white' : 'bg-white text-blue-400 hover:bg-blue-400 hover:text-white'
      }`
    : type === 'INTERVIEWCLOSE'
      ? 'bg-red-100 text-red-800 text-base font-semibold px-4 py-2 rounded ml-auto'
      : type === 'INTERVIEWSTART'
        ? 'bg-blue-100 text-blue-800 text-base font-semibold px-4 py-2 rounded ml-auto'
        : type === 'ESSAYSAVE'
          ? 'ml-auto text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 me-2 mb-2 focus:outline-none'
          : type === 'ESSAYUPDATE'
            ? 'ml-auto text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 me-2 mb-2 focus:outline-none'
            : type === "WAITINGROOMOUT"
              ? "bg-red-100 text-red-800 text-base font-semibold px-5 py-2 rounded w-21 h-12"
                : type === "WAITINGROOMSTART"
                ? "bg-blue-100 text-blue-800 text-xl font-bold px-16 py-7 rounded-2xl w-64 h-16"
                  : type === "SEARCHROOM"
                  ? "text-white bg-blue-500 hover:bg-blue-800 font-medium rounded-lg p-2 mb-4 focus:outline-none dark:focus:ring-blue-800"
                    : type === "ENTERROOM"
                      ? "text-white bg-blue-500 hover:bg-blue-800 rounded px-2 w-[60px] focus:outline-none dark:focus:ring-blue-800"
                      : type === "KAKAO"
                        ? "w-full max-w-xs bg-[#FFE812] text-yellow-800 border-yellow-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center"
                        : type === "GOOGLE"
                          ? "w-full max-w-xs bg-white text-gray-800 border border-[#B1B3B6] hover:bg-gray-50 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center"
                          : type === "NAVER"
                            ? "w-full max-w-xs bg-[#1EDE00] text-green-800 border-green-300 hover:bg-opacity-70 font-semibold rounded-lg text-sm py-3 text-center inline-flex items-center justify-center"
                            : type === "PERSONALITY"
                              ? "w-64 h-30 bg-pink-50 p-4 rounded-lg text-center hover:bg-pink-100 hover:shadow-lg text-base text-pink-600 font-semibold"
                              : type === "PT"
                                ? "w-64 h-30 bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 hover:shadow-lg text-base text-blue-600 font-semibold" 
                                : type === "MAJOR"
                                  ? "bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded" 
                                  : type === "NONMAJOR"
                                    ? "bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded" 
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
