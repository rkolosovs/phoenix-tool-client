'use strict';
//constants
const SQRT3 = Math.sqrt(3); //about 1.732050808...
const SIN60 = 0.5 * SQRT3; //about 0.8660254037...
const OFFICER_RP = 100;
const SHIP_RP = 100;
const GUARD_RP_MULT = 3;
const LIGHT_WS_RP = 1000;
const HEAVY_WS_RP = 2000;
const SHIP_TRANSPORT_CAPACITY = 100;
const FOOTMAN_RP = 1;
const RIDER_RP = 2;
const LIGHT_CATA_RP = 1000;
const HEAVY_CATA_RP = 2000;
const MOUNT_RP = 1;
const FOOTMAN_BP = 0.1;
const MOUNT_BP = 0.1;
const RIDER_BP = 0.2;
const SHIP_BP = 10;
const LIGHT_CATA_BP = 200;
const HEAVY_CATA_BP = 400;
const LIGHT_WS_BP = 200;
const HEAVY_WS_BP = 400;
var Direction;
(function (Direction) {
    Direction[Direction["NW"] = 0] = "NW";
    Direction[Direction["NE"] = 1] = "NE";
    Direction[Direction["E"] = 2] = "E";
    Direction[Direction["SE"] = 3] = "SE";
    Direction[Direction["SW"] = 4] = "SW";
    Direction[Direction["W"] = 5] = "W"; //West
})(Direction || (Direction = {}));
var selectedFields = []; // list of fields to be highlighted
var selectedArmyIndex; // index of the currently selected army in the listOfArmies
var listOfArmies = [];
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
GUI.getCanvas().addEventListener('mousedown', function (event) {
    if (event.button === 0) {
        leftMousePressed = true;
        clickX = event.pageX; // record the x coordinate of the mouse when it
        // was clicked
        clickY = event.pageY; // record the y coordinate of the mouse when it
        // was clicked
    }
    else if (event.button === 2) {
        rightMousePressed = true;
        clickX = event.pageX; // record the x coordinate of the mouse when it
        // was clicked
        clickY = event.pageY; // record the y coordinate of the mouse when it
        // was clicked
    }
    drawStuff();
}, true);
document.addEventListener('mouseup', function (event) {
    if (leftMousePressed && event.button === 0) {
        if (isDragging) {
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
    }
    else if (rightMousePressed && event.button === 2) {
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
}, true);
GUI.getCanvas().addEventListener('mousemove', function (event) {
    if (leftMousePressed === true) {
        isDragging = true; // for later click detection; no click if mouse was previously dragged
        moveX = event.pageX - clickX; // compute the x offset from dragged mouse
        moveY = event.pageY - clickY; // compute the y offset from dragged mouse
        drawStuff();
    }
}, true);
GUI.getCanvas().addEventListener('wheel', function (event) {
    let deltaY = event.deltaY; // get amount scrolled
    let mouseX = event.pageX; // get current mouse position
    let mouseY = event.pageY;
    let posX = (mouseX - originX) / scale; // get the tile the mouse is
    // currently in (and the position in
    // the tile)
    let posY = (mouseY - originY) / scale;
    if (deltaY < 0) {
        scale *= 1 + scrollSpeed;
    }
    else {
        scale *= 1 - scrollSpeed;
    }
    setHexParts(scale); // compute the scale dependant values used for map
    // drawing
    let newPosX = posX * scale; // compute the new distance of mouse from origin
    let newPosY = posY * scale;
    originX = mouseX - newPosX; // move origin so that the tile stays the same
    // with the new scaling
    originY = mouseY - newPosY;
    drawStuff();
}, true);
// TODO: implement scrolling with keyboard (if desired)
// window.addEventListener('keydown', function (event) {
// });
// window.addEventListener('keyup', function (event) {
// });
function registerLeftClick() {
    let clickedField = getClickedField(); // get selected field
    console.log(clickedField);
    // If mount or unmount is activated, cancel it.
    if (armyWithNextClick) {
        switch (Math.floor(armyIdBuffer / 100)) {
            // TODO: man soll garde erstellen können
            case 3:
                let army = new seeHeer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, guardBuffer, clickedField[0], clickedField[1], ownerBuffer);
                break;
            case 2:
                let army = new reiterHeer(armyIdBuffer, countBuffer, leaderBuffer, guardBuffer, clickedField[0], clickedField[1], ownerBuffer);
                break;
            case 1:
                let army = new heer(armyIdBuffer, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, mountsBuffer, guardBuffer, clickedField[0], clickedField[1], ownerBuffer);
                break;
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
        listOfArmies.push(army);
        switchBtnBoxTo("buttonsBox");
        switchModeTo("none");
    }
    else if (worldCreationModeOnClick) {
        let posi = positionInList(clickedField[0], clickedField[1]);
        if (changeFieldToType == -1) {
            // checks if Field should be changed to a specific type, if not use
            // normal world creation mode on click
            if (fields[posi].type == 8 || fields[posi].type == 9) {
                fields[posi].type = 0;
            }
            else {
                fields[posi].type++;
            }
        }
        else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
            fields[posi].type = changeFieldToType;
        }
        let found = false;
        for (let i = 0; i < changedFields.length; i++) {
            if ((changedFields[i].x === fields[posi].x) && (changedFields[i].y === fields[posi].y)) {
                changedFields[i].type = fields[posi].type;
                found = true;
            }
        }
        if (!found) {
            changedFields.push({ "type": fields[posi].type, "x": fields[posi].x, "y": fields[posi].y });
        }
        console.log(changedFields);
    }
    else if (shootingModeOn) {
        //for shooting the bastards
        selectedFields[1] = clickedField;
    }
    else {
        // Feldauswahl
        let index = -1;
        let sf = selectedFields[0];
        if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
            selectedFields = [];
        }
        else {
            selectedFields[0] = clickedField;
        }
        // Armeeauswahl
        restoreInfoBox();
        selectedArmyIndex = undefined;
        let possibleSelections = [];
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].x == clickedField[0] && listOfArmies[i].y == clickedField[1]) {
                possibleSelections.push(i);
                selectedArmyIndex = i;
            }
        }
        if (document.getElementById("btnSection") != undefined) {
            let d = GUI.getButtonsBox();
            d.removeChild(document.getElementById("btnSection"));
        }
        if (possibleSelections.length !== 0) {
            let x = document.createElement("SECTION");
            x.setAttribute("id", "btnSection");
            for (let i = 0; i < possibleSelections.length; i++) {
                let btn = document.createElement("BUTTON");
                btn.setAttribute("class", "fixedPrettyButton");
                btn.name = listOfArmies[possibleSelections[i]].armyId + " " + listOfArmies[possibleSelections[i]].owner;
                let t = document.createTextNode(listOfArmies[possibleSelections[i]].armyId);
                btn.appendChild(t);
                btn.addEventListener('click', function (event) {
                    let idToSearchFor = this.name.split(" ")[0];
                    let ownerToSearchFor = this.name.split(" ")[1];
                    for (let j = 0; j < listOfArmies.length; j++) {
                        if (listOfArmies[j].armyId == idToSearchFor && listOfArmies[j].owner == ownerToSearchFor) {
                            selectedArmyIndex = j;
                        }
                    }
                    updateInfoBox();
                    restoreInfoBox();
                    console.log(selectedArmyIndex);
                    if (selectedArmyIndex !== undefined) {
                        clickedMoves(listOfArmies[selectedArmyIndex]);
                    }
                    drawStuff();
                });
                x.appendChild(btn);
            }
            GUI.getButtonsBox().appendChild(x);
        }
        updateInfoBox();
        if (selectedArmyIndex !== undefined) {
            clickedMoves(listOfArmies[selectedArmyIndex]);
        }
    }
}
function registerRightClick() {
    let clickedField = getClickedField();
    console.log(clickedField);
    if (worldCreationModeOnClick) {
        let posi = positionInList(clickedField[0], clickedField[1]);
        if (changeFieldToType == -1) {
            // checks if Field should be changed to a specific type (then
            // rightclick is disabled)
            if (fields[posi].type === 0 || fields[posi].type === 9) {
                fields[posi].type = 8;
            }
            else {
                fields[posi].type--;
            }
            let found = false;
            for (let i = 0; i < changedFields.length; i++) {
                if ((changedFields[i].x == fields[posi].x) && (changedFields[i].y == fields[posi].y)) {
                    changedFields[i].type = fields[posi].type;
                    found = true;
                }
            }
            if (!found) {
                changedFields.push({ "type": fields[posi].type, "x": fields[posi].x, "y": fields[posi].y });
            }
            console.log(changedFields);
        }
    }
    else if (shootingModeOn) {
    }
    else {
        if (selectedArmyIndex === undefined) {
            console.log("Can't move with no army selected");
        }
        else {
            let clickedArmyX = listOfArmies[selectedArmyIndex].x;
            let clickedArmyY = listOfArmies[selectedArmyIndex].y;
            let localNeighbors = neighbors(clickedArmyX, clickedArmyY);
            for (let i = 0; i < localNeighbors.length; i++) {
                if (localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]) {
                    let out;
                    if (listOfArmies[selectedArmyIndex].ownerTag() === login || login === "sl") {
                        out = move(listOfArmies[selectedArmyIndex], i);
                        console.log(out);
                    }
                    else {
                        out = "Can only move your own armies.";
                    }
                    if (out === "ok") {
                        preparedEvents.push({
                            type: "move", content: {
                                armyId: listOfArmies[selectedArmyIndex].armyId,
                                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                                fromX: clickedArmyX, fromY: clickedArmyY,
                                toX: listOfArmies[selectedArmyIndex].x, toY: listOfArmies[selectedArmyIndex].y
                            }
                        });
                        let battlePossible = false;
                        let participants = [];
                        for (let j = 0; j < listOfArmies.length; j++) {
                            let someArmy = listOfArmies[j];
                            if (someArmy.x === listOfArmies[selectedArmyIndex].x && someArmy.y === listOfArmies[selectedArmyIndex].y
                                && someArmy !== listOfArmies[selectedArmyIndex]) {
                                participants.push({ armyId: someArmy.armyId, realm: someArmy.ownerTag() });
                                //in case they are enemies
                                if (someArmy.owner !== listOfArmies[selectedArmyIndex].owner) {
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
                                armyId: listOfArmies[selectedArmyIndex].armyId,
                                realm: listOfArmies[selectedArmyIndex].ownerTag()
                            });
                            for (let j = 0; j < preparedEvents.length; j++) {
                                if (preparedEvents[j].type === "battle" &&
                                    preparedEvents[j].content.x === listOfArmies[selectedArmyIndex].x &&
                                    preparedEvents[j].content.y === listOfArmies[selectedArmyIndex].y) {
                                    preparedEvents[j].content.participants = participants;
                                    inserted = true;
                                }
                            }
                            if (!inserted) {
                                preparedEvents.push({
                                    type: "battle", content: {
                                        participants: participants,
                                        x: listOfArmies[selectedArmyIndex].x, y: listOfArmies[selectedArmyIndex].y
                                    }
                                });
                            }
                        }
                        else {
                            conquer(listOfArmies[selectedArmyIndex]);
                        }
                    }
                    else {
                        alert(out);
                    }
                }
            }
            updateInfoBox();
        }
    }
}
function getClickedField() {
    let x = clickX - originX; // reverse our x/y origin offset
    let y = clickY - originY;
    let m = c / (gW * 0.5); // the inclination of the hexes upper triangle side
    let row = Math.floor(y / gH); // get the rectangle clicked in
    let rowIsOdd = (row % 2 !== 0);
    let column = Math.floor((rowIsOdd ? ((x + 0.5 * gW) / gW) : (x / gW)));
    let relY = y - (row * gH); // compute relative position of the click in
    // respect to the rectangle
    let relX = rowIsOdd ? ((x + 0.5 * gW) - (column * gW)) : (x - (column * gW));
    if (relY < (-m) * relX + c) {
        row--;
        if (rowIsOdd) {
            column--;
        }
    }
    else if (relY < m * relX - c) {
        row--;
        if (!rowIsOdd) {
            column++;
        }
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
                }
                else if ((stillSplitEventsInFaction(content.realm) || armyExistsAndIsLocated(content.realm, content.armyId, content.fromX, content.fromY)) &&
                    !unprocessedBattleAtContainingArmy(content.realm, content.armyId, content.fromX, content.fromY) &&
                    canMove(content.realm, content.armyId, content.fromX, content.fromY, content.toX, content.toY) &&
                    (!noPendingLoadEvents(content.realm, content.armyId, content.fromX, content.fromY) ||
                        !noPendingMountEvents(content.realm, content.armyId, content.fromX, content.fromY))) {
                    pendingEvents[i].status = 'withheld';
                }
                else if (stillSplitEventsInFaction(content.realm) || (armyExists(content.realm, content.armyId) &&
                    possibleMoveOfArmyTo(content.realm, content.armyId, content.fromX, content.fromY))) {
                    pendingEvents[i].status = 'withheld';
                }
                else {
                    pendingEvents[i].status = 'impossible';
                }
            }
            else if (event.type === 'battle') {
                if (eachArmyExistsAndIsLocated(content.participants, content.x, content.y)) {
                    pendingEvents[i].status = 'available';
                }
                else if (stillSplitEventsInFaction(content.realm) || (eachArmyExists(content.participants) &&
                    possibleMoveOfEachArmyTo(content.participants, content.x, content.y))) {
                    pendingEvents[i].status = 'withheld';
                }
                else {
                    pendingEvents[i].status = 'impossible';
                }
            }
            else if (event.type === 'merge') {
                let army1 = listOfArmies[findArmyPlaceInList(content.fromArmy, content.realm)];
                let army2 = listOfArmies[findArmyPlaceInList(content.toArmy, content.realm)];
                if (army1 == undefined || army2 == undefined) {
                    pendingEvents[i].status = 'withheld';
                }
                else if (army1.x !== content.x || army1.y !== content.y || army2.x !== content.x || army2.y !== content.y) {
                    pendingEvents[i].status = 'withheld';
                }
                else if (army1.armyType() === army2.armyType() &&
                    army1.x === army2.x && army1.y === army2.y) {
                    pendingEvents[i].status = 'available';
                }
                else if ((army1.armyType() !== army2.armyType()) ||
                    ((((army1.armyType() === 1 || army1.armyType() === 2) && army1.remainingMovePoints < 3) ||
                        army1.armyType() === 3 && army1.remainingMovePoints < 5) && (((army2.armyType() === 1 || army2.armyType() === 2) &&
                        army2.remainingMovePoints < 3) || army2.armyType() === 3 && army2.remainingMovePoints < 5))) {
                    pendingEvents[i].status = 'impossible';
                }
                else {
                    pendingEvents[i].status = 'withheld';
                }
            }
            else if (event.type === 'transfer') {
                let army1 = listOfArmies[findArmyPlaceInList(content.fromArmy, content.realm)];
                let army2 = listOfArmies[findArmyPlaceInList(content.toArmy, content.realm)];
                if (army1 == undefined || army2 == undefined) {
                    pendingEvents[i].status = 'withheld';
                }
                else if (army1.x !== content.x || army1.y !== content.y || army2.x !== content.x || army2.y !== content.y) {
                    pendingEvents[i].status = 'withheld';
                }
                else if ((army1.armyType() == army2.armyType() || (content.troops === 0 && content.mounts === 0 && content.lkp === 0 && content.skp === 0))
                    && army1.x === army2.x && army1.y === army2.y) {
                    pendingEvents[i].status = 'available';
                }
                else if (((((army1.armyType() == 1 || army1.armyType() == 2) && army1.remainingMovePoints < 3) || army1.armyType() == 3 &&
                    army1.remainingMovePoints < 5) && (((army2.armyType() == 1 || army2.armyType() == 2) &&
                    army2.remainingMovePoints < 3) || army2.armyType() == 3 && army2.remainingMovePoints < 5))) {
                    pendingEvents[i].status = 'impossible';
                }
                else {
                    pendingEvents[i].status = 'withheld';
                }
            }
            else if (event.type === 'split') {
                let typefactor = 1;
                let army = listOfArmies[findArmyPlaceInList(content.fromArmy, content.realm)];
                if (army == undefined) {
                    pendingEvents[i].status = 'withheld';
                }
                else {
                    if (army.armyType() === 2) {
                        typefactor = 2;
                    }
                    else if (army.armyType() === 3) {
                        typefactor = 100;
                    }
                    console.log(army.count - content.troops);
                    if (army.x != content.x || army.y != content.y) {
                        pendingEvents[i].status = 'withheld';
                    }
                    else if (((army.count - content.troops) >= (100 / typefactor)) &&
                        ((army.leaders - content.leaders) >= 1) &&
                        ((army.mounts - content.mounts) >= 0) &&
                        ((army.lkp - content.lkp) >= 0) &&
                        ((army.skp - content.skp) >= 0)) {
                        pendingEvents[i].status = 'available';
                    }
                    else {
                        pendingEvents[i].status = 'impossible';
                    }
                }
            }
            else if (event.type === 'mount') {
                let typefactor = 1;
                let army = listOfArmies[findArmyPlaceInList(content.fromArmy, content.realm)];
                if (army == undefined) {
                    pendingEvents[i].status = 'withheld';
                }
                else {
                    if (army.armyType() === 2) {
                        typefactor = 2;
                    }
                    else if (army.armyType() === 3) {
                        typefactor = 100;
                    }
                    console.log(army.count + " - " + content.troops);
                    if (army.x != content.x || army.y != content.y) {
                        pendingEvents[i].status = 'withheld';
                    }
                    else if ((army.armyType() === 1 && (((army.count - content.troops) >= 0) &&
                        ((army.leaders - content.leaders) >= 0) && ((army.mounts - content.troops) >= 0))) ||
                        (army.armyType() === 2 && (((army.count - content.troops) >= 0) &&
                            ((army.leaders - content.leaders) >= 0)))) {
                        console.log("Status should be available!");
                        pendingEvents[i].status = 'available';
                    }
                    else {
                        pendingEvents[i].status = 'impossible';
                    }
                }
                //console.log(army.count - content.troops);
                if (((army.count - content.troops) >= (100 / typefactor)) &&
                    ((army.leaders - content.leaders) >= 1) &&
                    ((army.mounts - content.mounts) >= 0) &&
                    ((army.lkp - content.lkp) >= 0) &&
                    ((army.skp - content.skp) >= 0)) {
                    pendingEvents[i].status = 'available';
                }
                else {
                    pendingEvents[i].status = 'impossible';
                }
            }
            else if (event.type === 'shoot') {
                let shooter = listOfArmies[findArmyPlaceInList(content.armyId, content.realm)];
                let canShoot = true;
                if (shooter.lkp - shooter.LKPShotThisTurn < content.LKPcount) {
                    canShoot = false;
                }
                if (shooter.skp - shooter.SKPShotThisTurn < content.SKPcount) {
                    canShoot = false;
                }
                if (armyExistsAndIsLocated(shooter.ownerTag(), content.armyId, content.fromX, content.fromY) && canShoot) {
                    pendingEvents[i].status = 'available';
                }
                else if (armyExists(content.realm, content.armyId) &&
                    possibleMoveOfArmyTo(shooter.ownerTag(), content.armyId, content.fromX, content.fromY)) {
                    pendingEvents[i].status = 'withheld';
                }
                else {
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
    }
    else {
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
            if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') && event.type === 'mount' && Math.floor(event.content.fromArmy) === armyId &&
                (event.content.x === fromX && event.content.y === fromY)) {
                return false;
            }
        }
        return true;
    }
    else {
        return true;
    }
}
function eachArmyExists(armies) {
    //	console.log("eachArmyExits("+armies+")");
    return (armies.length > 0) && (armies.map(function (army) {
        return armyExists(army.realm, army.armyId);
    }).reduce(function (total, current) {
        return total && current;
    }, true));
}
function findArmyPlaceInList(armyId, owner) {
    for (let i = 0; i < listOfArmies.length; i++) {
        if (listOfArmies[i].armyId === armyId && listOfArmies[i].owner === owner) {
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
    return listOfArmies.some(function (val) {
        return (val.ownerTag() === realm) && (val.armyId === id);
    }, this);
}
function armyExistsAndIsLocated(realm, id, x, y) {
    //	console.log("armyExistsAndIsLocated("+realm+", "+id+", "+x+", "+y+")");
    return listOfArmies.some(function (val) {
        return (val.ownerTag() === realm) &&
            (val.armyId === id) &&
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
    let foundArmy = listOfArmies.find(function (army) {
        return (army.armyId === id) && (army.ownerTag() === realm);
    }, this);
    if (foundArmy != undefined && foundArmy.x === fromX && foundArmy.y === fromY) {
        let adjacency = getAdjacency([fromX, fromY], [[toX, toY]]);
        if (adjacency.reduce((total, current) => (total || current), false)) {
            foundArmy.possibleMoves = [];
            let direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
            moveToList(foundArmy, direction);
            return foundArmy.possibleMoves.length > 0;
        }
        //		let origin = new showHex(fromX, fromY);
        //        let destination = new showHex(toX, toY);
        //		let streetPresent = buildings.some(function(building){
        //			return (building.type === 8) &&
        //				(((building.firstX == fromX && building.firstY == fromY) && (building.secondX == toX && building.secondY == toY)) ||
        //					((building.secondX == toX && building.secondY == toY) && (building.firstX == fromX && building.firstY == fromY)));
        //		});
        //		let heightDifference = Math.abs((origin.height() - destination.height()));
        //		//TODO: This is missing harbors
        //		let enoughHeightPoints =  (foundArmy.remainingHeightPoints >= 1) &&
        //			((heightDifference <= 2 && streetPresent) || (heightDifference <= 1));
        //		//TODO: This is missing basically everything. Now the movement points are set serverside and no longer to high so this should work or not be here.
        //		let enoughMovePoints = (foundArmy.remainingMovePoints >= 7);
        //		return enoughHeightPoints && enoughMovePoints;
    }
    else {
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
    }
    else if (event.type === "battle") {
        let html = "<div>Battle at (" + cont.x + ", " + cont.y + ") involving";
        let partips = cont.participants;
        for (let j = 0; j < partips.length; j++) {
            html += " [" + partips[j].realm + " " + partips[j].armyId + "]";
        }
        eli.innerHTML = html + "</div>";
    }
    else if (event.type === "merge") {
        eli.innerHTML = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " merges with army " + cont.toArmy + " in (" + cont.x + "," + cont.y + ").</div>";
    }
    else if (event.type === "split") {
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
    }
    else if (event.type === "transfer") {
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
    }
    else if (event.type === "mount") {
        eli.innerHTML = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.fromArmy + " mounts " + cont.troops + " troops, and "
            + cont.leaders + " leaders to " + cont.newArmy + " in (" + cont.x + "," + cont.y + ").</div>";
    }
    else if (event.type === "shoot") {
        eli.innerHTML = "<div>" + realms[cont.realm - 1].tag + "'s army " + cont.armyId + " shoots a Field (" + cont.toX + ", " + cont.toY + ") with "
            + cont.LKPcount + " LKP and " + cont.SKPcount + " SKP.</div>";
    }
    let deleteButton = document.createElement("BUTTON");
    deleteButton.id = "delBtn" + i;
    deleteButton.classList.add("eventListButton");
    deleteButton.classList.add("eventListDeleteButton");
    deleteButton.onclick = deleteEvent(i);
    let checkButton = document.createElement("BUTTON");
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
    }
    else if (event.status === 'deleted') {
        eli.classList.add("deletedELI");
        deleteButton.disabled = true;
        checkButton.disabled = true;
    }
    else if (event.status === 'impossible') {
        eli.classList.add("impossibleELI");
        checkButton.disabled = true;
    }
    else if (event.status === 'withheld') {
        eli.classList.add("withheldELI");
        checkButton.disabled = true;
    }
    else if (event.status === 'available') {
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
            let army;
            for (let i = 0; i < listOfArmies.length; i++) {
                army = listOfArmies[i];
                if (army.ownerTag() === cont.realm && cont.armyId === army.armyId) {
                    break;
                }
            }
            let adjacency = getAdjacency([army.x, army.y], [[cont.toX, cont.toY]]);
            if (adjacency[0] === 1) {
                moveToList(army, 1);
                move(army, 1); //move to ne
            }
            else if (adjacency[1] === 1) {
                moveToList(army, 2);
                move(army, 2); //move to e
            }
            else if (adjacency[2] === 1) {
                moveToList(army, 3);
                move(army, 3); //move to se
            }
            else if (adjacency[3] === 1) {
                moveToList(army, 4);
                move(army, 4); //move to sw
            }
            else if (adjacency[4] === 1) {
                moveToList(army, 5);
                move(army, 5); //move to w
            }
            else if (adjacency[5] === 1) {
                moveToList(army, 0);
                move(army, 0); //move to nw
            }
            if (!unprocessedBattleAtContainingArmy(army.ownerTag(), army.armyId, army.x, army.y)) {
                conquer(army);
            }
            event.status = 'checked';
            fillEventList();
            drawStuff();
        }
        else if (event.type === "battle") {
            let battleBox = GUI.getBattleBox().getSelf();
            show(battleBox);
            let partips = [];
            cont.participants.forEach(function (item) {
                let a = listOfArmies.find(function (candidate) {
                    return (item.realm === candidate.ownerTag()) && (item.armyId === candidate.armyId);
                });
                partips.push(a);
            });
            let battle = new battleHandler(partips, cont.x, cont.y);
            GUI.getBattleBox().getAttackDiceRoll().onchange = function () { battle.updateDisplay(); };
            GUI.getBattleBox().getDefenseDiceRoll().onchange = function () { battle.updateDisplay(); };
            let battleButton = GUI.getBattleBox().getBattleButton();
            battleButton.onclick = function () {
                battle.resolve();
                hide(battleBox);
                event.status = 'checked';
                fillEventList();
                drawStuff();
            };
            battleButton.disabled = true;
            battleButton.style.cursor = "not-allowed";
            GUI.getBattleBox().getCloseBattleButton().onclick = function () {
                hide(battleBox);
            };
            battle.updateDisplay();
        }
        else if (event.type === "split") {
            console.log("this is a split event");
            let armyFromPlaceInList = -1;
            let armyFromId = cont.fromArmy;
            let newArmyId = cont.newArmy;
            let realm = cont.realm;
            let toSplit = cont.troops;
            let leadersToSplit = cont.leaders;
            let mountsToSplit = cont.mounts;
            let lkpToSplit = cont.lkp;
            let skpToSplit = cont.skp;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId === armyFromId && listOfArmies[i].owner === realm) {
                    armyFromPlaceInList = i;
                }
            }
            if (armyFromPlaceInList >= 0) {
                listOfArmies[armyFromPlaceInList].count -= toSplit;
                listOfArmies[armyFromPlaceInList].leaders -= leadersToSplit;
                if (listOfArmies[armyFromPlaceInList].armyType == 1) {
                    listOfArmies[armyFromPlaceInList].mounts -= mountsToSplit;
                }
                if (listOfArmies[armyFromPlaceInList].armyType == 1 || listOfArmies[armyFromPlaceInList].armyType == 3) {
                    listOfArmies[armyFromPlaceInList].lkp -= lkpToSplit;
                    listOfArmies[armyFromPlaceInList].skp -= skpToSplit;
                }
                let army = null;
                if (Math.floor(newArmyId / 100) == 1) {
                    army = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
                }
                else if (Math.floor(newArmyId / 100) == 2) {
                    army = new reiterHeer(newArmyId, toSplit, leadersToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
                }
                else if (Math.floor(newArmyId / 100) == 3) {
                    army = new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
                }
                army.setRemainingMovePoints(listOfArmies[armyFromPlaceInList].remainingMovePoints);
                army.setRemainingHeightPoints(listOfArmies[armyFromPlaceInList].remainingHeightPoints);
                listOfArmies.push(army);
            }
            event.status = 'checked';
            fillEventList();
            drawStuff();
        }
        else if (event.type === "merge") {
            let armyFromPlaceInList = -1;
            let armyToPlaceInList = -1;
            let armyFromId = cont.fromArmy;
            let armyToId = cont.toArmy;
            let realm = cont.realm;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == armyFromId && listOfArmies[i].owner == realm) {
                    armyFromPlaceInList = i;
                    console.log("i1=" + i);
                }
                else if (listOfArmies[i].armyId == armyToId && listOfArmies[i].owner == realm) {
                    armyToPlaceInList = i;
                    console.log("i2=" + i);
                }
            }
            if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
                selectedArmyIndex = armyFromPlaceInList;
                mergeSelectedArmy(armyToPlaceInList);
                preparedEvents.pop();
            }
            event.status = 'checked';
            fillEventList();
            drawStuff();
            selectedArmyIndex = undefined;
        }
        else if (event.type === "transfer") {
            console.log("this is a transfer event");
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
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == armyFromId && listOfArmies[i].owner == realm) {
                    armyFromPlaceInList = i;
                }
                else if (listOfArmies[i].armyId == armyToId && listOfArmies[i].owner == realm) {
                    armyToPlaceInList = i;
                }
            }
            if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
                listOfArmies[armyFromPlaceInList].count -= toSplit;
                listOfArmies[armyToPlaceInList].count += toSplit;
                listOfArmies[armyFromPlaceInList].leaders -= leadersToSplit;
                listOfArmies[armyToPlaceInList].leaders += leadersToSplit;
                if (listOfArmies[armyFromPlaceInList].armyType == 1) {
                    listOfArmies[armyFromPlaceInList].mounts -= mountsToSplit;
                    listOfArmies[armyToPlaceInList].mounts += mountsToSplit;
                }
                if (listOfArmies[armyFromPlaceInList].armyType == 1 || listOfArmies[armyFromPlaceInList].armyType == 3) {
                    listOfArmies[armyFromPlaceInList].lkp -= lkpToSplit;
                    listOfArmies[armyToPlaceInList].lkp += lkpToSplit;
                    listOfArmies[armyFromPlaceInList].skp -= skpToSplit;
                    listOfArmies[armyToPlaceInList].skp += skpToSplit;
                }
                if (leadersToSplit > 0 &&
                    listOfArmies[armyFromPlaceInList].remainingMovePoints < listOfArmies[armyFromPlaceInList].startingMovepoints) {
                    listOfArmies[armyToPlaceInList].setRemainingMovePoints(0);
                }
                else if (listOfArmies[armyFromPlaceInList].remainingMovePoints < listOfArmies[armyToPlaceInList].remainingMovePoints) {
                    listOfArmies[armyToPlaceInList].setRemainingMovePoints(listOfArmies[armyFromPlaceInList].remainingMovePoints);
                }
                if (listOfArmies[armyFromPlaceInList].remainingHeightPoints < listOfArmies[armyToPlaceInList].remainingHeightPoints) {
                    listOfArmies[armyToPlaceInList].setRemainingHeightPoints(listOfArmies[armyFromPlaceInList].remainingHeightPoints);
                }
            }
            event.status = 'checked';
            fillEventList();
            drawStuff();
        }
        else if (event.type === "mount") {
            console.log("this is a mount event");
            let armyFromPlaceInList = -1;
            let armyFromId = cont.fromArmy;
            let newArmyId = cont.newArmy;
            let realm = cont.realm;
            let toSplit = cont.troops;
            let leadersToSplit = cont.leaders;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == armyFromId && listOfArmies[i].owner == realm) {
                    armyFromPlaceInList = i;
                }
            }
            console.log("place: " + armyFromPlaceInList);
            if (armyFromPlaceInList >= 0) {
                if (listOfArmies[armyFromPlaceInList].armyType() == 1) {
                    mountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                    event.status = 'checked';
                }
                else if (listOfArmies[armyFromPlaceInList].armyType() == 2) {
                    unMountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                    event.status = 'checked';
                }
            }
            fillEventList();
            drawStuff();
        }
        else if (event.type === "shoot") {
            let shootBox = GUI.getShootingBigBox();
            show(shootBox.getSelf());
            shootBox.getShooterTitleText().innerHTML = cont.armyId + ", " + realms[cont.realm - 1].tag;
            ;
            shootBox.getAttackersLKPText().innerHTML = cont.LKPcount;
            shootBox.getAttackersSKPText().innerHTML = cont.SKPcount;
            shootBox.getTargetText().innerHTML = cont.target;
            shootBox.getXTargetText().innerHTML = cont.toX;
            shootBox.getYTargetText().innerHTML = cont.toY;
            let shootButton = shootBox.getRangedBattleButton();
            shootButton.onclick = function () {
                let shooter;
                let lkpRolls = [];
                let skpRolls = [];
                for (let i = 0; i < listOfArmies.length; i++) {
                    if (listOfArmies[i].armyId === cont.armyId && listOfArmies[i].owner === cont.realm)
                        shooter = listOfArmies[i];
                }
                for (let i = 0; i < 10; i++) {
                    let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
                    let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
                    if (!isNaN(currentRollLKP) && currentRollLKP !== 0) {
                        for (let j = 0; j < currentRollLKP; j++) {
                            lkpRolls.push(i);
                        }
                    }
                    if (!isNaN(currentRollSKP) && currentRollSKP !== 0) {
                        for (let j = 0; j < currentRollSKP; j++) {
                            skpRolls.push(i);
                        }
                    }
                }
                //TODO check target field
                if (lkpRolls.length < cont.LKPcount) {
                    window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
                    return false;
                }
                else if (skpRolls.length < cont.SKPcount) {
                    window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
                    return false;
                }
                else if (lkpRolls.length > cont.LKPcount) {
                    window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
                    return false;
                }
                else if (skpRolls.length > cont.SKPcount) {
                    window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
                    return false;
                }
                else {
                    fernkampf(lkpRolls, skpRolls, shooter, cont.target, cont.toX, cont.toY, null); // TODO chars
                    hide(shootBox);
                    event.status = 'checked';
                    fillEventList();
                    drawStuff();
                }
            };
            shootBox.getCloseRangedBattleButton().onclick = function () {
                hide(shootBox);
            };
            fillEventList();
            //sendCheckEvent(event.pk, event.type);
            drawStuff();
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
function untagHitArmys() {
    for (let i = 0; i < listOfArmies.length; i++) {
        if (listOfArmies[i].ownerTag() === login || login === "sl") {
            listOfArmies[i].wasShotAt = false;
        }
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
