const gameArea = document.getElementById("gameArea");

const renderGameBtns = () => {
  for (let i = 0; i < 4; i++) {
    boxDiv = document.createElement("div");
    boxDiv.id = `box-${i}`;
    boxDiv.className = "game-btns";

    boxDiv.addEventListener("click", (e) => {
      clickHandler(e, i);
    });

    gameArea.append(boxDiv);
  }
};
renderGameBtns();

const allBtns = gameArea.querySelectorAll("div");

// console.log(allBtns);

let levels = 1;
let beepArr = [];
let userClickArr = null;
let arrIndex = null;

const randomBeep = () => {
  arrIndex = 0;
  console.log("level1", levels);

  userInputArr = [];

  for (let i = 0; i < 1; i++) {
    randomNumber = Math.trunc(Math.random() * allBtns.length);
    console.log("random number:", randomNumber);

    beepArr.push(randomNumber);
  }
  levels++;
  console.log("beep array:", beepArr);
};
randomBeep();

const clickHandler = (e, i) => {
  // console.log(i);
  console.log("array index1:", arrIndex);
  userInputArr.push(i);
  console.log("user array:", userInputArr);

  if (i === beepArr[arrIndex]) {
    console.log("match");
    arrIndex++;
    if (JSON.stringify(userInputArr) === JSON.stringify(beepArr)) {
      // levels++;
      randomBeep();
    }
  } else if (i !== beepArr[arrIndex]) {
    alert("not match");
    beepArr = [];
  }
  console.log("array index2:", arrIndex);
};
