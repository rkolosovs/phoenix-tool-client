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
var GodFunctions;
(function (GodFunctions) {
    var changeFieldToType = types_1.BoxVisibility.changeFieldToType;
    var hide = types_1.BoxVisibility.hide;
    var show = types_1.BoxVisibility.show;
    var switchModeTo = types_1.BoxVisibility.switchModeTo;
    let changedBuildings = types_1.Controls.changedBuildings;
    let factionToCreateBuildingsFor = types_1.GameState.realms[0];
    function setFactionToCreateBuildingsFor(faction) {
        factionToCreateBuildingsFor = faction;
    }
    GodFunctions.setFactionToCreateBuildingsFor = setFactionToCreateBuildingsFor;
    function toggleOnClickWorldCreationMode() {
        if (types_1.BoxVisibility.worldCreationModeOnClick && (changeFieldToType == -1)) {
            types_1.BoxVisibility.worldCreationModeOnClick = false;
            hide(types_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else if (!types_1.BoxVisibility.worldCreationModeOnClick || (types_1.BoxVisibility.worldCreationModeOnClick &&
            (changeFieldToType != -1))) {
            types_1.BoxVisibility.changeFieldToType = -1;
            types_1.BoxVisibility.worldCreationModeOnClick = true;
            show(types_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        types_1.Drawing.resizeCanvas();
    }
    GodFunctions.toggleOnClickWorldCreationMode = toggleOnClickWorldCreationMode;
    function changeFieldClickedTo(number) {
        if (changeFieldToType != number) {
            switchModeTo("worldCreationModeOnClick");
            types_1.BoxVisibility.changeFieldToType = number;
            show(types_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else {
            types_1.BoxVisibility.changeFieldToType = -1;
            switchModeTo("worldCreationModeOn");
            hide(types_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        types_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeFieldClickedTo = changeFieldClickedTo;
    function addProductionBuilding(type, position, realm) {
        let maxBP = 0;
        switch (type) {
            case 0 /* CASTLE */:
                maxBP = types_1.Constants.CASTLE_BP;
                break;
            case 1 /* CITY */:
                maxBP = types_1.Constants.CITY_BP;
                break;
            case 2 /* FORTRESS */:
                maxBP = types_1.Constants.FORTRESS_BP;
                break;
            case 3 /* CAPITAL */:
                maxBP = types_1.Constants.CAPITAL_BP;
                break;
            case 4 /* CAPITAL_FORT */:
                maxBP = types_1.Constants.CAPITAL_FORTRESS_BP;
                break;
            default: break;
        }
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1] instanceof types_1.ProductionBuilding &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1]);
        if (entryInChangedBuildings == undefined) {
            types_1.Controls.changedBuildings.push([true, new types_1.ProductionBuilding(type, "", position, realm, maxBP)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        else if (entryInChangedBuildings[1].type !== type) {
            entryInChangedBuildings[1].type = type;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = types_1.GameState.buildings.find(building => building instanceof types_1.ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
        if (entryInActualBuildings == undefined) {
            types_1.GameState.buildings.push(new types_1.ProductionBuilding(type, "", position, realm, maxBP));
        }
        else if (entryInActualBuildings.type !== type) {
            entryInActualBuildings.type = type;
        }
        types_1.Drawing.drawStuff();
    }
    // add a castle in the selectedField
    function addCastle() {
        addProductionBuilding(0 /* CASTLE */, types_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCastle = addCastle;
    // add a city in the selectedField
    function addCity() {
        addProductionBuilding(1 /* CITY */, types_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCity = addCity;
    // add a fortress in the selectedField
    function addFortress() {
        addProductionBuilding(2 /* FORTRESS */, types_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addFortress = addFortress;
    // add a capital city in the selectedField
    function addCapital() {
        addProductionBuilding(3 /* CAPITAL */, types_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCapital = addCapital;
    // add a capital fortress in the selectedField
    function addCapitalFortress() {
        addProductionBuilding(4 /* CAPITAL_FORT */, types_1.Controls.selectedFields[0], factionToCreateBuildingsFor);
    }
    GodFunctions.addCapitalFortress = addCapitalFortress;
    function deleteProductionBuildingOnField(position) {
        let buildingToDelete = types_1.GameState.buildings.find(building => building instanceof types_1.ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1]);
            if (entryInChangedBuildings == undefined) {
                types_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            types_1.GameState.buildings.splice(types_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        types_1.Drawing.drawStuff();
    }
    // delete the production building in the selectedField
    function deleteSelectedProductionBuilding() {
        deleteProductionBuildingOnField(types_1.Controls.selectedFields[0]);
    }
    GodFunctions.deleteSelectedProductionBuilding = deleteSelectedProductionBuilding;
    function addNonDestructibleBuilding(type, position, secondPosition, realm) {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            entry[1].getSecondPosition()[0] === secondPosition[0] &&
            entry[1].getSecondPosition()[1] === secondPosition[1]);
        if (entryInChangedBuildings == undefined) {
            types_1.Controls.changedBuildings.push([true, new types_1.NonDestructibleBuilding(type, position, secondPosition, realm)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = types_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.getSecondPosition()[0] === secondPosition[0] &&
            building.getSecondPosition()[1] === secondPosition[1]);
        if (entryInActualBuildings == undefined) {
            types_1.GameState.buildings.push(new types_1.NonDestructibleBuilding(type, position, secondPosition, realm));
        }
        types_1.Drawing.drawStuff();
    }
    function deleteNonDestructibleBuilding(type, position, secondPosition) {
        let buildingToDelete = types_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.getSecondPosition()[0] === secondPosition[0] &&
            building.getSecondPosition()[1] === secondPosition[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                entry[1].getSecondPosition()[0] === secondPosition[0] &&
                entry[1].getSecondPosition()[1] === secondPosition[1]);
            if (entryInChangedBuildings == undefined) {
                types_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            types_1.GameState.buildings.splice(types_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        types_1.Drawing.drawStuff();
    }
    // adds a street in the target direction
    function addStreet(direction) {
        let targets = types_1.HexFunction.neighbors(types_1.Controls.selectedFields[0]);
        let target = targets[direction];
        addNonDestructibleBuilding(8 /* STREET */, types_1.Controls.selectedFields[0], target, factionToCreateBuildingsFor);
        types_1.Controls.selectedFields[0] = [target[0], target[1]];
        types_1.Drawing.drawStuff();
    }
    GodFunctions.addStreet = addStreet;
    // removes a street in the target direction
    function removeStreet(direction) {
        let targets = types_1.HexFunction.neighbors(types_1.Controls.selectedFields[0]);
        let target = targets[direction];
        deleteNonDestructibleBuilding(8 /* STREET */, types_1.Controls.selectedFields[0], target);
        types_1.Controls.selectedFields[0] = [target[0], target[1]];
        types_1.Drawing.resizeCanvas();
    }
    GodFunctions.removeStreet = removeStreet;
    // adds a river in the target direction
    function addRiver(direction) {
        let targets = types_1.HexFunction.neighbors(types_1.Controls.selectedFields[0]);
        let target = targets[direction];
        if (!types_1.GameState.rivers.some(river => (river.rightBank[0] === types_1.Controls.selectedFields[0][0] &&
            river.rightBank[1] === types_1.Controls.selectedFields[0][1] &&
            river.leftBank[0] === target[0] &&
            river.leftBank[1] === target[1]) ||
            (river.leftBank[0] === types_1.Controls.selectedFields[0][0] &&
                river.leftBank[1] === types_1.Controls.selectedFields[0][1] &&
                river.rightBank[0] === target[0] &&
                river.rightBank[1] === target[1]))) {
            types_1.GameState.rivers.push(new types_1.River(types_1.Controls.selectedFields[0], target));
        }
        types_1.Drawing.drawStuff();
    }
    GodFunctions.addRiver = addRiver;
    // removes a river in the target direction
    function removeRiver(direction) {
        let sf = types_1.Controls.selectedFields[0];
        let targets = types_1.HexFunction.neighbors(sf);
        let target = targets[direction];
        let indexToDelete = types_1.GameState.rivers.findIndex(river => (river.rightBank[0] === types_1.Controls.selectedFields[0][0] &&
            river.rightBank[1] === types_1.Controls.selectedFields[0][1] &&
            river.leftBank[0] === target[0] &&
            river.leftBank[1] === target[1]) ||
            (river.leftBank[0] === types_1.Controls.selectedFields[0][0] &&
                river.leftBank[1] === types_1.Controls.selectedFields[0][1] &&
                river.rightBank[0] === target[0] &&
                river.rightBank[1] === target[1]));
        if (indexToDelete != undefined) {
            types_1.GameState.rivers.splice(indexToDelete, 1);
        }
        types_1.Drawing.drawStuff();
    }
    GodFunctions.removeRiver = removeRiver;
    function addWall(type, position, direction, realm) {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            entry[1].facing === direction);
        if (entryInChangedBuildings == undefined) {
            types_1.Controls.changedBuildings.push([true, new types_1.Wall(type, position, realm, types_1.Constants.WALL_BP, direction, types_1.Constants.WALL_MAX_GUARD)]);
        }
        else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings = types_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.facing === direction);
        if (entryInActualBuildings == undefined) {
            types_1.GameState.buildings.push(new types_1.Wall(type, position, realm, types_1.Constants.WALL_BP, direction, types_1.Constants.WALL_MAX_GUARD));
        }
        types_1.Drawing.drawStuff();
    }
    function deleteWall(type, position, direction) {
        let buildingToDelete = types_1.GameState.buildings.find(building => building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            building.facing === direction);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings = types_1.Controls.changedBuildings.find(entry => entry[1].type === buildingToDelete.type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                entry[1].facing === direction);
            if (entryInChangedBuildings == undefined) {
                types_1.Controls.changedBuildings.push([false, buildingToDelete]);
            }
            else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            types_1.GameState.buildings.splice(types_1.GameState.buildings.findIndex(building => building === buildingToDelete), 1);
        }
        types_1.Drawing.drawStuff();
    }
    //add = true means add a building, else remove it.
    function manipulateBorderBuilding(type, direction, add) {
        let targets = types_1.HexFunction.neighbors(types_1.Controls.selectedFields[0]);
        let target = targets[direction];
        if (add) {
            if (type === 5 /* WALL */) {
                addWall(type, types_1.Controls.selectedFields[0], direction, factionToCreateBuildingsFor);
            }
            else {
                addNonDestructibleBuilding(type, types_1.Controls.selectedFields[0], target, factionToCreateBuildingsFor);
            }
        }
        else {
            if (type === 5 /* WALL */) {
                deleteWall(type, types_1.Controls.selectedFields[0], direction);
            }
            else {
                deleteNonDestructibleBuilding(type, types_1.Controls.selectedFields[0], target);
            }
        }
    }
    GodFunctions.manipulateBorderBuilding = manipulateBorderBuilding;
    // the function for the Gm posibility to make an army out of nothing
    function generateArmyBtn() {
        let armyMakerBox = types_1.GUI.getArmyGeneratorBox();
        types_1.BoxVisibility.ownerBuffer = armyMakerBox.getOwnerField().value;
        types_1.BoxVisibility.armyIdBuffer = Number(armyMakerBox.getArmyNumberField().value);
        types_1.BoxVisibility.countBuffer = Number(armyMakerBox.getCountField().value);
        types_1.BoxVisibility.leaderBuffer = Number(armyMakerBox.getLeaderField().value);
        types_1.BoxVisibility.mountsBuffer = Number(armyMakerBox.getMountsField().value);
        types_1.BoxVisibility.lkpBuffer = Number(armyMakerBox.getLKPField().value);
        types_1.BoxVisibility.skpBuffer = Number(armyMakerBox.getSKPField().value);
        types_1.BoxVisibility.guardBuffer = false;
        if (types_1.BoxVisibility.armyIdBuffer < 101 || types_1.BoxVisibility.armyIdBuffer > 399) {
            window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
            return false;
        }
        // check for any other armies with the same armyId
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            if (types_1.GameState.armies[i].getErkenfaraID() == types_1.BoxVisibility.armyIdBuffer &&
                types_1.GameState.armies[i].owner.tag === types_1.BoxVisibility.ownerBuffer) {
                window.alert("Ein Heer mit dieser Nummer existiert bereits in diesem Königreich.");
                return false;
            }
        }
        // check for catabults in a rider army, and for mounts in a rider army, or fleet
        if (Math.floor(types_1.BoxVisibility.armyIdBuffer / 100) == 2) {
            if (types_1.BoxVisibility.mountsBuffer > 0 || types_1.BoxVisibility.lkpBuffer > 0 || types_1.BoxVisibility.skpBuffer > 0) {
                window.alert("In einem Reiterheer sollten weder einzelne Reittiere, noch Katapulte sein. " +
                    "Wenn das Heer ein Fußheer sein sollte gib, ihm eine Nummer zwischen 100 und 199.");
                return false;
            }
        }
        else if (Math.floor(types_1.BoxVisibility.armyIdBuffer / 100) == 3) {
            if (types_1.BoxVisibility.mountsBuffer > 0) {
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
            types_1.GameState.armies[types_1.Controls.selectedArmyIndex] = types_1.GameState.armies[types_1.GameState.armies.length - 1];
            types_1.GameState.armies.pop();
        }
        else {
            // Do nothing!
        }
        types_1.Drawing.resizeCanvas();
    }
    GodFunctions.godDeleteSelectedArmy = godDeleteSelectedArmy;
    // This is used by the infoChangeBox to manipulate an armies Stats.
    function changeArmyInfo() {
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            let infoChangeBox = types_1.GUI.getInfoChangeBox();
            if (i != types_1.Controls.selectedArmyIndex && types_1.GameState.armies[i].owner.tag === infoChangeBox.getOwnerChangeInput().value &&
                types_1.GameState.armies[i].getErkenfaraID() === parseInt(infoChangeBox.getArmyIdChangeInput().value)) {
                window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
            }
            else {
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
                for (let i = 0; i > types_1.GameState.realms.length; i++) {
                    // check for the realm tag, not the Name
                    if (infoChangeBox.getOwnerChangeInput().value === types_1.GameState.realms[i].tag) {
                        types_1.GameState.armies[types_1.Controls.selectedArmyIndex].owner = types_1.GameState.realms[i];
                    }
                }
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setID(Number(infoChangeBox.getArmyIdChangeInput().value));
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setTroopCount(Number(infoChangeBox.getCountChangeInput().value));
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setOfficerCount(Number(infoChangeBox.getLeadersChangeInput().value));
                if (types_1.GameState.armies[types_1.Controls.selectedArmyIndex] instanceof types_1.FootArmy) {
                    let armyToChange = types_1.GameState.armies[types_1.Controls.selectedArmyIndex];
                    armyToChange.setMountCount(Number(infoChangeBox.getMountsChangeInput().value));
                }
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setLightCatapultCount(Number(infoChangeBox.getLKPChangeInput().value));
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setHeavyCatapultCount(Number(infoChangeBox.getSKPChangeInput().value));
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setMovePoints(Number(infoChangeBox.getMovePointsChangeInput().value));
                types_1.GameState.armies[types_1.Controls.selectedArmyIndex].setHeightPoints(Number(infoChangeBox.getHeightPointsChangeInput().value));
            }
        }
        types_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeArmyInfo = changeArmyInfo;
})(GodFunctions = exports.GodFunctions || (exports.GodFunctions = {}));
//# sourceMappingURL=godModeFunctions.js.map