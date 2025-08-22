import axios from "axios";

const api = process.env.WORDNIK_API_KEY;

console.log(api)

 const getPronunciation = async (word) => {

        const response = await axios.get(`https://api.wordnik.com/v4/word.json/${word}/pronunciations?api_key=${api}`);
        return response.data;

};
const getAudio = async (word) => {

        const response = await axios.get(`https://api.wordnik.com/v4/word.json/${word}/audio?api_key=${api}`);
        return response.data;
   
};

const getWordMedia = async (word) => {


    try {
        const [pronunciation, audio] = await Promise.all([
            getPronunciation(word),
            getAudio(word)
        ]);

       const phonetic = pronunciation.find((pronun) => {
           return pronun.rawType === 'ahd-5';
       });
      const audioData = audio.find(a => a.createdBy === 'ahd');

      return { word, phonetic: phonetic.raw, audio: audioData.fileUrl };
    } catch (error) {
       
        throw error;
    }
};

export default getWordMedia;