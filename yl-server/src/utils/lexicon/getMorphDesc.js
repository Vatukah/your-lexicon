
// Professional POS mapping
const POS_MAP = {
  "Noun": "noun",
  "Plural": "plural form",
  "Verb": "verb",
  "PresentParticiple": "gerund or present participle",
  "PastTense": "past tense",
  "PastParticiple": "past participle",
  "Adjective": "adjective",
  "Comparative": "comparative form",
  "Superlative": "superlative form",
  "Adverb": "adverb"
};

export default function generateMorphDescription(word, baseWord, pos) {
  const description = pos.map(tag => POS_MAP[tag] || tag).join(" ");
  return `${word} is the ${description} of ${baseWord}.`;
}
