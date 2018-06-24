"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
var MouseFunctions;
(function (MouseFunctions) {
    var armyIdBuffer = types_1.BoxVisibility.armyIdBuffer;
    var armyWithNextClick = types_1.BoxVisibility.armyWithNextClick;
    var switchBtnBoxTo = types_1.BoxVisibility.switchBtnBoxTo;
    var switchModeTo = types_1.BoxVisibility.switchModeTo;
    var worldCreationModeOnClick = types_1.BoxVisibility.worldCreationModeOnClick;
    var changeFieldToType = types_1.BoxVisibility.changeFieldToType;
    var shootingModeOn = types_1.BoxVisibility.shootingModeOn;
    var restoreInfoBox = types_1.BoxVisibility.restoreInfoBox;
    var updateInfoBox = types_1.BoxVisibility.updateInfoBox;
    function mouseDown(event) {
        if (event.button === 0) {
            types_1.Controls.leftMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            types_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            types_1.Controls.click[1] = event.pageY;
        }
        else if (event.button === 2) {
            types_1.Controls.rightMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            types_1.Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            types_1.Controls.click[1] = event.pageY;
        }
        types_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseDown = mouseDown;
    function mouseUp(event) {
        if (types_1.Controls.leftMousePressed && event.button === 0) {
            if (types_1.Controls.isDragging) { // mouse was dragged; run panning finish routine
                // add the x offset from dragged mouse to the current x origin for drawing
                types_1.Controls.origin[0] += types_1.Controls.move[0];
                // add the y offset from dragged mouse to the current y origin for drawing
                types_1.Controls.origin[1] += types_1.Controls.move[1];
            }
            else {
                registerLeftClick(); // do whatever has to be done on leftclick
            }
            // reset mouse click parameters
            types_1.Controls.leftMousePressed = false; // mouse is no longer pressed
            types_1.Controls.isDragging = false; // mouse is no longer being dragged
            types_1.Controls.click = [0, 0]; // reset click registration
            types_1.Controls.move = [0, 0]; // reset move registration
        }
        else if (types_1.Controls.rightMousePressed && event.button === 2) {
            if (!types_1.Controls.isDragging) {
                registerRightClick();
            }
            // reset mouse click parameters
            types_1.Controls.rightMousePressed = false; // mouse is no longer pressed
            types_1.Controls.isDragging = false; // mouse is no longer being dragged
            types_1.Controls.click = [0, 0]; // reset click registration
            types_1.Controls.move = [0, 0]; // reset move registration
        }
        types_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseUp = mouseUp;
    function mouseMove(event) {
        if (types_1.Controls.leftMousePressed === true) {
            types_1.Controls.isDragging = true; // for later click detection; no click if mouse was previously dragged
            types_1.Controls.move[0] = event.pageX - types_1.Controls.click[0]; // compute the x offset from dragged mouse
            types_1.Controls.move[1] = event.pageY - types_1.Controls.click[1]; // compute the y offset from dragged mouse
            types_1.Drawing.drawStuff();
        }
    }
    MouseFunctions.mouseMove = mouseMove;
    function mouseWheel(event) {
        let deltaY = event.deltaY; // get amount scrolled
        let mouse = [event.pageX, event.pageY]; // get current mouse position
        // get the tile the mouse is currently in (and the position in the tile)
        let pos = [(mouse[0] - types_1.Controls.origin[0]) / types_1.Drawing.scale,
            (mouse[1] - types_1.Controls.origin[1]) / types_1.Drawing.scale];
        if (deltaY < 0) { // do the actuall scrolling
            types_1.Drawing.scale *= 1 + types_1.Controls.scrollSpeed;
        }
        else {
            types_1.Drawing.scale *= 1 - types_1.Controls.scrollSpeed;
        }
        types_1.Drawing.setHexParts(types_1.Drawing.scale); // compute the scale dependant values used for map drawing
        // compute the new distance of mouse from origin
        let newPos = [pos[0] * types_1.Drawing.scale, pos[1] * types_1.Drawing.scale];
        // move origin so that the tile stays the same  with the new scaling
        types_1.Controls.origin = [mouse[0] - newPos[0], mouse[1] - newPos[1]];
        types_1.Drawing.drawStuff();
    }
    MouseFunctions.mouseWheel = mouseWheel;
    function registerLeftClick() {
        let clickedField = getClickedField(); // get selected field
        // If mount or unmount is activated, cancel it.
        if (armyWithNextClick) {
            let owner = types_1.GameState.realms.find(realm => realm.tag === types_1.BoxVisibility.ownerBuffer);
            if (owner == undefined) {
                throw new Error("Realm not found.");
            }
            switch (Math.floor(armyIdBuffer / 100)) {
                case 3:
                    types_1.GameState.armies.push(new types_1.Fleet(types_1.BoxVisibility.armyIdBuffer, owner, types_1.BoxVisibility.countBuffer, types_1.BoxVisibility.leaderBuffer, types_1.BoxVisibility.lkpBuffer, types_1.BoxVisibility.skpBuffer, clickedField, types_1.Fleet.MAX_MOVE_POINTS, types_1.BoxVisibility.guardBuffer));
                    break;
                case 2:
                    types_1.GameState.armies.push(new types_1.RiderArmy(types_1.BoxVisibility.armyIdBuffer, owner, types_1.BoxVisibility.countBuffer, types_1.BoxVisibility.leaderBuffer, clickedField, types_1.RiderArmy.MAX_MOVE_POINTS, types_1.RiderArmy.MAX_HEIGHT_POINTS, types_1.BoxVisibility.guardBuffer));
                    break;
                case 1:
                    types_1.GameState.armies.push(new types_1.FootArmy(types_1.BoxVisibility.armyIdBuffer, owner, types_1.BoxVisibility.countBuffer, types_1.BoxVisibility.leaderBuffer, types_1.BoxVisibility.lkpBuffer, types_1.BoxVisibility.skpBuffer, types_1.BoxVisibility.mountsBuffer, clickedField, types_1.FootArmy.MAX_MOVE_POINTS, types_1.FootArmy.MAX_HEIGHT_POINTS, types_1.BoxVisibility.guardBuffer));
                    break;
            }
            types_1.BoxVisibility.ownerBuffer = types_1.GUI.getArmyGeneratorBox().getOwnerField().value;
            types_1.BoxVisibility.armyIdBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getArmyNumberField().value = "0";
            types_1.BoxVisibility.countBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getCountField().value = "0";
            types_1.BoxVisibility.leaderBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getLeaderField().value = "0";
            types_1.BoxVisibility.mountsBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getMountsField().value = "0";
            types_1.BoxVisibility.lkpBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getLKPField().value = "0";
            types_1.BoxVisibility.skpBuffer = 0;
            types_1.GUI.getArmyGeneratorBox().getSKPField().value = "0";
            switchBtnBoxTo(types_1.GUI.getButtonsBox());
            switchModeTo("none");
        }
        else if (worldCreationModeOnClick) {
            let posi = types_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType === -1) {
                // checks if Field should be changed to a specific type, if not use
                // normal world creation mode on click
                if (types_1.GameState.fields[posi].type === 8 || types_1.GameState.fields[posi].type === 9) {
                    types_1.GameState.fields[posi].type = 0;
                }
                else {
                    types_1.GameState.fields[posi].type++;
                }
            }
            else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
                types_1.GameState.fields[posi].type = changeFieldToType;
            }
            let found = false;
            for (let i = 0; i < types_1.Controls.changedFields.length; i++) {
                if ((types_1.Controls.changedFields[i].coordinates[0] === types_1.GameState.fields[posi].coordinates[0]) &&
                    (types_1.Controls.changedFields[i].coordinates[1] === types_1.GameState.fields[posi].coordinates[1])) {
                    types_1.Controls.changedFields[i].type = types_1.GameState.fields[posi].type;
                    found = true;
                }
            }
            if (!found) {
                types_1.Controls.changedFields.push(new types_1.Field(types_1.GameState.fields[posi].coordinates, types_1.GameState.fields[posi].type));
            }
        }
        else {
            // Feldauswahl
            let index = -1;
            let sf = types_1.Controls.selectedFields[0];
            if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
                types_1.Controls.selectedFields = [];
            }
            else {
                types_1.Controls.selectedFields[0] = clickedField;
            }
            // Armeeauswahl
            restoreInfoBox();
            types_1.Controls.selectedArmyIndex = -1;
            let possibleSelections = [];
            types_1.GameState.armies.forEach((army, index) => {
                if (army.getPosition()[0] === clickedField[0] && army.getPosition()[1] === clickedField[1]) {
                    possibleSelections.push(index);
                    types_1.Controls.selectedArmyIndex = index;
                }
            });
            if (document.getElementById("btnSection") != undefined) {
                let d = types_1.GUI.getButtonsBox();
                d.removeChild(document.getElementById("btnSection"));
            }
            if (possibleSelections.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "btnSection");
                for (let i = 0; i < possibleSelections.length; i++) {
                    let btn = document.createElement("BUTTON");
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = types_1.GameState.armies[possibleSelections[i]].getErkenfaraID() + " " +
                        types_1.GameState.armies[possibleSelections[i]].owner.tag;
                    let t = document.createTextNode("" + types_1.GameState.armies[possibleSelections[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let idToSearchFor = this.name.split(" ")[0];
                        let ownerToSearchFor = this.name.split(" ")[1];
                        for (let j = 0; j < types_1.GameState.armies.length; j++) {
                            if (types_1.GameState.armies[j].getErkenfaraID() === parseInt(idToSearchFor) &&
                                types_1.GameState.armies[j].owner.tag === ownerToSearchFor) {
                                types_1.Controls.selectedArmyIndex = j;
                            }
                        }
                        updateInfoBox();
                        restoreInfoBox();
                        if (types_1.Controls.selectedArmyIndex !== undefined) {
                            types_1.GameState.armies[types_1.Controls.selectedArmyIndex].clickedMoves();
                        }
                        types_1.Drawing.drawStuff();
                    });
                    x.appendChild(btn);
                }
                types_1.GUI.getButtonsBox().appendChild(x);
            }
            updateInfoBox();
            if (types_1.Controls.selectedArmyIndex !== undefined) {
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].clickedMoves();
            }
        }
    }
    function registerRightClick() {
        let clickedField = getClickedField();
        if (worldCreationModeOnClick) {
            let posi = types_1.HexFunction.positionInList(clickedField);
            if (changeFieldToType == -1) {
                // checks if Field should be changed to a specific type (then
                // rightclick is disabled)
                if (types_1.GameState.fields[posi].type === 0 || types_1.GameState.fields[posi].type === 9) {
                    types_1.GameState.fields[posi].type = 8;
                }
                else {
                    types_1.GameState.fields[posi].type--;
                }
                let found = false;
                for (let i = 0; i < types_1.Controls.changedFields.length; i++) {
                    if ((types_1.Controls.changedFields[i].coordinates[0] == types_1.GameState.fields[posi].coordinates[0]) &&
                        (types_1.Controls.changedFields[i].coordinates[1] == types_1.GameState.fields[posi].coordinates[1])) {
                        types_1.Controls.changedFields[i].type = types_1.GameState.fields[posi].type;
                        found = true;
                    }
                }
                if (!found) {
                    types_1.Controls.changedFields.push(new types_1.Field(types_1.GameState.fields[posi].coordinates, types_1.GameState.fields[posi].type));
                }
            }
        }
        else if (shootingModeOn) {
            //for shooting the bastards
            types_1.Controls.shootingTarget = clickedField;
        }
        else {
            if (types_1.Controls.selectedArmyIndex === undefined) {
                console.log("Can't move with no army selected");
            }
            else {
                let clickedArmy = [types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()[0],
                    types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()[1]];
                let localNeighbors = types_1.HexFunction.neighbors(clickedArmy);
                for (let i = 0; i < localNeighbors.length; i++) {
                    if (localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]) {
                        let moveSuccessfull = true;
                        if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner.tag === types_1.GameState.login || types_1.GameState.login === "sl") {
                            try {
                                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].move(i);
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
                            types_1.GameState.newEvents.push(new types_1.MoveEvent(types_1.GameState.newEvents.length, 0 /* Checked */, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getErkenfaraID(), clickedArmy, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()));
                            let battlePossible = false;
                            let participants = [];
                            for (let j = 0; j < types_1.GameState.armies.length; j++) {
                                let someArmy = types_1.GameState.armies[j];
                                if (someArmy.getPosition()[0] === types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()[0] &&
                                    someArmy.getPosition()[1] === types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()[1]
                                    && someArmy !== types_1.GameState.armies[types_1.Controls.selectedArmyIndex]) {
                                    participants.push({ id: someArmy.getErkenfaraID(), realm: someArmy.owner.tag });
                                    //in case they are enemies
                                    if (someArmy.owner !== types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner) {
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
                                participants.push({ id: types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getErkenfaraID(),
                                    realm: types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner.tag });
                                for (let j = 0; j < types_1.GameState.newEvents.length; j++) {
                                    let newEvent = types_1.GameState.newEvents[j];
                                    if (types_1.GameState.newEvents[j] instanceof types_1.BattleEvent &&
                                        newEvent.getPosition() === types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()) {
                                        newEvent.addParticipants(types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getErkenfaraID(), types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner.tag);
                                        inserted = true;
                                    }
                                }
                                if (!inserted) {
                                    types_1.GameState.newEvents.push(new types_1.BattleEvent(types_1.GameState.newEvents.length, 0 /* Checked */, participants, types_1.GameState.armies[types_1.Controls.selectedArmyIndex].getPosition()));
                                }
                            }
                            else { //no battle -> conquer land (TODO: diplomacy goes here)
                                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].conquer();
                            }
                        }
                    }
                }
                updateInfoBox();
            }
        }
    }
    function getClickedField() {
        let x = types_1.Controls.click[0] - types_1.Controls.origin[0]; // reverse our x/y origin offset
        let y = types_1.Controls.click[1] - types_1.Controls.origin[1];
        let m = types_1.Drawing.c / (types_1.Drawing.gW * 0.5); // the inclination of the hexes upper triangle side
        let row = Math.floor(y / types_1.Drawing.gH); // get the rectangle clicked in
        let rowIsOdd = (row % 2 !== 0);
        let column = Math.floor((rowIsOdd ? ((x + 0.5 * types_1.Drawing.gW) / types_1.Drawing.gW) : (x / types_1.Drawing.gW)));
        let relY = y - (row * types_1.Drawing.gH); // compute relative position of the click in
        // respect to the rectangle
        let relX = rowIsOdd ? ((x + 0.5 * types_1.Drawing.gW) - (column * types_1.Drawing.gW)) : (x - (column * types_1.Drawing.gW));
        if (relY < (-m) * relX + types_1.Drawing.c) { // click is in upper left corner
            row--;
            if (rowIsOdd) {
                column--;
            }
        }
        else if (relY < m * relX - types_1.Drawing.c) { // click is in upper right corner
            row--;
            if (!rowIsOdd) {
                column++;
            }
        }
        return [column, row]; // return result
    }
})(MouseFunctions = exports.MouseFunctions || (exports.MouseFunctions = {}));
//# sourceMappingURL=mouseFunctions.js.map