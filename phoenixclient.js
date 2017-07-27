
'use strict';

var selectedFields = []; // list of fields to be highlighted
var selectedArmy; // currently selected armyCoordinates
var listOfArmyCoordinates;
var listOfMultiArmyFields;
var switchScale = 50;
var login = 'guest'; // either realm tag, 'sl', or 'guest'

var canvas = document.getElementById('hexCanvas'); // get the canvas element from the HTML document
var ctx = canvas.getContext('2d'); // get the context of the canvas

// settings; TODO: let the user change these in game
var tileset = "mbits_painted"; // tileset name
var scrollSpeed = 0.2; // increment to scroll with each step

var leftMousePressed = false; // was the left mouse button klicked but not yet released?
var rightMousePressed = false; // was the right mouse button klicked but not yet released?
var isDragging = false; // was the mouse moved while the button is down?
var scale = 16; // the scale of the elements, specifically the width
var originX = 900; // x coordinate of the origin in respect to which all drawing is done
var originY = 490; // y coodrinate of the origin in respect to which all drawing is done
var clickX = 0; // x coordinate of the point where the mouse was clicked
var clickY = 0; // y coordinate of the point where the mouse was clicked
var moveX = 0; // x distance the mouse was dragged
var moveY = 0; // y distance the mouse was dragged

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

canvas.addEventListener('mousedown', function(event){
	if (event.button === 0) {
   		leftMousePressed = true;
   		clickX = event.pageX; // record the x coordinate of the mouse when it was clicked
   		clickY = event.pageY; // record the y coordinate of the mouse when it was clicked
   	} else if (event.button === 2) {
   		rightMousePressed = true;
   		clickX = event.pageX; // record the x coordinate of the mouse when it was clicked
   		clickY = event.pageY; // record the y coordinate of the mouse when it was clicked
   	}
	drawStuff();
}, {passive: true});

canvas.addEventListener('mouseup', function(event){
	if (leftMousePressed && event.button === 0) {
		if (isDragging) { // mouse was dragged; run panning finish routine
   			originX += moveX; // add the x offset from dragged mouse to the current x origin for drawing
   			originY += moveY; // add the y offset from dragged mouse to the current y origin for drawing
		} 
		else {
			registerLeftClick(); // do whatever has to be done on leftclick
		}
		// reset mouse click parameters
   		leftMousePressed = false; // mouse is no longer pressed
   		isDragging = false; // mouse is no longer being dragged
   		clickX = 0; // reset click registration
   		clickY = 0;
   		moveX = 0; // reset move registration
   		moveY = 0;
   	} else if (rightMousePressed && event.button === 2) {
   		if (!isDragging) {
   			registerRightClick();
		}
		// reset mouse click parameters
   		rightMousePressed = false; // mouse is no longer pressed
   		isDragging = false; // mouse is no longer being dragged
   		clickX = 0; // reset click registration
   		clickY = 0;
   		moveX = 0; // reset move registration
   		moveY = 0;
	}
   	drawStuff();
}, {passive: true});

canvas.addEventListener('mousemove', function(event) {
   	if (leftMousePressed === true) {
   		isDragging = true; // for later click detection; no click if mouse was previously dragged
   		moveX = event.pageX - clickX; // compute the x offset from dragged mouse
   		moveY = event.pageY - clickY; // compute the y offset from dragged mouse
		drawStuff();
   	}
}, {passive: true});

canvas.addEventListener('wheel', function(event) {
	var deltaY = event.deltaY; // get amount scrolled
	var mouseX = event.pageX; // get current mouse position
	var mouseY = event.pageY;
	var posX = (mouseX - originX) / scale; // get the tile the mouse is currently in (and the position in the tile)
	var posY = (mouseY - originY) / scale;
	if (deltaY < 0) { // do the actuall scrolling
		scale *= 1+scrollSpeed;
	} else {
		scale *= 1-scrollSpeed;
	}
	setHexParts(scale); // compute the scale dependant values used for map drawing
	var newPosX = posX * scale; // compute the new distance of mouse from origin
	var newPosY = posY * scale;
	originX = mouseX - newPosX; // move origin so that the tile stays the same with the new scaling
	originY = mouseY - newPosY;
	drawStuff();
}, {passive: true});

// TODO: implement scrolling with keyboard (if desired)
// window.addEventListener('keydown', function (event) {
// });

// window.addEventListener('keyup', function (event) {
// });

