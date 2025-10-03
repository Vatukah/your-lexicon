import 'dotenv/config';

import getOxfordData from './src/services/lexicon/oxford.js';
import {getClosestSynset} from './src/services/lexicon/getClosest.js'
import sampleResponse from './oxfordRespnse.json' with { type: "json" };
import sampleResponse2 from './oxfordResponse_1.json' with { type: "json" };

import wordnikDef from './src/services/lexicon/wordnik.js';
import {getWordMedia} from './src/services/lexicon/wordnik.js'
import Dictionary from './src/services/lexicon/dictionary.js'

import detectPOS from './src/utils/lexicon/detectPOS.js'
import formatOutput from './src/utils/lexicon/formatOutput.js'
import parseOxfordResponse from './src/utils/lexicon/parseOxfordResponse.js';
import extractSynonyms from '../yl-client/src/utils/extractSynonyms.js';




// function extractDefinition(lexicalEntries) {
//     for (const lex of lexicalEntries) {
//       for (const e of lex.entries || []) {
//         for (const s of e.senses || []) {
//           if (s.definitions && s.definitions.length > 0) {
//             return {
//               word: lex.text,
//               lexicalCategory: lex.lexicalCategory?.text,
//               definition: s.definitions[0],
//               senseId: s.id,
//             };
//           }
//         }
//       }
//     }
//     return null;
//   }

//   function extractAllDefinitions(lexicalEntries) {
    
//     const definitions = lexicalEntries.flatMap(lex =>
    
//     return definitions;
//   }

//   const parseResponse = JSON.parse(JSON.stringify(sampleResponse));
//   const result = extractDefinition(parseResponse.results[0].lexicalEntries);
//   console.log(result);
(async () => {
    const word = "asdasde";
    const data = await getOxfordData(word);
    console.log("Word:", data);
    if (data) {
      console.log("Raw Data:", JSON.stringify(data, null, 2));
        const parsed = parseOxfordResponse(data);
        console.log("Parsed Data----------------------------------------");
        console.log(JSON.stringify(parsed, null, 2)); 
    } else {
        console.log("No data found");
    }   
})();


//  wordnikDef("and").then((res) => {
//      if (res) {
//          console.log(res);
//      } else {
//          console.log("No result found");
//      }
//  });

// wordnikDef("and").then((res) => {
//     if (res) {
//         console.log(res);
//     } else {
//         console.log("No result found");
//     }
// });

// Example usage

// console.log(detectPOS("running"));  // [ 'Verb', 'Gerund' ]
// console.log(detectPOS("dog"));      // [ 'Noun' ]
// console.log(detectPOS("quickly"));  // [ 'Adverb' ]


 //console.log(getMorphForm("builting"));
// const lemma = getMorphForm("frequently");
//  console.log(lemma);

// getWordInfo("from").then((result) => {
//     if (result) {
//         console.log(result);
//     } else {
//         console.log("No result found");
//     }
// });


// adverbLemmatizer.js

// getWordMedia("and").then((res) => {
//     if (res) {
//         console.log(res);
//     } else {
//         console.log("No result found");
//     }
// });
