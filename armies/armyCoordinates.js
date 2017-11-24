//to actually move units with the new method
function move(army, direction){//TODO needs new names
    for(var i =0; i < army.possibleMoves.length; i++){
        if(army.possibleMoves[i].dir === direction){
            var tempmove = army.possibleMoves[i];
            //in case it is moving on land
            if(tempmove.load === undefined){
                army.setRemainingMovePoints(army.remainingMovePoints - tempmove.movepoints);
                army.oldX = army.x;
                army.oldY = army.y;
                army.x = tempmove.tar.x;
                army.y = tempmove.tar.y;
                //for ship movement
                if(Math.floor(army.armyId / 100) === 3){
                // moves troops that are loaded in the fleet
                    if(army.loadedArmies !== undefined && army.loadedArmies !== []){
                        for(var i = 0; i < army.loadedArmies.length; i++){
                            for(var j = 0; j < listOfArmies.length; j++){
                                console.log(army.loadedArmies[i]);
                                if(listOfArmies[j].owner === army.owner && listOfArmies[j].armyId === army.loadedArmies[i]){
                                    listOfArmies[j].x = tempmove.tar.x;
                                    listOfArmies[j].y = tempmove.tar.y;
                                }
                            }
                        }
                    }
                }
                //for moving off a ship
                if(tempmove.unload !== undefined && tempmove.unload){
                    console.log("Armee war in " + army.isLoadedIn + " geladen.");
                    for(var i = 0; i < listOfArmies.length; i++){
                        if((listOfArmies[i].owner === army.owner) && listOfArmies[i].armyId === army.isLoadedIn){
                            var placeInList = -1;
                            for(var j = 0; j < listOfArmies[i].loadedArmies.length; j++){
                                if(listOfArmies[i].loadedArmies[j] === army.armyId){
                                    placeInList = j;
                                }
                            }
                            if(placeInList == (listOfArmies[i].loadedArmies.length-1)){
                                listOfArmies[i].loadedArmies.pop();
                            } else {
                                listOfArmies[i].loadedArmies[j] = listOfArmies[i].loadedArmies[listOfArmies[i].loadedArmies.length-1];
                                listOfArmies[i].loadedArmies.pop();
                            }
                            army.isLoadedIn = null;
                        }
                    }
                }
                if(tempmove.changHeight){
                    army.setRemainingHeightPoints(army.remainingHeightPoints - tempmove.height);
                }
                clickedMoves(army);
                return "ok"
            }
            //in case of loading onto a ship
            else if(tempmove.load !== undefined && tempmove.load){
                var fleetsOnDest = [];
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === tempmove.tar.x) && (listOfArmies[i].y === tempmove.tar.y) &&
                        (Math.floor(listOfArmies[i].armyId / 100) === 3)){
                            fleetsOnDest.push(i);
                            console.log("fleets +1");
                    }
                }
                // there is none
                if(fleetsOnDest.length === 0){
                    return "You can't walk on Water.";
                // there is exactly one
                } else if(fleetsOnDest.length === 1){
                    var loadString = listOfArmies[fleetsOnDest[0]].loadArmy(army.indexInListOfArmies());
                    if(loadString === "ok"){
                        army.isLoadedIn = listOfArmies[fleetsOnDest[0]].armyId;
                        console.log("army in now loaded in " + army.isLoadedIn);
                        army.oldX = army.x;
                        army.oldY = army.y;
                        army.x = tempmove.tar.x;
                        army.y = tempmove.tar.y;
                        army.setRemainingHeightPoints(army.remainingHeightPoints - tempmove.height);
                        return "ok";
                    } else {
                        return(loadString);
                    }
                } else if(fleetsOnDest.length > 1){
                    var fleetstring = "";
                    for(var i = 0; i < fleetsOnDest.length; i++){
                        fleetstring = fleetstring + listOfArmies[fleetsOnDest[i]].armyId + " ";
                    }
                    var chosenFleet = prompt("Mögliche Flotten sind: " + fleetstring);
                    if(chosenFleet !== ''){
                        var foundFleet = -1;
                        for(var i = 0; i < listOfArmies.length; i++){
                            if(listOfArmies[i].armyId === parseInt(chosenFleet) && listOfArmies[i].owner === army.owner){
                                foundFleet = i;
                            }
                        }
                        console.log("chosenFleet: ")
                        console.log(chosenFleet);
                        console.log("foundFleet: ")
                        console.log(foundFleet);
                        console.log("fleetsOnDest: ")
                        console.log(fleetsOnDest);
                        var found = false;
                        for(var i = 0; i < fleetsOnDest.length; i++){
                            if(fleetsOnDest[i] === foundFleet){
                                found = true
                            }
                        }
                        if(found){
                            var loadString = listOfArmies[foundFleet].loadArmy(army.indexInListOfArmies());
                            if(loadString == "ok"){
                                army.isLoadedIn = listOfArmies[foundFleet].armyId;
                                console.log("army in now loaded in " + army.isLoadedIn);
                                army.oldX = army.x;
                                army.oldY = army.y;
                                army.x = tempmove.tar.x;
                                army.y = tempmove.tar.y;
                                army.setRemainingHeightPoints(army.remainingHeightPoints - tempmove.height);
                                return "ok";
                            } else {
                                return(loadString);
                            }
                        } else {
                            window.alert("Bitte wähle eine der angegebenen Flotten aus.");
                        }
                    }
                }
            }
        }
    }
    //to see and return the error why you cant move
    clickedMoves(army);
    return moveToList(army, direction);
}

