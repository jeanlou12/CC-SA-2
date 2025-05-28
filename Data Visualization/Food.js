let foods = [
  { label: "Lechon", value: 40, color: "#FF6384" },
  { label: "Grilled fish", value: 35, color: "#36A2EB" },
  { label: "Puso (Hanging Rice)", value: 70, color: "#FFCE56" },
  { label: "Chicken soup", value: 30, color: "#4BC0C0" },
  { label: "Torta", value: 20, color: "#9966FF" },
  { label: "Siomai ", value: 25, color: "#FF9F40" }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(12);
}

function draw() {
  background(255);

  // Title
  textAlign(LEFT, CENTER);
  fill(0);
  textSize(32);
  text("Cebuano Foods ", 60, 60);
  textAlign(CENTER, CENTER);
  textSize(12);

  // Pie chart setup
  let total = foods.reduce((sum, food) => sum + food.value, 0);
  let lastAngle = 0;
  let cx = width / 2;
  let cy = height / 2 + 80; // Lowered position
  let radius = min(width, height) * 0.35; // Bigger chart

  // Draw pie chart and labels
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    let angle = map(food.value, 0, total, 0, 360);

    // Pie slice
    fill(food.color);
    stroke(255);
    strokeWeight(2);
    arc(cx, cy, radius * 2, radius * 2, lastAngle, lastAngle + angle, PIE);

    // Label
    let midAngle = lastAngle + angle / 2;
    let labelX = cx + cos(midAngle) * (radius + 40);
    let labelY = cy + sin(midAngle) * (radius + 40);
    noStroke();
    fill(0);
    text(`${food.label}\n(${food.value}%)`, labelX, labelY);

    lastAngle += angle;
  }

  // Legend
  let legendX = width - 200;
  let legendY = height / 2 - (foods.length * 22) / 2;
  textAlign(LEFT, CENTER);
  for (let i = 0; i < foods.length; i++) {
    fill(foods[i].color);
    rect(legendX, legendY + i * 22, 15, 15);
    fill(0);
    noStroke();
    text(foods[i].label, legendX + 25, legendY + i * 22 + 7.5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
