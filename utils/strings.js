export function removeLastCharacter(word, char) {
    if (word.endsWith(char)) {
        word = word.slice(0, -1);
        return word;
    }
}