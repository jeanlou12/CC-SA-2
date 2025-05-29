let ball;
let paddle;
let bricks = [];
let rows = 5;
let cols = 8;
let brickWidth = 80;
let brickHeight = 30;
let brickSpacing = 10;
let gameOver = false;
let youWin = false;
let score = 0;

// Sounds
let bounceSound;
let brickSound;
let gameOverSound;
let winSound;

function preload() {
  bounceSound = loadSound("click-36683.mp3");
  brickSound = loadSound("bricks-104933.mp3");
  gameOverSound = loadSound("losing-horn-313723.mp3");
  winSound = loadSound("you-win-sequence-1-183948.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  paddle = new Paddle();

  // Center the brick layout
  let totalGridWidth = cols * brickWidth + (cols - 1) * brickSpacing;
  let totalGridHeight = rows * brickHeight + (rows - 1) * brickSpacing;
  let startX = (width - totalGridWidth) / 2;
  let startY = 80;

  bricks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = startX + c * (brickWidth + brickSpacing);
      let y = startY + r * (brickHeight + brickSpacing);
      bricks.push(new Brick(x, y));
    }
  }
}

function draw() {
  background(0);

  // Show score
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);

  if (gameOver) {
    showGameOver();
    return;
  }

  if (youWin) {
    showWin();
    return;
  }

  ball.update();
  ball.checkEdges();
  ball.checkPaddle(paddle);
  ball.checkBricks(bricks);

  ball.show();
  paddle.update();
  paddle.show();

  // Draw bricks and  then count  the remaining
  let remaining = 0;
  for (let brick of bricks) {
    if (!brick.destroyed) {
      brick.show();
      remaining++;
    }
  }

  if (remaining === 0 && !youWin) {
    youWin = true;
    winSound.play();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    paddle.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    paddle.move(1);
  }
}

function keyReleased() {
  paddle.move(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  paddle = new Paddle(); // Reset paddle on resize
}

// Ball class
class Ball {
  constructor() {
    this.r = 20;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - 60;
    this.xSpeed = 4;
    this.ySpeed = -4;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.y > height) {
      gameOver = true;
      gameOverSound.play();
    }
  }

  checkEdges() {
    if (this.x < this.r || this.x > width - this.r) {
      this.xSpeed *= -1;
      bounceSound.play();
    }
    if (this.y < this.r) {
      this.ySpeed *= -1;
      bounceSound.play();
    }
  }

  checkPaddle(paddle) {
    if (
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w &&
      this.y + this.r > paddle.y
    ) {
      this.ySpeed *= -1;
      this.y = paddle.y - this.r;
      bounceSound.play();
    }
  }

  checkBricks(bricks) {
    for (let brick of bricks) {
      if (!brick.destroyed) {
        if (
          this.x > brick.x &&
          this.x < brick.x + brick.w &&
          this.y - this.r < brick.y + brick.h &&
          this.y + this.r > brick.y
        ) {
          this.ySpeed *= -1;
          brick.destroyed = true;
          score += 10;
          brickSound.play();
          break;
        }
      }
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

// Paddle class
class Paddle {
  constructor() {
    this.w = 120;
    this.h = 12;
    this.x = width / 2 - this.w / 2;
    this.y = height - 30;
    this.speed = 8;
    this.dir = 0;
  }

  move(dir) {
    this.dir = dir;
  }

  update() {
    this.x += this.dir * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

// Brick class
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = brickWidth;
    this.h = brickHeight;
    this.destroyed = false;
  }

  show() {
    fill(200, 100, 255);
    rect(this.x, this.y, this.w, this.h);
  }
}

function showGameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Game Over!", width / 2, height / 2);
  textSize(20);
  text("Score: " + score, width / 2, height / 2 + 40);
}

function showWin() {
  background(0);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("You Win!", width / 2, height / 2);
  textSize(20);
  text("Final Score: " + score, width / 2, height / 2 + 40);
}
