export default function Button({ text, type, onClick }) {
  const baseClass = "cursor-pointer border-none rounded-md px-4 py-2 text-lg";
  const typeClass = type === 'POSITIVE'
    ? "bg-green-500 text-white"
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
