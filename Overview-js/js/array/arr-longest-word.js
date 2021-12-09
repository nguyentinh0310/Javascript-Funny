// write function to find word the longest word
// for...i
// forEach
// reduce

function findLongestForI(wordList) {
  if (!Array.isArray(wordList) || wordList.length === 0) return undefined;

  let longestWord = wordList[0];
  for (let i = 0; i < wordList.length; i++) {
    let currentWord = wordList[i];

    if (currentWord.length > longestWord.length) {
      longestWord = currentWord;
    }
  }
  return longestWord;
}
const wordList = ["Developer", "Frontend"];
console.log(findLongestForI(wordList));

/***********************************************************/
function findLongestForEach(wordList) {
  if (!Array.isArray(wordList) || wordList.length === 0) return undefined;

  let longestWord = wordList[0];
  wordList.forEach((currentWord) => {
    if (currentWord.length > longestWord.length) {
      longestWord = currentWord;
    }
  });
  return longestWord;
}
const wordList = ["Developer", "Frontend"];
console.log(findLongestForEach(wordList));

/***********************************************************/
function findLongestReduce(wordList) {
  if (!Array.isArray(wordList) || wordList.length === 0) return undefined;

  return wordList.reduce((longestWord, currentWord) =>
    currentWord.length > longestWord.length ? currentWord : longestWord
  );
}
const wordList = ["Developer", "Frontend"];
console.log(findLongestReduce(wordList));
