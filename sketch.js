var tick = 0;
// var squaresArray = [];

// you always need a setup function in p5.js
// this is the initial setup that gets applied
// before you begin drawing
function setup() {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(100, 0, 100);
	frameRate(10);
	// for (var i = 0; i <= 50; i++) {
	// 	var s = new FallingSquare();
	// 	squaresArray.push(s);
	// }
}
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

// you always need a draw function in p5.js
// this is the function that gets called continuously in the background
// you can think of this function as what gets applied in each frame
function draw() {
	// background(100, 0, 100);

	fill(0, 200, 0);
	stroke(0, 189, 150);
	bezier(mouseX, mouseY, mouseY*1.01, mouseX+2, mouseX-4, mouseY-1, mouseX+30, mouseY+5)
	if (isEven(tick))
		background(100, 0, 100);
	else
		background(0, 100, 0);
	// rect(
	// mouseX,
	// yRect,
	// 30, 
	// 30
	// );
	// background(
	// 	random(0, 100),
	// 	random(0, 255),
	// 	random(0, 150)
	// 	)
	// fill(123)
	// stroke(50, 0, 0)

	// ellipse(
	// mouseX,
	// mouseY,
	//  30, 
	//  30
	//  );
	// debugger;
	tick = tick + 101;
}

// function mousePressed() {
// 	background(
// 		random(0, 100),
// 		random(0, 255),
// 		random(0, 150)
// 		)
// 	draw();
// }	
// function FallingSquare() {
// 	this.speed = random(0, 20);
// 	this.y = 0;
// 	this.x = random(0, window.innerWidth);
// 	this.width = 20;
// 	this.height = 20;
// 	this.color = color(
// 		random(0, 100),
//  		random(0, 255),
//  		random(0, 150)
// 		);
// }
