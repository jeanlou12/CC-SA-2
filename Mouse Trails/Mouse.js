let hearts = [];
let heartColor = [255, 100, 150]; // default pink

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  background('white'); // Draw white once
}

function draw() {
  // hearts
  for (let h of hearts) {
    fill(heartColor[0], heartColor[1], heartColor[2]);
    noStroke();
    drawHeart(h.x, h.y, h.size);
  }

  // Mouse speed to adjust heart size
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);

  // Add a new heart at current mouse position
  hearts.push({
    x: mouseX,
    y: mouseY,
    size: map(speed, 0, 50, 10, 30)
  });

  // Draw heart cursor
  drawHeart(mouseX, mouseY, 12);
}

function drawHeart(x, y, s) {
  push();
  translate(x, y);
  beginShape();
  vertex(0, -s / 2);
  bezierVertex(s / 2, -s, s, 0, 0, s);
  bezierVertex(-s, 0, -s / 2, -s, 0, -s / 2);
  endShape(CLOSE);
  pop();
}

// 💥 Burst of hearts on mouse click
function mousePressed() {
  for (let i = 0; i < 10; i++) {
    hearts.push({
      x: mouseX + random(-20, 20),
      y: mouseY + random(-20, 20),
      size: random(10, 20)
    });
  }
}

// 🎨 Color change + Clear screen with keys
function keyPressed() {
  if (keyCode === LEFT_ARROW) heartColor = [255, 100, 150];     // Pink
  if (keyCode === RIGHT_ARROW) heartColor = [255, 0, 0];         // Red
  if (keyCode === UP_ARROW) heartColor = [255, 200, 0];          // Orange
  if (keyCode === DOWN_ARROW) heartColor = [150, 100, 255];      // Purple
  if (key === 'c' || key === 'C') {
    hearts = [];                     // Clear all hearts
    background('white');            //The white background
  }
}
