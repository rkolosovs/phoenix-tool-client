"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controlVariables_1 = require("../Controls/controlVariables");
const gameState_1 = require("../gameState");
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const hexFunctions_1 = require("../libraries/hexFunctions");
const wall_1 = require("../buildings/wall");
const footArmy_1 = require("./footArmy");
const riderArmy_1 = require("./riderArmy");
// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null),
// schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
// TODO define chars
function fernkampf(dicerollsL, dicerollsS, shooter, target, targetField, chars) {
    let charGpSum = 0;
    if (chars != undefined) {
        let cLen = chars.length;
        for (let i = 0; i < cLen; i++) {
            charGpSum += chars[i].gp;
        }
    }
    let damage = shooter.fireLightCatapults(dicerollsL, checkShootingCondition(shooter, targetField, false)) +
        shooter.fireHeavyCatapults(dicerollsS, checkShootingCondition(shooter, targetField, true));
    let allTargets = [];
    let sumAllBP = 0;
    if (target === "On Field") {
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            if (gameState_1.GameState.buildings[i].getPosition()[0] === targetField[0] && gameState_1.GameState.buildings[i].getPosition()[1] === targetField[1] && gameState_1.GameState.buildings[i].type < 5) {
                //TODO building takes 2/3 damage
                //building[i].takeFire(damage * (2/3));
                damage = damage * (1 / 3);
            }
        }
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getPosition()[0] === targetField[0] && gameState_1.GameState.armies[i].getPosition()[1] === targetField[1]) {
                allTargets.push(gameState_1.GameState.armies[i]);
                sumAllBP += gameState_1.GameState.armies[i].sumBP();
            }
        }
        for (let i = 0; i < allTargets.length; i++) {
            //target may be a building. GameState.buildings need to have this funktion
            allTargets[i].takeFire(damage / (1 + (allTargets[i].leaderGp() + charGpSum) / 100) * (allTargets[i].sumBP() / sumAllBP));
        }
    }
    //TODO Wall Damage
    checkArmiesForLiveliness();
    shooter.addLightCatapultsShot(dicerollsL.length);
    shooter.addHeavyCatapultsShot(dicerollsS.length);
    //check to see if shooting after moving and stop the army if it moved this turn.
    if (shooter.remainingMovePoints <= shooter.startingMovepoints) {
        shooter.remainingMovePoints = 0;
        shooter.possibleMoves = [];
    }
}
function checkAllShootingConditions(army, targetTileList) {
    let templist = targetTileList.slice();
    let hasSKP = false;
    if (army.getHeavyCatapultCount() - army.getHeavyCatapultsShot() > 0) {
        hasSKP = true;
    }
    //to find out the conditions and maybe kick out if not shootable
    for (let i = templist.length - 1; i >= 0; i--) {
        if (checkShootingCondition(army, templist[i], hasSKP) === 'impossible shot') {
            targetTileList.splice(i, 1);
        }
    }
    return targetTileList;
}
function checkShootingCondition(army, target, skpShot) {
    let condition = 'impossible shot';
    let range = hexFunctions_1.HexFunction.distance([army.getPosition()[0], army.getPosition()[1]], target);
    if (skpShot) {
        if (range == 1) {
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 2) {
                condition = 'high';
            }
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1) {
                condition = 'short';
            }
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 1 &&
                findWallInWay([army.getPosition()[0], army.getPosition()[1]], target).length > 0) {
                condition = 'high';
            }
        }
        else if (range == 2) {
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1) {
                condition = 'farAndUp';
            }
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) < 1) {
                condition = 'far';
            }
            if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 0 &&
                findWallInWay([army.getPosition()[0], army.getPosition()[1]], target).length > 0) {
                condition = 'farAndUp';
            }
            //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
            let commonNeig = hexFunctions_1.HexFunction.findCommonNeighbor([army.getPosition()[0], army.getPosition()[1]], target);
            let walls = findWallInWay([army.getPosition()[0], army.getPosition()[1]], target);
            for (let i = 0; i < commonNeig.length; i++) {
                if (walls.length > 0) {
                    for (let j = 0; j < walls.length; j++) {
                        if (((hexFunctions_1.HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) -
                            hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 1)
                            && gameState_1.GameState.buildings[walls[j]].getPosition()[0] === commonNeig[i][0] &&
                            gameState_1.GameState.buildings[walls[j]].getPosition()[1] === commonNeig[i][1])) {
                            condition = 'impossible shot';
                        }
                    }
                }
                if (hexFunctions_1.HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) -
                    hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) > 1) {
                    condition = 'impossible shot';
                }
            }
        }
    }
    else {
        if (hexFunctions_1.HexFunction.height(target) - hexFunctions_1.HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1) {
            condition = 'lkp';
        }
    }
    return condition;
}
//to fill the targetList(fields)
function findPossibleTargetFields() {
    findShootingTargets(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex]);
}
//to find all fields in a two tile proximity
function findShootingTargets(army) {
    let tilesInRange = [];
    if (army.getHeavyCatapultCount() - army.getHeavyCatapultsShot() > 0) {
        tilesInRange = hexFunctions_1.HexFunction.neighborInRange([army.getPosition()[0], army.getPosition()[0]], 2);
    }
    else if (army.getLightCatapultCount() - army.getLightCatapultsShot() > 0) {
        tilesInRange = hexFunctions_1.HexFunction.neighborInRange([army.getPosition()[0], army.getPosition()[0]], 1);
    }
    army.targetList = checkAllShootingConditions(army, tilesInRange);
}
function findWallInWay(from, to) {
    let foundWallsIndeces = [];
    let dir = hexFunctions_1.HexFunction.getDirectionToNeighbor(from, to);
    if (hexFunctions_1.HexFunction.distance(from, to) === 1) {
        dir = (dir + 3) % 6;
        let wallIndex = getWallIndexOnFieldInDirection(to, dir);
        if (wallIndex != -1) {
            foundWallsIndeces.push(wallIndex);
            return foundWallsIndeces;
        }
    }
    else if (hexFunctions_1.HexFunction.distance(from, to) === 2) {
        if (dir % 1 === 0) {
            let commonNeig = hexFunctions_1.HexFunction.findCommonNeighbor(from, to);
            if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
            }
            dir = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
            }
            if (getWallIndexOnFieldInDirection(to, dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dir));
            }
        }
        else {
            let commonNeig = hexFunctions_1.HexFunction.findCommonNeighbor(from, to);
            dir = Math.floor(dir);
            let dirCommon1 = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
            }
            dirCommon1 = (dir + 1) % 6;
            if (getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
            }
            let dirCommon2 = (dir + 4) % 6;
            if (getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
            }
            dirCommon2 = dir;
            if (getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
            }
            let dirTarget = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection(to, dirTarget) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
            }
            dirTarget = (dir + 4) % 6;
            if (getWallIndexOnFieldInDirection(to, dirTarget) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
            }
        }
    }
    return foundWallsIndeces;
}
//returns all walls on target field
function getWallIndexOnFieldInDirection(hex, direction) {
    for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
        if (gameState_1.GameState.buildings[i] instanceof wall_1.Wall) {
            let thisIsAWall = gameState_1.GameState.buildings[i];
            if (thisIsAWall.getPosition()[0] === hex[0] &&
                thisIsAWall.getPosition()[1] === hex[1] && thisIsAWall.facing === convertDirection(direction)) {
                return i;
            }
        }
    }
    return -1;
}
function convertDirection(dir) {
    switch (dir) {
        case 0: return "nw";
        case 1: return "ne";
        case 2: return "e";
        case 3: return "se";
        case 4: return "sw";
        case 5: return "w";
        default: return "nw";
    }
}
//to actually shoot stuff, with events
function shoot() {
    if (login == 'guest') {
        window.alert("Zuschauer haben keine Rechte.");
        return false;
    }
    let LKPshooting = parseInt(gui_1.GUI.getShootingLKPInput().value);
    let SKPshooting = parseInt(gui_1.GUI.getShootingSKPInput().value);
    let shootingarmy = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex];
    if (isNaN(LKPshooting) || LKPshooting === undefined) {
        LKPshooting = 0;
    }
    if (isNaN(SKPshooting) || SKPshooting === undefined) {
        SKPshooting = 0;
    }
    if (shootingarmy.lkp - shootingarmy.LKPShotThisTurn < LKPshooting) {
        window.alert("Die Armee hat nur noch " + (shootingarmy.lkp - shootingarmy.LKPShotThisTurn) + " leichte Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        return false;
    }
    if (shootingarmy.skp - shootingarmy.SKPShotThisTurn < SKPshooting) {
        window.alert("Die Armee hat nur noch " + (shootingarmy.skp - shootingarmy.SKPShotThisTurn) + " schwere Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        return false;
    }
    if (LKPshooting > shootingarmy.lkp) {
        window.alert("Die Armee hat nicht genug leichte Katapulte/Kriegsschiffe");
        return false;
    }
    if (SKPshooting > shootingarmy.skp) {
        window.alert("Die Armee hat nicht genug schwere Katapulte/Kriegsschiffe");
        return false;
    }
    if (LKPshooting === 0 && SKPshooting === 0) {
        window.alert("Sie müssen eine Anzahl Katapulte eintragen");
        return false;
    }
    if (controlVariables_1.Controls.selectedFields[1] === undefined) {
        window.alert("Wählen Sie ein Feld auf das Sie schießen wollen");
        return false;
    }
    if (shootingarmy.targetList === undefined) {
        window.alert("bitte Zielen Sie erst");
        return false;
    }
    else {
        let aimedTargetFound = false;
        for (let i = 0; i < shootingarmy.targetList.length; i++) {
            if (shootingarmy.targetList[i][0] === controlVariables_1.Controls.selectedFields[1][0] && shootingarmy.targetList[i][1] === controlVariables_1.Controls.selectedFields[1][1]) {
                aimedTargetFound = true;
            }
        }
        if (aimedTargetFound === false) {
            window.alert("Schießen Sie auf ein markiertes Feld");
            return false;
        }
    } //TODO get target to shoot at
    let target = "On Field";
    //check for mixed shooting(reachable by both lkp and skp)
    if (LKPshooting < 0) {
        let cond = checkShootingCondition(shootingarmy, controlVariables_1.Controls.selectedFields[1], false);
        if (cond === 'impossible shot') {
            window.alert("Sie müssen auf ein gemeinsam erreichbares Feld schießen");
            return false;
        }
    }
    preparedEvents.push({
        type: "shoot", content: {
            shooterID: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
            realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
            LKPcount: LKPshooting,
            SKPcount: SKPshooting,
            toX: controlVariables_1.Controls.selectedFields[1][0],
            toY: controlVariables_1.Controls.selectedFields[1][1],
            target: target,
            fromX: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
            fromY: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
        }
    });
    shootingarmy.LKPShotThisTurn += LKPshooting;
    shootingarmy.SKPShotThisTurn += SKPshooting;
    //check to see if shooting after moving and stop the army if it moved this turn.
    if (shootingarmy.remainingMovePoints <= shootingarmy.startingMovepoints) {
        shootingarmy.remainingMovePoints = 0;
        shootingarmy.possibleMoves = [];
    }
    boxVisibilty_1.BoxVisibility.updateInfoBox();
    window.alert("Die Geschosse sind unterwegs.");
}
// the splitArmy funtion of the split box
// TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
function splitSelectedArmy() {
    if (login == 'guest') {
        window.alert("Zuschauer haben keine Rechte.");
        return false;
    }
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].isGuard) {
        window.alert("Garde Armeen können nicht geteilt werden.");
        return false;
    }
    let toSplit = 0;
    let leadersToSplit = 0;
    let mountsToSplit = 0;
    let lkpToSplit = 0;
    let skpToSplit = 0;
    // depending on army type different fields are needed
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 1) {
        toSplit = parseInt(gui_1.GUI.getSplitInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
        mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
        lkpToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
        skpToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
        if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count - 100)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit < 100) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.");
            return false;
        }
        if (mountsToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mounts) {
            window.alert("So viele Reittiere hast du nicht.");
            return false;
        }
        if (lkpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp) {
            window.alert("So viele leichte Katapulte hast du nicht.");
            return false;
        }
        if (skpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp) {
            window.alert("So viele schwere Katapulte hast du nicht.");
            return false;
        }
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 2) {
        toSplit = parseInt(gui_1.GUI.getSplitMountedInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitMountedLeadersInput().value);
        if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count - 50)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit < 50) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)");
            return false;
        }
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 3) {
        toSplit = parseInt(gui_1.GUI.getSplitFleetInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitFleetLeadersInput().value);
        lkpToSplit = parseInt(gui_1.GUI.getSplitFleetLkpInput().value);
        skpToSplit = parseInt(gui_1.GUI.getSplitFleetSkpInput().value);
        if (toSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count - 1)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit * 100 > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].currentCapacity())) {
            window.alert("Du kannst keine beladenen Schiffe abspalten.");
            return false;
        }
        if (toSplit < 1) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)");
            return false;
        }
        if (lkpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp) {
            window.alert("So viele leichte Kriegsschiffe hast du nicht.");
            return false;
        }
        if (skpToSplit > gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp) {
            window.alert("So viele schwere Kriegsschiffe hast du nicht.");
            return false;
        }
    }
    if (leadersToSplit > (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders - 1)) {
        window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
        return false;
    }
    if (leadersToSplit < 1) {
        window.alert("Es muss mindestens 1 Heerführer abgespalten werden.");
        return false;
    }
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() == 1) {
        let newArmyId = generateArmyId(1, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner);
        if (newArmyId !== false) {
            newArmyId = newArmyId;
        }
        else {
            return false;
        }
        let newArmy = new footArmy_1.FootArmy(newArmyId, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, [gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[0],
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[1]], gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getMovePoints(), gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getHeightPoints(), false);
        gameState_1.GameState.armies.push(newArmy);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeSoldiers(toSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeLeaders(leadersToSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeLkp(lkpToSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeSkp(skpToSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeMounts(mountsToSplit);
        gameState_1.GameState.armies.push({
            type: "split", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: lkpToSplit,
                skp: skpToSplit,
                mounts: mountsToSplit,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() == 2) {
        let newArmyId = generateArmyId(2, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner);
        if (newArmyId !== false) {
            newArmyId = newArmyId;
        }
        else {
            return false;
        }
        let newArmy = new riderArmy_1.RiderArmy(newArmyId, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, toSplit, leadersToSplit, [gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[0],
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[1]], gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getMovePoints(), gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getHeightPoints(), false);
        gameState_1.GameState.armies.push(newArmy);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeSoldiers(toSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeLeaders(leadersToSplit);
        preparedEvents.push({
            type: "split", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() == 3) {
        let newArmyId = generateArmyId(3, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner);
        if (newArmyId !== false) {
            newArmyId = newArmyId;
        }
        else {
            return false;
        }
        let newArmy = new Fleet(newArmyId, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner, toSplit, leadersToSplit, lkpToSplit, skpToSplit, [gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[0],
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getPosition()[1]], gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].getMovePoints(), false);
        gameState_1.GameState.armies.push(newArmy);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeSoldiers(toSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeLeaders(leadersToSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeLkp(lkpToSplit);
        gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].removeSkp(skpToSplit);
        preparedEvents.push({
            type: "split", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: lkpToSplit,
                skp: skpToSplit,
                mounts: 0,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    boxVisibilty_1.BoxVisibility.restoreInfoBox();
    boxVisibilty_1.BoxVisibility.updateInfoBox();
}
// the mount function of the mount box
function mountSelected() {
    let toMount = gui_1.GUI.getMountInput().value;
    let leadersToMount = gui_1.GUI.getMountLeaderInput().value;
    mountWithParams(controlVariables_1.Controls.selectedArmyIndex, toMount, leadersToMount, null);
}
// mounting with parameters
//TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
function mountWithParams(armyIndex, toMountIn, leadersToMountIn, newArmyId) {
    if (toMountIn === "" || leadersToMountIn === "" || toMountIn === null || leadersToMountIn === null) {
        window.alert("Alle felder müssen ausgefüllt sein");
        return false;
    }
    let toMount = 0;
    let leadersToMount = 0;
    if (isNaN(Number(toMountIn)) || isNaN(Number(leadersToMountIn))) {
        window.alert("Tragen sie Zahlen für Truppen und Heerführer ein.");
        return false;
    }
    else {
        toMount = Number(toMountIn);
        leadersToMount = Number(leadersToMountIn);
    }
    // generiere armyId falls keine vorhanden
    if (newArmyId === null) {
        newArmyId = generateArmyId(2, gameState_1.GameState.armies[armyIndex].owner);
    }
    // sitzen genug Truppen auf?
    if (toMount < 50) {
        window.alert("Es müssen mindestens 50 Reiter in einem Reiterheer sein.");
        return false;
    }
    // sitzen genug Heerführer auf?
    if (leadersToMount < 1) {
        window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
        return false;
    }
    // bleibt ein Hf bei der armee zurück?
    if (toMount != gameState_1.GameState.armies[armyIndex].count && leadersToMount === gameState_1.GameState.armies[armyIndex].leaders) {
        window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
        return false;
    }
    // genug Truppen vorhanden?
    if (toMount != gameState_1.GameState.armies[armyIndex].count && (toMount * 2 > gameState_1.GameState.armies[armyIndex].raumpunkteOhneHf() - 100)) {
        window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
        return false;
        // genug Reittiere vorhanden?
    }
    // genug Truppen vorhanden?
    if (toMount > gameState_1.GameState.armies[armyIndex].count) {
        window.alert("Du hast zu wenige Truppen zum aufsitzen");
        return false;
        // genug Reittiere vorhanden?
    }
    else if (toMount > gameState_1.GameState.armies[armyIndex].mounts) {
        window.alert("Du hast zu wenige Reittiere zum aufsitzen");
        return false;
        // Sitzen alle auf?
    }
    else if (toMount === gameState_1.GameState.armies[armyIndex].count) {
        // neues Reiterheer mit generierter Id an selben Koordinaten
        let newArmy = new riderArmy_1.RiderArmy(newArmyId, toMount, gameState_1.GameState.armies[armyIndex].leaders, gameState_1.GameState.armies[armyIndex].isGuard, gameState_1.GameState.armies[armyIndex].x, gameState_1.GameState.armies[armyIndex].y, gameState_1.GameState.armies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(gameState_1.GameState.armies[armyIndex].remainingHeightPoints);
        if (gameState_1.GameState.armies[armyIndex].remainingMovePoints !== gameState_1.GameState.armies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.getMaxMovePoints());
        // Nachricht, falls Katapulte vorhanden waren.
        if (gameState_1.GameState.armies[armyIndex].skp > 0 || gameState_1.GameState.armies[armyIndex].lkp > 0) {
            window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.");
        }
        // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
        gameState_1.GameState.armies.push(newArmy);
        //in preparedEvents pushen
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: gameState_1.GameState.armies[armyIndex].armyId,
                realm: gameState_1.GameState.armies[armyIndex].ownerTag(),
                troops: toMount,
                leaders: leadersToMount,
                x: gameState_1.GameState.armies[armyIndex].x,
                y: gameState_1.GameState.armies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        deleteArmy(armyIndex);
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        drawingFunctions_1.Drawing.drawStuff();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
    }
    else if (leadersToMount >= gameState_1.GameState.armies[armyIndex].leaders) {
        window.alert("Du hast zu wenige Heerführer zum aufsitzen");
    }
    else if (gameState_1.GameState.armies[armyIndex].isGuard) {
        window.alert("Die Garde muss zusammen bleiben");
    }
    else {
        // neues Reiterheer mit generierter Id an selben Koordinaten
        let newArmy = new riderArmy_1.RiderArmy(newArmyId, toMount, leadersToMount, false, gameState_1.GameState.armies[armyIndex].x, gameState_1.GameState.armies[armyIndex].y, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].owner);
        newArmy.setRemainingHeightPoints(gameState_1.GameState.armies[armyIndex].remainingHeightPoints);
        if (gameState_1.GameState.armies[armyIndex].remainingMovePoints !== gameState_1.GameState.armies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // zahlen im alten Heer anpassen
        gameState_1.GameState.armies[armyIndex].removeSoldiers(toMount);
        gameState_1.GameState.armies[armyIndex].removeLeaders(leadersToMount);
        gameState_1.GameState.armies[armyIndex].removeMounts(toMount);
        // in GameState.armies einfügen
        gameState_1.GameState.armies.push(newArmy);
        //in preparedEvents pushen
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: gameState_1.GameState.armies[armyIndex].armyId,
                realm: gameState_1.GameState.armies[armyIndex].ownerTag(),
                troops: toMount,
                leaders: leadersToMount,
                x: gameState_1.GameState.armies[armyIndex].x,
                y: gameState_1.GameState.armies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        // Controls.selectedArmyIndex zeigt auf neues Heer
        controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
        drawingFunctions_1.Drawing.drawStuff();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
    }
}
// the unMount function of the unMount box
function unMountSelected() {
    let toUnMount = gui_1.GUI.getUnMountInput().value;
    let leadersToUnMount = gui_1.GUI.getUnMountLeaderInput().value;
    unMountWithParams(controlVariables_1.Controls.selectedArmyIndex, toUnMount, leadersToUnMount, null);
}
// the unMount function of the unMount box
//TODO: If the mounted army has moved, set the new foot army's move points to the apropriate, non-max value.
function unMountWithParams(armyIndex, toUnMount, leadersToUnMount, newArmyId) {
    if (toUnMount === "" || leadersToUnMount === "" || toUnMount == undefined || leadersToUnMount == undefined) {
        window.alert("Alle felder müssen ausgefüllt sein");
        return false;
    }
    // generiere armyId falls keine vorhanden
    if (newArmyId === null) {
        newArmyId = generateArmyId(1, gameState_1.GameState.armies[armyIndex].owner);
    }
    // sitzen genug Truppen ab?
    if (toUnMount < 100) {
        window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
        return false;
    }
    // bleibt ein hf be der Armee?
    if (toUnMount != gameState_1.GameState.armies[armyIndex].count && leadersToUnMount === gameState_1.GameState.armies[armyIndex].leaders) {
        window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
        return false;
    }
    // genug Truppen vorhanden?
    if (toUnMount != gameState_1.GameState.armies[armyIndex].count && (toUnMount * 2 > gameState_1.GameState.armies[armyIndex].raumpunkteOhneHf() - 100)) {
        window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
        return false;
        // genug Reittiere vorhanden?
    }
    // sitzen genug Heerführer ab?
    if (leadersToUnMount < 1) {
        window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
        return false;
    }
    console.log(toUnMount);
    if (toUnMount > gameState_1.GameState.armies[armyIndex].count) {
        window.alert("So viele Truppen hast du nicht zum absitzen");
        return false;
        // genug Truppen vorhanden?
    }
    else if ((toUnMount == gameState_1.GameState.armies[armyIndex].count)) {
        // neues Heer mit generierter Id an selben Koordinaten
        let newArmy = new footArmy_1.FootArmy(newArmyId, toUnMount, gameState_1.GameState.armies[armyIndex].leaders, 0, 0, toUnMount, gameState_1.GameState.armies[armyIndex].isGuard, gameState_1.GameState.armies[armyIndex].x, gameState_1.GameState.armies[armyIndex].y, gameState_1.GameState.armies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(gameState_1.GameState.armies[armyIndex].remainingHeightPoints);
        if (gameState_1.GameState.armies[armyIndex].remainingMovePoints !== gameState_1.GameState.armies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
        gameState_1.GameState.armies.push(newArmy);
        if (gameState_1.GameState.armies[armyIndex].multiArmyField === true) {
            addToMultifield(gameState_1.GameState.armies[armyIndex], newArmy);
            // deleteFromMultifield(GameState.armies[armyIndex]);
        }
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: gameState_1.GameState.armies[armyIndex].armyId,
                realm: gameState_1.GameState.armies[armyIndex].ownerTag(),
                troops: toUnMount,
                leaders: leadersToUnMount,
                x: gameState_1.GameState.armies[armyIndex].x,
                y: gameState_1.GameState.armies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        deleteArmy(armyIndex);
        drawingFunctions_1.Drawing.drawStuff();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
        // genug Heerführer?
    }
    else if (leadersToUnMount >= gameState_1.GameState.armies[armyIndex].leaders) {
        window.alert("Du hast zu wenige Heerführer zum absitzen");
    }
    else if (gameState_1.GameState.armies[armyIndex].isGuard) {
        window.alert("Die Garde muss zusammen bleiben");
    }
    else {
        // neues Heer mit generierter Id an selben Koordinaten
        let newArmy = new footArmy_1.FootArmy(newArmyId, toUnMount, leadersToUnMount, 0, 0, toUnMount, false, gameState_1.GameState.armies[armyIndex].x, gameState_1.GameState.armies[armyIndex].y, gameState_1.GameState.armies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(gameState_1.GameState.armies[armyIndex].remainingHeightPoints);
        if (gameState_1.GameState.armies[armyIndex].remainingMovePoints !== gameState_1.GameState.armies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // zahlen im alten Reiterheer anpassen
        gameState_1.GameState.armies[armyIndex].removeSoldiers(toUnMount);
        gameState_1.GameState.armies[armyIndex].removeLeaders(leadersToUnMount);
        // in GameState.armies einfügen
        gameState_1.GameState.armies.push(newArmy);
        if (gameState_1.GameState.armies[armyIndex].multiArmyField === true) {
            addToMultifield(gameState_1.GameState.armies[armyIndex], newArmy);
            // deleteFromMultifield(GameState.armies[armyIndex]);
        }
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: gameState_1.GameState.armies[armyIndex].armyId,
                realm: gameState_1.GameState.armies[armyIndex].ownerTag(),
                troops: toUnMount,
                leaders: leadersToUnMount,
                x: gameState_1.GameState.armies[armyIndex].x,
                y: gameState_1.GameState.armies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        // armyIndex zeigt auf neues Heer
        controlVariables_1.Controls.selectedArmyIndex = gameState_1.GameState.armies.length - 1;
        drawingFunctions_1.Drawing.drawStuff();
        boxVisibilty_1.BoxVisibility.restoreInfoBox();
        boxVisibilty_1.BoxVisibility.updateInfoBox();
    }
}
function allMountSelected() {
    mountWithParams(controlVariables_1.Controls.selectedArmyIndex, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders, null);
}
function allUnMountSelected() {
    unMountWithParams(controlVariables_1.Controls.selectedArmyIndex, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders, null);
}
// move troops or leaders from Controls.selectedArmyIndex to the army at position mergeId in GameState.armies
function transferTroopsFromSelectedArmy(mergeId) {
    let toSplit = 0;
    let leadersToSplit = 0;
    let mountsToSplit = 0;
    let lkpToSplit = 0;
    let skpToSplit = 0;
    // depending on army type different fields are needed
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 1) {
        toSplit = parseInt(gui_1.GUI.getSplitInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitLeadersInput().value);
        mountsToSplit = parseInt(gui_1.GUI.getSplitMountsInput().value);
        lkpToSplit = parseInt(gui_1.GUI.getSplitLkpInput().value);
        skpToSplit = parseInt(gui_1.GUI.getSplitSkpInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count -= toSplit;
            gameState_1.GameState.armies[mergeId].count += toSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders -= leadersToSplit;
            gameState_1.GameState.armies[mergeId].leaders += leadersToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mounts -= mountsToSplit;
            gameState_1.GameState.armies[mergeId].mounts += mountsToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp -= lkpToSplit;
            gameState_1.GameState.armies[mergeId].lkp += lkpToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp -= skpToSplit;
            gameState_1.GameState.armies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].startingMovepoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(0);
            }
            else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
            }
            if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
                console.log;
                gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                    toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                    realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: mountsToSplit,
                    x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                    y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 2) {
        toSplit = parseInt(gui_1.GUI.getSplitMountedInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitMountedLeadersInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0) {
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count -= toSplit;
            gameState_1.GameState.armies[mergeId].count += toSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders -= leadersToSplit;
            gameState_1.GameState.armies[mergeId].leaders += leadersToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp -= lkpToSplit;
            gameState_1.GameState.armies[mergeId].lkp += lkpToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp -= skpToSplit;
            gameState_1.GameState.armies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].startingMovepoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(0);
            }
            else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
            }
            if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
                gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                    toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                    realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: 0,
                    skp: 0,
                    mounts: 0,
                    x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                    y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 3) {
        toSplit = parseInt(gui_1.GUI.getSplitFleetInput().value);
        leadersToSplit = parseInt(gui_1.GUI.getSplitFleetLeadersInput().value);
        lkpToSplit = parseInt(gui_1.GUI.getSplitFleetLkpInput().value);
        skpToSplit = parseInt(gui_1.GUI.getSplitFleetSkpInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count -= toSplit;
            gameState_1.GameState.armies[mergeId].count += toSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders -= leadersToSplit;
            gameState_1.GameState.armies[mergeId].leaders += leadersToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp -= lkpToSplit;
            gameState_1.GameState.armies[mergeId].lkp += lkpToSplit;
            gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp -= skpToSplit;
            gameState_1.GameState.armies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].startingMovepoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(0);
            }
            else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
                gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
            }
            if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
                gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                    toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                    realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: 0,
                    x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                    y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    boxVisibilty_1.BoxVisibility.updateInfoBox();
    boxVisibilty_1.BoxVisibility.restoreInfoBox();
}
// merges selectedArmy with the army at position mergeId in GameState.armies
function mergeSelectedArmy(mergeId) {
    // depending on army type different fields are needed
    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 1) {
        gameState_1.GameState.armies[mergeId].count += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count;
        gameState_1.GameState.armies[mergeId].leaders += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders;
        gameState_1.GameState.armies[mergeId].mounts += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mounts;
        gameState_1.GameState.armies[mergeId].lkp += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp;
        gameState_1.GameState.armies[mergeId].skp += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp;
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
            gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
        }
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
            gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count,
                leaders: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders,
                lkp: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp,
                skp: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp,
                mounts: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].mounts,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
            }
        });
        deleteArmy(controlVariables_1.Controls.selectedArmyIndex);
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 2) {
        gameState_1.GameState.armies[mergeId].count += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count;
        gameState_1.GameState.armies[mergeId].leaders += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders;
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
            gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
        }
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
            gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count,
                leaders: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
            }
        });
        deleteArmy(controlVariables_1.Controls.selectedArmyIndex);
    }
    else if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyType() === 3) {
        gameState_1.GameState.armies[mergeId].count += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count;
        gameState_1.GameState.armies[mergeId].leaders += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders;
        gameState_1.GameState.armies[mergeId].lkp += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].lkp;
        gameState_1.GameState.armies[mergeId].skp += gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].skp;
        gameState_1.GameState.armies[mergeId].loadedArmies = gameState_1.GameState.armies[mergeId].loadedArmies.concat(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].loadedArmies);
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints < gameState_1.GameState.armies[mergeId].remainingMovePoints) {
            gameState_1.GameState.armies[mergeId].setRemainingMovePoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingMovePoints);
        }
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints < gameState_1.GameState.armies[mergeId].remainingHeightPoints) {
            gameState_1.GameState.armies[mergeId].setRemainingHeightPoints(gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].remainingHeightPoints);
        }
        if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].loadedArmies.length > 0) {
            for (let j = 0; j < gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].loadedArmies.length; j++) {
                for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                    if (gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].loadedArmies[j] == gameState_1.GameState.armies[i].armyId &&
                        gameState_1.GameState.armies[mergeId].owner === gameState_1.GameState.armies[i].owner) {
                        gameState_1.GameState.armies[i].isLoadedIn = gameState_1.GameState.armies[mergeId].armyId;
                    }
                }
            }
        }
        for (let j = 0; j < gameState_1.GameState.armies[mergeId].loadedArmies.length; j++) {
            for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                if (gameState_1.GameState.armies[mergeId].loadedArmies[j] == gameState_1.GameState.armies[i].armyId &&
                    gameState_1.GameState.armies[mergeId].owner === gameState_1.GameState.armies[i].owner) {
                }
            }
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].armyId,
                toArmyId: gameState_1.GameState.armies[mergeId].armyId,
                realm: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].ownerTag(),
                troops: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].count,
                leaders: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].leaders,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].x,
                y: gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].y
            }
        });
        deleteArmy(controlVariables_1.Controls.selectedArmyIndex);
    }
    if (mergeId = gameState_1.GameState.armies.length) {
        mergeId -= 1;
    }
    controlVariables_1.Controls.selectedArmyIndex = mergeId;
    boxVisibilty_1.BoxVisibility.updateInfoBox();
    boxVisibilty_1.BoxVisibility.restoreInfoBox();
}
function deleteArmy(index) {
    gameState_1.GameState.armies.splice(index, 1);
    if (controlVariables_1.Controls.selectedArmyIndex === gameState_1.GameState.armies.length) {
        controlVariables_1.Controls.selectedArmyIndex = -1;
    }
}
// returns the next armyId not yet assigned for the caller
function generateArmyId(type, owner) {
    if (type === 1) {
        let j = 101;
        while (j < 200) {
            let found = false;
            for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                if (gameState_1.GameState.armies[i].armyId === j && gameState_1.GameState.armies[i].owner === owner) {
                    j++;
                    found = true;
                }
            }
            if (!found) {
                return j;
            }
        }
        window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.");
        return false;
    }
    else if (type === 2) {
        let j = 201;
        while (j < 300) {
            let found = false;
            for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                if (gameState_1.GameState.armies[i].armyId === j && gameState_1.GameState.armies[i].owner === owner) {
                    j++;
                    found = true;
                }
            }
            if (!found) {
                return j;
            }
        }
        window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.");
        return false;
    }
    else if (type === 3) {
        let j = 301;
        while (j < 400) {
            let found = false;
            for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
                if (gameState_1.GameState.armies[i].armyId === j && gameState_1.GameState.armies[i].owner === owner) {
                    j++;
                    found = true;
                }
            }
            if (!found) {
                return j;
            }
        }
        window.alert("Du hast die maximale Anzahl an Flotten erreicht.");
        return false;
    }
    else {
        return false;
    }
}
function checkArmiesForLiveliness() {
    gameState_1.GameState.armies = gameState_1.GameState.armies.filter((armyCoord) => (armyCoord.isAlive()));
}
