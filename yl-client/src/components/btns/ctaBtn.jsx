export default function CTABtn({ text, link }) {
  return (
    <a
      href={link}
      className="btn btn-secondary px-6 py-2 rounded-full border-2 border-text bg-text text-accent hover:bg-text-muted hover:text-accent transition-colors shadow-lg"
    >  
        {text}  
    </a>
    );
}