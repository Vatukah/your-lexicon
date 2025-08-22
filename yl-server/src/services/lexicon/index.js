
import { getClosestSynset } from "./getClosest.js";
import formatOutput from "../../utils/lexicon/formatOutput.js";
import getWordMedia from "./wordnik.js";
import { lookupWord } from "./wordnet.js";

export default async function getWordInfo(word) {
 const results = await lookupWord(word);

 const { closest, posSet } = getClosestSynset( results );
 // output formated
 const formatted = formatOutput(closest);
// get the pronunciation and audio
 const media = await getWordMedia(word);
 if (media) {
   return { ...media, meanings: formatted };
 } else {
   return { word, phonetic: "", audio: "", meanings: formatted };
 }
}
