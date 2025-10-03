
export default function extractSynonyms(senses) {



  if (!senses) return [];

      const synonyms = senses.synonyms || [];
      const subsenses = senses.subsenses?.flatMap((sub) => sub.synonyms) || [];
      return [...synonyms, ...subsenses];
 
}