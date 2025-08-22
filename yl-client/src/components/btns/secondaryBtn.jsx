export default function SecondaryBtn({ text, action }) {
  return (
    <button
      onClick={action}
      className="bg-white text-text px-4 py-2 rounded-full  font-semibold text-text-muted text-sm cursor-pointer hover:text-text transition-colors hover:outline-1  outline-text "
    >
      {text}
    </button>
  );
}
