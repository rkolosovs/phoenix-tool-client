
'use strict';

var selectedFields = []; // list of fields to be highlighted
var selectedArmy; // currently selected armyCoordinates
var listOfArmyCoordinates;
var listOfMultiArmyFields = [];
var switchScale = 50;
var login = 'guest'; // either realm tag, 'sl', or 'guest'
var pendingEvents = [];

var canvas = document.getElementById('hexCanvas'); // get the canvas element
// from the HTML document
var ctx = canvas.getContext('2d'); // get the context of the canvas

// settings; TODO: let the user change these in game
var tileset = "mbits_painted"; // tileset name
var scrollSpeed = 0.2; // increment to scroll with each step

// var url = "http://phoenixserver.h2610265.stratoserver.net"; //put the url (or
// the IP address) for the remote game server here
var url = "http://localhost:8000"; // for local debug

var leftMousePressed = false; // was the left mouse button klicked but not yet released?
var rightMousePressed = false; // was the right mouse button klicked but not yet released?
var isDragging = false; // was the mouse moved while the button is down?
var scale = 16; // the scale of the elements, specifically the width
var originX = 900; // x coordinate of the origin in respect to which all
// drawing is done
var originY = 490; // y coodrinate of the origin in respect to which all
// drawing is done
var clickX = 0; // x coordinate of the point where the mouse was clicked
var clickY = 0; // y coordinate of the point where the mouse was clicked
var moveX = 0; // x distance the mouse was dragged
var moveY = 0; // y distance the mouse was dragged

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

canvas.addEventListener('mousedown', function (event) {
	if (event.button === 0) {
		leftMousePressed = true;
		clickX = event.pageX; // record the x coordinate of the mouse when it
		// was clicked
		clickY = event.pageY; // record the y coordinate of the mouse when it
		// was clicked
	} else if (event.button === 2) {
		rightMousePressed = true;
		clickX = event.pageX; // record the x coordinate of the mouse when it
		// was clicked
		clickY = event.pageY; // record the y coordinate of the mouse when it
		// was clicked
	}
	drawStuff();
}, { passive: true });

