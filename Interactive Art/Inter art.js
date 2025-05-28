let font;
let phrase = "BATH SPA UNIVERSITY";
let fontSize = 100;
let angleOffset = 0;

function preload() {
  font = loadFont('LuckiestGuy-Regular.ttf'); // Anime-style font
}

function setup() {
  createCanvas(1100, 300);
  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
  drawAnimeBackground();
  
  // Pulsing text size
  let pulse = sin(frameCount * 0.05) * 5;
  textSize(fontSize + pulse);

  // Shadow behind text
  fill(0, 0, 0, 100);
  text(phrase, width / 2 + 4, height / 2 + 4);

  // Main anime-style text
  fill(255, 100, 200); // Vibrant pink
  stroke(255);
  strokeWeight(4);
  text(phrase, width / 2, height / 2);
}

function drawAnimeBackground() {
  background(255, 240, 250); // Soft pink background

  let centerX = width / 2;
  let centerY = height / 2;
  let numRays = 100;
  angleOffset += 0.002; // slowly rotate the rays

  // Radiating anime burst
  for (let i = 0; i < numRays; i++) {
    let angle = TWO_PI * i / numRays + angleOffset;
    let col = color(255, random(150, 200), random(200, 255), 60);
    stroke(col);
    strokeWeight(3);
    let x1 = centerX + cos(angle) * 50;
    let y1 = centerY + sin(angle) * 50;
    let x2 = centerX + cos(angle) * 1000;
    let y2 = centerY + sin(angle) * 1000;
    line(x1, y1, x2, y2);
  }

  // Sparkles that randomly shift
  noStroke();
  for (let i = 0; i < 80; i++) {
    fill(255, 255, random(200, 255), 40);
    ellipse(random(width), random(height), random(5, 20));
  }

  // Floating petals or spark shapes
  for (let i = 0; i < 20; i++) {
    fill(255, random(150, 200), random(180, 240), 100);
    ellipse(random(width), (frameCount * 0.3 + i * 50) % height, random(8, 15), random(4, 8));
  }
}
