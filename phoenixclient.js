(function () {
	'use strict';

	var canvas = document.getElementById('hexCanvas'); //get the canvas element from the HTML document
	var ctx = canvas.getContext('2d'); //get the context of the canvas

	var scrollSpeed = 3; //increment to scroll with each step
	var mousePressed = false; //was the mouse button klicked but not yet released?
	var isDragging = false; //was the mouse moved while the button is down?
	var originX = 0; //x coordinate of the origin in respect to which all drawing is done
	var originY = 0; //y coodrinate of the origin in respect to which all drawing is done
	var clickX = 0; //x coordinate of the point where the mouse was clicked
	var clickY = 0; //y coordinate of the point where the mouse was clicked
	var moveX = 0; //x distance the mouse was dragged
	var moveY = 0; //y distance the mouse was dragged
	var scale = 25; //the scale of the elements, specifically the width

	$.getScript("map.js", function(){ drawStuff(); }); //use jQuery to load scripts from another .js file

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	window.addEventListener('mousedown', function(event){
		//TODO: only do the following on left click
    	mousePressed = true;
    	clickX = event.pageX; //record the x coordinate of the mouse when it was clicked
    	clickY = event.pageY; //record the y coordinate of the mouse when it was clicked
	});

	window.addEventListener('mouseup', function(){
		//TODO: only do the following on left click
    	mousePressed = false; //mouse is no longer pressed
    	isDragging = false; //mouse is no longer being dragged; click detection goes before this!
    	clickX = 0; //reset click registration
    	clickY = 0;
    	originX += moveX; //add the x offset from dragged mouse to the current x origin for drawing
    	originY += moveY; //add the y offset from dragged mouse to the current y origin for drawing
    	moveX = 0; //reset move registration
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

	window.addEventListener('wheel', function(event) {
		var deltaY = event.deltaY; //get amount scrolled
		var mouseX = event.pageX; //get current mouse position
		var mouseY = event.pageY;
		var posX = (mouseX - originX) / scale; //get the tile the mouse is currently in (and the position in the tile)
		var posY = (mouseY - originY) / scale;

		if (deltaY < 0) { //do the actuall scrolling
			scale += scrollSpeed;
		}
		else {
			scale -= scrollSpeed;
		}

		var newX = posX * scale; //compute the new distance of mouse from origin
		var newY = posY * scale;
		originX = mouseX - newX; //move origin so that the tile stays the same with the new scaling
		originY = mouseY - newY;
		drawStuff();
	});

	//TODO: implement scrolling with keyboard
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
		ctx.clearRect(0, 0, canvas.width, canvas.height); //clear 

		//do all drawing/element selection in respect to these coordinates
		var x = originX + moveX; //current x origin for drawing + x offset from dragged mouse
		var y = originY + moveY; //current y origin for drawing + y offset from dragged mouse

		for (var i = 0; i < 51; i++) {
			for (var j = 0; j < 45; j++) {
				switch((i+j)%7){
					case 0: ctx.fillStyle=test;
					break;

					case 1: ctx.fillStyle="orange";
					break;

					case 2: ctx.fillStyle="yellow";
					break;

					case 3: ctx.fillStyle="green";
					break;

					case 4: ctx.fillStyle="blue";
					break;

					case 5: ctx.fillStyle="indigo";
					break;

					case 6: ctx.fillStyle="purple";
					break;

					default: ctx.fillStyle="black";
					break;
				}
				if (i%2 === 0) {
					ctx.fillRect(x+(i*scale), y+(scale/2)+(j*scale), scale, scale);
				}
				else {	
					ctx.fillRect(x+(i*scale), y+(j*scale), scale, scale);
				}

			}
		}
	}
})();