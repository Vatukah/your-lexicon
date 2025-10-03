
export default function Tooltip({ text, x, y }) {
  return (
    <div
      className="absolute  mb-2 w-max max-w-xs bg-bg-muted  text-text border-text-muted border-1 text-xs rounded-lg p-2  transition-opacity z-40"
      style={{ left: x, top: y }}
    >
      {text}
    </div>
  );
}