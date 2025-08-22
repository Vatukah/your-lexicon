import { useState, useEffect } from "react";
import PrimaryBtn from "./btns/primaryBtn";
import CTABtn from "./btns/ctaBtn";

export default function HeroSection() {
  const words = [
    "Wordsmith",
    "Logophile",
    "Word Enthusiast",
    "Language Lover",
    "Grammar Geek",
    "Lexicon Explorer",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="hero-section   text-text p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div >
        <div className="flex items-center justify-start ">
<h1 className="text-4xl font-bold  text-start">Are you a </h1>
        <div className="h-[60px] overflow-hidden  px-2 text-accent italic">
          <span
            className="text-4xl  flex flex-col transition-transform duration-500"
            style={{
              transform: `translateY(-${current * 60}px)`,
            }}
          >
            {words.map((word, index) => (
              <span key={index} style={{ height: 60, lineHeight: "60px" }}>
                {word}
              </span>
            ))}
          </span> 
        </div>
        <span className="text-4xl font-bold  text-start"> ? </span>
        </div>
        

        <p className="text-lg mb-6 text-start max-w-3/4 text-text-muted">
          Whoever you are, we feed your hunger for words. Master new vocabulary,
          explore meanings, synonyms, and antonyms — all in one place.
        </p>
        <div className="hero-buttons flex space-x-4 mb-6 justify-start">
          <CTABtn text="Expand Your Lexicon" link="/signup" />
        </div>
      </div>

      <div className="w-full h-full p-6">
        {/* Additional content can be added here, such as images or links */}
        <div className="bg-bg-muted  rounded-2xl w-full h-full flex flex-col items-center justify-center text-2xl font-bold">
          <p>WORD OF THE DAY</p>
        </div>
      </div>
    </section>
  );
}
