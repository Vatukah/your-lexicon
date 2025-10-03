import nlp from 'compromise';

export default function detectPOS(word) {
  let doc = nlp(word)
  let tags = doc.terms(0).out('tags');  // get POS tags
  const t = tags[0];
  console.log(t);
  const arrPos = Object.entries(t).map(([key,value]) => value)[0];
  return arrPos;
}


export function lemma(word) {
  const doc = nlp(word);
 doc.normalize({
    text: word,
    whitespace: true,
    plurals: false,
    punctuation: true,
    case: true,
    contractions: true,
    nouns: true,
    verbs: true, adjectives: true,
    adverbs: true
    
  });
  return doc.out();
}