//when unit is clicked generates a list of neighbors that can be moved to
function clickedMoves(army){
    if(army.ownerTag() === login || login === "sl"){
        army.possibleMoves = [];
        //goes through all neighbors to see if the army can move there
        for(var i = 0; i < 6; i++)
        {
            moveToList(army, i);
        }
    }
}

// direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
//tries to move a Unit in a direction and if possible saves the possible move
function moveToList(army, direction) {
    //console.log("moveToListInitiated");
    var destination = new showHex(army.x, army.y);
    var neighborCoords = destination.neighbors();
    var target = new showHex(neighborCoords[direction][0], neighborCoords[direction][1]);
    var directionString = '';
    var reverseDirection = '';
    var neighborsOfNeighbors = target.neighbors().map((neighbor) => (new showHex(neighbor[0], neighbor[1])).neighbors()).
        reduce((total, current) => (total.concat(current)), []);
    switch(direction){
        case 0: directionString = 'nw'; reverseDirection = 'se'; break;
        case 1: directionString = 'ne'; reverseDirection = 'sw'; break;
        case 2: directionString = 'e'; reverseDirection = 'w'; break;
        case 3: directionString = 'se'; reverseDirection = 'nw'; break;
        case 4: directionString = 'sw'; reverseDirection = 'ne'; break;
        case 5: directionString = 'w'; reverseDirection = 'e'; break;
        default: directionString = 'nw'; reverseDirection = 'se'; break;
    }
    var changeInHeight = false;
    var thereIsAStreet = false;
    var thereIsABridge = false;
    var thereIsAHarbor = false;
    var rightOfPassage = borders.some((realm) => (realm.tag === army.ownerTag() && realm.land.some((field) =>
        (target.x === field[0] && target.y === field[1])))); //effects of diplomacy go here
    var coastalSailing = borders.some((realm) => (realm.tag === army.ownerTag() && realm.land.some((field) =>
        neighborsOfNeighbors.some((neighbor) => (field[0] === neighbor[0] && field[1] === neighbor[1]))))); //effects of diplomacy go here
    var thereIsARiver = rivers.some((river) =>
        (river[0][0] === army.x && river[0][1] === army.y && river[1][0] === target.x && river[1][1] === target.y) ||
        (river[0][0] === target.x && river[0][1] === target.y && river[1][0] === army.x && river[1][1] === army.y)
    );
    // check if there is a steet, a harbor or a bridge on the route
    buildings.forEach((building) => {
        if(building.type === 8 && (((building.firstX === army.x && building.firstY === army.y) &&
            (building.secondX === target.x && building.secondY === target.y)) || ((building.secondX === army.x &&
            building.secondY === army.y) && (building.firstX === target.x && building.firstY === target.y)))){
                thereIsAStreet = true;
        }
        if(building.type === 6 && ((building.x === army.x && building.y === army.y && building.direction === directionString) ||
            (building.x === target.x && building.y === target.y && building.direction === reverseDirection))){
                thereIsAHarbor = true;
        }
        if(building.type === 7 && ((building.x === army.x && building.y === army.y && building.direction === directionString) ||
            (building.x === target.x && building.y === target.y && building.direction === reverseDirection))){
                thereIsABridge = true;
        }
        //TODO: Walls!
    });


    // check if there is a change in height on the route
    if(destination.height() != target.height()){
        if((destination.height() - target.height()) >= 2 || target.height() - destination.height() >= 2){
            return "The height difference is too big."
        } else if((army.remainingHeightPoints < 2 && !thereIsAStreet) || army.remainingHeightPoints < 1){
            return "No height points left."
        } else {
            changeInHeight = true;
            if(thereIsARiver){ return "Can't traverse height difference with a river." }
        }
    }
    // ship movement
    if(Math.floor(army.armyId / 100) === 3){
        switch(target.fieldType()){
            case 0: //shallow sea
                if(army.lkp + army.skp <= 0){ //shallow sea & no warships
                    if(coastalSailing && army.remainingMovePoints >= 5){//shallow sea, coast & no warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 7 ){//shallow sea, no coast & no warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){ //shallow sea & heavy warships
                    if(coastalSailing && army.remainingMovePoints >= 7){//shallow sea, coast & heavy warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 10 ){//shallow sea, no coast & heavy warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){//shallow sea & light warships
                    if(coastalSailing && army.remainingMovePoints >= 6){//shallow sea, coast & light warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 6, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 8 ){//shallow sea, no coast & light warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 1: //deep sea
                if(army.lkp + army.skp <= 0){//deep sea & no warships
                    if(coastalSailing && army.remainingMovePoints >= 8){//deep sea, coast & no warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 12 ){//deep sea, no coast & no warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 12, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){//deep sea & heavy warships
                    if(coastalSailing && army.remainingMovePoints >= 14){//deep sea, coast & heavy warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 14, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 21 ){//deep sea, no coast & heavy warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){//deep sea & light warships
                    if(coastalSailing && army.remainingMovePoints >= 14){//deep sea, coast & light warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 14, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 21 ){//deep sea, no coast & light warships
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: false, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8: return "You can't drive your ships up land." // can't
        }
    // horse movement
    } else if(Math.floor(army.armyId / 100) === 2){
        switch(target.fieldType()){
            case 0:
            case 1: //watter
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === target.x) && (listOfArmies[i].y === target.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) === 3)){
                        if (listOfArmies[i].isLoadable(army.indexInListOfArmies()) === "ok")
                        {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 0, height: thereIsAHarbor?1:2, landunit: true, tar: target, load: true});
                        }
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
            }
            // there is none
            if(fleetsOnDest.length === 0){
                return "You can't walk on Water.";
            // already embarked
            } else if(army.isLoadedIn != null){
                return "You are already embarked on a Fleet.";
            // there is exactly one
            } else {
                return "ok";
            }
            case 2:
            case 4:
            case 7: if(thereIsARiver && !thereIsABridge){ //plains, hills, desert
                if(army.remainingMovePoints >= 21){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){//street
                if (rightOfPassage && army.remainingMovePoints >= 3){ //street & right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                    return "ok";
                } else if(army.remainingMovePoints >= 4 ){ //street & no right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(rightOfPassage && army.remainingMovePoints >= 4 ){ //no street & right of passage
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                }
                else {
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, tar: target, unload: false});
                }
                return "ok";
            } else if(army.remainingMovePoints >= 7 ){ //no street & no right of passage
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                }
                else {
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target, unload: false});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 5: if(thereIsARiver && !thereIsABridge){ //highlands
                if(army.remainingMovePoints >= 21){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){
                if (rightOfPassage && army.remainingMovePoints >= 4){ //street & right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                    return "ok";
                } else if(army.remainingMovePoints >= 7 ){ //street & no right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(rightOfPassage && army.remainingMovePoints >= 7 ){ //no street & right of passage
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target});
                return "ok";
            } else if(army.remainingMovePoints >= 21 ){ //no street & no right of passage
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, tar: target});
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 6: return "Cavalry can not move through the mountains. " //mountains
            case 3:
            case 8: if(thereIsARiver && !thereIsABridge){ //forest, swamp
                if(army.remainingMovePoints >= 21){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){
                if(rightOfPassage && army.remainingMovePoints >= 3 ){ //street & right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                    return "ok";
                } else if(army.remainingMovePoints >= 5 ){ //street & no right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 1, landunit: true, tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(rightOfPassage && army.remainingMovePoints >= 5 ){//no street && right of passage
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 2, landunit: true, tar: target});
                }
                return "ok";
            } else if(army.remainingMovePoints >= 10 ){//no street & no right of passage
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2, landunit: true, tar: target});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
        }
    // normal troop movement
    } else if(Math.floor(army.armyId / 100) === 1){
        switch(target.fieldType()){
            case 0:
            case 1: //watter
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight === true){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === target.x) && (listOfArmies[i].y === target.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) === 3)){
                        if (listOfArmies[i].isLoadable(army.indexInListOfArmies()) === "ok"){
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 0, height: thereIsAHarbor?1:2, landunit: true, tar: target, load: true});
                        }
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
            }
            // there is none
            if(fleetsOnDest.length === 0){
                return "You can't walk on Water.";
            // already embarked
            } else if(army.isLoadedIn != null){
                return "You are already embarked on a Fleet.";
            // there is exactly one
            } else {
                return "ok";
            }
            case 2:
            case 4:
            case 7: if(thereIsARiver && !thereIsABridge){ //plains, hills, desert
                if(army.remainingMovePoints >= 9){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){//street
                if(rightOfPassage){//right of passage
                    if(army.skp + army.lkp > 0 && army.remainingMovePoints >= 4){ //catapults, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.remainingMovePoints >= 3){ //no catapults, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else if(army.remainingMovePoints >= 4){//street & no right of passage
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else {//no street
                if(rightOfPassage){//right of passage
                    if(army.skp + army.lkp > 0 && army.remainingMovePoints >= 7){ //catapults, no street & right of passage
                        if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                        } else {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target, unload: false});
                        }
                        return "ok";
                    } else if (army.remainingMovePoints >= 4){ //no catapults, no street & right of passage
                        if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                        } else {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, tar: target, unload: false});
                        }
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else if(army.remainingMovePoints >= 7){//no street & no right of passage
                    if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                    }
                    else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target, unload: false});
                    }
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
            case 5: if(thereIsARiver && !thereIsABridge){ //highlands
                if(army.remainingMovePoints >= 9){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(army.skp > 0 && army.remainingMovePoints >= 7){//heavy catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4){//light catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3){//no catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else { //street & no right of passage
                    if(army.skp > 0){ //heavy catas, street & no right of passage
                        if(army.remainingMovePoints >= 7){
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                            return "ok";
                        } else {return "You don't have enough movement Points.";}
                    } else if(army.remainingMovePoints >= 4){//light or no catas, street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            } else { //no street
                if(rightOfPassage){ //no street & right of passage
                    if(army.skp > 0){//heavy catas, no street & right of passage
                        return "You need a street to move into the highlands with heavy catapults.";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7){//light catas, no street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4){//no catas, no street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else { //no street & no right of passage
                    if(army.skp > 0){//heavy catas, no street & no right of passage
                        return "You need a street to move into the highlands with heavy catapults.";
                    } else if (army.skp <= 0 && army.remainingMovePoints >= 7){//light or no catas, no street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                }
            }
            case 6: if(thereIsARiver && !thereIsABridge){ //mountains
                if(army.remainingMovePoints >= 9){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(army.skp > 0){//heavy catas, street & right of passage
                        return "You can't move into the mountains with heavy catapults.";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4){//light catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3){//no catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else { //street & no right of passage
                    if(army.skp > 0){//heavy catas, street & no right of passage
                        return "You can't move into the mountains with heavy catapults.";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7){//light catas, street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4){//no catas, street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                }
            } else { //no street
                if(army.skp + army.lkp > 0){ //light or heavy catas, no street
                    return "You need a street to move into the mountains with catapults.";
                } else { //no catas, no street
                    if(rightOfPassage && army.remainingMovePoints >= 4){ //no catas, no street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, tar: target});
                        return "ok";
                    } else if(army.remainingMovePoints >= 7){ //no catas, no street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                }
            }
            case 3:
            case 8: if(thereIsARiver && !thereIsABridge){ //forest, swamp
                if(army.remainingMovePoints >= 9){
                    if(thereIsAStreet){
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 1, landunit: true, tar: target});
                    } else {
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 9, height: 2, landunit: true, tar: target});
                    }
                    return "ok";
                } else {
                    return "You need you full movement to cross a river."
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(army.skp > 0 && army.remainingMovePoints >= 7){//heavy catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 4){//light catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 3){//no catas, street & right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 3, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else { //street & no right of passage
                    if(army.skp > 0 && army.remainingMovePoints >= 7){//heavy catas, street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else if (army.skp <= 0 && army.remainingMovePoints >= 4){//light or no catas, street & no right of passage
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1, landunit: true, tar: target});
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                }
            } else { //no street
                if(rightOfPassage){ //no street & right of passage
                    if(army.skp > 0){//heavy catas, no street & right of passage
                        return "You need a street to move into forest or swamp with heavy catapults.";
                    } else if (army.lkp > 0 && army.skp <= 0 && army.remainingMovePoints >= 7){//light catas, no street & right of passage
                        if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                        } else {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target, unload: false});
                        }
                        return "ok";
                    } else if (army.skp + army.lkp <= 0 && army.remainingMovePoints >= 4){//no catas, no street & right of passage
                        if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                        } else {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2, landunit: true, tar: target, unload: false});
                        }
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                } else { //no street & no right of passage
                    if(army.skp > 0){//heavy catas, no street & no right of passage
                        return "You need a street to move into forest or swamp with heavy catapults.";
                    } else if (army.skp <= 0 && army.remainingMovePoints >= 7){//light or no catas, no street & no right of passage
                        if(army.isLoadedIn != null){  //falls armee von flotte transportiert wird
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: thereIsAHarbor?1:2, landunit: true, tar: target, unload: true});
                        } else {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true, tar: target, unload: false});
                        }
                        return "ok";
                    } else {return "You don't have enough movement Points.";}
                }
            }
        }
    }
}


