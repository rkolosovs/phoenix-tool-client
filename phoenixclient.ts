//constants
const SQRT3 = Math.sqrt(3); //about 1.732050808...
const SIN60 = 0.5 * SQRT3; //about 0.8660254037...
const OFFICER_RP: number = 100;
const SHIP_RP: number = 100;
const GUARD_RP_MULT: number = 3;
const LIGHT_WS_RP: number = 1000;
const HEAVY_WS_RP: number = 2000;
const SHIP_TRANSPORT_CAPACITY: number = 100;
const FOOTMAN_RP: number = 1;
const RIDER_RP: number = 2;
const LIGHT_CATA_RP: number = 1000;
const HEAVY_CATA_RP: number = 2000;
const MOUNT_RP: number = 1;
const FOOTMAN_BP: number = 0.1;
const MOUNT_BP: number = 0.1;
const RIDER_BP: number = 0.2;
const SHIP_BP: number = 10;
const LIGHT_CATA_BP: number = 200;
const HEAVY_CATA_BP: number = 400;
const LIGHT_WS_BP: number = 200;
const HEAVY_WS_BP: number = 400;

enum Direction{
	NW, //North-west
	NE, //North-east
	E, //East
	SE, //South-east
	SW, //South-west
	W //West
}


var selectedFields  = []; // list of fields to be highlighted
var selectedArmyIndex; // index of the currently selected army in the GameState.armies
// var listOfArmies: any[] = [];
var switchScale = 50;
var login = 'guest'; // either realm tag, 'sl', or 'guest'

var pendingEvents = [];//TODO this is left for the determineEventStatus Helper functions that will be reorked


// var canvas: HTMLCanvasElement = document.getElementById('hexCanvas') as HTMLCanvasElement; // get the canvas element
// from the HTML document
// var ctx: CanvasRenderingContext2D = GUI.getContext(); // get the context of the canvas

// settings; TODO: let the user change these in game
var tileset = "mbits_painted"; // tileset name
var scrollSpeed = 0.2; // increment to scroll with each step

// var url = "http://phoenixserver.h2610265.stratoserver.net"; //put the url (or
// the IP address) for the remote game server here
var url = "http://localhost:8000"; // for local debug

var currentCSRFToken;
var currentTurn; //status \in {st, fi}
var months = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];
var preparedEvents = [];

var loginZeit;

var changedFields = []; // Fields that were changes with World Builder
var changedBuildings = []; // [true if added false if removed, buildings that were added deleted or changed]
var authenticationToken = 0; // the session Token, default = 0.

var leftMousePressed = false; // was the left mouse button klicked but not yet released?
var rightMousePressed = false; // was the right mouse button klicked but not yet released?
var isDragging = false; // was the mouse moved while the button is down?
var scale = 16; // the scale of the elements, specifically the width
//coordinate of the origin in respect to which all drawing is done
var origin: [number, number] = [900, 490];
// var originX = 900;
// var originY = 490;
//coordinate of the point where the mouse was clicked
var click: [number, number] = [0, 0];
// var clickX = 0; // x coordinate of the point where the mouse was clicked
// var clickY = 0; // y coordinate of the point where the mouse was clicked
//distance the mouse was dragged
var move: [number, number] = [0, 0];
// var moveX = 0; // x distance the mouse was dragged
// var moveY = 0; // y distance the mouse was dragged

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', Drawing.resizeCanvas, false);

GUI.getCanvas().addEventListener('mousedown', function (event: MouseEvent) {
	if (event.button === 0) {
		leftMousePressed = true;
		click[0] = event.pageX; // record the x coordinate of the mouse when it
		// was clicked
		click[1] = event.pageY; // record the y coordinate of the mouse when it
		// was clicked
	} else if (event.button === 2) {
		rightMousePressed = true;
		click[0] = event.pageX; // record the x coordinate of the mouse when it
		// was clicked
		click[1] = event.pageY; // record the y coordinate of the mouse when it
		// was clicked
	}
	Drawing.drawStuff();
}, true );

document.addEventListener('mouseup', function (event: MouseEvent) {
	if (leftMousePressed && event.button === 0) {
		if (isDragging) { // mouse was dragged; run panning finish routine
            // add the x offset from dragged mouse to the current x origin for drawing
			origin[0] += move[0];
			// add the y offset from dragged mouse to the current y origin for drawing
			origin[1] += move[1];
		}
		else {
			registerLeftClick(); // do whatever has to be done on leftclick
		}
		// reset mouse click parameters
		leftMousePressed = false; // mouse is no longer pressed
		isDragging = false; // mouse is no longer being dragged
		click = [0, 0]; // reset click registration
		move = [0, 0]; // reset move registration
	} else if (rightMousePressed && event.button === 2) {
		if (!isDragging) {
			registerRightClick();
		}
		// reset mouse click parameters
		rightMousePressed = false; // mouse is no longer pressed
		isDragging = false; // mouse is no longer being dragged
        click = [0, 0]; // reset click registration
        move = [0, 0]; // reset move registration
	}
	Drawing.drawStuff();
}, true );

