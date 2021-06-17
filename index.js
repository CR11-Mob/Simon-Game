const container = document.getElementById("container");
const gameArea = document.getElementById("gameArea");
const overlay = document.querySelector(".overlay");

const gameLevelDiv = document.getElementById("gameLevels");

/*************** COLOR ARRAY ***************/

let buttonColors = ["green", "red", "yellow", "blue"];

/*************** RENDER GAME BUTTONS ***************/

const renderGameBtns = () => {
  for (let i = 0; i < buttonColors.length; i++) {
    let randomSelectedColor = buttonColors[i];

    let boxDiv = document.createElement("div");
    boxDiv.id = `${randomSelectedColor}-${i}`;

    boxDiv.addEventListener("click", (e) => {
      clickHandler(e, i);
    });

    gameArea.append(boxDiv);
  }
};
renderGameBtns();

/*************** GAME START EVENT ***************/

document.addEventListener("keyup", (e) => {
  // console.log(e);
  overlay.style.display = "none";
  if (e.key === "Enter") {
    setTimeout(() => {
      randomBeep();
    }, 500);
  }
});

/*************** VARIABLE DECLARATION ***************/

const allBtns = gameArea.querySelectorAll("div");

let levels = 1;
let highestLevel = localStorage.getItem("highestLevel");

let beepArr = [];
let userInputArr = null;
let arrIndex = null;

let timer = 0;
let speed = 300;
let gameOver = false;

/*************** RANDOM BEEPING ***************/

const randomBeep = () => {
  timer = 0;
  arrIndex = 0;

  userInputArr = [];

  let randomNumber = Math.trunc(Math.random() * allBtns.length);
  // console.log("random number:", randomNumber);

  beepArr.push(randomNumber);

  for (let i = 0; i < beepArr.length; i++) {
    timer += speed;

    let randomSelectedColor = buttonColors[beepArr[i]];
    console.log(randomSelectedColor);

    let beepColor = document.getElementById(
      `${randomSelectedColor}-${beepArr[i]}`
    );

    setTimeout(() => {
      beepColor.classList.add(`${randomSelectedColor}`);

      let audio = new Audio(`/sounds/${randomSelectedColor}.mp3`);
      audio.play();
    }, timer);

    setTimeout(() => {
      beepColor.classList.remove(`${randomSelectedColor}`);
    }, timer + speed - 100);
  }
  // console.log("beep array:", beepArr);
};

/*************** DISPLAY PLAYER LEVEL ***************/

const displayLevels = () => {
  gameLevelDiv.innerHTML = `LEVEL ${levels}`;
};
displayLevels();

/*************** HANDLE PLAYER CLICK ***************/

const clickHandler = (e, i) => {
  if (gameOver === true) return;

  userInputArr.push(i);

  let randomSelectedColor = buttonColors[i];
  console.log(randomSelectedColor);

  let clickedBtn = document.getElementById(`${randomSelectedColor}-${i}`);
  clickedBtn.classList.add(`${randomSelectedColor}`);

  setTimeout(() => {
    clickedBtn.classList.remove(`${randomSelectedColor}`);
  }, 300);

  if (i === beepArr[arrIndex]) {
    let audio = new Audio(`/sounds/${randomSelectedColor}.mp3`);
    audio.play();

    arrIndex++;

    if (JSON.stringify(userInputArr) === JSON.stringify(beepArr)) {
      setTimeout(() => {
        gameLevelDiv.innerHTML = "";
        levels++;

        randomBeep();
        displayLevels();
      }, 500);
    }
  } else if (i !== beepArr[arrIndex]) {
    gameOver = true;
    beepArr = [];

    let wrongBeep = new Audio(`/sounds/wrong.mp3`);
    wrongBeep.play();

    setTimeout(() => {
      gameOverDisplay();
    }, 1000);
  }
};

/*************** GAME OVER ***************/

const gameOverDisplay = () => {
  console.log(levels);
  let overlay = document.createElement("div");
  overlay.className = "overlay";

  let content = document.createElement("div");
  content.id = "gameOverContent";
  content.className = "content";

  let gameOverText = document.createElement("div");
  gameOverText.className = "gameOver-text";

  gameOverText.innerHTML = `Game Over`;

  let level = document.createElement("div");
  level.className = "player-level";

  if (highestLevel !== null) {
    if (levels == highestLevel) {
      level.innerHTML = `WOW! YOU ALMOST BREAK THE RECORD... ${highestLevel}`;
    } else if (levels > highestLevel) {
      localStorage.setItem("highestLevel", levels);
      level.innerHTML = `AWESOME! YOU SET THE NEW RECORD... ${levels}`;
    } else {
      level.innerHTML = `HIGHEST LEVEL REACHED... ${highestLevel}`;
    }
  } else {
    localStorage.setItem("highestLevel", levels);
    level.innerHTML = `YOU REACH... LEVEL ${levels}`;
  }

  let restart = document.createElement("div");
  restart.className = "game-restart";

  restart.innerHTML = `<span id = "restart">Restart</span>`;

  overlay.append(content);
  content.append(gameOverText, level, restart);
  container.append(overlay);

  document.getElementById("restart").addEventListener("click", () => {
    window.location.reload();
  });
};
