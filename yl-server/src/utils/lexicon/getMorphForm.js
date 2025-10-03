import lemmatizer from "wink-lemmatizer";
import lemmatizedAdverb from './lemmatizedAdverb.js'

/**
 * Returns a unique array of morphological forms for a given word.
 * Includes noun, verb, adjective, and adverb forms (if available).
 * @param {string} word - The input word.
 * @returns {string[]} Array of unique morphological forms.
 */
export default function getMorphForm(word) {
  if (typeof word !== "string" || !word.trim()) {
    return [];
  }

  const baseForms = [
    lemmatizer.noun(word),
    lemmatizer.verb(word),
    lemmatizer.adjective(word),
    lemmatizedAdverb(word),
  ].filter(Boolean);

  // Use a Set to ensure uniqueness
  const forms = new Set([word, ...baseForms]);
  return [...forms];
}

