function armyCoordinates(army) {
    this.a = army;

    //when unit is clicked generates a list of neighbors that can be moved to
    this.clickedMoves = function(){

        if(this.a.ownerTag() === login || login === "sl"){
            this.a.possibleMoves = [];
            //goes through all neighbors to see if the army can move there
            for(var i =0; i < 6; i++)
            {
                moveToList(this.a, i);
            }
        }

    }

    //to actually move units with the new method
    this.move = function(direction){//TODO needs new names
        for(var i =0; i < this.a.possibleMoves.length; i++){
            if(this.a.possibleMoves[i].dir == direction){
                var tempmove = this.a.possibleMoves[i];
                //in case it is moving on land
                if(tempmove.load == undefined){
                    this.a.remainingMovePoints -= tempmove.movepoints;
                    this.a.x = tempmove.tar.x;
                    this.a.y = tempmove.tar.y;

                    //for ship movement
                    if(Math.floor(this.a.armyId / 100) == 3){
                    // moves troops that are loaded in the fleet
                        if(this.a.loadedArmies != undefined && this.a.loadedArmies != []){
                            for(var i = 0; i < this.a.loadedArmies.length; i++){
                                for(var j = 0; j < listOfArmies.length; j++){
                                    console.log(this.a.loadedArmies[i]);
                                    if(listOfArmies[j].owner == this.a.owner && listOfArmies[j].a.armyId == this.a.loadedArmies[i]){
                                        listOfArmies[j].x = tempmove.tar.x;
                                        listOfArmies[j].y = tempmove.tar.y;
                                    }
                                }
                            }
                        }
                    }

                    //for moving off a ship
                    if(tempmove.unload != undefined && tempmove.unload == true){
                        console.log("MAAAAPMAAAAPMAAAAAP ------------This Totally Happened-------------------")
                        console.log("Armee war in " + this.a.isLoadedIn + " geladen.");
                        for(var i = 0; i < listOfArmies.length; i++){
                            if((listOfArmies[i].owner == this.a.owner) && listOfArmies[i].a.armyId == this.a.isLoadedIn){
                                var placeInList = -1;
                                for(var j = 0; j < listOfArmies[i].a.loadedArmies.length; j++){
                                    if(listOfArmies[i].a.loadedArmies[j] == this.a.armyId){
                                        placeInList = j;
                                    }
                                }
                                if(placeInList == (listOfArmies[i].a.loadedArmies.length-1)){
                                    listOfArmies[i].a.loadedArmies.pop();
                                } else {
                                    listOfArmies[i].a.loadedArmies[j] = listOfArmies[i].a.loadedArmies[listOfArmies[i].a.loadedArmies.length-1];
                                    listOfArmies[i].a.loadedArmies.pop();
                                }
                                this.a.isLoadedIn = null;
                            }
                        }
                    }

                    if(tempmove.changHeight == true){
                        this.a.setRemainingHeightPoints(this.a.remainingHeightPoints - tempmove.height);
                    }
                    if(tempmove.landunit == true && this.a.canConquer())
                    {
                        conquer(this.a, direction);
                    }
                    this.clickedMoves();
                    return "ok"
                }
                //in case of loading onto a ship
                else if(tempmove.load == true){
                    var fleetsOnDest = [];
                    for(var i = 0; i<listOfArmies.length; i++){
                        if((listOfArmies[i].owner == this.a.owner) && (listOfArmies[i].x == tempmove.tar.x) && (listOfArmies[i].y == tempmove.tar.y) &&
                        (Math.floor(listOfArmies[i].a.armyId / 100) == 3)){
                            fleetsOnDest.push(i);
                            console.log("fleets +1");
                        }
                    }
                    // there is none
                    if(fleetsOnDest.length == 0){
                        return "You can't walk on Water.";
                    // there is exactly one
                    } else if(fleetsOnDest.length == 1){
                        var loadString = listOfArmies[fleetsOnDest[0]].a.loadArmy();
                        if(loadString == "ok"){
                            this.a.isLoadedIn = listOfArmies[fleetsOnDest[0]].a.armyId;
                            console.log("army in now loaded in " + this.a.isLoadedIn);
                            this.a.x = tempmove.tar.x;
                            this.a.y = tempmove.tar.y;
                            return "ok";
                        } else {
                            return(loadString);
                        }
                    // TODO: more than one
                    } else if(fleetsOnDest.length > 1){
                        var fleetstring = "";
                        for(var i = 0; i < fleetsOnDest.length; i++){
                            fleetstring = fleetstring + listOfArmies[fleetsOnDest[i]].a.armyId + " ";
                        }
                        var chosenFleet = prompt("Mögliche Flotten sind: " + fleetstring);
                        if(chosenFleet != null){
                            var findFleet = -1;
                            for(var i = 0; i < listOfArmies.length; i++){
                                if(listOfArmies[i].a.armyId == chosenFleet && listOfArmies[i].owner == this.a.owner){
                                    findFleet = i;
                                }
                            }
                            console.log("chosenFleet: ") 
                            console.log(chosenFleet);
                            console.log("findFleet: ") 
                            console.log(findFleet);
                            console.log("fleetsOnDest: ") 
                            console.log(fleetsOnDest);
                            var found = false;
                            for(var i = 0; i < fleetsOnDest.length; i++){
                                if(fleetsOnDest[i] == findFleet){
                                    found = true
                                }
                            }
                            if(found){
                                var loadString = listOfArmies[findFleet].a.loadArmy();
                                if(loadString == "ok"){
                                    this.a.isLoadedIn = listOfArmies[findFleet].a.armyId;
                                    console.log("army in now loaded in " + this.a.isLoadedIn);
                                    this.a.x = tempmove.tar.x;
                                    this.a.y = tempmove.tar.y;
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
        this.clickedMoves();
        return moveToList(this.a, direction)
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
                    if((listOfArmies[i].a.owner === army.owner) && (listOfArmies[i].a.x === target.x) && (listOfArmies[i].a.y === target.y) &&
                    (Math.floor(listOfArmies[i].a.armyId / 100) == 3)){
                        if (listOfArmies[i].a.isLoadable() == "ok")
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
                    if((listOfArmies[i].a.owner === army.owner) && (listOfArmies[i].a.x === target.x) && (listOfArmies[i].a.y === target.y) &&
                    (Math.floor(listOfArmies[i].a.armyId / 100) == 3)){
                        if (listOfArmies[i].a.isLoadable() == "ok")
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
			if((this.x == river[1][1] && this.y == river[1][2]) || (this.x == river[2][1] && this.y == river[2][2])){
				for(var j = 0; j < surroundings.length; j++){
					if((surroundings[j][1] == river[1][1] && surroundings[j][2] == river[1][2]) || (surroundings[j][1] == river[2][1] && surroundings[j][2] == river[2][2])){
						flussAcc[j] = 1;
					}
				}
			}
    	}
		return flussAcc;
	}
    // where in the field list is this field
    this.positionInList = function(){
        for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == this.x) && (fields[i].y == this.y)){return i;}
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
		if(this.y % 2 == 0){
			return [[this.x,this.y-1],[this.x+1,this.y-1],[this.x+1,this.y],[this.x+1,this.y+1],[this.x,this.y+1],[this.x-1,this.y]];
		} else {
			return [[this.x-1,this.y-1],[this.x,this.y-1],[this.x+1,this.y],[this.x,this.y+1],[this.x-1,this.y+1],[this.x-1,this.y]];
		}
	}
}