//checks the current field for other armies and adds it accordingly
function createMultifield(army){
	for (let j = 0; j < listOfArmies.length; j++) {
		var someArmy = listOfArmies[j];
		if (someArmy.x === army.x && someArmy.y === army.y && someArmy !== army) {
			if(someArmy.multiArmyField === true || army.multiArmyField === true){
				addToMultifield(someArmy, army);
			}
			else{
				let templist = [someArmy, army];//creating a list of armies to add to the list of multifieldarmies
				listOfMultiArmyFields.push(templist);
				someArmy.multiArmyField = true;
				army.multiArmyField = true;
			}
		}
	}
}

//Adds an army to an existing multifield
function addToMultifield(armyOnMultifield, armyToAdd){
	if(listOfMultiArmyFields !== undefined){
		let alreadyInList = false;
		let placeToAdd;
		for(let i = 0; i < listOfMultiArmyFields.length; i++){
			for(let j = 0; j < listOfMultiArmyFields[i].length; j++){
				if(listOfMultiArmyFields[i][j] === armyOnMultifield){
					placeToAdd = i;
				}
				else if(listOfMultiArmyFields[i][j] === armyToAdd){
					alreadyInList = true;
				}
			}
		}
		if(alreadyInList == false && placeToAdd !== undefined){
			listOfMultiArmyFields[placeToAdd].push(armyToAdd);
			console.log("added to multi");
		}
		armyToAdd.multiArmyField = true;
	}
}

