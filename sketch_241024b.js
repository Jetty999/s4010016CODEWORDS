let circles = [];
let message = "A nuclear holocaust is imminent. Erase memory?";
let button;
let isMemoryErased = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  button = createButton('OK');
  button.position(windowWidth / 2 - 20, windowHeight / 2 + 50);
  button.mousePressed(eraseMemory);
  
  for (let i = 0; i < 10; i++) {
    circles.push(new GrowingCircle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  if (!isMemoryErased) {
    fill(255, 0, 0);
    textSize(48);
    text(message, width / 2, height / 2);
    
    for (let circle of circles) {
      circle.update();
      circle.show();
    }
  } else {
    fill(255);
    textSize(36);
    text("Memory erased.", width / 2, height / 2);
  }

  for (let explosion of explosions) {
    explosion.update();
    explosion.show();
  }
}

let explosions = [];

function mousePressed() {
  if (!isMemoryErased) {
    let explosion = new Explosion(mouseX, mouseY);
    explosions.push(explosion);
    
    let newCircle = new GrowingCircle(mouseX, mouseY);
    circles.push(newCircle);
  }
}

function eraseMemory() {
  circles = [];
  isMemoryErased = true;
  message = "...";
}

class GrowingCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 80);
    this.growthRate = random(0.5, 2);
    this.maxSize = random(100, 300);
  }
  
  update() {
    this.size += this.growthRate;
  }
  
  show() {
    noFill();
    stroke(random(255), random(255), random(255), 150);
    strokeWeight(4);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = []; 
    this.numParticles = 100;
    this.createParticles();
  }
  
  createParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      let angle = random(TWO_PI);
      let radius = random(20, 80);
      let size = random(5, 15);
      let col = color(random(255), random(255), random(255), 255);
      this.particles.push(new Particle(this.x, this.y, angle, radius, size, col));
    }
  }
  
  update() {
    
    for (let particle of this.particles) {
      particle.update();
    }
  }
  
  show() {
  
    for (let particle of this.particles) {
      particle.show();
    }
  }
}

class Particle {
  constructor(x, y, angle, radius, size, col) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.size = size;
    this.color = col;
    this.speed = random(3, 6);
  }
  
  update() {
    
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.size *= 0.95; 
    this.color.setAlpha(this.color._getAlpha() * 0.9);
  }
  
  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
