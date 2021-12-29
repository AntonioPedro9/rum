const width = window.innerWidth;
const height = window.innerHeight;
const move_sound = document.getElementById("move_sound");
const hit_sound = document.getElementById("hit_sound");

let Ovule, Spermatozoom, spermatozoomArray;

function setup() {
  createCanvas(width, height);

  spermatozoomArray = new Group();

  createOvule(height / 8);

  score();
}

function draw() {
  gameRules();
  drawSprites();
}

function createOvule(diameter) {
  Ovule = createSprite(height / 8, height / 2, diameter, diameter);

  Ovule.draw = () => {
    fill(255, 128);
    stroke(255);
    strokeWeight(diameter / 8);
    ellipse(0, 0, diameter - Ovule.getSpeed(), diameter + Ovule.getSpeed());
    ellipse(Ovule.deltaX * 2, Ovule.deltaY * 2, diameter / 8, diameter / 8);
  };

  Ovule.setCollider("circle", 0, 0, diameter / 2);
}

function createSpermatozoom(lenght) {
  Spermatozoom = createSprite(width, random(height), lenght, lenght / 2);

  Spermatozoom.draw = () => {
    fill(255);
    noStroke();
    ellipse(0, 0, random(lenght, lenght * 0.8), random(lenght / 2, (lenght / 2) * 0.8));
    fill(255, 128);
    ellipse(height / 16, 0, lenght * 2, random(lenght / 8, lenght / 16));
  };

  Spermatozoom.velocity.x = -random(width / 256, width / 128);
  Spermatozoom.life = 256;

  spermatozoomArray.add(Spermatozoom);
}

function gameRules() {
  background(233, 30, 99);

  if (frameCount % 16 == 0) {
    createSpermatozoom(height / 16);
  }

  let top = 0 + (Ovule.height / 2 + Ovule.height / 16);
  let bottom = height - (Ovule.height / 2 + Ovule.height / 16);

  if (Ovule.position.y < top) {
    Ovule.position.y = top;
    Ovule.velocity.y = 0;
  }

  if (Ovule.position.y > bottom) {
    Ovule.position.y = bottom;
    Ovule.velocity.y = 0;
  }

  if (spermatozoomArray.overlap(Ovule)) {
    gameOver();
  }
}

let direction = "up";

function touchStarted() {
  move_sound.play();

  let moveSpeed = height / 128;

  if (direction == "up") {
    Ovule.velocity.y = 0;
    Ovule.velocity.y -= moveSpeed;

    direction = "down";
  }
  else {
    Ovule.velocity.y = 0;
    Ovule.velocity.y += moveSpeed;

    direction = "up";
  }
}

let chronometer;
let pontuation = 0;

function score() {
  let score = createSprite();

  chronometer = setInterval(() => (pontuation += 1), 1000);

  score.draw = () => {
    fill(255);
    stroke(255);
    textSize(height / 16);
    textAlign(CENTER, CENTER);
    text(pontuation, width / 2, height / 16);
  };
}

function gameOver() {
  hit_sound.play();

  Ovule.remove();

  spermatozoomArray.removeSprites();

  pontuation = 0;

  clearInterval(chronometer);

  setup();
}
