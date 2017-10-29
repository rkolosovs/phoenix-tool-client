//to actually move units with the new method
function move(army, direction){//TODO needs new names
    for(var i =0; i < army.possibleMoves.length; i++){
        if(army.possibleMoves[i].dir === direction){
            var tempmove = army.possibleMoves[i];
            //in case it is moving on land
            if(tempmove.load === undefined){
                army.remainingMovePoints -= tempmove.movepoints;
                army.oldX = army.x;
                army.oldY = army.y;
                army.x = tempmove.tar.x;
                army.y = tempmove.tar.y;
                //for ship movement
                if(Math.floor(army.armyId / 100) == 3){
                // moves troops that are loaded in the fleet
                    if(army.loadedArmies !== undefined && army.loadedArmies !== []){
                        for(var i = 0; i < army.loadedArmies.length; i++){
                            for(var j = 0; j < listOfArmies.length; j++){
                                console.log(army.loadedArmies[i]);
                                if(listOfArmies[j].owner === army.owner && listOfArmies[j].armyId === army.loadedArmies[i]){
                                    listOfArmies[j].oldX = listOfArmies[j].x;
                                    listOfArmies[j].oldY = listOfArmies[j].y;
                                    listOfArmies[j].x = tempmove.tar.x;
                                    listOfArmies[j].y = tempmove.tar.y;
                                }
                            }
                        }
                    }
                }
                //for moving off a ship
                if(tempmove.unload !== undefined && tempmove.unload === true){
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
                if(tempmove.landunit == true && army.canConquer())
                {
                    conquer(army, direction);
                }
                clickedMoves(army);
                return "ok"
            }
            //in case of loading onto a ship
            else if(tempmove.load == true){
                var fleetsOnDest = [];
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === tempmove.tar.x) && (listOfArmies[i].y === tempmove.tar.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        fleetsOnDest.push(i);
                        console.log("fleets +1");
                    }
                }
                // there is none
                if(fleetsOnDest.length == 0){
                    return "You can't walk on Water.";
                // there is exactly one
                } else if(fleetsOnDest.length === 1){
                    var loadString = listOfArmies[fleetsOnDest[0]].loadArmy();
                    if(loadString === "ok"){
                        army.isLoadedIn = listOfArmies[fleetsOnDest[0]].armyId;
                        console.log("army in now loaded in " + army.isLoadedIn);
                        army.oldX = army.x;
                        army.oldY = army.y;
                        army.x = tempmove.tar.x;
                        army.y = tempmove.tar.y;
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
                    if(chosenFleet !== null){
                        var foundFleet = -1;
                        for(var i = 0; i < listOfArmies.length; i++){
                            if(listOfArmies[i].armyId === chosenFleet && listOfArmies[i].owner === army.owner){
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
                            var loadString = listOfArmies[foundFleet].loadArmy();
                            if(loadString == "ok"){
                                army.isLoadedIn = listOfArmies[foundFleet].armyId;
                                console.log("army in now loaded in " + army.isLoadedIn);
                                army.oldX = army.x;
                                army.oldY = army.y;
                                army.x = tempmove.tar.x;
                                army.y = tempmove.tar.y;
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
    return moveToList(army, direction)
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
    var destination = new showHex(army.x, army.y);
    var neighborCoords = destination.neighbors();
    var target = new showHex(neighborCoords[direction][0], neighborCoords[direction][1]);
    var changeInHeight = false;
    var thereIsAStreet = false;
    // check if there is a steet on the route
    for(var i = 0; i < buildings.length; i++){
        var building = buildings[i];
        if(building.type == 8){
            if(((building.firstX === army.x && building.firstY === army.y) && (building.secondX === target.x &&
                building.secondY === target.y)) || ((building.secondX === army.x && building.secondY === army.y) &&
                (building.firstX === target.x && building.firstY === target.y))){
                thereIsAStreet = true;
                break;
            }
        }
    }
    // check if there is a change in height on the route
    if(destination.height() != target.height()){
        if((destination.height() - target.height()) >= 2 || target.height() - destination.height() >= 2){
            return "The height difference is too big."
        } else if((army.remainingHeightPoints < 2 && !thereIsAStreet) || army.remainingHeightPoints < 1){
            return "No height points left."
        } else {
            changeInHeight = true;
        }
    }
    // ship movement
    if(Math.floor(army.armyId / 100) == 3){
        switch(target.fieldType()){
            case 0:
                if(army.lkp == 0 && army.skp == 0){
                    if(army.remainingMovePoints >= 12 ){
                        //this.moveHelper(changeInHeight, direction, 12,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 12, height: 2,landunit: false,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                    if(army.remainingMovePoints >= 21 ){
                        //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){
                    if(army.remainingMovePoints >= 21 ){
                        //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                }
            case 1:
                if(army.lkp == 0 && army.skp == 0){
                    if(army.remainingMovePoints >= 7 ){
                        //this.moveHelper(changeInHeight, direction, 7,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: false,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                    if(army.remainingMovePoints >= 10 ){
                        //this.moveHelper(changeInHeight, direction, 10,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: false,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.lkp > 0){
                    if(army.remainingMovePoints >= 8 ){
                        //this.moveHelper(changeInHeight, direction, 8,2,false, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2,landunit: false,tar: target});
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
        switch(target.fieldType()){
            case 0:
            case 1:
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight === true){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === target.x) && (listOfArmies[i].y === target.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        if (listOfArmies[i].isLoadable() == "ok")
                        {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2,landunit: true ,tar: target, load: true});
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
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 7 ){// 7
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: false});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 5: if(thereIsAStreet){
                if(army.remainingMovePoints >= 7 ){// 7
                    //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 21 ){// 21
                //this.moveHelper(changeInHeight, direction, 21,2,true, target);
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: true ,tar: target});
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 6: return "Cavalry can not move through the mountains. "// can't
            case 3:
            case 8: if(thereIsAStreet){
                if(army.remainingMovePoints >= 5 ){// 5
                    //this.moveHelper(changeInHeight, direction, 5,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 1,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 10 ){// 10
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: true ,tar: target, unload: true});
                }
                else {
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: true ,tar: target});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
        }
    // normal troop movement
    } else if(Math.floor(army.armyId / 100) == 1){
        switch(target.fieldType()){
            case 0:
            case 1:
            var fleetsOnDest = [];
            // target field is sea, or deepsea
            // to see if there is the exact heightchange(not too high or on the sea switching boats)
            if(changeInHeight === true){
                // is there an allied fleet on the target field?
                for(var i = 0; i<listOfArmies.length; i++){
                    if((listOfArmies[i].owner === army.owner) && (listOfArmies[i].x === target.x) && (listOfArmies[i].y === target.y) &&
                    (Math.floor(listOfArmies[i].armyId / 100) == 3)){
                        if (listOfArmies[i].isLoadable() == "ok")
                        {
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2,landunit: true ,tar: target, load: true});
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
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.remainingMovePoints >= 7){
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: true});
                }
                else {
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: false});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
            case 5: if(thereIsAStreet){  // target field is a highland
                    if(army.skp > 0){
                        if(army.remainingMovePoints >= 7){
                            //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                            army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } if(army.remainingMovePoints >= 4){
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.skp > 0){
                return "You you need streets to move heavy catapults into the highlands.";
            } if(army.remainingMovePoints >= 7){
                //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target});
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
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.remainingMovePoints >= 4 ){
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
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
                        army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(army.remainingMovePoints >= 4 ){
                    //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            } else if(army.skp > 0){
                return "You can't move into woods or swamps with heavy catapults unless you have streets.";
            } else if(army.remainingMovePoints >= 7 ){
                //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                if(army.isLoadedIn != null){  // falls armee von flotte transportiert wird
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: true});
                }
                else{
                    army.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true ,tar: target});
                }
                return "ok";
            } else {
                return "You don't have enough movement Points.";
            }
        }
    }
}

// direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
//TODO: Alles was nicht standard Bewegung auf ein benachbartes Feld ist.
// done streets, height change
function conquer(army, direction) {
    var found = false;
    //für i = 0 bis borders länge
    for(var i = 0; i<borders.length; i++){
        // sind das die Länder des Besitzers?
        if (borders[i].tag == army.ownerTag()){
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
    if (found == false){
        for(var i = 0; i<borders.length; i++){
            if (borders[i].tag === army.ownerTag()){
                // tu es zu den Ländern des Besitzers.
                borders[i].land.push([army.x, army.y]);
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
			if((this.x === river[1][1] && this.y === river[1][2]) || (this.x === river[2][1] && this.y === river[2][2])){
				for(var j = 0; j < surroundings.length; j++){
					if((surroundings[j][1] === river[1][1] && surroundings[j][2] === river[1][2]) ||
					    (surroundings[j][1] === river[2][1] && surroundings[j][2] === river[2][2])){
						flussAcc[j] = 1;
					}
				}
			}
    	}
		return flussAcc;
	}
	this.hasStreet = function() {
	    return buildings.find((elem) => elem.type === 8 && ((elem.firstX === this.x && elem.firstY === this.y) ||
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