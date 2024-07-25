

export default function Button({ text, type, onClick }) {
  const baseClass = "cursor-pointer rounded-md px-2 py-2 text-lg w-20 h-14";
  const typeClass = type === 'POSITIVE' // 타입이름 지정하고, 버튼 스타일링 하기 //or baseClass 없애고 typeClass로 일일이 버튼 디자인 하기
    ? "border border-[#90CCF0]"
    : type === 'NEGATIVE'
      ? "bg-red-500 text-white"
      : "bg-gray-200";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >
      {text}
    </button>
  );
}