canvas.addEventListener('mouseup', function (event) {
	if (leftMousePressed && event.button === 0) {
		if (isDragging) { // mouse was dragged; run panning finish routine
			originX += moveX; // add the x offset from dragged mouse to the
			// current x origin for drawing
			originY += moveY; // add the y offset from dragged mouse to the
			// current y origin for drawing
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
}, { passive: true });

canvas.addEventListener('mousemove', function (event) {
	if (leftMousePressed === true) {
		isDragging = true; // for later click detection; no click if mouse was previously dragged
		moveX = event.pageX - clickX; // compute the x offset from dragged mouse
		moveY = event.pageY - clickY; // compute the y offset from dragged mouse
		drawStuff();
	}
}, { passive: true });

canvas.addEventListener('wheel', function (event) {
	var deltaY = event.deltaY; // get amount scrolled
	var mouseX = event.pageX; // get current mouse position
	var mouseY = event.pageY;
	var posX = (mouseX - originX) / scale; // get the tile the mouse is
	// currently in (and the position in
	// the tile)
	var posY = (mouseY - originY) / scale;
	if (deltaY < 0) { // do the actuall scrolling
		scale *= 1 + scrollSpeed;
	} else {
		scale *= 1 - scrollSpeed;
	}
	setHexParts(scale); // compute the scale dependant values used for map
	// drawing
	var newPosX = posX * scale; // compute the new distance of mouse from origin
	var newPosY = posY * scale;
	originX = mouseX - newPosX; // move origin so that the tile stays the same
	// with the new scaling
	originY = mouseY - newPosY;
	drawStuff();
}, { passive: true });

// TODO: implement scrolling with keyboard (if desired)
// window.addEventListener('keydown', function (event) {
// });

// window.addEventListener('keyup', function (event) {
// });

function registerLeftClick() {
	var clickedField = getClickedField(); // get selected field
	console.log(clickedField);
	// If mount or unmount is activated, cancel it.
	if (armyWithNextClick) {
		switch (Math.floor(armyIdBuffer / 100)) {
			// TODO: man soll garde erstellen können
			case 3: var army = new seeHeer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, guardBuffer); break;
			case 2: var army = new reiterHeer(armyIdBuffer, countBuffer, leaderBuffer, guardBuffer); break;
			case 1: var army = new heer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, mountsBuffer, guardBuffer); break;
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
		//before adding to list check if there is an army on the field and add multifield accordingly
		var onmulti = false;
		var newmulti = false;
		var foundarmy;
		for (var i = 0; i < listOfArmyCoordinates.length; i++) {
			var a = listOfArmyCoordinates[i];
			if (a.x === armyCoords.x && a.y === armyCoords.y) {
				if (a.multiArmyField === true) {
					onmulti = true;
					foundarmy = a;
				}
				else {
					newmulti = true;
					foundarmy = a;
				}
			}
		}
		if (onmulti == true) {
			addToMultifield(foundarmy, armyCoords)
		}
		else if (newmulti == true) {
			var templist = [];//creating a list of armies to add to the list of multifieldarmies
			templist.push(foundarmy);
			templist.push(armyCoords);
			listOfMultiArmyFields.push(templist);
			foundarmy.multiArmyField = true;
			armyCoords.multiArmyField = true;
		}
		listOfArmyCoordinates.push(armyCoords);
		switchBtnBoxTo("buttonsBox");
		switchModeTo("none");
	} else if (worldCreationModeOnClick) {
		var clickedHex = new showHex(clickedField[0], clickedField[1]);
		var posi = clickedHex.positionInList();
		if (changeFieldToType == -1) {
			// checks if Field should be changed to a specific type, if not use
			// normal world creation mode on click
			if (fields[posi].type == 8 || fields[posi].type == 9) {
				fields[posi].type = 0;
			} else {
				fields[posi].type++;
			}
		} else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
			fields[posi].type = changeFieldToType
		}
		var found = false;
		for (var i = 0; i < window.changedFields.length; i++) {
			if ((window.changedFields[i].x == fields[posi].x) && (window.changedFields[i].y == fields[posi].y)) {
				window.changedFields[i].type = fields[posi].type;
				found = true;
			}
		}
		if (!found) {
			window.changedFields.push({ "type": fields[posi].type, "x": fields[posi].x, "y": fields[posi].y });
		}
		console.log(window.changedFields);
	} else {
		// Feldauswahl
		var index = -1;
		var sf = selectedFields[0];
		if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
			selectedFields = [];
		} else {
			selectedFields[0] = clickedField;
		}
		// Armeeauswahl
		restoreInfoBox();
		selectedArmy = undefined;
		var possibleSelections = [];
		for (var i = 0; i < listOfArmyCoordinates.length; i++) {
			if (listOfArmyCoordinates[i].x == clickedField[0] && listOfArmyCoordinates[i].y == clickedField[1]) {
				possibleSelections.push(i);
				selectedArmy = i;
			}
		}
		if (document.getElementById("btnSection") != null) {
			var d = document.getElementById("buttonsBox");
			d.removeChild(document.getElementById("btnSection"));
		}
		if (possibleSelections.length != 0) {
			var x = document.createElement("SECTION");
			x.setAttribute("id", "btnSection")
			for (var i = 0; i < possibleSelections.length; i++) {
				var btn = document.createElement("BUTTON");
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = listOfArmyCoordinates[possibleSelections[i]].a.armyId + " " + listOfArmyCoordinates[possibleSelections[i]].owner;
				var t = document.createTextNode(listOfArmyCoordinates[possibleSelections[i]].a.armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function (event) {
					var idToSearchFor = this.name.split(" ")[0];
					var ownerToSearchFor = this.name.split(" ")[1];
					for (var j = 0; j < listOfArmyCoordinates.length; j++) {
						if (listOfArmyCoordinates[j].a.armyId == idToSearchFor && listOfArmyCoordinates[j].owner == ownerToSearchFor) {
							selectedArmy = j;
						}
					}
					updateInfoBox();
					restoreInfoBox();
					console.log(selectedArmy);
					if (selectedArmy !== undefined) {
						listOfArmyCoordinates[selectedArmy].clickedMoves();
					}
					drawStuff();
				});
				x.appendChild(btn);
			}
			document.getElementById("buttonsBox").appendChild(x);
		}
		updateInfoBox();
		if (selectedArmy !== undefined) {
			listOfArmyCoordinates[selectedArmy].clickedMoves();
		}
	}
}

