import { POS_abbreviations } from "../../utils/lexicon/abb.js";

// Deep clone utility
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getClosestSynset(results) {
  if (!results || results.length === 0) {
    return null; // No results found
  }

  let closest = {};
  const posSet = new Set();

  results.forEach((result, i) => {
    const posAbbreviation = getPOSAbbreviation(result.pos);

    // Deep clone result before assignment
    const clonedResult = deepClone(result);

    if (
      closest[posAbbreviation] === undefined ||
      result.synsetOffset < closest[posAbbreviation].synsetOffset
    ) {
      closest[posAbbreviation] = clonedResult;
    } else {
      closest[posAbbreviation] = clonedResult;
    }
  });
  return { closest, posSet };
}

const getPOSAbbreviation = (pos) => {
  return POS_abbreviations[pos] || pos;
};
