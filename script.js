const container = document.querySelector(".container");

const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");

const startBtn = document.querySelector(".start");
const gameOverTxt = document.querySelector(".gameOver");

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
    gameOverTxt.style.display = "none";
    ball.style.display = "block";
    lives = 3;
    setupBricks(16);
    lifeUpdate();
    animationRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameStarted = false;
  }
}

function setupBricks(num) {
  var row = {
    x: (containerDim.width % 100) / 2,
    y: 50,
  };
  for (var x = 0; x < num; x++) {
    if (row.x > containerDim.width - 100) {
      row.y += 70;
      row.x = (containerDim.width % 100) / 2;
    }
    brickMaker(row);
    row.x += 100;
  }
}

function brickMaker(row) {
  let div = document.createElement("div");
  div.setAttribute("class", "brick");
  div.style.backgroundColor = "black";
  let pointDiv = Math.ceil(Math.random() * 10) + 2;
  div.dataset.points = pointDiv;
  div.innerHTML = pointDiv;
  div.style.left = row.x + "px";
  div.style.top = row.y + "px";
  container.appendChild(div);
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
  ball.style.left = paddle.offsetLeft + 90 + "px";
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

  let tempBricks = document.querySelectorAll(".brick");

  if (tempBricks.length == 0) {
    stopper();
    setupBricks(20);
  }

  for (let tarBrick of tempBricks) {
    if (isCollide(tarBrick, ball)) {
      ballDir.y *= -1;
      tarBrick.parentNode.removeChild(tarBrick);
      scoreUpdate(tarBrick.dataset.points);
    }
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

function scoreUpdate(num) {
  score += parseInt(num);
  scoreText.innerText = score;
}

function lostGame() {
  gameOverTxt.style.display = "block";
  gameOverTxt.innerHTML = "YOU LOST";
  gameOver = true;
  ball.style.display = "none";
}

function BallOffScreen() {
  lives--;
  if (lives === 0) {
    lostGame();
  }
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
