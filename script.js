

const wordText = document.querySelector(".word")

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)]
    let wordArrays = randomObj.word.split("")
    for (let i = wordArrays.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArrays[i], wordArrays[j]] = [wordArrays[j], wordArrays[i]];
    }
    
    wordText.innerHTML = wordArrays.join("");
    console.log(wordArrays)
}

initGame()