let xOffset = 0;

function setup() {
  createCanvas(650, 400);
}

function draw() {
  background("rgb(9,1,16)"); // soft pastel background

  drawStars();
  drawPlanets();
  drawAlienCity();

  xOffset += 1;
  let yOffset = 120;

  push();
  translate(xOffset, yOffset);

  // Hair (stylized anime hair)
  push();
  fill("rgb(231,235,241)");
  noStroke();
  translate(273, 100);
  triangle(100, 110, 150, 100, 20, 10);
  triangle(90, 70, 90, 100, 15, 10);
  pop();

  // Eyes - big anime eyes
  fill("rgb(25,1,1)");
  ellipse(225, 193, 45, 60);
  ellipse(300, 190, 45, 60);

  fill("rgb(239,242,246)");
  ellipse(225, 193, 25, 35);
  ellipse(300, 190, 25, 35);

  fill("black");
  ellipse(225, 193, 12, 18);
  ellipse(300, 190, 12, 18);

  fill("rgb(23,9,9)");
  ellipse(230, 190, 5, 5); // sparkle
  ellipse(305, 187, 5, 5); // sparkle

  // Face base
  fill("rgb(169,16,112)");
  noStroke();
  rect(160, 195, 325, 85, 50);
  ellipse(189, 235, 200, 90);
  ellipse(450, 233, 240, 90);



  // Mouth (cute anime smile)
  stroke(150, 0, 0);
  strokeWeight(2);
  noFill();
  arc(275, 255, 30, 15, 0, PI);

  // Ears (wheels)
  fill("#C61577");
  ellipse(155, 260, 80, 80);
  ellipse(450, 260, 80, 80);

  // Rotating centers
  push();
  translate(155, 260);
  rotate(radians(-xOffset * 5));
  fill("white");
  ellipse(0, 0, 30, 30);
  stroke("#333");
  strokeWeight(2);
  line(0, 0, 15, 0);
  pop();

  push();
  translate(450, 260);
  rotate(radians(-xOffset * 5));
  fill("rgb(239,227,227)");
  ellipse(0, 0, 30, 30);
  stroke("#333");
  strokeWeight(2);
  line(0, 0, 15, 0);
  pop();

  // Hair accessory / sparkle
  fill("orange");
  noStroke();
  push();
  translate(130, 220);
  rotate(radians(66));
  ellipse(0, 0, 10, 40);
  pop();

  // Microphone
  push();
  translate(310, 210);
  rotate(radians(90));
  fill("black");
  rect(0, 0, 8, 30);
  pop();

  // Hairclip / bow
  push();
  translate(510, 210);
  rotate(radians(-30));
  fill("#9B8F2C");
  stroke(0);
  ellipse(0, 0, 20, 30);
  pop();

  // Beauty mark
  fill("green");
  stroke(0);
  ellipse(410, 222, 10, 10);

  // Neck detail
  fill("gray");
  ellipse(350, 180, 30, 20);
  fill("black");
  rect(350, 180, 10, 20);

  pop(); // End of animated character

  if (xOffset > width + 100) {
    xOffset = -600;
  }
}

// 🌆 Alien Cityscape
function drawAlienCity() {
  for (let i = 0; i < width * 2; i += 80) {
    let buildingX = (i - xOffset * 0.3) % (width + 80);
    let buildingHeight = 100 + noise(i * 0.01 + frameCount * 0.002) * 100;

    fill('gray');
    rect(buildingX, height - buildingHeight, 50, buildingHeight);

    for (let w = 0; w < buildingHeight - 20; w += 20) {
      fill(random(180, 255), random(180, 255), 100, 180);
      rect(buildingX + 10, height - w - 30, 10, 10);
    }

    if (i % 160 === 0) {
      fill(200, 255, 255, 150);
      ellipse(buildingX + 25, height - buildingHeight - 10, 20, 20);
    }
  }
}

// 🪐 Planets
function drawPlanets() {
  let px = (width - (xOffset * 0.1)) % (width + 200);
  fill("rgb(255,150,100)");
  ellipse(px, 100, 60, 60);

  fill("rgb(180,100,255)");
  ellipse((px + 300) % width, 50, 40, 40);
}

// ✨ Stars
function drawStars() {
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < 100; i++) {
    point((i * 70 + frameCount * 0.2) % width, noise(i) * height * 0.5);
  }
}
