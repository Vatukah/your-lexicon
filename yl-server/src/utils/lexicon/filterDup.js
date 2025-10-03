// utility to filter duplicate partOfSpeech entries
export default function filterDup(result) {
  let filtered = {};
  result.forEach((r) => {
    if (!filtered[r.partOfSpeech]) {
      filtered[r.partOfSpeech] = r;
    }
  });
  return Object.values(filtered); // return array instead of object
}