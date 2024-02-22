let btnStart = document.querySelector(".btn-start");
let btnStop = document.querySelector(".btn-stop");
const boardGame = document.querySelector(".game-board");
let score = document.querySelector(".score");
let hightScore = document.querySelector(".highest-score");
let timer = document.querySelector(".timer");
let container = document.querySelector(".container");
let hole;
let ball = document.querySelector(".ball");
let isFalse = false;
let intervalRef; 

addEventListener("deviceorientation", onDeviceMove); 

let getHighScoreFromStorage = localStorage.getItem("highScore");

if (getHighScoreFromStorage) {
  hightScore.textContent = getHighScoreFromStorage;
}

function dispalyHighestScore() {
  let currentScore = parseInt(score.textContent);
  let currentHighScore = parseInt(hightScore.textContent);

  if (currentScore > currentHighScore) {
    currentHighScore = currentScore;
    localStorage.setItem("highScore", currentHighScore);
    hightScore.textContent = currentHighScore;
  }
}

btnStart.addEventListener("click", () => {
  if (!isFalse) {
    isFalse = true;

    let incomeTicker = 61;

    holeAim();
    displayTimer(incomeTicker);
  }
});

btnStop.addEventListener("click", () => {
  if (isFalse) {
    isFalse = false;

    holeAim();
    displayTimerStop();

    dispalyHighestScore();
  }
});

function holeAim() {
  hole = document.createElement("div");
  hole.classList.add("hole");
  hole.textContent = "Aim";
  hole.style.visibility = "visible";
  container.appendChild(hole);
}

function checkBallInHole() {
  const ballRect = ball.getBoundingClientRect(); 
  const holeRect = hole.getBoundingClientRect(); 

  if (
    ballRect.top >= holeRect.top &&
    ballRect.bottom <= holeRect.bottom &&
    ballRect.left >= holeRect.left &&
    ballRect.right <= holeRect.right
  ) {
    alert("Cool!");
    refresh();
    dispalyScore();
  }
}
function onDeviceMove(event) {
  let x = event.gamma; 
  let y = event.beta; 
  console.log(event);

  ball.style.transform = `translate(${x}px,${y}px)`;

  checkBallInHole();
}

function displayTimer(incomeTicker) {
  intervalRef = setInterval(function () {
    if (incomeTicker > 0) incomeTicker--;
    timer.innerHTML = incomeTicker + " seconds";
    if (incomeTicker <= 0) {
      clearInterval(intervalRef);
      isFalse = false;
      alert("The end!");
      refresh();
    }
  }, 1000);
}


function displayTimerStop() {
  clearInterval(intervalRef);
  alert("The end!");
  refresh();

  dispalyHighestScore();
}

function refresh() {
  ball.style.transform = "translate(0px, 0px)";
}

function dispalyScore() {
  let scoreCount = parseInt(score.textContent, 10);
  scoreCount++;
  score.textContent = scoreCount;

  dispalyHighestScore();
}