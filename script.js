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
var healthCounter = 0;
const scoreText = document.querySelector(".score span");
const healthText = document.querySelector(".health span");
const allText = document.querySelector(".score b");
scoreText.innerHTML = scoreCounter;

var levelInfo;

var arrayIndex=0;

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

  if(randomObj.used===false){
    wordText.innerHTML = wordArrays.join("");
    hintText.innerHTML = randomObj.hint;
  
    correctWord = randomObj.word.toLowerCase();
        
     arrayIndex++;

    randomObj.used=true;
  }
  else{

    if(arrayIndex===words.length){ 

      alert(`score : ${scoreCounter}`)
      document.location.reload();

    }
    else{
      initGame(levelInfo.Type, levelInfo.Time);
    }

  }

};

noviceBtn.onclick = () => {
  levelInfo = { Type: noviceWords, Time: 21 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
  health(7);
};

standardBtn.onclick = () => {
  levelInfo = { Type: standardWords, Time: 16 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
  health(5);
};

expertBtn.onclick = () => {
  levelInfo = { Type: expertWords, Time: 11 };
  initGame(levelInfo.Type, levelInfo.Time);
  pnlVisibility();
  health(3);
};

const pnlVisibility = () => {
  startPnl.setAttribute("class", "d-none");
  mainPnl.classList.remove("d-none");
};

const health = (count) => {
  for (let i = 0; i < count; i++) {
    healthText.innerHTML = healthText.innerHTML + " ❤ ";
  }
  healthCounter = count;
};

checkBtn.onclick = () => {
  let userWord = inputBox.value.toLocaleLowerCase();
  if (!userWord) return alert("Please Enter a Word");
  if (userWord !== correctWord) {
    alert(`Vay! ${userWord} is not Correct! 👋`);
    healthText.innerHTML = healthText.innerHTML.substring(
      3,
      healthText.innerHTML.length
    );
    healthText.innerHTML = healthText.innerHTML + " 💔 ";
    healthCounter--;
    console.log(healthCounter);
    if (healthCounter <= 0) {
      alert(`Loser shodi! 😪`);
      startOverBtn.onclick();
    }
  } else {
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
  }
};

startOverBtn.onclick = () => {
  document.location.reload();
};
