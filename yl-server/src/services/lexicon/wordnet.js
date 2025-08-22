import natural from "natural";
const wordnet = new natural.WordNet();




export const lookupWord = (word) => {

    return new Promise((resolve, reject) => {
        wordnet.lookup(word, (results) => {
            if (results && results.length > 0) {
                resolve(results);
            } else {
                reject(new Error(`No results found for word: ${word}`));
            }
        });
    });
}


