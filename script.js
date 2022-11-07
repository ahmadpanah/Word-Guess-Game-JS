

const wordText = document.querySelector(".word")
const hintText = document.querySelector(".hint span")
const refreshBtn = document.querySelector(".refresh-word") 
const checkBtn = document.querySelector(".check-word")
const inputBox = document.querySelector("input")  
let correctWord;

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)]
    let wordArrays = randomObj.word.split("")
    for (let i = wordArrays.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArrays[i], wordArrays[j]] = [wordArrays[j], wordArrays[i]];
    }
    
    wordText.innerHTML = wordArrays.join("");
    hintText.innerHTML = randomObj.hint;
    
    correctWord = randomObj.word.toLowerCase()
    
    console.log(randomObj)
}

initGame()

const solveWord = () => {
    let userWord = inputBox.value.toLocaleLowerCase()
    if(userWord !== correctWord) return alert (`Vay! ${userWord} is not Correct! 👋`)
    alert(`Doroste! ${userWord} is Correct! ✔️`)
    console.log(userWord)
}

refreshBtn.addEventListener("click" , initGame)
checkBtn.addEventListener("click" , solveWord)