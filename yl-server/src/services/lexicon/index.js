import Dictionary from "./dictionary.js";
import formatOutput from "../../utils/lexicon/formatOutput.js";
import normalizeSearchInput from "../../utils/lexicon/nrmSearchInput.js";
import { lemma } from "../../utils/lexicon/detectPOS.js";
import generateMorphDescription from "../../utils/lexicon/getMorphDesc.js";
import { getWordMedia } from "./wordnik.js";
import getOxfordData from "./oxford.js";
import parseOxfordResponse from "../../utils/lexicon/parseOxfordResponse.js";
export default async function getWordInfo(word) {
  const normalizedWord = normalizeSearchInput(word);

  let wordInfo = null;
  let lemmaWord = null;

  wordInfo = await Dictionary(normalizedWord);

  if (!wordInfo) {
    lemmaWord = lemma(normalizedWord);
    if (lemmaWord !== normalizedWord) {
      console.log(`Trying base form "${lemmaWord}"...`);
      wordInfo = await Dictionary(lemmaWord);
      console.log("wordInfo for lemma:", wordInfo);
      if (!wordInfo) {
        return null;
      }
    }
  }

  const formatted = formatOutput(wordInfo);
  const morphDescription = lemma
    ? `${normalizedWord} is the form of ${lemmaWord}`
    : null;

  // get the pronunciation and audio
  let media = {};
  try {
    media = await getWordMedia(normalizedWord);
  } catch (e) {
    media = {};
  }

  return {
    ...media,
    meanings: formatted,
    word: normalizedWord,
    phonetic: media?.phonetic || "",
    audio: media?.audio || "",
    lemma: lemmaWord || normalizedWord,
    description: morphDescription,
  };
}

export async function oxfordMeaning( word ) {
    const data = await getOxfordData(word);
    if (data) {
        const parsed = parseOxfordResponse(data);
        return parsed;
    } else {
        return {word: word, lexicalEntries: []};
    }
}