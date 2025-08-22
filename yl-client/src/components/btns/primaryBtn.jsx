export default function PrimaryBtn({ text, action }) {
  return (
    <button
      onClick={action}
      className="px-4 py-2 rounded-full bg-accent text-text text-sm font-semibold cursor-pointer hover:text-text transition-colors hover:outline-1 outline-text "
    >
      {text}
    </button>
  );
}