function registerLeftClick(){
	var clickedField = getClickedField(); // get selected field
	console.log(clickedField);
	// If mount or unmount is activated, cancel it.
	if(document.getElementById("mountBox").style.display == "" || document.getElementById("unMountBox").style.display == ""){
		cancelMountUnMount();
	}
	if(armyWithNextClick){
		switch(Math.floor(armyIdBuffer/100)){
			// TODO: man soll garde erstellen können
			case 3: var army = new seeHeer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, guardBuffer); break;
			case 2: var army = new reiterHeer(armyIdBuffer, countBuffer, leaderBuffer, guardBuffer); break;
			case 1: var army = new heer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, mountsBuffer ,guardBuffer); break;
		}
        var armyCoords = new armyCoordinates(army, clickedField[0], clickedField[1], ownerBuffer);
		ownerBuffer = document.getElementById("ownerField").value;
		armyIdBuffer = 0;
		document.getElementById("armyNumberField").value = 0;
		countBuffer = 0;
		document.getElementById("countField").value = 0;
		leaderBuffer = 0;
		document.getElementById("leaderField").value = 0;
		mountsBuffer = 0;
		document.getElementById("mountsField").value = 0;
		lkpBuffer = 0;
		document.getElementById("lkpField").value = 0; 
		skpBuffer = 0;
		document.getElementById("skpField").value = 0;
		listOfArmyCoordinates.push(armyCoords);
		switchBtnBoxTo("buttonsBox");
		switchModeTo("none");
	} else if(worldCreationModeOnClick){
		var clickedHex = new showHex(clickedField[0], clickedField[1]);
		var posi = clickedHex.positionInList();
		if(changeFieldToType == -1){
			// checks if Field should be changed to a specific type, if not use normal world creation mode on click
			if(fields[posi].type == 8 || fields[posi].type == 9){
				fields[posi].type = 0;
			} else {
				fields[posi].type++;
			}
		} else if((changeFieldToType <= 9) && (changeFieldToType >= 0)){
			fields[posi].type = changeFieldToType
		}
		var found = false;
		for(var i = 0; i < window.changedFields.length; i++){
			if((window.changedFields[i].x == fields[posi].x) && (window.changedFields[i].y == fields[posi].y )){
				window.changedFields[i].type = fields[posi].type;
				found = true;
			}
		}
		if(!found){
			window.changedFields.push({"type": fields[posi].type,"x": fields[posi].x,"y": fields[posi].y});
		}
		console.log(window.changedFields);
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
				btn.name = listOfArmyCoordinates[possibleSelections[i]].a.armyId + " " + listOfArmyCoordinates[possibleSelections[i]].owner;
				var t = document.createTextNode(listOfArmyCoordinates[possibleSelections[i]].a.armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function(event) {
					var idToSearchFor = this.name.split(" ")[0];
					var ownerToSearchFor = this.name.split(" ")[1];
					for (var j = 0; j < listOfArmyCoordinates.length ; j++){
						if(listOfArmyCoordinates[j].a.armyId == idToSearchFor && listOfArmyCoordinates[j].owner == ownerToSearchFor){
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
		if(selectedArmy !== undefined){
		    listOfArmyCoordinates[selectedArmy].clickedMoves();
		}
	}
}

function registerRightClick(){
	var clickedField = getClickedField();
	console.log(clickedField);
	if(worldCreationModeOnClick){
		var clickedHex = new showHex(clickedField[0], clickedField[1]);
		var posi = clickedHex.positionInList();
		if(changeFieldToType == -1){
			// checks if Field should be changed to a specific type (then rightclick is disabled)
			if(fields[posi].type == 0 || fields[posi].type == 9){
				fields[posi].type = 8;
			} else {
				fields[posi].type--;
			}
			var found = false;
			for(var i = 0; i < window.changedFields.length; i++){
				if((window.changedFields[i].x == fields[posi].x) && (window.changedFields[i].y == fields[posi].y )){
					window.changedFields[i].type = fields[posi].type;
					found = true;
				}
			}
			if(!found){
				window.changedFields.push({"type": fields[posi].type,"x": fields[posi].x,"y": fields[posi].y});
			}
			console.log(window.changedFields);
		}
	} else {
		if(selectedArmy === undefined){
			console.log("Can't move with no army selected");
		} else {
			var clickedArmyCoords = new showHex(listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y);
			var neighbors = clickedArmyCoords.neighbors();
			for (var i = 0; i < neighbors.length; i++){
				if(neighbors[i][0] == clickedField[0] && neighbors[i][1] == clickedField[1]){
					var out;
					if (listOfArmyCoordinates[selectedArmy].ownerTag() === login || login === "sl") {
						out = listOfArmyCoordinates[selectedArmy].move(i);
						console.log(out);
					} else {
						out = "Can only move your own armies."
					}
					if(out === "ok"){
						preparedEvents.push({type: "move", content: {armyId: listOfArmyCoordinates[selectedArmy].a.armyId, realm: listOfArmyCoordinates[selectedArmy].ownerTag(), x: listOfArmyCoordinates[selectedArmy].x, y: listOfArmyCoordinates[selectedArmy].y}});
						var battlePossible = false;
						var participants = [];

						for (var j = 0; j < listOfArmyCoordinates.length; j++) {
							var a = listOfArmyCoordinates[j];
							if (a.x === listOfArmyCoordinates[selectedArmy].x && a.y === listOfArmyCoordinates[selectedArmy].y) {
								participants.push({armyId: a.a.armyId, realm: a.ownerTag()});
								//in case they are enemies
								if (a.owner !== listOfArmyCoordinates[selectedArmy].owner) {
									battlePossible = true;
								}
								//MultipleFriendlyArmies
								//5 cases
								//1. move to create multifield
								//2. move to existing multifield
								//3. move from multi and leaving regular field
								//4. move from multi but still multifield left
								//5. move from multi to multi


							}
						}
						if (battlePossible) {
							preparedEvents.push({type: "battle", content:  {participants: participants, x: listOfArmyCoordinates[selectedArmy].x, y: listOfArmyCoordinates[selectedArmy].y, overrun: false}});
						}
					} else {
						alert(out);
					}
				}
			}
			updateInfoBox();
		}
	}
}

function getClickedField(){
	var x = clickX - originX; // reverse our x/y origin offset
	var y = clickY - originY;
	var m = c/(gW*0.5); // the inclination of the hexes upper triangle side

	var row = Math.floor(y/gH); // get the rectangle clicked in
	var rowIsOdd = (row%2 !== 0);
	var column = Math.floor((rowIsOdd ? ((x+0.5*gW)/gW) : (x/gW)));

	var relY = y - (row * gH); // compute relative position of the click in
								// respect to the rectangle
	var relX = rowIsOdd ? ((x+0.5*gW)-(column*gW)) : (x-(column*gW));

	if (relY < (-m)*relX+c) { // click is in upper left corner
		row--;
		if (rowIsOdd) {column--;}
	} else if (relY < m*relX-c) { // click is in upper right corner
		row--;
		if (!rowIsOdd) {column++;}
	}
	return [column, row]; // return result
}

function writeTurnNumber() {
	// get the top bar element from the HTML document
	var topBar = document.getElementById('topBar');
	var btn = document.getElementById('nextTurnButton');
	var date = document.getElementById('date_text');
	var spec = document.getElementById('special_text');
	if (btn === null) {
		btn = document.createElement("BUTTON");
		btn.id = "nextTurnButton";
		btn.addEventListener('click', function() {nextTurn()});
		date = document.createElement("P");
		date.align = "right";
		date.id = "date_text";
		spec = document.createElement("P");
		spec.align = "left";
		spec.id = "special_text";
	}
	
	if (login !== 'sl' && (currentTurn.realm === null || currentTurn.status === 'fi' || login !== currentTurn.realm)) { 
		// if not logged in as the current realm or SL
		btn.disabled = true;
		btn.style.cursor = "not-allowed";
		btn.style.backgroundImage = "url(immages/nextturn_button_disabled.svg)";
	} else {
		btn.disabled = false;
		btn.style.cursor = "initial";
		btn.style.backgroundImage = "url(immages/nextturn_button.svg)";
	}
	
	date.innerHTML =  "Monat " + months[currentTurn.turn%8] + " des Jahres "+ Math.ceil(currentTurn.turn/8) + " (Zug " + currentTurn.turn + ", ";
	if (currentTurn.realm === null || currentTurn.status === 'fi') { 
		// GM's turn
		date.innerHTML += "SL) ";
	} else { // a realm's turn
		date.innerHTML += currentTurn.realm + ") ";
	}
	date.style="width:340px;float:left;line-height:30px;"
	
	if (currentTurn.turn%8 === 1 || currentTurn.turn%8 === 5) {
		spec.innerHTML =  " Rüstmonat";
	spec.style="width:100px;float:left;line-height:30px;"
	} else if (currentTurn.turn%8 === 4 || currentTurn.turn%8 === 0) {
		spec.innerHTML =  " Einkommensmonat";
	spec.style="width:160px;float:left;line-height:30px;"
	}
	spec.style="width:0px;float:left;line-height:30px;"
	
	topBar.innerHTML = '';
	topBar.appendChild(date);
	topBar.appendChild(btn);
	topBar.appendChild(spec);
}

function init() {
	getNewDataFromServer();
	loadImages(tileset);
	setHexParts(scale);
}

init();
setInterval(function() {
	getNewDataFromServer();
}, 30000);
