// DOM references

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Variables
  // Constants

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 35;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 20;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const PI2 = Math.PI * 2;
const objectColor = '#0095DD';
const brickColors = ['#ed4040', '#ed9640', '#edd340', '#94ed40', '#40ed6e', '#40edc8', '#4091ed', '#3d42d1', '#9940ed', '#ed40d3'];

  // Variables


let x;
let y;
let dx;
let dy;

let ball = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
};

let paddleX;

resetBallAndPaddle();

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;


let ballColor = objectColor;

// Setup Bricks Array
const bricks = [];

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = objectColor;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = objectColor;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function resetBallAndPaddle() {
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = paddleXStart;

};

function moveBall() {
  x += dx;
  y += dy;
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, PI2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = objectColor;
  ctx.fill();
  ctx.closePath();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColors[c];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x
          && x < b.x + brickWidth
          && y > b.y
          && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += (5 - r);
          ballColor = getRandomColor();
          if (score == 15 * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
            // if (!lives) {
            //   // eslint-disable-next-line no-alert
            //   alert('GAME OVER');
            //   document.location.reload();
            // } else {
            //   resetBallAndPaddle();
            // }
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();

  // bounce the ball off the left and right of the canvas
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // bounce the ball off the top, paddle, or hit the bottom of the canvas
  if (y + dy < ballRadius) {
    // hit the top
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // hit the bottom
    if (x > paddleX && x < paddleX + paddleWidth) {
      // hit the paddle
      dy = -dy;
      // lose a life
    } else {
      // eslint-disable-next-line no-alert
      lives -= 1;
      if(!lives) {
        alert("GAME OVER");
        x = 200;
        y = 200;
        document.location.reload();
      }
      else {
        resetBallAndPaddle()
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  moveBall()

  requestAnimationFrame(draw);
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
