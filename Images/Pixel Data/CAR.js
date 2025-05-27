var img, x, y;
function preload() {
  img = loadImage("car.png");
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  imageMode(CENTER); 
}

function draw() {
  background(0);
  x = mouseX;
  y = mouseY;

  
  image(img, width / 2, height / 2, img.width / 2, img.height / 2); 

  var c = get(x, y);
  fill(c);

  ellipse(x, y, 40, 40);
}
