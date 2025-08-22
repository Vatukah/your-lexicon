export default function formatOutput(wordInfo){
    if (!wordInfo) {
        return "No information available.";
    }

    

    if (!wordInfo || Object.keys(wordInfo).length === 0) {
        return "No closest synset found.";
    }

    const formatted = Object.entries(wordInfo).map(([pos, info]) => {
        return {
            partOfSpeech: pos,
            definition: info.def || "No definition available.",
            glossary: info.gloss || "No glossary available.",
            examples: info.exp || [],
            synonyms: info.synonyms || [],
        };
    });

    return formatted;
}