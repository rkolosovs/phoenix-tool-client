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
var pendingEvents = [];

// var canvas: HTMLCanvasElement = document.getElementById('hexCanvas') as HTMLCanvasElement; // get the canvas element
// from the HTML document
// var ctx: CanvasRenderingContext2D = GUI.getContext(); // get the context of the canvas

// settings; TODO: let the user change these in game
var tileset = "mbits_painted"; // tileset name
var scrollSpeed = 0.2; // increment to scroll with each step

// var url = "http://phoenixserver.h2610265.stratoserver.net"; //put the url (or
// the IP address) for the remote game server here
var url = "http://localhost:8000"; // for local debug


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
	setHexParts(scale); // compute the scale dependant values used for map drawing
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
	let m = c / (gW * 0.5); // the inclination of the hexes upper triangle side

	let row = Math.floor(y / gH); // get the rectangle clicked in
	let rowIsOdd = (row % 2 !== 0);
	let column = Math.floor((rowIsOdd ? ((x + 0.5 * gW) / gW) : (x / gW)));

	let relY = y - (row * gH); // compute relative position of the click in
	// respect to the rectangle
	let relX = rowIsOdd ? ((x + 0.5 * gW) - (column * gW)) : (x - (column * gW));

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
	toggleVisibility(GUI.getBigBox());
}

