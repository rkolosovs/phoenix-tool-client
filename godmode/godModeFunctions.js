"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: before pushing check added and deleted buildings if one is already inside the other, if it is then delete it.
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const productionBuilding_1 = require("../buildings/productionBuilding");
const hexFunctions_1 = require("../libraries/hexFunctions");
const river_1 = require("../map/river");
const controlVariables_1 = require("../controls/controlVariables");
var GodFunctions;
(function (GodFunctions) {
    var worldCreationModeOnClick = boxVisibilty_1.BoxVisibility.worldCreationModeOnClick;
    var changeFieldToType = boxVisibilty_1.BoxVisibility.changeFieldToType;
    var hide = boxVisibilty_1.BoxVisibility.hide;
    var show = boxVisibilty_1.BoxVisibility.show;
    var switchModeTo = boxVisibilty_1.BoxVisibility.switchModeTo;
    var changedBuildings = controlVariables_1.Controls.changedBuildings;
    let factionToCreateBuildingsFor = gameState_1.GameState.realms[0];
    function setFactionToCreateBuildingsFor(faction) {
        factionToCreateBuildingsFor = faction;
    }
    GodFunctions.setFactionToCreateBuildingsFor = setFactionToCreateBuildingsFor;
    function toggleOnClickWorldCreationMode() {
        if (worldCreationModeOnClick && (changeFieldToType == -1)) {
            worldCreationModeOnClick = false;
            hide(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else if (!worldCreationModeOnClick || (worldCreationModeOnClick && (changeFieldToType != -1))) {
            changeFieldToType = -1;
            worldCreationModeOnClick = true;
            show(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.toggleOnClickWorldCreationMode = toggleOnClickWorldCreationMode;
    function changeFieldClickedTo(number) {
        if (changeFieldToType != number) {
            switchModeTo("worldCreationModeOnClick");
            changeFieldToType = number;
            show(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        else {
            changeFieldToType = -1;
            switchModeTo("worldCreationModeOn");
            hide(gui_1.GUI.getWorldBenderBox().getCreationWarning());
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeFieldClickedTo = changeFieldClickedTo;
    // add a castle in the selectedField
    function addCastle() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] == sf[1]) {
                gameState_1.GameState.buildings[i].type = 0;
                found = true;
            }
        }
        if (found) {
            changedBuildings.push([true, { "type": 0, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]); //<----------------------------------------Realm
            // console.log({"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
        }
        else {
            changedBuildings.push([true, { "type": 0, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(0, [sf[0], sf[1]], factionToCreateBuildingsFor, 500)); //TODO correct BP
            // console.log("this is a new:");
            // console.log(changedBuildings[changedBuildings.length-1]);
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addCastle = addCastle;
    // add a city in the selectedField
    function addCity() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
                gameState_1.GameState.buildings[i].type = 1;
                found = true;
            }
        }
        if (found) {
            changedBuildings.push([true, { "type": 1, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            // console.log({"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
        }
        else {
            changedBuildings.push([true, { "type": 1, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(1, [sf[0], sf[1]], factionToCreateBuildingsFor, 500)); //TODO correct BP
            // console.log("this is a new:");
            // console.log(changedBuildings[changedBuildings.length-1]);
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addCity = addCity;
    // add a fortress in the selectedField
    function addFortress() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
                gameState_1.GameState.buildings[i].type = 2;
                found = true;
            }
        }
        if (found) {
            changedBuildings.push([true, { "type": 2, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            // console.log({"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
        }
        else {
            changedBuildings.push([true, { "type": 2, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(2, [sf[0], sf[1]], factionToCreateBuildingsFor, 500)); //TODO correct BP
            // console.log("this is a new:");
            // console.log(changedBuildings[changedBuildings.length-1]);
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addFortress = addFortress;
    // add a capital city in the selectedField
    function addCapital() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
                gameState_1.GameState.buildings[i].type = 3;
                found = true;
            }
        }
        if (found) {
            changedBuildings.push([true, { "type": 3, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            // console.log({"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
        }
        else {
            changedBuildings.push([true, { "type": 3, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(3, [sf[0], sf[1]], factionToCreateBuildingsFor, 500)); //TODO correct BP
            // console.log("this is a new:");
            // console.log(changedBuildings[changedBuildings.length-1]);
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addCapital = addCapital;
    // add a capital fortress in the selectedField
    function addCapitalFortress() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
                gameState_1.GameState.buildings[i].type = 4;
                found = true;
            }
        }
        if (found) {
            changedBuildings.push([true, { "type": 4, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            // console.log({"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
        }
        else {
            changedBuildings.push([true, { "type": 4, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
            gameState_1.GameState.buildings.push(new productionBuilding_1.ProductionBuilding(4, [sf[0], sf[1]], factionToCreateBuildingsFor, 500)); //TODO correct BP
            // console.log("this is a new:");
            // console.log(changedBuildings[changedBuildings.length-1]);
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addCapitalFortress = addCapitalFortress;
    // delete the building in the selectedField
    function deleteBuilding() {
        let sf = controlVariables_1.Controls.selectedFields[0];
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
                changedBuildings.push([false, { "type": building.type, "x": sf[0], "y": sf[1], "realm": factionToCreateBuildingsFor }]);
                if (i === gameState_1.GameState.buildings.length - 1) {
                    gameState_1.GameState.buildings.pop();
                }
                else {
                    gameState_1.GameState.buildings[i] = gameState_1.GameState.buildings.pop();
                }
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.deleteBuilding = deleteBuilding;
    // adds a street in the target direction
    function addStreet(direction) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let targets = hexFunctions_1.HexFunction.neighbors(sf[0], sf[1]);
        let target = targets[direction];
        let found = false;
        for (let i = 0; i < buildings.length; i++) {
            let building = buildings[i]; //TODO change this to accomodate new Types probably with differentlist for streets
            if ((building.type === 8 && (building.firstX === sf[0] && building.firstY === sf[1] && building.secondX === target[0] && building.secondY === target[1])) ||
                (building.type === 8 && (building.firstX === target[0] && building.firstY === target[1] && building.secondX === sf[0] && building.secondY === sf[1]))) {
                found = true;
            }
        }
        if (found) {
        }
        else {
            changedBuildings.push([true, { "type": 8, "firstX": sf[0], "firstY": sf[1], "secondX": target[0], "secondY": target[1], "realm": factionToCreateBuildingsFor }]);
            buildings.push({ "type": 8, "firstX": sf[0], "firstY": sf[1], "secondX": target[0], "secondY": target[1], "realm": factionToCreateBuildingsFor });
            controlVariables_1.Controls.selectedFields[0] = [target[0], target[1]];
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addStreet = addStreet;
    // removes a street in the target direction
    function removeStreet(direction) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let targets = hexFunctions_1.HexFunction.neighbors(sf[0], sf[1]);
        let target = targets[direction];
        let found = undefined;
        for (let i = 0; i < buildings.length; i++) {
            let building = buildings[i]; //TODO change this to accomodate new Types probably with differentlist for streets
            if (building.type === 8 && ((building.firstX === sf[0] && building.firstY === sf[1] && building.secondX === target[0] && building.secondY === target[1]) ||
                (building.firstX === target[0] && building.firstY === target[1] && building.secondX === sf[0] && building.secondY === sf[1]))) {
                found = i;
            }
        }
        if (found != undefined) {
            changedBuildings.push([false, { "type": 8, "firstX": sf[0], "firstY": sf[1], "secondX": target[0], "secondY": target[1], "realm": factionToCreateBuildingsFor }]);
            if (found == buildings.length - 1) {
                buildings.pop();
                controlVariables_1.Controls.selectedFields[0] = [target[0], target[1]];
            }
            else {
                buildings[found] = buildings.pop();
                controlVariables_1.Controls.selectedFields[0] = [target[0], target[1]];
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.removeStreet = removeStreet;
    // adds a river in the target direction
    function addRiver(direction) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let targets = hexFunctions_1.HexFunction.neighbors(sf[0], sf[1]);
        let target = targets[direction];
        let found = false;
        for (let i = 0; i < gameState_1.GameState.rivers.length; i++) {
            let river = gameState_1.GameState.rivers[i];
            if ((river.rightBank[0] === sf[0] && river.rightBank[1] === sf[1] && river.leftBank[0] === target[0] && river.leftBank[1] === target[1]) ||
                (river.leftBank[0] === sf[0] && river.leftBank[1] === sf[1] && river.rightBank[0] === target[0] && river.rightBank[1] === target[1])) {
                found = true;
            }
        }
        if (found) {
        }
        else {
            gameState_1.GameState.rivers.push(new river_1.River([sf[0], sf[1]], [target[0], target[1]]));
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.addRiver = addRiver;
    // removes a river in the target direction
    function removeRiver(direction) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let targets = hexFunctions_1.HexFunction.neighbors(sf[0], sf[1]);
        let target = targets[direction];
        let found = undefined;
        for (let i = 0; i < gameState_1.GameState.rivers.length; i++) {
            let river = gameState_1.GameState.rivers[i];
            if ((river.rightBank[0] == sf[0] && river.rightBank[1] == sf[1] && river.leftBank[0] == target[0] && river.leftBank[1] == target[1]) ||
                (river.leftBank[0] == sf[0] && river.leftBank[1] == sf[1] && river.rightBank[0] == target[0] && river.rightBank[1] == target[1])) {
                found = i;
            }
        }
        if (found != undefined) {
            if (found == gameState_1.GameState.rivers.length - 1) {
                gameState_1.GameState.rivers.pop();
            }
            else {
                gameState_1.GameState.rivers[found] = gameState_1.GameState.rivers.pop();
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.removeRiver = removeRiver;
    //add = true means add a building, else remove it.
    function manipulateBorderBuilding(type, direction, add) {
        let sf = controlVariables_1.Controls.selectedFields[0];
        let found = undefined;
        for (let i = 0; i < buildings.length; i++) {
            let building = buildings[i];
            if (building.type == type && (building.x == sf[0] && building.y == sf[1] && building.direction == direction)) {
                found = i;
            }
        }
        if (add) {
            if (found) {
                changedBuildings.push([true, { "type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm": factionToCreateBuildingsFor }]);
            }
            else {
                changedBuildings.push([true, { "type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm": factionToCreateBuildingsFor }]);
                buildings.push({ "type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm": factionToCreateBuildingsFor });
            }
        }
        else {
            if (found != undefined) {
                changedBuildings.push([false, { "type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm": factionToCreateBuildingsFor }]);
                if (found == buildings.length - 1) {
                    buildings.pop();
                }
                else {
                    buildings[found] = buildings.pop();
                }
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
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
        // TODO be able to generate guard armies
        boxVisibilty_1.BoxVisibility.guardBuffer = false;
        if (boxVisibilty_1.BoxVisibility.armyIdBuffer < 101 || boxVisibilty_1.BoxVisibility.armyIdBuffer > 399) {
            window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
            return false;
        }
        // check for any other armies with the same armyId
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].armyId == boxVisibilty_1.BoxVisibility.armyIdBuffer &&
                gameState_1.GameState.armies[i].owner === boxVisibilty_1.BoxVisibility.ownerBuffer) {
                window.alert("Ein Heer mit dieser Nummer existiert bereits in diesem Königreich.");
                return false;
            }
        }
        // check for catabults in a rider army, and for mounts in a rider army, or fleet
        if (Math.floor(boxVisibilty_1.BoxVisibility.armyIdBuffer / 100) == 2) {
            if (boxVisibilty_1.BoxVisibility.mountsBuffer > 0 || boxVisibilty_1.BoxVisibility.lkpBuffer > 0 || boxVisibilty_1.BoxVisibility.skpBuffer > 0) {
                window.alert("In einem Reiterheer sollten weder einzelne Reittiere, noch Katapulte sein. Wenn das Heer ein Fußheer sein sollte gib, ihm eine Nummer zwischen 100 und 199.");
                return false;
            }
        }
        else if (Math.floor(boxVisibilty_1.BoxVisibility.armyIdBuffer / 100) == 3) {
            if (boxVisibilty_1.BoxVisibility.mountsBuffer > 0) {
                window.alert("In einer Flotte sollten keine Reittiere enthalten sein. Wenn das Heer ein Fußheer sein sollte, gib ihm eine Nummer zwischen 100 und 199.");
                return false;
            }
        }
        switchModeTo("armyWithNextClick");
        return true;
    }
    GodFunctions.generateArmyBtn = generateArmyBtn;
    // used to delete the selected army
    function godDeleteSelectedArmy() {
        if (confirm('Are you sure you want to delete your currenty selected army?')) {
            gameState_1.GameState.armies[selectedArmyIndex] = gameState_1.GameState.armies[gameState_1.GameState.armies.length - 1];
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
            if (i != selectedArmyIndex && gameState_1.GameState.armies[i].owner === infoChangeBox.getOwnerChangeInput().value &&
                gameState_1.GameState.armies[i].armyId === infoChangeBox.getArmyIdChangeInput().value) {
                window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
            }
            else {
                gameState_1.GameState.armies[selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
                gameState_1.GameState.armies[selectedArmyIndex].owner = infoChangeBox.getOwnerChangeInput().value;
                gameState_1.GameState.armies[selectedArmyIndex].armyId = Number(infoChangeBox.getArmyIdChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].count = Number(infoChangeBox.getCountChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].leaders = Number(infoChangeBox.getLeadersChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].mounts = Number(infoChangeBox.getMountsChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].lkp = Number(infoChangeBox.getLKPChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].skp = Number(infoChangeBox.getSKPChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].remainingMovePoints = Number(infoChangeBox.getMovePointsChangeInput().value);
                gameState_1.GameState.armies[selectedArmyIndex].remainingHeightPoints = Number(infoChangeBox.getHeightPointsChangeInput().value);
            }
        }
        drawingFunctions_1.Drawing.resizeCanvas();
    }
    GodFunctions.changeArmyInfo = changeArmyInfo;
})(GodFunctions = exports.GodFunctions || (exports.GodFunctions = {}));
