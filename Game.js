import Ball from './Ball';
import Paddle from './Paddle';
import Bricks from './Bricks';
import GameLabel from './GameLabel';

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    this.ballRadius = 10;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 5;
    this.brickColumnCount = 10;
    this.brickWidth = 35;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 20;
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;
    this.objectColor = '#0095DD';
    this.ballColor = this.objectColor;

    this.gameOverMessage = 'GAME OVER!';
    this.gameWinMessage = 'YOU WIN, CONGRATS!';

    this.brickColors = ['#ed4040', '#ed9640', '#edd340', '#94ed40', '#40ed6e', '#40edc8', '#4091ed', '#3d42d1', '#9940ed', '#ed40d3'];

    this.ball = new Ball(0, 0, 2, -2, this.ballRadius, this.objectColor);
    // eslint-disable-next-line max-len
    this.paddle = new Paddle(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight);
    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: this.objectColor,
    });
    // cols, rows, width, height, padding, offsetLeft, offsetTop, color
    this.scoreLabel = new GameLabel('Score', 8, 20);
    this.livesLabel = new GameLabel('Lives', this.canvas.width - 65, 20);
    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    this.resetBallAndPaddle();

    // bind assigns the correct 'this' in the class context
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x > brick.x
            && this.ball.x < brick.x + this.brickWidth
            && this.ball.y > brick.y
            && this.ball.y < brick.y + this.brickHeight
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            // the code below assigns differential score values based on the row of bricks.
            // The lower most row, when hit, adds 1 point and each ascending row adds one more point
            // For example, hitting first row row from the bottom scores the player 1 point,
            // second row scores 2 points 3rd row scores 3 points etc.
            this.scoreLabel.value += (5 - r);
            this.ballColor = this.getRandomColor();
            if (this.scoreLabel.value === 15 * this.bricks.cols) {
              // eslint-disable-next-line no-alert
              alert(this.gameWinMessage);
              document.location.reload();
            }
          }
        }
      }
    }
  } // end collision detection

  // eslint-disable-next-line class-methods-use-this
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let randomColor = '#';
    for (let i = 0; i < 6; i += 1) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle() {
    // bounce the ball off the left and right of the canvas
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    // bounce the ball off the top, paddle, or hit the bottom of the canvas
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      // hit the top
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      // hit the bottom
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        // hit the paddle
        this.ball.dy = -this.ball.dy;
        // lose a life
      } else {
        // eslint-disable-next-line no-alert
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          // eslint-disable-next-line no-alert
          alert(this.gameOverMessage);
          // ball.x = 200;
          // ball.y = 200;
          document.location.reload();
        } else {
          this.resetBallAndPaddle();
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.collisionDetection();
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    this.ball.move();
    this.movePaddle();
    this.collisionsWithCanvasAndPaddle();
    // Draw the screen again
    requestAnimationFrame(this.draw.bind(this)); // FIX ME ********************************
  }
}

export default Game;
