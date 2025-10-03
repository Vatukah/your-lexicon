import wordnetDef from "./wordnet.js";
import wordnikDef from "./wordnik.js";
import detectPOS from "../../utils/lexicon/detectPOS.js";

export default function Dictionary(word) {
    
  if (isContentWord(word)) {
    return wordnetDef(word);
  }
  if (isFunctionWord(word)) {
    return wordnikDef(word);
  }
  return null;
}

const isContentWord = (word) => {
  const contentPOS = ["Noun", "Verb", "Adjective", "Adverb"];
  const pos = detectPOS(word);
  return pos.some((p) => contentPOS.includes(p));
};
const isFunctionWord = (word) => {
  const funcPOS = [
    "Preposition",
    "Determiner",
    "Conjunction",
    "Particle",
    "Interjection",
  ];
  const pos = detectPOS(word);
  return pos.some((p) => funcPOS.includes(p));
};
