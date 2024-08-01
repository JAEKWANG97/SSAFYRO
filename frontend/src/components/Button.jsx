export default function Button({ text, type, onClick, isActive }) {
  const baseClass = "cursor-pointer";
  const typeClass =
    type === "GUIDENAV"
      ? `w-30 h-10 rounded-xl px-2 py-2 mx-2 text-base border border-[#90CCF0] ${
          isActive
            ? "bg-[#90CCF0] text-white"
            : "bg-white text-[#90CCF0] hover:bg-[#90CCF0] hover:text-white"
        }`
      : type === "INTERVIEWCLOSE"
      ? "bg-red-100 text-red-800 text-base font-semibold px-4 py-2 rounded ml-auto"
      : type === "INTERVIEWSTART"
      ? "bg-blue-100 text-blue-800 text-base font-semibold px-4 py-2 rounded ml-auto"
      : type === "ESSAYAI"
      ? "ml-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 flex items-center"
      : type === "ESSAYSAVE"
      ? "ml-auto text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
      : type === "WAITINGROOMOUT"
      ? "bg-red-100 text-red-800 text-base font-semibold px-5 py-3 rounded"
      : type === "WAITINGROOMSTART"
      ? "bg-blue-100 text-blue-800 text-xl font-bold px-20 py-4 rounded"
      : "text-white";

  return (
    <button onClick={onClick} className={`${baseClass} ${typeClass}`}>
      {type === "ESSAYAI" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 48 48"
          className="mr-2 mb-1"
        >
          <g fill="none">
            <rect
              width={30}
              height={24}
              x={9}
              y={18}
              stroke="currentColor"
              strokeWidth={4}
              rx={2}
            ></rect>
            <circle cx={17} cy={26} r={2} fill="currentColor"></circle>
            <circle cx={31} cy={26} r={2} fill="currentColor"></circle>
            <path
              fill="currentColor"
              d="M20 32a2 2 0 1 0 0 4zm8 4a2 2 0 1 0 0-4zm-8 0h8v-4h-8z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M24 10v8M4 26v8m40-8v8"
            ></path>
            <circle
              cx={24}
              cy={8}
              r={2}
              stroke="currentColor"
              strokeWidth={4}
            ></circle>
          </g>
        </svg>
      )}
      {text}
    </button>
  );
}
