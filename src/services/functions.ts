export const textContent = (text: string) => {
  const words = text.split(" ");
  const processedWords = words.map((word) => {
    const isHashTag = word.startsWith("#");
    if (!isHashTag) {
      return word;
    }

    const hasWordPunctuationMarks = word.includes("?") || word.includes("!") || word.includes(".") || word.includes(",");

    if (!hasWordPunctuationMarks) {
      return `<span class="tag">${word}</span>`;
    }

    const punctuationMarkIndex = word.split("").findIndex((letter) => "?!,.".includes(letter));
    const firstPartOfWord = word.slice(0, punctuationMarkIndex);
    const lastPartOfWord = word.slice(punctuationMarkIndex);
    return `<span>${firstPartOfWord}</span>${lastPartOfWord}`;
  });
  return processedWords.join(" ");
};

export const createMarkup = (value: string) => {
  return { __html: value };
};
