const wordText = document.querySelector(".word")
const hintText = document.querySelector(".hint span")
const timeText = document.querySelector(".time b")
const refreshBtn = document.querySelector(".refresh-word") 
const checkBtn = document.querySelector(".check-word")
const inputBox = document.querySelector("input")  
let correctWord , timer;

const initTimer = maxTime => {

    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--
            return timeText.innerHTML = maxTime
        }
        // clearInterval(timer)
        alert("Time Over! 😎")
        initGame()
    },1000)


}

const initGame = () => {
    clearInterval(timer)
    initTimer(20)
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
    if(!userWord)  return alert ("Please Enter a Word")
    if(userWord !== correctWord) return alert (`Vay! ${userWord} is not Correct! 👋`)
   inputBox.value = "";
    alert(`Doroste! ${userWord} is Correct! ✔️`)
    initGame();
    console.log(userWord)
}

refreshBtn.addEventListener("click" , initGame)
checkBtn.addEventListener("click" , solveWord)