function conquer(army) {
    if((new showHex(army.x, army.y)).fieldType() >= 2 && army.canConquer()){
        var found = false;
        //für i = 0 bis borders länge
        for(var i = 0; i<borders.length; i++){
            // sind das die Länder des Besitzers?
            if (borders[i].tag === army.ownerTag()){
                // ist das Zielland enthalten?
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y){
                        // wenn ja, found = true
                        found = true;
                    }
                }
            // nicht die Länder des Besitzers
            } else {
                // ist das Zielland enthalten?
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y){
                        // wenn ja nimm es raus.
                        borders[i].land.splice(j,1);
                    }
                }
            }
            //console.log(borders[i]);
        }
        // war nicht bereits Land des Besitzers.
        if (!found){
            for(var i = 0; i<borders.length; i++){
                if (borders[i].tag === army.ownerTag()){
                    // tu es zu den Ländern des Besitzers.
                    borders[i].land.push([army.x, army.y]);
                }
            }
        }
    }
}

// contains helper functions to get information about a field out of the fields array with just its coordinates.
function showHex(positionX, positionY) {
    this.id = function(){
		//TODO: GroßhexKleinhex Zahl bestimmen.
	}
    this.x = positionX;
    this.y = positionY;
	// reihenfolge NW,NO,O,SO,SW,W, 0 heißt kein fluss, 1 heißt fluss
    this.fluesse = function() {
		var flussAcc = [0,0,0,0,0,0];
		var surroundings = this.neighbors();
        for (var i = 0; i < rivers.length; i++) {
			var river = rivers[i];
			if((this.x === river[0][0] && this.y === river[0][1]) || (this.x === river[1][0] && this.y === river[1][1])){
				for(var j = 0; j < surroundings.length; j++){
					if((surroundings[j][0] === river[0][0] && surroundings[j][1] === river[0][1]) ||
					    (surroundings[j][0] === river[1][0] && surroundings[j][1] === river[1][1])){
						flussAcc[j] = 1;
					}
				}
			}
    	}
		return flussAcc;
	}
	// in which directions does this field have walls (order as above, only walls build on this field)
    this.walls = function() {
        let result = [0,0,0,0,0,0];
        let walls = buildings.filter((elem) => (elem.type === 5 && elem.x === this.x && elem.y === this.y));
        walls.forEach((wall) => {
            switch(wall.direction){
                case "nw": result[0] = 1; break;
                case "ne": result[1] = 1; break;
                case "e": result[2] = 1; break;
                case "se": result[3] = 1; break;
                case "se": result[4] = 1; break;
                case "w": result[5] = 1; break;
            }
        });
        return result;
    }
    // in which directions does this field have bridges (order as above)
    this.bridges = function() {
        let result = [0,0,0,0,0,0];
        let neighbors = this.neighbors();
        let bridges = buildings.forEach((elem) => {
            if(elem.type === 7){//bridge type
                if(elem.x === this.x && elem.y === this.y) {//bridge on this field
                    switch(elem.direction){//put into result
                        case "nw": result[0] = 1; break;
                        case "ne": result[1] = 1; break;
                        case "e": result[2] = 1; break;
                        case "se": result[3] = 1; break;
                        case "se": result[4] = 1; break;
                        case "w": result[5] = 1; break;
                    }
                } else {
                    neighbors.forEach((val, index) => {
                        if(val[0] === elem.x && val[1] === elem.y){//bridge on the neighboring field
                            switch(index){//pointing the right way
                                case 0: elem.direction === "se"?result[0] = 1:0; break;
                                case 1: elem.direction === "sw"?result[1] = 1:0; break;
                                case 2: elem.direction === "w"?result[2] = 1:0; break;
                                case 3: elem.direction === "nw"?result[3] = 1:0; break;
                                case 4: elem.direction === "ne"?result[4] = 1:0; break;
                                case 5: elem.direction === "e"?result[5] = 1:0; break;
                            }
                        }
                    });
                }
            }
        });
        return result;
    }
	// does the field has a street on it in any direction
	this.hasStreet = function() {
	    return buildings.some((elem) => elem.type === 8 && ((elem.firstX === this.x && elem.firstY === this.y) ||
	        (elem.secondX === this.x && elem.secondY === this.y)));
	}
    // where in the field list is this field
    this.positionInList = function(){
        for (var i = 0; i < fields.length; i++) {
			if((fields[i].x === this.x) && (fields[i].y === this.y)){return i;}
		}
    }
    // what type is this field
	this.fieldType = function(){
		for (var i = 0; i < fields.length; i++) {
			if((fields[i].x === this.x) && (fields[i].y === this.y)){return fields[i].type;}
		}
	}
    // what height is this field
    this.height = function(){
        switch(this.fieldType()){
            case 0:
            case 1: return 0;
            case 2:
            case 7:
            case 8: 
            case 3: return 1;
            case 4: return 2;
            case 5: return 3;
            case 6: return 4;
        }
    }
    // returns the fields neighbors in the usual order
	this.neighbors = function(){
		//reihenfolge NW,NO,O,SO,SW,W
		if(this.y % 2 === 0){
			return [[this.x,this.y-1],[this.x+1,this.y-1],[this.x+1,this.y],[this.x+1,this.y+1],[this.x,this.y+1],[this.x-1,this.y]];
		} else {
			return [[this.x-1,this.y-1],[this.x,this.y-1],[this.x+1,this.y],[this.x,this.y+1],[this.x-1,this.y+1],[this.x-1,this.y]];
		}
	}
}