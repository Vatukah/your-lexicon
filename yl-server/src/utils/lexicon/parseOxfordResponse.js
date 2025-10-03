export default function parseOxfordResponse(data) {
  if (!data?.results) return null;
   
  let result = null;
  if (data.results.length > 1) {
    data.results.forEach((res) => res.id === data.query && (result = res));
  }else{
    result = data.results[0];
  }

  return {
    word: result.word,
    language: result.language,
    lexicalEntries: result.lexicalEntries.map((lex) => ({
      lexicalCategory: lex.lexicalCategory?.text,
      text: lex.text,
      etymologies: lex.entries?.flatMap((e) => e.etymologies || []) || [],
      pronunciations: [
        ...(lex.entries?.flatMap((e) => e.pronunciations || []) || []),
      ].map((p) => ({
        audio: p.audioFile,
        phoneticSpelling: p.phoneticSpelling,
        dialects: p.dialects,
      })),
      inflections: lex.entries?.flatMap((e) =>
        (e.inflections || []).map((inf) => ({
          form: inf.inflectedForm,
          pronunciations: (inf.pronunciations || []).map((p) => ({
            audio: p.audioFile,
            phoneticSpelling: p.phoneticSpelling,
          })),
          grammaticalFeatures: inf.grammaticalFeatures?.map((f) => f.text),
        }))
      ),
      senses: lex.entries?.flatMap((e) =>
        (e.senses || []).map((sense) => ({
          id: sense.id,
          definitions: sense.definitions || [],
          shortDefinitions: sense.shortDefinitions || [],
          examples: (sense.examples || []).map((ex) => ex.text),
          registers: (sense.registers || []).map((r) => r.text),
          synonyms: (sense.synonyms || []).map((s) => s.text),
          subsenses: (sense.subsenses || []).map((sub) => ({
            id: sub.id,
            definitions: sub.definitions || [],
            shortDefinitions: sub.shortDefinitions || [],
            examples: (sub.examples || []).map((ex) => ex.text),
            synonyms: (sub.synonyms || []).map((s) => s.text),
          })),
        }))
      ),
    })),
  };
}
