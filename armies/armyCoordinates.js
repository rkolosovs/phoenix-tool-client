"use strict";
//when unit is clicked generates a list of neighbors that can be moved to
function clickedMoves(army) {
    if (army.ownerTag() === login || login === "sl") {
        army.possibleMoves = [];
        //goes through all neighbors to see if the army can move there
        for (let i = 0; i < 6; i++) {
            moveToList(army, i);
        }
    }
}
// direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
//tries to move a Unit in a direction and if possible saves the possible move
function moveToList(army, direction) {
    //console.log("moveToListInitiated");
    let neighborCoords = neighbors(army.x, army.y);
    let targetX = neighborCoords[direction][0];
    let targetY = neighborCoords[direction][1];
    let directionString = '';
    let reverseDirection = '';
    let neighborsOfNeighbors = neighbors(targetX, targetY).map((neighbor) => neighbors(neighbor[0], neighbor[1])).
        reduce((total, current) => (total.concat(current)), []);
    switch (direction) {
        case 0:
            directionString = 'nw';
            reverseDirection = 'se';
            break;
        case 1:
            directionString = 'ne';
            reverseDirection = 'sw';
            break;
        case 2:
            directionString = 'e';
            reverseDirection = 'w';
            break;
        case 3:
            directionString = 'se';
            reverseDirection = 'nw';
            break;
        case 4:
            directionString = 'sw';
            reverseDirection = 'ne';
            break;
        case 5:
            directionString = 'w';
            reverseDirection = 'e';
            break;
        default:
            directionString = 'nw';
            reverseDirection = 'se';
            break;
    }
    let changeInHeight = false;
    let thereIsAStreet = false;
    let thereIsABridge = false;
    let thereIsAHarbor = false;
    let rightOfPassage = borders.some((realm) => (realm.tag === army.ownerTag() && realm.land.some((field) => (targetX === field[0] && targetY === field[1])))); //effects of diplomacy go here
    let coastalSailing = borders.some((realm) => (realm.tag === army.ownerTag() && realm.land.some((field) => neighborsOfNeighbors.some((neighbor) => (field[0] === neighbor[0] && field[1] === neighbor[1]))))); //effects of diplomacy go here
    let thereIsARiver = rivers.some((river) => (river[0][0] === army.x && river[0][1] === army.y && river[1][0] === targetX && river[1][1] === targetY) ||
        (river[0][0] === targetX && river[0][1] === targetY && river[1][0] === army.x && river[1][1] === army.y));
    // check if there is a steet, a harbor or a bridge on the route
    buildings.forEach((building) => {
        if (building.type === 8 && (((building.firstX === army.x && building.firstY === army.y) &&
            (building.secondX === targetX && building.secondY === targetY)) || ((building.secondX === army.x &&
            building.secondY === army.y) && (building.firstX === targetX && building.firstY === targetY)))) {
            thereIsAStreet = true;
        }
        if (building.type === 6 && ((building.x === army.x && building.y === army.y && building.direction === directionString) ||
            (building.x === targetX && building.y === targetY && building.direction === reverseDirection))) {
            thereIsAHarbor = true;
        }
        if (building.type === 7 && ((building.x === army.x && building.y === army.y && building.direction === directionString) ||
            (building.x === targetX && building.y === targetY && building.direction === reverseDirection))) {
            thereIsABridge = true;
        }
        //TODO: Walls!
    });
    // check if there is a change in height on the route
    if (height(army.x, army.y) != height(targetX, targetY)) {
        if ((height(army.x, army.y) - height(targetX, targetY)) >= 2 || height(targetX, targetY) - height(army.x, army.y) >= 2) {
            return "The height difference is too big.";
        }
        else if ((army.remainingHeightPoints < 2 && !thereIsAStreet) || army.remainingHeightPoints < 1) {
            return "No height points left.";
        }
        else {
            changeInHeight = true;
            if (thereIsARiver) {
                return "Can't traverse height difference with a river.";
            }
        }
    }
    // ship movement
    if (Math.floor(army.armyId / 100) === 3) {
        switch (fieldType(targetX, targetY)) {
            case 0://shallow sea
                if (army.lkp + army.skp <= 0) {
                    if (coastalSailing && army.remainingMovePoints >= 5) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 5, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.skp > 0) {
                    if (coastalSailing && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 10) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.lkp > 0) {
                    if (coastalSailing && army.remainingMovePoints >= 6) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 6, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 8) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 1://deep sea
                if (army.lkp + army.skp <= 0) {
                    if (coastalSailing && army.remainingMovePoints >= 8) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 12) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 12, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.skp > 0) {
                    if (coastalSailing && army.remainingMovePoints >= 14) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 14, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 21) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.lkp > 0) {
                    if (coastalSailing && army.remainingMovePoints >= 14) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 14, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 21) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: false, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8: return "You can't drive your ships up land."; // can't
        }
        // horse movement
    }
    else if (Math.floor(army.armyId / 100) === 2) {
        switch (fieldType(targetX, targetY)) {
            case 0:
            case 1://watter
                let fleetsOnDest = [];
                // target field is sea, or deepsea
                // to see if there is the exact heightchange(not too high or on the sea switching boats)
                if (changeInHeight) {
                    // is there an allied fleet on the target field?
                    for (let i = 0; i < listOfArmies.length; i++) {
                        if ((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === targetX) && (listOfArmies[i].y === targetY) &&
                            (Math.floor(listOfArmies[i].armyId / 100) === 3)) {
                            if (listOfArmies[i].isLoadable(army.indexInListOfArmies()) == "ok") {
                                army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 0, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, load: true });
                            }
                            fleetsOnDest.push(i);
                            //                        console.log("fleets +1");
                        }
                    }
                }
                // there is none
                if (fleetsOnDest.length === 0) {
                    return "You can't walk on Water.";
                    // already embarked
                }
                else if (army.isLoadedIn != null) {
                    return "You are already embarked on a Fleet.";
                    // there is exactly one
                }
                else {
                    return "ok";
                }
            case 2:
            case 4:
            case 7: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 21) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && army.remainingMovePoints >= 3) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else if (army.remainingMovePoints >= 4) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else {
                    return "You don't have enough movement Points.";
                }
            }
            else if (rightOfPassage && army.remainingMovePoints >= 4) {
                if (army.isLoadedIn != null) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                }
                else {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                }
                return "ok";
            }
            else if (army.remainingMovePoints >= 7) {
                if (army.isLoadedIn != null) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                }
                else {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                }
                return "ok";
            }
            else {
                return "You don't have enough movement Points.";
            }
            case 5: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 21) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && army.remainingMovePoints >= 4) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else if (army.remainingMovePoints >= 7) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else {
                    return "You don't have enough movement Points.";
                }
            }
            else if (rightOfPassage && army.remainingMovePoints >= 7) {
                army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY });
                return "ok";
            }
            else if (army.remainingMovePoints >= 21) {
                army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, x: targetX, y: targetY });
                return "ok";
            }
            else {
                return "You don't have enough movement Points.";
            }
            case 6: return "Cavalry can not move through the mountains. "; //mountains
            case 3:
            case 8: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 21) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage && army.remainingMovePoints >= 3) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else if (army.remainingMovePoints >= 5) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 5, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else {
                    return "You don't have enough movement Points.";
                }
            }
            else if (rightOfPassage && army.remainingMovePoints >= 5) {
                if (army.isLoadedIn != null) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 5, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 5, height: 2, landunit: true, x: targetX, y: targetY });
                }
                return "ok";
            }
            else if (army.remainingMovePoints >= 10) {
                if (army.isLoadedIn != null) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 10, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2, landunit: true, x: targetX, y: targetY });
                }
                return "ok";
            }
            else {
                return "You don't have enough movement Points.";
            }
        }
        // normal troop movement
    }
    else if (Math.floor(army.armyId / 100) === 1) {
        switch (fieldType(targetX, targetY)) {
            case 0:
            case 1://watter
                let fleetsOnDest = [];
                // target field is sea, or deepsea
                // to see if there is the exact heightchange(not too high or on the sea switching boats)
                if (changeInHeight) {
                    // is there an allied fleet on the target field?
                    for (let i = 0; i < listOfArmies.length; i++) {
                        if ((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === targetX) && (listOfArmies[i].y === targetY) &&
                            (Math.floor(listOfArmies[i].armyId / 100) === 3)) {
                            if (listOfArmies[i].isLoadable(army.indexInListOfArmies()) == "ok") {
                                army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 0, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, load: true });
                            }
                            fleetsOnDest.push(i);
                            //                        console.log("fleets +1");
                        }
                    }
                }
                // there is none
                if (fleetsOnDest.length === 0) {
                    return "You can't walk on Water.";
                    // already embarked
                }
                else if (army.isLoadedIn != null) {
                    return "You are already embarked on a Fleet.";
                    // there is exactly one
                }
                else {
                    return "ok";
                }
            case 2:
            case 4:
            case 7: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 9) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (army.skp + army.lkp > 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 3) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.remainingMovePoints >= 4) {
                    army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                    return "ok";
                }
                else {
                    return "You don't have enough movement Points.";
                }
            }
            else {
                if (rightOfPassage) {
                    if (army.skp + army.lkp > 0 && army.remainingMovePoints >= 7) {
                        if (army.isLoadedIn != null) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                        }
                        else {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                        }
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 4) {
                        if (army.isLoadedIn != null) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                        }
                        else {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                        }
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else if (army.remainingMovePoints >= 7) {
                    if (army.isLoadedIn != null) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                    }
                    return "ok";
                }
                else {
                    return "You don't have enough movement Points.";
                }
            }
            case 5: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 9) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (army.skp > 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else {
                    if (army.skp > 0) {
                        if (army.remainingMovePoints >= 7) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                            return "ok";
                        }
                        else {
                            return "You don't have enough movement Points.";
                        }
                    }
                    else if (army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
            else {
                if (rightOfPassage) {
                    if (army.skp > 0) {
                        return "You need a street to move into the highlands with heavy catapults.";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else {
                    if (army.skp > 0) {
                        return "You need a street to move into the highlands with heavy catapults.";
                    }
                    else if (army.skp <= 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
            case 6: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 9) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (army.skp > 0) {
                        return "You can't move into the mountains with heavy catapults.";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else {
                    if (army.skp > 0) {
                        return "You can't move into the mountains with heavy catapults.";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
            else {
                if (army.skp + army.lkp > 0) {
                    return "You need a street to move into the mountains with catapults.";
                }
                else {
                    if (rightOfPassage && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
            case 3:
            case 8: if (thereIsARiver && !thereIsABridge) {
                if (army.remainingMovePoints >= 9) {
                    if (thereIsAStreet) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, x: targetX, y: targetY });
                    }
                    else {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, x: targetX, y: targetY });
                    }
                    return "ok";
                }
                else {
                    return "You need you full movement to cross a river.";
                }
            }
            else if (thereIsAStreet) {
                if (rightOfPassage) {
                    if (army.skp > 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else {
                    if (army.skp > 0 && army.remainingMovePoints >= 7) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else if (army.skp <= 0 && army.remainingMovePoints >= 4) {
                        army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, x: targetX, y: targetY });
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
            else {
                if (rightOfPassage) {
                    if (army.skp > 0) {
                        return "You need a street to move into forest or swamp with heavy catapults.";
                    }
                    else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7) {
                        if (army.isLoadedIn != null) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                        }
                        else {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                        }
                        return "ok";
                    }
                    else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4) {
                        if (army.isLoadedIn != null) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                        }
                        else {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                        }
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
                else {
                    if (army.skp > 0) {
                        return "You need a street to move into forest or swamp with heavy catapults.";
                    }
                    else if (army.skp <= 0 && army.remainingMovePoints >= 7) {
                        if (army.isLoadedIn != null) {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor ? 1 : 2, landunit: true, x: targetX, y: targetY, unload: true });
                        }
                        else {
                            army.possibleMoves.push({ changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, x: targetX, y: targetY, unload: false });
                        }
                        return "ok";
                    }
                    else {
                        return "You don't have enough movement Points.";
                    }
                }
            }
        }
    }
}
//checks the current field for other armies and adds it accordingly
function createMultifield(army) {
    for (let j = 0; j < listOfArmies.length; j++) {
        let someArmy = listOfArmies[j];
        if (someArmy.x === army.x && someArmy.y === army.y && someArmy !== army) {
            if (someArmy.multiArmyField === true || army.multiArmyField === true) {
                addToMultifield(someArmy, army);
            }
            else {
                let templist = [someArmy, army]; //creating a list of armies to add to the list of multifieldarmies
                listOfMultiArmyFields.push(templist);
                someArmy.multiArmyField = true;
                army.multiArmyField = true;
            }
        }
    }
}
//Adds an army to an existing multifield
function addToMultifield(armyOnMultifield, armyToAdd) {
    if (listOfMultiArmyFields !== undefined) {
        let alreadyInList = false;
        let placeToAdd;
        for (let i = 0; i < listOfMultiArmyFields.length; i++) {
            for (let j = 0; j < listOfMultiArmyFields[i].length; j++) {
                if (listOfMultiArmyFields[i][j] === armyOnMultifield) {
                    placeToAdd = i;
                }
                else if (listOfMultiArmyFields[i][j] === armyToAdd) {
                    alreadyInList = true;
                }
            }
        }
        if (alreadyInList == false && placeToAdd !== undefined) {
            listOfMultiArmyFields[placeToAdd].push(armyToAdd);
            console.log("added to multi");
        }
        armyToAdd.multiArmyField = true;
    }
}
function conquer(army) {
    if (fieldType(army.x, army.y) >= 2 && army.canConquer()) {
        let found = false;
        //für i = 0 bis borders länge
        for (let i = 0; i < borders.length; i++) {
            // sind das die Länder des Besitzers?
            if (borders[i].tag === army.ownerTag()) {
                // ist das Zielland enthalten?
                for (let j = 0; j < borders[i].land.length; j++) {
                    if (borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y) {
                        // wenn ja, found = true
                        found = true;
                    }
                }
                // nicht die Länder des Besitzers
            }
            else {
                // ist das Zielland enthalten?
                for (let j = 0; j < borders[i].land.length; j++) {
                    if (borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y) {
                        // wenn ja nimm es raus.
                        borders[i].land.splice(j, 1);
                    }
                }
            }
            //console.log(borders[i]);
        }
        // war nicht bereits Land des Besitzers.
        if (!found) {
            for (let i = 0; i < borders.length; i++) {
                if (borders[i].tag === army.ownerTag()) {
                    // tu es zu den Ländern des Besitzers.
                    borders[i].land.push([army.x, army.y]);
                }
            }
        }
    }
}
//to find all fields in a two tile proximity
function findShootingTargets(army) {
    if (army.skp - army.SKPShotThisTurn > 0) {
        army.targetList = neighborInRange(army.x, army.y, 2);
    }
    else if (army.lkp - army.LKPShotThisTurn > 0) {
        army.targetList = neighborInRange(army.x, army.y, 1);
    }
    army.targetList = checkAllConditions(army, army.targetList);
}
function checkAllConditions(army, targetList) {
    let templist = targetList.slice();
    let hasSKP = false;
    if (army.skp - army.SKPShotThisTurn > 0) {
        hasSKP = true;
    }
    //to find out the conditions and maybe kick out if not shootable
    for (let i = templist.length - 1; i >= 0; i--) {
        if (checkCondition(army, templist[i][0], templist[i][1], hasSKP) === 'impossible shot') {
            targetList.splice(i, 1);
        }
    }
    return targetList;
}
function checkCondition(army, x, y, skpShot) {
    let condition = 'impossible shot';
    let range = distance(army.x, army.y, x, y);
    if (skpShot) {
        if (range == 1) {
            if (height(x, y) - height(army.x, army.y) <= 2) {
                condition = 'high';
            }
            if (height(x, y) - height(army.x, army.y) <= 1) {
                condition = 'short';
            }
            if (height(x, y) - height(army.x, army.y) === 1 && findWallInWay(army.x, army.y, x, y).length > 0) {
                condition = 'high';
            }
        }
        else if (range == 2) {
            if (height(x, y) - height(army.x, army.y) <= 1) {
                condition = 'farAndUp';
            }
            if (height(x, y) - height(army.x, army.y) < 1) {
                condition = 'far';
            }
            if (height(x, y) - height(army.x, army.y) === 0 && findWallInWay(army.x, army.y, x, y).length > 0) {
                condition = 'farAndUp';
            }
            //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
            let commonNeig = findCommonNeighbor(army.x, army.y, x, y);
            let walls = findWallInWay(army.x, army.y, x, y);
            for (let i = 0; i < commonNeig.length; i++) {
                if (walls.length > 0) {
                    for (let j = 0; j < walls.length; j++) {
                        if (((height(commonNeig[i][0], commonNeig[i][1]) - height(army.x, army.y) === 1) && buildings[walls[j]].x === commonNeig[i][0] && buildings[walls[j]].y === commonNeig[i][1])) {
                            condition = 'impossible shot';
                        }
                    }
                }
                if (height(commonNeig[i][0], commonNeig[i][1]) - height(army.x, army.y) > 1) {
                    condition = 'impossible shot';
                }
            }
        }
    }
    else {
        if (height(x, y) - height(army.x, army.y) <= 1) {
            condition = 'lkp';
        }
    }
    return condition;
}
function findWallInWay(fromX, fromY, toX, toY) {
    let foundWallsIndeces = [];
    let dir = getDirectionToNeighbor(fromX, fromY, toX, toY);
    if (distance(fromX, fromY, toX, toY) === 1) {
        dir = (dir + 3) % 6;
        let wallIndex = getWallIndexOnFieldInDirection(toX, toY, dir);
        if (wallIndex != -1) {
            foundWallsIndeces.push(wallIndex);
            return foundWallsIndeces;
        }
    }
    else if (distance(fromX, fromY, toX, toY) === 2) {
        if (dir % 1 === 0) {
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            if (getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            dir = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            if (getWallIndexOnFieldInDirection(toX, toY, dir) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dir));
            }
        }
        else {
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            dir = Math.floor(dir);
            let dirCommon1 = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }
            dirCommon1 = (dir + 1) % 6;
            if (getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }
            let dirCommon2 = (dir + 4) % 6;
            if (getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }
            dirCommon2 = dir;
            if (getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }
            let dirTarget = (dir + 3) % 6;
            if (getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
            dirTarget = (dir + 4) % 6;
            if (getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1) {
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
        }
    }
    return foundWallsIndeces;
}
//returns all walls on target field
function getWallIndexOnFieldInDirection(x, y, direction) {
    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].type === 5 && buildings[i].x === x && buildings[i].y === y && buildings[i].direction === convertDirection(direction)) {
            return i;
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
    }
}