function determineEventStatus() {
	//	console.log("determineEventStatus()");
	for (let i = 0; i < pendingEvents.length; i++) {
		let event = pendingEvents[i];
		let content = event.content;
		if (event.status === 'undetermined' || event.status === 'available' ||
			event.status === 'withheld' || event.status === 'impossible') {
			if (event.type === 'move') {
				if (armyExistsAndIsLocated(content.realm, content.armyId, content.fromX, content.fromY) &&
					!unprocessedBattleAtContainingArmy(content.realm, content.armyId, content.fromX, content.fromY) &&
					canMove(content.realm, content.armyId, content.fromX, content.fromY, content.toX, content.toY) &&
					noPendingLoadEvents(content.realm, content.armyId, content.fromX, content.fromY) &&
					noPendingMountEvents(content.realm, content.armyId, content.fromX, content.fromY)) {
					pendingEvents[i].status = 'available';
				} else if ((stillSplitEventsInFaction(content.realm) || armyExistsAndIsLocated(content.realm, content.armyId, content.fromX, content.fromY)) &&
					!unprocessedBattleAtContainingArmy(content.realm, content.armyId, content.fromX, content.fromY) &&
					canMove(content.realm, content.armyId, content.fromX, content.fromY, content.toX, content.toY) &&
					(!noPendingLoadEvents(content.realm, content.armyId, content.fromX, content.fromY) ||
						!noPendingMountEvents(content.realm, content.armyId, content.fromX, content.fromY))) {
					pendingEvents[i].status = 'withheld';
				} else if (stillSplitEventsInFaction(content.realm) || (armyExists(content.realm, content.armyId) &&
					possibleMoveOfArmyTo(content.realm, content.armyId, content.fromX, content.fromY))) {
					pendingEvents[i].status = 'withheld';
				} else {
					pendingEvents[i].status = 'impossible';
				}
			} else if (event.type === 'battle') {
				if (eachArmyExistsAndIsLocated(content.participants, content.x, content.y)) {
					pendingEvents[i].status = 'available';
				} else if (stillSplitEventsInFaction(content.realm) || (eachArmyExists(content.participants) &&
					possibleMoveOfEachArmyTo(content.participants, content.x, content.y))) {
					pendingEvents[i].status = 'withheld';
				} else {
					pendingEvents[i].status = 'impossible';
				}
			}
			else if (event.type === 'merge') {
				let army1 = GameState.armies[findArmyPlaceInList(content.fromArmy, content.realm)];
				let army2 = GameState.armies[findArmyPlaceInList(content.toArmy, content.realm)];
				if (army1 == undefined || army2 == undefined) {
					pendingEvents[i].status = 'withheld';
				}
				else if (army1.getPosition()[0] !== content.x || army1.getPosition()[1] !== content.y ||
                    army2.getPosition()[0] !== content.x || army2.getPosition()[1] !== content.y) {
					pendingEvents[i].status = 'withheld';
				} else if (army1.constructor === army2.constructor &&
					army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
					pendingEvents[i].status = 'available';
				}
				else if ((army1.constructor !== army2.constructor) ||
					((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) ||
						army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || army2 instanceof RiderArmy) &&
							army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
					pendingEvents[i].status = 'impossible';
				}
				else {
					pendingEvents[i].status = 'withheld';
				}
			}
			else if (event.type === 'transfer') {
				let army1 = GameState.armies[findArmyPlaceInList(content.fromArmy, content.realm)];
				let army2 = GameState.armies[findArmyPlaceInList(content.toArmy, content.realm)];
				if (army1 == undefined || army2 == undefined) {
					pendingEvents[i].status = 'withheld';
				}
				else if (army1.getPosition()[0] !== content.x || army1.getPosition()[1] !== content.y || 
                    army2.getPosition()[0] !== content.x || army2.getPosition()[1] !== content.y) {
					pendingEvents[i].status = 'withheld';
				} else if ((army1.constructor === army2.constructor || (content.troops === 0 && content.mounts === 0 && 
                        content.lkp === 0 && content.skp === 0)) && army1.getPosition()[0] === army2.getPosition()[0] && 
                        army1.getPosition()[1] === army2.getPosition()[1]) {
					pendingEvents[i].status = 'available';
				}
				else if (((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) || 
                        army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || 
                        army2 instanceof RiderArmy) && army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
					pendingEvents[i].status = 'impossible';
				}
				else {
					pendingEvents[i].status = 'withheld';
				}
			}
			else if (event.type === 'split') {
				let typefactor = 1;

				let army = GameState.armies[findArmyPlaceInList(content.fromArmy, content.realm)];
				if (army == undefined) {
					pendingEvents[i].status = 'withheld';
				} else {
				    let mountCount: number = 0;
				    let lkpCount: number = 0;
				    let skpCount: number = 0;
					if (army instanceof RiderArmy) {
						typefactor = 2;
					}
					else if (army instanceof Fleet) {
						typefactor = 100;
                        lkpCount = (army as Fleet).getLightCatapultCount();
                        skpCount = (army as Fleet).getHeavyCatapultCount();
					} else if (army instanceof FootArmy) {
                        mountCount = (army as FootArmy).getMountCount();
                        lkpCount = (army as FootArmy).getLightCatapultCount();
                        skpCount = (army as FootArmy).getHeavyCatapultCount();
                    }
					if (army.getPosition()[0] != content.x || army.getPosition()[1] != content.y) {
						pendingEvents[i].status = 'withheld';
					} else if (((army.getTroopCount() - content.troops) >= (100 / typefactor)) &&
						((army.getOfficerCount() - content.leaders) >= 1) &&
						((mountCount - content.mounts) >= 0) &&
						((lkpCount - content.lkp) >= 0) &&
						((skpCount - content.skp) >= 0)) {
						pendingEvents[i].status = 'available';
					}
					else {
						pendingEvents[i].status = 'impossible';
					}
				}
			}
			else if (event.type === 'mount') {
				let typefactor = 1;

				let army = GameState.armies[findArmyPlaceInList(content.fromArmy, content.realm)];
				if (army == undefined) {
					pendingEvents[i].status = 'withheld';
				} else {
					if (army instanceof RiderArmy) {
						typefactor = 2;
					}
					else if (army instanceof Fleet) {
						typefactor = 100;
					}
					if (army.getPosition()[0] != content.x || army.getPosition()[1] != content.y) {
						pendingEvents[i].status = 'withheld';
					} else if ((army instanceof FootArmy && (((army.getTroopCount() - content.troops) >= 0) &&
						((army.getOfficerCount() - content.leaders) >= 0) && (((army as FootArmy).getMountCount() - content.troops) >= 0))) ||
						(army instanceof RiderArmy && (((army.getTroopCount() - content.troops) >= 0) &&
							((army.getOfficerCount() - content.leaders) >= 0)))) {
						pendingEvents[i].status = 'available';
					} else {
						pendingEvents[i].status = 'impossible';
					}
				}
                let mountCount: number = 0;
                let lkpCount: number = 0;
                let skpCount: number = 0;
                if (army instanceof RiderArmy) {
                    typefactor = 2;
                }
                else if (army instanceof Fleet) {
                    typefactor = 100;
                    lkpCount = (army as Fleet).getLightCatapultCount();
                    skpCount = (army as Fleet).getHeavyCatapultCount();
                } else if (army instanceof FootArmy) {
                    mountCount = (army as FootArmy).getMountCount();
                    lkpCount = (army as FootArmy).getLightCatapultCount();
                    skpCount = (army as FootArmy).getHeavyCatapultCount();
                }
				if(((army.getTroopCount() - content.troops) >= (100/typefactor)) &&
				 ((army.getOfficerCount() - content.leaders) >= 1) &&
				 ((mountCount - content.mounts) >= 0) &&
				 ((lkpCount - content.lkp) >= 0) &&
				 ((skpCount - content.skp) >= 0)){
					 pendingEvents[i].status = 'available';
				 } 
				 else{
					 pendingEvents[i].status = 'impossible';
				 }
			}else if(event.type === 'shoot'){
				let shooter = GameState.armies[findArmyPlaceInList(content.armyId, content.realm)];
				let canShoot = false;

                if(shooter instanceof FootArmy || shooter instanceof Fleet){
                    canShoot = shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() >= content.LKPcount &&
                        shooter.getHeavyCatapultCount() - shooter.getLightCatapultsShot() >= content.SKPcount;
                }

				if (armyExistsAndIsLocated(shooter.owner.tag, content.armyId, content.fromX, content.fromY) && canShoot) {
					pendingEvents[i].status = 'available';
				} else if (armyExists(content.realm, content.armyId) && 
						possibleMoveOfArmyTo(shooter.owner.tag, content.armyId, content.fromX, content.fromY)) {
					pendingEvents[i].status = 'withheld';
				} else {
					pendingEvents[i].status = 'impossible';
				}
			} 
		}
	}
}

