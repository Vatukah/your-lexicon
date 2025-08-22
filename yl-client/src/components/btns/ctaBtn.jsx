export default function CTABtn({ text, link }) {
  return (
    <a
      href={link}
      className="btn  px-6 py-2 rounded-full font-semibold bg-accent text-text hover:bg-accent-muted  transition-colors shadow-lg"
    >  
        {text}  
    </a>
    );
}