let width = window.innerWidth;
let height = window.innerHeight;
let Ovule, Spermatozoom, sperm, chronometer, pontuation = 0;

let move_sound = document.getElementById("move_sound");
let hit_sound = document.getElementById("hit_sound");

window.addEventListener("orientationchange", () => location.reload());

function setup() {
  createCanvas(width, height);

  sperm = new Group();

  createOvule(height / 8);
  tutorial();
  score();
}

function draw() {
  background(233, 30, 99);
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

  sperm.add(Spermatozoom);
}

function gameRules() {
  if (frameCount % 16 == 0) {
    createSpermatozoom(height / 16);
  }

  if (Ovule.position.y > height - (Ovule.height / 2 + Ovule.height / 16)) {
    Ovule.position.y = height - (Ovule.height / 2 + Ovule.height / 16);
    Ovule.velocity.y = 0;
  }
  if (Ovule.position.y < 0 + (Ovule.height / 2 + Ovule.height / 16)) {
    Ovule.position.y = 0 + (Ovule.height / 2 + Ovule.height / 16);
    Ovule.velocity.y = 0;
  }

  if (sperm.overlap(Ovule)) {
    gameOver();
  }
}

function tutorial() {
  let tutorial = createSprite();

  tutorial.draw = () => {
    stroke(255);
    line(0, height / 2, width, height / 2);
    fill(255);
    noStroke();

    textSize(16);
    textAlign(CENTER, CENTER);
    text("Up", width / 2, height / 4);
    text("Down", width / 2, (height / 4) * 3);
  };

  tutorial.life = 128;
}

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

let moveSpeed = height / 128;

function keyPressed() {
  move_sound.play();

  if (keyCode === UP_ARROW) {
    Ovule.velocity.y = 0;
    Ovule.velocity.y -= moveSpeed;
  }
  if (keyCode === DOWN_ARROW) {
    Ovule.velocity.y = 0;
    Ovule.velocity.y += moveSpeed;
  }
}
function touchStarted() {
  move_sound.play();

  if (mouseY <= height / 2) {
    Ovule.velocity.y = 0;
    Ovule.velocity.y -= moveSpeed;
  } 
  else {
    Ovule.velocity.y = 0;
    Ovule.velocity.y += moveSpeed;
  }
}

function gameOver() {
  hit_sound.play();

  alert(`You are pregnant!\nScore: ${pontuation}`);

  Ovule.remove();
  sperm.removeSprites();

  pontuation = 0;
  clearInterval(chronometer);

  setup();
}

// pra que serve
// tantos códigos?
// se a vida
// não é programada
// e as melhores coisas
// não têm lógica