//begin of helper methods for event status determining
function stillSplitEventsInFaction(realm) {
	for (let i = 0; i < pendingEvents.length; i++) {
		let event = pendingEvents[i];
		if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') && event.type === 'split') {
			return true;
		}
	}
	return false;
}

function noPendingLoadEvents(realm, armyId, fromX, fromY) {
	if (Math.floor(armyId / 100) != 3) {
		return true;
	} else {
		for (let i = 0; i < pendingEvents.length; i++) {
			let event = pendingEvents[i];
			if ((event.status === 'withheld' || event.status === 'available') && event.type === 'move' && Math.floor(event.content.armyId / 100) !== 3 &&
				((event.content.fromX === fromX && event.content.fromY === fromY) ||
					(event.content.toX === fromX && event.content.toY === fromY))) {
				return false;
			}
		}
		return true;
	}
}

function noPendingMountEvents(realm, armyId, fromX, fromY) {
	if (Math.floor(armyId / 100) != 3) {
		for (let i = 0; i < pendingEvents.length; i++) {
			let event = pendingEvents[i];
			if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') &&
                event.type === 'mount' && Math.floor(event.content.fromArmy) === armyId &&
				(event.content.x === fromX && event.content.y === fromY)) {
				return false;
			}
		}
		return true;
	} else {
		return true;
	}
}

function eachArmyExists(armies) {
	return (armies.length > 0) && (armies.map(function (army: any) {
		return armyExists(army.realm, army.armyId);
	}).reduce(function (total, current) {
		return total && current;
	}, true));
}

function findArmyPlaceInList(armyId, owner) {
	for (let i = 0; i < GameState.armies.length; i++) {
		if (GameState.armies[i].getErkenfaraID() === armyId && GameState.armies[i].owner === owner) {
			return i;
		}
	}
	return -1;
}

function eachArmyExistsAndIsLocated(armies, x, y) {
	return (armies.length > 0) && (armies.map(function (army: any) {
		return armyExistsAndIsLocated(army.realm, army.armyId, x, y);
	}, this).reduce(function (total, current) {
		return total && current;
	}, true));
}

