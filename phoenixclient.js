	var selectedFields = []; //list of fields to be highlighted
	var selectedArmy; //currently selected armyCoordinates
	var switchScale = 50;

(function () {
	'use strict';

	var canvas = document.getElementById('hexCanvas'); //get the canvas element from the HTML document
	var ctx = canvas.getContext('2d'); //get the context of the canvas

	//settings; TODO: let the user change these in game
	var tileset = "mbits_painted"; //tileset name
	var scrollSpeed = 0.2; //increment to scroll with each step

	var url = "http://phoenixserver.h2610265.stratoserver.net"; //put the url (or the IP address) for the remote game server here
	// var url = "http://localhost:8000"; //put the url (or the IP address) for the remote game server here

	var mousePressed = false; //was the mouse button klicked but not yet released?
	var isDragging = false; //was the mouse moved while the button is down?
	var scale = 16; //the scale of the elements, specifically the width
	var originX = 900; //x coordinate of the origin in respect to which all drawing is done
	var originY = 490; //y coodrinate of the origin in respect to which all drawing is done
	var clickX = 0; //x coordinate of the point where the mouse was clicked
	var clickY = 0; //y coordinate of the point where the mouse was clicked
	var moveX = 0; //x distance the mouse was dragged
	var moveY = 0; //y distance the mouse was dragged

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	canvas.addEventListener('mousedown', function(event){
		if (event.button === 0 || event.button === 2) {
    		mousePressed = true;
    		clickX = event.pageX; //record the x coordinate of the mouse when it was clicked
    		clickY = event.pageY; //record the y coordinate of the mouse when it was clicked
    	}
		drawStuff();
	}, {passive: true});

	canvas.addEventListener('mouseup', function(event){
		if (mousePressed && event.button === 0) {
			if (isDragging) { //mouse was dragged; run panning finish routine
    			originX += moveX; //add the x offset from dragged mouse to the current x origin for drawing
    			originY += moveY; //add the y offset from dragged mouse to the current y origin for drawing
			} 
			else {
				registerLeftClick(); //do whatever has to be done on leftclick
			}
			//reset mouse click parameters
    		mousePressed = false; //mouse is no longer pressed
    		isDragging = false; //mouse is no longer being dragged
    		clickX = 0; //reset click registration
    		clickY = 0;
    		moveX = 0; //reset move registration
    		moveY = 0;
    	} else if (event.button === 2) {
			registerRightClick();
			//reset mouse click parameters
    		mousePressed = false; //mouse is no longer pressed
    		isDragging = false; //mouse is no longer being dragged
    		clickX = 0; //reset click registration
    		clickY = 0;
    		moveX = 0; //reset move registration
    		moveY = 0;
		} else if(event.button === 1){
			gamestate.startNewTurn();
			updateInfoBox();
		}
    	drawStuff();
	}, {passive: true});

	canvas.addEventListener('mousemove', function(event) {
    	if (mousePressed === true) {
    		isDragging = true; //for later click detection; no click if mouse was previously dragged
    		moveX = event.pageX - clickX; //compute the x offset from dragged mouse
    		moveY = event.pageY - clickY; //compute the y offset from dragged mouse
    	}
    	drawStuff();
	}, {passive: true});

	canvas.addEventListener('wheel', function(event) {
		var deltaY = event.deltaY; //get amount scrolled
		var mouseX = event.pageX; //get current mouse position
		var mouseY = event.pageY;
		var posX = (mouseX - originX) / scale; //get the tile the mouse is currently in (and the position in the tile)
		var posY = (mouseY - originY) / scale;

		if (deltaY < 0) { //do the actuall scrolling
			scale *= 1+scrollSpeed;
		} else {
			scale *= 1-scrollSpeed;
		}

		setHexParts(scale); //compute the scale dependant values used for map drawing
		var newPosX = posX * scale; //compute the new distance of mouse from origin
		var newPosY = posY * scale;
		originX = mouseX - newPosX; //move origin so that the tile stays the same with the new scaling
		originY = mouseY - newPosY;
		drawStuff();
	}, {passive: true});

	//TODO: implement scrolling with keyboard
	// window.addEventListener('keydown', function (event) {
	// });

	// window.addEventListener('keyup', function (event) {
	// });

	function registerLeftClick(){
		var clickedField = getClickedField(); //get selected field
		console.log(clickedField);
		if(worldCreationModeOnClick){
			var clickedHex = new showHex(clickedField[0], clickedField[1]);
			var posi = clickedHex.positionInList();
			if(fields[posi].type == 8 || fields[posi].type == 9){
				fields[posi].type = 0;
			} else {
				fields[posi].type++;
			}
		} else {
			// Feldauswahl
			var index = -1;
			var sf = selectedFields[0];
			if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])){
				selectedFields = [];
			} else {
				selectedFields[0] = clickedField;
			}
			// Armeeauswahl
			selectedArmy = undefined;
			var possibleSelections = [];
			for(var i = 0; i < listOfArmyCoordinates.length; i++){
				if(listOfArmyCoordinates[i].x == clickedField[0] && listOfArmyCoordinates[i].y == clickedField[1]){
					possibleSelections.push(i);
					selectedArmy = i;
				}
			}
			if(document.getElementById("btnSection") != null){
				var d = document.getElementById("buttonsBox");
				d.removeChild(document.getElementById("btnSection"));
			}
			if(possibleSelections.length != 0){
				var x = document.createElement("SECTION");
				x.setAttribute("id", "btnSection")
				for (var i = 0; i < possibleSelections.length; i++){
					var btn = document.createElement("BUTTON");
					btn.id = listOfArmyCoordinates[possibleSelections[i]].a.armyId;
					var t = document.createTextNode(listOfArmyCoordinates[possibleSelections[i]].a.armyId);
					btn.appendChild(t);
					btn.addEventListener('click', function(event) {
						for (var j = 0; j < listOfArmyCoordinates.length ; j++){
							if(listOfArmyCoordinates[j].a.armyId == this.id){
								selectedArmy = j;
							}
						}
						updateInfoBox();
					});
					x.appendChild(btn);
				}
				document.getElementById("buttonsBox").appendChild(x);
			}
			updateInfoBox();
		}
		
	}

	function registerRightClick(){
		var clickedField = getClickedField();
		console.log(clickedField);
		if(worldCreationModeOnClick){
			var clickedHex = new showHex(clickedField[0], clickedField[1]);
			var posi = clickedHex.positionInList();
			if(fields[posi].type == 0 || fields[posi].type == 9){
				fields[posi].type = 8;
			} else {
				fields[posi].type--;
			}
		} else {
			if(selectedArmy != undefined){
				var clickedArmyCoords = new showHex(listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y);
				var neighbors = clickedArmyCoords.neighbors();
				for (var i = 0; i < neighbors.length; i++){
					if(neighbors[i][0] == clickedField[0] && neighbors[i][1] == clickedField[1]){
						var out = listOfArmyCoordinates[selectedArmy].move(i)
						if(out != "ok"){
							alert(out);
						}
					}
				}
				updateInfoBox();
			}
		}
		
	}

	function updateInfoBox(){
		if(selectedArmy != undefined){
			document.getElementById("armyId").innerHTML = "HeeresId: " + listOfArmyCoordinates[selectedArmy].a.armyId;
			document.getElementById("count").innerHTML = "anzahl Truppen: " + listOfArmyCoordinates[selectedArmy].a.count;
			document.getElementById("leaders").innerHTML = "anzahl Heerführer: " + listOfArmyCoordinates[selectedArmy].a.leaders;
			document.getElementById("mounts").innerHTML = "mitgeführte Reittiere: " + listOfArmyCoordinates[selectedArmy].a.mounts;
			document.getElementById("lkp").innerHTML = "leichte Katapulte: " + listOfArmyCoordinates[selectedArmy].a.lkp;
			document.getElementById("skp").innerHTML = "schwere Katapulte: " + listOfArmyCoordinates[selectedArmy].a.skp;
			document.getElementById("movePoints").innerHTML = "Verbleibende Bewegungspunkte: " + listOfArmyCoordinates[selectedArmy].remainingMovePoints;
			document.getElementById("heightPoints").innerHTML = "Verbleibende Höhenstufen: " + listOfArmyCoordinates[selectedArmy].remainingHeightPoints;
		} else {
			document.getElementById("armyId").innerHTML = null;
			document.getElementById("count").innerHTML = null;
			document.getElementById("leaders").innerHTML = null;
			document.getElementById("mounts").innerHTML = null;
			document.getElementById("lkp").innerHTML = null;
			document.getElementById("skp").innerHTML = null;
			document.getElementById("movePoints").innerHTML = null;
			document.getElementById("heightPoints").innerHTML = null;
		};
	}

	function getClickedField(){
		var x = clickX - originX; //reverse our x/y origin offset
		var y = clickY - originY;
		// var gridHeight = (1.366/2)*scale; //a hexes height minus the lower tip triangle
		// var gridWidth = 0.866*scale; //a hexes width
		// var halfWidth = gridWidth/2; //half a hexes width
		// var c = scale - gridHeight; //the vertical offset of a hexes upper triangle side
		var m = c/(gW*0.5); //the inclination of the hexes upper triangle side

		var row = Math.round(y/gH); //get the rectangle clicked in
		var rowIsOdd = (row%2 !== 0);
		var column = Math.round((rowIsOdd ? ((x+0.5*gW)/gW) : (x/gW)));

		var relY = y - (row * gH); //compute relative position of the click in respect to the rectangle
		var relX = rowIsOdd ? (x-(column*gW)+0.5*gW) : (x-(column*gW));

		if (relY < -m*relX+c) { //click is in upper left corner
			row--;
			if (rowIsOdd) {column--;}
		} else if (relY < m*relX-c) { //click is in upper right corner
			row--;
			if (!rowIsOdd) {column++;}
		}

		return [column, row]; //return result
	}

	function init() {
		$.getScript("map.js", //use jQuery to load scripts from another .js file
			function(){ 	//after loading script, run all initialization methods
				loadMap(url);
				loadImages(tileset);
				loadArmies(url);
				setHexParts(scale);
				resizeCanvas();
			});
	}

	//canvas resizing method
	function resizeCanvas() {
    	canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
    	drawStuff(); 
	}

    //all the stuff to be drawn goes in this method
	function drawStuff() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); //clear 

		//do all drawing/element selection in respect to these coordinates
		var x = originX + moveX; //current x origin for drawing + x offset from dragged mouse
		var y = originY + moveY; //current y origin for drawing + y offset from dragged mouse

		drawMap(ctx, x, y, scale);
		drawSelection(ctx, x, y, scale, selectedFields);
		drawArmies(ctx, x, y, scale, listOfArmyCoordinates);
	}

	init();
})();