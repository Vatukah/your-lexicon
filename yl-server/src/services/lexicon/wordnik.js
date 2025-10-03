import axios from "axios";
import  filterDup from "../../utils/lexicon/filterDup.js";
const api = process.env.WORDNIK_API_KEY;



export default async function wordnikDef(word) {
  try {
    const { data } = await axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&api_key=${api}`
    );
    console.log(`Wordnik returned data `,data);
    const filtered = filterDup(data);
    return {result: filtered, source: "wordnik"};
  } catch (error) {
    // Return empty array or null on error, do not throw
    return null;
  }
}

const getPronunciation = async (word) => {
  const response = await axios.get(
    `https://api.wordnik.com/v4/word.json/${word}/pronunciations?api_key=${api}`
  );
  return response.data;
};
const getAudio = async (word) => {
  const response = await axios.get(
    `https://api.wordnik.com/v4/word.json/${word}/audio?api_key=${api}`
  );
  return response.data;
};

export const getWordMedia = async (word) => {
  console.log(`Fetching media for word: ${word}`);
  try {
    const [pronunciation, audio] = await Promise.all([
      getPronunciation(word),
      getAudio(word),
    ]);

    const phonetic = pronunciation.find((pronun) => {
      return pronun.rawType === "ahd-5" || pronun.rawType === "IPA";
    });
    let audioData = audio.find((a) => a.createdBy === "ahd");

    if (!audioData) {
      audioData = audio[0];
    }

    return {
      word,
      phonetic: phonetic.raw || " ",
      audio: audioData.fileUrl || " ",
    };
  } catch (error) {
    return;
  }
};