function possibleMoveOfEachArmyTo(armies, x, y) {
	return (armies.length > 0) && (armies.map(function (army: any) {
		return armyExistsAndIsLocated(army.realm, army.armyId, x, y) ||
			possibleMoveOfArmyTo(army.realm, army.armyId, x, y);
	}, this).reduce(function (total, current) {
		return total && current;
	}, true));
}

function armyExists(realm, id) {
	return GameState.armies.some(function (val) {
		return (val.owner.tag === realm) && (val.getErkenfaraID() === id);
	}, this);
}

function armyExistsAndIsLocated(realm, id, x, y) {
	return GameState.armies.some(function (val) {
		return (val.owner.tag === realm) &&
			(val.getErkenfaraID() === id) &&
			(val.getPosition()[0] === x) && (val.getPosition()[1] === y);
	}, this);
}

function possibleMoveOfArmyTo(realm, id, x, y) {
	return pendingEvents.some(function (pEv) {
		return (pEv.type === 'move') && (pEv.content.realm === realm) &&
			(pEv.content.armyId === id) && (pEv.status !== 'deleted' || pEv.status !== 'checked') &&
			(pEv.content.toX === x) && (pEv.content.toY === y) &&
			(canMove(realm, id, pEv.content.fromX, pEv.content.fromY, x, y));
	}, this);
}

function unprocessedBattleAtContainingArmy(realm, id, x, y) {
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
	let foundArmy = GameState.armies.find(function (army) {
		return (army.getErkenfaraID() === id) && (army.owner.tag === realm);
	}, this);
	if (foundArmy != undefined && foundArmy.getPosition()[0] === fromX && foundArmy.getPosition()[1] === fromY) {
		let adjacency: any[] = getAdjacency([fromX, fromY], [[toX, toY]]);

		if (adjacency.reduce((total, current) => (total || current), false)) {
			foundArmy.possibleMoves = [];
			let direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
            foundArmy.checkForPossibleMove(direction);
			return foundArmy.possibleMoves.length > 0;
		}
		return false;
	} else {
		return false;
	}
}
//end of helper methods for event status determining
 
function fillEventList() {
	let eventList = GUI.getEventsTab();
	eventList.innerHTML = "";
	determineEventStatus();
	for (let i = 0; i < pendingEvents.length; i++) {
		eventList.appendChild(makeEventListItem(pendingEvents[i], i));
	}
}


function makeEventListItem(event, i) {
	let eli = document.createElement("DIV");
	eli.classList.add("eventListItem");
	eli.id = "eli" + i;
	let cont = event.content;
	if (event.type === "move") {
		eli.innerHTML = "<div>Move " + cont.realm + " army " + cont.armyId + " from (" + cont.fromX + ", " + cont.fromY + ") to (" + cont.toX + ", " + cont.toY + ")</div>";
	} else if (event.type === "battle") {
		let html = "<div>Battle at (" + cont.x + ", " + cont.y + ") involving";
		let partips = cont.participants
		for (let j = 0; j < partips.length; j++) {
			html += " [" + partips[j].realm + " " + partips[j].armyId + "]";
		}
		eli.innerHTML = html + "</div>";
	} else if (event.type === "merge") {
		eli.innerHTML = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " merges with army " + cont.toArmy + " in (" + cont.x + "," + cont.y + ").</div>";
	} else if (event.type === "split") {
		// TODO: detailed explanation
		let innerHTMLString = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " splits off army " + cont.newArmy + " with ";
		if (cont.troops !== 0) {
			innerHTMLString += cont.troops + " troops, ";
		}
		if (cont.leaders !== 0) {
			innerHTMLString += cont.leaders + " leaders, ";
		}
		if (cont.mounts !== 0) {
			innerHTMLString += cont.mounts + " mounts, ";
		}
		if (cont.lkp !== 0) {
			innerHTMLString += cont.lkp + " lkp, ";
		}
		if (cont.skp !== 0) {
			innerHTMLString += cont.skp + " skp ";
		}
		innerHTMLString += "in (" + cont.x + "," + cont.y + ").</div>";
		eli.innerHTML = innerHTMLString;
	} else if (event.type === "transfer") {
		let innerHTMLString = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " transfers ";
		if (cont.troops !== 0) {
			innerHTMLString += cont.troops + " troops, ";
		}
		if (cont.leaders !== 0) {
			innerHTMLString += cont.leaders + " leaders, ";
		}
		if (cont.mounts !== 0) {
			innerHTMLString += cont.mounts + " mounts, ";
		}
		if (cont.lkp !== 0) {
			innerHTMLString += cont.lkp + " lkp, ";
		}
		if (cont.skp !== 0) {
			innerHTMLString += cont.skp + " skp ";
		}
		innerHTMLString += "to " + cont.toArmy + " in (" + cont.x + "," + cont.y + ").</div>";
		eli.innerHTML = innerHTMLString;
	} else if (event.type === "mount") {
		eli.innerHTML = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " mounts " + cont.troops + " troops, and "
			+ cont.leaders + " leaders to " + cont.newArmy + " in (" + cont.x + "," + cont.y + ").</div>";
	}else if(event.type === "shoot"){
		eli.innerHTML = "<div>"+ realms[cont.realm - 1].tag +"'s army "+cont.armyId+" shoots a Field ("+cont.toX+", "+cont.toY+") with "
		 +cont.LKPcount + " LKP and " + cont.SKPcount + " SKP.</div>";
	}
	let deleteButton: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
	deleteButton.id = "delBtn" + i;
	deleteButton.classList.add("eventListButton");
	deleteButton.classList.add("eventListDeleteButton");
	deleteButton.onclick = deleteEvent(i);
	let checkButton: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
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
		let eli = document.getElementById("eli" + num);
		let event = pendingEvents[num];
		event.status = 'deleted';
		fillEventList();
	}
	return del;
}