function registerRightClick() {
	var clickedField = getClickedField();
	console.log(clickedField);
	if (worldCreationModeOnClick) {
		var clickedHex = new showHex(clickedField[0], clickedField[1]);
		var posi = clickedHex.positionInList();
		if (changeFieldToType == -1) {
			// checks if Field should be changed to a specific type (then
			// rightclick is disabled)
			if (fields[posi].type == 0 || fields[posi].type == 9) {
				fields[posi].type = 8;
			} else {
				fields[posi].type--;
			}
			var found = false;
			for (var i = 0; i < window.changedFields.length; i++) {
				if ((window.changedFields[i].x == fields[posi].x) && (window.changedFields[i].y == fields[posi].y)) {
					window.changedFields[i].type = fields[posi].type;
					found = true;
				}
			}
			if (!found) {
				window.changedFields.push({ "type": fields[posi].type, "x": fields[posi].x, "y": fields[posi].y });
			}
			console.log(window.changedFields);
		}
	} else {
		if (selectedArmy === undefined) {
			console.log("Can't move with no army selected");
		} else {
			var clickedArmyCoords = new showHex(listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y);
			var neighbors = clickedArmyCoords.neighbors();
			for (var i = 0; i < neighbors.length; i++) {
				if (neighbors[i][0] == clickedField[0] && neighbors[i][1] == clickedField[1]) {
					var out;
					if (listOfArmyCoordinates[selectedArmy].ownerTag() === login || login === "sl") {
						out = listOfArmyCoordinates[selectedArmy].move(i);
						console.log(out);
					} else {
						out = "Can only move your own armies."
					}
					if (out === "ok") {
						preparedEvents.push({
							type: "move", content: {
								armyId: listOfArmyCoordinates[selectedArmy].a.armyId,
								realm: listOfArmyCoordinates[selectedArmy].ownerTag(),
								fromX: clickedArmyCoords.x, fromY: clickedArmyCoords.y,
								toX: listOfArmyCoordinates[selectedArmy].x, toY: listOfArmyCoordinates[selectedArmy].y
							}
						});

						var battlePossible = false;
						var participants = [];

						//before moving check if you leave a Multi Army field
						if (listOfArmyCoordinates[selectedArmy].multiArmyField === true) {
							deleteFromMultifield(listOfArmyCoordinates[selectedArmy]);
						}

						for (var j = 0; j < listOfArmyCoordinates.length; j++) {
							var someArmy = listOfArmyCoordinates[j];
							if (someArmy.x === listOfArmyCoordinates[selectedArmy].x && someArmy.y === listOfArmyCoordinates[selectedArmy].y
								&& someArmy.a !== listOfArmyCoordinates[selectedArmy].a) {
								participants.push({ armyId: someArmy.a.armyId, realm: someArmy.ownerTag() });
								//in case they are enemies
								if (someArmy.owner !== listOfArmyCoordinates[selectedArmy].owner) {
									battlePossible = true;
								}
								//MultipleArmies - even if not friendly
								//5 cases
								//1. move to create multifield
								//2. move to existing multifield
								//3. move from multi and leaving regular field
								//4. move from multi but still multifield left
								//5. move from multi to multi

								if (someArmy.multiArmyField === true) {//2.
									addToMultifield(someArmy, listOfArmyCoordinates[selectedArmy]);
								}
								else {//1.
									var templist = [];//creating a list of armies to add to the list of multifieldarmies
									templist.push(someArmy);
									templist.push(listOfArmyCoordinates[selectedArmy]);
									listOfMultiArmyFields.push(templist);
									someArmy.multiArmyField = true;
									listOfArmyCoordinates[selectedArmy].multiArmyField = true;
								}
							}
						}

						if (battlePossible) {
							var inserted = false;
							participants.push({
								armyId: listOfArmyCoordinates[selectedArmy].a.armyId,
								realm: listOfArmyCoordinates[selectedArmy].ownerTag()
							});
							for (var j = 0; j < preparedEvents.length; j++) {
								if (preparedEvents[j].type === "battle" &&
									preparedEvents[j].content.x === listOfArmyCoordinates[selectedArmy].x &&
									preparedEvents[j].content.y === listOfArmyCoordinates[selectedArmy].y) {
									preparedEvents[j].content.participants = participants;
									inserted = true;
								}
							}
							if (!inserted) {
								preparedEvents.push({
									type: "battle", content: {
										participants: participants,
										x: listOfArmyCoordinates[selectedArmy].x, y: listOfArmyCoordinates[selectedArmy].y
									}
								});
							}
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

function addToMultifield(armyOnMultifield, armyToAdd) {
	var alreadyInList = false;
	var placeToAdd;
	for (var i = 0; i < listOfMultiArmyFields.length; i++) {
		for (var j = 0; j < listOfMultiArmyFields[i].length; j++) {
			if (listOfMultiArmyFields[i][j].a === armyOnMultifield.a) {
				placeToAdd = i;
			}
			else if (listOfMultiArmyFields[i][j].a === armyToAdd.a) {
				alreadyInList = true;
			}
		}
	}
	if (alreadyInList == false) {
		listOfMultiArmyFields[placeToAdd].push(armyToAdd);
	}
	armyToAdd.multiArmyField = true;
}

function deleteFromMultifield(armyToDelete) {
	addArmyToMulti: {//label to jump out when its found and added
		for (var k = 0; k < listOfMultiArmyFields.length; k++) {
			for (var l = 0; l < listOfMultiArmyFields[k].length; l++) {
				if (listOfMultiArmyFields[k][l].a === armyToDelete.a) {
					listOfMultiArmyFields[k].splice(l, 1);

					//check if remaining field is still multi
					if (listOfMultiArmyFields[k].length < 2) {
						listOfMultiArmyFields[k][0].multiArmyField = false;
						listOfMultiArmyFields.splice(k, 1);
					}
					break;
				}
			}
		}
	}
	armyToDelete.multiArmyField = false;
}

function getClickedField() {
	var x = clickX - originX; // reverse our x/y origin offset
	var y = clickY - originY;
	var m = c / (gW * 0.5); // the inclination of the hexes upper triangle side

	var row = Math.floor(y / gH); // get the rectangle clicked in
	var rowIsOdd = (row % 2 !== 0);
	var column = Math.floor((rowIsOdd ? ((x + 0.5 * gW) / gW) : (x / gW)));

	var relY = y - (row * gH); // compute relative position of the click in
	// respect to the rectangle
	var relX = rowIsOdd ? ((x + 0.5 * gW) - (column * gW)) : (x - (column * gW));

	if (relY < (-m) * relX + c) { // click is in upper left corner
		row--;
		if (rowIsOdd) { column--; }
	} else if (relY < m * relX - c) { // click is in upper right corner
		row--;
		if (!rowIsOdd) { column++; }
	}
	return [column, row]; // return result
}


function mainButton() {
	toggleVisibility(document.getElementById("bigBox"));
}

function determineEventStatus() {
	//	console.log("determineEventStatus()");
	for (var i = 0; i < pendingEvents.length; i++) {
		var event = pendingEvents[i];
		var content = event.content;
		if (event.status === 'undetermined' || event.status === 'available' ||
			event.status === 'withheld' || event.status === 'impossible') {
			if (event.type === 'move') {
				if (armyExistsAndIsLocated(content.realm, content.armyId, content.fromX, content.fromY) &&
					!unprocessedBattleAtContainingArmy(content.realm, content.armyId, content.fromX, content.fromY) &&
					canMove(content.realm, content.armyId, content.fromX, content.fromY, content.toX, content.toY)) {
					pendingEvents[i].status = 'available';
				} else if (armyExists(content.realm, content.armyId) &&
					possibleMoveOfArmyTo(content.realm, content.armyId, content.fromX, content.fromY)) {
					pendingEvents[i].status = 'withheld';
				} else {
					pendingEvents[i].status = 'impossible';
				}
			} else if (event.type === 'battle') {
				if (eachArmyExistsAndIsLocated(content.participants, content.x, content.y)) {
					pendingEvents[i].status = 'available';
				} else if (eachArmyExists(content.participants) &&
					possibleMoveOfEachArmyTo(content.participants, content.x, content.y)) {
					pendingEvents[i].status = 'withheld';
				} else {
					pendingEvents[i].status = 'impossible';
				}
			}
			else if (event.type === 'merge') {
				var army1 = listOfArmyCoordinates[findArmyPlaceInList(content.fromArmy, content.realm)];
				var army2 = listOfArmyCoordinates[findArmyPlaceInList(content.toArmy, content.realm)];
				if (army1 == undefined || army2 == undefined) {
					pendingEvents[i].status = 'withheld';
				}
				else if (army1.a.armyType() == army2.a.armyType() && army1.x == army2.x && army1.y == army2.y) {
					pendingEvents[i].status = 'available';
				}
				else if ((army1.a.armyType() != army2.a.armyType()) ||
					((((army1.a.armyType() == 1 || army1.a.armyType() == 2) && army1.remainingMovePoints < 3) ||
						army1.a.armyType() == 3 && army1.remainingMovePoints < 5) && (((army2.a.armyType() == 1 || army2.a.armyType() == 2) &&
							army2.remainingMovePoints < 3) || army2.a.armyType() == 3 && army2.remainingMovePoints < 5))) {
					pendingEvents[i].status = 'impossible';
				}
				else {
					pendingEvents[i].status = 'withheld';
				}
			}
			else if (event.type === 'transfer') {
				var army1 = listOfArmyCoordinates[findArmyPlaceInList(content.fromArmy, content.realm)];
				var army2 = listOfArmyCoordinates[findArmyPlaceInList(content.toArmy, content.realm)];
				if (army1 == undefined || army2 == undefined) {
					pendingEvents[i].status = 'withheld';
				}
				else if ((army1.a.armyType() == army2.a.armyType() || (content.troops == 0 && content.mounts == 0 && content.lkp == 0 && content.skp == 0))
					&& army1.x == army2.x && army1.y == army2.y) {
					pendingEvents[i].status = 'available';
				}
				else if (((((army1.a.armyType() == 1 || army1.a.armyType() == 2) && army1.remainingMovePoints < 3) ||
					army1.a.armyType() == 3 && army1.remainingMovePoints < 5) && (((army2.a.armyType() == 1 || army2.a.armyType() == 2) &&
						army2.remainingMovePoints < 3) || army2.a.armyType() == 3 && army2.remainingMovePoints < 5))) {
					pendingEvents[i].status = 'impossible';
				}
				else {
					pendingEvents[i].status = 'withheld';
				}
			}
			else if (event.type === 'split') {
				var typefactor = 1;
				var army = listOfArmyCoordinates[findArmyPlaceInList(content.fromArmy, content.realm)];
				if (army == undefined) {
					pendingEvents[i].status = 'withheld';
				} else {
					if (army.a.armyType() == 2) {
						typefactor = 2;
					}
					else if (army.a.armyType() == 3) {
						typefactor = 100;
					}
					if (((army.a.count - content.troops) >= (100 / typefactor)) &&
						((army.a.leaders - content.leaders) >= 1) &&
						((army.a.mounts - content.mounts) >= 0) &&
						((army.a.lkp - content.lkp) >= 0) &&
						((army.a.skp - content.skp) >= 0)) {
						pendingEvents[i].status = 'available';
					}
					else {
						pendingEvents[i].status = 'impossible';
					}
				}
			}
		}
	}
}

//begin of helper methods for event status determining
function eachArmyExists(armies) {
	//	console.log("eachArmyExits("+armies+")");
	return (armies.length > 0) && (armies.map(function (army) {
		return armyExists(army.realm, army.armyId);
	}).reduce(function (total, current) {
		return total && current;
	}, true));
}

function findArmyPlaceInList(armyId, owner) {
	for (var i = 0; i < listOfArmyCoordinates.length; i++) {
		if (listOfArmyCoordinates[i].a.armyId == armyId && listOfArmyCoordinates[i].owner == owner) {
			return i;
		}
	}
}

function eachArmyExistsAndIsLocated(armies, x, y) {
	//	console.log("eachArmyExistsAndIsLocated("+armies+", "+x+", "+y+")");
	return (armies.length > 0) && (armies.map(function (army) {
		return armyExistsAndIsLocated(army.realm, army.armyId, x, y);
	}, this).reduce(function (total, current) {
		return total && current;
	}, true));
}

function possibleMoveOfEachArmyTo(armies, x, y) {
	//	console.log("possibleMoveOfEachArmyTo("+armies+", "+x+", "+y+")");
	return (armies.length > 0) && (armies.map(function (army) {
		return armyExistsAndIsLocated(army.realm, army.armyId, x, y) ||
			possibleMoveOfArmyTo(army.realm, army.armyId, x, y);
	}, this).reduce(function (total, current) {
		return total && current;
	}, true));
}

function armyExists(realm, id) {
	//	console.log("armyExists("+realm+", "+id+")");
	return listOfArmyCoordinates.some(function (val) {
		return (val.ownerTag() === realm) && (val.a.armyId === id);
	}, this);
}

function armyExistsAndIsLocated(realm, id, x, y) {
	//	console.log("armyExistsAndIsLocated("+realm+", "+id+", "+x+", "+y+")");
	return listOfArmyCoordinates.some(function (val) {
		return (val.ownerTag() === realm) &&
			(val.a.armyId === id) &&
			(val.x === x) && (val.y === y);
	}, this);
}

function possibleMoveOfArmyTo(realm, id, x, y) {
	//	console.log("possibleMoveOfArmyTo("+realm+", "+id+", "+x+", "+y+")");
	return pendingEvents.some(function (pEv) {
		return (pEv.type === 'move') && (pEv.content.realm === realm) &&
			(pEv.content.armyId === id) && (pEv.status !== 'deleted' || pEv.status !== 'checked') &&
			(pEv.content.toX === x) && (pEv.content.toY === y) &&
			(canMove(realm, id, pEv.content.fromX, pEv.content.fromY, x, y));
	}, this);
}

function unprocessedBattleAtContainingArmy(realm, id, x, y) {
	//	console.log("unprocessedBattleAtContainingArmy("+realm+", "+id+", "+x+", "+y+")");
	return pendingEvents.some(function (pEv) {
		return (pEv.type === 'battle') &&
			(pEv.status !== 'deleted') &&
			(pEv.status !== 'checked') &&
			(pEv.content.x === x) &&
			(pEv.content.y === y) &&
			(pEv.content.participants.some(function (part) {
				return (part.armyId === id) && (part.realm === realm);
			}, this));
	}, this);
}

function canMove(realm, id, fromX, fromY, toX, toY) {
	var foundArmy = listOfArmyCoordinates.find(function (army) {
		return (army.a.armyId === id) && (army.ownerTag() === realm);
	}, this);
	if (foundArmy !== undefined && foundArmy.x === fromX && foundArmy.y === fromY) {
		var adjacency = getAdjacency([fromX, fromY], [[toX, toY]]);

		if (adjacency.reduce((total, current) => (total || current), false)) {
			foundArmy.possibleMoves = [];
			var direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
			foundArmy.moveToList(direction);
			return foundArmy.possibleMoves.length > 0;
		}
		//		var origin = new showHex(fromX, fromY);
		//        var destination = new showHex(toX, toY);
		//		var streetPresent = buildings.some(function(building){
		//			return (building.type === 8) && 
		//				(((building.firstX == fromX && building.firstY == fromY) && (building.secondX == toX && building.secondY == toY)) || 
		//					((building.secondX == toX && building.secondY == toY) && (building.firstX == fromX && building.firstY == fromY)));
		//		});
		//		var heightDifference = Math.abs((origin.height() - destination.height()));
		//		//TODO: This is missing harbors
		//		var enoughHeightPoints =  (foundArmy.remainingHeightPoints >= 1) &&
		//			((heightDifference <= 2 && streetPresent) || (heightDifference <= 1));
		//		//TODO: This is missin gbasically everything. But hey, the movement points are set as too high anyways right now.
		//		//TODO: Change the TODO above once the movement points are no longer extreme high due to testing.
		//		var enoughMovePoints = (foundArmy.remainingMovePoints >= 7);
		//		return enoughHeightPoints && enoughMovePoints; 
	} else {
		return false;
	}
}
//end of helper methods for event status determining

function fillEventList() {
	var eventList = document.getElementById("eventsTab");
	eventList.innerHTML = "";
	determineEventStatus();
	for (var i = 0; i < pendingEvents.length; i++) {
		eventList.appendChild(makeEventListItem(pendingEvents[i], i));
	}
}

function realmIdToshort(id) {
	switch (id) {
		case 1: return "usa";
		case 2: return "eos";
		case 3: return "vvh";
	}
}

function makeEventListItem(event, i) {
	var eli = document.createElement("DIV");
	eli.classList.add("eventListItem");
	eli.id = "eli" + i;
	var cont = event.content;
	if (event.type === "move") {
		eli.innerHTML = "<div>Move " + cont.realm + " army " + cont.armyId + " from (" + cont.fromX + ", " + cont.fromY + ") to (" + cont.toX + ", " + cont.toY + ")</div>";
	} else if (event.type === "battle") {
		var html = "<div>Battle at (" + cont.x + ", " + cont.y + ") involving";
		var partips = cont.participants
		for (var j = 0; j < partips.length; j++) {
			html += " [" + partips[j].realm + " " + partips[j].armyId + "]";
		}
		eli.innerHTML = html + "</div>";
	} else if (event.type === "merge") {
		eli.innerHTML = "<div>" + realmIdToshort(cont.realm) + "'s army " + cont.fromArmy + " merges with army " + cont.toArmy + " in (" +cont.x+ ","+cont.y+ ").</div>";
	} else if (event.type === "split") {
		// TODO: detailed explanation
		var innerHTMLString = "<div>" + realmIdToshort(cont.realm) + "'s army " + cont.fromArmy + " splits off army " + cont.newArmy + " with ";
		if(cont.troops != 0){
			innerHTMLString += cont.troops+ " troops, ";
		}
		if(cont.leaders != 0){
			innerHTMLString += cont.leaders+ " leaders, ";
		}
		if(cont.mounts != 0){
			innerHTMLString += cont.mounts + " mounts, ";
		}
		if(cont.lkp != 0){
			innerHTMLString += cont.lkp + " lkp, ";
		}
		if(cont.skp != 0){
			innerHTMLString += cont.skp + " skp ";
		}
		innerHTMLString += "in (" +cont.x+ ","+cont.y+ ").</div>";
		eli.innerHTML =  innerHTMLString;
	} else if (event.type === "transfer") {
		var innerHTMLString = "<div>" + realmIdToshort(cont.realm) + "'s army " + cont.fromArmy + " transfers ";
		if(cont.troops != 0){
			innerHTMLString += cont.troops+ " troops, ";
		}
		if(cont.leaders != 0){
			innerHTMLString += cont.leaders+ " leaders, ";
		}
		if(cont.mounts != 0){
			innerHTMLString += cont.mounts + " mounts, ";
		}
		if(cont.lkp != 0){
			innerHTMLString += cont.lkp + " lkp, ";
		}
		if(cont.skp != 0){
			innerHTMLString += cont.skp + " skp ";
		}
		innerHTMLString += "to " + cont.toArmy + " in (" +cont.x+ ","+cont.y+ ").</div>";
		eli.innerHTML =  innerHTMLString;
	}
	var deleteButton = document.createElement("BUTTON");
	deleteButton.id = "delBtn" + i;
	deleteButton.classList.add("eventListButton");
	deleteButton.classList.add("eventListDeleteButton");
	deleteButton.onclick = deleteEvent(i);
	var checkButton = document.createElement("BUTTON");
	checkButton.id = "checkBtn" + i;
	checkButton.classList.add("eventListButton");
	checkButton.classList.add("eventListCheckButton");
	checkButton.onclick = checkEvent(i);
	eli.appendChild(deleteButton);
	eli.appendChild(checkButton);

	if (event.status === 'checked') {
		eli.classList.add("checkedELI");
		deleteButton.disabled = true;
		checkButton.disabled = true;
	} else if (event.status === 'deleted') {
		eli.classList.add("deletedELI");
		deleteButton.disabled = true;
		checkButton.disabled = true;
	} else if (event.status === 'impossible') {
		eli.classList.add("impossibleELI");
		checkButton.disabled = true;
	} else if (event.status === 'withheld') {
		eli.classList.add("withheldELI");
		checkButton.disabled = true;
	} else if (event.status === 'available') {
		eli.classList.add("availableELI");
	}

	return eli;
}

function deleteEvent(num) {
	function del() {
		var eli = document.getElementById("eli" + num);
		var event = pendingEvents[num];
		event.status = 'deleted';
		fillEventList();
		//		sendDeleteEvent(event.pk, event.type);
	}
	return del;
}

function checkEvent(num) {
	function check() {
		var eli = document.getElementById("eli" + num);
		var event = pendingEvents[num];
		var cont = event.content;
		if (event.type === "move") {
			var army;
			for (var i = 0; i < listOfArmyCoordinates.length; i++) {
				army = listOfArmyCoordinates[i];
				if (army.ownerTag() === cont.realm && cont.armyId === army.a.armyId) {
					break;
				}
			}
			var adjacency = getAdjacency([army.x, army.y], [[cont.toX, cont.toY]]);
			if (adjacency[0] === 1) {
				army.moveToList(1);
				army.move(1);//move to ne
			} else if (adjacency[1] === 1) {
				army.moveToList(2);
				army.move(2);//move to e
			} else if (adjacency[2] === 1) {
				army.moveToList(3);
				army.move(3);//move to se
			} else if (adjacency[3] === 1) {
				army.moveToList(4);
				army.move(4);//move to sw
			} else if (adjacency[4] === 1) {
				army.moveToList(5);
				army.move(5);//move to w
			} else if (adjacency[5] === 1) {
				army.moveToList(0);
				army.move(0);//move to nw
			}
			event.status = 'checked';
			fillEventList();
			drawStuff();
		} else if (event.type === "battle") {
			var battleBox = document.getElementById("battleBox");
			show(battleBox);

			var partips = [];
			cont.participants.forEach(function (item) {
				var a = listOfArmyCoordinates.find(function (candidate) {
					return (item.realm === candidate.ownerTag()) && (item.armyId === candidate.a.armyId);
				});
				partips.push(a);
			});

			var battle = new battleHandler(partips, cont.x, cont.y);
			document.getElementById("attackDiceRoll").onchange = function () { battle.updateDisplay() };
			document.getElementById("defenseDiceRoll").onchange = function () { battle.updateDisplay() };
			var battleButton = document.getElementById("battleButton");
			battleButton.onclick = function () {
				battle.resolve();
				hide(battleBox);
				event.status = 'checked';
				fillEventList();
				drawStuff();
			};
			battleButton.disabled = true;
			battleButton.style.cursor = "not-allowed";
			document.getElementById("closeBattleButton").onclick = function () {
				hide(battleBox);
			};
			battle.updateDisplay();
		} else if (event.type === "split") {
			console.log("this is a split event");
			var armyFromPlaceInList = -1;
			var armyFromId = cont.fromArmy;
			var newArmyId = cont.newArmy;
			var realm = cont.realm;
			var toSplit = cont.troops;
			var leadersToSplit = cont.leaders;
			var mountsToSplit = cont.mounts;
			var lkpToSplit = cont.lkp;
			var skpToSplit = cont.skp;
			for (var i = 0; i < listOfArmyCoordinates.length; i++) {
				if (listOfArmyCoordinates[i].a.armyId == armyFromId && listOfArmyCoordinates[i].owner == realm) {
					armyFromPlaceInList = i;
				}
			}
			if (armyFromPlaceInList >= 0) {
				listOfArmyCoordinates[armyFromPlaceInList].a.count -= toSplit;
				listOfArmyCoordinates[armyFromPlaceInList].a.leaders -= leadersToSplit;
				if (listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 1) {
					listOfArmyCoordinates[armyFromPlaceInList].a.mounts -= mountsToSplit;
				}
				if (listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 1 || listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 3) {
					listOfArmyCoordinates[armyFromPlaceInList].a.lkp -= lkpToSplit;
					listOfArmyCoordinates[armyFromPlaceInList].a.skp -= skpToSplit;
				}
				var army = null;
				if (Math.floor(newArmyId / 100) == 1) {
					army = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false);
				}
				else if (Math.floor(newArmyId / 100) == 2) {
					army = new reiterHeer(newArmyId, toSplit, leadersToSplit, false);
				}
				else if (Math.floor(newArmyId / 100) == 3) {
					army = new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false);
				}
				var armyCoords = new armyCoordinates(army, listOfArmyCoordinates[armyFromPlaceInList].x, listOfArmyCoordinates[armyFromPlaceInList].y, realm);
				armyCoords.setRemainingMovePoints(listOfArmyCoordinates[armyFromPlaceInList].remainingMovePoints);
				armyCoords.setRemainingHeightPoints(listOfArmyCoordinates[armyFromPlaceInList].remainingHeightPoints);
				listOfArmyCoordinates.push(armyCoords);
			}
			event.status = 'checked';
			fillEventList();
			drawStuff();
		} else if (event.type === "merge") {
			var armyFromPlaceInList = -1;
			var armyToPlaceInList = -1;
			var armyFromId = cont.fromArmy;
			var armyToId = cont.toArmy;
			var realm = cont.realm;
			for (var i = 0; i < listOfArmyCoordinates.length; i++) {
				if (listOfArmyCoordinates[i].a.armyId == armyFromId && listOfArmyCoordinates[i].owner == realm) {
					armyFromPlaceInList = i;
					console.log("i1=" + i);
				}
				else if (listOfArmyCoordinates[i].a.armyId == armyToId && listOfArmyCoordinates[i].owner == realm) {
					armyToPlaceInList = i;
					console.log("i2=" + i);
				}
			}
			console.log("armyfromplace = " + armyFromPlaceInList);
			console.log("armytoplace = " + armyToPlaceInList)
			if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
				selectedArmy = armyFromPlaceInList;
				mergeSelectedArmy(armyToPlaceInList);
				preparedEvents.pop();
			}
			event.status = 'checked';
			fillEventList();
			drawStuff();
			selectedArmy = undefined;
		} else if (event.type === "transfer") {
			console.log("this is a transfer event");
			var armyFromPlaceInList = -1;
			var armyToPlaceInList = -1;
			var armyFromId = cont.fromArmy;
			var armyToId = cont.toArmy;
			var realm = cont.realm;
			var toSplit = cont.troops;
			var leadersToSplit = cont.leaders;
			var mountsToSplit = cont.mounts;
			var lkpToSplit = cont.lkp;
			var skpToSplit = cont.skp;
			for (var i = 0; i < listOfArmyCoordinates.length; i++) {
				if (listOfArmyCoordinates[i].a.armyId == armyFromId && listOfArmyCoordinates[i].owner == realm) {
					armyFromPlaceInList = i;
				}
				else if (listOfArmyCoordinates[i].a.armyId == armyToId && listOfArmyCoordinates[i].owner == realm) {
					armyToPlaceInList = i;
				}
			}
			if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
				listOfArmyCoordinates[armyFromPlaceInList].a.count -= toSplit;
				listOfArmyCoordinates[armyToPlaceInList].a.count += toSplit;
				listOfArmyCoordinates[armyFromPlaceInList].a.leaders -= leadersToSplit;
				listOfArmyCoordinates[armyToPlaceInList].a.leaders += leadersToSplit;
				if (listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 1) {
					listOfArmyCoordinates[armyFromPlaceInList].a.mounts -= mountsToSplit;
					listOfArmyCoordinates[armyToPlaceInList].a.mounts += mountsToSplit;
				}
				if (listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 1 || listOfArmyCoordinates[armyFromPlaceInList].a.armyType == 3) {
					listOfArmyCoordinates[armyFromPlaceInList].a.lkp -= lkpToSplit;
					listOfArmyCoordinates[armyToPlaceInList].a.lkp += lkpToSplit;
					listOfArmyCoordinates[armyFromPlaceInList].a.skp -= skpToSplit;
					listOfArmyCoordinates[armyToPlaceInList].a.skp += skpToSplit;
				}
				if(leadersToSplit > 0 && 
					listOfArmyCoordinates[armyFromPlaceInList].remainingMovePoints < listOfArmyCoordinates[armyFromPlaceInList].startingMovepoints())
				{
					listOfArmyCoordinates[armyToPlaceInList].setRemainingMovePoints(0);
				} else if (listOfArmyCoordinates[armyFromPlaceInList].remainingMovePoints < listOfArmyCoordinates[armyToPlaceInList].remainingMovePoints) {
					listOfArmyCoordinates[armyToPlaceInList].setRemainingMovePoints(listOfArmyCoordinates[armyFromPlaceInList].remainingMovePoints);
				}
				if (listOfArmyCoordinates[armyFromPlaceInList].remainingHeightPoints < listOfArmyCoordinates[armyToPlaceInList].remainingHeightPoints) {
					listOfArmyCoordinates[armyToPlaceInList].setRemainingHeightPoints(listOfArmyCoordinates[armyFromPlaceInList].remainingHeightPoints);
				}
			}
			event.status = 'checked';
			fillEventList();
			drawStuff();
		}
	}
	return check;
}

function openTab(evt, tabName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened
	// the tab
	if (evt !== undefined && tabName !== "") {
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " active";
	}
}

function init() {
	getNewDataFromServer();
	loadTurnNumber();
	loadImages(tileset);
	setHexParts(scale);
}

init();
setInterval(function () {
	getNewDataFromServer();
}, 30000);