GUI.getCanvas().addEventListener('mousemove', function (event: MouseEvent) {
	if (leftMousePressed === true) {
		isDragging = true; // for later click detection; no click if mouse was previously dragged
		move[0] = event.pageX - click[0]; // compute the x offset from dragged mouse
		move[1] = event.pageY - click[1]; // compute the y offset from dragged mouse
		Drawing.drawStuff();
	}
}, true );

GUI.getCanvas().addEventListener('wheel', function (event: MouseWheelEvent) {
	let deltaY: number = event.deltaY; // get amount scrolled
	let mouse: [number, number] = [event.pageX, event.pageY]; // get current mouse position
    // get the tile the mouse is currently in (and the position in the tile)
	let pos: [number, number] = [(mouse[0] - origin[0]) / scale, (mouse[1] - origin[1]) / scale];
	if (deltaY < 0) { // do the actuall scrolling
		scale *= 1 + scrollSpeed;
	} else {
		scale *= 1 - scrollSpeed;
	}
	Drawing.setHexParts(scale); // compute the scale dependant values used for map drawing
	let newPos: [number, number] = [pos[0] * scale, pos[1] * scale]; // compute the new distance of mouse from origin
    // move origin so that the tile stays the same  with the new scaling
	origin = [mouse[0] - newPos[0], mouse[1] - newPos[1]];
	Drawing.drawStuff();
}, true );

// TODO: implement scrolling with keyboard (if desired)
// window.addEventListener('keydown', function (event) {
// });

// window.addEventListener('keyup', function (event) {
// });

function stringToDirection(dir: string): Direction{
    switch(dir){
        case "nw": return Direction.NW;
        case "ne": return Direction.NE;
        case "e": return Direction.E;
        case "se": return Direction.SE;
        case "sw": return Direction.SW;
        case "w": return Direction.W;
        default: return -1;
    }
}

