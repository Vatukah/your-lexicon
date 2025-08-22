export default function BasicBtn({ text, action }) {
  return (
    <button
      onClick={action}
      className="px-4 py-2 rounded-full border border-gray-300 text-text text-xs font-semibold cursor-pointer hover:bg-gray-100  transition-colors"
    >
      {text}
    </button>
  );
}
