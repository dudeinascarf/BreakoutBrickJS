const container = document.querySelector(".container");

const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");

const startBtn = document.querySelector(".start");
const gameOverBtn = document.querySelector(".gameOver");

let gameOver = false;
let gameStarted = true;
let score = 0;
let lives = 3;

let animationRepeat;

let ballDir = {
  x: 5,
  y: 5,
  speed: 5,
};

const containerDim = container.getBoundingClientRect();

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

function startGame() {
  gameOverBtn.style.display = "none";
  ball.style.display = "block";
  animationRepeat = requestAnimationFrame(update);
  gameStarted = true;
  gameOver = false;
}

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function update() {
  if (gameOver === false) {
    currPaddle = paddle.offsetLeft;
    if (paddle.left && currPaddle > 0) {
      currPaddle -= 5;
    } else if (
      paddle.right &&
      currPaddle < containerDim.width - paddle.offsetWidth
    ) {
      currPaddle += 5;
    }
    paddle.style.left = currPaddle + "px";

    if (!gameStarted) {
      ballOnPaddle();
    } else {
      ballMoving();
    }

    animationRepeat = requestAnimationFrame(update);
  }
}

function ballOnPaddle() {
  ball.style.top = paddle.offsetTop - 22 + "px";
  ball.style.left = paddle.offsetLeft + 70 + "px";
}

function ballMoving() {
  let x = ball.offsetLeft;
  let y = ball.offsetTop;

  if (x > containerDim.width - 20 || x < 0) {
    ballDir.x *= -1;
  } else if (y > containerDim.height - 20 || y < 0) {
    ballDir.y *= -1;
  }

  x += ballDir.x;
  y += ballDir.y;

  ball.style.top = y + "px";
  ball.style.left = x + "px";
}
