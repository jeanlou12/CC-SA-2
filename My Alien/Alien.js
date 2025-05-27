let starPositions = [];
let nebulaPositions = [];
let t = 0; // Time variable for animation
let scrollX = 0; // Scene horizontal scroll

let alien1X = 300;
let alien2X = 600;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Generate fixed positions for stars
  for (let i = 0; i < 200; i++) {
    starPositions.push({
      x: random(width * 2),
      y: random(height),
      size: random(1, 4),
      speed: random(0.2, 0.5)
    });
  }

  // Generate fixed positions for nebulae
  for (let i = 0; i < 5; i++) {
    nebulaPositions.push({
      x: random(width * 2),
      y: random(height * 0.5),
      size: random(150, 300),
      pulse: random(0.5, 1.5)
    });
  }
}

function draw() {
  background(0);

  // Alien sky with a gradient effect (purple to green)
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(40, 0, 60), color(0, 255, 100), inter);
    stroke(c);
    line(0, i, width, i);
  }

  // Scroll the scene
  scrollX += 1;

  // Draw and animate stars
  for (let star of starPositions) {
    fill(255, random(150, 255));
    noStroke();
    let sx = (star.x - scrollX * 0.5) % (width * 2);
    if (sx < 0) sx += width * 2;
    ellipse(sx, star.y, star.size);
  }

  // Draw and pulse nebulae
  for (let nebula of nebulaPositions) {
    let pulseSize = nebula.size + sin(t * nebula.pulse) * 20;
    let nx = (nebula.x - scrollX * 0.2) % (width * 2);
    if (nx < 0) nx += width * 2;
    fill(0, 255, 100, 40);
    noStroke();
    ellipse(nx, nebula.y, pulseSize, pulseSize);
  }

  // Animate drifting planets
  drawPlanet((width * 0.25 + sin(t) * 10) - scrollX * 0.1, height * 0.2, 120, color(150, 0, 255));
  drawPlanet((width * 0.7 + cos(t * 0.5) * 10) - scrollX * 0.1, height * 0.3, 100, color(255, 150, 50));

  // Move aliens horizontally and wrap around
  alien1X -= 1.5;
  if (alien1X < -200) alien1X = width + 200;

  alien2X -= 1;
  if (alien2X < -200) alien2X = width + 200;

  // Animate bobbing aliens with new moving positions
  drawAlien1(alien1X, 100 + sin(t * 2) * 5, 0.5);
  drawAlien2(alien2X, height / 2 + cos(t * 1.5) * 8, 1);

  t += 0.01;
}

function drawPlanet(x, y, size, planetColor) {
  fill(planetColor);
  noStroke();
  ellipse(x, y, size, size);
  fill(255, 155, 155, 50);
  ellipse(x - size * 0.2, y - size * 0.2, size * 0.6, size * 0.6); // Highlight
}

function drawAlien1(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  fill(30);
  noStroke();
  ellipse(200, 300, 250, 80);

  fill(255);
  ellipse(160, 290, 3, 3);
  ellipse(220, 310, 2, 2);
  ellipse(250, 290, 2, 2);
  ellipse(190, 315, 2, 2);

  fill("#6FC276");
  ellipse(200, 200, 120, 150);

  fill(0);
  push();
  translate(165, 175);
  rotate(radians(-15));
  ellipse(0, 0, 35, 50);
  pop();

  push();
  translate(235, 175);
  rotate(radians(15));
  ellipse(0, 0, 35, 50);
  pop();

  fill(255);
  ellipse(175, 165, 8, 8);
  ellipse(245, 165, 8, 8);
  ellipse(168, 180, 5, 5);
  ellipse(238, 180, 5, 5);

  fill(0);
  ellipse(200, 235, 10, 5);

  fill("#6FC276");
  ellipse(140, 290, 40, 30);
  ellipse(260, 290, 40, 30);
  ellipse(200, 260, 40, 50);

  pop();
}

function drawAlien2(x, y, s) {
  let alienColor = "#6B89A7";
  push();
  translate(x, y);
  scale(s);

  fill(alienColor);
  noStroke();
  ellipse(0, 0, 120, 250);

  // Eye
  fill(255);
  ellipse(0, -80, 50, 50);
  fill(30);
  ellipse(0 + sin(t * 4) * 3, -80, 25, 25);
  fill(255);
  ellipse(5, -85, 7, 7);

  // Mouth
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(0, -40, 40, 20, 0, PI);

  // Spots
  fill("#FF8C66");
  noStroke();
  ellipse(-25, -30, 8, 8);
  ellipse(25, -30, 6, 6);

  // Legs
  fill(alienColor);
  ellipse(-25, 80, 30, 100);
  ellipse(0, 80, 30, 100);
  ellipse(25, 80, 30, 100);

  // Antennae
  ellipse(-35, -130 + sin(t * 3) * 5, 20, 20);
  ellipse(35, -130 + cos(t * 3) * 5, 20, 20);

  pop();
}
