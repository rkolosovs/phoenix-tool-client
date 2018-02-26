"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("./controlVariables");
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const riderArmy_1 = require("../armies/riderArmy");
const hexFunctions_1 = require("../libraries/hexFunctions");
const footArmy_1 = require("../armies/footArmy");
const fleet_1 = require("../armies/fleet");
var MouseFunctions;
(function (MouseFunctions) {
    var skpBuffer = boxVisibilty_1.BoxVisibility.skpBuffer;
    var leaderBuffer = boxVisibilty_1.BoxVisibility.leaderBuffer;
    var countBuffer = boxVisibilty_1.BoxVisibility.countBuffer;
    var armyIdBuffer = boxVisibilty_1.BoxVisibility.armyIdBuffer;
    var guardBuffer = boxVisibilty_1.BoxVisibility.guardBuffer;
    var lkpBuffer = boxVisibilty_1.BoxVisibility.lkpBuffer;
    var ownerBuffer = boxVisibilty_1.BoxVisibility.ownerBuffer;
    var armyWithNextClick = boxVisibilty_1.BoxVisibility.armyWithNextClick;
    var mountsBuffer = boxVisibilty_1.BoxVisibility.mountsBuffer;
    var switchBtnBoxTo = boxVisibilty_1.BoxVisibility.switchBtnBoxTo;
    var switchModeTo = boxVisibilty_1.BoxVisibility.switchModeTo;
    var worldCreationModeOnClick = boxVisibilty_1.BoxVisibility.worldCreationModeOnClick;
    var changeFieldToType = boxVisibilty_1.BoxVisibility.changeFieldToType;
    var shootingModeOn = boxVisibilty_1.BoxVisibility.shootingModeOn;
    var restoreInfoBox = boxVisibilty_1.BoxVisibility.restoreInfoBox;
    var updateInfoBox = boxVisibilty_1.BoxVisibility.updateInfoBox;
    function mouseDown(event) {
        if (event.button === 0) {
            controlVariables_1.Controls.leftMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[1] = event.pageY;
        }
        else if (event.button === 2) {
            controlVariables_1.Controls.rightMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            controlVariables_1.Controls.click[1] = event.pageY;
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseDown = mouseDown;
    function mouseUp(event) {
        if (controlVariables_1.Controls.leftMousePressed && event.button === 0) {
            if (controlVariables_1.Controls.isDragging) {
                // add the x offset from dragged mouse to the current x origin for drawing
                controlVariables_1.Controls.origin[0] += controlVariables_1.Controls.move[0];
                // add the y offset from dragged mouse to the current y origin for drawing
                controlVariables_1.Controls.origin[1] += controlVariables_1.Controls.move[1];
            }
            else {
                registerLeftClick(); // do whatever has to be done on leftclick
            }
            // reset mouse click parameters
            controlVariables_1.Controls.leftMousePressed = false; // mouse is no longer pressed
            controlVariables_1.Controls.isDragging = false; // mouse is no longer being dragged
            controlVariables_1.Controls.click = [0, 0]; // reset click registration
            controlVariables_1.Controls.move = [0, 0]; // reset move registration
        }
        else if (controlVariables_1.Controls.rightMousePressed && event.button === 2) {
            if (!controlVariables_1.Controls.isDragging) {
                registerRightClick();
            }
            // reset mouse click parameters
            controlVariables_1.Controls.rightMousePressed = false; // mouse is no longer pressed
            controlVariables_1.Controls.isDragging = false; // mouse is no longer being dragged
            controlVariables_1.Controls.click = [0, 0]; // reset click registration
            controlVariables_1.Controls.move = [0, 0]; // reset move registration
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseUp = mouseUp;
    function mouseMove(event) {
        if (controlVariables_1.Controls.leftMousePressed === true) {
            controlVariables_1.Controls.isDragging = true; // for later click detection; no click if mouse was previously dragged
            controlVariables_1.Controls.move[0] = event.pageX - controlVariables_1.Controls.click[0]; // compute the x offset from dragged mouse
            controlVariables_1.Controls.move[1] = event.pageY - controlVariables_1.Controls.click[1]; // compute the y offset from dragged mouse
            drawingFunctions_1.Drawing.drawStuff();
        }
    }
    MouseFunctions.mouseMove = mouseMove;
    function mouseWheel(event) {
        let deltaY = event.deltaY; // get amount scrolled
        let mouse = [event.pageX, event.pageY]; // get current mouse position
        // get the tile the mouse is currently in (and the position in the tile)
        let pos = [(mouse[0] - controlVariables_1.Controls.origin[0]) / drawingFunctions_1.Drawing.scale,
            (mouse[1] - controlVariables_1.Controls.origin[1]) / drawingFunctions_1.Drawing.scale];
        if (deltaY < 0) {
            drawingFunctions_1.Drawing.scale *= 1 + controlVariables_1.Controls.scrollSpeed;
        }
        else {
            drawingFunctions_1.Drawing.scale *= 1 - controlVariables_1.Controls.scrollSpeed;
        }
        drawingFunctions_1.Drawing.setHexParts(drawingFunctions_1.Drawing.scale); // compute the scale dependant values used for map drawing
        // compute the new distance of mouse from origin
        let newPos = [pos[0] * drawingFunctions_1.Drawing.scale, pos[1] * drawingFunctions_1.Drawing.scale];
        // move origin so that the tile stays the same  with the new scaling
        controlVariables_1.Controls.origin = [mouse[0] - newPos[0], mouse[1] - newPos[1]];
        drawingFunctions_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseWheel = mouseWheel;
    function registerLeftClick() {
        let clickedField = getClickedField(); // get selected field
        // If mount or unmount is activated, cancel it.
        if (armyWithNextClick) {
            let owner = gameState_1.GameState.realms.find(realm => realm.tag === ownerBuffer);
            if (owner == undefined) {
                throw new Error("Realm not found.");
            }
            switch (Math.floor(armyIdBuffer / 100)) {
                case 3:
                    gameState_1.GameState.armies.push(new fleet_1.Fleet(armyIdBuffer, owner, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, clickedField, fleet_1.Fleet.MAX_MOVE_POINTS, guardBuffer));
                    break;
                case 2:
                    gameState_1.GameState.armies.push(new riderArmy_1.RiderArmy(armyIdBuffer, owner, countBuffer, leaderBuffer, clickedField, riderArmy_1.RiderArmy.MAX_MOVE_POINTS, riderArmy_1.RiderArmy.MAX_HEIGHT_POINTS, guardBuffer));
                    break;
                case 1:
                    gameState_1.GameState.armies.push(new footArmy_1.FootArmy(armyIdBuffer, owner, countBuffer, leaderBuffer, lkpBuffer, skpBuffer, clickedField, footArmy_1.FootArmy.MAX_MOVE_POINTS, footArmy_1.FootArmy.MAX_HEIGHT_POINTS, guardBuffer));
                    break;
            }
            ownerBuffer = gui_1.GUI.getArmyGeneratorBox().getOwnerField().value;
            armyIdBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getArmyNumberField().value = "0";
            countBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getCountField().value = "0";
            leaderBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getLeaderField().value = "0";
            mountsBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getMountsField().value = "0";
            lkpBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getLKPField().value = "0";
            skpBuffer = 0;
            gui_1.GUI.getArmyGeneratorBox().getSKPField().value = "0";
            switchBtnBoxTo(gui_1.GUI.getButtonsBox());
            switchModeTo("none");
        }
        else if (worldCreationModeOnClick) {
            let posi = hexFunctions_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType === -1) {
                // checks if Field should be changed to a specific type, if not use
                // normal world creation mode on click
                if (gameState_1.GameState.fields[posi].type === 8 || gameState_1.GameState.fields[posi].type === 9) {
                    gameState_1.GameState.fields[posi].type = 0;
                }
                else {
                    gameState_1.GameState.fields[posi].type++;
                }
            }
            else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
                gameState_1.GameState.fields[posi].type = changeFieldToType;
            }
            let found = false;
            for (let i = 0; i < changedFields.length; i++) {
                if ((changedFields[i].x === gameState_1.GameState.fields[posi].coordinates[0]) &&
                    (changedFields[i].y === gameState_1.GameState.fields[posi].coordinates[1])) {
                    changedFields[i].type = gameState_1.GameState.fields[posi].type;
                    found = true;
                }
            }
            if (!found) {
                changedFields.push({ "type": gameState_1.GameState.fields[posi].type,
                    "x": gameState_1.GameState.fields[posi].coordinates[0],
                    "y": gameState_1.GameState.fields[posi].coordinates[1] });
            }
        }
        else if (shootingModeOn) {
            //for shooting the bastards
            controlVariables_1.Controls.selectedFields[1] = clickedField;
        }
        else {
            // Feldauswahl
            let index = -1;
            let sf = controlVariables_1.Controls.selectedFields[0];
            if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
                controlVariables_1.Controls.selectedFields = [];
            }
            else {
                controlVariables_1.Controls.selectedFields[0] = clickedField;
            }
            // Armeeauswahl
            restoreInfoBox();
            controlVariables_1.Controls.selectedArmyIndex = undefined;
            let possibleSelections = [];
            gameState_1.GameState.armies.forEach((army, index) => {
                if (army.getPosition()[0] === clickedField[0] && army.getPosition()[1] === clickedField[1]) {
                    possibleSelections.push(index);
                    selectedArmyIndex = index;
                }
            });
            if (document.getElementById("btnSection") != undefined) {
                let d = gui_1.GUI.getButtonsBox();
                d.removeChild(document.getElementById("btnSection"));
            }
            if (possibleSelections.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "btnSection");
                for (let i = 0; i < possibleSelections.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = gameState_1.GameState.armies[possibleSelections[i]].getErkenfaraID() + " " +
                        gameState_1.GameState.armies[possibleSelections[i]].owner.tag;
                    let t = document.createTextNode("" + gameState_1.GameState.armies[possibleSelections[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let idToSearchFor = this.name.split(" ")[0];
                        let ownerToSearchFor = this.name.split(" ")[1];
                        for (let j = 0; j < gameState_1.GameState.armies.length; j++) {
                            if (gameState_1.GameState.armies[j].getErkenfaraID() === parseInt(idToSearchFor) &&
                                gameState_1.GameState.armies[j].owner.tag === ownerToSearchFor) {
                                selectedArmyIndex = j;
                            }
                        }
                        updateInfoBox();
                        restoreInfoBox();
                        if (selectedArmyIndex !== undefined) {
                            clickedMoves(gameState_1.GameState.armies[selectedArmyIndex]);
                        }
                        drawingFunctions_1.Drawing.drawStuff();
                    });
                    x.appendChild(btn);
                }
                gui_1.GUI.getButtonsBox().appendChild(x);
            }
            updateInfoBox();
            if (selectedArmyIndex !== undefined) {
                clickedMoves(gameState_1.GameState.armies[selectedArmyIndex]);
            }
        }
    }
    function registerRightClick() {
        let clickedField = getClickedField();
        if (worldCreationModeOnClick) {
            let posi = hexFunctions_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType == -1) {
                // checks if Field should be changed to a specific type (then
                // rightclick is disabled)
                if (gameState_1.GameState.fields[posi].type === 0 || gameState_1.GameState.fields[posi].type === 9) {
                    gameState_1.GameState.fields[posi].type = 8;
                }
                else {
                    gameState_1.GameState.fields[posi].type--;
                }
                let found = false;
                for (let i = 0; i < changedFields.length; i++) {
                    if ((changedFields[i].x == gameState_1.GameState.fields[posi].coordinates[0]) &&
                        (changedFields[i].y == gameState_1.GameState.fields[posi].coordinates[1])) {
                        changedFields[i].type = gameState_1.GameState.fields[posi].type;
                        found = true;
                    }
                }
                if (!found) {
                    changedFields.push({ "type": gameState_1.GameState.fields[posi].type,
                        "x": gameState_1.GameState.fields[posi].coordinates[0],
                        "y": gameState_1.GameState.fields[posi].coordinates[1] });
                }
            }
        }
        else if (shootingModeOn) {
        }
        else {
            if (selectedArmyIndex === undefined) {
                console.log("Can't move with no army selected");
            }
            else {
                let clickedArmy = [gameState_1.GameState.armies[selectedArmyIndex].getPosition()[0],
                    gameState_1.GameState.armies[selectedArmyIndex].getPosition()[1]];
                let localNeighbors = hexFunctions_1.HexFunction.neighbors(clickedArmy);
                for (let i = 0; i < localNeighbors.length; i++) {
                    if (localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]) {
                        let moveSuccessfull = true;
                        if (gameState_1.GameState.armies[selectedArmyIndex].owner.tag === login || login === "sl") {
                            try {
                                gameState_1.GameState.armies[selectedArmyIndex].move(i);
                            }
                            catch (e) {
                                console.log(e);
                                moveSuccessfull = false;
                            }
                        }
                        else {
                            console.log("Can only move your own armies.");
                        }
                        if (moveSuccessfull) {
                            preparedEvents.push({
                                type: "move", content: {
                                    armyId: gameState_1.GameState.armies[selectedArmyIndex].getErkenfaraID(),
                                    realm: gameState_1.GameState.armies[selectedArmyIndex].owner.tag,
                                    fromX: clickedArmy[0], fromY: clickedArmy[1],
                                    toX: gameState_1.GameState.armies[selectedArmyIndex].getPosition()[0],
                                    toY: gameState_1.GameState.armies[selectedArmyIndex].getPosition()[1]
                                }
                            });
                            let battlePossible = false;
                            let participants = [];
                            for (let j = 0; j < gameState_1.GameState.armies.length; j++) {
                                let someArmy = gameState_1.GameState.armies[j];
                                if (someArmy.getPosition()[0] === gameState_1.GameState.armies[selectedArmyIndex].getPosition()[0] &&
                                    someArmy.getPosition()[1] === gameState_1.GameState.armies[selectedArmyIndex].getPosition()[1]
                                    && someArmy !== gameState_1.GameState.armies[selectedArmyIndex]) {
                                    participants.push({ armyId: someArmy.getErkenfaraID(), realm: someArmy.owner.tag });
                                    //in case they are enemies
                                    if (someArmy.owner !== gameState_1.GameState.armies[selectedArmyIndex].owner) {
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
                                    armyId: gameState_1.GameState.armies[selectedArmyIndex].getErkenfaraID(),
                                    realm: gameState_1.GameState.armies[selectedArmyIndex].owner.tag
                                });
                                for (let j = 0; j < preparedEvents.length; j++) {
                                    if (preparedEvents[j].type === "battle" &&
                                        preparedEvents[j].content.x === gameState_1.GameState.armies[selectedArmyIndex].getPosition()[0] &&
                                        preparedEvents[j].content.y === gameState_1.GameState.armies[selectedArmyIndex].getPosition()[1]) {
                                        preparedEvents[j].content.participants = participants;
                                        inserted = true;
                                    }
                                }
                                if (!inserted) {
                                    preparedEvents.push({
                                        type: "battle", content: {
                                            participants: participants,
                                            x: gameState_1.GameState.armies[selectedArmyIndex].getPosition()[0],
                                            y: gameState_1.GameState.armies[selectedArmyIndex].getPosition()[1]
                                        }
                                    });
                                }
                            }
                            else {
                                gameState_1.GameState.armies[selectedArmyIndex].conquer();
                            }
                        }
                    }
                }
                updateInfoBox();
            }
        }
    }
    function getClickedField() {
        let x = controlVariables_1.Controls.click[0] - controlVariables_1.Controls.origin[0]; // reverse our x/y origin offset
        let y = controlVariables_1.Controls.click[1] - controlVariables_1.Controls.origin[1];
        let m = drawingFunctions_1.Drawing.c / (drawingFunctions_1.Drawing.gW * 0.5); // the inclination of the hexes upper triangle side
        let row = Math.floor(y / drawingFunctions_1.Drawing.gH); // get the rectangle clicked in
        let rowIsOdd = (row % 2 !== 0);
        let column = Math.floor((rowIsOdd ? ((x + 0.5 * drawingFunctions_1.Drawing.gW) / drawingFunctions_1.Drawing.gW) : (x / drawingFunctions_1.Drawing.gW)));
        let relY = y - (row * drawingFunctions_1.Drawing.gH); // compute relative position of the click in
        // respect to the rectangle
        let relX = rowIsOdd ? ((x + 0.5 * drawingFunctions_1.Drawing.gW) - (column * drawingFunctions_1.Drawing.gW)) : (x - (column * drawingFunctions_1.Drawing.gW));
        if (relY < (-m) * relX + drawingFunctions_1.Drawing.c) {
            row--;
            if (rowIsOdd) {
                column--;
            }
        }
        else if (relY < m * relX - drawingFunctions_1.Drawing.c) {
            row--;
            if (!rowIsOdd) {
                column++;
            }
        }
        return [column, row]; // return result
    }
})(MouseFunctions = exports.MouseFunctions || (exports.MouseFunctions = {}));
