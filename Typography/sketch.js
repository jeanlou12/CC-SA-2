let font;
let phrase = "BATH SPA UNIVERSITY";
let fontSize = 100;

function preload() {
  font = loadFont('LuckiestGuy-Regular.ttf'); // Ensure this font file is in your project
}

function setup() {
  createCanvas(1100, 300);
  drawCustomBackground();
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  fill(50, 100, 200); // One color for the text
  text(phrase, width / 2, height / 2);
}




function drawCustomBackground() {
  background(250, 240, 230); // Warm neutral base

  // Radial burst pattern
  let centerX = width / 2;
  let centerY = height / 2;
  let numRays = 80;

  for (let i = 0; i < numRays; i++) {
    let angle = TWO_PI * i / numRays;
    let r = random(255);
    let g = random(200, 255);
    let b = random(150, 255);
    stroke(r, g, b, 50);
    strokeWeight(2);
    let x1 = centerX + cos(angle) * 50;
    let y1 = centerY + sin(angle) * 50;
    let x2 = centerX + cos(angle) * 800;
    let y2 = centerY + sin(angle) * 800;
    line(x1, y1, x2, y2);
  }

  // Optional soft glowing dots on top
  noStroke();
  for (let i = 0; i < 100; i++) {
    fill(255, 255, 255, 20);
    ellipse(random(width), random(height), random(10, 60));
  }
}