function registerLeftClick() {
	let clickedField: [number, number] = getClickedField(); // get selected field
	// If mount or unmount is activated, cancel it.
	if (armyWithNextClick) {
		let army: Army;
		switch (Math.floor(armyIdBuffer / 100)) {
			// TODO: man soll garde erstellen können
			case 3: army = new Fleet(armyIdBuffer, GameState.realms.find(realm => realm.tag === ownerBuffer),
                countBuffer, leaderBuffer, lkpBuffer, skpBuffer, clickedField, Fleet.MAX_MOVE_POINTS, guardBuffer);
			    break;
                // new seeHeer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, guardBuffer,
				// clickedField[0], clickedField[1], ownerBuffer); break;
			case 2: army = new RiderArmy(armyIdBuffer, GameState.realms.find(realm => realm.tag === ownerBuffer),
                countBuffer, leaderBuffer, clickedField, RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS, guardBuffer);
			    break;
                // new reiterHeer(armyIdBuffer, countBuffer, leaderBuffer, guardBuffer, clickedField[0],
				// clickedField[1], ownerBuffer); break;
			case 1: army = new FootArmy(armyIdBuffer, GameState.realms.find(realm => realm.tag === ownerBuffer),
                countBuffer, leaderBuffer, lkpBuffer, skpBuffer, clickedField, FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, guardBuffer);
			    break;
                // new heer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, mountsBuffer,
				// guardBuffer, clickedField[0], clickedField[1], ownerBuffer); break;
		}
		ownerBuffer = GUI.getArmyGeneratorBox().getOwnerField().value;
		armyIdBuffer = 0;
        GUI.getArmyGeneratorBox().getArmyNumberField().value = "0";
		countBuffer = 0;
        GUI.getArmyGeneratorBox().getCountField().value = "0";
		leaderBuffer = 0;
        GUI.getArmyGeneratorBox().getLeaderField().value = "0";
		mountsBuffer = 0;
        GUI.getArmyGeneratorBox().getMountsField().value = "0";
		lkpBuffer = 0;
        GUI.getArmyGeneratorBox().getLKPField().value = "0";
		skpBuffer = 0;
        GUI.getArmyGeneratorBox().getSKPField().value = "0";

		GameState.armies.push(army);
		switchBtnBoxTo(GUI.getButtonsBox());
		switchModeTo("none");
	} else if(worldCreationModeOnClick){
		let posi = HexFunction.positionInList(clickedField);
		if(changeFieldToType === -1){
			// checks if Field should be changed to a specific type, if not use
			// normal world creation mode on click
			if (GameState.fields[posi].type === 8 || GameState.fields[posi].type === 9) {
                GameState.fields[posi].type = 0;
			} else {
                GameState.fields[posi].type++;
			}
		} else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
            GameState.fields[posi].type = changeFieldToType;
		}
		let found = false;
		for (let i = 0; i < changedFields.length; i++) {
			if ((changedFields[i].x === GameState.fields[posi].coordinates[0]) &&
                (changedFields[i].y === GameState.fields[posi].coordinates[1])) {
				changedFields[i].type = GameState.fields[posi].type;
				found = true;
			}
		}
		if (!found) {
			changedFields.push({ "type": GameState.fields[posi].type,
                "x": GameState.fields[posi].coordinates[0],
                "y": GameState.fields[posi].coordinates[1] });
		}
	} else if(shootingModeOn){
		//for shooting the bastards
		selectedFields[1] = clickedField;
	}else {
		// Feldauswahl
		let index = -1;
		let sf = selectedFields[0];
		if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
			selectedFields = [];
		} else {
			selectedFields[0] = clickedField;
		}
		// Armeeauswahl
		restoreInfoBox();
		selectedArmyIndex = undefined;
		let possibleSelections = [];
		GameState.armies.forEach((army, index) => {
            if(army.getPosition()[0] === clickedField[0] && army.getPosition()[1] === clickedField[1]){
                possibleSelections.push(index);
                selectedArmyIndex = index;
            }});
		if (document.getElementById("btnSection") != undefined) {
			let d = GUI.getButtonsBox();
			d.removeChild(document.getElementById("btnSection"));
		}
		if (possibleSelections.length !== 0) {
			let x = document.createElement("SECTION");
			x.setAttribute("id", "btnSection")
			for (let i = 0; i < possibleSelections.length; i++) {
				let btn: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = GameState.armies[possibleSelections[i]].getErkenfaraID() + " " +
                    GameState.armies[possibleSelections[i]].owner.tag;
				let t = document.createTextNode(""+ GameState.armies[possibleSelections[i]].getErkenfaraID());
				btn.appendChild(t);
				btn.addEventListener('click', function (event) {
					let idToSearchFor = this.name.split(" ")[0];
					let ownerToSearchFor = this.name.split(" ")[1];
					for (let j = 0; j < GameState.armies.length; j++) {
						if (GameState.armies[j].getErkenfaraID() === parseInt(idToSearchFor) && 
                            GameState.armies[j].owner.tag === ownerToSearchFor) {
							selectedArmyIndex = j;
						}
					}
					updateInfoBox();
					restoreInfoBox();
					if (selectedArmyIndex !== undefined) {
						clickedMoves(GameState.armies[selectedArmyIndex]);
					}
					Drawing.drawStuff();
				});
				x.appendChild(btn);
			}
			GUI.getButtonsBox().appendChild(x);
		}
		updateInfoBox();
		if (selectedArmyIndex !== undefined) {
			clickedMoves(GameState.armies[selectedArmyIndex]);
		}
	}
}

