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
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const productionBuilding_1 = require("../buildings/productionBuilding");
const hexFunctions_1 = require("../libraries/hexFunctions");
const river_1 = require("../map/river");
const controlVariables_1 = require("../controls/controlVariables");
const nonDestructibleBuilding_1 = require("../buildings/nonDestructibleBuilding");
const wall_1 = require("../buildings/wall");
const footArmy_1 = require("../armies/footArmy");
const constants_1 = require("../constants");
var GodFunctions;
(function (GodFunctions) {
    var changeFieldToType = boxVisibilty_1.BoxVisibility.changeFieldToType;
    var hide = boxVisibilty_1.BoxVisibility.hide;
    var show = boxVisibilty_1.BoxVisibility.show;
    var switchModeTo = boxVisibilty_1.BoxVisibility.switchModeTo;
    let changedBuildings = controlVariables_1.Controls.changedBuildings;
    let factionToCreateBuildingsFor = gameState_1.GameState.realms[0];
    function setFactionToCreateBuildingsFor(faction) {
        factionToCreateBuildingsFor = faction;
    }
    GodFunctions.setFactionToCreateBuildingsFor = setFactionToCreateBuildingsFor;
    function toggleOnClickWorldCreationMode() {
        if (boxVisibilty_1.BoxVisibility.worldCreationModeOnClick && (changeFieldToType == -1)) {
            boxVisibilty_1.BoxVisibility.worldCreationModeOnClick = false;
            hide(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else if (!boxVisibilty_1.BoxVisibility.worldCreationModeOnClick || (boxVisibilty_1.BoxVisibility.worldCreationModeOnClick &&
            (changeFieldToType != -1))) {
            boxVisibilty_1.BoxVisibility.changeFieldToType = -1;
            boxVisibilty_1.BoxVisibility.worldCreationModeOnClick = true;
            show(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.toggleOnClickWorldCreationMode = toggleOnClickWorldCreationMode;
    function changeFieldClickedTo(number) {
        if (changeFieldToType != number) {
            switchModeTo("worldCreationModeOnClick");
            boxVisibilty_1.BoxVisibility.changeFieldToType = number;
            show(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else {
            boxVisibilty_1.BoxVisibility.changeFieldToType = -1;
            switchModeTo("worldCreationModeOn");
            hide(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeFieldClickedTo = changeFieldClickedTo;
    function addProductionBuilding(type, position, realm) {
        let maxBP = 0;
        switch (type) {
            case 0 /* CASTLE */:
                maxBP = constants_1.Constants.CASTLE_BP;
                break;
            case 1 /* CITY */:
                maxBP = constants_1.Constants.CITY_BP;
                break;
            case 2 /* FORTRESS */:
                maxBP = constants_1.Constants.FORTRESS_BP;
                break;
            case 3 /* CAPITAL */:
                maxBP = constants_1.Constants.CAPITAL_BP;
                break;
            case 4 /* CAPITAL_FORT */:
                maxBP = constants_1.Constants.CAPITAL_FORTRESS_BP;
                break;
            default: break;
        }
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1] instanceof productionBuilding_1.ProductionBuilding &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1]);
        if (entryInChangedBuildings == undefined) {
            controlVariables_1.Controls.changedBuildings.push([true, new productionBuilding_1.ProductionBuilding(type, "", position, realm, maxBP)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        else if (entryInChangedBuildings[1].type !== type) {
            entryInChangedBuildings[1].type = type;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = gameState_1.GameState.buildings.find(building => building instanceof productionBuilding_1.ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
        if (entryInActualBuildings == undefined) {
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(type, "", position, realm, maxBP));
        }
        else if (entryInActualBuildings.type !== type) {
            entryInActualBuildings.type = type;
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    // add a castle in the selectedField
    function addCastle() {
        addProductionBuilding(0 /* CASTLE */, controlVariables_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCastle = addCastle;
    // add a city in the selectedField
    function addCity() {
        addProductionBuilding(1 /* CITY */, controlVariables_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCity = addCity;
    // add a fortress in the selectedField
    function addFortress() {
        addProductionBuilding(2 /* FORTRESS */, controlVariables_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addFortress = addFortress;
    // add a capital city in the selectedField
    function addCapital() {
        addProductionBuilding(3 /* CAPITAL */, controlVariables_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCapital = addCapital;
    // add a capital fortress in the selectedField
    function addCapitalFortress() {
        addProductionBuilding(4 /* CAPITAL_FORT */, controlVariables_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCapitalFortress = addCapitalFortress;
    function deleteProductionBuildingOnField(position) {
        let buildingToDelete = gameState_1.GameState.buildings.find(building => building instanceof productionBuilding_1.ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1]);
            if (entryInChangedBuildings == undefined) {
                controlVariables_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            gameState_1.GameState.buildings.splice(gameState_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    // delete the production building in the selectedField
    function deleteSelectedProductionBuilding() {
        deleteProductionBuildingOnField(controlVariables_1.Controls.selectedFields[0]);
    }
    GodFunctions.deleteSelectedProductionBuilding = deleteSelectedProductionBuilding;
    function addNonDestructibleBuilding(type, position, secondPosition, realm) {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            entry[1].getSecondPosition()[0] === secondPosition[0] &&
            entry[1].getSecondPosition()[1] === secondPosition[1]);
        if (entryInChangedBuildings == undefined) {
            controlVariables_1.Controls.changedBuildings.push([true, new nonDestructibleBuilding_1.NonDestructibleBuilding(type, position, secondPosition, realm)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = gameState_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.getSecondPosition()[0] === secondPosition[0] &&
            building.getSecondPosition()[1] === secondPosition[1]);
        if (entryInActualBuildings == undefined) {
            gameState_1.GameState.buildings.push(new nonDestructibleBuilding_1.NonDestructibleBuilding(type, position, secondPosition, realm));
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    function deleteNonDestructibleBuilding(type, position, secondPosition) {
        let buildingToDelete = gameState_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.getSecondPosition()[0] === secondPosition[0] &&
            building.getSecondPosition()[1] === secondPosition[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                entry[1].getSecondPosition()[0] === secondPosition[0] &&
                entry[1].getSecondPosition()[1] === secondPosition[1]);
            if (entryInChangedBuildings == undefined) {
                controlVariables_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            gameState_1.GameState.buildings.splice(gameState_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    // adds a street in the target direction
    function addStreet(direction) {
        let targets = hexFunctions_1.HexFunction.neighbors(controlVariables_1.Controls.selectedFields[0]);
        let target = targets[direction];
        addNonDestructibleBuilding(8 /* STREET */, controlVariables_1.Controls.selectedFields[0], target, factionToCreateBuildingsFor);
        controlVariables_1.Controls.selectedFields[0] = [target[0], target[1]];
        drawingFunctions_1.Drawing.drawStuff();
    }
    GodFunctions.addStreet = addStreet;
    // removes a street in the target direction
    function removeStreet(direction) {
        let targets = hexFunctions_1.HexFunction.neighbors(controlVariables_1.Controls.selectedFields[0]);
        let target = targets[direction];
        deleteNonDestructibleBuilding(8 /* STREET */, controlVariables_1.Controls.selectedFields[0], target);
        controlVariables_1.Controls.selectedFields[0] = [target[0], target[1]];
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.removeStreet = removeStreet;
    // adds a river in the target direction
    function addRiver(direction) {
        let targets = hexFunctions_1.HexFunction.neighbors(controlVariables_1.Controls.selectedFields[0]);
        let target = targets[direction];
        if (!gameState_1.GameState.rivers.some(river => (river.rightBank[0] === controlVariables_1.Controls.selectedFields[0][0] &&
            river.rightBank[1] === controlVariables_1.Controls.selectedFields[0][1] &&
            river.leftBank[0] === target[0] &&
            river.leftBank[1] === target[1]) ||
            (river.leftBank[0] === controlVariables_1.Controls.selectedFields[0][0] &&
                river.leftBank[1] === controlVariables_1.Controls.selectedFields[0][1] &&
                river.rightBank[0] === target[0] &&
                river.rightBank[1] === target[1]))) {
            gameState_1.GameState.rivers.push(new river_1.River(controlVariables_1.Controls.selectedFields[0], target));
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    GodFunctions.addRiver = addRiver;
    // removes a river in the target direction
    function removeRiver(direction) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let targets = hexFunctions_1.HexFunction.neighbors(sf);
        let target = targets[direction];
        let indexToDelete = gameState_1.GameState.rivers.findIndex(river => (river.rightBank[0] === controlVariables_1.Controls.selectedFields[0][0] &&
            river.rightBank[1] === controlVariables_1.Controls.selectedFields[0][1] &&
            river.leftBank[0] === target[0] &&
            river.leftBank[1] === target[1]) ||
            (river.leftBank[0] === controlVariables_1.Controls.selectedFields[0][0] &&
                river.leftBank[1] === controlVariables_1.Controls.selectedFields[0][1] &&
                river.rightBank[0] === target[0] &&
                river.rightBank[1] === target[1]));
        if (indexToDelete != undefined) {
            gameState_1.GameState.rivers.splice(indexToDelete, 1);
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    GodFunctions.removeRiver = removeRiver;
    function addWall(type, position, direction, realm) {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            entry[1].facing === direction);
        if (entryInChangedBuildings == undefined) {
            controlVariables_1.Controls.changedBuildings.push([true, new wall_1.Wall(type, position, realm, constants_1.Constants.WALL_BP, direction, constants_1.Constants.WALL_MAX_GUARD)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = gameState_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.facing === direction);
        if (entryInActualBuildings == undefined) {
            gameState_1.GameState.buildings.push(new wall_1.Wall(type, position, realm, constants_1.Constants.WALL_BP, direction, constants_1.Constants.WALL_MAX_GUARD));
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    function deleteWall(type, position, direction) {
        let buildingToDelete = gameState_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.facing === direction);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = controlVariables_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                entry[1].facing === direction);
            if (entryInChangedBuildings == undefined) {
                controlVariables_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            gameState_1.GameState.buildings.splice(gameState_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        drawingFunctions_1.Drawing.drawStuff();
    }
    //add = true means add a building, else remove it.
    function manipulateBorderBuilding(type, direction, add) {
        let targets = hexFunctions_1.HexFunction.neighbors(controlVariables_1.Controls.selectedFields[0]);
        let target = targets[direction];
        if (add) {
            if (type === 5 /* WALL */) {
                addWall(type, controlVariables_1.Controls.selectedFields[0], direction, factionToCreateBuildingsFor);
            }
            else {
                addNonDestructibleBuilding(type, controlVariables_1.Controls.selectedFields[0], target, factionToCreateBuildingsFor);
            }
        }
        else {
            if (type === 5 /* WALL */) {
                deleteWall(type, controlVariables_1.Controls.selectedFields[0], direction);
            }
            else {
                deleteNonDestructibleBuilding(type, controlVariables_1.Controls.selectedFields[0], target);
            }
        }
    }
    GodFunctions.manipulateBorderBuilding = manipulateBorderBuilding;
    // the function for the Gm posibility to make an army out of nothing
    function generateArmyBtn() {
        let armyMakerBox = gui_1.GUI.getArmyGeneratorBox();
        boxVisibilty_1.BoxVisibility.ownerBuffer = armyMakerBox.getOwnerField().value;
        boxVisibilty_1.BoxVisibility.armyIdBuffer = Number(armyMakerBox.getArmyNumberField().value);
        boxVisibilty_1.BoxVisibility.countBuffer = Number(armyMakerBox.getCountField().value);
        boxVisibilty_1.BoxVisibility.leaderBuffer = Number(armyMakerBox.getLeaderField().value);
        boxVisibilty_1.BoxVisibility.mountsBuffer = Number(armyMakerBox.getMountsField().value);
        boxVisibilty_1.BoxVisibility.lkpBuffer = Number(armyMakerBox.getLKPField().value);
        boxVisibilty_1.BoxVisibility.skpBuffer = Number(armyMakerBox.getSKPField().value);
        boxVisibilty_1.BoxVisibility.guardBuffer = false;
        if (boxVisibilty_1.BoxVisibility.armyIdBuffer < 101 || boxVisibilty_1.BoxVisibility.armyIdBuffer > 399) {
            window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
            return false;
        }
        // check for any other armies with the same armyId
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() == boxVisibilty_1.BoxVisibility.armyIdBuffer &&
                gameState_1.GameState.armies[i].owner.tag === boxVisibilty_1.BoxVisibility.ownerBuffer) {
                window.alert("Ein Heer mit dieser Nummer existiert bereits in diesem Königreich.");
                return false;
            }
        }
        // check for catabults in a rider army, and for mounts in a rider army, or fleet
        if (Math.floor(boxVisibilty_1.BoxVisibility.armyIdBuffer / 100) == 2) {
            if (boxVisibilty_1.BoxVisibility.mountsBuffer > 0 || boxVisibilty_1.BoxVisibility.lkpBuffer > 0 || boxVisibilty_1.BoxVisibility.skpBuffer > 0) {
                window.alert("In einem Reiterheer sollten weder einzelne Reittiere, noch Katapulte sein. " +
                    "Wenn das Heer ein Fußheer sein sollte gib, ihm eine Nummer zwischen 100 und 199.");
                return false;
            }
        }
        else if (Math.floor(boxVisibilty_1.BoxVisibility.armyIdBuffer / 100) == 3) {
            if (boxVisibilty_1.BoxVisibility.mountsBuffer > 0) {
                window.alert("In einer Flotte sollten keine Reittiere enthalten sein. Wenn das Heer ein Fußheer sein " +
                    "sollte, gib ihm eine Nummer zwischen 100 und 199.");
                return false;
            }
        }
        switchModeTo("armyWithNextClick");
        return true;
    }
    GodFunctions.generateArmyBtn = generateArmyBtn;
    // used to delete the selected army
    function godDeleteSelectedArmy() {
        if (confirm('Are you sure you want to delete your currently selected army?')) {
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] = gameState_1.GameState.armies[gameState_1.GameState.armies.length - 1];
            gameState_1.GameState.armies.pop();
        }
        else {
            // Do nothing!
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.godDeleteSelectedArmy = godDeleteSelectedArmy;
    // This is used by the infoChangeBox to manipulate an armies Stats.
    function changeArmyInfo() {
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            let infoChangeBox = gui_1.GUI.getInfoChangeBox();
            if (i != controlVariables_1.Controls.selectedArmyIndex && gameState_1.GameState.armies[i].owner.tag === infoChangeBox.getOwnerChangeInput().value &&
                gameState_1.GameState.armies[i].getErkenfaraID() === parseInt(infoChangeBox.getArmyIdChangeInput().value)) {
                window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
            }
            else {
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
                for (let i = 0; i > gameState_1.GameState.realms.length; i++) {
                    // check for the realm tag, not the Name
                    if (infoChangeBox.getOwnerChangeInput().value === gameState_1.GameState.realms[i].tag) {
                        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner = gameState_1.GameState.realms[i];
                    }
                }
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setID(Number(infoChangeBox.getArmyIdChangeInput().value));
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setTroopCount(Number(infoChangeBox.getCountChangeInput().value));
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setOfficerCount(Number(infoChangeBox.getLeadersChangeInput().value));
                if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex] instanceof footArmy_1.FootArmy) {
                    let armyToChange = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
                    armyToChange.setMountCount(Number(infoChangeBox.getMountsChangeInput().value));
                }
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setLightCatapultCount(Number(infoChangeBox.getLKPChangeInput().value));
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setHeavyCatapultCount(Number(infoChangeBox.getSKPChangeInput().value));
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setMovePoints(Number(infoChangeBox.getMovePointsChangeInput().value));
                gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].setHeightPoints(Number(infoChangeBox.getHeightPointsChangeInput().value));
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeArmyInfo = changeArmyInfo;
})(GodFunctions = exports.GodFunctions || (exports.GodFunctions = {}));
//# sourceMappingURL=godModeFunctions.js.map