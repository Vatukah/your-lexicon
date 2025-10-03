import { useState, useEffect } from "react";
import PrimaryBtn from "./btns/primaryBtn";
import CTABtn from "./btns/ctaBtn";
import WOTD from "./wotd";

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
    <section className="hero-section   text-text p-8 grid  items-center">
      <WOTD/>
    </section>
  );
}
