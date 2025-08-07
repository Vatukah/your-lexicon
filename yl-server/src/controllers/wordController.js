import axios from 'axios';

class WordController {
    async getMeaning(req, res) {
        const { word } = req.params;

        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = response.data[0]; // Get first result

            const meanings = data.meanings.map((meaning) => ({
                partOfSpeech: meaning.partOfSpeech,
                definitions: meaning.definitions.map((def) => def.definition),
            }));

            res.json({
                word: data.word,
                phonetic: data.phonetic || '',
                meanings,
            });
        } catch (error) {
            console.error(error.message);
            res.status(404).json({ error: 'Definition not found.' });
        }
    }
}

export default WordController;
