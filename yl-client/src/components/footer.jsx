export default function Footer() {
  return (
    <div className="footer p-4">
      <p className="text-center text-sm text-text-muted">
        &copy; {new Date().getFullYear()} Your Lexicon. All rights reserved.
      </p>
    </div>
  );
}
