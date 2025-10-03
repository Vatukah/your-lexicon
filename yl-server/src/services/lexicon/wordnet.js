import natural from "natural";
import {getClosestSynset} from "./getClosest.js";
const wordnet = new natural.WordNet();

export default function wordnetDef(word) {
  return new Promise((resolve, reject) => {
    wordnet.lookup(word, (results) => {
      if (results && results.length > 0) {
        const closest = getClosestSynset(results);
        resolve({result: closest, source: "wordnet"});
      } else {
        resolve(null);
      }
    });
  });
};
