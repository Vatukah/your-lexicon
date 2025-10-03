export default function formatOutput(wordInfo) {
  if (!wordInfo) {
    return []; // Return an empty array if no word information is available
  }

  let formatted = [];

  if (wordInfo.source === "wordnik") {
    // Format Wordnik-specific fields
    wordInfo.result.forEach((meaning) => {
      formatted.push({
        partOfSpeech: meaning.partOfSpeech,
        definition: meaning.text,
        example: meaning.example || "No example available.",
      });
    });
  }
  if (wordInfo.source === "wordnet") {
    const copyArr = Object.entries(wordInfo.result).map(([pos, info]) => {
      return {
        partOfSpeech: pos,
        definition: info.def || "No definition available.",
        glossary: info.gloss || "No glossary available.",
        examples: info.exp || [],
        synonyms: info.synonyms || [],
      };
    });
    formatted = [...copyArr];
  }

  return formatted;
}