function checkEvent(num) {
	function check() {
		let eli = document.getElementById("eli" + num);
		let event = pendingEvents[num];
		let cont = event.content;
		if (event.type === "move") {
			let army: Army;
			for (let i = 0; i < GameState.armies.length; i++) {
				army = GameState.armies[i];
				if (army.owner.tag === cont.realm && cont.armyId === army.getErkenfaraID()) {
					break;
				}
			}
			let adjacency: boolean[] = getAdjacency([army.getPosition()[0], army.getPosition()[1]], [[cont.toX, cont.toY]]);
			adjacency.forEach((adjacent, index) => {
			    if(adjacent){
                    army.checkForPossibleMove(index);
                    army.move(index);
                }
            });

			if (!unprocessedBattleAtContainingArmy(army.owner.tag, army.getErkenfaraID(), army.getPosition()[0], army.getPosition()[1])) {
				army.conquer();
			}
			event.status = 'checked';
			fillEventList();
			Drawing.drawStuff();
		} else if (event.type === "battle") {
			let battleBox: BattleBox = GUI.getBattleBox();
			show(battleBox.getSelf());

			let partips = [];
			cont.participants.forEach(function (item) {
				let a = GameState.armies.find(function (candidate) {
					return (item.realm === candidate.owner.tag) && (item.armyId === candidate.getErkenfaraID());
				});
				partips.push(a);
			});

			battleBox.newBattle(partips, [cont.x, cont.y]);
            battleBox.getAttackDiceRoll().onchange = function () { battleBox.updateDisplay() };
            battleBox.getDefenseDiceRoll().onchange = function () { battleBox.updateDisplay() };
			let battleButton: HTMLButtonElement = GUI.getBattleBox().getBattleButton();
			battleButton.onclick = function () {
                battleBox.battleHandler.resolve(battleBox.getAttackDiceRoll(), battleBox.getDefenseDiceRoll());
				hide(battleBox.getSelf());
				event.status = 'checked';
				fillEventList();
				Drawing.drawStuff();
			};
			battleButton.disabled = true;
			battleButton.style.cursor = "not-allowed";
			GUI.getBattleBox().getCloseBattleButton().onclick = function () {
				hide(battleBox.getSelf());
			};
		} else if (event.type === "split") {
			let armyFromPlaceInList = -1;
			let armyFromId = cont.fromArmy;
			let newArmyId = cont.newArmy;
			let realm = cont.realm;
			let toSplit = cont.troops;
			let leadersToSplit = cont.leaders;
			let mountsToSplit = cont.mounts;
			let lkpToSplit = cont.lkp;
			let skpToSplit = cont.skp;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].getErkenfaraID() === armyFromId && GameState.armies[i].owner === realm) {
					armyFromPlaceInList = i;
				}
			}
			if (armyFromPlaceInList >= 0) {
			    let armyToSplitFrom: Army = GameState.armies[armyFromPlaceInList];
                armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - toSplit);
                armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - leadersToSplit);
				if (armyToSplitFrom instanceof FootArmy) {
                    armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - mountsToSplit);
				}
				if (armyToSplitFrom instanceof FootArmy || armyToSplitFrom instanceof Fleet) {
                    armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - lkpToSplit);
                    armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - skpToSplit);
				}
				let army;
				if (Math.floor(newArmyId / 100) === 1) {
					army = new FootArmy(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit,
                        armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                        // new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false,
						// GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
				}
				else if (Math.floor(newArmyId / 100) === 2) {
					army = new RiderArmy(newArmyId, realm, toSplit, leadersToSplit, armyToSplitFrom.getPosition(),
                        armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                        // new reiterHeer(newArmyId, toSplit, leadersToSplit, false, GameState.armies[armyFromPlaceInList].x,
						// GameState.armies[armyFromPlaceInList].y, realm);
				}
				else if (Math.floor(newArmyId / 100) === 3) {
					army = new Fleet(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit,
                        armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints());
                        // new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false,
						// GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
				}
				GameState.armies.push(army);
			}
			event.status = 'checked';
			fillEventList();
			Drawing.drawStuff();
		} else if (event.type === "merge") {
			let armyFromPlaceInList = -1;
			let armyToPlaceInList = -1;
			let armyFromId = cont.fromArmy;
			let armyToId = cont.toArmy;
			let realm = cont.realm;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner.tag == realm) {
					armyFromPlaceInList = i;
				}
				else if (GameState.armies[i].getErkenfaraID() == armyToId && GameState.armies[i].owner.tag == realm) {
					armyToPlaceInList = i;
				}
			}
			if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
				selectedArmyIndex = armyFromPlaceInList;
				mergeSelectedArmy(armyToPlaceInList);
				preparedEvents.pop();
			}
			event.status = 'checked';
			fillEventList();
			Drawing.drawStuff();
			selectedArmyIndex = undefined;
		} else if (event.type === "transfer") {
			let armyFromPlaceInList = -1;
			let armyToPlaceInList = -1;
			let armyFromId = cont.fromArmy;
			let armyToId = cont.toArmy;
			let realm = cont.realm;
			let toSplit = cont.troops;
			let leadersToSplit = cont.leaders;
			let mountsToSplit = cont.mounts;
			let lkpToSplit = cont.lkp;
			let skpToSplit = cont.skp;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].getErkenfaraID() === armyFromId && GameState.armies[i].owner.tag === realm) {
					armyFromPlaceInList = i;
				}
				else if (GameState.armies[i].getErkenfaraID() === armyToId && GameState.armies[i].owner.tag === realm) {
					armyToPlaceInList = i;
				}
			}
			if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
			    let armyToTransferFrom: Army = GameState.armies[armyFromPlaceInList];
                let armyToTransferTo: Army = GameState.armies[armyToPlaceInList];
                armyToTransferFrom.setTroopCount(armyToTransferFrom.getTroopCount() - toSplit);
                armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + toSplit);
                armyToTransferFrom.setOfficerCount(armyToTransferFrom.getOfficerCount() - leadersToSplit);
                armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToSplit);
				if (armyToTransferFrom instanceof FootArmy) {
                    (armyToTransferFrom as FootArmy).setMountCount((armyToTransferFrom as FootArmy).getMountCount() - mountsToSplit);
                    (armyToTransferTo as FootArmy).setMountCount((armyToTransferTo as FootArmy).getMountCount() + mountsToSplit);
				}
				if (armyToTransferFrom instanceof FootArmy || armyToTransferFrom instanceof Fleet) {
                    armyToTransferFrom.setLightCatapultCount(armyToTransferFrom.getLightCatapultCount() - lkpToSplit);
                    armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToSplit);
                    armyToTransferFrom.setHeavyCatapultCount(armyToTransferFrom.getHeavyCatapultCount() - skpToSplit);
                    armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToSplit);
				}
				if (leadersToSplit > 0 &&
					GameState.armies[armyFromPlaceInList].getMovePoints() < GameState.armies[armyFromPlaceInList].getMaxMovePoints()) {
					GameState.armies[armyToPlaceInList].setMovePoints(0);
				} else if (GameState.armies[armyFromPlaceInList].getMovePoints() < GameState.armies[armyToPlaceInList].getMovePoints()) {
					GameState.armies[armyToPlaceInList].setMovePoints(GameState.armies[armyFromPlaceInList].getMovePoints());
				}
				if (GameState.armies[armyFromPlaceInList].getHeightPoints() < GameState.armies[armyToPlaceInList].getHeightPoints()) {
					GameState.armies[armyToPlaceInList].setHeightPoints(GameState.armies[armyFromPlaceInList].getHeightPoints());
				}
			}
			event.status = 'checked';
			fillEventList();
			Drawing.drawStuff();
		} else if (event.type === "mount") {
			console.log("this is a mount event");
			let armyFromPlaceInList = -1;
			let armyFromId = cont.fromArmy;
			let newArmyId = cont.newArmy;
			let realm = cont.realm;
			let toSplit = cont.troops;
			let leadersToSplit = cont.leaders;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner == realm) {
					armyFromPlaceInList = i;
				}
			}
			console.log("place: " + armyFromPlaceInList);
			if (armyFromPlaceInList >= 0) {
				if (GameState.armies[armyFromPlaceInList] instanceof FootArmy) {
					mountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
					event.status = 'checked';
				} else if (GameState.armies[armyFromPlaceInList] instanceof RiderArmy) {
					unMountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
					event.status = 'checked';
				}
			}
			fillEventList();
			Drawing.drawStuff();
		} else if (event.type === "shoot") {
			let shootBox: ShootingBigBox = GUI.getShootingBigBox();
			show(shootBox.getSelf());

			shootBox.getShooterTitleText().innerHTML = cont.armyId + ", " + realms[cont.realm - 1].tag;;
			shootBox.getAttackersLKPText().innerHTML = cont.LKPcount;
            shootBox.getAttackersSKPText().innerHTML = cont.SKPcount;
            shootBox.getTargetText().innerHTML = cont.target;
            shootBox.getXTargetText().innerHTML = cont.toX;
            shootBox.getYTargetText().innerHTML = cont.toY;

			let shootButton = shootBox.getRangedBattleButton();
			shootButton.onclick = function(){
				let shooter;
				let lkpRolls = [];
				let skpRolls = [];
				for(let i = 0; i < GameState.armies.length; i++){
					if(GameState.armies[i].getErkenfaraID() === cont.armyId && GameState.armies[i].owner === cont.realm)
					shooter = GameState.armies[i];
				}
				for(let i = 0; i < 10; i++){//creating the dice roll array
					let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
					let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
					if(!isNaN(currentRollLKP) && currentRollLKP !== 0){
						for(let j = 0; j < currentRollLKP; j++){
							lkpRolls.push(i);
						}
					}
					if(!isNaN(currentRollSKP) && currentRollSKP !== 0){
						for(let j = 0; j < currentRollSKP; j++){
							skpRolls.push(i);
						}
					}
				}
				//TODO check target field

				if(lkpRolls.length < cont.LKPcount){
					window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
					return false;
				}else if(skpRolls.length < cont.SKPcount){
					window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
					return false;
				}else if(lkpRolls.length > cont.LKPcount){
					window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
					return false;
				}else if(skpRolls.length > cont.SKPcount){
					window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
					return false;
				}else{
					fernkampf(lkpRolls, skpRolls, shooter, cont.target, [cont.toX, cont.toY], null);// TODO chars
					hide(shootBox.getSelf());
					event.status = 'checked';
					fillEventList();
					Drawing.drawStuff();
					return true;
				}
			};

			shootBox.getCloseRangedBattleButton().onclick = function(){
				hide(shootBox.getSelf());
			};
			fillEventList();
			//sendCheckEvent(event.pk, event.type);
			Drawing.drawStuff();
		}
	}
	return check;
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
	setHexParts(scale);
}

init();
setInterval(function () {
	Loading.getNewDataFromServer();
}, 30000);
