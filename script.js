const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const startOverBtn = document.querySelector(".start-over");
const checkBtn = document.querySelector(".check-word");
const inputBox = document.querySelector("input");
let correctWord, timer;

var noviceBtn = document.getElementById("novice");
var standardBtn = document.getElementById("standard");
var expertBtn = document.getElementById("expert");

var startPnl = document.getElementById("start");
var mainPnl = document.getElementById("main");

var scoreCounter = 0;
const scoreText = document.querySelector(".score span");
const allText = document.querySelector(".score b");
scoreText.innerHTML = scoreCounter;

var levelInfo;

const initTimer = (maxTime) => {
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerHTML = maxTime);
    }
    // clearInterval(timer)
    alert("Time is up! 😎");
    scoreCounter = 0;
    scoreText.innerHTML = scoreCounter;
    initGame(levelInfo.Type, levelInfo.Time);
  }, 1000);
};

const initGame = (words, time) => {
  allText.innerHTML = words.length;
  clearInterval(timer);
  initTimer(time);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  console.log(randomObj);
  let wordArrays = randomObj.word.split("");
  for (let i = wordArrays.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArrays[i], wordArrays[j]] = [wordArrays[j], wordArrays[i]];
  }

  if (wordArrays.join("").toLowerCase() == randomObj.word.toLowerCase()) return;

  wordText.innerHTML = wordArrays.join("");
  hintText.innerHTML = randomObj.hint;

  correctWord = randomObj.word.toLowerCase();
};

noviceBtn.onclick = () => {
  levelInfo = { Type: noviceWords, Time: 21 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
};

standardBtn.onclick = () => {
  levelInfo = { Type: standardWords, Time: 16 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
};

expertBtn.onclick = () => {
  levelInfo = { Type: expertWords, Time: 11 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
};

const pnlVisibility = () => {
  startPnl.setAttribute("class", "d-none");
  mainPnl.classList.remove("d-none");
};

checkBtn.onclick = () => {
  let userWord = inputBox.value.toLocaleLowerCase();
  if (!userWord) return alert("Please Enter a Word");
  if (userWord !== correctWord)
    return alert(`Vay! ${userWord} is not Correct! 👋`);
  inputBox.value = "";
  scoreCounter++;
  scoreText.innerHTML = scoreCounter;
  if (scoreCounter == levelInfo.Type.length) {
    alert(`Winner Shodi! 🎉`);
    startOverBtn.onclick();
  } else {
    alert(`Doroste! ${userWord} is Correct! ✔️`);
    initGame(levelInfo.Type, levelInfo.Time);
  }
};

startOverBtn.onclick = () => {
  document.location.reload();
};