function registerRightClick() {
	let clickedField = getClickedField();
	if(worldCreationModeOnClick){
		let posi = HexFunction.positionInList(clickedField);
		if(changeFieldToType == -1){
			// checks if Field should be changed to a specific type (then
			// rightclick is disabled)
			if (GameState.fields[posi].type === 0 || GameState.fields[posi].type === 9) {
                GameState.fields[posi].type = 8;
			} else {
                GameState.fields[posi].type--;
			}
			let found = false;
			for (let i = 0; i < changedFields.length; i++) {
				if ((changedFields[i].x == GameState.fields[posi].coordinates[0]) && 
                    (changedFields[i].y == GameState.fields[posi].coordinates[1])) {
					changedFields[i].type = GameState.fields[posi].type;
					found = true;
				}
			}
			if (!found) {
				changedFields.push({ "type": GameState.fields[posi].type, 
                    "x": GameState.fields[posi].coordinates[0], 
                    "y": GameState.fields[posi].coordinates[1] });
			}
		}
	} else if(shootingModeOn){
		
	}else {
		if(selectedArmyIndex === undefined){
			console.log("Can't move with no army selected");
		} else {
			let clickedArmy: [number, number] = [GameState.armies[selectedArmyIndex].getPosition()[0], 
                GameState.armies[selectedArmyIndex].getPosition()[1]];
			let localNeighbors = HexFunction.neighbors(clickedArmy);
			for (let i = 0; i < localNeighbors.length; i++){
				if(localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]){
				    let moveSuccessfull: boolean = true;
					if (GameState.armies[selectedArmyIndex].owner.tag === login || login === "sl") {
						try{
						    GameState.armies[selectedArmyIndex].move(i);
						} catch (e){
						    console.log(e);
						    moveSuccessfull = false;
                        }
					} else {
						console.log("Can only move your own armies.");
					}
					if (moveSuccessfull) {
						preparedEvents.push({
							type: "move", content: {
								armyId: GameState.armies[selectedArmyIndex].getErkenfaraID(),
								realm: GameState.armies[selectedArmyIndex].owner.tag,
								fromX: clickedArmy[0], fromY: clickedArmy[1], 
								toX: GameState.armies[selectedArmyIndex].getPosition()[0], 
                                toY: GameState.armies[selectedArmyIndex].getPosition()[1]
							}
						});

						let battlePossible = false;
						let participants = [];

						for (let j = 0; j < GameState.armies.length; j++) {
							let someArmy = GameState.armies[j];
							if (someArmy.getPosition()[0] === GameState.armies[selectedArmyIndex].getPosition()[0] && 
                                someArmy.getPosition()[1] === GameState.armies[selectedArmyIndex].getPosition()[1]
								&& someArmy !== GameState.armies[selectedArmyIndex]) {
								participants.push({ armyId: someArmy.getErkenfaraID(), realm: someArmy.owner.tag });
								//in case they are enemies
								if (someArmy.owner !== GameState.armies[selectedArmyIndex].owner) {
									battlePossible = true;
								}
								//MultipleArmies - even if not friendly
								//5 cases
								//1. move to create multifield
								//2. move to existing multifield
								//3. move from multi and leaving regular field
								//4. move from multi but still multifield left
								//5. move from multi to multi
							}
						}

						if (battlePossible) {
							let inserted = false;
							participants.push({
								armyId: GameState.armies[selectedArmyIndex].getErkenfaraID(),
								realm: GameState.armies[selectedArmyIndex].owner.tag
							});
							for (let j = 0; j < preparedEvents.length; j++) {
								if (preparedEvents[j].type === "battle" &&
									preparedEvents[j].content.x === GameState.armies[selectedArmyIndex].getPosition()[0] &&
									preparedEvents[j].content.y === GameState.armies[selectedArmyIndex].getPosition()[1]) {
									preparedEvents[j].content.participants = participants;
									inserted = true;
								}
							}
							if (!inserted) {
								preparedEvents.push({
									type: "battle", content: {
										participants: participants,
										x: GameState.armies[selectedArmyIndex].getPosition()[0],
                                        y: GameState.armies[selectedArmyIndex].getPosition()[1]
									}
								});
							}
						} else { //no battle -> conquer land (TODO: diplomacy goes here)
                            GameState.armies[selectedArmyIndex].conquer();
						}
					}
				}
			}
			updateInfoBox();
		}
	}
}

function getClickedField(): [number, number] {
	let x = click[0] - origin[0]; // reverse our x/y origin offset
	let y = click[1] - origin[1];
	let m = Drawing.c / (Drawing.gW * 0.5); // the inclination of the hexes upper triangle side

	let row = Math.floor(y / Drawing.gH); // get the rectangle clicked in
	let rowIsOdd = (row % 2 !== 0);
	let column = Math.floor((rowIsOdd ? ((x + 0.5 * Drawing.gW) / Drawing.gW) : (x / Drawing.gW)));

	let relY = y - (row * Drawing.gH); // compute relative position of the click in
	// respect to the rectangle
	let relX = rowIsOdd ? ((x + 0.5 * Drawing.gW) - (column * Drawing.gW)) : (x - (column * Drawing.gW));

	if (relY < (-m) * relX + Drawing.c) { // click is in upper left corner
		row--;
		if (rowIsOdd) { column--; }
	} else if (relY < m * relX - Drawing.c) { // click is in upper right corner
		row--;
		if (!rowIsOdd) { column++; }
	}
	return [column, row]; // return result
}


function mainButton() {
	toggleVisibility(GUI.getBigBox());
}


function fillEventList() {
	let eventList = GUI.getEventsTab();
	eventList.innerHTML = "";
	for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
		GameState.pendingNewEvents[i].determineEventStatus();
		eventList.appendChild(GameState.pendingNewEvents[i].makeEventListItem());
	}
}


function openTab(evt, tabName) {
	// Declare all variables
	let i, tabcontent, tablinks;

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
	if (evt != undefined && tabName !== "") {
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " active";
	}
}

function untagHitArmys(){
	for(let i = 0; i < GameState.armies.length; i++){
		if (GameState.armies[i].owner.tag === login || login === "sl"){
			GameState.armies[i].wasShotAt = false;
		}
	}
}

function init() {
	Loading.getNewDataFromServer();
	Loading.loadTurnNumber();
	Loading.loadImages(tileset);
	Drawing.setHexParts(scale);
}

init();
setInterval(function () {
	Loading.getNewDataFromServer();
}, 30000);
