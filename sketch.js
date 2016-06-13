
var flock;

var initX;
var initY;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
//  createP("Drag the mouse to generate new boids.");
  
  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 5; i++) {
    var b = new Boid(width/2,height/2,random(10),-1*random(15));
    flock.addBoid(b);
  }
}

function draw() {
  background(100, 0, 100, 3);
  // ellipse(width*3/4, height/10, 50, 20);
  // ellipse(width/4, height/10, 50, 20);
  flock.run();
  rect(0,0,50,30,0,0,15,0);
  fill(0,50,100);
  text("C 2 C", 10, 10, 50, 30);
  fill(255);

}

// Add a new boid into the System
function mouseReleased() {
  var scalar = 5;
  if (initX && initY) {
    flock.addBoid(new Boid(initX, initY, (initX-mouseX)/scalar, (initY-mouseY)/scalar ));
  }
  initX=undefined;
  initY=undefined;
}

function mousePressed() {
  initX = mouseX;
  initY = mouseY;
}

function mouseDragged() {
  line(initX, initY, mouseX, mouseY);
  stroke(126);
}

function clickLink1() {
  window.location="http://jbirms.github.io/bikeandbuild_maps/c2c/";
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y, vx, vy) {
  this.acceleration = createVector(0,0);
//  this.velocity = createVector(random(-1,1),random(-1,1));
  this.velocity = createVector(vx, vy);
  this.position = createVector(x,y);
  this.r = 3;
  this.maxspeed = 30;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

function LinkButton(x1, y1, x2, y2, label, target_url) {
  this.position = createVector(x1 ,y1);
  this.edge = createVector(x2, y2);
  this.text = label;
  this.url = target_url;

} 	

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
  this.collision();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on gravity

Boid.prototype.flock = function(boids) {
  var grav = this.gravity(boids);
  this.applyForce(grav);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}


Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(random(255), random(255), random(255));
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.velocity.x = -this.velocity.x;
  if (this.position.y < -this.r)  this.velocity.y = -this.velocity.y;
  if (this.position.x > width -this.r) this.velocity.x = -this.velocity.x;
  // if (this.position.y > height) this.velocity.y = -.9*this.velocity.y;
}

// Link collision
Boid.prototype.collision = function() {
  if (this.position.x < 50 && this.position.y < 30) clickLink1();
}

Boid.prototype.gravity = function(boids) {
  var accel = .2;
  return createVector(0, accel);
}


