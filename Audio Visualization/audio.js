let img;
let sound;
let analyzer;
let loaded = false;
let playing = false;
let stars = [];

function preload() {
  img = loadImage("ej.jpg");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  sound = new Tone.Player("247 365.mp3").toDestination();
  analyzer = new Tone.Waveform(1024);
  sound.connect(analyzer);

  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(1, 3),
      speed: random(0.5, 1.5)
    });
  }
}

function draw() {
  let waveform = analyzer.getValue();
  let rms = 0;
  for (let i = 0; i < waveform.length; i++) {
    rms += waveform[i] * waveform[i];
  }
  rms = sqrt(rms / waveform.length);
  let bgAlpha = map(rms, 0, 0.5, 50, 150);
  background(10, 10, 30, bgAlpha);

  if (loaded) {
    translate(width / 2, height / 2);

    // 🌸 Petal-like waveform bloom
    for (let ring = 0; ring < 3; ring++) {
      let radiusBase = 100 + ring * 25 + rms * 50;
      let petalCount = 60;
      strokeWeight(1.5);
      stroke(255 - ring * 50, 100 + ring * 50, 255, 60 + ring * 40);
      noFill();
      beginShape();
      for (let i = 0; i < petalCount; i++) {
        let angle = map(i, 0, petalCount, 0, 360);
        let index = floor(map(i, 0, petalCount, 0, waveform.length - 1));
        let waveVal = waveform[index];
        let offset = sin(angle * 5 + frameCount * 2 + ring * 50) * 8;
        let r = radiusBase + waveVal * 100 + offset;
        let x = cos(angle) * r;
        let y = sin(angle) * r;
        curveVertex(x, y);
      }
      endShape(CLOSE);
    }

    // 🖼 Center image
    image(img, 0, 0, 150 + rms * 30, 150 + rms * 30);

    // 🔊 Sound ring
    noFill();
    stroke(255, 100, 200);
    strokeWeight(2);
    beginShape();
    let spacing = floor(waveform.length / 60);
    for (let i = 0; i < waveform.length; i += spacing) {
      let angle = map(i, 0, waveform.length, 0, 360);
      let radius = map(waveform[i], -1, 1, 120, 250);
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // 🌠 Speed lines
    for (let i = 0; i < 12; i++) {
      let angle = i * 30 + frameCount % 360;
      let len = map(rms, 0, 0.5, 0, 80);
      let x1 = cos(angle) * 160;
      let y1 = sin(angle) * 160;
      let x2 = cos(angle) * (160 + len);
      let y2 = sin(angle) * (160 + len);
      stroke(255, 255, 0, 100);
      strokeWeight(2);
      line(x1, y1, x2, y2);
    }
  } else {
    fill(255);
    textSize(20);
    text("Loading...", width / 2, height / 2);
  }
}

function mouseClicked() {
  if (!loaded) return;

  if (!playing) {
    sound.start();
    playing = true;
  } else {
    sound.stop();
    playing = false;
  }
}

Tone.loaded().then(() => {
  loaded = true;
});
