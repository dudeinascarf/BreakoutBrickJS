const container = document.querySelector(".container");

const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");

const startBtn = document.querySelector(".start");

const gameOver = false;
const gameStarted = false;

let score = 0;
let lives = 3;

let animationRepeat;

let ballDir = {
  x: 5,
  y: 5,
  speed: 5,
};

const containerDim = container.getBoundingClientRect();

function startGame() {}

function keyDownHandler(e) {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    paddle.left = true;
  } else if (e.key === "ArrowRight") {
    paddle.right = true;
  }
}

function keyUpHandler(e) {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    paddle.left = false;
  } else if (e.key === "ArrowRight") {
    paddle.right = false;
  }
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
