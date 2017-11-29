//to actually move units with the new method
function move(army, direction){//TODO needs new names
    for(var i =0; i < army.possibleMoves.length; i++){
        if(army.possibleMoves[i].dir == direction){
            var tempmove = army.possibleMoves[i];
            //in case it is moving on land
            if(tempmove.load == undefined){
                army.remainingMovePoints -= tempmove.movepoints;
                army.x = tempmove.x;
                army.y = tempmove.y;
                //for ship movement
                if(Math.floor(army.armyId / 100) == 3){
                // moves troops that are loaded in the fleet
                    if(army.loadedArmies != undefined && army.loadedArmies != []){
                        for(var i = 0; i < army.loadedArmies.length; i++){
                            for(var j = 0; j < listOfArmies.length; j++){
                                console.log(army.loadedArmies[i]);
                                if(listOfArmies[j].owner == army.owner && listOfArmies[j].armyId == army.loadedArmies[i]){
                                    listOfArmies[j].x = tempmove.x;
                                    listOfArmies[j].y = tempmove.y;
                                }
                            }
                        }
                    }
                }
                //for moving off a ship
                if(tempmove.unload != undefined && tempmove.unload == true){
                    console.log("Armee war in " + army.isLoadedIn + " geladen.");
                    for(var i = 0; i < listOfArmies.length; i++){
                        if((listOfArmies[i].owner == army.owner) && listOfArmies[i].armyId == army.isLoadedIn){
                            var placeInList = -1;
                            for(var j = 0; j < listOfArmies[i].loadedArmies.length; j++){
                                if(listOfArmies[i].loadedArmies[j] == army.armyId){
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
                if(tempmove.changHeight == true){
                    army.setRemainingHeightPoints(army.remainingHeightPoints - tempmove.height);
                }
                clickedMoves(army);
                return "ok"
            }
            //in case of loading onto a ship
            else if(tempmove.load == true){
                var fleetsOnDest = [];
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner == army.owner) && (listOfArmies[i].x == tempmove.tar.x) && (listOfArmies[i].y == tempmove.tar.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
                // there is none
                if(fleetsOnDest.length == 0){
                    return "You can't walk on Water.";
                // there is exactly one
                } else if(fleetsOnDest.length == 1){
                    var loadString = listOfArmies[fleetsOnDest[0]].loadArmy();
                    if(loadString == "ok"){
                        army.isLoadedIn = listOfArmies[fleetsOnDest[0]].armyId;
                        console.log("army in now loaded in " + army.isLoadedIn);
                        army.x = tempmove.x;
                        army.y = tempmove.y;
                        return "ok";
                    } else {
                        return(loadString);
                    }
                // TODO: more than one
                } else if(fleetsOnDest.length > 1){
                    var fleetstring = "";
                    for(var i = 0; i < fleetsOnDest.length; i++){
                        fleetstring = fleetstring + listOfArmies[fleetsOnDest[i]].armyId + " ";
                    }
                    var chosenFleet = prompt("Mögliche Flotten sind: " + fleetstring);
                    if(chosenFleet != null){
                        var foundFleet = -1;
                        for(var i = 0; i < listOfArmies.length; i++){
                            if(listOfArmies[i].armyId == chosenFleet && listOfArmies[i].owner == army.owner){
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
                            if(fleetsOnDest[i] == foundFleet){
                                found = true
                            }
                        }
                        if(found){
                            var loadString = listOfArmies[foundFleet].loadArmy();
                            if(loadString == "ok"){
                                army.isLoadedIn = listOfArmies[foundFleet].armyId;
                                console.log("army in now loaded in " + army.isLoadedIn);
                                army.x = tempmove.x;
                                army.y = tempmove.y;
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
    console.log("moveToListInitiated");
    var neighborCoords = neighbors(army.x, army.y);
    var targetX = neighborCoords[direction][0];
    var targetY = neighborCoords[direction][1];
    var changeInHeight = false;
    var thereIsAStreet = false;
    // check if there is a steet on the route
    for(var i = 0; i < buildings.length; i++){
        var building = buildings[i];
        if(building.type == 8){
            if(((building.firstX === army.x && building.firstY === army.y) && (building.secondX === targetX &&
                building.secondY === targetY)) || ((building.secondX === army.x && building.secondY === army.y) &&
                (building.firstX === targetX && building.firstY === targetY))){
                thereIsAStreet = true;
                break;
            }
        }
    }
    // check if there is a change in height on the route
    if(height(army.x, army.y) != height(targetX, targetY)){
        if((height(army.x, army.y) - height(targetX, targetY)) >= 2 || height(targetX, targetY) - height(army.x, army.y) >= 2){
            return "The height difference is too big."
        } else if((army.remainingHeightPoints < 2 && !thereIsAStreet) || army.remainingHeightPoints < 1){
            return "No height points left."
        } else {
            changeInHeight = true;
        }
    }
    // ship movement
    if(Math.floor(army.armyId / 100) == 3){
        switch(fieldType(targetX, targetY)){
            case 0:
                if(army.lkp == 0 && army.skp == 0){
                    if(army.remainingMovePoints >= 12 ){
                        //this.moveHelper(changeInHeight, direction, 12,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 12, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                    if(army.remainingMovePoints >= 21 ){
                        //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){
                    if(army.remainingMovePoints >= 21 ){
                        //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 1:
                if(army.lkp == 0 && army.skp == 0){
                    if(army.remainingMovePoints >= 7 ){
                        //this.moveHelper(changeInHeight, direction, 7,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                    if(army.remainingMovePoints >= 10 ){
                        //this.moveHelper(changeInHeight, direction, 10,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){
                    if(army.remainingMovePoints >= 8 ){
                        //this.moveHelper(changeInHeight, direction, 8,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2,landunit: false,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 2:
            case 4:
            case 7:
            case 5:
            case 6:
            case 3:
            case 8: return "You can't drive your ships up land." // can't
        }
    // horse movement
    } else if(Math.floor(army.armyId / 100) == 2){
        switch(fieldType(targetX, targetY)){
            case 0:
            case 1:
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight === true){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === targetX) && (listOfArmies[i].y === targetY) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        if (listOfArmies[i].isLoadable() == "ok")
                        {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2,landunit: true ,x: targetX, y: targetY, load: true});
                        }
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
            }
            // there is none
            if(fleetsOnDest.length == 0){
                return "You can't walk on Water.";
            // already embarked
            } else if(army.isLoadedIn != null){
                return "You are already embarked on a Fleet.";
            // there is exactly one
            }
            case 2:
            case 4:
            case 7: if(thereIsAStreet){
                if(army.remainingMovePoints >= 4 ){// 4
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 7 ){// 7
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY, unload: false});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 5: if(thereIsAStreet){
                if(army.remainingMovePoints >= 7 ){// 7
                    //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 21 ){// 21
                //this.moveHelper(changeInHeight, direction, 21,2,true, target);
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: true ,x: targetX, y: targetY});
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 6: return "Cavalry can not move through the mountains. "// can't
            case 3:
            case 8: if(thereIsAStreet){
                if(army.remainingMovePoints >= 5 ){// 5
                    //this.moveHelper(changeInHeight, direction, 5,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 10 ){// 10
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: true ,x: targetX, y: targetY, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: true ,x: targetX, y: targetY});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
        }
    // normal troop movement
    } else if(Math.floor(army.armyId / 100) == 1){
        switch(fieldType(targetX, targetY)){
            case 0:
            case 1:
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight === true){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === targetX) && (listOfArmies[i].y === targetY) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        if (listOfArmies[i].isLoadable() == "ok")
                        {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2,landunit: true ,x: targetX, y: targetY, load: true});
                        }
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
            }
            // there is none
            if(fleetsOnDest.length == 0){
                return "You can't walk on Water.";
            // already embarked
            } else if(army.isLoadedIn != null){
                return "You are already embarked on a Fleet.";
            // there is exactly one
            }
            case 2:
            case 4:
            case 7:
            console.log("there is a street: "+ thereIsAStreet);
            if(thereIsAStreet){  // target field is a lowland, hill or desert
                if(army.remainingMovePoints >= 4){
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 7){
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY, unload: true});
                }
                else {
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY, unload: false});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 5: if(thereIsAStreet){  // target field is a highland
                    if(army.skp > 0){
                        if(army.remainingMovePoints >= 7){
                            //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,x: targetX, y: targetY});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } if(army.remainingMovePoints >= 4){
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                return "You you need streets to move heavy catapults into the highlands.";
            } if(army.remainingMovePoints >= 7){
                //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY});
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 6: if(thereIsAStreet){  // target field is a mountain
                if(army.skp > 0){
                    return "You can't move into the mountains with heavy catapults.";
                } else if(army.lkp > 0){
                    if(army.remainingMovePoints >= 7 ){
                        //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.remainingMovePoints >= 4 ){
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.lkp > 0 || army.skp > 0){
                return "You can't move into the mountains with catapults.";
            }
            case 3:
            case 8: if(thereIsAStreet){ // target field is a wood, or swamp
                if(army.skp > 0){
                    if(army.remainingMovePoints >= 7 ){
                        //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,x: targetX, y: targetY});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.remainingMovePoints >= 4 ){
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,x: targetX, y: targetY});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.skp > 0){
                return "You can't move into woods or swamps with heavy catapults unless you have streets.";
            } else if(army.remainingMovePoints >= 7 ){
                //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,x: targetX, y: targetY, unload: true});
                }
                else{
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true ,x: targetX, y: targetY});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
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
				console.log("created multi");
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

//to find all fields in a two tile proximity
function findShootingTargets(army){

    if(army.skp >0){//in a 2 tile range
        army.targetList = neighborInRange(army.x, army.y,2);
    }
    else{//ontile range
        army.targetList = neighborInRange(army.x, army.y,1);
    }

    //adding the range identifier showing the distange to origin
    for(let i = 0; i < army.targetList.length; i++){
        army.targetList[i].push(distance(army.x, army.y,army.targetList[i][0], army.targetList[i][1]));
    }
    //console.log(army.targetList);

    army.targetList = checkAllConditions(army, army.targetList);
    
}

function checkAllConditions(army, targetList){
    
    let templist = targetList.slice();
    //to find out the conditions and maybe kick out if not shootable
    for(let i = templist.length -1; i >= 0; i--){
        if(checkCondition(army,templist[i][0], templist[i][1], templist[i][2]) === 'impossible shot'){
            targetList.splice(i,1);
        }
    }

    return targetList;
}
function checkCondition(army, x, y, range){
    let condition = 'impossible shot';
    if(army.skp > 0){//skp shooting
        if(range == 1){//for range of 1
            if(height(x, y) - height(army.x, army.y) <= 2){
                condition = 'high';
            }
            if(height(x, y) - height(army.x, army.y) <= 1){
                condition = 'short';
            }
        }else if(range == 2){//for range of 2
            if(height(x, y) - height(army.x, army.y) <= 1){
                condition = 'farAndUp';
            }
            if(height(x, y) - height(army.x, army.y) < 1){
                condition = 'far';
            }
            //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
            let commonNeig = findCommonNeighbor(x, y, army.x, army.y);
            for(let i = 0; i < commonNeig.length; i++){
                if(height(commonNeig[i][0], commonNeig[i][1]) - height(army.x, army.y) > 1){
                    condition = 'impossible shot';
                }
            }
            //TODO add Wall targeting
        }
    }else{//for lkp shooting
        if(height(x, y) - height(army.x, army.y) <= 1){
            condition = 'lkp';
        }
    }
    return condition;
}

function findWallInWay(fromX, fromY, toX, toY){
    let foundWallsIndeces = [];
    let dir = getDirectionToNeighbor(fromX, fromY, toX, toY);
    if(distance(fromX, fromY, toX, toY) === 1){
        dir = convertDirection((dir + 3) % 6);
        let wallIndex = getWallIndexOnFieldInDirection(toX, toY, dir);
        if(wallIndex != -1){
            foundWallsIndeces.push(wallIndex)
            return foundWallsIndeces;
        }
    }else if(distance(fromX, fromY, toX, toY) === 2){
        if(dir % 1 === 0){
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1){//case back facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            dir = convertDirection((dir + 3) % 6);
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1){//case front facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            if(getWallIndexOnFieldInDirection(toX, toY, dir) !== -1){//case front wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dir));
            }
        }else{
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            dir = Math.floor(dir);
            let dirCommon1 = convertDirection((dir + 3) % 6);
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1){//case front facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }
            dirCommon1 = convertDirection((dir + 1) % 6);
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1){//case back facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }

            let dirCommon2 = convertDirection((dir + 4) % 6);
            if(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1){//case front facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }
            dirCommon2 = convertDirection(dir);
            if(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1){//case back facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }

            let dirTarget = convertDirection((dir + 3) % 6);
            if(getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
            dirTarget = convertDirection((dir + 4) % 6);
            if(getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
        }
    }
    return foundWallsIndeces;
}

//returns all walls on target field
function getWallIndexOnFieldInDirection(x,y, direction){
    for(let i = 0; i < buildings.length; i++){
        if(buildings[i].type === 5 && buildings[i].x === x && buildings[i].y === y && buildings[i].direction === direction){
           return i;
        }
    }
    return -1;
}


function convertDirection(dir){
    switch(dir){
        case 0: return "nw";
        case 1: return "ne";
        case 2: return "e";
        case 3: return "se";
        case 4: return "sw";
        case 5: return "w";
    }
}