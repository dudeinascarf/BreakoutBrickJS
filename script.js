const container = document.querySelector(".container");

const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");

const startBtn = document.querySelector(".start");
const gameOverBtn = document.querySelector(".gameOver");

let livesText = document.querySelector(".lives");
let scoreText = document.querySelector(".score");

let gameOver = true;
let gameStarted = false;
let score;
let lives;

let animationRepeat;

let ballDir = {
  x: 5,
  y: 5,
  speed: 5,
};

const containerDim = container.getBoundingClientRect();

startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  e.preventDefault();
  if (e.key === "ArrowLeft") {
    paddle.left = true;
  } else if (e.key === "ArrowRight") {
    paddle.right = true;
  } else if (e.key === "r" && !gameStarted) {
    gameStarted = true;
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
  if (gameOver) {
    gameOverBtn.style.display = "none";
    ball.style.display = "block";
    lives = 3;
    lifeUpdate();
    animationRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameStarted = false;
  }
}

function update() {
  if (gameOver === false) {
    let currPaddle = paddle.offsetLeft;
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
  }
  if (y > containerDim.height - 20 || y < 0) {
    if (y > containerDim.height - 20) {
      BallOffScreen();
      return;
    }
    ballDir.y *= -1;
  }

  if (isCollide(ball, paddle)) {
    let nDir = (x - paddle.offsetLeft - paddle.offsetWidth / 2) / 10;
    ballDir.x = nDir;
    ballDir.y *= -1;
  }

  x += ballDir.x;
  y += ballDir.y;

  ball.style.top = y + "px";
  ball.style.left = x + "px";
}

function stopper() {
  gameStarted = false;
  ballDir.x = 0;
  ballDir.y = -5;
  ballOnPaddle();
  window.cancelAnimationFrame(animationRepeat);
}

function lifeUpdate() {
  livesText.innerText = lives;
}

function BallOffScreen() {
  lives--;
  lifeUpdate();
  stopper();
}

function isCollide(ballC, paddleC) {
  let aRect = ballC.getBoundingClientRect();
  let bRect = paddleC.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
