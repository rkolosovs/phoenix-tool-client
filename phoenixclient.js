(function () {
	'use strict';

	var canvas = document.getElementById('hexCanvas');
	var ctx = canvas.getContext('2d');

	var mousePressed = false;
	var isDragging = false;
	var originX = 0;
	var originY = 0;
	var clickX = 0;
	var clickY = 0;
	var moveX = 0;
	var moveY = 0;

	$.getScript("map.js", function(){ drawStuff(); }); //use jQuery to load scripts from another .js file


	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	window.addEventListener('mousedown', function(event){
    	mousePressed = true;
    	clickX = event.pageX; //record the x coordinate of the mouse when it was clicked
    	clickY = event.pageY; //record the y coordinate of the mouse when it was clicked
	});

	window.addEventListener('mouseup', function(){
    	mousePressed = false;
    	isDragging = false;
    	clickX = 0;
    	clickY = 0;
    	originX += moveX; //add the x offset from dragged mouse to the current x origin for drawing
    	originY += moveY; //add the y offset from dragged mouse to the current y origin for drawing
    	moveX = 0;
    	moveY = 0;
	});

	window.addEventListener('mousemove', function(event) {
    	if (mousePressed === true) {
    		isDragging = true; //for later click detection; no click if mouse was previously dragged
    		moveX = event.pageX - clickX; //compute the x offset from dragged mouse
    		moveY = event.pageY - clickY; //compute the y offset from dragged mouse
    		drawStuff();
    	}
	});

	// window.addEventListener('keydown', function (event) {
	// 	drawStuff();
	// });

	// window.addEventListener('keyup', function () {
	// });

	//canvas resizing method
	function resizeCanvas() {
    	canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
    	drawStuff(); 
	}
	resizeCanvas();

    //all the stuff to be drawn goes in this method
	function drawStuff() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//do all drawing/element selection in respect to these coordinates
		var x = originX + moveX; //current x origin for drawing + x offset from dragged mouse
		var y = originY + moveY; //current y origin for drawing + y offset from dragged mouse

		// for (var i = 0; i < 51; i++) {
		// 	for (var j = 0; j < 45; j++) {
		// 		switch((i+j)%7){
		// 			case 0: ctx.fillStyle=test;
		// 			break;

		// 			case 1: ctx.fillStyle="orange";
		// 			break;

		// 			case 2: ctx.fillStyle="yellow";
		// 			break;

		// 			case 3: ctx.fillStyle="green";
		// 			break;

		// 			case 4: ctx.fillStyle="blue";
		// 			break;

		// 			case 5: ctx.fillStyle="indigo";
		// 			break;

		// 			case 6: ctx.fillStyle="purple";
		// 			break;

		// 			default: ctx.fillStyle="black";
		// 			break;
		// 		}
		// 		if (i%2 === 0) {
		// 			ctx.fillRect(x+(i*50), y+25+(j*50), 50, 50);
		// 		}
		// 		else {	
		// 			ctx.fillRect(x+(i*50), y+(j*50), 50, 50);
		// 		}

		// 	}
		// }
	}
})();