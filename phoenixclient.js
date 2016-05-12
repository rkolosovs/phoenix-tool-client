(function () {
	'use strict';

	var canvas = document.getElementById('hexCanvas'); //get the canvas element from the HTML document
	var ctx = canvas.getContext('2d'); //get the context of the canvas

	//settings; TODO: let the user change these in game
	var tileset = "erkenfara_folienzug"; //tileset name
	var scrollSpeed = 4; //increment to scroll with each step

	var mousePressed = false; //was the mouse button klicked but not yet released?
	var isDragging = false; //was the mouse moved while the button is down?
	var scale = 30; //the scale of the elements, specifically the width
	var selectedFields = [[4, 3],[3, 4],[4, 4]];
	var originX = 0; //x coordinate of the origin in respect to which all drawing is done
	var originY = 0; //y coodrinate of the origin in respect to which all drawing is done
	var clickX = 0; //x coordinate of the point where the mouse was clicked
	var clickY = 0; //y coordinate of the point where the mouse was clicked
	var moveX = 0; //x distance the mouse was dragged
	var moveY = 0; //y distance the mouse was dragged

	$.getScript("map.js", function(){ drawStuff();}); //use jQuery to load scripts from another .js file

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	window.addEventListener('mousedown', function(event){
		if (event.button === 0) {
    		mousePressed = true;
    		clickX = event.pageX; //record the x coordinate of the mouse when it was clicked
    		clickY = event.pageY; //record the y coordinate of the mouse when it was clicked
    	}
		drawStuff();
	});

	window.addEventListener('mouseup', function(event){
		if (mousePressed && event.button === 0) {
			// if (isDragging) { //mouse was dragged; run panning finish routine
   //  			originX += moveX; //add the x offset from dragged mouse to the current x origin for drawing
   //  			originY += moveY; //add the y offset from dragged mouse to the current y origin for drawing
			// }
			// else {
				registerLeftClick(); //do whatever has to be done on leftclick
			// }
			//reset mouse click parameters
    		mousePressed = false; //mouse is no longer pressed
    		isDragging = false; //mouse is no longer being dragged
    		clickX = 0; //reset click registration
    		clickY = 0;
    		moveX = 0; //reset move registration
    		moveY = 0;
    	}
    	drawStuff();
	});

	window.addEventListener('mousemove', function(event) {
    	if (mousePressed === true) {
    		isDragging = true; //for later click detection; no click if mouse was previously dragged
    		// moveX = event.pageX - clickX; //compute the x offset from dragged mouse
    		// moveY = event.pageY - clickY; //compute the y offset from dragged mouse
    	}
    	drawStuff();
	});

	window.addEventListener('wheel', function(event) {
		var deltaY = event.deltaY; //get amount scrolled
		var mouseX = event.pageX; //get current mouse position
		var mouseY = event.pageY;
		var posX = (mouseX - originX) / scale; //get the tile the mouse is currently in (and the position in the tile)
		var posY = (mouseY - originY) / scale;

		if (deltaY < 0) { //do the actuall scrolling
			scale += scrollSpeed;
		} else {
			scale -= scrollSpeed;
		}

		var newPosX = posX * scale; //compute the new distance of mouse from origin
		var newPosY = posY * scale;
		originX = mouseX - newPosX; //move origin so that the tile stays the same with the new scaling
		originY = mouseY - newPosY;
		drawStuff();
	});

	//TODO: implement scrolling with keyboard
	// window.addEventListener('keydown', function (event) {
	// });

	// window.addEventListener('keyup', function (event) {
	// });

	function registerLeftClick(){
		var clickedField = getClickedField();
		var index = -1;
		
		for (var i = 0; i < selectedFields.length; i++) {
			var sf = selectedFields[i];
			if ((sf[0] === clickedField[0]) && (sf[1] === clickedField[1])){
				index = i;
				break;
			}
		}

		if (index === -1) {
			selectedFields.push(clickedField);
		} else {
			selectedFields.splice(index, 1);
		}
	}

	function getClickedField(){
		//TODO: actually get a field
		return [5, 2]; //dummy field for testing
	}

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

		drawMap(ctx, x, y, scale, tileset);
		drawSelection(ctx, x, y, scale, selectedFields);
	}
})();