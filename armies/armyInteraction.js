"use strict";
// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null),
// schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
function fernkampf(dicerollsL, dicerollsS, shooter, target, x, y, chars) {
    let charGpSum = 0;
    if (chars != undefined) {
        let cLen = chars.length;
        for (let i = 0; i < cLen; i++) {
            charGpSum += chars[i].gp;
        }
    }
    let damage = shooter.fireLkp(dicerollsL, checkCondition(shooter, x, y, false)) + shooter.fireSkp(dicerollsS, checkCondition(shooter, x, y, true));
    let allTargets = [];
    let sumAllBP = 0;
    if (target === "On Field") {
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].x === x && buildings[i].y === y && buildings[i].type < 5) {
                //TODO building takes 2/3 damage
                //building[i].takeFire(damage * (2/3));
                damage = damage * (1 / 3);
            }
        }
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].x === x && listOfArmies[i].y === y) {
                allTargets.push(listOfArmies[i]);
                sumAllBP += listOfArmies[i].sumBP();
            }
        }
        for (let i = 0; i < allTargets.length; i++) {
            //target may be a building. buildings need to have this funktion
            allTargets[i].takeFire(damage / (1 + (allTargets[i].leaderGp() + charGpSum) / 100) * (allTargets[i].sumBP() / sumAllBP));
        }
    }
    //TODO Wall Damage
    checkArmiesForLiveliness();
    shooter.LKPShotThisTurn += dicerollsL.length;
    shooter.SKPShotThisTurn += dicerollsS.length;
    //check to see if shooting after moving and stop the army if it moved this turn.
    if (shooter.remainingMovePoints <= shooter.startingMovepoints) {
        shooter.remainingMovePoints = 0;
        shooter.possibleMoves = [];
    }
}
//to fill the targetList(fields)
function findPossibleTargetFields() {
    findShootingTargets(listOfArmies[selectedArmyIndex]);
}
//to actually shoot stuff, with events
function shoot() {
    if (login == 'guest') {
        window.alert("Zuschauer haben keine Rechte.");
        return false;
    }
    let LKPshooting = parseInt(GUI.getShootingLKPInput().value);
    let SKPshooting = parseInt(GUI.getShootingSKPInput().value);
    let shootingarmy = listOfArmies[selectedArmyIndex];
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
    if (selectedFields[1] === undefined) {
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
            if (shootingarmy.targetList[i][0] === selectedFields[1][0] && shootingarmy.targetList[i][1] === selectedFields[1][1]) {
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
        let cond = checkCondition(shootingarmy, selectedFields[1][0], selectedFields[1][1], false);
        if (cond === 'impossible shot') {
            window.alert("Sie müssen auf ein gemeinsam erreichbares Feld schießen");
            return false;
        }
    }
    preparedEvents.push({
        type: "shoot", content: {
            shooterID: listOfArmies[selectedArmyIndex].armyId,
            realm: listOfArmies[selectedArmyIndex].ownerTag(),
            LKPcount: LKPshooting,
            SKPcount: SKPshooting,
            toX: selectedFields[1][0],
            toY: selectedFields[1][1],
            target: target,
            fromX: listOfArmies[selectedArmyIndex].x,
            fromY: listOfArmies[selectedArmyIndex].y
        }
    });
    shootingarmy.LKPShotThisTurn += LKPshooting;
    shootingarmy.SKPShotThisTurn += SKPshooting;
    //check to see if shooting after moving and stop the army if it moved this turn.
    if (shootingarmy.remainingMovePoints <= shootingarmy.startingMovepoints) {
        shootingarmy.remainingMovePoints = 0;
        shootingarmy.possibleMoves = [];
    }
    updateInfoBox();
    window.alert("Die Geschosse sind unterwegs.");
}
// the splitArmy funtion of the split box
// TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
function splitSelectedArmy() {
    if (login == 'guest') {
        window.alert("Zuschauer haben keine Rechte.");
        return false;
    }
    if (listOfArmies[selectedArmyIndex].isGuard) {
        window.alert("Garde Armeen können nicht geteilt werden.");
        return false;
    }
    let toSplit = 0;
    let leadersToSplit = 0;
    let mountsToSplit = 0;
    let lkpToSplit = 0;
    let skpToSplit = 0;
    // depending on army type different fields are needed
    if (listOfArmies[selectedArmyIndex].armyType() === 1) {
        toSplit = parseInt(GUI.getSplitInput().value);
        leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
        mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
        lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
        skpToSplit = parseInt(GUI.getSplitSkpInput().value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 100)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit < 100) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.");
            return false;
        }
        if (mountsToSplit > listOfArmies[selectedArmyIndex].mounts) {
            window.alert("So viele Reittiere hast du nicht.");
            return false;
        }
        if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
            window.alert("So viele leichte Katapulte hast du nicht.");
            return false;
        }
        if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
            window.alert("So viele schwere Katapulte hast du nicht.");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 2) {
        toSplit = parseInt(GUI.getSplitMountedInput().value);
        leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 50)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit < 50) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 3) {
        toSplit = parseInt(GUI.getSplitFleetInput().value);
        leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
        lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
        skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 1)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit * 100 > (listOfArmies[selectedArmyIndex].currentCapacity())) {
            window.alert("Du kannst keine beladenen Schiffe abspalten.");
            return false;
        }
        if (toSplit < 1) {
            window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)");
            return false;
        }
        if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
            window.alert("So viele leichte Kriegsschiffe hast du nicht.");
            return false;
        }
        if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
            window.alert("So viele schwere Kriegsschiffe hast du nicht.");
            return false;
        }
    }
    if (leadersToSplit > (listOfArmies[selectedArmyIndex].leaders - 1)) {
        window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
        return false;
    }
    if (leadersToSplit < 1) {
        window.alert("Es muss mindestens 1 Heerführer abgespalten werden.");
        return false;
    }
    if (listOfArmies[selectedArmyIndex].armyType() == 1) {
        let newArmyId = generateArmyId(1, listOfArmies[selectedArmyIndex].owner);
        let newArmy = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false, listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
        listOfArmies.push(newArmy);
        listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
        listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
        listOfArmies[selectedArmyIndex].removeLkp(lkpToSplit);
        listOfArmies[selectedArmyIndex].removeSkp(skpToSplit);
        listOfArmies[selectedArmyIndex].removeMounts(mountsToSplit);
        preparedEvents.push({
            type: "split", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: lkpToSplit,
                skp: skpToSplit,
                mounts: mountsToSplit,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    if (listOfArmies[selectedArmyIndex].armyType() == 2) {
        let newArmyId = generateArmyId(2, listOfArmies[selectedArmyIndex].owner);
        let newArmy = new reiterHeer(newArmyId, toSplit, leadersToSplit, false, listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
        listOfArmies.push(newArmy);
        listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
        listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
        preparedEvents.push({
            type: "split", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    if (listOfArmies[selectedArmyIndex].armyType() == 3) {
        let newArmyId = generateArmyId(3, listOfArmies[selectedArmyIndex].owner);
        let newArmy = new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false, listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
        listOfArmies.push(newArmy);
        listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
        listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
        listOfArmies[selectedArmyIndex].removeLkp(lkpToSplit);
        listOfArmies[selectedArmyIndex].removeSkp(skpToSplit);
        preparedEvents.push({
            type: "split", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: toSplit,
                leaders: leadersToSplit,
                lkp: lkpToSplit,
                skp: skpToSplit,
                mounts: 0,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y,
                newArmysId: newArmyId
            }
        });
    }
    restoreInfoBox();
    updateInfoBox();
}
// the mount function of the mount box
function mountSelected() {
    let toMount = GUI.getMountInput().value;
    let leadersToMount = GUI.getMountLeaderInput().value;
    mountWithParams(selectedArmyIndex, toMount, leadersToMount, null);
}
// mounting with parameters
//TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
function mountWithParams(armyIndex, toMount, leadersToMount, newArmyId) {
    if (toMount === "" || leadersToMount === "" || toMount === null || leadersToMount === null) {
        window.alert("Alle felder müssen ausgefüllt sein");
        return false;
    }
    // generiere armyId falls keine vorhanden
    if (newArmyId === null) {
        newArmyId = generateArmyId(2, listOfArmies[armyIndex].owner);
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
    if (toMount != listOfArmies[armyIndex].count && leadersToMount === listOfArmies[armyIndex].leaders) {
        window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
        return false;
    }
    // genug Truppen vorhanden?
    if (toMount != listOfArmies[armyIndex].count && (toMount * 2 > listOfArmies[armyIndex].raumpunkteOhneHf() - 100)) {
        window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
        return false;
        // genug Reittiere vorhanden?
    }
    // genug Truppen vorhanden?
    if (toMount > listOfArmies[armyIndex].count) {
        window.alert("Du hast zu wenige Truppen zum aufsitzen");
        return false;
        // genug Reittiere vorhanden?
    }
    else if (toMount > listOfArmies[armyIndex].mounts) {
        window.alert("Du hast zu wenige Reittiere zum aufsitzen");
        return false;
        // Sitzen alle auf?
    }
    else if (toMount === listOfArmies[armyIndex].count) {
        // neues Reiterheer mit generierter Id an selben Koordinaten
        let newArmy = new reiterHeer(newArmyId, toMount, listOfArmies[armyIndex].leaders, listOfArmies[armyIndex].isGuard, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
        if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // Nachricht, falls Katapulte vorhanden waren.
        if (listOfArmies[armyIndex].skp > 0 || listOfArmies[armyIndex].lkp > 0) {
            window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.");
        }
        // in listOfArmies einfügen und alte Armee löschen, ist dann automatisch armyIndex
        listOfArmies.push(newArmy);
        //in preparedEvents pushen
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: listOfArmies[armyIndex].armyId,
                realm: listOfArmies[armyIndex].ownerTag(),
                troops: toMount,
                leaders: leadersToMount,
                x: listOfArmies[armyIndex].x,
                y: listOfArmies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        deleteArmy(armyIndex);
        restoreInfoBox();
        drawStuff();
        updateInfoBox();
    }
    else if (leadersToMount >= listOfArmies[armyIndex].leaders) {
        window.alert("Du hast zu wenige Heerführer zum aufsitzen");
    }
    else if (listOfArmies[armyIndex].isGuard) {
        window.alert("Die Garde muss zusammen bleiben");
    }
    else {
        // neues Reiterheer mit generierter Id an selben Koordinaten
        let newArmy = new reiterHeer(newArmyId, toMount, leadersToMount, false, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[selectedArmyIndex].owner);
        newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
        if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // zahlen im alten Heer anpassen
        listOfArmies[armyIndex].removeSoldiers(toMount);
        listOfArmies[armyIndex].removeLeaders(leadersToMount);
        listOfArmies[armyIndex].removeMounts(toMount);
        // in listOfArmies einfügen
        listOfArmies.push(newArmy);
        //in preparedEvents pushen
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: listOfArmies[armyIndex].armyId,
                realm: listOfArmies[armyIndex].ownerTag(),
                troops: toMount,
                leaders: leadersToMount,
                x: listOfArmies[armyIndex].x,
                y: listOfArmies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        // selectedArmyIndex zeigt auf neues Heer
        selectedArmyIndex = listOfArmies.length - 1;
        drawStuff();
        restoreInfoBox();
        updateInfoBox();
    }
}
// the unMount function of the unMount box
function unMountSelected() {
    let toUnMount = GUI.getUnMountInput().value;
    let leadersToUnMount = GUI.getUnMountLeaderInput().value;
    unMountWithParams(selectedArmyIndex, toUnMount, leadersToUnMount, null);
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
        newArmyId = generateArmyId(1, listOfArmies[armyIndex].owner);
    }
    // sitzen genug Truppen ab?
    if (toUnMount < 100) {
        window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
        return false;
    }
    // bleibt ein hf be der Armee?
    if (toUnMount != listOfArmies[armyIndex].count && leadersToUnMount === listOfArmies[armyIndex].leaders) {
        window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
        return false;
    }
    // genug Truppen vorhanden?
    if (toUnMount != listOfArmies[armyIndex].count && (toUnMount * 2 > listOfArmies[armyIndex].raumpunkteOhneHf() - 100)) {
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
    if (toUnMount > listOfArmies[armyIndex].count) {
        window.alert("So viele Truppen hast du nicht zum absitzen");
        return false;
        // genug Truppen vorhanden?
    }
    else if ((toUnMount == listOfArmies[armyIndex].count)) {
        // neues Heer mit generierter Id an selben Koordinaten
        let newArmy = new heer(newArmyId, toUnMount, listOfArmies[armyIndex].leaders, 0, 0, toUnMount, listOfArmies[armyIndex].isGuard, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
        if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // in listOfArmies einfügen und alte Armee löschen, ist dann automatisch armyIndex
        listOfArmies.push(newArmy);
        if (listOfArmies[armyIndex].multiArmyField === true) {
            addToMultifield(listOfArmies[armyIndex], newArmy);
            // deleteFromMultifield(listOfArmies[armyIndex]);
        }
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: listOfArmies[armyIndex].armyId,
                realm: listOfArmies[armyIndex].ownerTag(),
                troops: toUnMount,
                leaders: leadersToUnMount,
                x: listOfArmies[armyIndex].x,
                y: listOfArmies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        deleteArmy(armyIndex);
        drawStuff();
        restoreInfoBox();
        updateInfoBox();
        // genug Heerführer?
    }
    else if (leadersToUnMount >= listOfArmies[armyIndex].leaders) {
        window.alert("Du hast zu wenige Heerführer zum absitzen");
    }
    else if (listOfArmies[armyIndex].isGuard) {
        window.alert("Die Garde muss zusammen bleiben");
    }
    else {
        // neues Heer mit generierter Id an selben Koordinaten
        let newArmy = new heer(newArmyId, toUnMount, leadersToUnMount, 0, 0, toUnMount, false, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
        newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
        if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
            newArmy.setRemainingMovePoints(0);
        }
        else
            newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
        // zahlen im alten Reiterheer anpassen
        listOfArmies[armyIndex].removeSoldiers(toUnMount);
        listOfArmies[armyIndex].removeLeaders(leadersToUnMount);
        // in listOfArmies einfügen
        listOfArmies.push(newArmy);
        if (listOfArmies[armyIndex].multiArmyField === true) {
            addToMultifield(listOfArmies[armyIndex], newArmy);
            // deleteFromMultifield(listOfArmies[armyIndex]);
        }
        preparedEvents.push({
            type: "mount", content: {
                fromArmyId: listOfArmies[armyIndex].armyId,
                realm: listOfArmies[armyIndex].ownerTag(),
                troops: toUnMount,
                leaders: leadersToUnMount,
                x: listOfArmies[armyIndex].x,
                y: listOfArmies[armyIndex].y,
                newArmysId: newArmy.armyId
            }
        });
        // armyIndex zeigt auf neues Heer
        selectedArmyIndex = listOfArmies.length - 1;
        drawStuff();
        restoreInfoBox();
        updateInfoBox();
    }
}
function allMountSelected() {
    mountWithParams(selectedArmyIndex, listOfArmies[selectedArmyIndex].count, listOfArmies[selectedArmyIndex].leaders, null);
}
function allUnMountSelected() {
    unMountWithParams(selectedArmyIndex, listOfArmies[selectedArmyIndex].count, listOfArmies[selectedArmyIndex].leaders, null);
}
// move troops or leaders from selectedArmyIndex to the army at position mergeId in listOfArmies
function transferTroopsFromSelectedArmy(mergeId) {
    let toSplit = 0;
    let leadersToSplit = 0;
    let mountsToSplit = 0;
    let lkpToSplit = 0;
    let skpToSplit = 0;
    // depending on army type different fields are needed
    if (listOfArmies[selectedArmyIndex].armyType() === 1) {
        toSplit = parseInt(GUI.getSplitInput().value);
        leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
        mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
        lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
        skpToSplit = parseInt(GUI.getSplitSkpInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
            listOfArmies[selectedArmyIndex].count -= toSplit;
            listOfArmies[mergeId].count += toSplit;
            listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
            listOfArmies[mergeId].leaders += leadersToSplit;
            listOfArmies[selectedArmyIndex].mounts -= mountsToSplit;
            listOfArmies[mergeId].mounts += mountsToSplit;
            listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
            listOfArmies[mergeId].lkp += lkpToSplit;
            listOfArmies[selectedArmyIndex].skp -= skpToSplit;
            listOfArmies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints) {
                listOfArmies[mergeId].setRemainingMovePoints(0);
            }
            else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
                listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
            }
            if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
                console.log;
                listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                    toArmyId: listOfArmies[mergeId].armyId,
                    realm: listOfArmies[selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: mountsToSplit,
                    x: listOfArmies[selectedArmyIndex].x,
                    y: listOfArmies[selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 2) {
        toSplit = parseInt(GUI.getSplitMountedInput().value);
        leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0) {
            listOfArmies[selectedArmyIndex].count -= toSplit;
            listOfArmies[mergeId].count += toSplit;
            listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
            listOfArmies[mergeId].leaders += leadersToSplit;
            listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
            listOfArmies[mergeId].lkp += lkpToSplit;
            listOfArmies[selectedArmyIndex].skp -= skpToSplit;
            listOfArmies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints) {
                listOfArmies[mergeId].setRemainingMovePoints(0);
            }
            else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
                listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
            }
            if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
                listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                    toArmyId: listOfArmies[mergeId].armyId,
                    realm: listOfArmies[selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: 0,
                    skp: 0,
                    mounts: 0,
                    x: listOfArmies[selectedArmyIndex].x,
                    y: listOfArmies[selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 3) {
        toSplit = parseInt(GUI.getSplitFleetInput().value);
        leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
        lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
        skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
        if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
            listOfArmies[selectedArmyIndex].count -= toSplit;
            listOfArmies[mergeId].count += toSplit;
            listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
            listOfArmies[mergeId].leaders += leadersToSplit;
            listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
            listOfArmies[mergeId].lkp += lkpToSplit;
            listOfArmies[selectedArmyIndex].skp -= skpToSplit;
            listOfArmies[mergeId].skp += skpToSplit;
            if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints) {
                listOfArmies[mergeId].setRemainingMovePoints(0);
            }
            else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
                listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
            }
            if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
                listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
            }
            preparedEvents.push({
                type: "transfer", content: {
                    fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                    toArmyId: listOfArmies[mergeId].armyId,
                    realm: listOfArmies[selectedArmyIndex].ownerTag(),
                    troops: toSplit,
                    leaders: leadersToSplit,
                    lkp: lkpToSplit,
                    skp: skpToSplit,
                    mounts: 0,
                    x: listOfArmies[selectedArmyIndex].x,
                    y: listOfArmies[selectedArmyIndex].y
                }
            });
        }
        else {
            window.alert("Es müssen positive Werte abgespalten werden");
            return false;
        }
    }
    updateInfoBox();
    restoreInfoBox();
}
// merges selectedArmy with the army at position mergeId in listOfArmies
function mergeSelectedArmy(mergeId) {
    // depending on army type different fields are needed
    if (listOfArmies[selectedArmyIndex].armyType() === 1) {
        listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
        listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
        listOfArmies[mergeId].mounts += listOfArmies[selectedArmyIndex].mounts;
        listOfArmies[mergeId].lkp += listOfArmies[selectedArmyIndex].lkp;
        listOfArmies[mergeId].skp += listOfArmies[selectedArmyIndex].skp;
        if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
            listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
        }
        if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
            listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                toArmyId: listOfArmies[mergeId].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: listOfArmies[selectedArmyIndex].count,
                leaders: listOfArmies[selectedArmyIndex].leaders,
                lkp: listOfArmies[selectedArmyIndex].lkp,
                skp: listOfArmies[selectedArmyIndex].skp,
                mounts: listOfArmies[selectedArmyIndex].mounts,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y
            }
        });
        deleteArmy(selectedArmyIndex);
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 2) {
        listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
        listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
        if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
            listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
        }
        if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
            listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                toArmyId: listOfArmies[mergeId].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: listOfArmies[selectedArmyIndex].count,
                leaders: listOfArmies[selectedArmyIndex].leaders,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y
            }
        });
        deleteArmy(selectedArmyIndex)();
    }
    else if (listOfArmies[selectedArmyIndex].armyType() === 3) {
        listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
        listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
        listOfArmies[mergeId].lkp += listOfArmies[selectedArmyIndex].lkp;
        listOfArmies[mergeId].skp += listOfArmies[selectedArmyIndex].skp;
        listOfArmies[mergeId].loadedArmies = listOfArmies[mergeId].loadedArmies.concat(listOfArmies[selectedArmyIndex].loadedArmies);
        if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
            listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
        }
        if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
            listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
        }
        console.log("the loaded armies in the new fleet are:");
        console.log(listOfArmies[mergeId].loadedArmies);
        if (listOfArmies[selectedArmyIndex].loadedArmies.length > 0) {
            console.log("id = " + listOfArmies[selectedArmyIndex].loadedArmies[i]);
            for (let j = 0; j < listOfArmies[selectedArmyIndex].loadedArmies.length; j++) {
                for (let i = 0; i < listOfArmies.length; i++) {
                    if (listOfArmies[selectedArmyIndex].loadedArmies[j] == listOfArmies[i].armyId &&
                        listOfArmies[mergeId].owner === listOfArmies[i].owner) {
                        console.log(listOfArmies[i].armyId + " was loaded in " + listOfArmies[i].isLoadedIn + ",");
                        listOfArmies[i].isLoadedIn = listOfArmies[mergeId].armyId;
                        console.log("but is now loaded in " + listOfArmies[i].isLoadedIn + ".");
                    }
                }
            }
        }
        for (let j = 0; j < listOfArmies[mergeId].loadedArmies.length; j++) {
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[mergeId].loadedArmies[j] == listOfArmies[i].armyId &&
                    listOfArmies[mergeId].owner === listOfArmies[i].owner) {
                    console.log(listOfArmies[i].armyId + " is loaded in " + listOfArmies[i].isLoadedIn + ".");
                }
            }
        }
        preparedEvents.push({
            type: "merge", content: {
                fromArmyId: listOfArmies[selectedArmyIndex].armyId,
                toArmyId: listOfArmies[mergeId].armyId,
                realm: listOfArmies[selectedArmyIndex].ownerTag(),
                troops: listOfArmies[selectedArmyIndex].count,
                leaders: listOfArmies[selectedArmyIndex].leaders,
                lkp: 0,
                skp: 0,
                mounts: 0,
                x: listOfArmies[selectedArmyIndex].x,
                y: listOfArmies[selectedArmyIndex].y
            }
        });
        deleteArmy(selectedArmyIndex)();
    }
    if (mergeId = listOfArmies.length) {
        mergeId -= 1;
    }
    selectedArmyIndex = mergeId;
    updateInfoBox();
    restoreInfoBox();
}
function deleteArmy(index) {
    listOfArmies.splice(index, 1);
    if (selectedArmyIndex === listOfArmies.length) {
        selectedArmyIndex = undefined;
    }
}
// returns the next armyId not yet assigned for the caller
function generateArmyId(type, owner) {
    if (type == 1) {
        let j = 101;
        while (j < 200) {
            let found = false;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == j && listOfArmies[i].owner == owner) {
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
    else if (type == 2) {
        let j = 201;
        while (j < 300) {
            let found = false;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == j && listOfArmies[i].owner === owner) {
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
    else if (type == 3) {
        let j = 301;
        while (j < 400) {
            let found = false;
            for (let i = 0; i < listOfArmies.length; i++) {
                if (listOfArmies[i].armyId == j && listOfArmies[i].owner === owner) {
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
    listOfArmies = listOfArmies.filter((armyCoord) => (armyCoord.isAlive()));
}
