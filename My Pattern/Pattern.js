function setup() {
  createCanvas(600, 600);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(255);

  // 🌈 Rotating rectangles with  colors
  push();
  translate(width / 2, height / 2);
  noFill();
  for (let i = 0; i < 60; i++) {
    stroke((i * 5) % 255, 100, 200);
    push();
    rotate(radians(i * 6));
    rect(0, 0, i * 10, i * 10);
    pop();
  }
  pop();

  // lines from corners - red & orange
  for (let i = 0; i <= width; i += 20) {
    stroke(255, 100, 100, 150); // soft red
    line(0, 0, i, height);
    stroke(255, 165, 0, 150);   // soft orange
    line(width, 0, i, height);
    stroke(100, 200, 255, 150); // light blue
    line(0, height, i, 0);
    stroke(180, 0, 255, 150);   // violet
    line(width, height, i, 0);
  }

  // overlay - light green
  stroke(0, 200, 100, 60);
  for (let x = 0; x <= width; x += 30) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += 30) {
    line(0, y, width, y);
  }
}
