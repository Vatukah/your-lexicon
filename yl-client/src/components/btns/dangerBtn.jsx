export default function DangerBtn({ text, action }) {
  return (
    <button
      onClick={action}
      className="px-4 py-2 rounded-full border border-red-300 text-red-700 text-xs font-semibold cursor-pointer hover:bg-red-200  transition-colors"
    >
      {text}
    </button>
  );
}
